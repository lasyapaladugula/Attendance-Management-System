const student = JSON.parse(localStorage.getItem("user"));

if (!student) {
  alert("Please login again.");
  window.location.href = "../../login/login.html";
}

// Show Welcome Name Only
document.getElementById("studentName").innerText =
  "Welcome, " + (student.name || student.fullName || "Student");

const tableBody = document.querySelector("#attendanceTable");
const datePicker = document.getElementById("datePicker");

// Use correct studentId
const studentId = student.studentId;

let attendanceData = {};

// FETCH DATA
fetch(`http://localhost:5000/api/student/attendance/${studentId}`)
  .then(response => response.json())
  .then(data => {

    console.log("API DATA:", data);

    attendanceData = data;

    renderTable();

    // when user clicks calendar date
    datePicker.addEventListener("change", renderTable);
  })
  .catch(error => {
    console.error("Error:", error);
  });

function renderTable(){

  tableBody.innerHTML = "";

  if (!attendanceData || Object.keys(attendanceData).length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6">No attendance records found</td>
      </tr>
    `;
    return;
  }

  let overallPresent = 0;
  let overallLate = 0;
  let overallTotal = 0;

  const selectedDate = datePicker.value;
  const today = new Date().toISOString().split("T")[0];

  // SUBJECT LOOP
  Object.keys(attendanceData).forEach(subject => {

    if (!subject || subject === "Unknown") return;

    // DATE FILTER (calendar click)
    if(selectedDate && selectedDate !== today){
      return;
    }

    const present = attendanceData[subject].present || 0;
    const late = attendanceData[subject].late || 0;
    const absent = attendanceData[subject].absent || 0;

    const total = present + late + absent;

    if (total === 0) return;

    const attended = present + late;
    const percent = Math.round((attended / total) * 100);

    overallPresent += present;
    overallLate += late;
    overallTotal += total;

    let color = "#2ecc71";

    if (percent < 55) {
      color = "#e74c3c";
    } else if (percent < 75) {
      color = "#f39c12";
    }

    const displayDate = new Date().toLocaleDateString();

    tableBody.innerHTML += `
      <tr>
        <td>${displayDate}</td>
        <td>${subject}</td>
        <td>
          <div style="
            background:${color};
            color:white;
            padding:8px;
            border-radius:8px;
            font-weight:bold;
            text-align:center;
          ">
            ${percent}% (${attended} / ${total})
          </div>
        </td>
        <td>${present}</td>
        <td>${late}</td>
        <td>${absent}</td>
      </tr>
    `;
  });

  // OVERALL ROW
  const overallPercent = overallTotal
    ? Math.round(((overallPresent + overallLate) / overallTotal) * 100)
    : 0;

  let overallColor = "#2ecc71";

  if (overallPercent < 55) {
    overallColor = "#e74c3c";
  } else if (overallPercent < 75) {
    overallColor = "#f39c12";
  }

  tableBody.innerHTML += `
    <tr style="font-weight:bold;">
      <td>-</td>
      <td>Overall</td>
      <td>
        <div style="
          background:${overallColor};
          color:white;
          padding:8px;
          border-radius:8px;
          text-align:center;
        ">
          ${overallPercent}%
        </div>
      </td>
      <td>${overallPresent}</td>
      <td>${overallLate}</td>
      <td>${overallTotal - overallPresent - overallLate}</td>
    </tr>
  `;
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  window.location.href = "../../login/login.html";
}