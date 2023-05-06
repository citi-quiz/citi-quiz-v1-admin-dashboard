import React from "react";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import Products from "./pages/Products";
import Dashboard from "./pages/Dashboard";
import Manage from "./pages/Manage";
import User from "./pages/User";
import UserDetails from "./pages/screens/UserDetails";
import Control from "./pages/Control";
import Notification from "./pages/Notification";

export default function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/manage" exact element={<Manage />} />
          <Route path="/control" exact element={<Control />} />
          <Route path="/products" element={<Products />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/user" element={<User />} />
          <Route path="/user/details/:userId" element={<UserDetails />} />
          <Route path="/blogs" element={<Blogs />} />
        </Routes>
      </Router>
    </div>
  );
}
