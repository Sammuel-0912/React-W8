// src/views/Blog.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/articleService';
import Pagination from '../component/Pagination';

const Blog = () => {
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const fetchArticles = async (page = 1) => {
        setIsLoading(true);
        try {
            const res = await getArticles(page);
            setArticles(res.data.articles);
            setPagination(res.data.pagination);
        } catch {
            alert("取得文章失敗");   
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
    const fetchArticles = async (page = 1) => {
      setIsLoading(true);
      try {
        const res = await getArticles(page);
        setArticles(res.data.articles);
        setPagination(res.data.pagination);
      } catch {
        alert("取得文章失敗");
      } finally {
        setIsLoading(false);
      }
    };
    fetchArticles();
  }, []);

    return (
        <div className="container py-5">
            <header className="text-center mb-5">
                <h2 className="fw-bold display-5">魔法故事館</h2>
                <p className="text-muted">探索迪士尼與皮克斯背後的奇幻靈感與動人瞬間</p>
            </header>
            {isLoading ? (
              <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border" role="status"></div>
              </div>
            ) : (
              <>
                <div className="row g-4">
                {articles.map((article) => (
                    <div className="col-md-4" key={article.id}>
                        <div className="card h-100 border-0 shadow-sm hover-shadow transition">
                            <div
                                className="card-img-top"
                                style={{
                                    height: '200px',
                                    backgroundImage: `url(${article.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <small className="text-primary fw-bold">{article.tag?.[0] || '品牌故事'}</small>
                                    <small className="text-muted">{new Date(article.create_at).toLocaleDateString()}</small>
                                </div>
                                <h5 className="card-title fw-bold">{article.title}</h5>
                                <p className="card-text text-muted text-truncate-2">{article.description}</p>
                                <Link to={`/article/${article.id}`} className="btn btn-outline-dark btn-sm stretched-link">
                                    閱讀更多
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
              <div className="d-flex justify-content-center mt-5">
              <Pagination pagination={pagination} changePage={fetchArticles} />
              </div>
            </>
          )}
        </div>
    )
}; 
export default Blog;