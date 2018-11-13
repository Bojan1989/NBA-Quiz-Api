
module.exports = (req, res, next) => {
    try {
        if (req.headers.role == "admin") {
          next();
        }else {
          return res.status(401).json({
              message: 'Auth failed'
          });
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
};
