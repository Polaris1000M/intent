# Issues
- [x] Vitest testing also runs Playwright tests and results in errors
    - Added exclude directories in Vitest configuration
- [x] Vercel still deploys main branch even when tests fails
    - Added checks in Vercel deployment
- [ ] Inter and Merriweather fonts unavailable for email
- [x] Better Auth conflicts with drizzle-kit
    - Used `npm pkg set dependencies.drizzle-orm=0.45.2` and `npm pkg set devDependencies.drizzle-kit=^0.31.9` to specify specific package versions
- [ ] Better Auth requires additional secret environmental variables for GitHub Actions to work
