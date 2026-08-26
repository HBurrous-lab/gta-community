# Coastal Horizon RolePlay — Community Hub

A responsive Community Hub for Coastal Horizon RolePlay with Supabase authentication/database support and a GitHub-friendly static frontend.

## Included

- Community landing page
- Announcements
- Upcoming events
- Department directory
- Member authentication
- Membership applications
- Supabase PostgreSQL schema + Row Level Security
- GTA VI countdown to November 19, 2026
- Responsive mobile design
- Safe client-side Supabase anon-key configuration

## 1. Create Supabase project

1. Open Supabase and create a new project.
2. Open **SQL Editor**.
3. Create a new query.
4. Copy everything from `supabase/schema.sql` into the query.
5. Run it.

This creates the database tables, signup trigger, starter announcements/events, and Row Level Security policies.

## 2. Get Supabase credentials

In Supabase open **Project Settings → API** and copy:

- Project URL
- Publishable/anon key

Never put a `service_role` key in this website.

## 3. Configure the website

Open `config.js` and replace the empty values:

```js
window.CH_CONFIG = {
  supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
  supabaseAnonKey: 'YOUR-PUBLISHABLE-KEY',
  discordInvite: 'https://discord.gg/YOURINVITE'
};
```

## 4. Make the first administrator

Create your account through the website. Then in Supabase **Table Editor → profiles**, find your user and change `role` from `member` to `admin`.

The `admin` role can be used by your staff dashboard later for managing announcements, events, applications, profiles, and tickets.

## 5. Hosting

### GitHub Pages

This project is plain HTML/CSS/JavaScript, so it can be hosted directly from GitHub Pages:

1. GitHub → repository **Settings**.
2. Open **Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select `main` and `/ (root)`.
5. Save.

Your site will publish from the repository.

### Supabase

Supabase is the backend/database for this project. The frontend can remain on GitHub Pages while Supabase provides authentication and PostgreSQL data. This separation keeps the architecture simple and avoids putting privileged database credentials in the browser.

## Important security notes

- Do not commit a Supabase service-role key.
- The browser should only receive the public publishable/anon key.
- Keep RLS enabled on every application-owned table.
- Change your initial administrator account immediately after setup.

## Suggested next phase

The database is already structured for a future staff/admin panel. A second phase can add:

- Staff dashboard
- Application review workflow
- Ticket management
- Member profiles
- Department rosters
- Event creation/editing
- Announcement publishing
- Audit logs
- Discord OAuth integration
