import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import NavItem from "./NavItem";

import "./NavMenu.css";

export default function NavMenu() {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <ul>
            <NavItem to="/">Home</NavItem>
            <NavItem to="/companies">Companies</NavItem>
            <NavItem to="/invoices">Invoices</NavItem>
          </ul>
        </Toolbar>
      </AppBar>
    </header>
  );
}
