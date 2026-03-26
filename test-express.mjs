import express from 'express';
const app = express();
app.get(/.*/, (req, res) => {
  res.status(200).send("OK " + req.path);
});
app.listen(3001, () => {
  console.log("Listening on 3001");
  fetch('http://localhost:3001/').then(r => r.text()).then(t => {
    console.log("Response for / :", t);
    process.exit(0);
  });
});
