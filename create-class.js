// Store students temporarily
let students = [];

// Wait for page to fully load
document.addEventListener("DOMContentLoaded", function () {

    const addBtn = document.getElementById("addStudentBtn");
    const studentList = document.getElementById("studentList");
    const form = document.getElementById("createClassForm");

    addBtn.addEventListener("click", function () {

        const idInput = document.getElementById("studentIdInput");
        const nameInput = document.getElementById("studentNameInput");

        const id = idInput.value.trim();
        const name = nameInput.value.trim();

        if (id === "" || name === "") {
            alert("Enter student ID and name");
            return;
        }

           students.push({ studentId: id, studentName: name });

        const div = document.createElement("div");
        div.textContent = id + " - " + name;
        studentList.appendChild(div);

        idInput.value = "";
        nameInput.value = "";
    });

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const className = document.getElementById("className").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const classTime = document.getElementById("classTime").value.trim();    
        if (className === "" || subject === "") {
            alert("Enter class and subject");
            return;
        }

        if (students.length === 0) {
            alert("Add at least one student");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));

        const newClass = {
            className,
            subject,
            classTime,
            students,
            adminId: user.adminId
        };

        const res = await fetch("http://localhost:5000/api/admin/create-class", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newClass)
        });

        if (!res.ok) {
            alert("Failed to save class");
            return;
        }

        alert("Class Saved Successfully!");
        window.location.reload();
    });

});     



