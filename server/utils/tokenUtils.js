const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function getJWTSecret() {
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not set");
  }
  return JWT_SECRET;
}

function getJWTRefreshSecret() {
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  if (!JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not set");
  }
  return JWT_REFRESH_SECRET;
}

function getAccessExpires() {
  const ACCESS_EXPIRES = process.env.ACCESS_EXPIRES || "10m";
  return ACCESS_EXPIRES;
}
function getRefreshExpires() {
  const REFRESH_EXPIRES = process.env.REFRESH_EXPIRES || "30d";
  return REFRESH_EXPIRES;
}

function getEncKey() {
  const ENC_KEY = Buffer.from(process.env.ENC_KEY_BASE64 || "", "base64");
  if (!ENC_KEY || ENC_KEY.length !== 32) {
    throw new Error("ENC_KEY_BASE64 must be 32 bytes base64");
  }
  return ENC_KEY;
}
const IV_LENGTH = 12;

function encrypt(text) {
  const ENC_KEY = getEncKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv("aes-256-gcm", ENC_KEY, iv);
  const ciphertext = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, ciphertext]).toString("base64");
}

function decrypt(enc) {
  const ENC_KEY = getEncKey();
  console.log("ENC_KEY",ENC_KEY)
  const data = Buffer.from(enc, "base64");
  console.log("data",data)
  const iv = data.slice(0, IV_LENGTH);
  console.log(iv)
  const tag = data.slice(IV_LENGTH, IV_LENGTH + 16);
  console.log(tag)
  const ciphertext = data.slice(IV_LENGTH + 16);
  const decipher = crypto.createDecipheriv("aes-256-gcm", ENC_KEY, iv);
  decipher.setAuthTag(tag);
  const result = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  console.log(result)
  return result.toString("utf8");
}

function signAccessToken(payload) {
  const JWT_SECRET = getJWTSecret();
  const ACCESS_EXPIRES = getAccessExpires();
  const signed = jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_EXPIRES });
  return encrypt(signed);
}

function verifyAccessToken(encryptedToken) {
  const JWT_SECRET = getJWTSecret();
  console.log("JWT_SECRET",JWT_SECRET)
  const signed = decrypt(encryptedToken);
  console.log("signed",signed)
  return jwt.verify(signed, JWT_SECRET);
}

// refresh token with jti
function signRefreshToken(payload /* { userId, jti } */) {
  const JWT_REFRESH_SECRET = getJWTRefreshSecret();
  const REFRESH_EXPIRES = getRefreshExpires();
  console.log("payload", payload);
  return jwt.sign(payload, JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES,
  });
}

function verifyRefreshToken(token) {
  const JWT_REFRESH_SECRET = getJWTRefreshSecret();
  return jwt.verify(token, JWT_REFRESH_SECRET);
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  encrypt,
  decrypt,
};
