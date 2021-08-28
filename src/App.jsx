import React from "react";
import { Layout } from "components/layout";
import { menu } from "config/menu";

import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { Login } from "containers/login";
import { routers } from "config/routers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
    },
  },
});

const Wrapper = (props) => {
  const { children } = props;
  return (
    <Router>
      <Switch>
        <Route path="/page">{children}</Route>
        <Route component={Login} path={routers.LOGIN} />
        <Redirect to={routers.ARTICLE} />
      </Switch>
    </Router>
  );
};

const App = () => {
  return (
    <Wrapper>
      <QueryClientProvider client={queryClient}>
        <Switch>
          {menu.map(({ title, component, path }) => (
            <Route key={path} component={component} path={path} />
          ))}
        </Switch>
        {/* <Layout header="LIULI">
          <Switch>
            {menu.map(({ title, component, path }) => (
              <Route key={path} component={component} path={path} />
            ))}
          </Switch>
        </Layout> */}
      </QueryClientProvider>
    </Wrapper>
  );
};

export default App;
