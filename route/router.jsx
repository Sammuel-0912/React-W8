// src/route/router.jsx
import { createHashRouter } from "react-router-dom";

// 引入佈局
import Layout from "../layout/Layout";

// 引入前台頁面
import Home from "../views/Home"; // 假設您有首頁
import Products from "../views/Products";
import SingleProduct from "../views/SingleProduct";
import Cart from "../views/Cart";
import Checkout from "../views/Checkout";
import NotFound from '../views/NotFound';
import Login from "../views/Login";
import CheckoutSuccess from "../views/CheckoutSuccess";
import AdminProducts from "../views/AdminProducts";
import AdminLayout from "../layout/AdminLayout";
import AdminOrders from "../views/AdminOrders";

const router = createHashRouter([
    {
        path: '/',
        element: <Layout />, // 全域佈局
        children: [
            {
                index: true, // 首頁 (/)
                element: <Home />,
            },
            {
                path: 'products', // 產品列表 (/products)
                element: <Products />,
            },
            {
                path: 'product/:id', // 單一產品詳細頁 (/product/:id)
                element: <SingleProduct />,
            },
            {
                path: 'cart', // 購物車頁面 (/cart)
                element: <Cart />,
            },
            {
                path: 'checkout', // 結帳頁面 (/checkout)
                element: <Checkout />,
            },
            {
                path: 'login', // 登入頁面 (/login)
                element: <Login />,
            },
            {
                path: '/admin',
                element: <AdminLayout />, // 這層會做驗證
                children: [
                    {
                        path: 'products', // 完整路徑為 /admin/products
                        element: <AdminProducts />,
                    },
                    {
                        path: 'orders',
                        element: <AdminOrders />,
                    },
                ],
            },
            {
                path: 'checkout-success/:orderId', // 動態路徑接收訂單 ID
                element: <CheckoutSuccess />,
            },
        ],
    },
    {
        path: '*', // 404 頁面
        element: <NotFound />
    },
]);

export default router;