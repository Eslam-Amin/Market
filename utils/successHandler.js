// successHandler.js
module.exports = (req, res, next) => {
    res.success = ({ statusCode, data, page = 1, result = 1 }) => {
        res.status(statusCode).json({
            status: 'success',
            page,
            result,
            data,
        });
    };
    next();
};
