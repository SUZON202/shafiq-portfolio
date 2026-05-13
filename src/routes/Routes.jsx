import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import Contact from "../pages/Contact";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "./PrivateRoute"; 
import AdminRoute from "./AdminRoute"; 

// ড্যাশবোর্ডের পেজগুলো
import Users from "../pages/Users"; 
import Orders from "../pages/Orders";
import Analytics from "../pages/Analytics";
import Notification from "../pages/Notification";
import Settings from "../pages/Settings";
import Content from "../pages/Content"; 
import Overview from "../pages/Overview"; 
import AddProject from "../pages/AddProject"; 
import ManageProjects from "../pages/ManageProjects"; // 🔴 নতুন পেজটি ইম্পোর্ট করা হলো

const ErrorPage = () => (
  <div style={{ textAlign: "center", padding: "100px 20px", color: "#fff", background: "#0b0b12", minHeight: "100vh" }}>
    <h2 style={{ fontSize: "40px", marginBottom: "10px" }}>Oops! 404 Not Found 😢</h2>
    <p style={{ color: "rgba(255,255,255,0.5)" }}>আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।</p>
    <a href="/" style={{ color: "#7c3aed", marginTop: "20px", display: "inline-block", textDecoration: "none" }}>Back to Home</a>
  </div>
);

const router = createBrowserRouter([
  // মেইন পাবলিক রাউটস
  {
    path: "/",
    element: <Root />, 
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/contact", element: <Contact /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
    ],
  },
  
  // ড্যাশবোর্ড রাউটস
  {
    path: "/dashboard",
    element: <PrivateRoute><Dashboard /></PrivateRoute>, 
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Overview />,
      },
      {
        path: "users", 
        element: <AdminRoute><Users /></AdminRoute>,
      },
      {
        path: "add-project",
        element: <AdminRoute><AddProject /></AdminRoute>,
      },
      // 🔴 Manage Projects এর রাউট যোগ করা হলো
      {
        path: "manage-projects",
        element: <AdminRoute><ManageProjects /></AdminRoute>,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "analytics",
        element: <Analytics />,
      },
      {
        path: "content",
        element: <Content />,
      },
      {
        path: "notifications",
        element: <Notification />,
      },
      {
        path: "settings",
        element: <Settings />,
      }
    ]
  }
]);

export default router;