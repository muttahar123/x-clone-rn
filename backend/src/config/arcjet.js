import arcjet from 'arcjet';

const arcjetConfig = arcjet({
  apiKey: process.env.ARCJET_API_KEY,
  apiSecret: process.env.ARCJET_API_SECRET,
  cloudName: process.env.ARCJET_CLOUD_NAME,
});

export default arcjetConfig;