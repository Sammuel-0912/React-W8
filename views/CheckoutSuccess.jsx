// src/views/CheckoutSuccess.jsx
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getCartAsync } from '../slice/cartSlice';

const CheckoutSuccess = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    // 進入此頁面代表訂單已成立，再次確認購物車已清空
    dispatch(getCartAsync());
  }, [dispatch]);

  return (
    <div className="container py-7 text-center">
      <div className="py-5">
        <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i>
        <h2 className="fw-bold mt-4">訂單建立成功！</h2>
        <p className="text-muted fs-5">感謝您的購買，我們將儘速為您處理訂單。</p>
        
        <div className="card border-0 bg-light mx-auto mt-4" style={{ maxWidth: '500px' }}>
          <div className="card-body">
            <p className="mb-1 text-muted">訂單編號</p>
            <code className="h5 text-dark d-block mb-0">{orderId}</code>
          </div>
        </div>

        <div className="mt-5">
          <Link to="/products" className="btn btn-dark px-5 py-2 me-3">繼續購物</Link>
          <Link to="/" className="btn btn-outline-secondary px-5 py-2">回到首頁</Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;