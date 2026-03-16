let lessonData = JSON.parse(localStorage.getItem("lessonData")) || [];

function renderLessons(){

const container=document.getElementById("lessonContainer");

container.innerHTML="";

lessonData.forEach((course,index)=>{

let html=`

<div class="course-card">

<h3>📁 ${course.name}</h3>

<button class="btn-outline"
onclick="openWeekModal(${index})">

➕ เพิ่มสัปดาห์

</button>

<div class="week-grid">

`;

course.weeks.forEach(w=>{

html+=`

<div class="week-card">

<h4>${w.title}</h4>

<a href="${w.drive}" target="_blank"
class="drive-btn">

<i class="fa-brands fa-google-drive"></i>
เปิดใบงาน

</a>

</div>

`;

});

html+=`</div></div>`;

container.innerHTML+=html;

});

}


function addCourseFolder(){

let name=prompt("ชื่อรายวิชา");

if(!name) return;

lessonData.push({

name:name,

weeks:[]

});

saveLesson();

renderLessons();

}



let currentCourseIndex=null;

function openWeekModal(index){

currentCourseIndex=index;

document.getElementById("weekModal").style.display="flex";

}


function closeWeekModal(){

document.getElementById("weekModal").style.display="none";

}


function saveWeek(){

let title=document.getElementById("weekTitle").value;

let drive=document.getElementById("weekDrive").value;

lessonData[currentCourseIndex].weeks.push({

title,
drive

});

saveLesson();

closeWeekModal();

renderLessons();

}


function saveLesson(){

localStorage.setItem("lessonData",
JSON.stringify(lessonData));

}


document.addEventListener("DOMContentLoaded",renderLessons);