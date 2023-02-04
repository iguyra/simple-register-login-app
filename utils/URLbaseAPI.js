let BASE_URL = "http://127.0.0.1:3000";

if (process.env_NODE_ENV === "development") {
  BASE_URL = BASE_URL;
}
if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://unidemo.vercel.app";
}

module.exports = BASE_URL;
