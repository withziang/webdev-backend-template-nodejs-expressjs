import { rateLimit } from 'express-rate-limit';

class Auth{
    static reqRateLimiterPerSec = rateLimit({
        windowMs:1000, // define per second
        max:30,        // times
        message:'request denied',
        statusCode:400,
        standardHeaders:true,
        legacyHeaders:false
    });


    static reqRateLimiterPerMinute = rateLimit({
        windowMs:60000,
        max:1000,
        message:'request denied',
        statusCode:400,
        standardHeaders:true,
        legacyHeaders:false
    });
}


export default Auth;