const form = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");
const imageInput = document.getElementById("issueImage");
const preview = document.getElementById("imagePreview");
const themeToggle = document.getElementById("themeToggle");

let issues = JSON.parse(localStorage.getItem("issues")) || [];

themeToggle.onclick = () => document.body.classList.toggle("dark-mode");

imageInput.onchange = () => {
  const file = imageInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
};

form.onsubmit = e => {
  e.preventDefault();

  const issue = {
    name: name.value || "Anonymous",
    category: category.value,
    location: location.value,
    description: description.value,
    priority: priority.value,
    status: "Pending",
    image: preview.src || null
  };

  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  form.reset();
  preview.style.display="none";
  preview.src="";
  displayIssues();
};

function displayIssues(){
  issueList.innerHTML="";
  issues.forEach(issue=>{
    issueList.innerHTML+=`
      <div class="issue-card">
        <b>${issue.category}</b> (${issue.priority})<br>
        ${issue.location}<br>
        ${issue.description}<br>
        ${issue.image ? `<img src="${issue.image}" style="width:100%;margin-top:10px;border-radius:10px">` : ""}
      </div>
    `;
  });
}
displayIssues();
