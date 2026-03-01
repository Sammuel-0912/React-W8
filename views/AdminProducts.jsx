// src/views/AdminProducts.jsx
import { useEffect, useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import { getAdminProducts, postAdminProduct, putAdminProduct, deleteAdminProduct, uploadImage } from '../services/productService';
import ProductModal from '../component/ProductModal';
import Pagination from '../component/Pagination';
import { useDispatch } from 'react-redux';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [modalType, setModalType] = useState(''); // 'create', 'edit', 'delete'
    const [tempProduct, setTempProduct] = useState({
        title: '', category: '', unit: '', origin_price: 0, price: 0,
        description: '', content: '', is_enabled: 0, imageUrl: '', imagesUrl: []
    });

    const productModalRef = useRef(null);
    const bsModal = useRef(null);

    const [isUploading, setIsUploading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        bsModal.current = new Modal(productModalRef.current);
        fetchProducts();
    }, []);

    const fetchProducts = async (page = 1) => {
        try {
            const res = await getAdminProducts(page);
            setProducts(res.data.products);
            setPagination(res.data.pagination);
        } catch (error) {
            console.error('取得產品失敗');
        }
    };

    // 開啟 Modal
    const openModal = (type, product = {}) => {
        setModalType(type);
        if (type === 'create') {
            setTempProduct({
                title: '', category: '', unit: '', origin_price: 0, price: 0,
                description: '', content: '', is_enabled: 0, imageUrl: '', imagesUrl: []
            });
        } else {
            setTempProduct({ ...product });
        }
        bsModal.current.show();
    };

    const closeModal = () => bsModal.current.hide();

    // 更新或新增產品
    const handleUpdateProduct = async () => {
        try {
            if (modalType === 'create') {
                await postAdminProduct(tempProduct);
            } else {
                await putAdminProduct(tempProduct.id, tempProduct);
            }
            closeModal();
            fetchProducts();
        } catch (error) {
            alert('操作失敗');
        }
    };

    // 刪除產品
    const handleDeleteProduct = async (id) => {
        try {
            await deleteAdminProduct(id);
            closeModal();
            fetchProducts();
        } catch (error) {
            alert('刪除失敗');
        }
    };

    // 處理圖片上傳
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const res = await uploadImage(file);
            if (res.data.success) {
                // 將回傳的圖片網址存入 tempProduct
                setTempProduct((prev) => ({
                    ...prev,
                    imageUrl: res.data.imageUrl
                }));
                dispatch(createAsyncMessage({
                    success: true,
                    message: '圖片上傳成功'
                }));
            }
        } catch (error) {
            dispatch(createAsyncMessage({
                success: false,
                message: error.response?.data?.message || '圖片上傳失敗'
            }));
        } finally {
            setIsUploading(false);
            // 清空 file input 的值，讓同一個檔案可以重複觸發 onChange
            e.target.value = '';
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
                <h2 className="fw-bold">產品管理 (後台)</h2>
                <button className="btn btn-primary" onClick={() => openModal('create')}>建立新產品</button>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th className='text-center'>分類</th>
                        <th className='text-center'>產品名稱</th>
                        <th className='text-center'>原價</th>
                        <th className='text-center'>售價</th>
                        <th className='text-center'>是否啟用</th>
                        <th className='text-center'>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td className='text-center'>{item.category}</td>
                            <td className='text-center'>{item.title}</td>
                            <td className='text-center'>{item.origin_price}</td>
                            <td className='text-center'>{item.price}</td>
                            <td className='text-center'>
                                <span className={item.is_enabled ? 'text-success' : 'text-danger'}>
                                    {item.is_enabled ? '啟用' : '未啟用'}
                                </span>
                            </td>
                            <td>
                                <div className="btn-group">
                                    <button className="btn btn-outline-primary btn-sm" onClick={() => openModal('edit', item)}>編輯</button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={() => openModal('delete', item)}>刪除</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Pagination pagination={pagination} changePage={fetchProducts} />

            {/* Modal 元件 */}
            <div className="modal fade" ref={productModalRef} tabIndex="-1">
                <ProductModal
                    modalType={modalType}
                    templateData={tempProduct}
                    onInputChange={(e) => {
                        const { id, value, type, checked } = e.target;
                        setTempProduct(prev => ({
                            ...prev,
                            [id]: type === 'checkbox' ? (checked ? 1 : 0) : value
                        }));
                    }}
                    onCloseModal={closeModal}
                    onUpdateProduct={handleUpdateProduct}
                    onDeleteProduct={handleDeleteProduct}
                    onFileChange={handleFileChange}
                    isUploading={isUploading}
                />
            </div>
        </div>
    );
};

export default AdminProducts;