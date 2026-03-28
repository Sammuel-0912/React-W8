// src/views/ArticleDetail.jsx
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArticle } from '../services/articleService';

const ArticleDetail = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const res = await getArticle(id);
                setArticle(res.data.article);
            } catch(error){
                alert(`失敗:${error.response?.data?.message}`);
            }
        };
        fetchArticle();
    }, [id]);

    if (!article) return <div className="container py-5 text-center">載入故事中...</div>;

    return (
        <div className="container py-5">
            <nav aria-label="breadcrumb" className="mb-4">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">首頁</Link></li>
                    <li className="breadcrumb-item"><Link to="/blog">故事館</Link></li>
                    <li className="breadcrumb-item active">{article.title}</li>
                </ol>
            </nav>

            <article className="mx-auto" style={{ maxWidth: '800px' }}>
                <img src={article.image} className="img-fluid rounded-4 mb-5 shadow w-100" alt="" />

                <header className="mb-5">
                    <h1 className="fw-bold display-4 mb-3">{article.title}</h1>
                    <div className="d-flex align-items-center text-muted">
                        <span className="me-3"><i className="bi bi-person-fill me-1"></i>{article.author}</span>
                        <span><i className="bi bi-calendar3 me-1"></i>{new Date(article.create_at).toLocaleDateString()}</span>
                    </div>
                </header>

                <section className="article-content fs-5 leading-relaxed text-secondary">
                    {/* 若有 HTML 格式內容，可使用 dangerouslySetInnerHTML */}
                    <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                </section>

                <footer className="mt-5 pt-5 border-top">
                    <div className="mb-4">
                        {article.tag?.map(tag => (
                            <span key={tag} className="badge bg-light text-primary me-2 px-3 py-2">#{tag}</span>
                        ))}
                    </div>
                    <Link to="/blog" className="btn btn-dark">返回列表</Link>
                </footer>
            </article>
        </div>
    );
};

export default ArticleDetail;