// src/component/ArticleModal.jsx
import { postAdminArticle, putAdminArticle, deleteAdminArticle } from '../services/adminService';

function ArticleModal({ modalType, tempArticle, setTempArticle, fetchArticles, bsModal }) {

    const handleUpdate = async () => {
        try {
            if (modalType === 'delete') {
                await deleteAdminArticle(tempArticle.id);
            } else if (modalType === 'create') {
                await postAdminArticle(tempArticle);
            } else {
                await putAdminArticle(tempArticle.id, tempArticle);
            }
            bsModal.current.hide();
            fetchArticles();
        } catch (error) {
            console.error(error);
            alert('操作失敗');
        }
    };

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setTempArticle(prev => ({
            ...prev,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className={`modal-header ${modalType === 'delete' ? 'bg-danger' : 'bg-dark'} text-white`}>
                    <h5 className="modal-title">{modalType === 'delete' ? '刪除文章' : '編輯文章'}</h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    {modalType === 'delete' ? (
                        <p className="h4">確定要刪除文章 <span className="text-danger">{tempArticle.title}</span> 嗎？</p>
                    ) : (
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">文章封面圖</label>
                                    <input id="image" type="text" className="form-control" value={tempArticle.image || ''} onChange={handleChange} />
                                </div>
                                <img src={tempArticle.image} className="img-fluid" alt="" />
                            </div>
                            <div className="col-sm-8">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">標題</label>
                                    <input id="title" type="text" className="form-control" value={tempArticle.title || ''} onChange={handleChange} />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="author" className="form-label">作者</label>
                                        <input id="author" type="text" className="form-control" value={tempArticle.author || ''} onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="create_at" className="form-label">建立日期</label>
                                        <input id="create_at" type="date" className="form-control"
                                            value={new Date(tempArticle.create_at).toISOString().split('T')[0]}
                                            onChange={(e) => setTempArticle({ ...tempArticle, create_at: new Date(e.target.value).getTime() })} />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">簡介</label>
                                    <textarea id="description" className="form-control" rows="2" value={tempArticle.description || ''} onChange={handleChange}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="content" className="form-label">文章內容</label>
                                    <textarea id="content" className="form-control" rows="6" value={tempArticle.content || ''} onChange={handleChange}></textarea>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="isPublic" checked={tempArticle.isPublic || false} onChange={handleChange} />
                                    <label className="form-check-label" htmlFor="isPublic">是否公開</label>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">取消</button>
                    <button type="button" className={`btn ${modalType === 'delete' ? 'btn-danger' : 'btn-primary'}`} onClick={handleUpdate}>
                        {modalType === 'delete' ? '確認刪除' : '確認送出'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ArticleModal;