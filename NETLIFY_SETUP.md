# Netlify Functions Setup - Complete Guide

## ✅ Changes Made

### Frontend
- ✅ Removed Supabase imports from `ContactSection.tsx`
- ✅ Removed Supabase imports from `EnquiryPopup.tsx`
- ✅ Updated both to use `fetch('/.netlify/functions/send-enquiry', ...)`

### Backend
- ✅ Created `netlify/functions/send-enquiry.ts` with nodemailer
- ✅ Added `netlify.toml` configuration
- ✅ Added `nodemailer` to `package.json`

---

## 🚀 Setup Instructions

### 1. Set Environment Variables in Netlify Dashboard

1. Go to **Netlify Dashboard** → Your Site
2. Click **Site Settings**
3. Go to **Build & Deploy** → **Environment**
4. Click **Edit Variables**
5. Add these environment variables:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=noreply@isparkstech.com
SMTP_PASSWORD=[your_hostinger_password]
RECIPIENT_EMAIL=sales@isparkstech.com
```

**Important:** Do NOT commit `.env` files to git. Only use the Netlify dashboard.

### 2. Deploy to Netlify

#### Option A: Connect GitHub (Recommended)
```bash
# Push changes to GitHub
git add .
git commit -m "Switch from Supabase to Netlify Functions with nodemailer"
git push origin main
```

Then Netlify will auto-deploy.

#### Option B: Deploy Locally (Testing)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

### 3. Verify It Works

#### Test via Browser
1. Go to your site
2. Fill out contact form
3. Submit
4. You should see "Success!" message
5. Check your email at `sales@isparkstech.com`

#### Test via cURL
```bash
curl -X POST https://YOUR_NETLIFY_SITE.netlify.app/.netlify/functions/send-enquiry \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "company": "Test Co",
    "service": "AI Chatbot",
    "message": "Testing the form",
    "source": "contact"
  }'
```

Expected response:
```json
{"success":true,"messageId":"<UUID>"}
```

---

## 📁 Project Structure

```
netlify/
  functions/
    send-enquiry.ts          ← Netlify Function with nodemailer

src/
  components/
    ContactSection.tsx       ← Updated: uses fetch()
    EnquiryPopup.tsx         ← Updated: uses fetch()

netlify.toml                 ← Configuration for Netlify
package.json                 ← Added nodemailer
```

---

## 🔍 How It Works

### Request Flow
```
User fills form in browser
    ↓
ContactSection.tsx calls: fetch('/.netlify/functions/send-enquiry', ...)
    ↓
Request goes to: /.netlify/functions/send-enquiry
    ↓
Netlify Function reads env vars (SMTP_*, RECIPIENT_EMAIL)
    ↓
Uses nodemailer to send email via Hostinger SMTP
    ↓
Returns: { success: true, messageId: "..." }
    ↓
Frontend shows: "Success! Your enquiry has been sent."
```

---

## 🆘 Troubleshooting

### "Failed to send enquiry" Error
1. Check Netlify Functions logs:
   - Netlify Dashboard → Site → Functions → send-enquiry → Logs
2. Verify environment variables are set:
   - Netlify Dashboard → Site Settings → Environment
3. Test SMTP credentials separately if needed

### Form Submits But No Email Received
1. Check **Netlify Function logs** for SMTP errors
2. Verify `RECIPIENT_EMAIL` is correct
3. Check spam folder
4. Test with cURL command above

### "Cannot find module 'nodemailer'"
1. Run: `npm install`
2. Redeploy to Netlify (push to GitHub or `netlify deploy --prod`)

### CORS Errors
1. Check browser console for exact error
2. Verify CORS headers in `netlify.toml`
3. Try from different domain/localhost

---

## 📋 Checklist Before Going Live

- [ ] npm install completed successfully
- [ ] Netlify environment variables set in dashboard
- [ ] netlify.toml file exists
- [ ] Contact form tested in browser
- [ ] Email received at recipient address
- [ ] Popup form tested and works
- [ ] Changes pushed to GitHub
- [ ] Netlify build succeeded (check build logs)
- [ ] No Supabase imports in React files
- [ ] Forms call `/.netlify/functions/send-enquiry`

---

## 🔒 Security Notes

✅ **What's Secure:**
- Nodemailer runs server-side only
- SMTP credentials never exposed to frontend
- No secrets in JavaScript bundle
- Environment variables encrypted in Netlify

✅ **Best Practices:**
- Never commit `.env` files
- Use Netlify dashboard for secrets
- Keep environment variables per deployment
- Rotate SMTP password regularly

---

## 📞 Support

If issues arise:

1. **Check Function Logs:**
   - Netlify → Functions → send-enquiry → Logs

2. **Verify Config:**
   - netlify.toml exists
   - All env vars set
   - nodemailer installed

3. **Test Endpoint:**
   ```bash
   curl -X POST https://YOUR_SITE/.netlify/functions/send-enquiry \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test","email":"test@test.com"}'
   ```

---

## ✨ You're All Set!

Your project now uses:
- ✅ Netlify Functions (instead of Supabase)
- ✅ Nodemailer for sending emails
- ✅ No Supabase dependencies
- ✅ Clean, simple setup

Deploy and enjoy! 🚀
