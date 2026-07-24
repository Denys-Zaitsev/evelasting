# Evelasting.com — publication guide

## 1. Local verification
```bash
npm ci
npm run lint
npm run build
npm run start
```
Open `http://localhost:3000` and check music playback, language switching, internal release scrolling, the floating player, `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, and a missing URL such as `/not-found-test`.

## 2. Recommended deployment: Vercel
1. Put the project in a private GitHub repository.
2. Import it into Vercel as a Next.js project.
3. Deploy without changing the build command (`next build`).
4. Add `evelasting.com` and `www.evelasting.com` in Project → Domains.
5. At the domain registrar, use the DNS records Vercel displays.
6. Make `evelasting.com` the primary domain and redirect `www` to it.

## 3. Search indexing
After the production domain works over HTTPS:
1. Add the domain property in Google Search Console.
2. Verify it using the DNS TXT record.
3. Submit `https://evelasting.com/sitemap.xml`.
4. Request indexing for the home page.

## 4. Analytics
Analytics was intentionally not hard-coded because it requires your account identifier and consent choice. For Google Analytics, add the GA4 measurement ID through the hosting environment and load it only after the final privacy decision. Plausible is the leaner privacy-oriented alternative.

## 5. Final checks
- Confirm the Telegram invite remains valid.
- Confirm every platform opens the intended official artist profile.
- Test Telegram, Discord, iMessage, and other link previews after deployment.
- Test installation on Android/Chrome and desktop Chrome/Edge.
- Do not commit `.next`, `node_modules`, or local environment files.
