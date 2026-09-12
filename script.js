// ---- Gallery data ----
const photos = [
  { src: "images/portfolio-01.jpg", category: "sled", caption: "Sled Push — Peak Effort" },
  { src: "images/portfolio-02.jpg", category: "sled", caption: "Sled Push — All In" },
  { src: "images/portfolio-03.jpg", category: "sled", caption: "Sled Push — Pure Joy" },
  { src: "images/portfolio-04.jpg", category: "rope", caption: "Rope Pull — Determination" },
  { src: "images/portfolio-05.jpg", category: "rope", caption: "Rope Pull — Team Spirit" },
  { src: "images/portfolio-06.jpg", category: "rope", caption: "Rope Pull — Focus" },
  { src: "images/portfolio-07.jpg", category: "rope", caption: "Rope Pull — Side by Side" },
  { src: "images/portfolio-08.jpg", category: "sandbag", caption: "Sandbag Lunge — Teamwork" },
  { src: "images/portfolio-09.jpg", category: "sled", caption: "Sled Push — Locked In" },
];

const gallery = document.getElementById("gallery");

function renderGallery() {
  gallery.innerHTML = photos.map((p, i) => `
    <div class="gallery-item" data-category="${p.category}" data-index="${i}">
      <img src="${p.src}" alt="${p.caption}" loading="lazy">
      <div class="caption">${p.caption}</div>
    </div>
  `).join("");
}
renderGallery();

// ---- Filters ----
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;
    document.querySelectorAll(".gallery-item").forEach(item => {
      const show = filter === "all" || item.dataset.category === filter;
      item.classList.toggle("hidden", !show);
    });
  });
});

// ---- Lightbox ----
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
let currentIndex = 0;

function visiblePhotoIndexes() {
  return Array.from(document.querySelectorAll(".gallery-item"))
    .filter(el => !el.classList.contains("hidden"))
    .map(el => Number(el.dataset.index));
}

function openLightbox(index) {
  currentIndex = index;
  lightboxImg.src = photos[index].src;
  lightboxImg.alt = photos[index].caption;
  lightbox.classList.add("open");
}

function closeLightbox() {
  lightbox.classList.remove("open");
}

function showRelative(step) {
  const indexes = visiblePhotoIndexes();
  const pos = indexes.indexOf(currentIndex);
  const nextPos = (pos + step + indexes.length) % indexes.length;
  openLightbox(indexes[nextPos]);
}

gallery.addEventListener("click", e => {
  const item = e.target.closest(".gallery-item");
  if (item) openLightbox(Number(item.dataset.index));
});

document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
document.getElementById("lightboxPrev").addEventListener("click", () => showRelative(-1));
document.getElementById("lightboxNext").addEventListener("click", () => showRelative(1));

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") showRelative(-1);
  if (e.key === "ArrowRight") showRelative(1);
});

// ---- Mobile nav ----
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
navToggle.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => nav.classList.remove("open"));
});

// ---- Contact form (opens the visitor's email client) ----
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const subject = encodeURIComponent(`[${data.get("projectType")}] Inquiry from ${data.get("name")}`);
  const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);
  window.location.href = `mailto:24framehouse@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Opening your email app...";
});

// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
