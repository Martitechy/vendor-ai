const jwt = require("jsonwebtoken");
const { config } = require("../_config/dotenvconfig"); // Adjust if needed

const generateVendorToken = (vendorId, role = "vendor") => {
  return jwt.sign({ id: vendorId, role }, config.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, config.JWT_SECRET);
};
module.exports = { generateVendorToken, verifyToken };
