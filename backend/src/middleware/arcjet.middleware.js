import {aj} from '../config/arcjet.js';

//Arcjet middleware  for rate limiting and bot detection AND SECURITY

export const arcjetMiddleware = async (req, res, next) => {
    try {
      const decision = await aj.protect(req, {
        requested:1, //each request consume 1 token
      });
// handle denied requests
        if (decision.isDenied()) {
            if(desision.reason.isRateLimit()){
                return res.status(429).json({message: "Too many requests. Please try again later."});
            }else if(decision.reason.isBot()){
                return res.status(403).json({message: "Access denied. Bot traffic is not allowed."});
            }else {
return res.status(403).json({message: "Access denied."});
            }
        }

        //check for spoofed bots
       if(decision.result.some((result)=> result.reason.isBot() && result.reason.isSpoofed())){
        return res.status(403).json({message: "Access denied. Spoofed bot traffic is not allowed."});
       }
         next();
    } catch (error) {
        console.error("Arcjet middleware error:", error);
        //allow request if middleware fails
        next();
    }
};