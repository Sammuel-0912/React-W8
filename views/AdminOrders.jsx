// src/views/AdminOrders.jsx
import { useEffect, useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import { getAdminOrders, putAdminOrder, deleteAdminOrder, deleteAllAdminOrders } from '../services/adminService';
import OrderModal from '../component/OrderModal';
import Pagination from '../component/Pagination';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({});
  const [tempOrder, setTempOrder] = useState({});
  const [isDeleteAll, setIsDeleteAll] = useState(false); // 用於確認是否為刪除全部

  const orderModalRef = useRef(null);
  const deleteModalRef = useRef(null);
  const bsOrderModal = useRef(null);
  const bsDeleteModal = useRef(null);

  useEffect(() => {
    bsOrderModal.current = new Modal(orderModalRef.current);
    bsDeleteModal.current = new Modal(deleteModalRef.current);
    fetchOrders();
  }, []);

  const fetchOrders = async (page = 1) => {
    try {
      const res = await getAdminOrders(page);
      setOrders(res.data.orders);
      setPagination(res.data.pagination);
    } catch (error) {
      console.error('取得訂單失敗');
    }
  };

  const openOrderModal = (order) => {
    setTempOrder({ ...order });
    bsOrderModal.current.show();
  };

  const openDeleteModal = (order, all = false) => {
    setIsDeleteAll(all);
    setTempOrder(order);
    bsDeleteModal.current.show();
  };

  const handleUpdateOrder = async () => {
    try {
      await putAdminOrder(tempOrder.id, tempOrder);
      bsOrderModal.current.hide();
      fetchOrders(pagination.current_page);
    } catch (error) {
      alert('更新失敗');
    }
  };

  const handleDelete = async () => {
    try {
      if (isDeleteAll) {
        await deleteAllAdminOrders();
      } else {
        await deleteAdminOrder(tempOrder.id);
      }
      bsDeleteModal.current.hide();
      fetchOrders();
    } catch (error) {
      alert('刪除失敗');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between mb-4">
        <h2 className="fw-bold">訂單管理</h2>
        <button className="btn btn-outline-danger" onClick={() => openDeleteModal({}, true)}>清除全部訂單</button>
      </div>

      <table className="table-responsive mt-4">
        <thead>
          <tr>
            <th>下單時間</th>
            <th>Email</th>
            <th>購買項目</th>
            <th>應付金額</th>
            <th>是否付款</th>
            <th>編輯</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id}>
              <td>{new Date(item.create_at * 1000).toLocaleDateString()}</td>
              <td>{item.user.email}</td>
              <td>
                <ul className="list-unstyled">
                  {Object.values(item.products).map((product) => (
                    <li key={product.id}>
                      {product.product.title}：{product.qty} {product.product.unit}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{item.total.toLocaleString()}</td>
              <td>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.is_paid}
                    readOnly
                  />
                  <label className={item.is_paid ? 'text-success' : 'text-muted'}>
                    {item.is_paid ? '已付款' : '未付款'}
                  </label>
                </div>
              </td>
              <td>
                <div className="btn-group">
                  <button className="btn btn-outline-primary btn-sm" onClick={() => openOrderModal(item)}>檢視</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => openDeleteModal(item)}>刪除</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination pagination={pagination} changePage={fetchOrders} />

      {/* 訂單細節 Modal */}
      <OrderModal 
        modalRef={orderModalRef} 
        tempOrder={tempOrder} 
        setTempOrder={setTempOrder}
        onUpdate={handleUpdateOrder}
        
      />

      {/* 刪除確認 Modal */}
      <div className="modal fade" ref={deleteModalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-danger text-white">
              <h5 className="modal-title">刪除確認</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              確定要刪除 {isDeleteAll ? <strong className="text-danger">全部訂單</strong> : `訂單編號：${tempOrder.id}`} 嗎？
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>確認刪除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;