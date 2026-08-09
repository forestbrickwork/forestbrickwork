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
// Coverage area, running clockwise from Ross-on-Wye:
// north around Ross and Newent, southeast to the River Severn, down the Severn's
// west bank to Chepstow, north up the Wye valley to Monmouth, then a straight
// line back up to Ross-on-Wye.
const areaOutline = [
  [51.948, -2.618], // north-west of Ross-on-Wye
  [51.951, -2.540], // north-east of Ross-on-Wye
  [51.958, -2.468],
  [51.962, -2.392], // north of Newent
  [51.930, -2.326], // east of Newent
  [51.888, -2.278],
  [51.866, -2.268], // River Severn at Over / Maisemore
  [51.845, -2.344], // Minsterworth
  [51.818, -2.404], // Westbury-on-Severn
  [51.786, -2.444], // Newnham (boundary follows the Severn here)
  [51.752, -2.499], // Gatcombe
  [51.715, -2.521], // Lydney harbour
  [51.678, -2.577], // Woolaston
  [51.630, -2.640], // Beachley / Severn bridge
  [51.616, -2.702], // south of Chepstow
  [51.644, -2.726], // west of Chepstow
  [51.700, -2.702], // Tintern
  [51.760, -2.716], // Llandogo / Bigsweir
  [51.793, -2.742], // Redbrook
  [51.834, -2.750], // north-west of Monmouth
  // straight line from Monmouth back to Ross-on-Wye closes the polygon
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
    `Name: ${data.get("name")}\nContact: ${data.get("contact")}\nLocation: ${data.get("location")}\nService: ${data.get("service")}\n\n${data.get("message")}`
  );
  window.location.href = `mailto:forestbrickwork@gmail.com?subject=${subject}&body=${body}`;
  formNote.textContent = "Your email app should open with the message ready to send.";
});
