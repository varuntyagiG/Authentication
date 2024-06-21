var jwt = require("jsonwebtoken");
let { JWT_token } = require("../secrat_key/token");

function adminMiddlewares(req, res, next) {
  let token = req.headers.authorization;
  // words => bearer ajkfcjfjjvffvhv => ["bearer","fhbjixjwhxhcdccii"]
  // let jwtToken = token.split(" ")[1];
  let decodedValue = jwt.verify(token, JWT_token);
  console.log(decodedValue.username);
  if (decodedValue.username) {
    next();
  } else {
    res.status(500).json({
      msg: "not aothorised",
    });
  }
}

module.exports = adminMiddlewares;
