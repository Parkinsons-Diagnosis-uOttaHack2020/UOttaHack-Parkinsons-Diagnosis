const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("cross-fetch");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/send-image", async (req, res) => {
  const data = req.body;
  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };

  let fetched;
  try {
    let name = await fetch("http://localhost:5000/postdata", options);
    if (!name.ok) {
      throw new Error(name.status);
    }
    const parsedName = await name.json();
    fetched = parsedName;
    console.log(parsedName);
  } catch (error) {
    console.log(error);
  }
  res.send(fetched);
});

app.listen(port, () => console.log(`Api starting on port ${port}!`));
