import { rateLimit } from 'express-rate-limit'

export const lowLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 5,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
    message: 'Too many unsuccessful attempts, please try again later'
})

export const mediumLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    limit: 150,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

export const highlimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 50,
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})