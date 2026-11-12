// ===== 1. Dark mode button =====
const themeToggle = document.getElementById("themeToggle");

function setTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch (e) {
    // localStorage may be blocked, the button still works
  }
}

// load the theme saved last time
let savedTheme = null;
try {
  savedTheme = localStorage.getItem("theme");
} catch (e) {}
setTheme(savedTheme === "dark");

themeToggle.addEventListener("click", function () {
  const isDark = !document.body.classList.contains("dark");
  setTheme(isDark);
});

// ===== 2. Mobile menu (open / close) =====
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", isOpen);
});

// close the menu after clicking a link
const navItems = document.querySelectorAll(".nav-item");
navItems.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", false);
  });
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
