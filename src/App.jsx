import { createBrowserRouter, RouterProvider } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Pastes from "./components/Pastes";
import ViewPaste from "./components/viewPaste";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Navbar />
        <Home />
        {/* <Footer /> */}
      </div>
    ),
  },
  {
    path: "/pastes",
    element: (
      <div>
        <Navbar />
        <Pastes />
        {/* <Footer /> */}
      </div>
    ),
  },
  {
    path: "/pastes/:id",
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
    children: [
      {
        path: "*",
        element: (
          <div>
            <NotFound />
          </div>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div>
        <NotFound />
      </div>
    ),
  },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer  position="top-center"/>
    </div>
  );
};

export default App;
