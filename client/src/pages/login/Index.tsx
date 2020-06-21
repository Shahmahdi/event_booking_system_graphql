import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import {
  Typography,
  TextField,
  Container,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyle = makeStyles(() => ({
  rowWrapper: {
    marginBottom: "0.6rem",
  },
}));

export const LoginPage = withRouter((props: RouteComponentProps) => {
  const classes = useStyle();

  return (
    <Container className="h-screen">
      <Grid item xs={12} className="flex h-full items-center justify-center">
        <form>
          <Typography variant="h4" gutterBottom className="text-center">
            Login
          </Typography>
          <Grid container xs={12}>
            <Grid item xs={12} className={classes.rowWrapper}>
              <TextField
                required
                id="email"
                label="Email"
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} className={classes.rowWrapper}>
              <TextField
                required
                id="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth={true}
              />
            </Grid>
            <Grid item xs={12} className={classes.rowWrapper}>
              <Button
                variant="contained"
                color="primary"
                fullWidth={true}
                onClick={() => props.history.push("/events")}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Container>
  );
});
