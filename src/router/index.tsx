import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home.page";
import FoliosPage from "../pages/Folios.page";
import CraftBenchPage from "../pages/CraftBench.page";
import FolioViewPage from "../pages/FolioView.page";
import MySpacePage from "../pages/MySpace.page";
import ProtectedRoute from "../components/ProtectedRoute";
import Callback from "../components/Callback";
const normalRoutes: RouteObject = {
    path: "",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <HomePage />
        },
        {
            path: "folios",
            element: <FoliosPage />,
            children: [
                {
                    path: "folioview",
                    element: <FolioViewPage />
                }
            ]
        },
        
        // Protected Routes
        {
            path: "myspace",
            element: <ProtectedRoute element={<MySpacePage />} />
        },
        {
            path: "craftbench",
            element: <ProtectedRoute element={<CraftBenchPage />} />
        }
    ]
};

const callbackRoute: RouteObject = {
    path: "callback",
    element: <Callback />
}

const routes: RouteObject[] = [normalRoutes, callbackRoute];

export default routes;