import type { ComponentType } from "react";
import Login from "../pages/LoginPage/Login";
import Event from "../pages/EventPage/Event";
import { NotFound } from "../pages/notFount/notFount";
export interface IRoute {
  path: string;
  component: ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  LOGIN = "/login",
  EVENT = "/",
}

export const publicRoutes: IRoute[] = [
  { path: "/login", exact: true, component: Login },
  { path: "*", exact: true, component: NotFound },
];
export const privateRoutes: IRoute[] = [
  { path: "/", exact: true, component: Event },
];
