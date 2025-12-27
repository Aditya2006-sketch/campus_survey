// ---------------- Issue Reporting ----------------
const issueForm = document.getElementById("issueForm");
const issueList = document.getElementById("issueList");
const imagesInput = document.getElementById("issueImages");
const imagesPreview = document.getElementById("imagesPreview");
const getLocationBtn = document.getElementById("getLocationBtn");
const locationStatus = document.getElementById("locationStatus");

let issues = JSON.parse(localStorage.getItem("issues")) || [];
let exactLocation = "";
let imagesArray = [];

imagesInput.addEventListener("change", function(){
    imagesArray=[];
    imagesPreview.innerHTML="";
    Array.from(this.files).forEach(file=>{
        const reader = new FileReader();
        reader.onload=()=>{
            imagesArray.push(reader.result);
            const img = document.createElement("img");
            img.src=reader.result;
            imagesPreview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
});

getLocationBtn.onclick = ()=>{
    if(!navigator.geolocation){locationStatus.innerText="Geolocation not supported"; return;}
    locationStatus.innerText="Fetching location...";
    navigator.geolocation.getCurrentPosition(
        pos=>{
            exactLocation=`Lat: ${pos.coords.latitude.toFixed(5)}, Lng: ${pos.coords.longitude.toFixed(5)}`;
            locationStatus.innerText="📍 Location captured";
        },
        ()=> locationStatus.innerText="❌ Location denied"
    );
};

if(issueForm){
    issueForm.onsubmit = e=>{
        e.preventDefault();
        const issue = {
            name: document.getElementById("name").value || "Anonymous",
            category: document.getElementById("category").value,
            location: document.getElementById("location").value,
            exactLocation: exactLocation || "Not provided",
            description: document.getElementById("description").value,
            priority: document.getElementById("priority").value,
            status:"Pending",
            images: imagesArray
        };
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues));
        issueForm.reset();
        imagesPreview.innerHTML="";
        imagesArray=[];
        exactLocation="";
        displayIssues();
    };
}

function displayIssues(){
    if(!issueList) return;
    issueList.innerHTML="";
    issues.forEach(issue=>{
        let imgs="";
        if(issue.images && issue.images.length>0){
            imgs = issue.images.map(img=>`<img src="${img}">`).join("");
        }
        issueList.innerHTML+=`
        <div class="issue-card">
            <b>${issue.category}</b><br>
            📍 ${issue.location}<br>
            🌐 ${issue.exactLocation}<br>
            📝 ${issue.description}<br>
            ${imgs}
        </div>`;
    });
}
displayIssues();

// ---------------- Anti-Ragging ----------------
const ragForm = document.getElementById("raggingForm");
const raggingList = document.getElementById("raggingList");
let raggingIssues = JSON.parse(localStorage.getItem("raggingIssues")) || [];
let ragExactLocation = "";
let ragImagesArray = [];

if(ragForm){
    const ragName = document.getElementById("ragName");
    const ragCategory = document.getElementById("ragCategory");
    const ragLocationInput = document.getElementById("ragLocation");
    const ragGetLocationBtn = document.getElementById("ragGetLocationBtn");
    const ragLocationStatus = document.getElementById("ragLocationStatus");
    const ragDescription = document.getElementById("ragDescription");
    const ragPriority = document.getElementById("ragPriority");
    const ragImagesInput = document.getElementById("ragImages");
    const ragImagesPreview = document.getElementById("ragImagesPreview");

    ragImagesInput.addEventListener("change", function(){
        ragImagesArray=[];
        ragImagesPreview.innerHTML="";
        Array.from(this.files).forEach(file=>{
            const reader = new FileReader();
            reader.onload=()=>{
                ragImagesArray.push(reader.result);
                const img = document.createElement("img");
                img.src=reader.result;
                ragImagesPreview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    });

    ragGetLocationBtn.onclick = ()=>{
        if(!navigator.geolocation){ragLocationStatus.innerText="Geolocation not supported"; return;}
        ragLocationStatus.innerText="Fetching location...";
        navigator.geolocation.getCurrentPosition(
            pos=>{
                ragExactLocation=`Lat: ${pos.coords.latitude.toFixed(5)}, Lng: ${pos.coords.longitude.toFixed(5)}`;
                ragLocationStatus.innerText="📍 Location captured";
            },
            ()=> ragLocationStatus.innerText="❌ Location denied"
        );
    };

    ragForm.onsubmit = e=>{
        e.preventDefault();
        const ragIssue = {
            name: ragName.value || "Anonymous",
            category: ragCategory.value,
            location: ragLocationInput.value,
            exactLocation: ragExactLocation || "Not provided",
            description: ragDescription.value,
            priority: ragPriority.value,
            status:"Pending",
            images: ragImagesArray
        };
        raggingIssues.push(ragIssue);
        localStorage.setItem("raggingIssues", JSON.stringify(raggingIssues));
        ragForm.reset();
        ragImagesPreview.innerHTML="";
        ragImagesArray=[];
        ragExactLocation="";
        displayRaggingIssues();
    };
}

function displayRaggingIssues(){
    if(!raggingList) return;
    raggingList.innerHTML="";
    raggingIssues.forEach(issue=>{
        let imgs="";
        if(issue.images && issue.images.length>0){
            imgs = issue.images.map(img=>`<img src="${img}">`).join("");
        }
        raggingList.innerHTML+=`
        <div class="issue-card">
            <b>${issue.category}</b><br>
            📍 ${issue.location}<br>
            🌐 ${issue.exactLocation}<br>
            📝 ${issue.description}<br>
            ${imgs}
        </div>`;
    });
}
displayRaggingIssues();
