let examData = JSON.parse(localStorage.getItem("examData")) || [];

function renderExam(){

const container=document.getElementById("examContainer");

container.innerHTML="";

examData.forEach((course,index)=>{

let html=`

<div class="course-card">

<h3>${course.name}</h3>

<button class="btn-outline"
onclick="openExamModal(${index})">

➕ เพิ่มข้อสอบ

</button>

<h4>📘 กลางภาค</h4>

`;

course.mid.forEach(e=>{

html+=`

<div class="week-card">

${e.title}

<a href="${e.drive}" target="_blank"
class="drive-btn">

<i class="fa-brands fa-google-drive"></i>

เปิดข้อสอบ

</a>

</div>

`;

});

html+=`<h4>📕 ปลายภาค</h4>`;

course.final.forEach(e=>{

html+=`

<div class="week-card">

${e.title}

<a href="${e.drive}" target="_blank"
class="drive-btn">

<i class="fa-brands fa-google-drive"></i>

เปิดข้อสอบ

</a>

</div>

`;

});

html+=`</div>`;

container.innerHTML+=html;

});

}


function addExamCourse(){

let name=prompt("ชื่อรายวิชา");

if(!name) return;

examData.push({

name:name,
mid:[],
final:[]

});

saveExam();

renderExam();

}


let currentCourseIndex=null;

function openExamModal(index){

currentCourseIndex=index;

document.getElementById("examModal").style.display="flex";

}


function closeExamModal(){

document.getElementById("examModal").style.display="none";

}


function saveExam(){

let type=document.getElementById("examType").value;

let title=document.getElementById("examTitle").value;

let drive=document.getElementById("examDrive").value;

examData[currentCourseIndex][type].push({

title,
drive

});

saveExamData();

closeExamModal();

renderExam();

}


function saveExamData(){

localStorage.setItem("examData",
JSON.stringify(examData));

}


document.addEventListener("DOMContentLoaded",renderExam);