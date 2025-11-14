# 🧪 Complete Testing Guide for SignalForge OS

## ✅ Test Checklist

### 1. Authentication Tests

#### Test Sign Up
1. Go to http://localhost:8080
2. Click "Get Started"
3. Click "Don't have an account? Sign up"
4. Enter:
   - **Full Name:** Hamza Muzamil
   - **Email:** hamzamuzamil21@gmail.com
   - **Password:** Test123!@#
5. Click "Sign Up"
6. **Expected:** Success message, auto-login, redirected to dashboard

#### Test Login
1. Sign out (if logged in)
2. Click "Already have an account? Sign in"
3. Enter:
   - **Email:** hamzamuzamil21@gmail.com
   - **Password:** Test123!@#
4. Click "Sign In"
5. **Expected:** Success message, redirected to dashboard

#### Test Sign Out
1. Click "Sign Out" button in header
2. **Expected:** Logged out, redirected to landing page

---

### 2. Feed Dump Tests

#### Test Feed Filtering
1. Click on "Feed Dump" tab (or it should be default)
2. Copy and paste this test data into the text area:

```
📧 Email from investor@a16z.com
Subject: Series A Follow-up
Hi there! Following up on our conversation about your startup. We'd love to schedule a deeper dive into your business model. We're particularly interested in your traction metrics and go-to-market strategy. Can we schedule a call this week?

📧 Email from newsletter@techcrunch.com
Subject: Daily Tech News Digest
This week in startup land: 10 new funding rounds, 3 major exits, and market trends analysis. Read more about the latest in AI, fintech, and SaaS.

📧 Email from legal@bigcorp.com
Subject: Contract Terms Discussion
We've reviewed the proposed changes to the partnership agreement. We need your decision on the revenue share model by end of week. The contract is time-sensitive.

🐦 Twitter: @startupfounder
Just launched our MVP! 🚀 Excited to see what our users think. #startup #mvp

📧 Email from events@growthco.com
Subject: Webinar: Growth Hacking Tactics
Join us for an exclusive webinar on scaling your startup with proven growth tactics. Learn from industry experts.

📰 Article: "The Future of AI in Startups"
Artificial intelligence is transforming how startups operate. From customer service to product development, AI tools are becoming essential.

📧 Email from customer@example.com
Subject: Feature Request
Love the product! Would it be possible to add dark mode? Many users have requested this feature.

💰 Funding Alert: StartupXYZ raised $50M Series B
The company plans to expand into European markets and double their engineering team.
```

3. Click "Filter My Feed" button
4. **Expected:** 
   - Loading indicator appears
   - After processing, shows filtered results with signal cards
   - High-value signals (investor email, contract, funding) should be highlighted
   - Low-priority items (newsletter, webinar) should be marked as noise

#### Test Signal Cards
1. After filtering, you should see cards with:
   - **Signal Type:** Signal or Noise
   - **Score:** 0-100
   - **Category:** (e.g., Important, General)
   - **Summary:** Brief description
   - **Suggested Action:** Read, Save, or Ignore

---

### 3. Inbox Signalizer Tests

1. Click on "Inbox" tab
2. **Expected:** See mock emails with AI labels:
   - **Opportunity:** Series A Follow-up (green badge)
   - **Low Priority:** Newsletter (blue badge)
   - **Decision Needed:** Contract terms (yellow badge)
   - **Ignore:** Webinar (red badge)

#### Test Label Confirmation
1. Click "✓ Confirm AI Label" on any email
2. **Expected:** "Confirmed" badge appears, success toast

#### Test Label Change
1. Click on a different label button (e.g., click "opportunity" on a "low priority" email)
2. **Expected:** Label changes, success toast appears

---

### 4. Clarity Compass Tests

1. Click on "Clarity" tab
2. **Expected:** See weekly summary with:
   - Time distribution chart
   - Top signals list
   - Focus areas
   - Weekly insights

---

### 5. Focus Alerts Tests

1. Click on "Focus" tab
2. **Expected:** See alerts dashboard with:
   - Priority signals
   - Custom filters
   - Real-time monitoring (mock data)

---

### 6. Blind Spot Scanner Tests

1. Click on "Blind Spot" tab
2. Enter goals:
   - **Goal 1:** Raise Series A funding
   - **Goal 2:** Hire 5 engineers
   - **Goal 3:** Launch v2.0 product
3. Click "Analyze Blind Spots"
4. **Expected:** 
   - Loading indicator
   - After 3 seconds, shows analysis with:
     - Missing information areas
     - Priority levels (High/Medium/Low)
     - Suggested actions
     - AI recommendations

---

### 7. Navigation Tests

#### Test Home Button
1. Click "Home" button in header
2. **Expected:** Switches to Feed Dump tab (home view)

#### Test Logo Click
1. Click "SignalOS" logo
2. **Expected:** Switches to Feed Dump tab

#### Test Tab Navigation
1. Click each tab: Feed Dump, Inbox, Clarity, Focus, Blind Spot
2. **Expected:** Each tab loads its content, active tab is highlighted

---

### 8. Database Tests

#### Verify Data is Saved
1. After filtering feed, check database:
   ```sql
   SELECT * FROM signals ORDER BY created_at DESC LIMIT 10;
   ```
2. **Expected:** See your filtered signals in the database

#### Verify User Created
1. Check users table:
   ```sql
   SELECT id, email, full_name, created_at FROM users;
   ```
2. **Expected:** See your user account

---

## 📊 Sample Test Data

### High-Value Signals (Should score 70+)
```
📧 Series A funding opportunity from Andreessen Horowitz
📧 Partnership contract needs your signature by Friday
💰 Competitor raised $100M - market analysis needed
📧 Customer wants to upgrade to enterprise plan
```

### Medium Priority (Should score 40-70)
```
📧 Weekly team standup reminder
📰 Industry news: AI trends in 2024
📧 Product update: New features released
```

### Low Priority / Noise (Should score <40)
```
📧 Newsletter: Daily digest
📧 Webinar invitation: Growth tactics
🐦 Social media notification
📧 Spam: Win a free iPhone
```

---

## ✅ Success Criteria

### Authentication
- ✅ Can sign up with full name
- ✅ Can log in
- ✅ Can sign out
- ✅ Session persists on page refresh

### Feed Dump
- ✅ Can paste content
- ✅ Filters signals from noise
- ✅ Shows signal cards with scores
- ✅ Saves to database

### Navigation
- ✅ All tabs work
- ✅ Home button works
- ✅ Logo click works
- ✅ Sign out works

### Data Persistence
- ✅ Signals saved to database
- ✅ User data saved
- ✅ Can retrieve data after refresh

---

## 🐛 Common Issues & Solutions

### "Unable to connect to server"
- **Solution:** Make sure backend is running on port 3001
- Check: http://localhost:3001/api/health

### No signals showing after filter
- **Solution:** Check browser console for errors
- Verify backend is saving to database

### Home button not working
- **Solution:** Should now work after fix - refreshes to Feed Dump

---

## 🎯 Quick Test (5 minutes)

1. **Sign Up** → Enter name, email, password
2. **Feed Dump** → Paste test data → Click "Filter My Feed"
3. **Inbox** → Confirm a label
4. **Blind Spot** → Enter 1 goal → Analyze
5. **Home** → Click Home button → Should go to Feed Dump
6. **Sign Out** → Should return to landing page

If all these work, your app is ready! 🎉

