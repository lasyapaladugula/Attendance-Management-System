const classSelect = document.getElementById("classSelect");
const tableBody = document.querySelector("#attendanceTable tbody");
const submitBtn = document.getElementById("submitAttendance");
const attendanceDate = document.getElementById("attendanceDate");

// SET TODAY DATE AS DEFAULT
const today = new Date().toISOString().split("T")[0];
attendanceDate.value = today;
attendanceDate.setAttribute("min", today);

// LOAD CLASSES FOR ADMIN
const user = JSON.parse(localStorage.getItem("user"));

fetch("http://localhost:5000/api/admin/classes/" + user.adminId)
  .then(res => res.json())
  .then(classes => {
    classSelect.innerHTML = '<option value="">Select Class</option>';

    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls._id;
      option.textContent = cls.className + " - " + cls.subject;
      option.dataset.students = JSON.stringify(cls.students);
      classSelect.appendChild(option);
    });
  });

// SHOW STUDENTS WHEN CLASS IS SELECTED
classSelect.addEventListener("change", () => {
  tableBody.innerHTML = "";

  const option = classSelect.selectedOptions[0];
  if (!option || !option.dataset.students) return;

  const students = JSON.parse(option.dataset.students);

  students.forEach(student => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.studentId}</td>
      <td>${student.studentName || student.name}</td>

      <td>
        <input type="radio"
               id="p_${student.studentId}"
               name="attendance_${student.studentId}"
               value="present"
               hidden>
        <label for="p_${student.studentId}"
               class="status-btn present">P</label>
      </td>

      <td>
        <input type="radio"
               id="l_${student.studentId}"
               name="attendance_${student.studentId}"
               value="late"
               hidden>
        <label for="l_${student.studentId}"
               class="status-btn late">L</label>
      </td>

      <td>
        <input type="radio"
               id="a_${student.studentId}"
               name="attendance_${student.studentId}"
               value="absent"
               hidden>
        <label for="a_${student.studentId}"
               class="status-btn absent">A</label>
      </td>
    `;

    tableBody.appendChild(row);
  });
});

// SUBMIT ATTENDANCE
submitBtn.addEventListener("click", async () => {

  const classId = classSelect.value;
  const selectedDate = attendanceDate.value;

  if (!classId) {
    alert("Please select a class");
    return;
  }

  if (!selectedDate) {
    alert("Please select a date");
    return;
  }

  const rows = tableBody.querySelectorAll("tr");
  const attendanceRecords = [];

  rows.forEach(row => {
    const studentId = row.children[0].innerText;
    const statusInput = row.querySelector("input[type='radio']:checked");

    if (statusInput) {
      attendanceRecords.push({
        studentId: studentId,
        status: statusInput.value
      });
    }
  });

  if (attendanceRecords.length === 0) {
    alert("Please mark attendance for students");
    return;
  }

  const today = new Date().toISOString().split("T")[0];

  if (selectedDate < today) {
    alert("Attendance for this date is already completed and cannot be modified.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/attendance/mark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        classId: classId,
        records: attendanceRecords,
        date: selectedDate
      })
    });

    if (!res.ok) {
      alert("Failed to submit attendance");
      return;
    }

    alert("Attendance submitted successfully");

  } catch (error) {
    console.error(error);
    alert("Server error");
  }

});