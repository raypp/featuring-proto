# Featuring Studio (B2C) – Automated DM PRD

## 1. Product Overview

Featuring Studio is a B2C web application for Instagram Business Account owners (influencers).
It allows users to configure and operate automated Direct Messages (DMs) triggered by comments on Instagram posts.

Primary goal:
Enable influencers to self-configure, operate, and optimize automated DM campaigns safely and at scale, without external tools.

Key constraints:
- Each user can connect exactly one Instagram Business Account.
- Users can create multiple automated DM configurations ("Automations").
- No automatic saving: data is persisted only when explicitly requested by the user.
- System must comply with Meta API policies and rate limits.
- Message delivery must be idempotent and resilient under high traffic.

---

## 2. Core Entities

### User
- id
- email
- password_hash
- created_at
- deleted_at (nullable)

### InstagramAccount
- id
- user_id (unique)
- ig_business_id
- access_token
- token_expires_at
- status (connected | expired | revoked)

### Automation
- id
- user_id
- instagram_account_id
- title
- post_id
- status (draft | active | stopped)
- created_at
- updated_at
- last_activated_at (nullable)

### AutomationConfig
- automation_id
- trigger_type (keyword | all)
- trigger_keywords (array, nullable, max 10)
- auto_reply_enabled (boolean)
- auto_reply_messages (array, nullable, min 3 when enabled)
- dm_message (string)
- buttons (array, max 3)
- follower_gate_enabled (boolean)

---

## 3. Automation State Machine

### States
- draft
- active
- stopped

### State Definitions

Draft:
- Created immediately when user clicks "Create Automation".
- No validation required.
- Can be saved multiple times.
- Insights are not available.

Active:
- Activated only by explicit "Run" action.
- Validation required at activation time.
- Automated DM sending enabled.

Stopped:
- Previously active automation.
- DM sending disabled.
- Historical insights remain accessible.

### State Rules
- Editing configuration does NOT change the current state.
- Only explicit Run / Stop actions change state.
- Deleting an automation cancels all queued messages.

---

## 4. Saving & Validation Rules

- No auto-save is provided.
- "Save" action:
  - Available only in draft state.
  - No validation performed.
- "Run" action:
  - Always visible.
  - Performs validation:
    - post_id must exist
    - trigger condition must be defined
    - dm_message must exist
  - If validation fails:
    - Automation does not activate
    - Error messages are shown on invalid fields

---

## 5. API Contract

### Create Automation
POST /automations

Response:
- automation_id
- status: draft

---

### Save Draft
POST /automations/{id}/save

- No validation

---

### Run Automation
POST /automations/{id}/run

Validation rules:
- post_id required
- trigger condition required
- dm_message required

---

### Stop Automation
POST /automations/{id}/stop

---

### Delete Automation
DELETE /automations/{id}

Effects:
- Cancel all queued messages
- Delete automation and related configurations

---

## 6. Webhook & Message Delivery

### Webhook Handling
- Receive Instagram comment webhook.
- Immediately return HTTP 200.
- Validate idempotency.
- Enqueue DM sending job.

### Idempotency Key
- comment_id + automation_id

### Processing Flow
1. Webhook received
2. Validate automation state (must be active)
3. Deduplicate using idempotency key
4. Enqueue message
5. Worker sends DM asynchronously

---

## 7. Rate Limiting & Safety

- Message throttling is applied per Instagram account.
- Baseline assumption:
  - Approx. 750 messages/hour maximum.
- High-volume comment bursts are queued and processed sequentially.
- Randomized delay (jitter) applied to DM sending (e.g. 5–45 seconds).

---

## 8. Frontend Routes

Public:
- /login
- /signup

Authenticated:
- /connect
- /dashboard
- /automation/new
- /automation/{id}

---

## 9. Dashboard Requirements

### KPI Cards
- Active Automations (count)
- Reach (unique users)
- Click Users (unique users)

### Automation List
- title
- status
- reach
- click users
- last updated at

---

## 10. Automation Editor UI Logic

### Draft State
- CTA: Cancel / Save / Run
- Save: no validation
- Run: validation required

### Active State
- CTA: Update / Stop
- Updates apply only to new incoming comments

### Stopped State
- CTA: Update / Run

---

## 11. Exit Protection

If the user attempts to leave the page with unsaved changes:
- Show confirmation modal
- On confirm:
  - Discard unsaved data
  - Revert to last saved state

---

## 12. Insights Availability

- Draft automations:
  - No insights visible
- Active or stopped automations:
  - Insights tab visible
  - Metrics include:
    - Reach (unique)
    - Click users (unique)
    - Click-through rate (CTR)
    - Button-level performance

---

## 13. Out of Scope (MVP)

- Multiple Instagram accounts per user
- Auto-save or draft recovery after logout
- Manual DM replies
- Cross-platform automation
