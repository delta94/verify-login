import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import { auth } from "src/sdk";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const OAuth2Client = auth.OAuth2Client;

const verifyOAuth = new OAuth2Client({
  client_id: "5e765925-d7c3-48ce-9dcc-f402b48ac7b5",
  redirect_uri: "http://localhost:3000/oauth",
  secret: "tnEymo-8vaMPsUGHgS1qd9zr.J",
});

const DashboardLayout = () => {
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  const onlogOut = (e) => {
    console.log("logouted");
    verifyOAuth.revokeToken(localStorage.getItem("verifyToken"))
    localStorage.clear("verifyToken");
    localStorage.clear("profile")
    navigate("/")
  }

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} onlogOut={onlogOut} />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
