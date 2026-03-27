// src/component/OrderModal.jsx
function OrderModal({ tempOrder, setTempOrder, onUpdate, modalRef }) {
  
  // 處理收件人資訊變動
  const handleUserChange = (e) => {
    const { id, value } = e.target;
    setTempOrder((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        [id]: value,
      },
    }));
  };

  // 處理付款狀態與留言變動
  const handleOrderChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTempOrder((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="modal fade" ref={modalRef} tabIndex="-1">
      <div className="modal-dialog modal-xl">
        <div className="modal-content border-0">
          <div className="modal-header bg-dark text-white">
            <h5 className="modal-title">
              <span>訂單細節 - 編號：{tempOrder.id}</span>
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="row">
              {/* 左側：收件人資訊編輯 */}
              <div className="col-md-4">
                <h4 className="fw-bold mb-3">收件人資訊</h4>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">姓名</label>
                  <input id="name" type="text" className="form-control" value={tempOrder.user?.name || ""} onChange={handleUserChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" type="email" className="form-control" value={tempOrder.user?.email || ""} onChange={handleUserChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tel" className="form-label">電話</label>
                  <input id="tel" type="tel" className="form-control" value={tempOrder.user?.tel || ""} onChange={handleUserChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">地址</label>
                  <input id="address" type="text" className="form-control" value={tempOrder.user?.address || ""} onChange={handleUserChange} />
                </div>
                <div className="mb-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="is_paid" checked={tempOrder.is_paid || false} onChange={handleOrderChange} />
                    <label className="form-check-label fw-bold" htmlFor="is_paid">
                      {tempOrder.is_paid ? "已完成付款" : "尚未付款"}
                    </label>
                  </div>
                </div>
              </div>

              {/* 右側：訂單品項與金額 */}
              <div className="col-md-8">
                <h4 className="fw-bold mb-3">訂單內容</h4>
                <table className="table align-middle">
                  <thead>
                    <tr>
                      <th>品名</th>
                      <th width="100">數量</th>
                      <th width="120" className="text-end">小計</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tempOrder.products && Object.values(tempOrder.products).map((item) => (
                      <tr key={item.id}>
                        <td>{item.product.title}</td>
                        <td>{item.qty} / {item.product.unit}</td>
                        <td className="text-end">NT$ {item.total.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2" className="text-end fw-bold">總金額</td>
                      <td className="text-end fw-bold text-primary h5">NT$ {tempOrder.total?.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
                <div className="mt-4">
                  <label htmlFor="message" className="form-label fw-bold">客戶留言</label>
                  <textarea id="message" className="form-control" rows="3" value={tempOrder.message || "無留言"} readOnly></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
            <button type="button" className="btn btn-primary px-4" onClick={onUpdate}>更新訂單狀態</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;