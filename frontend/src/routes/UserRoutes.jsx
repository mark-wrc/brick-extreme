import Login from "@/components/auth/Login/Login";
import Register from "@/components/auth/Register/Register";
import AddProduct from "@/components/admin/Products/AddProduct/AddProduct";
import Dashboard from "@/components/admin/Dashboard/Dashboard";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import Home from "@/pages/Home/Home";
import Products from "@/pages/Products/AllProduct/Products";
import ProductView from "@/pages/Products/AllProduct/ProductView";
import { Route } from "react-router-dom";
import AdminView from "@/pages/Admin/AdminView";
import ViewProducts from "@/components/admin/Products/ViewProducts";
import ViewOrder from "@/components/admin/Products/ViewOrder";
import ViewUsers from "@/components/admin/Products/ViewUsers";
import ViewReviews from "@/components/admin/Products/ViewReviews";
import CategoriesPage from "@/pages/Categories/CategoriesPage";
import Profile from "@/components/auth/Profile/Profile";
import Settings from "@/components/auth/Settings/Settings";
import UpdateProduct from "@/components/admin/Products/UpdateProduct";
import ViewCategories from "@/components/admin/Products/ViewCategories";
import ViewCollection from "@/components/admin/Products/ViewCollection";
import ViewSkillLevel from "@/components/admin/Products/ViewSkillLevel";
import ViewDesigner from "@/components/admin/Products/ViewDesigner";
import ProtectedRoutes from "@/routes/ProtectedRoutes";

const UserRoutes = (
  <>
    {/* Public Routes */}
    <Route index element={<Home />} />
    <Route path="about" element={<About />} />
    <Route path="contact" element={<Contact />} />

    {/* Product Routes */}
    <Route path="products" element={<Products />} />
    <Route path="categories" element={<CategoriesPage />} />
    <Route path="products/best-selling/:id" element={<ProductView />} />
    <Route path="products/latest/:id" element={<ProductView />} />
    <Route path="products/:id" element={<ProductView />} />

    {/* Auth Routes */}
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />

    {/* Protected User Routes */}
    <Route
      path="profile"
      element={
        <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>
      }
    />
    <Route
      path="settings"
      element={
        <ProtectedRoutes>
          <Settings />
        </ProtectedRoutes>
      }
    />

    {/* Protected Admin/Employee Routes */}
    <Route
      path="admin"
      element={
        <ProtectedRoutes adminOnly={true}>
          <AdminView />
        </ProtectedRoutes>
      }
    >
      {/* Dashboard */}
      <Route index element={<Dashboard />} />

      {/* Product Management */}
      <Route path="products" element={<ViewProducts />} />
      <Route path="new-product" element={<AddProduct />} />
      <Route path="update-product/:id" element={<UpdateProduct />} />
      
      {/* Category Management */}
      <Route path="categories" element={<ViewCategories />} />
      <Route path="collections" element={<ViewCollection />} />
      <Route path="skill-levels" element={<ViewSkillLevel />} />
      <Route path="designers" element={<ViewDesigner />} />

      {/* User & Order Management */}
      <Route path="users" element={<ViewUsers />} />
      <Route path="orders" element={<ViewOrder />} />
      <Route path="reviews" element={<ViewReviews />} />
    </Route>
  </>
);

export default UserRoutes;
