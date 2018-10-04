require('dotenv').config();

const imposter = {
    user_id: 1,
    username: 'amy'
}

module.exports = {
    bypassAuthInDevelopment: (req, res, next) => {
        if(!req.session.user && process.env.NODE_ENV === 'development'){
            req.session.user = imposter
        }
        next()
    }
}