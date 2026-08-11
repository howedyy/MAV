# Deployment Guide

Step 1: Copy Build Folder
- Copy the prepared folder from `E:/MAV/` into `C:/inetpub/wwwroot`.

Step 2: Configure IIS
- Open **IIS Manager**.
- Right‑click **Sites** → **Add Website**.
- Enter a **Site name** (e.g., `ReactApp`).
- Set **Physical path** to `C:/inetpub/wwwroot/MAV`.
- Assign a **Port** (default: 80).
- Click **OK** to create the site.

## Step 3: Test Locally
- Open a browser and navigate to `http://localhost` or `http://localhost:port`.

## Step 4: Bind Domain
- In IIS Manager, select your site → **Bindings** → **Add**.
- Enter your domain name (e.g., `example.com`) and click **OK**.

## Step 5: Configure DNS
- In your DNS provider’s management console:
  - Create an **A record** pointing your domain (`example.com`) to the server’s public IP.
  - Optionally, add a **CNAME record** for `www` pointing to `example.com`.

## Step 6: Verify Online
- After DNS propagation, test your domain in a browser.
- Ensure the React app loads correctly.

## Notes
- For HTTPS, install an SSL certificate via IIS → **Server Certificates**.
- Restart IIS if changes don’t apply immediately.
- If using React Router, configure a **web.config** rewrite rule to redirect all routes to `index.html`.
