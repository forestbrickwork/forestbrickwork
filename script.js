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

// ---------- our work gallery ----------
// Each tile fills itself from assets/work-1 … work-6 in whichever common
// format the file happens to be. Drop the photos in with those names and they
// appear; until then the striped placeholder stays put.
// "JPG" is included because phone cameras often save the extension uppercase.
const WORK_FORMATS = ["jpg", "jpeg", "png", "webp", "JPG"];
document.querySelectorAll(".tile[data-work]").forEach((tile) => {
  const slot = tile.dataset.work;
  let i = 0;

  const tryNext = () => {
    if (i >= WORK_FORMATS.length) return;
    const src = `assets/work-${slot}.${WORK_FORMATS[i]}`;
    i += 1;
    const probe = new Image();
    probe.onload = () => {
      tile.style.backgroundImage = `url("${src}")`;
      tile.classList.add("has-photo");
      tile.setAttribute("aria-label", `${tile.dataset.label} by Forest Brickwork`);
    };
    probe.onerror = tryNext;
    probe.src = src;
  };

  tryNext();
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
// The form posts to Formspree. Submitting in the background keeps the visitor
// on the page and shows the result inline, rather than sending them off to
// Formspree's own confirmation page. If this script never runs, the form's
// action/method still submit the normal way.
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");
const formSubmit = document.getElementById("formSubmit");
const FALLBACK = "Please call 07508 728646 or email forestbrickwork@gmail.com.";

const setNote = (text, state) => {
  formNote.textContent = text;
  formNote.className = state ? `form-note is-${state}` : "form-note";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  setNote("Sending…");
  formSubmit.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      form.reset();
      setNote("Thanks — your message is on its way. We'll be in touch shortly.", "success");
      return;
    }

    // Formspree returns per-field messages for validation problems.
    const result = await response.json().catch(() => null);
    const detail = result?.errors?.map((err) => err.message).join(", ");
    setNote(detail ? `${detail}.` : `That didn't send. ${FALLBACK}`, "error");
  } catch {
    setNote(`That didn't send — check your connection. ${FALLBACK}`, "error");
  } finally {
    formSubmit.disabled = false;
  }
});
