CREATE TABLE "user" (
  "user_id" uuid UNIQUE PRIMARY KEY,
  "email" varchar UNIQUE,
  "created_at" timestamp,
  "archived" boolean
);

CREATE TABLE "goal" (
  "goal_id" uuid PRIMARY KEY,
  "user_id" uuid,
  "created_at" timestamp,
  "archived" timestamp,
  "due_date" timestamp,
  "description" varchar,
  "notes" varchar
  "is_public" boolean  
  "daruma" varchar
);

CREATE TABLE "auth_token" (
  "auth_token_id" uuid UNIQUE PRIMARY KEY,
  "token" integer UNIQUE,
  "email" varchar,
  "user_id" uuid,
  "expiration" timestamp
);

COMMENT ON COLUMN "user"."user_id" IS 'Base user created when email is validated';

COMMENT ON COLUMN "goal"."goal_id" IS 'User can create multiple goals';

COMMENT ON COLUMN "goal"."notes" IS 'optional';

COMMENT ON COLUMN "auth_token"."auth_token_id" IS 'whenever a user logs in with email, they are sent a 6 digit key. They must enter this on client to recieve jwt. If no user in table exists on authentication, one should be created';

COMMENT ON COLUMN "auth_token"."token" IS 'this should be a 6 digit code';

COMMENT ON COLUMN "auth_token"."user_id" IS 'Optional, if no user in table exists with email none will be assigned';

ALTER TABLE "goal" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");

ALTER TABLE "auth_token" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");
