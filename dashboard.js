let courses = JSON.parse(localStorage.getItem("courses")) || [];


/* =========================
   แสดงรายวิชา
========================= */

function renderCourses(){

const list = document.getElementById("courseList");

if(!list) return;

list.innerHTML="";

if(courses.length === 0){

list.innerHTML = `
<p class="empty-course">
ยังไม่มีรายวิชา กด "เพิ่มรายวิชา"
</p>
`;

return;

}

courses.forEach((course,index)=>{

const div=document.createElement("div");

div.className="course-card";

div.innerHTML=`

<h3>${course.code || ""} ${course.name || ""}</h3>

<p><b>ผู้สอน:</b> ${course.teacher || "-"}</p>

<p>${course.plan || ""}</p>

<div class="course-buttons">

${course.drive ? `
<a href="${course.drive}" target="_blank" class="drive-btn">
<i class="fa-brands fa-google-drive"></i>
Google Drive
</a>
` : ""}

${course.file ? `
<a href="${course.file}" target="_blank" class="file-btn">
<i class="fa-solid fa-file"></i>
แผนการสอน
</a>
` : ""}

<button onclick="deleteCourse(${index})" class="btn-outline">
ลบ
</button>

</div>

`;

list.appendChild(div);

});

}



/* =========================
   เพิ่มรายวิชา
========================= */

function addCourse(){

const code=document.getElementById("courseCode").value;
const name=document.getElementById("courseName").value;
const teacher=document.getElementById("courseTeacher").value;
const plan=document.getElementById("coursePlan").value;
const drive=document.getElementById("courseDrive").value;

const fileInput=document.getElementById("courseFile");

let fileURL="";

if(fileInput.files.length>0){

const file=fileInput.files[0];

fileURL=URL.createObjectURL(file);

}

if(!name){

alert("กรอกชื่อรายวิชา");

return;

}

courses.push({
code,
name,
teacher,
plan,
drive,
file:fileURL
});

localStorage.setItem("courses",JSON.stringify(courses));

renderCourses();

closeAddCourse();

}



/* =========================
   ลบรายวิชา
========================= */

function deleteCourse(i){

courses.splice(i,1);

localStorage.setItem("courses",JSON.stringify(courses));

renderCourses();

}



/* =========================
   เปิด modal
========================= */

function openAddCourse(){

document.getElementById("courseModal").style.display="flex";

}



/* =========================
   ปิด modal
========================= */

function closeAddCourse(){

document.getElementById("courseModal").style.display="none";

}



/* =========================
   Calendar
========================= */

function loadCalendar(){

var calendarEl=document.getElementById('calendar');

if(!calendarEl) return;

var calendar=new FullCalendar.Calendar(calendarEl,{
initialView:'dayGridMonth'
});

calendar.render();

}



/* =========================
   Export PDF
========================= */

function exportPDF(){

let data=JSON.stringify(courses,null,2);

let blob=new Blob([data],{type:"application/pdf"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="courses.pdf";

a.click();

}



/* =========================
   Export Excel
========================= */

function exportCSV(){

let csv="รหัสวิชา,ชื่อวิชา,ผู้สอน,แผนการสอน\n";

courses.forEach(c=>{

csv+=`${c.code},${c.name},${c.teacher},${c.plan}\n`;

});

let blob=new Blob([csv]);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="courses.csv";

a.click();

}



/* =========================
   Export Word
========================= */

function exportDOC(){

let content="";

courses.forEach(c=>{

content+=`รหัสวิชา: ${c.code}\n`;
content+=`ชื่อวิชา: ${c.name}\n`;
content+=`ผู้สอน: ${c.teacher}\n`;
content+=`แผนการสอน: ${c.plan}\n\n`;

});

let blob=new Blob([content],{type:"application/msword"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="courses.doc";

a.click();

}



/* =========================
   โหลดระบบ
========================= */

document.addEventListener("DOMContentLoaded",function(){

renderCourses();

loadCalendar();


/* ปุ่มเปิด modal */

const addBtn=document.getElementById("addCourseBtn");

if(addBtn){

addBtn.addEventListener("click",openAddCourse);

}


/* ปุ่มบันทึก */

const saveBtn=document.getElementById("saveCourseBtn");

if(saveBtn){

saveBtn.addEventListener("click",addCourse);

}


/* ปุ่มยกเลิก */

const cancelBtn=document.getElementById("cancelCourseBtn");

if(cancelBtn){

cancelBtn.addEventListener("click",closeAddCourse);

}

});