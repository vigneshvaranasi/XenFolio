import { type RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home.page";
import FoliosPage from "../pages/Folios.page";
import CraftBenchPage from "../pages/CraftBench.page";
import FolioViewPage from "../pages/FolioView.page";
import MySpacePage from "../pages/MySpace.page";
import ProtectedRoute from "../components/ProtectedRoute";
import Callback from "../components/Callback";
import FolioLayout from "../components/FolioLayout";
import PreviewPage from "../pages/Preview.page";



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
            element: <FolioLayout/>,
            children: [
                {
                    path:"",
                    element: <FoliosPage/>
                },
                {
                    path: ":folioName",
                    element: <FolioViewPage/>
                }
            ]
        },
        // Protected Routes
        {
            path: "myspace",
            element: <ProtectedRoute element={<MySpacePage />} />
        },
        {
            path: "craftbench/:craftBenchName",
            element: <ProtectedRoute element={<CraftBenchPage />} />
        }
    ],
};

const callbackRoute: RouteObject = {
    path: "callback",
    element: <Callback />
}

const previewRoute: RouteObject = {
    path: "preview/:craftId",
    element: <PreviewPage />
}

const routes: RouteObject[] = [normalRoutes, previewRoute, callbackRoute];

export default routes;