# Temple updated version

A resident-first website for **Shri Varasiddhi Vinayaka Temple, Arvind Oasis**.

## Architecture

- Static HTML, CSS and vanilla JavaScript; no npm build step is required.
- Shared navigation, page headings, footer and responsive design are provided by `site-shell.js`.
- `redesign.css`, `ux-improvements.css` and `site-polish.css` provide the visual system. The last stylesheet is loaded by the shared shell on pages that use it.
- Kannada / English switching is intentionally available **only on the public homepage** (`index.html` / `main.html`). Every other page remains in English, including resident and administration flows.
- Existing Firestore, Google Apps Script, UPI and receipt integrations have been left intact during this visual and navigation overhaul.

## Local preview

Serve this folder with any static HTTP server. Open `index.html` for the public temple website, or `main.html` as a compatible homepage route. Relative asset paths expect the site to be served from the repository root.

## Important deployment and security warnings

This repository is an isolated copy of the original `Temple-Website` project, but several legacy browser modules still contain a Firebase configuration that points to the `ao-temple` project. Therefore, do not use resident registration, donation or administration workflows against live data while testing this copy. Configure a separate staging Firebase project and update its client configuration before functional testing or deployment.

The legacy resident and administrator access flows rely on client-side storage/session checks. They are not production-grade authentication. The administrator credential and a donation-verification integration key are embedded in browser-delivered JavaScript, so they must be treated as exposed and rotated. Move privileged operations behind Firebase Authentication with Firestore Security Rules and trusted server-side functions (or a secured Apps Script endpoint) before using the administration or donation-verification tools in production.

The repository has no default Firebase Hosting project configured. Do not point it at the live `ao-temple` project or deploy it until a separate staging/production plan is approved. The original repository remains unchanged.

## Validation

The current redesign has been checked for JavaScript syntax, CSS parsing, duplicate HTML IDs, missing local repository references and same-page anchor targets. Browser-based visual and end-to-end Firebase testing still requires a deployed staging preview and staging credentials.

## Assets

Original temple photographs are retained and organised under `assets/`. External visual assets and their sources/licences are documented in `ASSET_CREDITS.md`.
