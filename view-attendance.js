
const classSelect = document.getElementById("classSelect");
const reportBody = document.getElementById("reportBody");

const admin = JSON.parse(localStorage.getItem("user"));

// 🔹 ADD THIS (ONLY ADDITION)
let studentNames = {};

// LOAD STUDENTS ONCE
fetch("http://localhost:5000/api/student/all")
  .then(res => res.json())
  .then(students => {
    students.forEach(s => {
      studentNames[s.studentId] = s.name;
    });
  });

// LOAD CLASSES (UNCHANGED)
fetch("http://localhost:5000/api/admin/classes/" + admin.adminId)
  .then(res => res.json())
  .then(classes => {
    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls._id;
      option.textContent = cls.className + " - " + cls.subject;
      classSelect.appendChild(option);
    });
  });

// WHEN CLASS SELECTED (UNCHANGED LOGIC)
classSelect.addEventListener("change", () => {
  reportBody.innerHTML = "";
  const classId = classSelect.value;
  if (!classId) return;

  fetch("http://localhost:5000/api/attendance/class/" + classId)
    .then(res => res.json())
    .then(attendanceDocs => {
      if (attendanceDocs.length === 0) {
        reportBody.innerHTML =
          "<tr><td colspan='6'>No attendance records found</td></tr>";
        return;
      }

      const studentMap = {};

      // COLLECT DATA (UNCHANGED)
      attendanceDocs.forEach(doc => {
        doc.records.forEach(r => {
          if (!studentMap[r.studentId]) {
            studentMap[r.studentId] = {
              present: 0,
              late: 0,
              absent: 0
            };
          }
          studentMap[r.studentId][r.status]++;
        });
      });

      // BUILD TABLE (ONLY SMALL CHANGE HERE)
         Object.keys(studentMap).forEach(studentId => {
  const data = studentMap[studentId];

  const total = data.present + data.late + data.absent;

  const percentage =
    total === 0
      ? 0
      : Math.round(((data.present + data.late * 0.5) / total) * 100);

  const row = document.createElement("tr");

  // 🔹 COLOR LOGIC (ONLY ADDITION)
  let bgColor = "";
  if (percentage >= 75) {
    bgColor = "green";
  } else if (percentage >= 50) {
    bgColor = "gold";   // yellow shade
  } else {
    bgColor = "red";
  }

  row.innerHTML = `
    <td>${studentId}</td>
    <td>${studentNames[studentId] || "-"}</td>
    <td>${data.present}</td>
    <td>${data.late}</td>
    <td>${data.absent}</td>
    <td style="background:${bgColor}; color:white; font-weight:bold;">
      ${percentage}%
    </td>
  `;

  reportBody.appendChild(row);
});
 

    });
});

