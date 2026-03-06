// =======================
// ADMIN SIGNUP
// =======================
const adminForm = document.getElementById("adminSignupForm");

if (adminForm) {
  adminForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const adminId = document.getElementById("adminId").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, name, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Signup failed");
        return;
      }

      alert("Admin registered successfully");
      window.location.href = "../login/login.html";

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }
  });
}


// =======================
// STUDENT SIGNUP (BUTTON VERSION)
// =======================

const signupBtn = document.getElementById("signupBtn");

if (signupBtn) {
  signupBtn.addEventListener("click", async () => {

    const studentId = document.getElementById("studentId").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!studentId || !name || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          name,
          password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || data.error || "Signup failed");
        return;
      }

      alert("Student registered successfully");
      window.location.href = "../login/login.html";

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }
  });
}



