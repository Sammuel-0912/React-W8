// src/views/Products.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/productService';
import Pagination from '../component/Pagination'; // 延用您現有的分頁元件
// import * as bootstrap from "bootstrap";
import { useDispatch } from 'react-redux';
import { addToCartAsync } from '../slice/cartSlice';
import UserProductModal from '../component/UserProductModal'; 

const categories = ['全部', '模型精品', '服飾配件', '廚房用品']; // 依 API 實際分類調整

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('全部');

    const dispatch = useDispatch();
    const [tempProduct, setTempProduct] = useState({});


    const fetchProducts = useCallback(async (page = 1, category = '') => {
        setIsLoading(true);
        try {
            const res = await getProducts(page, category === '全部' ? '' : category);
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error("取得產品失敗", error);
        } finally {
            setIsLoading(false);
        }
    },[]);

    // 開啟 Modal 的處理函式
    const openModal = (product) => {
        setTempProduct(product);
    };

    const handleAddToCart = (id) => {
        dispatch(addToCartAsync({ product_id: id, qty: 1 }));
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
        fetchProducts(1, category);
    };

    return (
        <div className="container mt-md-5 mt-3 mb-7">
            <div className="row">
                {/* 左側分類選單 (參考版型結構) */}
                <div className="col-md-3">
                    <ul className="list-group list-group-flush mb-4">
                        {categories.map((item) => (
                            <button
                                key={item}
                                className={`list-group-item list-group-item-action ${currentCategory === item ? 'active' : ''}`}
                                onClick={() => handleCategoryChange(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </ul>
                </div>

                {/* 右側產品列表 */}
                <div className="col-md-9">
                    {isLoading ? (
                        <div className="d-flex justify-content-center py-5">
                            <div className="spinner-border" role="status"></div>
                        </div>
                    ) : (
                        <>
                            <div className="row">
                                {products.map((product) => (
                                    <div className="col-md-4 mb-4" key={product.id}>
                                        <div className="card border-0 shadow-sm h-100">
                                            <div
                                                style={{
                                                    height: '200px',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    backgroundImage: `url(${product.imageUrl})`
                                                }}
                                            ></div>
                                            <div className="card-body">
                                                <span className="badge bg-light text-dark mb-2">{product.category}</span>
                                                <h5 className="card-title text-truncate">{product.title}</h5>
                                                <p className="card-text text-muted mb-2">
                                                    NT$ {product.price.toLocaleString()}
                                                    <del className="ms-2 text-secondary fs-7">NT$ {product.origin_price.toLocaleString()}</del>
                                                </p>
                                                <div className="d-grid gap-0">
                                                    <button
                                                        className="btn btn-outline-secondary w-100"
                                                        onClick={() => openModal(product)} // 點選彈出視窗
                                                    >
                                                        查看細節
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm w-100 mt-3"
                                                        onClick={() => handleAddToCart(product.id)}
                                                    >
                                                        加入購物車
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 分頁元件 */}
                            <div className="d-flex justify-content-center mt-4">
                                <Pagination pagination={pagination} changePage={fetchProducts} />
                            </div>

                            {/* 放置 Modal 元件 */}
                            <UserProductModal
                                tempProduct={tempProduct}
                                addToCart={handleAddToCart}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Products;
