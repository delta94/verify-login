const express = require("express");

const config = require("../config.json");
const { auth } = require("../../index");

const verify = new auth.OAuth2Client({
  client_id: config.clientId,
  secret: config.clientSecret,
  redirect_uri: config.redirectUri
});

const router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "My Website" });
});

router.get("/login", function (req, res) {
  const url = verify.generateAuthUrl();
  res.redirect(url);
});

router.get("/verify-callback", async function (req, res, next) {
  const code = req.query.code;
  //should verify state
  try {
    const response = await verify.getToken(code);
    const user = await verify.getInfo(response.verify_token);
    res.render("dashboard", { title: "User dashboard" , user});
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
