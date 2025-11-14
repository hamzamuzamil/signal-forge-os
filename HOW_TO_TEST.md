# 🧪 How to Test SignalOS - Complete Guide

## ✅ What I Fixed

1. **Email Detection**: Feed Dump now automatically detects emails (lines starting with "📧 Email from" or "Subject:")
2. **Email Labels**: Emails are automatically labeled (opportunity, decision_needed, low_priority)
3. **Clear All Button**: Only shows when there are actual emails in Inbox (not just any signals)

## 📋 Step-by-Step Testing

### Step 1: Clear Old Data (Optional)
1. Go to **Clarity** or **Focus** page
2. Click **"Clear All"** button (if visible)
3. Confirm deletion
4. This ensures you start fresh

### Step 2: Add Test Data in Feed Dump
1. Go to **Feed Dump** tab
2. Paste this test data:
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
```

3. Click **"Filter My Feed"** button
4. You should see signals appear below

### Step 3: Check Each Page

#### ✅ Feed Dump
- **What to see**: List of processed signals
- **Should show**: All content (emails and other signals)
- **Status**: ✅ Working if signals appear

#### ✅ Inbox Signalizer
- **What to see**: Only emails (signals with email_label)
- **Should show**: 
  - 3 emails from your test data
  - "Clear All" button (only when emails exist)
- **Status**: ✅ Working if emails appear
- **If empty**: Check that emails were detected (look for "📧 Email from" in your data)

#### ✅ Clarity Compass
- **What to see**: Insights and charts based on ALL signals
- **Should show**:
  - Top 3 signals
  - Time/Value distribution chart
  - Focus areas
  - "Clear All Data" button
- **Status**: ✅ Working if charts and insights appear

#### ✅ Focus Alerts
- **What to see**: All signals (emails + other content)
- **Should show**:
  - All processed signals
  - Filter options
  - "Clear All" button
- **Status**: ✅ Working if signals appear

## 🔍 How to Verify It's Working

### Check 1: Emails Appear in Inbox
- ✅ **Working**: You see emails in Inbox tab
- ❌ **Not Working**: Inbox shows "No emails yet"
  - **Fix**: Make sure your data has "📧 Email from" or "Subject:" lines

### Check 2: Data Appears in Other Pages
- ✅ **Working**: Clarity and Focus show data
- ❌ **Not Working**: Pages are empty
  - **Fix**: Make sure you clicked "Filter My Feed" in Feed Dump

### Check 3: Clear All Button
- ✅ **Working**: Button appears when there's data, disappears when empty
- ❌ **Not Working**: Button always shows or never shows
  - **Fix**: Refresh browser (Ctrl+Shift+R)

## 🎯 Expected Results

After pasting test data and clicking "Filter My Feed":

1. **Feed Dump**: Shows 3+ signals (emails + other content)
2. **Inbox**: Shows 3 emails with labels (opportunity, low_priority, decision_needed)
3. **Clarity**: Shows insights, charts, and top signals
4. **Focus**: Shows all signals with filtering options

## 🐛 Troubleshooting

### Problem: Inbox shows "No emails yet"
**Solution**: 
- Make sure your data includes lines starting with:
  - `📧 Email from [email]`
  - `Subject: [subject]`
- Check Feed Dump - did signals get created?
- Refresh Inbox page

### Problem: Clear All button not showing
**Solution**:
- Button only shows when there are emails in Inbox
- If you have data but no emails, check Clarity or Focus for the button
- Refresh browser

### Problem: Data not appearing anywhere
**Solution**:
1. Check browser console (F12) for errors
2. Make sure backend is running (port 3001)
3. Make sure you're logged in
4. Try adding data again in Feed Dump

## 📊 Data Flow

```
Feed Dump (Paste Data)
    ↓
Click "Filter My Feed"
    ↓
Signals Processed & Saved
    ↓
Emails → Inbox (with email_label)
All Signals → Clarity & Focus
```

## ✅ Quick Test Checklist

- [ ] Backend running on port 3001
- [ ] Logged in to SignalOS
- [ ] Pasted test data in Feed Dump
- [ ] Clicked "Filter My Feed"
- [ ] Feed Dump shows signals
- [ ] Inbox shows emails (if data had emails)
- [ ] Clarity shows insights
- [ ] Focus shows all signals
- [ ] Clear All button works

---

**Refresh your browser (Ctrl+Shift+R) and try the test data again!**

