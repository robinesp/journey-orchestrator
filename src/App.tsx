import "./App.css";
import MissionCatalogue from "./components/MissionCatalogue";
import MissionView from "./components/MissionView";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MissionCatalogue />,
  },
  {
    path: "/mission",
    element: <MissionView />,
  },
  {
    path: "/mission/:id",
    element: <MissionView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
