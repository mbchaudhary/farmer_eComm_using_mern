import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./Client Routing/HomePage";
import Login from "./Login & Register/Login";
import Register from "./Login & Register/Register";
import ProfilePage from "./Client Routing/ProfilePage";
import SwitchRole from "./Pages/SwitchRole";
import ProductDetailPage from "./Client Routing/ProductDetailPage";
import OrderPage from "./Client Routing/OrderPage";
import AdminHomePage from "./Admin Routing/AdminHomePage";
import AdminOrderPage from "./Admin Routing/AdminOrderPage";
import AddProductPage from "./Admin Routing/AddProductPage";
import EditProductPage from "./Admin Routing/EditProductPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* client routing */}

        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/switchrole" element={<SwitchRole />} />
        <Route path="/productdetail/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrderPage />} />

        {/* admin routing */}

        <Route path="/admin_home" element={<AdminHomePage />} />
        <Route path="/admin_order" element={<AdminOrderPage />} />
        <Route path="/add_product" element={<AddProductPage />} />
        <Route path="/edit_product/:id" element={<EditProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
