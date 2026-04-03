// src/views/Checkout.jsx
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/productService';
import { getCartAsync } from '../slice/cartSlice';

const Checkout = () => {
  const { cart, final_total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // React Hook Form 設定
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onTouched', // 觸碰後即觸發驗證
  });

  const onSubmit = async (data) => {
    const { message, ...user } = data;
    const orderData = {
      user,
      message,
    };
    
    try {
      const res = await createOrder(orderData);
      if (res.data.success) {
        alert('訂單建立成功！');
        dispatch(getCartAsync()); // 清空或更新購物車狀態
        navigate(`/checkout-success/${res.data.orderId}`); // 導向成功頁面
      }
    } catch (error) {
      alert('訂 from 提交失敗：' + error.response?.data?.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        {/* 左側：訂單摘要 (參考 Hexschool 版型) */}
        <div className="col-md-4 order-md-2 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold mb-4">訂單摘要</h4>
              {cart.map((item) => (
                <div key={item.id} className="d-flex mb-3">
                  <img src={item.product.imageUrl} alt="這是購物車的圖片" style={{ width: '48px', height: '48px', objectFit: 'cover' }} className="rounded me-3" />
                  <div className="w-100">
                    <div className="d-flex justify-content-between">
                      <p className="mb-0 fw-bold">{item.product.title}</p>
                      <p className="mb-0">x{item.qty}</p>
                    </div>
                    <p className="mb-0 text-muted">NT$ {item.total.toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className="d-flex justify-content-between h5 fw-bold">
                <span>總計</span>
                <span>NT$ {final_total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右側：收件人表單 */}
        <div className="col-md-6 order-md-1">
          <h3 className="fw-bold mb-4">收件人資訊</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                {...register('email', {
                  required: 'Email 為必填',
                  pattern: { value: /^\S+@\S+$/i, message: 'Email 格式不正確' }
                })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">收件人姓名</label>
              <input
                id="name"
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                {...register('name', { required: '姓名為必填' })}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">收件人電話</label>
              <input
                id="tel"
                type="tel"
                className={`form-control ${errors.tel ? 'is-invalid' : ''}`}
                {...register('tel', {
                  required: '電話為必填',
                  minLength: { value: 8, message: '電話號碼至少 8 碼' }
                })}
              />
              {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">收件人地址</label>
              <input
                id="address"
                type="text"
                className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                {...register('address', { required: '地址為必填' })}
              />
              {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="form-label">留言 (選填)</label>
              <textarea id="message" className="form-control" rows="3" {...register('message')}></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-dark py-3 fw-bold">確認送出訂單</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;