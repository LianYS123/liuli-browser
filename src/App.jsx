import React from "react";
import { Layout } from "components/Layout";
import { SideBar } from "components/Layout/SideBar";
import { menu } from "config/menu";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login } from "containers/login";
import { routers } from "config/routers";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/page">
          <Layout sideBar={<SideBar menu={menu} />}>
            <Switch>
              {menu.map(({ title, component, path }) => (
                <Route key={path} component={component} path={path} />
              ))}
            </Switch>
          </Layout>
        </Route>
        <Route component={Login} path={routers.LOGIN} />
        <Redirect to={routers.ARTICLE} />
      </Switch>
    </Router>
  );
};

export default App;
