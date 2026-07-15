const imageContext = require.context("../assets/images", true, /\.(png|jpe?g|webp)$/i);

const images = imageContext.keys().reduce((acc, key) => {
  const resolved = imageContext(key);
  acc[key.replace(/^\.\//, "")] = resolved.default || resolved;
  return acc;
}, {});

const normalizeAssetPath = (path) =>
  path
    .replace(/^\/+/, "")
    .replace(/^images\//, "");

export const asset = (path) => {
  const key = normalizeAssetPath(path);
  const resolved = images[key];

  if (!resolved && process.env.NODE_ENV !== "production") {
    // Surface broken image references during development instead of failing silently.
    console.warn(`Missing bundled image asset: ${path}`);
  }

  return resolved || "";
};
