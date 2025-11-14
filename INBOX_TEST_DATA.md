# 📧 How to Test Inbox - Data Format Guide

## ✅ What Data Shows in Inbox?

**Inbox only shows signals that have `email_label` set.**

Feed Dump automatically detects emails if your content contains:
- `📧 Email from` or `Email from`
- `Subject:` 
- Email addresses with `@`

## 📝 Test Data Format for Inbox

### ✅ Format 1: With Email Icon
```
📧 Email from investor@a16z.com
Subject: Series A Follow-up
Hi there! Following up on our conversation about your startup.
```

### ✅ Format 2: Without Icon
```
Email from investor@a16z.com
Subject: Series A Follow-up
Hi there! Following up on our conversation about your startup.
```

### ✅ Format 3: Just Subject Line
```
Subject: Important Meeting
We need to schedule a call this week about the partnership.
```

## 🧪 Quick Test Steps

1. **Go to Feed Dump**
2. **Paste this test data:**
```
📧 Email from investor@a16z.com
Subject: Series A Follow-up
Hi there! Following up on our conversation about your startup. We'd love to schedule a deeper dive.

📧 Email from newsletter@techcrunch.com
Subject: Daily Tech News Digest
This week in startup land: 10 new funding rounds, 3 major exits.

📧 Email from legal@bigcorp.com
Subject: Contract Terms Discussion
We've reviewed the proposed changes. We need your decision by end of week.
```

3. **Click "Filter My Feed"**
4. **Go to Inbox** - You should see 3 emails!

## 📊 What Gets Labeled as What?

- **opportunity**: Contains "investor", "funding", "series"
- **decision_needed**: Contains "urgent", "deadline", "decision"
- **low_priority**: Contains "newsletter", "digest", "webinar"
- **Default**: Other emails → "opportunity"

## ⚠️ Important Notes

- **Inbox shows ONLY emails** (signals with email_label)
- **Other content** (without email patterns) appears in:
  - **Clarity**: Shows all signals (emails + other content)
  - **Focus**: Shows all signals (emails + other content)
- **Noise content** still works normally - it's just not shown in Inbox

## 🎯 Expected Results

After pasting email data:
- ✅ **Feed Dump**: Shows all processed content
- ✅ **Inbox**: Shows only emails (3 from test data)
- ✅ **Clarity**: Shows insights from all signals
- ✅ **Focus**: Shows all signals

---

**Refresh browser and try the test data above!**

