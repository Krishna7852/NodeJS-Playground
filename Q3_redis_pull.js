/**
 * Q3) Write two scripts in Nodejs which run in parallel (as in each script in a different terminal). 
 * The first script needs to generate a random number and push it to redis at random time-intervals, 
 * the second script needs to get this number from redis as soon as the first script pushes it and print it.
 * (e.g. one script says 'sent 2332' the other says 'received 2332').
 * 
 * Description: Redis Queue subscriber.
 */
const redis = require("redis");
let redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
});

let isRedisConnected = false;
redisClient.on("error", (err) => {
   console.log("error", err)
});
redisClient.on("connect", (err) => {
    console.log("Redis connect");
});
redisClient.on("ready", (err) => {
    isRedisConnected = true;
    console.log("ready");
});

const channelName = 'publistQueue';

redisClient.subscribe(channelName);
redisClient.on("message", (channel, message) => {
    console.log('Recieved from ' + channel + ' with message ' + message);
});

setInterval(() => {
    console.log('Redis listining');
}, 5000);
