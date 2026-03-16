/* ======================================================
   🍌 script.js | ครู Banana สอนอิเล็ก
   ฟังก์ชันหลัก:
   - Smooth Scroll
   - Fade-in Animation เมื่อเลื่อนหน้า
   - ปุ่ม Back-to-top
   - Navbar Active Highlight
   ====================================================== */

// 🌈 Smooth scroll (สำหรับลิงก์ในหน้าเดียว)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      document.querySelector(targetId).scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// 🌟 Fade-in เมื่อเลื่อนถึง element
const faders = document.querySelectorAll(".fade-in");
const appearOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};
const appearOnScroll = new IntersectionObserver(function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("appear");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fade => {
  appearOnScroll.observe(fade);
});

// 🔝 ปุ่ม Back to Top
const backToTop = document.createElement("button");
backToTop.innerHTML = "⬆️";
backToTop.id = "backToTop";
document.body.appendChild(backToTop);

const styleBtn = `
  #backToTop {
    position: fixed;
    bottom: 25px;
    right: 25px;
    background-color: #F9C846;
    color: #3C2F2F;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 20px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.4s, visibility 0.4s, transform 0.3s;
  }
  #backToTop:hover {
    transform: translateY(-4px);
  }
`;
const styleElement = document.createElement("style");
styleElement.innerHTML = styleBtn;
document.head.appendChild(styleElement);

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    backToTop.style.opacity = "1";
    backToTop.style.visibility = "visible";
  } else {
    backToTop.style.opacity = "0";
    backToTop.style.visibility = "hidden";
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// 🟡 Navbar Active Highlight เมื่ออยู่ในหน้าปัจจุบัน
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPage || (href === "index.html" && currentPage === "")) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
/* ==========================
   ระบบจัดการรายวิชา
========================== */

let courses = [];

function loadCourses() {

  const data = localStorage.getItem("courses");

  if (data) {
    courses = JSON.parse(data);
  } else {
    courses = [];
  }

}

function saveCourses() {

  localStorage.setItem("courses", JSON.stringify(courses));

}

function renderCourses() {

  const list = document.getElementById("courseList");

  if (!list) return;

  list.innerHTML = "";

  courses.forEach((course, index) => {

    const div = document.createElement("div");

    div.className = "course-card";

    div.innerHTML = `
      <h3>${course.name}</h3>
      <p><strong>ผู้สอน:</strong> ${course.teacher}</p>
      <p>${course.plan}</p>

      <button onclick="deleteCourse(${index})" class="btn-outline">
        ลบ
      </button>
    `;

    list.appendChild(div);

  });

}

function addCourse() {

  const name = document.getElementById("courseName").value;
  const teacher = document.getElementById("courseTeacher").value;
  const plan = document.getElementById("coursePlan").value;

  if (name.trim() === "") {
    alert("กรอกชื่อรายวิชาก่อน");
    return;
  }

  const newCourse = {
    name: name,
    teacher: teacher,
    plan: plan
  };

  courses.push(newCourse);

  saveCourses();

  renderCourses();

  closeAddCourse();

  document.getElementById("courseName").value = "";
  document.getElementById("courseTeacher").value = "";
  document.getElementById("coursePlan").value = "";

}

function deleteCourse(index) {

  courses.splice(index, 1);

  saveCourses();

  renderCourses();

}

function openAddCourse() {

  document.getElementById("courseModal").style.display = "flex";

}

function closeAddCourse() {

  document.getElementById("courseModal").style.display = "none";

}


/* โหลดข้อมูลตอนเปิดหน้า */

document.addEventListener("DOMContentLoaded", () => {

  loadCourses();
  renderCourses();

});