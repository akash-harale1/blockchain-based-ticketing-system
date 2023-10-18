const express = require("express");
const cors = require("cors");
const EventOragnizerRouter=require('./routers/EventOrganizerRouter');
const Eventrouter=require('./routers/EventRouter');
const app = express();
require("./db/conn");


app.use(express.json());
app.use(cors());
app.use(EventOragnizerRouter);
app.use(Eventrouter);

app.listen(5000, () => {
  console.log("server stated successfully");
});
