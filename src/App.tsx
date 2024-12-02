import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MapPage from "./pages/MapPage.tsx";
import BoxPage from "./pages/BoxPage.tsx";
import {boxLoader} from "./components/ShirtGrid.tsx";
import PurchaseOKPage from "./pages/PurchaseOKPage.tsx";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<MapPage/>}/>
                <Route
                    path='/boxes/:id'
                    element={<BoxPage/>}
                    loader={boxLoader}
                />
                <Route path='/purchase' element={<PurchaseOKPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Route>
        )
    );

    return (
        <>
            <RouterProvider router={router}/>
        </>
    );
}

export default App
