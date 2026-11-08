# Production security audit — 9 November 2026

## Critical findings (not safely remediated by a static-site-only change)

1. **Admin authorization is client-side only.** The admin password check and `sessionStorage` flag are shipped in public JavaScript. Anyone can inspect the bundle or set the browser flag. This does not protect admin pages or Firestore data.
2. **Donation verification contains a client-side Apps Script admin key.** Any value embedded in a GitHub Pages JavaScript file is public. Treat it as exposed and rotate it in the Apps Script deployment before relying on it.
3. **Resident access is not strong authentication.** The current flow matches a flat number, name and email against a Firestore document and stores an editable `input=true` flag in `localStorage`. It does not prove email ownership or establish a Firebase Auth identity.
4. **Unauthenticated Firestore read probe raised a warning.** Read-only requests for deliberately nonexistent sentinel documents under `users/{flat}/residents`, `submissions` and `Donations` returned `404 NOT_FOUND` rather than `403 PERMISSION_DENIED`. This is consistent with unauthenticated `get` permission being allowed on those paths. No existing resident or donation records were queried. The actual deployed Firestore Rules must be reviewed in Firebase Console before treating any data as private.
5. **Resident self-registration can create a flat root and resident record.** Without server-enforced allow-listing or verified identity, the public client can potentially create an identity under a flat number. This must be addressed together with the authentication/rules design.

## Why these were not changed automatically

The redesigned site intentionally reuses the existing `ao-temple` Firestore collections and the legacy resident identity model. Deploying restrictive Firestore rules or switching to Firebase Auth without a coordinated migration would likely lock out residents and stop the existing main website. No Firestore rules, production data, payment configuration or live records were changed during this audit.

## Required secure remediation plan

- Review and export the currently deployed Firestore Rules in Firebase Console.
- Choose a server-enforced identity model (Firebase Auth with verified email/phone or a trusted admin-managed resident allow-list).
- Implement role-based admin authorization using custom claims or a trusted backend; never use a password or admin key in client JavaScript.
- Write and test Firestore Rules for each existing path: `users/{flat}/residents`, `users/{flat}/registrations`, `users/{flat}/Donations`, `submissions`, `Donations`, and `receiptNumbers`.
- Keep the existing document paths and field names during migration; deploy rules only after both the redesigned and original website flows are compatible.
- Rotate the exposed Apps Script admin key and validate Sheet actions server-side.
- Test with unauthenticated, resident-A, resident-B and admin identities using the Firebase Emulator or a dedicated test project before production deployment.

## Automated audit results

- 220 tracked tree entries; 26 HTML pages and 11 JavaScript files inspected.
- All 11 JavaScript files and 9 inline scripts passed Node syntax checks.
- All 4 CSS files parsed with zero syntax errors.
- 440 local HTML asset/link references resolved to tracked files; 155 unique live assets returned HTTP 200.
- No duplicate HTML IDs were found in the scanned pages.
- Public informational pages were corrected so they no longer require resident sign-in just to browse.
- Admin event search now renders Firestore content with DOM text nodes instead of interpolating it into `innerHTML`.
- Browser-driven screenshot and real authenticated read/write journeys remain unverified in this environment.


## Additional quality fixes in the follow-up pass

- Resident email casing is now preserved when deriving the legacy resident document ID, matching the original site's `${name_with_underscores}_${email}` convention.
- Firebase configuration is explicitly loaded before the Chart, flat-search and registration-history module scripts.
- Shared scripts were moved back inside the `body` element on announcements, committee, history and receipt pages.
- The shared animated loader remains a 63-frame GIF but was resized to 64×64 pixels (it is displayed at 50×50) and optimized from 1,351,819 bytes to 144,435 bytes — an 89.3% reduction.
