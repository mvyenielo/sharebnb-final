"use strict";

const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config');

/** creates token from user data.
 *
 * JWT = { username }
 */

function createToken(user) {
  console.log("user in create token", user);
  let payload = {
    username: user.username,
  };

  return jwt.sign(payload, `${SECRET_KEY}`);
}

module.exports = { createToken };