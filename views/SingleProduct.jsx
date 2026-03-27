const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

// src/views/SingleProduct.jsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProducts } from '../services/productService';
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '../slice/cartSlice';
import UserProductModal from '../component/UserProductModal';

const SingleProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        id: null,
        imageUrl: '',
        title: '',
        price: 0,
        origin_price: 0,
        description: '',
        content: ''
    });
    const [qty, setQty] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isAddingCart, setIsAddingCart] = useState(false);



    const dispatch = useDispatch();

    const handleAddToCart = async () => {
        setIsAddingCart(true);
        try {
            // 這裡使用我們定義好的 asyncThunk
            await dispatch(addToCartAsync({ product_id: product.id, qty })).unwrap();
            // 成功後可以搭配 messageSlice 顯示 Toast (選配)
        } catch {
            alert("加入購物車失敗");
        } finally {
            setIsAddingCart(false);
        }
    };

    const fetchProduct = async () => {
        setIsLoading(true);
        try {
            const res = await getProducts(id);
            setProduct(res.data.product);
        } catch {
            alert("取得產品失敗");
            // 若找不到產品則導回列表
            navigate('/products');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchProduct();
    });

    if (isLoading) return <div className="container py-5 text-center"><div className="spinner-border"></div></div>;

    return (
        <div className="container mt-5 mb-7">
            <div className="row justify-content-center">
                {/* 左側產品圖片 - 參考 Hexschool 版型結構 */}
                <div className="col-md-5">
                    <img src={product.imageUrl} alt={product.title} className="img-fluid object-fit-cover" style={{ height: '400px', width: '100%' }} />
                </div>

                {/* 右側產品資訊 */}
                <div className="col-md-5">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-white px-0">
                            <li className="breadcrumb-item"><a className="text-muted" href="./index.html">首頁</a></li>
                            <li className="breadcrumb-item"><a className="text-muted" href="./product.html">產品列表</a></li>
                            <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                        </ol>
                    </nav>
                    <h2 className="fw-bold h1 mb-1">{product.title}</h2>
                    <p className="mb-0 text-muted text-end">
                        <del>NT$ {product.origin_price?.toLocaleString()}</del>
                    </p>
                    <p className="h4 fw-bold text-end">NT$ {product.price?.toLocaleString()}</p>

                    <div className="row align-items-center mt-4">
                        <div className="col-6">
                            <div className="input-group my-3 bg-light rounded">
                                <button
                                    className="btn btn-outline-dark border-0 py-2"
                                    type="button"
                                    onClick={() => setQty((prev) => Math.max(1, prev - 1))}
                                >
                                    <i className="bi bi-dash"></i>
                                </button>
                                <input
                                    type="number"
                                    className="form-control border-0 text-center my-auto shadow-none bg-light"
                                    value={qty}
                                    readOnly
                                />
                                <button
                                    className="btn btn-outline-dark border-0 py-2"
                                    type="button"
                                    onClick={() => setQty((prev) => prev + 1)}
                                >
                                    <i className="bi bi-plus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="col-6">
                            <button
                                type="button"
                                className="text-nowrap btn btn-dark w-100 py-2"
                                onClick={handleAddToCart}
                                disabled={isAddingCart}
                            >
                                {isAddingCart ? '處理中...' : '加入購物車'}
                            </button>
                        </div>
                    </div>

                    <hr />
                    <div className="mt-4">
                        <h5 className="fw-bold">產品描述</h5>
                        <p className="text-muted">{product.description}</p>
                        <h5 className="fw-bold mt-4">內容說明</h5>
                        <p className="text-muted">{product.content}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
