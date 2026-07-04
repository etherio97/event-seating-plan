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
    no: 3,
    title: "Table 3",
    taken: 0,
  },
  {
    no: 1,
    title: "Table 1",
    taken: 0,
  },
  {
    no: 2,
    title: "Table 2",
    taken: 0,
  },
  {
    no: 4,
    title: "Table 4",
    taken: 0,
  },
  {
    no: 7,
    title: "Table 7",
    taken: 0,
  },
  {
    no: 5,
    title: "Table 5",
    taken: 0,
  },
  {
    no: 6,
    title: "Table 6",
    taken: 0,
  },
  {
    no: 8,
    title: "Table 8",
    taken: 0,
  },
  {
    no: 11,
    title: "Table 11",
    taken: 0,
  },
  {
    no: 9,
    title: "Table 9",
    taken: 0,
  },
  {
    no: 10,
    title: "Table 10",
    taken: 0,
  },
  {
    no: 12,
    title: "Table 12",
    taken: 0,
  },
  {
    no: 15,
    title: "Table 15",
    taken: 0,
  },
  {
    no: 13,
    title: "Table 13",
    taken: 0,
  },
  {
    no: 14,
    title: "Table 14",
    taken: 0,
  },
  {
    no: 16,
    title: "Table 16",
    taken: 0,
  },
  {
    no: 19,
    title: "Table 19",
    taken: 0,
  },
  {
    no: 17,
    title: "Table 17",
    taken: 0,
  },
  {
    no: 18,
    title: "Table 18",
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
