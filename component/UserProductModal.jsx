// src/component/UserProductModal.jsx
import { useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";

function UserProductModal({ tempProduct, addToCart }) {
  const [qty, setQty] = useState(1);
  const modalRef = useRef(null);
  const bsModal = useRef(null);

  useEffect(() => {
    bsModal.current = new Modal(modalRef.current);
  }, []);

  // 當 tempProduct 有資料時自動打開 Modal
  useEffect(() => {
    if (tempProduct.id) {
      setQty(1); // 重置數量
      bsModal.current.show();
    }
  }, [tempProduct]);

  const closeModal = () => bsModal.current.hide();

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">{tempProduct.title}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-sm-6">
                <img className="img-fluid" src={tempProduct.imageUrl} alt={tempProduct.title} />
              </div>
              <div className="col-sm-6">
                <span className="badge bg-primary mb-2">{tempProduct.category}</span>
                <p>商品描述：{tempProduct.description}</p>
                <p>商品內容：{tempProduct.content}</p>
                <div className="h5">{tempProduct.price} 元</div>
                <del className="h6 text-muted">原價 {tempProduct.origin_price} 元</del>
                
                <div className="input-group mt-3">
                  <select 
                    className="form-select" 
                    value={qty} 
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    className="btn btn-primary"
                    onClick={() => {
                      addToCart(tempProduct.id, qty);
                      closeModal();
                    }}
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProductModal;