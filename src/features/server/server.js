const express = require('express');
const path = require('path');

const app = express();

console.log(path.join(__dirname));

app.use("/", express.static(path.join(__dirname), { extensions: ["html"] }));

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, 'router.html')));

const port = 8082;

app.listen(port, () => {
    console.log(`Server is now running on port ${port}`);
});
