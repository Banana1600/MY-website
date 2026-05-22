const STORAGE_KEYS = {
  courses: "courses",
  exams: "exams",
  plans: "plans",
  mediaItems: "mediaItems",
  users: "users",
  currentUser: "currentUser"
};

/* =========================
   DATA
========================= */
let courses = JSON.parse(localStorage.getItem(STORAGE_KEYS.courses)) || [];

function saveCourses() {
  localStorage.setItem(STORAGE_KEYS.courses, JSON.stringify(courses));
}

/* =========================
   USERS / AUTH
========================= */
(function seedDefaultUsers() {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];

  if (users.length === 0) {
    const defaultUsers = [
      {
        id: Date.now() + 1,
        username: "banana",
        password: "1234",
        role: "teacher",
        name: "นายนคร ศรีเกษม"
      },
      {
        id: Date.now() + 2,
        username: "student1",
        password: "1234",
        role: "student",
        name: "นักเรียนตัวอย่าง 1"
      }
    ];

    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(defaultUsers));
  }
})();

function getUsers() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.users)) || [];
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.currentUser));
}

function isLoggedIn() {
  return !!getCurrentUser();
}

function login(username, password) {
  const users = getUsers();

  const user = users.find(
    u => u.username === username.trim() && u.password === password.trim()
  );

  if (!user) return false;

  localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  return true;
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.currentUser);
  window.location.href = "login.html";
}

function requireLogin() {
  if (!isLoggedIn()) {
    alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
    window.location.href = "login.html";
  }
}

function requireRole(role) {
  const user = getCurrentUser();

  if (!user) {
    alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
    window.location.href = "login.html";
    return;
  }

  if (user.role !== role) {
    alert("คุณไม่มีสิทธิ์เข้าใช้งานหน้านี้");
    window.location.href = "dashboard.html";
  }
}

function getRoleText(role) {
  if (role === "teacher") return "ครู";
  if (role === "student") return "นักเรียน";
  return role;
}

/* =========================
   USER MANAGEMENT
========================= */
function addUser({ name, username, password, role }) {
  const users = getUsers();

  const exists = users.some(u => u.username === username.trim());
  if (exists) {
    return { success: false, message: "ชื่อผู้ใช้นี้มีอยู่แล้ว" };
  }

  const newUser = {
    id: Date.now(),
    name: name.trim(),
    username: username.trim(),
    password: password.trim(),
    role: role
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: "เพิ่มผู้ใช้สำเร็จ" };
}

function deleteUser(id) {
  let users = getUsers();
  const currentUser = getCurrentUser();

  users = users.filter(u => u.id !== id);

  // กันลบ user ที่กำลังล็อกอินอยู่แล้วระบบค้าง
  if (currentUser && currentUser.id === id) {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    saveUsers(users);
    window.location.href = "login.html";
    return;
  }

  saveUsers(users);
}

function updateUser(id, updatedData) {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);

  if (index === -1) return false;

  users[index] = {
    ...users[index],
    ...updatedData
  };

  saveUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === id) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(users[index]));
  }

  return true;
}

/* =========================
   DASHBOARD STATS
========================= */
function getDashboardStats() {
  const exams = JSON.parse(localStorage.getItem(STORAGE_KEYS.exams)) || [];
  const plans = JSON.parse(localStorage.getItem(STORAGE_KEYS.plans)) || [];
  const mediaItems = JSON.parse(localStorage.getItem(STORAGE_KEYS.mediaItems)) || [];
  const users = getUsers();

  return {
    courses: courses.length,
    exams: exams.length,
    plans: plans.length,
    media: mediaItems.length,
    users: users.length
  };
}