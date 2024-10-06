import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Client Routing/HomePage";
import Login from "./Login & Register/Login";
import Register from "./Login & Register/Register";
import ProfilePage from "./Client Routing/ProfilePage";
import SwitchRole from "./Pages/SwitchRole";
import ProductDetailPage from "./Client Routing/ProductDetailPage";
import ServicesPage from "./Client Routing/ServicesPage";
import OrderPage from "./Client Routing/OrderPage";
import AdminHomePage from "./Admin Routing/AdminHomePage";
import AdminOrderPage from "./Admin Routing/AdminOrderPage";
import AddProductPage from "./Admin Routing/AddProductPage";
import EditProductPage from "./Admin Routing/EditProductPage";
import PrivateRoute from "./Util/PrivateRoute"; // Ensure this path is correct

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes - wrapped individually */}
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        <Route path="/switchrole" element={<PrivateRoute><SwitchRole /></PrivateRoute>} />
        <Route path="/productdetail/:id" element={<PrivateRoute><ProductDetailPage /></PrivateRoute>} />
        <Route path="/orders" element={<PrivateRoute><OrderPage /></PrivateRoute>} />
        <Route path="/services" element={<PrivateRoute><ServicesPage /></PrivateRoute>} />

        {/* Admin protected routes */}
        <Route path="/admin_home" element={<PrivateRoute><AdminHomePage /></PrivateRoute>} />
        <Route path="/admin_order" element={<PrivateRoute><AdminOrderPage /></PrivateRoute>} />
        <Route path="/add_product" element={<PrivateRoute><AddProductPage /></PrivateRoute>} />
        <Route path="/edit_product/:id" element={<PrivateRoute><EditProductPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
