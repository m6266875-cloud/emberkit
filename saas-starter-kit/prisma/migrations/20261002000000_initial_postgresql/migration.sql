-- This migration creates a fresh database schema; it does not modify Supabase.
CREATE TYPE "ProjectStatus" AS ENUM ('draft', 'in_progress', 'completed');

CREATE TABLE "users" (
  "id" UUID NOT NULL,
  "email" VARCHAR(254) NOT NULL,
  "name" VARCHAR(80) NOT NULL,
  "username" VARCHAR(30),
  "website" VARCHAR(300),
  "password_hash" VARCHAR(100) NOT NULL,
  "auth_version" INTEGER NOT NULL DEFAULT 0,
  "is_subscribed" BOOLEAN NOT NULL DEFAULT false,
  "stripe_customer_id" TEXT,
  "stripe_subscription_id" TEXT,
  "subscription_status" TEXT,
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "projects" (
  "id" UUID NOT NULL,
  "user_id" UUID NOT NULL,
  "name" VARCHAR(100) NOT NULL,
  "description" VARCHAR(2000),
  "status" "ProjectStatus" NOT NULL DEFAULT 'draft',
  "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "rate_limits" (
  "key" VARCHAR(64) NOT NULL,
  "hits" INTEGER NOT NULL,
  "expires_at" TIMESTAMPTZ(3) NOT NULL,
  CONSTRAINT "rate_limits_pkey" PRIMARY KEY ("key")
);

CREATE TABLE "stripe_events" (
  "id" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "processed_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "stripe_events_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");
CREATE UNIQUE INDEX "users_stripe_subscription_id_key" ON "users"("stripe_subscription_id");
CREATE INDEX "projects_user_id_created_at_idx" ON "projects"("user_id", "created_at");
CREATE INDEX "rate_limits_expires_at_idx" ON "rate_limits"("expires_at");
ALTER TABLE "projects" ADD CONSTRAINT "projects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
