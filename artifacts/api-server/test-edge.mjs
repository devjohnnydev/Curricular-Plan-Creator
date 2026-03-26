import express from 'express';
import path from 'path';

const app = express();

const publicPath = path.resolve(process.cwd(), "../../artifacts/plano-ensino/dist/public");
console.log("Public path is:", publicPath);

app.use(express.static(publicPath));
app.get(/.*/, (_req, res) => {
  console.log("Fallback route hit for", _req.url);
  res.sendFile(path.join(publicPath, "index.html"));
});

app.use((err, req, res, next) => {
  console.log("Error caught:", err);
  res.status(500).send("Error");
});

app.listen(3001, '::', () => {
  console.log("Test server via :: listening on 3001...");
  
  fetch('http://localhost:3001/')
    .then(r => console.log("GET / status:", r.status, "headers:", r.headers))
    .catch(e => console.error("GET / failed:", e));
    
  fetch('http://localhost:3001/favicon.ico')
    .then(r => console.log("GET /favicon.ico status:", r.status))
    .catch(e => console.error("GET /favicon failed:", e))
    .finally(() => process.exit(0));
});
