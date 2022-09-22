// https://fluentsite.z22.web.core.windows.net/quick-start
import { HashRouter as Router, Redirect, Route } from "react-router-dom";
import Privacy from "./Privacy";
import TermsOfUse from "./TermsOfUse";
import { Tab } from "./Tab";
import "./App.css";
import TabConfig from "./TabConfig";
import { useTeams } from "msteams-react-base-component";
import * as React from "react";
import { Provider, teamsV2Theme } from "@fluentui/react-northstar";
import { PresenceDataProvider } from "./PresenceDataProvider";

/**
 * The main app which handles the initialization and routing
 * of the app.
 */
export default function App() {
  const { theme } = useTeams({})[0];
  return (
    <Provider theme={theme || teamsV2Theme}>
      <PresenceDataProvider>
        <Router>
          <Route exact path="/">
            <Redirect to="/tab" />
          </Route>
          <>
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/termsofuse" component={TermsOfUse} />
            <Route exact path="/tab" component={Tab} />
            <Route exact path="/config" component={TabConfig} />
          </>
        </Router>
      </PresenceDataProvider>
    </Provider>
  );
}
