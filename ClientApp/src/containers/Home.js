import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(1),
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div>
      <Typography className={classes.title} variant="h6">
        This is simple CRUD app
      </Typography>
      <Typography variant="subtitle1">
        Several pages are available to you: <b>Companies</b>, <b>Invoices</b>
      </Typography>
    </div>
  );
}
