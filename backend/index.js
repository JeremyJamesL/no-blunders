const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;
const { Chess } = require("chess.js");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Mongoose
mongoose.connect("mongodb://localhost:27017/chess").then(() => {
  console.log("db connection established");
});

const gameSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Game must have a name"],
    trim: true,
  },
  gameURL: {
    type: String,
    required: [true, "Game must have a URL"],
    trim: true,
    unique: true,
  },
  side: {
    type: String,
    required: [true, "Game must have a name"],
  },
  moves: {
    type: [String],
    required: [true, "Game must have moves"],
  },
  pgn: {
    type: String,
    required: [true, "Game must have a pgn"],
  },
});

const Game = mongoose.model("games", gameSchema);

// Routes
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

app.post("/process-game", async (req, res) => {
  // Get basic game info
  const theGame = req.body.game;
  const isWhiteOrBlack =
    theGame.white.username === req.body.username ? "white" : "black";

  // Get fen steps
  const chess = new Chess();
  chess.loadPgn(theGame.pgn);
  const history = chess.history({ verbose: true });
  const moves = history.map((el) => {
    return el.before;
  });

  // Transformed object
  const transformedGame = {
    name: `${theGame.white.username} VS ${theGame.black.username} ${theGame.time_class} game`,
    gameURL: theGame.url,
    side: isWhiteOrBlack,
    moves,
    pgn: theGame.pgn,
  };

  // Add to MongoDB
  const newRecord = await Game.create(transformedGame);
  console.log(newRecord);
});

app.listen(port, () => {
  console.log("listening on" + " " + port);
});
