const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;
const { Chess } = require("chess.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/get-eval", async (req, res) => {
  const response = await fetch("https://chess-api.com/v1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fen: "8/1P1R4/n1r2B2/3Pp3/1k4P1/6K1/Bppr1P2/2q5 w - - 0 1",
    }),
  });
  const data = await response.json();
  console.log(data);
  res.status(200).send(data);
});

app.post("/get-fens", async (req, res) => {
  const chess = new Chess();
  chess.loadPgn(req.body.pgn);
  const history = chess.history({ verbose: true });
  console.log(history);
});

app.listen(port, () => {
  console.log("listening on" + " " + port);
});
