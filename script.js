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

// ===== 3. Highlight the menu link of the section on screen =====
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", function () {
  let current = "home";
  sections.forEach(function (section) {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.id;
    }
  });
  navItems.forEach(function (link) {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ===== 4. Project filter buttons =====
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    filterButtons.forEach(function (b) { b.classList.remove("active"); });
    button.classList.add("active");

    const filter = button.dataset.filter;
    projectCards.forEach(function (card) {
      const match = filter === "all" || card.dataset.category.includes(filter);
      card.classList.toggle("hide", !match);
    });
  });
});

// ===== 5. Check the contact form before submitting =====
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successText = document.getElementById("formSuccess");

function showError(input, errorId, text) {
  document.getElementById(errorId).textContent = text;
  input.classList.toggle("invalid", text !== "");
}

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading
  let ok = true;
  successText.textContent = "";

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (name.length < 2) {
    showError(nameInput, "nameError", "Please enter your name.");
    ok = false;
  } else {
    showError(nameInput, "nameError", "");
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, "emailError", "Please enter a valid email address.");
    ok = false;
  } else {
    showError(emailInput, "emailError", "");
  }

  if (message.length < 10) {
    showError(messageInput, "messageError", "Message should be at least 10 characters.");
    ok = false;
  } else {
    showError(messageInput, "messageError", "");
  }

  if (ok) {
    successText.textContent = "Thanks " + name + "! Your message is ready to send.";
    form.reset();
  }
});

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();
