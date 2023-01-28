import { App } from "@tinyhttp/app";
import { json } from "milliparsec";
import Redis from "ioredis";

const app = new App();
const redis = new Redis({
  port: 6379,
  host: "redis",
  username: "",
  password: "",
  db: 0,
});

app.use(json());

app.post("/", (req, res) => {
  const  body  = req.body || {};
  const temp = Math.round(Math.random() * 1) === 1? "1": "2";
  redis.publish(`send-user-data${temp}`, JSON.stringify({ ...body }));
  return res.send(body);
});

app.listen(3000);