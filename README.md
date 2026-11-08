# Shri Varasiddhi Vinayaka Temple — redesigned test project

A responsive, resident-first website for Arvind Oasis. This repository is the **test destination** for the original `Temple-Website` functionality migration. The original repository is not modified by this work.

## Website functionality

- Public temple homepage with Kannada/English translation control **only on the homepage**.
- Public pages: temple information, events, announcements, committee, gallery and terms.
- Resident access: invitation-based account registration, email/password sign-in, email verification, resident dashboard and profile.
- Puja/seva registration with server-assigned receipt numbers and resident registration history.
- UPI donation submission, duplicate UTR protection, resident donation history, downloadable PDF receipts and native share support.
- Administrator tools: resident invitation management, donation verification/synchronization/deletion, charts and flat sorting.
- Existing Google Apps Script / Google Sheets donation synchronization is supported through a server-side function secret.

## Architecture

- Static HTML, CSS and vanilla JavaScript; no npm build step for the website UI.
- Shared shell: `site-shell.js`; design layers: `redesign.css`, `ux-improvements.css`, `site-polish.css`.
- Firebase client configuration is centralized in `firebase-config.js`. The committed file is deliberately a placeholder.
- Trusted server operations live in `functions/` (Node.js 20, Firebase Functions v2 + Admin SDK).
- `firestore.rules` denies direct client writes. Resident/admin access uses Firebase Auth, verified email and custom role claims.

## Staging setup — required before functional testing

1. Create a **new Firebase staging project**. Enable Email/Password Authentication, Firestore, Cloud Functions and App Check (reCAPTCHA v3). Add the GitHub Pages test domain to Firebase Auth authorized domains and the App Check site key's allowed domains.
2. Replace the placeholders in `firebase-config.js` with the staging Web App configuration and set `window.TEMPLE_APPCHECK_SITE_KEY` to the staging reCAPTCHA v3 site key. Never use the production temple Firebase project here.
3. Set `.firebaserc` to the staging project ID only when ready to deploy. It is intentionally empty now to prevent accidental deployment.
4. Install `functions/` dependencies with Node.js 20. Configure the `DONATIONS_ADMIN_KEY` Firebase Secret and `DONATIONS_SHEETS_WEB_APP_URL` Functions parameter. Use a **separate staging Google Sheet and Apps Script deployment**.
5. Deploy Functions and `firestore.rules` to staging only. See `functions/README.md`.
6. Create an administrator Firebase Auth user, verify its email, then run `functions/scripts/set-admin-claim.js` from a trusted machine using Application Default Credentials and the exact Auth UID. Never commit service-account files.
7. Sign in as the administrator and issue one-time resident invitations. Invitations bind a flat, name and email and expire after seven days.

## Security boundaries

- `localStorage` and `sessionStorage` are UI hints only; they are not authorization.
- Residents must use an admin-issued invitation, Firebase Auth and verified email.
- Administrator rights are Firebase custom claims; there is no static browser password or donation admin key.
- Puja registration, donation submission, receipt numbering and privileged donation actions run in trusted functions.
- Existing legacy resident records are **not automatically migrated** to Auth accounts. Verify identity and approve a migration plan before importing.
- Never deploy the staging Firestore rules/functions to the live temple project.

## Validation status

JavaScript syntax checks and HTML/module parsing are performed during this migration. A live browser walkthrough, Firebase staging deployment, App Check validation, Firestore rules emulator tests and end-to-end payment/Sheets tests remain pending until the separate staging project and its credentials are configured.
