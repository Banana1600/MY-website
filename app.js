let courses = JSON.parse(localStorage.getItem("courses")) || [];

function saveCourses(){
localStorage.setItem("courses", JSON.stringify(courses));
}