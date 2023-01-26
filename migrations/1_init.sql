-- create "alembic_version" table
CREATE TABLE "alembic_version" ("version_num" character varying(32) NOT NULL, PRIMARY KEY ("version_num"));
-- create "users" table
CREATE TABLE "users" ("id" serial NOT NULL, "username" text NOT NULL, "email" text NOT NULL, "salt" text NOT NULL, "hashed_password" text NULL, "bio" text NOT NULL DEFAULT '', "image" text NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id"));
-- create index "ix_users_email" to table: "users"
CREATE UNIQUE INDEX "ix_users_email" ON "users" ("email");
-- create index "ix_users_username" to table: "users"
CREATE UNIQUE INDEX "ix_users_username" ON "users" ("username");
-- create "items" table
CREATE TABLE "items" ("id" serial NOT NULL, "slug" text NOT NULL, "title" text NOT NULL, "description" text NOT NULL, "body" text NULL, "image" text NULL, "seller_id" integer NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id"), CONSTRAINT "items_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE SET NULL);
-- create index "ix_items_slug" to table: "items"
CREATE UNIQUE INDEX "ix_items_slug" ON "items" ("slug");
-- create "comments" table
CREATE TABLE "comments" ("id" serial NOT NULL, "body" text NOT NULL, "seller_id" integer NOT NULL, "item_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id"), CONSTRAINT "comments_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "comments_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "favorites" table
CREATE TABLE "favorites" ("user_id" integer NOT NULL, "item_id" integer NOT NULL, PRIMARY KEY ("user_id", "item_id"), CONSTRAINT "favorites_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "followers_to_followings" table
CREATE TABLE "followers_to_followings" ("follower_id" integer NOT NULL, "following_id" integer NOT NULL, PRIMARY KEY ("follower_id", "following_id"), CONSTRAINT "followers_to_followings_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "followers_to_followings_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users" ("id") ON UPDATE NO ACTION ON DELETE CASCADE);
-- create "tags" table
CREATE TABLE "tags" ("tag" text NOT NULL, PRIMARY KEY ("tag"));
-- create "items_to_tags" table
CREATE TABLE "items_to_tags" ("item_id" integer NOT NULL, "tag" text NOT NULL, PRIMARY KEY ("item_id", "tag"), CONSTRAINT "items_to_tags_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items" ("id") ON UPDATE NO ACTION ON DELETE CASCADE, CONSTRAINT "items_to_tags_tag_fkey" FOREIGN KEY ("tag") REFERENCES "tags" ("tag") ON UPDATE NO ACTION ON DELETE CASCADE);
