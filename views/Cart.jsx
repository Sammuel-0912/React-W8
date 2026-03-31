import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartAsync, updateCartAsync, deleteCartItemAsync } from '../slice/cartSlice';
import { postApplyCoupon } from '../services/productService';
import { useState } from 'react';
import { createAsyncMessage } from '../slice/messageSlice';

const Cart = () => {
  const { cart, final_total, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState('');
  
  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const handleUpdateCart = (item, qty) => {
    if (qty < 1) return;
    dispatch(updateCartAsync({ id: item.id, product_id: item.product_id, qty }));
  };

  // 先判斷loading, 避免畫面閃現
  if(isLoading) {
    return (
    <div className="container py-5 text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
  }
  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2>購物車是空的</h2>
        <Link to="/products" className="btn btn-primary mt-3">前往購物</Link>
      </div>
    );
  }

  

  const handleApplyCoupon = async () => {
    // 確認使用者有輸入值，再觸發API
    if(!couponCode.trim()) {
      dispatch(createAsyncMessage({success: false, message: "請輸入優惠碼"}));
      return;
    }
    try {
      const res = await postApplyCoupon(couponCode);
      dispatch(createAsyncMessage({ success: true, message: res.data.message }));
      dispatch(getCartAsync()); // 重新取得購物車以更新折扣後的金額
    } catch (error) {
      dispatch(createAsyncMessage({ success: false, message: error.response?.data?.message }));
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">購物車清單</h2>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <table className="table-responsive align-middle">
            <thead>
              <tr>
                <th className="text-center px-4 py-3">品名</th>
                <th className="text-center px-4 py-3">數量</th>
                <th className="text-center px-4 py-3">單價</th>
                <th className="text-center px-4 py-3">小計</th>
                <th className='text-center px-4 py-3'>刪除</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3">
                    <div className="d-flex align-items-center">
                      <img src={item.product.imageUrl} alt="這是購買清單的圖片" style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="me-3" />
                      <h5 className='me-4'>{item.product.title}</h5>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="input-group input-group-sm">
                      <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => handleUpdateCart(item, item.qty - 1)}
                      >-</button>
                      <input type="number" className="form-control text-center" value={item.qty} readOnly />
                      <button
                        className="btn btn-outline-dark"
                        type="button"
                        onClick={() => handleUpdateCart(item, item.qty + 1)}
                      >+</button>
                    </div>
                  </td>
                  <td className="text-center px-4 py-3">NT$ {item.product.price.toLocaleString()}</td>
                  <td className="text-center fw-bold px-4 py-3">NT$ {item.total.toLocaleString()}</td>
                  <td className="text-center px-4 py-3">
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(deleteCartItemAsync(item.id))}
                      style={{ whiteSpace: 'nowrap' }}
                    >
                      <i className="bi bi-x-lg"></i>
                      <span className="d-none d-md-inline ms-1">刪除</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end fw-bold px-4 py-3">總計</td>
                <td className="text-center fw-bold text-primary px-4 py-3">NT$ {final_total.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
          <div className="input-group mb-3 mt-4" style={{ maxWidth: '300px' }}>
            <input
              type="text"
              className="form-control"
              placeholder="請輸入優惠碼"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="btn btn-outline-dark" type="button" onClick={handleApplyCoupon}>
              套用優惠券
            </button>
          </div>
          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-secondary">繼續購物</Link>
            <Link to="/checkout" className="btn btn-dark px-5">建立訂單</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;