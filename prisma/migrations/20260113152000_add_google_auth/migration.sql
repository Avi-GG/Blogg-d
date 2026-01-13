-- Add optional password + googleId for Google OAuth

-- Make password nullable (for Google-created users)
ALTER TABLE "User" ALTER COLUMN "password" DROP NOT NULL;

-- Add googleId if missing
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "googleId" TEXT;

-- Ensure googleId uniqueness (multiple NULLs allowed)
CREATE UNIQUE INDEX IF NOT EXISTS "User_googleId_key" ON "User"("googleId");
