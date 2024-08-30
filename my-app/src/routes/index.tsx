import { useRoutes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AlarmClock from "../pages/AlarmClock";
import Chronometer from "../pages/Chronometer";
import Counter from "../pages/Counter";
import TimeZones from "../pages/TimeZones";
import { MyRouterObject } from "../modules";
import AlarmTest from "../test/alarm";

export const routes: MyRouterObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <TimeZones />,
        path:"/timezone"
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
      {
        path:"/test",
        element:<AlarmTest/>
      }
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
