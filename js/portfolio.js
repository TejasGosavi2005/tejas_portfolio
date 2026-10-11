(function () {
  "use strict";

  var projectStorageKey = "tejasPortfolioProjects";
  var messageStorageKey = "tejasPortfolioMessages";
  var authStorageKey = "tejasPortfolioAdminAuth";
  var adminUsername = "Tejas";
  var adminPassword = "Tejas@9209";
  var defaultProjects = [
    {
      id: "internship-tracking-system",
      name: "Internship Tracking System",
      tech: "Laravel, MySQL, phpMyAdmin",
      details: "A complete system with task tracking, report management, and student workflow features."
    },
    {
      id: "japacounter-pro",
      name: "Japacounter Pro",
      tech: "Android, Java",
      details: "A devotional Android application for mantra counting and spiritual practices with a clean, user-friendly interface."
    },
    {
      id: "lawyer-portfolio-website",
      name: "Lawyer Portfolio Website",
      tech: "React.js",
      details: "A responsive lawyer portfolio website developed using React.js."
    }
  ];

  function getStoredJson(key, fallback) {
    try {
      var value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function getProjects() {
    var projects = getStoredJson(projectStorageKey, null);
    if (!Array.isArray(projects)) {
      projects = defaultProjects.slice();
      saveJson(projectStorageKey, projects);
    }
    return projects;
  }

  function renderProjects() {
    var projectList = document.getElementById("project-list");
    var adminProjects = document.getElementById("admin-projects");
    var projects = getProjects();

    if (projectList) {
      projectList.innerHTML = projects.map(function (project, index) {
        return "<div class=\"col-md-4 d-flex\"><article class=\"project-card\"><span class=\"project-index\">0" + (index + 1) + "</span><h3>" + escapeHtml(project.name) + "</h3><div class=\"project-tech\">" + escapeHtml(project.tech) + "</div><p>" + escapeHtml(project.details) + "</p></article></div>";
      }).join("");
    }

    if (adminProjects) {
      adminProjects.innerHTML = projects.length ? projects.map(function (project) {
        return "<div class=\"admin-project-row\"><div><strong>" + escapeHtml(project.name) + "</strong><span>" + escapeHtml(project.tech) + "</span></div><div><button type=\"button\" data-project-edit=\"" + escapeHtml(project.id) + "\">Edit</button><button type=\"button\" data-project-delete=\"" + escapeHtml(project.id) + "\">Delete</button></div></div>";
      }).join("") : "<p>No projects added yet.</p>";
    }
  }

  function renderMessages() {
    var messagesContainer = document.getElementById("admin-messages");
    if (!messagesContainer) {
      return;
    }

    var messages = getStoredJson(messageStorageKey, []);
    messagesContainer.innerHTML = messages.length ? messages.slice().reverse().map(function (message) {
      return "<div class=\"admin-message\"><strong>" + escapeHtml(message.name) + "</strong><small>" + escapeHtml(message.email) + " | " + escapeHtml(message.subject) + " | " + escapeHtml(message.date) + "</small><p>" + escapeHtml(message.message) + "</p></div>";
    }).join("") : "<p>No messages received yet.</p>";
  }

  function resetProjectForm() {
    var form = document.getElementById("project-form");
    if (form) {
      form.reset();
    }
    document.getElementById("project-id").value = "";
    document.getElementById("project-form-title").textContent = "Add project";
  }

  function setupProjectAdmin() {
    var projectForm = document.getElementById("project-form");
    var adminProjects = document.getElementById("admin-projects");
    var cancelButton = document.getElementById("project-cancel");

    if (!projectForm || !adminProjects) {
      return;
    }

    projectForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var projects = getProjects();
      var id = document.getElementById("project-id").value;
      var project = {
        id: id || "project-" + Date.now(),
        name: document.getElementById("project-name").value.trim(),
        tech: document.getElementById("project-tech").value.trim(),
        details: document.getElementById("project-details").value.trim()
      };
      var existingIndex = projects.findIndex(function (item) { return item.id === id; });

      if (existingIndex >= 0) {
        projects[existingIndex] = project;
      } else {
        projects.push(project);
      }
      saveJson(projectStorageKey, projects);
      renderProjects();
      resetProjectForm();
    });

    cancelButton.addEventListener("click", resetProjectForm);

    adminProjects.addEventListener("click", function (event) {
      var editId = event.target.getAttribute("data-project-edit");
      var deleteId = event.target.getAttribute("data-project-delete");
      var projects = getProjects();

      if (editId) {
        var project = projects.find(function (item) { return item.id === editId; });
        if (project) {
          document.getElementById("project-id").value = project.id;
          document.getElementById("project-name").value = project.name;
          document.getElementById("project-tech").value = project.tech;
          document.getElementById("project-details").value = project.details;
          document.getElementById("project-form-title").textContent = "Edit project";
          document.getElementById("project-form").scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }

      if (deleteId && window.confirm("Delete this project?")) {
        saveJson(projectStorageKey, projects.filter(function (item) { return item.id !== deleteId; }));
        renderProjects();
      }
    });
  }

  function showAdminRoute() {
    var adminSection = document.getElementById("admin-section");
    var loginPanel = document.getElementById("admin-login-panel");
    var dashboard = document.getElementById("admin-dashboard");
    if (!adminSection || !loginPanel || !dashboard) {
      return;
    }

    adminSection.hidden = false;
    var authenticated = sessionStorage.getItem(authStorageKey) === "true";
    loginPanel.hidden = authenticated;
    dashboard.hidden = !authenticated;
    renderMessages();
    renderProjects();
    adminSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function setupAdminAuth() {
    var loginForm = document.getElementById("admin-login-form");
    var logoutButton = document.getElementById("admin-logout");
    var loginStatus = document.getElementById("admin-login-status");

    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = document.getElementById("admin-username").value;
      var password = document.getElementById("admin-password").value;
      if (username === adminUsername && password === adminPassword) {
        sessionStorage.setItem(authStorageKey, "true");
        loginStatus.textContent = "";
        showAdminRoute();
      } else {
        loginStatus.textContent = "Invalid user ID or password.";
      }
    });

    logoutButton.addEventListener("click", function () {
      sessionStorage.removeItem(authStorageKey);
      window.location.hash = "#/Admin";
      showAdminRoute();
    });
  }

  function setupContactForm() {
    var form = document.getElementById("contact-form");
    if (!form) {
      return;
    }
    var status = document.createElement("p");
    status.className = "contact-status";
    status.setAttribute("role", "status");
    form.appendChild(status);

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var formData = new FormData(form);
      var messages = getStoredJson(messageStorageKey, []);
      messages.push({
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
        date: new Date().toLocaleString()
      });
      saveJson(messageStorageKey, messages);
      form.reset();
      status.textContent = "Your message has been sent successfully.";
    });
  }

  function setupTheme() {
    var toggle = document.getElementById("theme-toggle");
    var savedTheme = localStorage.getItem("tejasPortfolioTheme");
    if (savedTheme === "dark") {
      document.body.classList.add("portfolio-dark");
    }
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("portfolio-dark");
      localStorage.setItem("tejasPortfolioTheme", document.body.classList.contains("portfolio-dark") ? "dark" : "light");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderProjects();
    setupProjectAdmin();
    setupAdminAuth();
    setupContactForm();
    setupTheme();
    if (window.location.hash.toLowerCase() === "#/admin") {
      showAdminRoute();
    }
    window.addEventListener("hashchange", function () {
      if (window.location.hash.toLowerCase() === "#/admin") {
        showAdminRoute();
      }
    });
  });
}());
