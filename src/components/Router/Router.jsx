import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import UpdateBenefit from "../UpdateBenefit/UpdateBenefit";
import LoadingPage from "../LoadingPage/LoadingPage";
import { useProfileId } from "../../hooks/";
import jwt from "jsonwebtoken";

const CreateBenefit = lazy(() => import("../CreateBenefit/CreateBenefit"));
const Benefits = lazy(() => import("../Benefits/Benefits"));
const Users = lazy(() => import("../Users/Users"));

const ProfileId = useProfileId(jwt);

const Router = () => (
  <Switch>
    <Route
      path="/create"
      render={() => (
        <Suspense fallback={<LoadingPage />}>
          <CreateBenefit />
        </Suspense>
      )}
    />
    <Route
      path="/"
      exact
      render={() => (
        <Suspense fallback={<LoadingPage />}>
          <Benefits />
        </Suspense>
      )}
    />

    <Route path="/update/:id" component={UpdateBenefit} />

    {(ProfileId === 1766 || ProfileId === 1189) && (
      <Route
        path="/users/"
        render={() => (
          <Suspense fallback={<LoadingPage />}>
            <Users />
          </Suspense>
        )}
      />
    )}
  </Switch>
);

export default Router;
