import arcjet, { shield, tokenBucket, detectBot } from 'arcjet';
import { ENV } from './env.js';

//INITIALIZE ARCJET WITH SECURE SETTINGS
export const aj = arcjet({
  key: ENV.ARCJET_API_KEY,
  // log already present in your runtime; keep it (required by arcjet)
  log: console,
  // add minimal required client so arcjet can make HTTP calls (Node 18+ has global fetch)
  client: { fetch: globalThis.fetch },

  characteristics: ["ip.src"],
  rules: [
    //shield protects your app from common attacks like sql, injections, xxs, csrf attacks
    shield({ mode: "LIVE" }),
    //bot detection blocks all bots except search engine
    detectBot({
        mode: "LIVE",
        allow: [
            "CATEGORY:SEARCH_ENGINE",
            //Allow legitimate search engine bots 
            // see full list  at https://arcjet.com/bot-list
        ],
    }),
    //rate limiting with token buket algorithm
    tokenBucket({
        mode: "LIVE",
        refillRate: 10,  //token added as per interval
        interval: 10,  //interval in seconds
        capacity: 15,  //maximum token capacity in bucket
    })

  ]
});

export default aj;