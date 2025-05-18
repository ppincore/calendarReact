import type { ReactNode } from "react";
import Login from "../pages/LoginPage/Login";
import Event from "../pages/EventPage/Event";
import { NotFound } from "../pages/notFount/notFound";
export interface IRoute {
  path: string;
  component: ReactNode;
}

export enum RouteNames {
  LOGIN = "/login",
  EVENT = "/",
  NOT_FOUND = "*",
}

export const staticRoute: IRoute = {
  path: RouteNames.NOT_FOUND,
  component: <NotFound />,
};

export const publicRoutes: IRoute[] = [
  { path: RouteNames.LOGIN, component: <Login /> },
];
export const privateRoutes: IRoute[] = [
  { path: RouteNames.EVENT, component: <Event /> },
];
