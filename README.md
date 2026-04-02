# RemodelPro - Pricebook & Estimating System

## Setup Instructions

### 1. Run Database Schema
Go to your Supabase Dashboard → SQL Editor → New Query
Paste the contents of `supabase_schema.sql` and click Run.

### 2. Create Sales Rep Users  
In Supabase Dashboard → Authentication → Users → Add User:
- jason@renovationsnow.com (set a password, send invite)
- ryan@renovationsnow.com
- joe@renovationsnow.com
- jeff@renovationsnow.com

After creating users, go to SQL Editor and run `seed_users.sql`.

### 3. Map GHL User IDs
In Supabase Dashboard → Table Editor → profiles:
For each rep, add their GHL user ID in the `ghl_user_id` column.
(Find GHL user IDs in GoHighLevel → Settings → My Staff)

### 4. Deploy to Vercel
1. Push this project to a GitHub repository
2. Go to vercel.com → New Project → Import from GitHub
3. Add environment variables from `.env.local`
4. Deploy

### 5. Configure GHL Webhook
After deployment, your webhook URL will be:
`https://your-app.vercel.app/api/webhook`

In GHL → Automations → Create workflow:
- Trigger: Contact Changed
- Action: Webhook → POST to your URL above

### Architecture
- **Frontend**: Next.js (React) on Vercel
- **Database**: Supabase (PostgreSQL)  
- **Auth**: Supabase Auth (email/password + magic link)
- **API**: Next.js API routes for webhooks
- **Security**: Row-Level Security ensures reps only see their customers
