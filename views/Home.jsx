// src/views/Home.jsx
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <div className="home-page">

      {/* HERO */}
      <section className="hero-section">
        <div className="hero-bg" />

        {/* 星空 */}
        <div className="stars">
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              className="star"
              initial={{ opacity: 0, y: Math.random() * 800 }}
              animate={{ opacity: [0, 1, 0], y: -50 }}
              transition={{ duration: 4 + Math.random() * 4, repeat: Infinity }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            讓童話不只是故事，<br />
            <span className="highlight">而是你的日常生活。</span>
          </h1>

          <p className='text-black'>
            精選迪士尼與皮克斯正版小物，從《玩具總動員》的冒險到《米奇》的經典，
            為你的專屬空間注入 100% 的奇幻魔法。
          </p>

          <Link to="/products">
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即進入魔法世界
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="features-section">
        <div className="container text-center">
          <h2>為什麼選擇我們的魔法店鋪？</h2>

          <div className="row g-4">
            {[
              { icon: '✨', title: '100% 正版魔法', desc: '每一件商品都經過官方正式授權，守護您最珍貴的童年回憶。' },
              { icon: '🚀', title: '閃電快遞服務', desc: '如同《怪獸電力公司》的傳送門，下單後火速出貨，驚喜不必久候。' },
              { icon: '🎁', title: '暖心禮品包裝', desc: '我們重視每一份驚喜，提供專屬角色主題包裝，送禮更有面子。' },
            ].map((item, i) => (
              <div key={i} className="col-md-4">
                <motion.div className="feature-card" whileHover={{ y: -10 }}>
                  <div className="icon">{item.icon}</div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="story-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <motion.img
                className="story-img"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                src="https://plus.unsplash.com/premium_vector-1740391235787-d77c1fb3e973?q=80&w=735"
              />
            </div>

            <div className="col-md-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <span className="tag">Our Mission</span>

                <h2>
                  這不只是收藏，<br />而是一段關於愛與勇敢的冒險。
                </h2>

                <p>
                  我們相信，每一個角色背後都有一段動人的力量。不論是胡迪對友情的執著、艾莎尋找自我的勇氣，還是米奇對生活的樂觀。
                </p>

                <p>
                  我們的任務，是將這些「正能量」實體化，讓它們在你的書桌、床頭，甚至辦公室裡，隨時為你加油打氣。
                </p>

                <Link to="/products">
                  <button className="btn-outline">探索所有系列</button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2>準備好開啟你的冒險了嗎？</h2>

          <p>現在加入會員，首筆訂單享 9 折魔法優惠！</p>

          <Link to="/products">
            <motion.button className="btn-primary" whileHover={{ scale: 1.05 }}>
              開始購物
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;