const express = require("express");
const cors = require("cors");
require("./db/conn");
const EventOragnizerRouter=require('./routers/EventOrganizerRouter');
const Eventrouter=require('./routers/EventRouter');
const app = express();



app.use(express.json());
app.use(cors());

app.use(Eventrouter);
app.use(EventOragnizerRouter);

app.listen(5000, () => {
  console.log("server stated successfully");
});
