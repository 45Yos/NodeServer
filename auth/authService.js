const verifyToken = require('../auth/Providers/jwt').verifyToken;
const handleError = require('../utils/errorHandler');
const config = require('config');

const tokenGenerator = config.get('TOKEN_GENERATOR') || 'jwt';

const auth = (req, res, next) => {
    if (tokenGenerator === 'jwt') {
        try {
            const tokenFromClient = req.header('x-auth-token');
            if (!tokenFromClient) {
                throw new Error('Authentication Error: Please login/Authenticate');
            }
            
            
            const userData = verifyToken(tokenFromClient);
            if (!userData) {
                throw new Error('Authentication Error: Unauthorized User');
            }

            req.user = userData;
            return next();
            
            } catch (err) {
                return handleError(res, 401, err.message);
            }

    }
    
    return handleError(res, 500, 'Use jwt!');
}



exports.auth = auth;