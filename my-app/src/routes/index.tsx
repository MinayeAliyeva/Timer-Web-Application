import { useRoutes } from "react-router-dom";
import MainLayout from "../shared/layout/MainLayout";
import AlarmClock from "../pages/alarm";
import Chronometer from "../pages/chronometer";
import Counter from "../pages/counter";
import TimeZones from "../pages/timezone";
import { MyRouterObject } from "../modules";

export const routes: MyRouterObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TimeZones />,
        path: "/timezone",
      },
      {
        path: "/alarm",
        element: <AlarmClock />,
      },
      {
        path: "/chronometer",
        element: <Chronometer />,
      },
      {
        path: "/counter",
        element: <Counter />,
      },
    ],
  },
];

export const usehMap = (routes: MyRouterObject[]) => {
  return routes.map((route) => {
    return route;
  });
};

export const useMapRoutes = () => {
  return useRoutes(usehMap(routes));
};
