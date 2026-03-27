// src/views/AdminCoupons.jsx
import { useEffect, useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import { getAdminCoupons } from '../services/adminService';
import CouponModal from '../component/CouponModal';
import Pagination from '../component/Pagination';

const AdminCoupons = () => {
    const [coupons, setCoupons] = useState([]);
    const [pagination, setPagination] = useState({});
    const [modalType, setModalType] = useState('');
    const [tempCoupon, setTempCoupon] = useState(() => ({
        title: '', is_enabled: 0, percent: 100, due_date: Date.now(), code: ''
    }));

    const couponModalRef = useRef(null);
    const bsModal = useRef(null);

    const fetchCoupons = async (page = 1) => {
        try {
            const res = await getAdminCoupons(page);
            setCoupons(res.data.coupons);
            setPagination(res.data.pagination);
        } catch{ 
            alert("取得優惠券失敗");
        }
    };

    useEffect(() => {
        bsModal.current = new Modal(couponModalRef.current);
        const loadCoupon = async () => {
            await fetchCoupons();
        }
        loadCoupon();
    }, []);

    const openModal = (type, coupon = {}) => {
        setModalType(type);
        if (type === 'create') {
            setTempCoupon({ title: '', is_enabled: 0, percent: 100, due_date: Math.floor(Date.now() / 1000), code: '' });
        } else {
            setTempCoupon({ ...coupon });
        }
        bsModal.current.show();
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
                <h2 className="fw-bold">優惠券管理</h2>
                <button className="btn btn-primary" onClick={() => openModal('create')}>建立優惠券</button>
            </div>
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>名稱</th>
                        <th>折扣百分比</th>
                        <th>到期日</th>
                        <th>優惠碼</th>
                        <th>是否啟用</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.percent}%</td>
                            <td>{new Date(item.due_date * 1000).toLocaleDateString()}</td>
                            <td>{item.code}</td>
                            <td>
                                <span className={item.is_enabled ? 'text-success' : 'text-muted'}>
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
            <Pagination pagination={pagination} changePage={fetchCoupons} />

            <div className="modal fade" ref={couponModalRef} tabIndex="-1">
                <CouponModal
                    modalType={modalType}
                    tempCoupon={tempCoupon}
                    setTempCoupon={setTempCoupon}
                    fetchCoupons={fetchCoupons}
                    bsModal={bsModal}
                />
            </div>
        </div>
    );
};

export default AdminCoupons;