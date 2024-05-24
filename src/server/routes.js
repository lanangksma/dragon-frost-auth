const { registerHandler, loginHandler } = require('../server/handler');

const routes = [
    {
        path: '/auth/register',
        method: 'POST',
        handler: registerHandler,
        options: {
            payload: {
                parse: true, // Parse JSON payloads
                allow: ['application/json'] // Allow only JSON payloads
            }
        }
    },
    {
        path: '/auth/login',
        method: 'POST',
        handler: loginHandler,
        options: {
            payload: {
                parse: true, // Parse JSON payloads
                allow: ['application/json'] // Allow only JSON payloads
            }
        }
    }
];

module.exports = routes;
