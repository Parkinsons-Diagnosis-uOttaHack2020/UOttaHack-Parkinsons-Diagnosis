const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/send-image", (req, res) => {
    const parsed = req.body;
    res.send(parsed);
})

app.listen(port, () => console.log(`Api starting on port ${port}!`));