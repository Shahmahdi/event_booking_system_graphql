import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { EventPage } from "./pages/events/Index";
import { BookingsPage } from "./pages/bookings/Index";
import { Layout } from "./components/Layout";
import { LoginPage } from "./pages/login/Index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route 
          exact 
          path="/" 
          component={LoginPage}
        />
        <Route
          exact
          path="/events"
          render={() => <Layout component={EventPage} />}
        />
        <Route
          exact
          path="/bookings"
          render={() => <Layout component={BookingsPage} />}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
