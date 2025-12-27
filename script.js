const form = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");
const filter = document.getElementById("filterCategory");
const themeToggle = document.getElementById("themeToggle");

let issues = JSON.parse(localStorage.getItem("issues")) || [];

/* THEME TOGGLE */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

/* FORM SUBMIT */
form.addEventListener("submit", function(e) {
  e.preventDefault();

  const issue = {
    name: document.getElementById("name").value || "Anonymous",
    category: document.getElementById("category").value,
    location: document.getElementById("location").value,
    description: document.getElementById("description").value,
    priority: document.getElementById("priority").value,
    status: "Pending"
  };

  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  form.reset();
  displayIssues(filter.value);
});

/* FILTER */
filter.addEventListener("change", () => {
  displayIssues(filter.value);
});

/* DISPLAY ISSUES */
function displayIssues(category = "All") {
  issueList.innerHTML = "";
  issues
    .filter(issue => category === "All" || issue.category === category)
    .forEach(issue => {
      issueList.innerHTML += `
        <div class="issue-card">
          <strong>${issue.category}</strong><br>
          Priority: 
          <span class="priority-${issue.priority.toLowerCase()}">
            ${issue.priority}
          </span><br>
          👤 ${issue.name}<br>
          📍 ${issue.location}<br>
          📝 ${issue.description}<br>
          <div class="status ${issue.status === "Pending" ? "pending" : "resolved"}">
            🔄 Status: ${issue.status}
          </div>
        </div>
      `;
    });
}

displayIssues();
