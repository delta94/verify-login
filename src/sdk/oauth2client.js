"use strict";
const axios = require("axios");

const VERIFY_OAUTH2_AUTH_BASE_URL = "https://verify.veritone.com/oauth2/auth";
const VERIFY_OAUTH2_TOKEN_URL = "https://verify.veritone.com/oauth2/token";
const VERIFY_GET_INFO_URL = "https://verify.veritone.com/api/admin/user";
const VERIFY_OAUTH2_REVOKE_URL = "https://verify.veritone.com/oauth2/revoke";

function OAuth2Client(data) {
  this.option = data;
}

/**
 * Generates URL for consent page landing.
 * @param opts Options.
 * @return URL to consent page.
 */
OAuth2Client.prototype.generateAuthUrl = function (opts = {}) {
  opts.client_id = opts.client_id || this.option.client_id;
  opts.redirect_uri = opts.redirect_uri || this.option.redirect_uri;
  opts.state = opts.state || "iuahgdjasjkhdgjhsgadgsadjhajsh";
  opts.scope = "openid";
  opts.response_type = "code";
  opts.max_age = 0;

  const rootUrl = VERIFY_OAUTH2_AUTH_BASE_URL;
  return (
    rootUrl +
    `?client_id=${opts.client_id}&redirect_uri=${encodeURIComponent(
      opts.redirect_uri
    )}`
  );
};

/**
 * Gets the access token for the given code.
 * @param code The authorization code.
 * @param callback Optional callback fn.
 */
OAuth2Client.prototype.getToken = function (codeOrOptions, callback) {
  const options =
    typeof codeOrOptions === "string" ? { code: codeOrOptions } : codeOrOptions;
  if (callback) {
    this.getTokenAsync(options).then(
      (r) => callback(null, r.tokens, r.res),
      (e) => callback(e, null, e.response)
    );
  } else {
    return this.getTokenAsync(options);
  }
};

OAuth2Client.prototype.getTokenAsync = async function (options) {
  const url = VERIFY_OAUTH2_TOKEN_URL;
  options.redirect_uri = options.redirect_uri || this.option.redirect_uri;
  const values = {
    code: options.code,
    client_id: options.client_id || this.option.client_id,
    secret: this.option.secret,
    redirect_uri: options.redirect_uri
  };
  const query = [];
  query.push(`code=${values.code}`);
  query.push(`secret=${values.secret}`);
  query.push(`client_id=${values.client_id}`);
  query.push(`redirect_uri=${values.redirect_uri}`);

  const { data } = await axios({
    method: "GET",
    url: url + "?" + query.join("&"),
    headers: { "Content-Type": "application/json" }
  });

  return data;
};

OAuth2Client.prototype.getInfo = async function (token) {
  const url = VERIFY_GET_INFO_URL;

  const { data } = await axios({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  return data;
};

OAuth2Client.prototype.revokeToken = async function (token) {
  const url = VERIFY_OAUTH2_REVOKE_URL;

  const { data } = await axios({
    method: "GET",
    url,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  return data;
};

module.exports = { OAuth2Client };
