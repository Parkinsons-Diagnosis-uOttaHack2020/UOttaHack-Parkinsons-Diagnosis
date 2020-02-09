const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("cross-fetch");
const cors = require("cors");

const app = express();
const port = 8000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

app.post("/send-image", async (req, res) => {
  const data = req.body;
  // console.log(data);
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
  } catch (error) {
    console.log(error);
  }
  console.log(fetched);
  console.log(req.body);
  res.json(fetched);

});

app.listen(port, () => console.log(`Api starting on port ${port}!`));
