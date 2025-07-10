'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  if (modalContainer && overlay) {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    if (modalImg && modalTitle && modalText) {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
      testimonialsModalFunc();
    }
  });
}

// add click event to modal close button
if (modalCloseBtn) {
  modalCloseBtn.addEventListener("click", testimonialsModalFunc);
}
if (overlay) {
  overlay.addEventListener("click", testimonialsModalFunc);
}

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });
}

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    if (select) elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form && formBtn) {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}

//-----------------------------------*\
//  #THEME TOGGLE
//\*-----------------------------------*/

// theme toggle variables
const themeToggle = document.getElementById("theme-toggle");
const themeToggleMobile = document.getElementById("theme-toggle-mobile");
const html = document.documentElement;

// check for saved theme preference or default to light theme
const currentTheme = localStorage.getItem("theme") || "light";
if (currentTheme === "light") {
  html.classList.add("light-theme");
} else {
  html.classList.remove("light-theme");
}

// theme toggle functionality
function toggleTheme() {
  html.classList.toggle("light-theme");
  
  // save theme preference to localStorage
  const isLightTheme = html.classList.contains("light-theme");
  localStorage.setItem("theme", isLightTheme ? "light" : "dark");
}

// Make toggleTheme available globally
window.toggleTheme = toggleTheme;

// Function to set up theme toggle event listeners
function setupThemeToggles() {
  const themeToggle = document.getElementById("theme-toggle");
  const themeToggleMobile = document.getElementById("theme-toggle-mobile");
  
  // Add event listener to desktop toggle button
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }
  
  // Add event listener to mobile toggle button
  if (themeToggleMobile) {
    themeToggleMobile.addEventListener("click", toggleTheme);
  }
}

//-----------------------------------*\
//  #PROJECT MODAL
//\*-----------------------------------*/

// Project modal variables
const projectModal = document.querySelector("[data-project-modal]");
const projectModalOverlay = document.querySelector("[data-project-modal-overlay]");
const projectModalClose = document.querySelector("[data-project-modal-close]");
const projectModalContent = document.querySelector("[data-project-modal-content]");
const projectLinks = document.querySelectorAll(".project-link[data-project]");

// Project modal toggle function
const projectModalFunc = function () {
  projectModal.classList.toggle("active");
  document.body.style.overflow = projectModal.classList.contains("active") ? "hidden" : "";
}

// Load project content function
const loadProjectContent = async function (projectFile) {
  try {
    const response = await fetch(projectFile);
    const content = await response.text();
    projectModalContent.innerHTML = content;
    projectModalFunc();
  } catch (error) {
    console.error("Error loading project:", error);
    projectModalContent.innerHTML = "<p>Error loading project content. This will work when deployed to GitHub Pages.</p>";
    projectModalFunc();
  }
}

// add click event to all project links
for (let i = 0; i < projectLinks.length; i++) {
  projectLinks[i].addEventListener("click", function (e) {
    e.preventDefault();
    const projectFile = this.getAttribute("data-project");
    loadProjectContent(projectFile);
  });
}

// add click event to modal close button and overlay
projectModalClose.addEventListener("click", projectModalFunc);
projectModalOverlay.addEventListener("click", projectModalFunc);

// close modal with escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && projectModal.classList.contains("active")) {
    projectModalFunc();
  }
});

// Set up toggles when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  setupThemeToggles();
});

// Also try setting up immediately in case DOM is already ready
setupThemeToggles(); 