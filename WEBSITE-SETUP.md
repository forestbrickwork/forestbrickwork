# Forest Brickwork — Website Setup Guide

The website is three files (`index.html`, `style.css`, `script.js`) plus an `assets/` folder.
It's a "static" site — no server needed, free to host. Follow the steps below to get it live.

## 1. Add your real logo

The site currently uses a stand-in logo (`assets/logo-placeholder.svg`).
Upload your actual logo file to the `assets/` folder and name it **`logo.png`** —
the site automatically uses it everywhere (header, hero, footer) once it exists.

## 2. Put it live with GitHub Pages (free)

1. Merge this branch into `main`.
2. On GitHub go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, select `main` and `/ (root)`, and save.
4. After a minute your site is live at `https://forestbrickwork.github.io/forestbrickwork/`.

> **Tip for a nicer address:** create a new repository named exactly
> `forestbrickwork.github.io` and put these files there instead — the site then
> lives at `https://forestbrickwork.github.io/` with no repo suffix.

## 3. Get a proper domain (recommended, ~£10/year)

Buy `forestbrickwork.co.uk` (or `.com`) from a registrar like Cloudflare, Namecheap
or Google-partner registrars. Then in **Settings → Pages → Custom domain** enter the
domain and follow GitHub's DNS instructions. A real domain looks far more professional
on fliers and vans, and lets you have `info@forestbrickwork.co.uk` email later.

## 4. Hook up the contact form (Formspree, free)

The form currently opens the visitor's email app as a fallback. To have messages
delivered straight to your inbox:

1. Sign up free at [formspree.io](https://formspree.io) with `forestbrickwork@gmail.com`.
2. Create a new form and copy its ID (looks like `mabcdefg`).
3. In `index.html`, find `https://formspree.io/f/YOUR_FORM_ID` and replace `YOUR_FORM_ID`.

## 5. Embed the live Instagram feed

Instagram has no official simple "feed" embed, so use a free widget service:

1. Go to [snapwidget.com](https://snapwidget.com) (or [behold.so](https://behold.so) / [lightwidget.com](https://lightwidget.com)).
2. Connect the `@forestbrickwork` Instagram account and create a grid widget.
3. Copy the embed code and paste it into `index.html` where the
   `TODO: Embed your live Instagram feed` comment is, replacing the fallback button.

New Instagram posts will then appear on the website automatically.

## 6. Add photos of your work

The "Our Work" section has six placeholder tiles. Replace them with real job photos:

1. Add photos to `assets/` (e.g. `assets/work-1.jpg`). Resize to ~1200px wide so pages load fast.
2. In `index.html`, swap each placeholder `<div class="tile">…</div>` for
   `<img class="tile" src="assets/work-1.jpg" alt="Garden wall in Coleford">`.

Before/after pairs of repointing jobs are especially convincing.

## 7. Areas-covered map

Already done — an interactive map with a green outline around the Forest of Dean
(Ross-on-Wye down to Chepstow, Monmouth across to the Severn). To tweak the outline,
edit the `areaOutline` coordinates at the top of `script.js`.

---

## Suggested extras to make it a great website

- **Google Business Profile** — you already have one (the share.google link). Add the
  website URL to your Google profile so the site and profile link to each other;
  this is the single biggest boost for showing up in local "brickwork near me" searches.
- **Reviews/testimonials section** — ask happy customers for Google reviews, then quote
  the best 2–3 on the site. Social proof wins jobs.
- **WhatsApp button** — many customers prefer it. Add a link like
  `https://wa.me/447508728646` next to the phone number.
- **Privacy policy page** — a short page saying what you do with contact-form details.
  Sensible for GDPR once the form is live.
- **Insurance & accreditations** — if you have public liability insurance or any trade
  memberships (e.g. FMB), show the logos near the contact section.
- **Analytics** — free options like [Plausible](https://plausible.io) or Google Analytics
  tell you how many people visit and where from.
- **Photos on Google Business Profile too** — post your job photos there as well as
  Instagram; Google profiles with fresh photos rank better locally.
