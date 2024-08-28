import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AlarmClock from "../pages/AlarmClock";
import Chronometer from "../pages/Chronometer";
import Counter from "../pages/Counter";
import TimeZones from "../pages/TimeZones";
import { MyRouterObject } from "../types";

export const routes: MyRouterObject[] = [
  {
    path: "",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TimeZones />,
      },
      {
        path: "/alarm",
        element: <AlarmClock />,
      },
      {
        path: "chronometer",
        element: <Chronometer />,
      },
      {
        path: "ounter",
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
