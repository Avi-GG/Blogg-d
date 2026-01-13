-- Bring migration history in sync with existing DB state.
-- Adds Blog.userId + FK to User if missing.

-- Add column if missing
ALTER TABLE "Blog" ADD COLUMN IF NOT EXISTS "userId" INTEGER;

-- Make required (may fail if existing rows contain NULL userId)
ALTER TABLE "Blog" ALTER COLUMN "userId" SET NOT NULL;

-- Add FK only if there is no FK on Blog(userId)
DO $$
BEGIN
	IF NOT EXISTS (
		SELECT 1
		FROM pg_constraint c
		JOIN pg_class rel ON rel.oid = c.conrelid
		JOIN pg_attribute a ON a.attrelid = rel.oid AND a.attnum = ANY (c.conkey)
		WHERE c.contype = 'f'
			AND rel.relname = 'Blog'
			AND a.attname = 'userId'
	) THEN
		ALTER TABLE "Blog"
		ADD CONSTRAINT "Blog_userId_fkey"
		FOREIGN KEY ("userId") REFERENCES "User"("id")
		ON DELETE CASCADE ON UPDATE CASCADE;
	END IF;
END $$;
