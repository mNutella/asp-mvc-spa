import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import routes from "./routes";
import ApiContext from "./contexts/apiContext";
import createAPI from "./services/api";

const api = createAPI();

export default function App() {
  return (
    <Router>
      <Route
        render={({ location }) => (
          <React.Fragment>
            <Layout location={location}>
              <ApiContext.Provider value={api}>
                <Switch>
                  {routes.map((route) => (
                    <Route
                      key={`${route.path}}`}
                      path={route.path}
                      exact={route.exact}
                      component={route.component}
                    />
                  ))}
                </Switch>
              </ApiContext.Provider>
            </Layout>
          </React.Fragment>
        )}
      />
    </Router>
  );
}
