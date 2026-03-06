const admin = JSON.parse(localStorage.getItem("loggedAdmin"));
document.getElementById("adminName").innerText =
  `Welcome, ${admin.name}`;

function go(page) {
  location.href = `../../admin-modules/${page}.html`;
}

function logout() {
  localStorage.removeItem("loggedAdmin");
  location.href = "../../login/login.html";
}
