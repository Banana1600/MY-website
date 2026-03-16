let courses = JSON.parse(localStorage.getItem("courses")) || [];


function renderCourses(){

const list=document.getElementById("courseList");

list.innerHTML="";

courses.forEach((course,index)=>{

const div=document.createElement("div");

div.className="course-card";

div.innerHTML=`

<h3>${course.name}</h3>

<p><b>ผู้สอน:</b> ${course.teacher}</p>

<p>${course.plan}</p>

<a href="${course.drive}" target="_blank">📂 เปิด Google Drive</a>

<button onclick="deleteCourse(${index})" class="btn-outline">ลบ</button>

`;

list.appendChild(div);

});

}


function addCourse(){

const name=document.getElementById("courseName").value;

const teacher=document.getElementById("courseTeacher").value;

const plan=document.getElementById("coursePlan").value;

const drive=document.getElementById("courseDrive").value;


courses.push({name,teacher,plan,drive});

localStorage.setItem("courses",JSON.stringify(courses));

renderCourses();

closeAddCourse();

}


function deleteCourse(i){

courses.splice(i,1);

localStorage.setItem("courses",JSON.stringify(courses));

renderCourses();

}


function openAddCourse(){

document.getElementById("courseModal").style.display="flex";

}

function closeAddCourse(){

document.getElementById("courseModal").style.display="none";

}


document.addEventListener("DOMContentLoaded",function(){

renderCourses();

var calendarEl=document.getElementById('calendar');

var calendar=new FullCalendar.Calendar(calendarEl,{
initialView:'dayGridMonth'
});

calendar.render();

});



/* Export PDF */

function exportPDF(){

let data=JSON.stringify(courses,null,2);

let blob=new Blob([data],{type:"application/pdf"});

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="courses.pdf";

a.click();

}


/* Export Excel */

function exportCSV(){

let csv="ชื่อวิชา,ผู้สอน,แผนการสอน\n";

courses.forEach(c=>{
csv+=`${c.name},${c.teacher},${c.plan}\n`;
});

let blob=new Blob([csv]);

let a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="courses.csv";

a.click();

}


/* Export Word */

function exportDOC(){

let content="";

courses.forEach(c=>{

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
