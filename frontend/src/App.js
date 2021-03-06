import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import EventPage from "./components/EventPage";
import UserPage from "./components/UserPage";
import CreateEvent from "./components/CreateEvent";
import EditEvent from "./components/EditEvent";

import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/events/:id'>
            <EventPage />
          </Route>
          <Route path='/users/:id'>
            <UserPage />
          </Route>
          <Route path='/create-event'>
            <CreateEvent />
          </Route>
          <Route path='/edit-event/:eventId'>
            <EditEvent />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
