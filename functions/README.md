# Secure temple staging backend

**Staging project only. Never deploy to `ao-temple` or the live temple project.**

- Invite-only resident registration tied to a flat, name and email. Invitations are one-time and stored as SHA-256 hashes.
- Firebase Authentication and verified email required for resident operations.
- Admin privileges are Firebase custom claims, never browser passwords or localStorage flags.
- Puja registrations and receipt numbering are atomic server-side operations.
- UPI donation writes, duplicate-reference protection and serial numbering run on the server.
- Admin verification/sync/deletion uses server-side authorization and a secret for the Google Apps Script endpoint.
- Firestore client writes are denied by default.

## Staging setup
1. Create a separate Firebase project; enable Email/Password Authentication, Firestore, Functions and App Check. Add the test site's domain to Auth authorized domains.
2. Copy `firebase-config.example.js` to `firebase-config.js` and fill it only with the staging Web App config and the staging reCAPTCHA v3 App Check site key.
3. Set `.firebaserc` default to the staging project ID; do not use `ao-temple`.
4. In `functions/`, install dependencies using Node 20. Set `DONATIONS_ADMIN_KEY` as a Firebase Secret and `DONATIONS_SHEETS_WEB_APP_URL` as a Functions parameter. Use a new staging Google Sheet/Apps Script deployment.
5. Deploy Functions and `firestore.rules` to staging only. The rules deny all direct client writes; callable functions use Admin SDK.
6. Create and verify an admin Auth user, then run `scripts/set-admin-claim.js` from a trusted machine using Application Default Credentials and the exact UID. Never commit service-account files.
7. Use the admin invitation flow to issue one-time resident invitations.

The backend preserves the legacy collection names and field shapes. Existing records are not automatically converted into Auth accounts; plan any identity migration and verify resident ownership before import.
