import { rateLimit } from 'express-rate-limit';
export const lowLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 9,
    standardHeaders: 'draft-6',
    legacyHeaders: false,
    message: 'Too many unsuccessful attempts, please try again later'
});
export const mediumLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 200,
    standardHeaders: 'draft-6',
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
export const highlimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 55,
    standardHeaders: 'draft-6',
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
//# sourceMappingURL=rateLimiter.js.map