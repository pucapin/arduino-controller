const express = require("express");
const cors = require("cors");
const path = require("path");
const { createServer } = require("http");
const { SerialPort, ReadlineParser } = require("serialport");
const { Server } = require("socket.io");

// --------------- INITIAL CONFIG ---------------------

const app = express(); // Creates HTTP server
app.use(express.json()); // utility to process JSON in requests
app.use(cors()); // utility to allow clients to make requests from other hosts or ips
const httpServer = createServer(app); // Explicity creates an HTTP server from the Express app
app.use("/duino", express.static(path.join(__dirname, "../client"))); // Serves static files from the client directory

// --------------- SOCKET CONFIG---------------------

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*", // Allow requests from any origin
  },
}); // Creates a WebSocket server, using the same HTTP server as the Express app and listening on the /real-time path

// --------------- SERIAL PORT CONFIG---------------------

SerialPort.list().then((ports) => console.log("ports", ports)); // this is for list all available devices connected
// create a port to listen and write
const port = new SerialPort({
  path: "/dev/cu.usbmodem141011",
  baudRate: 9600,
});

// Create a parser
const parser = new ReadlineParser({ delimiter: "\r\n" }); // apply the parser to our port
port.pipe(parser);

// --------------- SERIAL LISTENERS ---------------------

parser.on("data", (data) => {
  const dataPot = JSON.parse(data);
  console.log("Data flow:", dataPot); // get data from sensor
  io.emit("porValue", dataPot); // I can emit in realtime to my frontend part the value
});

port.on("error", (err) => {
  console.log("Error:", err.message); // this is for get all buffer data to y app
});

// --------------- API ENDPOINTS ---------------------

app.post("/red", (request, response) => {
  port.write("RED\n", (err) => {
    // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

app.post("/yellow", (request, response) => {
  port.write("YELLOW\n", (err) => {
    // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

app.post("/green", (request, response) => {
  port.write("GREEN\n", (err) => {
    // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

app.post("/party", (request, response) => {
  port.write("PARTY\n", (err) => {
    // send a message to arduino
    if (err) {
      console.log("Error on write", err.message);
    }
    return true;
  });

  response.status(200).send("ok");
});

// ENVIAR NUMERO PARA EL BLINKER

app.post("/number", (req, res) => {
  const num = req.body.value; // el número viene desde el cliente

  if (num === undefined) {
    return res.status(400).send("No number provided");
  }

  port.write(`NUM:${String(num)}\n`, (err) => {
    if (err) {
      console.log("Error on write", err.message);
      return res.status(500).send("error");
    }

    res.status(200).send("ok");
  });
});

// --------------- SOCKET LISTENERS ---------------------

io.on("connection", (socket) => {
  console.log("a user connected"); // This will be printed every time a client connects to the
  socket.on("turn-on", (message) => {
    port.write("ON\n", (err) => {
      // send a message to arduino
      if (err) {
        console.log("Error on write", err.message);
      }
      return true;
    });
  });
  socket.on("turn-off", (message) => {
    port.write("OFF\n", (err) => {
      // send a message to arduino
      if (err) {
        console.log("Error on write", err.message);
      }
      return true;
    });
  });
});

// --------------- START SERVER ---------------------

httpServer.listen(5050, () => {
  // Starts the server on port 5050
  console.log(`Server is running on http://localhost:${5050}`);
});