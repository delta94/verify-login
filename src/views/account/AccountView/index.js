import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();

  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {
    const verifyProfile = localStorage.getItem("profile");
    try {
      if (verifyProfile) {
        const profileJson = JSON.parse(verifyProfile);
        setProfile(profileJson);
      }
    } catch (error) {
      
    }
  }, [])

  return (
    <Page
      className={classes.root}
      title="Account"
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <Profile profile={profile}/>
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <ProfileDetails profile={profile}/>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Account;
