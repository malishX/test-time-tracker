import type { FC } from "react";
import { Suspense, lazy } from "react";
import type { RouteObject } from "react-router";
import SplashScreen from "components/SplashScreen";

const Loadable = (Component: FC) => (props: any) =>
  (
    <Suspense fallback={<SplashScreen />}>
      <Component {...props} />
    </Suspense>
  );

const MainPage = Loadable(lazy(() => import("pages/mainPage")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <MainPage />,
  },
];

export default routes;
