import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import NavMenu from "../components/NavMenu";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    "justify-content": "center",
  },
}));

export default function Layout({ location, children }) {
  const classes = useStyles();
  return (
    <div>
      <NavMenu location={location} />
      <Container className={classes.container}>{children}</Container>
    </div>
  );
}
