import type { RouteObject } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import OnboardingPage from "./pages/OnboardingPage";
import HomePage from "./pages/HomePage/HomePage";

const routes: RouteObject[] = [
  { path: "/", element: <SignupPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/onboarding", element: <OnboardingPage /> },
  { path: "/home", element: <HomePage /> },
];

export default routes;
