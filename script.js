// ---- Gallery data ----
// Replace these URLs with your real work — put files in an /images folder
// and change src to e.g. "images/photo1.jpg".
const photos = [
  { src: "https://picsum.photos/seed/24fh-portrait1/900/1100", category: "portrait", caption: "Portrait — Studio", tall: true },
  { src: "https://picsum.photos/seed/24fh-event1/900/900", category: "event", caption: "Event — Downtown Launch" },
  { src: "https://picsum.photos/seed/24fh-film1/900/900", category: "film", caption: "Short Film — Still" },
  { src: "https://picsum.photos/seed/24fh-portrait2/900/1100", category: "portrait", caption: "Portrait — Natural Light", tall: true },
  { src: "https://picsum.photos/seed/24fh-commercial1/900/900", category: "commercial", caption: "Commercial — Product" },
  { src: "https://picsum.photos/seed/24fh-music1/900/1100", category: "music", caption: "Music Video — On Set", tall: true },
  { src: "https://picsum.photos/seed/24fh-event2/900/900", category: "event", caption: "Event — Wedding" },
  { src: "https://picsum.photos/seed/24fh-film2/900/1100", category: "film", caption: "Short Film — BTS", tall: true },
  { src: "https://picsum.photos/seed/24fh-commercial2/900/900", category: "commercial", caption: "Commercial — Brand Spot" },
];

const gallery = document.getElementById("gallery");

function renderGallery() {
  gallery.innerHTML = photos.map((p, i) => `
    <div class="gallery-item${p.tall ? " tall" : ""}" data-category="${p.category}" data-index="${i}">
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
