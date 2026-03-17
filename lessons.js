let lessonData = JSON.parse(localStorage.getItem("lessonData")) || [];

let currentCourseIndex = null;
let editWeekIndex = null;
let editMode = false;


/* =========================
   Render
========================= */

function renderLessons(){

const container=document.getElementById("lessonContainer");

container.innerHTML="";

lessonData.forEach((course,index)=>{

let html=`

<div class="course-card">

<div class="course-header">
<h3>${course.code} - ${course.name}</h3>
<p class="course-level">${course.level}</p>

<div>

<button class="btn-edit"
onclick="editCourse(${index})">✏️</button>

<button class="btn-delete"
onclick="deleteCourse(${index})">❌</button>

</div>

</div>

<button class="btn-outline"
onclick="openWeekModal(${index})">

➕ เพิ่มสัปดาห์

</button>

<div class="week-grid">

`;

course.weeks.forEach((w,i)=>{

html+=`

<div class="week-card">

<div>

<h4>${w.title}</h4>

<a href="${w.drive}" target="_blank"
class="drive-btn">

<i class="fa-brands fa-google-drive"></i>
เปิดใบงาน

</a>

</div>

<div>

<button class="btn-edit"
onclick="editWeek(${index},${i})">✏️</button>

<button class="btn-delete"
onclick="deleteWeek(${index},${i})">🗑</button>

</div>

</div>

`;

});

html+=`</div></div>`;

container.innerHTML+=html;

});

}


/* =========================
   เพิ่มรายวิชา
========================= */

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


/* =========================
   แก้ไขรายวิชา
========================= */

function editCourse(index){

let newName = prompt("แก้ไขชื่อรายวิชา", lessonData[index].name);

if(!newName) return;

lessonData[index].name = newName;

saveLesson();
renderLessons();

}


/* =========================
   ลบรายวิชา
========================= */

function deleteCourse(index){

if(confirm("ลบรายวิชานี้?")){

lessonData.splice(index,1);

saveLesson();
renderLessons();

}

}


/* =========================
   เพิ่ม / แก้ไขสัปดาห์
========================= */

function openWeekModal(index){

currentCourseIndex=index;

editMode=false;

document.getElementById("weekTitle").value="";
document.getElementById("weekDrive").value="";

document.getElementById("weekModal").style.display="flex";

}


/* แก้ไขสัปดาห์ */

function editWeek(courseIndex,weekIndex){

currentCourseIndex=courseIndex;
editWeekIndex=weekIndex;
editMode=true;

let data=lessonData[courseIndex].weeks[weekIndex];

document.getElementById("weekTitle").value=data.title;
document.getElementById("weekDrive").value=data.drive;

document.getElementById("weekModal").style.display="flex";

}


/* save */

function saveWeek(){

let title=document.getElementById("weekTitle").value;
let drive=document.getElementById("weekDrive").value;

if(!title){

alert("กรุณาเลือกสัปดาห์");

return;

}

/* กันสัปดาห์ซ้ำ */

let exists = lessonData[currentCourseIndex].weeks.some(w => w.title === title);

if(exists){

alert("สัปดาห์นี้มีแล้ว");

return;

}

lessonData[currentCourseIndex].weeks.push({
title,
drive
});

saveLesson();
closeWeekModal();
renderLessons();

}

/* =========================
   ลบสัปดาห์
========================= */

function deleteWeek(courseIndex,weekIndex){

if(confirm("ลบสัปดาห์นี้?")){

lessonData[courseIndex].weeks.splice(weekIndex,1);

saveLesson();
renderLessons();

}

}


/* =========================
   Modal
========================= */

function closeWeekModal(){

document.getElementById("weekModal").style.display="none";

}


/* =========================
   Save
========================= */

function saveLesson(){

localStorage.setItem("lessonData",
JSON.stringify(lessonData));

}
function openCourseModal(){

document.getElementById("courseModal").style.display="flex";

}

function closeCourseModal(){

document.getElementById("courseModal").style.display="none";

}



function saveCourse(){

let code=document.getElementById("courseCodeInput").value;
let name=document.getElementById("courseNameInput").value;
let level=document.getElementById("courseLevel").value;

if(!code || !name || !level){

alert("กรอกข้อมูลให้ครบ");

return;

}

lessonData.push({
code:code,
name:name,
level:level,
weeks:[]
});

saveLesson();
renderLessons();
closeCourseModal();

}

document.addEventListener("DOMContentLoaded",renderLessons);