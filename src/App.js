import './App.css';
import Home from './pages/home';
import Register from './pages/register';
import Login from './pages/login';
import ForgotPassword from './pages/forgotpassword';
import Dashboard from './component/layout/admin/dashboard';
import AdminProfile from './component/layout/admin/adminProfile';
import AddCategory from './component/layout/admin/addCategory';
import Category from './component/layout/admin/category';
import EditCategory from './component/layout/admin/editCategory';
import AddProduct from './component/layout/admin/addProduct';
import ViewProduct from './component/layout/admin/viewProduct';
import EditProduct from './component/layout/admin/editProduct';
import Orders from './component/layout/admin/order';
import Categories from './pages/categories';
import AdminPrivateRoute from './component/include/privateRoute';
import Page403 from './component/include/error/Page403';
import Page404 from './component/include/error/Page404';
import Cart from './pages/cart';
import Products from './pages/products';
import ProductDetails from './pages/productDetails';
import Checkout from './pages/checkout';
import Thankyou from './pages/thankyou';
import { BrowserRouter as Router,Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import Header from './component/include/header';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';

axios.defaults.withCredentials = true;

axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/admin/dashboard' element={
            <AdminPrivateRoute>
              <Dashboard />
            </AdminPrivateRoute>
          }/>

          <Route path='/admin/profile' element={
            <AdminPrivateRoute>
              <AdminProfile />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/add-category' element={
            <AdminPrivateRoute>
              <AddCategory />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/category' element={
            <AdminPrivateRoute>
              <Category />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/category/edit-category/:id' element={
            <AdminPrivateRoute>
              <EditCategory />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/add-products' element={
            <AdminPrivateRoute>
              <AddProduct />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/view-products' element={
            <AdminPrivateRoute>
              <ViewProduct />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/view-products/edit-product/:id' element={
            <AdminPrivateRoute>
              <EditProduct />
            </AdminPrivateRoute>
          } />

          <Route path='/admin/orders' element={
            <AdminPrivateRoute>
              <Orders />
            </AdminPrivateRoute>
          } />
            
          <Route exact path='/' element={<Home />} />
          <Route path='/categories' element={<Categories />} />
          <Route path='/categories/:slug' element={<Products />} />
          <Route path='/categories/:category_slug/:product_slug' element={<ProductDetails />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/thank-you' element={<Thankyou />} />

          <Route path='/login' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Login />} />
          <Route path='/register' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <Register />} />
          <Route path='/forgot-password' element={localStorage.getItem('auth_token') ? <Navigate to='/' /> : <ForgotPassword />} />
            
          <Route path='/403' element={<Page403 />} />
          <Route path='/404' element={<Page404 />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
