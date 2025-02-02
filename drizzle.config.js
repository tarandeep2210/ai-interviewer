import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  driver: 'pg',
  dbCredentials: {
    connectionString: 'postgresql://ai-interview-mocker_owner:VFR5U6IcDAwd@ep-red-mouse-a16fwqw1.ap-southeast-1.aws.neon.tech/ai-interview-mocker?sslmode=require',
  },
});
