# Directive: Syntry Sovereign Core Infrastructure & Deployment

**Status:** ACTIVE | **Authorized by:** Eyram Abusah, CEO of Syntry Estates Ltd. and Syntry Ltd.

This directive serves as the Operational Master Blueprint for maintaining and deploying the Syntry Sovereign Core and associated Syntry Sovereign infrastructure. All future automated updates and system maintenance must adhere to these environmental constraints and deployment sequences to ensure the integrity of the 8 Layers of Truth and the Agentic Transaction Layer.

## 1. Environmental Constraints
* **Runtime Environment:** The system requires **Node.js v24.15.0**. Under no circumstances should the version be downgraded, as critical libraries for Supabase and Solana require v20+.
* **Operating System:** Ubuntu 24.04.4 LTS.
* **Project Root:** All production code (Next.js engine and API-node) is centralized in `/var/www/html`.
* **Process Management:** **PM2** is the designated process manager to ensure zero-downtime execution.

## 2. Configuration & Routing Management
* **Nginx Architecture:** The server is configured to serve static assets from `/var/www/html/.next/static/` and `/var/www/html/public/`.
* **Port Mapping:** The frontend engine operates on **Port 3000**, with the backend API typically mapped to **Port 5000** or localized subdomains.
* **Security:** SSL/TLS certificates for `syntry.co` and `www.syntry.co` are managed via Certbot.

## 3. Environment Variable Injection (`.env`)
The following keys are mandatory and must be "baked" into the production build. Missing keys will cause a TypeError and "Application Error" on client-side interactive pages:

* **Infrastructure:** `NEXT_PUBLIC_API_URL=https://syntry.co`
* **Database:** `DATABASE_URL` (PostgreSQL connection string).
* **Supabase:** `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Required for real-time land verification).
* **SendGrid:** `SENDGRID_API_KEY` (Must strictly begin with the `SG.` prefix).
* **Mapbox:** `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN` for GIS and land identification features.

---

## Standard Operating Procedure (SOP) for GitHub Sync & Deployment
To avoid "Hydration Errors" or "r is not a function" crashes, follow this exact sequence for every update:

### Phase 1: Code Synchronization
1. Navigate to `/var/www/html` and perform `git pull origin main`.
2. **Safeguard:** Ensure the `.env` file in the root directory remains intact and contains all production keys.

### Phase 2: Dependency Alignment
3. Run `npm install` to synchronize the `node_modules` with the updated `package.json`.

### Phase 3: The "Clean Bake" Protocol (Critical)
4. Execute `rm -rf .next` to delete old build artifacts.
5. Execute `npm run build`. This step is mandatory to inject the latest `.env` values into the JavaScript chunks served to the browser.

### Phase 4: Service Activation
6. Execute `pm2 restart all --update-env` to reload the Syntry Engine and Backend with the new build and updated environment variables.

### Phase 5: Health Verification
7. Verify that the `/verify-land-now` route is responsive and the UI is rendered correctly in a fresh browser session (Incognito).
