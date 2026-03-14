const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Додаємо підтримку .wasm (як робили раніше)
config.resolver.assetExts.push('wasm');

// ДОДАЄМО ЦЕЙ БЛОК: заголовки для SharedArrayBuffer
config.server = {
    ...config.server,
    enhanceMiddleware: (middleware) => {
        return (req, res, next) => {
            res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
            res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
            middleware(req, res, next);
        };
    },
};

module.exports = config;
