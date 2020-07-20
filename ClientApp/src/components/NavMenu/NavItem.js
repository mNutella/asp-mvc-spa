import React from "react";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

import "./NavItem.css";

export default function NavItem({ to, children }) {
  return (
    <li>
      <Link to={to}>
        <Typography variant="h6">{children}</Typography>
      </Link>
    </li>
  );
}
