import express from "express";
import { env } from "./lib/env.js";
import { initDB } from "./db/models/index.js";
import { userRouter } from "./routes/user.routes.js";
import { bankRouter } from "./routes/bank.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRouter);
app.use("/banks", bankRouter);

app.listen(env.port, async () => {
    console.log(`server running on port ${env.port}`);
    await initDB();
});

//added a new feature to the server.js file