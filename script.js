const form = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");
const imageInput = document.getElementById("issueImage");
const preview = document.getElementById("imagePreview");
const themeToggle = document.getElementById("themeToggle");
const getLocationBtn = document.getElementById("getLocationBtn");
const locationStatus = document.getElementById("locationStatus");

let issues = JSON.parse(localStorage.getItem("issues")) || [];
let exactLocation = "";

themeToggle.onclick = () =>
  document.body.classList.toggle("dark-mode");

/* Image Preview */
imageInput.onchange = () => {
  const file = imageInput.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(file);
};

/* GPS Location */
getLocationBtn.onclick = () => {
  if(!navigator.geolocation){
    locationStatus.innerText = "Geolocation not supported";
    return;
  }
  locationStatus.innerText = "Fetching location...";
  navigator.geolocation.getCurrentPosition(
    pos => {
      exactLocation = `Lat: ${pos.coords.latitude.toFixed(5)}, Lng: ${pos.coords.longitude.toFixed(5)}`;
      locationStatus.innerText = "📍 Location captured";
    },
    () => locationStatus.innerText = "❌ Location denied"
  );
};

/* Submit Issue */
form.onsubmit = e => {
  e.preventDefault();

  const issue = {
    name: name.value || "Anonymous",
    category: category.value,
    location: location.value,
    exactLocation: exactLocation || "Not provided",
    description: description.value,
    priority: priority.value,
    status: "Pending",
    image: preview.src || null
  };

  issues.push(issue);
  localStorage.setItem("issues", JSON.stringify(issues));
  form.reset();
  preview.style.display="none";
  exactLocation="";
  displayIssues();
};

/* Display Issues */
function displayIssues(){
  issueList.innerHTML="";
  issues.forEach(issue=>{
    issueList.innerHTML+=`
      <div class="issue-card">
        <b>${issue.category}</b><br>
        📍 ${issue.location}<br>
        🌐 ${issue.exactLocation}<br>
        📝 ${issue.description}<br>
        ${issue.image ? `<img src="${issue.image}" style="width:100%;margin-top:10px;border-radius:10px">` : ""}
      </div>
    `;
  });
}
displayIssues();
