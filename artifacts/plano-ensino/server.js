import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, "dist");
const PORT = Number(process.env.PORT) || 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".json": "application/json",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".webp": "image/webp",
};

function serveFile(res, filePath, mime) {
  const stat = fs.statSync(filePath);
  res.writeHead(200, {
    "Content-Type": mime,
    "Content-Length": stat.size,
    "Cache-Control": mime === "text/html; charset=utf-8"
      ? "no-cache"
      : "public, max-age=31536000, immutable",
  });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  let urlPath = req.url.split("?")[0];

  // Decode URL
  try { urlPath = decodeURIComponent(urlPath); } catch {}

  const filePath = path.join(DIST, urlPath);

  // Security: block path traversal
  if (!filePath.startsWith(DIST)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  // Check if exact file exists
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    return serveFile(res, filePath, MIME[ext] || "application/octet-stream");
  }

  // SPA fallback — serve index.html
  const index = path.join(DIST, "index.html");
  if (fs.existsSync(index)) {
    return serveFile(res, index, "text/html; charset=utf-8");
  }

  res.writeHead(404); res.end("Not found");
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`✅  Plano de Ensino rodando em http://0.0.0.0:${PORT}`);
});
