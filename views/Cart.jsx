import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartAsync, updateCartAsync, deleteCartItemAsync } from '../slice/cartSlice';

const Cart = () => {
  const { cart, total, final_total, isLoading } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartAsync());
  }, [dispatch]);

  const handleUpdateCart = (item, qty) => {
    if (qty < 1) return;
    dispatch(updateCartAsync({ id: item.id, product_id: item.product_id, qty }));
  };

  if (cart.length === 0 && !isLoading) {
    return (
      <div className="container py-5 text-center">
        <h2>購物車是空的</h2>
        <Link to="/products" className="btn btn-primary mt-3">前往購物</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">購物車清單</h2>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>品名</th>
                <th style={{ width: '150px' }}>數量</th>
                <th className="text-end">單價</th>
                <th className="text-end">小計</th>
                <th style={{ width: '80px' }}>刪除</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <img src={item.product.imageUrl} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="me-3" />
                      {item.product.title}
                    </div>
                  </td>
                  <td>
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
                  <td className="text-end">NT$ {item.product.price.toLocaleString()}</td>
                  <td className="text-end fw-bold">NT$ {item.total.toLocaleString()}</td>
                  <td className="text-center">
                    <button 
                      type="button" 
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => dispatch(deleteCartItemAsync(item.id))}
                    >
                      <i className="bi bi-x-lg">刪除</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end fw-bold">總計</td>
                <td className="text-end fw-bold h5 text-primary">NT$ {final_total.toLocaleString()}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>

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