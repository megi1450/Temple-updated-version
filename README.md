# Shri Varasiddhi Vinayaka Temple — redesigned test project

A responsive, resident-first website for Arvind Oasis. This repository is the **test destination** for the original `Temple-Website` functionality migration. The original repository is not modified by this work.

## Website functionality

- Public temple homepage with Kannada/English translation control **only on the homepage**.
- Public pages: temple information, events, announcements, committee, gallery and terms.
- Resident access: existing flat + resident name + email registration/sign-in, resident dashboard and profile.
- Puja/seva registration with atomic Firestore receipt numbering and resident registration history.
- UPI donation submission, duplicate UTR protection, resident donation history, downloadable PDF receipts and native share support.
- Administrator tools: existing administrator session gate, donation verification/synchronization/deletion, charts and flat sorting.
- Existing Google Apps Script / Google Sheets donation synchronization uses the same Apps Script endpoint as the original project.

## Architecture

- Static HTML, CSS and vanilla JavaScript; no npm build step for the website UI.
- Shared shell: `site-shell.js`; design layers: `redesign.css`, `ux-improvements.css`, `site-polish.css`.
- Firebase client configuration is centralized in `firebase-config.js` and points to the existing `ao-temple` project.
- Firestore collection names, document IDs and field shapes match the original `Temple-Website` project.

## Existing database connection

The test website now uses the same Firebase project as the original main website: `ao-temple`. No new Firebase project, Auth account, Firestore collection, invitation collection, Cloud Function or staging Sheet is required. `.firebaserc` targets the existing project.

Existing schema preserved:
- Residents: `users/{flatNumber}/residents/{residentName_with_underscores + '_' + email}` with `name`, `email`, `signInTime`.
- Puja registrations: `submissions/{registrationId}` and `users/{flatNumber}/registrations/{registrationId}` with the existing receipt fields; counter at `receiptNumbers/counter` (`lastReceiptNumber`).
- Donations: `Donations/UPI_{utrNumber}` and `users/{flatNumber}/Donations/UPI_{utrNumber}`; counter at `receiptNumbers/donationsCounter` (`lastSerialNumber`).
- Donation Sheet synchronization uses the existing Google Apps Script endpoint in `donations-config.js`.

## Security note

This preserves the original site's legacy resident sign-in model (flat number, resident name and email) and administrator session gate so existing records remain accessible without creating new accounts. These legacy client-side checks are not equivalent to Firebase Authentication or server-enforced role authorization. The main project does not include Firestore rules in this repository, so no new deny-all rules are added or deployed. Do not treat the legacy access model as hardened security for sensitive personal or financial data.

## Validation status

JavaScript syntax and HTML/module parsing passed. The live database connection is configured in the website code, but a browser-based sign-in and read/write test is still required to confirm the currently deployed Firestore rules and live permissions.
