const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", async () => {

    const role = document.getElementById("role").value;
    const id = document.getElementById("id").value;
    const password = document.getElementById("password").value;

    if (!role || !id || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, id, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Store user data
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("role", role);

      // Redirect
      if (role === "student") {
        window.location.href = "../dashboard/student/student-dashboard.html";
      } else {
        window.location.href = "../dashboard/admin/admin-dashboard.html";
      }

    } catch (err) {
      alert("Backend not reachable");
      console.error(err);
    }

  });
}


