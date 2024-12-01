import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import BoxPage from "./pages/BoxPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import MapPage from "./pages/MapPage.tsx";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path='/' element={<MainLayout/>}>
                <Route index element={<MapPage/>}/>
                <Route path='/boxes' element={<BoxPage/>}/>
                {/*<Route
                    path='/boxes/:id'
                    element={<JobPage deleteJob={deleteJob}/>}
                    loader={jobLoader}
                />*/}
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
