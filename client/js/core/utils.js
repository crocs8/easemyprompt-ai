// client/js/core/utils.js
window.API_BASE_URL = "http://localhost:5000/api";

window.getToken = () => localStorage.getItem("token");

window.setToken = (token) => {
  localStorage.setItem("token", token);
};

window.logout = () => {
  localStorage.removeItem("token");
  window.location.href = "index.html";
};

window.authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`
});
