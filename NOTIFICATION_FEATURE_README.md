# Notification Management Feature Setup

## Overview
This feature allows admins to create, edit, delete, and schedule notifications to users. Admins can enable/disable scheduled notifications without deleting them.

## Database Setup

### 1. Create the Notifications Table

Run the following SQL script in your PostgreSQL database (`cam4me`):

```sql
-- Run this in pgAdmin or psql
\c cam4me

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    message TEXT NOT NULL,
    "scheduledDate" DATE,
    "scheduledTime" TIME,
    "isScheduled" BOOLEAN DEFAULT FALSE,
    "scheduleEnabled" BOOLEAN DEFAULT TRUE,
    status VARCHAR(50) DEFAULT 'draft',
    "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled 
    ON notifications("isScheduled", "scheduleEnabled", "scheduledDate", "scheduledTime");
CREATE INDEX IF NOT EXISTS idx_notifications_status 
    ON notifications(status);
```

Alternatively, you can run the SQL file directly:
```bash
psql -U postgres -d cam4me -f server/create_notifications_table.sql
```

### 2. Restart the Backend Server

After creating the table, restart your backend server:

```bash
cd server
node index.js
```

## Features

### Admin Dashboard
- Access via Admin Login (dwaith.dev@gmail.com)
- New "Notification Management" section showing:
  - Total notifications count
  - Scheduled notifications count
  - Button to manage notifications

### Notification Management Screen
- **View All Notifications**: List of all notifications with status badges
- **Create New**: Click the "+" button to create a new notification
- **Edit**: Modify existing notifications
- **Delete**: Remove notifications permanently
- **Send Now**: Immediately send a notification to all users
- **Schedule**: Set date and time for automatic sending
- **Enable/Disable Schedule**: Toggle scheduled notifications without deleting the schedule

### Notification Form
- **Title**: Short title for the notification
- **Message**: Detailed notification message
- **Schedule Options**:
  - Checkbox to enable scheduling
  - Date picker for schedule date
  - Time picker for schedule time
  - Enable/Disable toggle for the schedule

### Notification Status
- **draft**: Notification created but not sent
- **scheduled**: Notification set to send at a specific time
- **sent**: Notification has been delivered to users

## API Endpoints

The following endpoints are available:

- `POST /api/notifications` - Create or update a notification
- `GET /api/notifications` - Get all notifications
- `PUT /api/notifications/:id` - Update a specific notification
- `DELETE /api/notifications/:id` - Delete a notification

## Usage Flow

1. **Login as Admin**
   - Use admin credentials to access the admin dashboard

2. **Navigate to Notifications**
   - Click "Manage Notifications" button

3. **Create a Notification**
   - Click the "+" button
   - Enter title and message
   - Optionally schedule it for a specific date/time
   - Click "Create"

4. **Edit a Notification**
   - Click "Edit" on any notification
   - Modify the details
   - Click "Update"

5. **Schedule Management**
   - Enable scheduling by checking "Schedule Notification"
   - Set date and time
   - Use the "Enable/Disable" button to toggle the schedule without deleting it

6. **Send Notification**
   - Click "Send Now" to immediately deliver the notification
   - Or wait for the scheduled time if scheduling is enabled

## Notes

- Only authorized admins (dwaith.dev@gmail.com) can access notification management
- Scheduled notifications require the schedule to be enabled
- Sent notifications cannot be sent again
- All notifications are stored in PostgreSQL for persistence
