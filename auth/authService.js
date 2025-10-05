const verifyToken = require('../auth/Providers/jwt').verifyToken;
const { JsonWebTokenError } = require('jsonwebtoken');
const handleError = require('../utils/errorHandler');
const config = require('config');
const jwt = require('jsonwebtoken');
const Card = require('../cards/models/mongodb/Card');
const {findOne} = require('../cards/cardsDataAccessService');

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



const authIsB = (req, res, next) => {
    if (tokenGenerator === 'jwt') {
        try {
            const tokenFromClient = req.header('x-auth-token');
           if (!tokenFromClient) {
                throw new Error('Authentication Error: Please login/Authenticate');
            }
            const user = jwt.decode(tokenFromClient);
            if (!user.isBusiness) {
                throw new Error('Authentication Error: Unauthorized User - Business User Only');
            }
            

            return next();
            
            } catch (err) {
                return handleError(res, 401, err.message);
            }

    }
    
    return handleError(res, 500, 'Use jwt!');
}   

         


exports.auth = auth;
exports.authIsB = authIsB;