# Temple updated version

A redesigned, resident-first website for **Shri Varasiddhi Vinayaka Temple, Arvind Oasis**.

This repository is an isolated copy of the original `Temple-Website` project. The original repository remains unchanged. The site retains the lightweight HTML, CSS and vanilla JavaScript architecture, with Firebase/Firestore and Google Apps Script integrations preserved where applicable.

## Local preview

Serve this folder with any static HTTP server. Open `index.html` for the public temple website, or `main.html` as a compatible homepage route.

## Important security note

The legacy resident and administrator access flows use client-side storage/session checks. These are not a substitute for secure authentication and server-side authorisation. Do not treat this static-site access control as production-grade security. The Firebase Hosting configuration is retained, but this copy has no default Firebase project configured. The copied GitHub Actions deployment workflow has been disabled. Do not point this repository at the live `ao-temple` project or deploy it until a separate staging/production plan is approved.

## Assets

Original temple photographs are retained and organised under `assets/`. External visual assets and their sources/licences are documented in `ASSET_CREDITS.md`.
