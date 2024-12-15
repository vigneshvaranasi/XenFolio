import type { RouteObject } from "react-router-dom";
import Layout from "../components/Layout";
import HomePage from "../pages/Home.page";
import FoliosPage from "../pages/Folios.page";
import CraftBenchPage from "../pages/CraftBench.page";
import FolioViewPage from "../pages/FolioView.page";
import MySpacePage from "../pages/MySpace.page";

const normalRoutes: RouteObject = {
    path: "",
    element:<Layout/>,
    children:[
        {
            path:"/",
            element:<HomePage/>
        },
        {
            path:"myspace",
            element:<MySpacePage/>
        },
        {
            path:"folios",
            element:<FoliosPage/>
        },
        {
            path:"craftbeanch",
            element:<CraftBenchPage/>
        },
        {
            path:"folioview",
            element:<FolioViewPage/>
        }
    ]

}
const routes: RouteObject[] = [normalRoutes];

export default routes