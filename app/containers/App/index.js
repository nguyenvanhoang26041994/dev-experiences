/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import DemoBoxWithReact from 'components/DemoBoxWithReact';
import DemoBoxWithJQuery from 'components/DemoBoxWithJQuery';
import DemoBoxWithJQueryFix from 'components/DemoBoxWithJQueryFix';
import DemoBoxWithJQueryFix2 from 'components/DemoBoxWithJQueryFix2';
import DemoBoxWithJQueryFix3 from 'components/DemoBoxWithJQueryFix3';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

export default function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/why-should-not-use-jquery-with-react/react"
          component={DemoBoxWithReact}
        />
        <Route
          exact
          path="/why-should-not-use-jquery-with-react/react-jquery"
          component={DemoBoxWithJQuery}
        />
        <Route
          exact
          path="/why-should-not-use-jquery-with-react/react-jquery-fix"
          component={DemoBoxWithJQueryFix}
        />
        <Route
          exact
          path="/why-should-not-use-jquery-with-react/react-jquery-fix-2"
          component={DemoBoxWithJQueryFix2}
        />
        <Route
          exact
          path="/why-should-not-use-jquery-with-react/react-jquery-fix-3"
          component={DemoBoxWithJQueryFix3}
        />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
