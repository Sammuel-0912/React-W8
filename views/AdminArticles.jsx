// src/views/AdminArticles.jsx
import { useEffect, useState, useRef } from 'react';
import { Modal } from 'bootstrap';
import { getAdminArticles, getAdminArticle } from '../services/adminService';
import ArticleModal from '../component/ArticleModal';
import Pagination from '../component/Pagination';

const AdminArticles = () => {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [modalType, setModalType] = useState(''); // 'create', 'edit', 'delete'
    const [tempArticle, setTempArticle] = useState({
        title: '', description: '', image: '', tag: [], create_at: new Date().toISOString(),
        author: '', isPublic: false, content: ''
    });

    const articleModalRef = useRef(null);
    const bsModal = useRef(null);

    const fetchArticles = async (page = 1) => {
        try {
            const res = await getAdminArticles(page);
            setArticles(res.data.articles);
            setPagination(res.data.pagination);
        } catch {
            alert('取得文章失敗');
        }
    };

    useEffect(() => {
        bsModal.current = new Modal(articleModalRef.current);
        // 確保 fetch 操作不會在掛載的同一瞬間同步鎖死渲染
        const loadData = async () => {
            await fetchArticles();
        }
        loadData();
    }, []);

    const openModal = async (type, article = {}) => {
        setModalType(type);
        if (type === 'create') {
            setTempArticle({
                title: '', description: '', image: '', tag: [], create_at: Date.now(),
                author: '', isPublic: false, content: ''
            });
            bsModal.current.show();
        } else {
            // 編輯或刪除需要先取得完整內容 (因為列表可能沒有 content)
            try {
                const res = await getAdminArticle(article.id);
                setTempArticle({ ...res.data.article });
                bsModal.current.show();
            } catch{
                alert('取得文章詳細資訊失敗');
            }
        }
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between mb-4">
                <h2 className="fw-bold">文章管理</h2>
                <button className="btn btn-primary" onClick={() => openModal('create')}>建立新文章</button>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>標題</th>
                        <th>作者</th>
                        <th>描述</th>
                        <th>建立時間</th>
                        <th>公開狀態</th>
                        <th>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>{item.author}</td>
                            <td style={{ maxWidth: '200px' }} className="text-truncate">{item.description}</td>
                            <td>{new Date(item.create_at).toLocaleDateString()}</td>
                            <td>
                                <span className={item.isPublic ? 'text-success' : 'text-muted'}>
                                    {item.isPublic ? '已公開' : '草稿'}
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

            <Pagination pagination={pagination} changePage={fetchArticles} />

            {/* 文章 Modal */}
            <div className="modal fade" ref={articleModalRef} tabIndex="-1">
                <ArticleModal
                    modalType={modalType}
                    tempArticle={tempArticle}
                    setTempArticle={setTempArticle}
                    fetchArticles={fetchArticles}
                    bsModal={bsModal}
                />
            </div>
        </div>
    );
};

export default AdminArticles;