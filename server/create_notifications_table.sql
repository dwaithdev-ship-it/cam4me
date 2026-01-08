-- Create notifications table for admin notification management
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

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications("isScheduled", "scheduleEnabled", "scheduledDate", "scheduledTime");
CREATE INDEX IF NOT EXISTS idx_notifications_status ON notifications(status);
