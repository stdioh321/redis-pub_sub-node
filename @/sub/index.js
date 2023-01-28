import Redis from "ioredis";

const redis = new Redis({
  port: 6379,
  host: "redis",
  username: "",
  password: "",
  db: 0,
});

const main = () => {
  redis.subscribe("send-user-data", (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to ${count} channels.`);
  });
  redis.subscribe("send-user-data2", (err, count) => {
    if (err) console.error(err.message);
    console.log(`Subscribed to ${count} channels.`);
  });

  redis.on("message", (channel, message) => {
    console.log(`Received message from ${channel} channel.`);
    console.log(JSON.parse(message));
  });
};

main();