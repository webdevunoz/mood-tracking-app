import type { RouteObject } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const routes: RouteObject[] = [
  { path: "/", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
];

export default routes;
