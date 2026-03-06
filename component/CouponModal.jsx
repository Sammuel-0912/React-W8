// src/component/CouponModal.jsx
import { postAdminCoupon, putAdminCoupon, deleteAdminCoupon } from '../services/adminService';

function CouponModal({ modalType, tempCoupon, setTempCoupon, fetchCoupons, bsModal }) {
    const handleUpdate = async () => {
        try {
            if (modalType === 'delete') {
                await deleteAdminCoupon(tempCoupon.id);
            } else if (modalType === 'create') {
                await postAdminCoupon(tempCoupon);
            } else {
                await putAdminCoupon(tempCoupon.id, tempCoupon);
            }
            bsModal.current.hide();
            fetchCoupons();
        } catch (error) { 
            console.error(error);
            alert("操作失敗");
        }
    };

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className={`modal-header ${modalType === 'delete' ? 'bg-danger' : 'bg-dark'} text-white`}>
                    <h5 className="modal-title">{modalType === 'delete' ? '刪除優惠券' : '優惠券細節'}</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    {modalType === 'delete' ? (
                        <p>確定要刪除 <strong className="text-danger">{tempCoupon.title}</strong> 嗎？</p>
                    ) : (
                        <>
                            <div className="mb-3">
                                <label htmlFor="title">標題</label>
                                <input id="title" type="text" className="form-control" value={tempCoupon.title} onChange={(e) => setTempCoupon({ ...tempCoupon, title: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="code">優惠碼</label>
                                <input id="code" type="text" className="form-control" value={tempCoupon.code} onChange={(e) => setTempCoupon({ ...tempCoupon, code: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="due_date">到期日</label>
                                <input id="due_date" type="date" className="form-control"
                                    value={new Date(tempCoupon.due_date * 1000).toISOString().split('T')[0]}
                                    onChange={(e) => setTempCoupon({ ...tempCoupon, due_date: Math.floor(new Date(e.target.value).getTime() / 1000) })} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="percent">折扣百分比</label>
                                <input id="percent" type="number" className="form-control" value={tempCoupon.percent} onChange={(e) => setTempCoupon({ ...tempCoupon, percent: Number(e.target.value) })} />
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="is_enabled" checked={!!tempCoupon.is_enabled} onChange={(e) => setTempCoupon({ ...tempCoupon, is_enabled: e.target.checked ? 1 : 0 })} />
                                <label className="form-check-label" htmlFor="is_enabled">是否啟用</label>
                            </div>
                        </>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdate}>確認</button>
                </div>
            </div>
        </div>
    );
}

export default CouponModal;