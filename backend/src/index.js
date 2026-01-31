import express from "express";
import cors from "cors";

import laptopsRoute from "./routes/laptops.js";
import serversRoute from "./routes/servers.js";
import switchesRoute from "./routes/switches.js";
import firewallsRoute from "./routes/firewalls.js";
import accessPointsRoute from "./routes/accessPoints.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/laptops", laptopsRoute);
app.use("/api/servers", serversRoute);
app.use("/api/switches", switchesRoute);
app.use("/api/firewalls", firewallsRoute);
app.use("/api/access-points", accessPointsRoute);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
