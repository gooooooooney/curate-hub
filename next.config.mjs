
import { createJiti } from "jiti";
import path from "path";

// This is validation for the environment variables early in the build process.
const jiti = createJiti(new URL(import.meta.url).pathname);
await jiti.import(path.resolve(process.cwd(), "./src/lib/env.js"))

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
