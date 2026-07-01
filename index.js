const PORT = 3000;

const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

app.use(express.static("dist"));

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const _memData = [
  {
    no: 1,
    title: "Organizer",
    taken: 0,
  },
  {
    no: 2,
    title: "VIP",
    taken: 0,
  },
  {
    no: 3,
    title: "ဘဘကြီး",
    taken: 0,
  },
  {
    no: 4,
    title: "ဘဘကြီး",
    taken: 0,
  },
  {
    no: 5,
    title: "Korean",
    taken: 0,
  },
  {
    no: 6,
    title: "Korean",
    taken: 0,
  },
  {
    no: 7,
    title: "Relative",
    taken: 0,
  },
  {
    no: 8,
    title: "ဘဘကြီး",
    taken: 0,
  },
  {
    no: 9,
    title: "Korean",
    taken: 0,
  },
  {
    no: 10,
    title: "Guest",
    taken: 0,
  },
  {
    no: 11,
    title: "Guest",
    taken: 0,
  },
  {
    no: 12,
    title: "Relative",
    taken: 0,
  },
  {},
  {
    no: 13,
    title: "Reserved",
    taken: 0,
  },
];

io.on("connection", (socket) => {
  socket.emit("initialData", _memData);

  socket.on("updateTable", (data) => {
    const { no, taken } = data;
    const tableIndex = _memData.findIndex((table) => table.no === no);
    if (tableIndex !== -1) {
      _memData[tableIndex].taken = taken;
      io.emit("tableUpdated", _memData);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
