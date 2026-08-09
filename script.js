// ---------- mobile nav ----------
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ---------- logo ----------
// Accept whatever format the logo file happens to be. Drop your logo into
// assets/ named "logo" with any of these extensions and it just works;
// the hand-drawn placeholder is the last resort.
const LOGO_FILES = [
  "assets/logo.png",
  "assets/logo.jpg",
  "assets/logo.jpeg",
  "assets/logo.webp",
  "assets/logo.svg",
  "assets/logo-placeholder.svg",
];
document.querySelectorAll("img.logo-img").forEach((img) => {
  let i = 0;
  const tryNext = () => {
    i += 1;
    if (i < LOGO_FILES.length) img.src = LOGO_FILES[i];
  };
  img.addEventListener("error", tryNext);
  // The image may have already failed before this script ran.
  if (img.complete && img.naturalWidth === 0) tryNext();
});

// ---------- footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();

// ---------- areas covered map (Leaflet + OpenStreetMap) ----------
// Rough outline of the Forest of Dean district, between the Wye and the Severn.
const areaOutline = [
  [51.925, -2.577], // south of Ross-on-Wye
  [51.905, -2.470],
  [51.868, -2.400], // Longhope / Huntley
  [51.822, -2.360], // Westbury-on-Severn
  [51.760, -2.400], // Newnham, along the Severn
  [51.710, -2.480], // Blakeney / Lydney
  [51.660, -2.600],
  [51.642, -2.672], // Chepstow
  [51.696, -2.683], // Tintern, up the Wye valley
  [51.780, -2.700], // Redbrook
  [51.812, -2.714], // Monmouth
  [51.840, -2.640], // Symonds Yat
  [51.880, -2.650], // Goodrich
];

function initMap() {
  if (typeof L === "undefined") return; // Leaflet failed to load — fallback text stays
  const mapEl = document.getElementById("map");
  mapEl.innerHTML = "";
  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([51.79, -2.55], 10);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 17,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const area = L.polygon(areaOutline, {
    color: "#2f4a35",
    weight: 3,
    fillColor: "#7dab7f",
    fillOpacity: 0.25,
  }).addTo(map);
  area.bindPopup("<strong>Forest Brickwork</strong><br>Core area — we also cover surrounding areas.");
  map.fitBounds(area.getBounds().pad(0.15));
}
window.addEventListener("load", initMap);

// ---------- contact form ----------
// Until a real Formspree ID is set in index.html, fall back to opening the
// visitor's email app with the message pre-filled.
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  if (!form.action.includes("YOUR_FORM_ID")) return; // Formspree configured — submit normally
  e.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("Quote request from the website");
  const body = encodeURIComponent(
    `Name: ${data.get("name")}\nContact: ${data.get("contact")}\nService: ${data.get("service")}\n\n${data.get("message")}`
  );
  window.location.href = `mailto:forestbrickwork@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app should open with the message ready to send.";
});
