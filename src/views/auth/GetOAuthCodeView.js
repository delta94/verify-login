import React from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Page from "src/components/Page";
import { auth } from "src/sdk";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: "100%",
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
  },
}));

const OAuth2Client = auth.OAuth2Client;

const verifyOAuth = new OAuth2Client({
  client_id: "5e765925-d7c3-48ce-9dcc-f402b48ac7b5",
  redirect_uri: "http://localhost:3000/oauth",
  secret: "tnEymo-8vaMPsUGHgS1qd9zr.J",
});

async function doAuth(navigate) {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  let code = params.get("code");
  const accessToken = await verifyOAuth.getTokenAsync({
    code,
  });
  console.log("GetCodeView -> accessToken", accessToken);
  const userInfo = await verifyOAuth.getInfo(accessToken.verify_token);
  if (userInfo) {
    localStorage.setItem("profile", JSON.stringify(userInfo));
    localStorage.setItem("verifyToken", accessToken.verify_token);
  }
  navigate("/app/account");
}

const GetCodeView = (props) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    doAuth(navigate);
  }, []);
  const classes = useStyles();

  return <div>Redirecting...</div>;
};

export default GetCodeView;
