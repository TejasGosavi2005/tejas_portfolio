(function () {
  "use strict";

  var contentKey = "tejasPortfolioContentV2";
  var projectKey = "tejasPortfolioProjects";
  var messageKey = "tejasPortfolioMessages";
  var defaultContent = {
    profile: {
      name: "Tejas Gosavi",
      role: "Web Developer & Prompt Engineer",
      about: "To work in a growth-oriented organization where I can apply my technical and problem-solving skills, gain practical experience, and build a strong career in IT through continuous learning and dedication.",
      education: "B.Sc. Computer Science",
      address: "Madhi Khurda, PO Kopergaon, Dist. Ahilyanagar, Maharashtra",
      zip: "423601",
      email: "tejasgosavi121@gmail.com",
      phone: "9373223756",
      github: "https://github.com/TejasGosavi2005",
      linkedin: "https://linkedin.com/in/tejas-gosavi-914b722b3"
    },
    hero: {
      greeting: "Hello!",
      title: "I'm Tejas Gosavi",
      subtitle: "Web Developer & Prompt Engineer",
      secondTitle: "I'm a developer from Maharashtra",
      image: "images/tejas-cutout.png",
      secondImage: "images/tejas1-cutout.png",
      aboutImage: "images/tejas1-cutout.png"
    },
    resume: [
      { id: "education-1", type: "Education", title: "B.Sc. Computer Science", position: "Sangamner Nagarpalika Arts, D.J. Malpani Commerce and B.N. Sarda Science College", details: "Bachelor of Science in Computer Science." },
      { id: "experience-1", type: "Experience", title: "Intern Web Developer", position: "InnovationsHub Private Limited, Nashik", details: "Worked with HTML5, CSS3, Bootstrap, JavaScript, React.js, PHP, MySQL, static websites, and dynamic websites." },
      { id: "experience-2", type: "Experience", title: "Intern Prompt Engineer", position: "InAmigos Foundation", details: "Worked with Generative AI, LLMs, ChatGPT, AI tools, prompt optimization, few-shot prompting, and AI content generation." },
      { id: "technical-1", type: "Technical Profile", title: "Full Stack Development", position: "Frontend, Backend & Database", details: "HTML5, CSS3, JavaScript, React.js, Bootstrap, PHP, Laravel, Python, Django, MySQL, and MongoDB." },
      { id: "technical-2", type: "Technical Profile", title: "Programming & Mobile", position: "Java, C, C++, Python & Android", details: "Programming fundamentals, Android application development, Java, and responsive user-focused interfaces." },
      { id: "technical-3", type: "Technical Profile", title: "AI & Development Tools", position: "Prompt Engineering & Modern AI", details: "Generative AI, LLMs, ChatGPT, prompt optimization, few-shot prompting, GitHub, VS Code, and Google AI Studio." }
    ],
    services: [
      { id: "service-1", name: "Web Design", icon: "flaticon-analysis" }, { id: "service-2", name: "Prompt Engineering", icon: "flaticon-flasks" },
      { id: "service-3", name: "Web Developer", icon: "flaticon-ideas" }, { id: "service-4", name: "Full Stack Development", icon: "flaticon-analysis" },
      { id: "service-5", name: "Data Analytics & Analysis", icon: "flaticon-analysis" }, { id: "service-6", name: "App Developing", icon: "flaticon-analysis" },
      { id: "service-7", name: "Backend Development", icon: "flaticon-flasks" }, { id: "service-8", name: "Android Development", icon: "flaticon-ideas" }
    ],
    skills: [
      { id: "skill-1", name: "Frontend Development", items: "HTML5, CSS3, JavaScript, React.js, Bootstrap", level: 90 }, { id: "skill-2", name: "Backend Development", items: "PHP, Laravel Framework, Python, Django, Java", level: 85 },
      { id: "skill-3", name: "Database", items: "MySQL, MongoDB", level: 95 }, { id: "skill-4", name: "Mobile Development", items: "Android, Java", level: 90 },
      { id: "skill-5", name: "Programming Languages", items: "C, C++, Java, Python, PHP, JavaScript", level: 70 }, { id: "skill-6", name: "Development Tools", items: "GitHub, VS Code", level: 80 },
      { id: "skill-7", name: "AI / Modern Skills", items: "Prompt Engineering, ChatGPT, GitHub Copilot, Google AI Studio", level: 100 }
    ]
  };

  function read(key, fallback) {
    try { var value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch (error) { return fallback; }
  }

  function write(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  function getContent() {
    var saved = read(contentKey, {});
    var content = JSON.parse(JSON.stringify(defaultContent));
    Object.keys(saved).forEach(function (key) { content[key] = saved[key]; });
    return content;
  }

  function setBackground(id, value) {
    var element = document.getElementById(id);
    if (element && value) { element.style.backgroundImage = "url(\"" + value.replace(/"/g, "&quot;") + "\")"; }
  }

  function renderContent() {
    var content = getContent();
    var profile = content.profile;
    var hero = content.hero;
    var setText = function (id, value) { var element = document.getElementById(id); if (element) { element.textContent = value || ""; } };
    setText("hero-greeting-1", hero.greeting); setText("hero-greeting-2", hero.greeting);
    setText("hero-title-1", hero.title); setText("hero-subtitle-1", hero.subtitle); setText("hero-title-2", hero.secondTitle);
    setBackground("hero-image-1", hero.image); setBackground("hero-image-2", hero.secondImage); setBackground("about-image", hero.aboutImage);
    setText("about-description", profile.about);
    var aboutList = document.getElementById("about-info-list");
    if (aboutList) {
      aboutList.innerHTML = [["Name", profile.name], ["Education", profile.education], ["Address", profile.address], ["Zip code", profile.zip], ["Email", profile.email], ["Phone", profile.phone]].map(function (item) { return "<li class=\"d-flex\"><span>" + escapeHtml(item[0]) + ":</span> <span>" + escapeHtml(item[1]) + "</span></li>"; }).join("");
    }
    setText("contact-address", profile.address + " - " + profile.zip);
    var phone = document.getElementById("contact-phone"); if (phone) { phone.textContent = profile.phone; phone.href = "tel:" + profile.phone.replace(/\D/g, ""); }
    var email = document.getElementById("contact-email"); if (email) { email.textContent = profile.email; email.href = "mailto:" + profile.email; }
    var website = document.getElementById("contact-website"); if (website) { website.textContent = profile.github.replace(/^https?:\/\//, ""); website.href = profile.github; }
    setText("footer-about", profile.name + " | " + profile.role + ".");
    var footerGithub = document.getElementById("footer-github"); if (footerGithub) { footerGithub.href = profile.github; }
    var footerLinkedin = document.getElementById("footer-linkedin"); if (footerLinkedin) { footerLinkedin.href = profile.linkedin; }
    setText("footer-address", profile.address + " - " + profile.zip);
    var footerPhone = document.getElementById("footer-phone"); if (footerPhone) { footerPhone.href = "tel:" + profile.phone.replace(/\D/g, ""); footerPhone.querySelector(".text").textContent = profile.phone; }
    var footerEmail = document.getElementById("footer-email"); if (footerEmail) { footerEmail.href = "mailto:" + profile.email; footerEmail.querySelector(".text").textContent = profile.email; }
    renderResume(content.resume); renderServices(content.services); renderSkills(content.skills); renderProjects(); renderAdminLists();
  }

  function renderResume(items) {
    ["resume-list-left", "resume-list-right"].forEach(function (id) { var element = document.getElementById(id); if (element) { element.innerHTML = ""; } });
    items.forEach(function (item, index) { var target = document.getElementById(index < Math.ceil(items.length / 2) ? "resume-list-left" : "resume-list-right"); if (target) { target.insertAdjacentHTML("beforeend", "<div class=\"resume-wrap ftco-animate\"><span class=\"date\">" + escapeHtml(item.type) + "</span><h2>" + escapeHtml(item.title) + "</h2><span class=\"position\">" + escapeHtml(item.position) + "</span><p class=\"mt-4\">" + escapeHtml(item.details) + "</p></div>"); } });
  }

  function renderServices(items) {
    var list = document.getElementById("services-list"); if (!list) { return; }
    list.innerHTML = items.map(function (item) { return "<div class=\"col-md-4 text-center d-flex ftco-animate\"><a href=\"#\" class=\"services-1\"><span class=\"icon\"><i class=\"" + escapeHtml(item.icon || "flaticon-analysis") + "\"></i></span><div class=\"desc\"><h3 class=\"mb-5\">" + escapeHtml(item.name) + "</h3></div></a></div>"; }).join("");
  }

  function renderSkills(items) {
    var list = document.getElementById("skills-list"); if (!list) { return; }
    list.innerHTML = items.map(function (item, index) { var level = Math.max(0, Math.min(100, Number(item.level) || 0)); return "<div class=\"col-md-6 animate-box\"><div class=\"progress-wrap ftco-animate\"><h3>" + escapeHtml(item.name) + "</h3><div class=\"progress\"><div class=\"progress-bar color-" + ((index % 6) + 1) + "\" role=\"progressbar\" aria-valuenow=\"" + level + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + level + "%\"><span>" + escapeHtml(item.items) + "</span></div></div></div></div>"; }).join("");
  }

  function getProjects() { var projects = read(projectKey, null); return Array.isArray(projects) ? projects : []; }

  function renderProjects() {
    var list = document.getElementById("project-list"); if (!list) { return; }
    var projects = getProjects(); list.innerHTML = projects.map(function (project, index) { return "<div class=\"col-md-4 d-flex\"><article class=\"project-card\">" + (project.image ? "<img class=\"project-card-image\" src=\"" + escapeHtml(project.image) + "\" alt=\"\">" : "") + "<span class=\"project-index\">" + ("0" + (index + 1)).slice(-2) + "</span><h3>" + escapeHtml(project.name) + "</h3><div class=\"project-tech\">" + escapeHtml(project.tech) + "</div><p>" + escapeHtml(project.details) + "</p></article></div>"; }).join("");
  }

  function row(item, type, title, fields) { return "<div class=\"admin-project-row\"><div><strong>" + escapeHtml(title) + "</strong><span>" + escapeHtml(fields) + "</span></div><div><button type=\"button\" data-" + type + "-edit=\"" + escapeHtml(item.id) + "\">Edit</button><button type=\"button\" data-" + type + "-delete=\"" + escapeHtml(item.id) + "\">Delete</button></div></div>"; }

  function renderAdminLists() {
    var content = getContent(); var set = function (id, html, empty) { var element = document.getElementById(id); if (element) { element.innerHTML = html || "<p>" + empty + "</p>"; } };
    set("admin-resume", content.resume.map(function (item) { return row(item, "resume", item.title, item.type + " | " + item.position); }).join(""), "No resume items yet.");
    set("admin-services", content.services.map(function (item) { return row(item, "service", item.name, item.icon); }).join(""), "No services yet.");
    set("admin-skills", content.skills.map(function (item) { return row(item, "skill", item.name, item.items + " | " + item.level + "%"); }).join(""), "No skills yet.");
    var projects = getProjects(); set("admin-projects", projects.map(function (item) { return row(item, "project", item.name, item.tech); }).join(""), "No projects added yet.");
    var messages = read(messageKey, []); set("admin-messages", messages.slice().reverse().map(function (item, index) { return "<div class=\"admin-message\"><strong>" + escapeHtml(item.name) + "</strong><small>" + escapeHtml(item.email) + " | " + escapeHtml(item.subject) + " | " + escapeHtml(item.date) + "</small><p>" + escapeHtml(item.message) + "</p><button type=\"button\" class=\"admin-delete-message\" data-message-index=\"" + (messages.length - 1 - index) + "\">Delete message</button></div>"; }).join(""), "No messages received yet.");
  }

  function fill(id, value) { var element = document.getElementById(id); if (element) { element.value = value == null ? "" : value; } }
  function clearForm(id) { var form = document.getElementById(id); if (form) { form.reset(); } }
  function bindFile(fileId, inputId) { var file = document.getElementById(fileId); if (file) { file.addEventListener("change", function () { var selected = file.files[0]; if (!selected) { return; } var reader = new FileReader(); reader.onload = function () { fill(inputId, reader.result); }; reader.readAsDataURL(selected); }); } }

  function setupProfile() {
    var form = document.getElementById("profile-form"); if (!form) { return; }
    form.addEventListener("submit", function (event) { event.preventDefault(); var content = getContent(); content.profile = { name: document.getElementById("profile-name").value.trim(), role: document.getElementById("profile-role").value.trim(), about: document.getElementById("profile-about").value.trim(), education: document.getElementById("profile-education").value.trim(), address: document.getElementById("profile-address").value.trim(), zip: document.getElementById("profile-zip").value.trim(), email: document.getElementById("profile-email").value.trim(), phone: document.getElementById("profile-phone").value.trim(), github: document.getElementById("profile-github").value.trim(), linkedin: document.getElementById("profile-linkedin").value.trim() }; write(contentKey, content); renderContent(); document.getElementById("profile-status").textContent = "Profile saved."; });
  }

  function setupHero() {
    var form = document.getElementById("hero-form"); if (!form) { return; }
    form.addEventListener("submit", function (event) { event.preventDefault(); var content = getContent(); content.hero = { greeting: document.getElementById("hero-greeting-input").value.trim(), title: document.getElementById("hero-title-input").value.trim(), subtitle: document.getElementById("hero-subtitle-input").value.trim(), secondTitle: document.getElementById("hero-second-title-input").value.trim(), image: document.getElementById("hero-image-input").value.trim(), secondImage: document.getElementById("hero-second-image-input").value.trim(), aboutImage: document.getElementById("about-image-input").value.trim() }; write(contentKey, content); renderContent(); document.getElementById("hero-status").textContent = "Hero and images saved."; });
  }

  function setupCollectionForm(formId, collection, fields, titleId, cancelId) {
    var form = document.getElementById(formId); if (!form) { return; }
    form.addEventListener("submit", function (event) { event.preventDefault(); var content = getContent(); var id = document.getElementById(fields.id).value; var item = { id: id || collection + "-" + Date.now() }; fields.keys.forEach(function (key) { var element = document.getElementById(fields[key]); item[key] = element.type === "number" ? Number(element.value) : element.value.trim(); }); var index = content[collection].findIndex(function (entry) { return entry.id === id; }); if (index >= 0) { content[collection][index] = item; } else { content[collection].push(item); } write(contentKey, content); renderContent(); clearForm(formId); document.getElementById(fields.id).value = ""; if (titleId) { document.getElementById(titleId).textContent = "Add " + collection.slice(0, -1); } });
    var cancel = document.getElementById(cancelId); if (cancel) { cancel.addEventListener("click", function () { clearForm(formId); document.getElementById(fields.id).value = ""; }); }
  }

  function setupProjectForm() {
    var form = document.getElementById("project-form"); if (!form) { return; }
    form.addEventListener("submit", function (event) { event.preventDefault(); event.stopImmediatePropagation(); var projects = getProjects(); var id = document.getElementById("project-id").value; var item = { id: id || "project-" + Date.now(), name: document.getElementById("project-name").value.trim(), tech: document.getElementById("project-tech").value.trim(), details: document.getElementById("project-details").value.trim(), image: document.getElementById("project-image").value.trim() }; var index = projects.findIndex(function (entry) { return entry.id === id; }); if (index >= 0) { projects[index] = item; } else { projects.push(item); } write(projectKey, projects); renderContent(); clearForm("project-form"); }, true);
  }

  function setupAdminInteractions() {
    document.addEventListener("click", function (event) {
      var target = event.target; var content = getContent(); var id;
      ["resume", "service", "skill"].some(function (type) { id = target.getAttribute("data-" + type + "-edit"); if (!id) { return false; } var item = content[type === "resume" ? "resume" : type + "s"].find(function (entry) { return entry.id === id; }); if (!item) { return true; } Object.keys(item).forEach(function (key) { fill(type + "-" + (key === "id" ? "id" : key), item[key]); }); var title = document.getElementById(type + "-form-title"); if (title) { title.textContent = "Edit " + type; } return true; });
      ["resume", "service", "skill"].some(function (type) { id = target.getAttribute("data-" + type + "-delete"); if (!id) { return false; } var key = type === "resume" ? "resume" : type + "s"; content[key] = content[key].filter(function (entry) { return entry.id !== id; }); write(contentKey, content); renderContent(); return true; });
      id = target.getAttribute("data-project-edit"); if (id) { var projects = getProjects(); var project = projects.find(function (entry) { return entry.id === id; }); if (project) { fill("project-id", project.id); fill("project-name", project.name); fill("project-tech", project.tech); fill("project-details", project.details); fill("project-image", project.image); } }
      id = target.getAttribute("data-project-delete"); if (id) { write(projectKey, getProjects().filter(function (entry) { return entry.id !== id; })); renderContent(); }
      id = target.getAttribute("data-message-index"); if (id !== null) { var messages = read(messageKey, []); messages.splice(Number(id), 1); write(messageKey, messages); renderAdminLists(); }
    });
  }

  function fillAdminForms() {
    var content = getContent(); var profile = content.profile; Object.keys(profile).forEach(function (key) { fill("profile-" + key, profile[key]); });
    var hero = content.hero; fill("hero-greeting-input", hero.greeting); fill("hero-title-input", hero.title); fill("hero-subtitle-input", hero.subtitle); fill("hero-second-title-input", hero.secondTitle); fill("hero-image-input", hero.image); fill("hero-second-image-input", hero.secondImage); fill("about-image-input", hero.aboutImage);
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!localStorage.getItem(contentKey)) { write(contentKey, defaultContent); }
    renderContent(); fillAdminForms(); setupProfile(); setupHero(); setupProjectForm();
    setupCollectionForm("resume-form", "resume", { id: "resume-id", keys: ["type", "title", "position", "details"], type: "resume-type", title: "resume-title", position: "resume-position", details: "resume-details" }, "resume-form-title", "resume-cancel");
    setupCollectionForm("service-form", "services", { id: "service-id", keys: ["name", "icon"], name: "service-name", icon: "service-icon" }, "service-form-title", "service-cancel");
    setupCollectionForm("skill-form", "skills", { id: "skill-id", keys: ["name", "items", "level"], name: "skill-name", items: "skill-items", level: "skill-level" }, "skill-form-title", "skill-cancel");
    ["hero-image-file", "hero-second-image-file", "about-image-file", "project-image-file"].forEach(function (fileId) { bindFile(fileId, fileId.replace("-file", "-input").replace("project-image-input", "project-image")); });
    setupAdminInteractions();
    window.addEventListener("hashchange", function () { if (window.location.hash.toLowerCase() === "#/admin") { setTimeout(function () { fillAdminForms(); renderAdminLists(); }, 50); } });
  });
}());