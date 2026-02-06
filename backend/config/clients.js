require('dotenv').config();
const twilio = require('twilio');

let twilioClient = null;

if (
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_AUTH_TOKEN
) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
}

let redisClient = null;

if (process.env.REDIS_URL && process.env.REDIS_URL.trim() !== '') {
  const redis = require('redis');

  redisClient = redis.createClient({
    url: process.env.REDIS_URL,
    socket: {
      reconnectStrategy: false,
    },
  });

  (async () => {
    try {
      await redisClient.connect();
    } catch (err) {
      redisClient = null;
    }
  })();
}

module.exports = { twilioClient, redisClient };
