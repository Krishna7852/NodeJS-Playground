const redis = require("redis");
/**
 * Q3) Write two scripts in Nodejs which run in parallel (as in each script in a different terminal). 
 * The first script needs to generate a random number and push it to redis at random time-intervals, 
 * the second script needs to get this number from redis as soon as the first script pushes it and print it.
 * (e.g. one script says 'sent 2332' the other says 'received 2332').
 * 
 * Description: Redis Queue Publisher.
 */
let redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
});

const REDIS_USER_DATA_INDEX = 2;

redisClient.select(REDIS_USER_DATA_INDEX);
let isRedisConnected = false;
redisClient.on("error", (err) => {
   console.log("error", err)
});
redisClient.on("connect", (err) => {
    console.log("connect");
});
redisClient.on("ready", (err) => {
    isRedisConnected = true;
    console.log("ready");
});

const channelName = 'publistQueue';

function genrateRandomNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}
function pushToRedis() {   
    const randomNumber = genrateRandomNumber();
    if(isRedisConnected) {
        redisClient.rpush(['testKey', randomNumber], function (err, res) {
            if(err) {
                console.error(err);
            } else {
                redisClient.publish(channelName, 'sent ' + randomNumber);
                console.log("sent " +  randomNumber);
            }
        });
    }
}

setInterval(() => {
    pushToRedis()
}, 5000);