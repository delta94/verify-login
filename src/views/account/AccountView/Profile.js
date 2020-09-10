import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

const user = {
  avatar: "/static/images/avatars/avatar_6.png",
  city: "Los Angeles",
  country: "USA",
  jobTitle: "Senior Developeeeer",
  name: "Katarina Smith",
  timezone: "GTM-7",
};

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100,
  },
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const [userProfile, setUserProfile] = React.useState({});

  React.useEffect(() => {
    const profile = rest.profile;
    if (profile) {
      setUserProfile({
        name: `${profile.firstName} ${profile.lastName}`,
        location: profile.location,
        avatar: profile.avatar,
        LastLoggedIn: moment(profile.LastLoggedIn).format("MMMM Do YYYY, h:mm:ss a")
      })
    }
  }, [rest.profile]);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardContent>
        <Box alignItems="center" display="flex" flexDirection="column">
          <Avatar className={classes.avatar} src={userProfile.avatar} />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {userProfile.name}
          </Typography>
          <Typography color="textSecondary" variant="body1">
            {userProfile.location}
          </Typography>
          <Typography
            className={classes.dateText}
            color="textSecondary"
            variant="body1"
          >
            {`${userProfile.LastLoggedIn}`}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" fullWidth variant="text">
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
