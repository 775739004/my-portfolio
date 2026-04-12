import React, { useState, useEffect, useRef } from 'react';

// --- 数据部分 ---
const personalInfo = {
  name: "周辉",
  enName: "Jimmy",
  title: "3D视觉设计师 / 动画师",
  phone: "13052223179",
  email: "775739004@qq.com",
  wechat: "JimmyZ1106",
  location: "上海市",
  degree: "本科",
  bilibili: "https://space.bilibili.com/411572714",
  intro: "深耕照明、电商、汽车行业近十年经验。具备独立完成从项目创意到后期制作的全流程。擅长使用虚幻引擎(UE5)、Blender等构建极具沉浸感的视觉体验。"
};

const skills = [
  "3DS Max", "Blender", "虚幻引擎 (UE5)", "Twinmotion", "Substance 3D Painter", "After Effects", "Photoshop", "AI 辅助设计"
];

const experiences = [
  {
    period: "2021.05 - 至今",
    company: "上海三思电子工程有限公司",
    role: "3D设计组长",
    desc: "负责项目整体创意设计，跨部门沟通协调，保障项目顺利运行。统筹大型数字可视化及沉浸式视频片源制作。"
  },
  {
    period: "2019.09 - 2021.05",
    company: "深圳名家汇科技股份有限公司",
    role: "3D设计组长",
    desc: "负责项目整体创意设计，主导多个千万级项目落地，涵盖数字孪生与室内外漫游动画开发。"
  },
  {
    period: "2016.10 - 2019.09",
    company: "上海领路人科技有限公司",
    role: "3D设计师",
    desc: "负责项目的模型、渲染、粒子特效，动态视频输出，主导汽车广告及电商产品动效视觉表现。"
  }
];

const portfolioCategories = [
  {
    categoryId: "video",
    categoryName: "动态视频 & 交互开发",
    desc: "虚幻引擎 UE5 动画 / 展厅漫游 / 汽车动态表现",
    items: [
      { 
        id: "v1", title: "小米 SU7", brand: "汽车动态视频", 
        img: "https://i.postimg.cc/pdtmGpdR/su7.png", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=116391248201263&bvid=BV1XzDDBxEup&cid=37447208423&p=1" 
      },
      { 
        id: "v2", title: "Chanel粉色邂逅香水", brand: "美妆动态视频", 
        img: "https://i.postimg.cc/YSwvnhSt/chanel.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=116391231425518&bvid=BV1Q6DDBREu3&cid=37447207065&p=1" 
      },
      { 
        id: "v3", title: "Lumina吹风机", brand: "吹风机动态视频", 
        img: "https://i.postimg.cc/JhWs6GhW/lumina.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=116391231358109&bvid=BV1h6DDBREyZ&cid=37447141002&p=1" 
      },
      { 
        id: "v4", title: "雅诗兰黛小棕瓶", brand: "美妆动态视频", 
        img: "https://i.postimg.cc/rpLDnKpk/ysld.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=116391248202835&bvid=BV1QzDDBxEHp&cid=37447271181&p=1" 
      },
      { 
        id: "v5", title: "奔驰交互设计", brand: "汽车交互设计", 
        img: "https://i.postimg.cc/y6F3Rh6L/benz.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=113577574795283&bvid=BV14tzZY7EYM&cid=27127451276&p=1" 
      },
      { 
        id: "v6", title: "室内可视化交互设计", brand: "室内交互设计", 
        img: "https://i.postimg.cc/h49Qm84C/shinei.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
        videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=317694844&bvid=BV1YP411W7Jc&cid=1246777944&p=1" 
      },
    ]
  },
  {
    categoryId: "product",
    categoryName: "产品渲染",
    desc: "美妆 / 家电 / 3C数码 / 逼真材质表现",
    items: [
      { 
        id: "p1", title: "雅诗兰黛 小棕瓶", brand: "护肤品", 
        desc: "针对高反光玻璃材质与液体质感的极致打磨，棚拍级布光重构。",
        img: "https://i.postimg.cc/vmmw7PZb/07ysld.jpg",
        galleryLayout: 'full', 
        gallery: [
          "https://i.postimg.cc/FKKXbPs6/01ysld.jpg", 
          "https://i.postimg.cc/HLL10SsP/02ysld.jpg", 
          "https://i.postimg.cc/cJJG7D4P/03ysld.jpg",
          "https://i.postimg.cc/CKKpCvLX/04ysld.jpg",
          "https://i.postimg.cc/LssFky8F/05ysld.jpg",
          "https://i.postimg.cc/HLL10SkT/06ysld.jpg",
          "https://i.postimg.cc/TPPvjk3R/08ysld.jpg",
          "https://i.postimg.cc/ZqqzPf5K/09ysld.jpg",
          "https://i.postimg.cc/6QQxVHp3/10ysld.jpg",
          "https://i.postimg.cc/mrrW3dgk/11ysld.jpg"
        ]
      },
      { 
        id: "p2", title: "Oberni 婴儿奶瓶", brand: "母婴产品", 
        desc: "展现瓷白瓶身与金属质感的碰撞，以及膏体细节渲染。",
        img: "https://i.postimg.cc/zBZZmqFP/2oberni.jpg",
        galleryLayout: 'portrait', 
        gallery: [
          "https://i.postimg.cc/Pq8sFC1n/1oberni.jpg",
          "https://i.postimg.cc/XvySDr90/3oberni.jpg",
          "https://i.postimg.cc/TPWMHKn6/4oberni.jpg",
          "https://i.postimg.cc/7688vqnF/5oberni.jpg",
          "https://i.postimg.cc/C1TTyw4y/6oberni.jpg",
          "https://i.postimg.cc/7688vqNy/7oberni.jpg"
        ]
      },
      { 
        id: "p3", title: "往复式电动 剃须刀", brand: "电商海报", 
        desc: "科技感暗调布光，拉丝金属材质与内部结构爆炸图解析渲染。",
        img: "https://i.postimg.cc/RCXmnjBd/1txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'grid',
        gallery: [
          "https://i.postimg.cc/RCXmnjBd/1txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/Y2b7mJH6/2txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/bY3P2Khn/3txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/CL5gCmMp/4txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/SNRhLDSB/5txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/Yq0HNb2w/6txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/J40L3P74/8txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/tR2bVLjN/9txd.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ]
      },
      { 
        id: "p4", title: "黑金轻奢 电动牙刷", brand: "电商海报", 
        desc: "黑金轻奢电动牙刷 超写实电商级高端质感产品渲染。",
        img: "https://i.postimg.cc/13kx0S43/1yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'grid',
        gallery: [
          "https://i.postimg.cc/13kx0S43/1yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/YSY5bPmH/2yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/kg0rNCDD/3yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/QM120zWs/4yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/xdMwtZb9/5yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/JhZfPFB7/6yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/XvdRQPyj/7yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/vZJR7yDT/8yashua.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ]
      },
      { 
        id: "p5", title: "小米 SU7", brand: "电商海报", 
        desc: "小米 SU7 高性能纯电汽车 全场景高端写实质感渲染。",
        img: "https://i.postimg.cc/MH8nMgJc/8SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'grid',
        gallery: [
          "https://i.postimg.cc/MH8nMgJc/8SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/9037PrT8/3SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/KjXM7RLC/2SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/gj9ZynRC/1SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/Gt0yPHYV/4SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/0jpJVP00/5SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/ydRJNst4/6SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/mkGPzKWt/7SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/90jDRsH0/9SU7.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        ]
      },
      { 
        id: "p6", title: "轻奢 扫拖机器人", brand: "电商海报", 
        desc: "轻奢扫拖机器人 电商级写实质感渲染。",
        img: "https://i.postimg.cc/GtGBj3mr/2SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'grid',
        gallery: [
          "https://i.postimg.cc/GtGBj3mr/2SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/gcZ6psq6/1SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/D0LWcfwv/3SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/hvTJ04t4/4SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          "https://i.postimg.cc/T2DWx0q7/5SDJQR.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        ]
      }
    ]
  },
  {
    categoryId: "interior",
    categoryName: "室内外渲染",
    desc: "空间光影 / 建筑漫游 / 室内设计表现",
    items: [
      { 
        id: "i1", title: "现代极简客厅", brand: "空间渲染", 
        desc: "一线山海独栋奢墅，定制高阶生活主场，枕山海而居，赴极简自然的奢居之约。",
        img: "https://i.postimg.cc/RFLKQw1g/07bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'full',
        gallery: [
          "https://i.postimg.cc/RFLKQw1g/07bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/Pxj1wSDF/01bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/mDs7Hm9m/02bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/0Qs7wVSX/03bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/9Mhy7L98/04bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/j54PQy6Z/05bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/9MYZtyPp/06bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/Y9zYfQN8/08bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/xC3MyLGs/09bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/cHBwMf75/11bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/zBFKSTwc/12bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/85mMBLd3/13bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/1trwcDcx/14bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/xC3MyLGw/15bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/V6WnBXBQ/16bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/3RFmC2CT/17bieshu.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80"
        ]
      }
    ]
  },
  {
    categoryId: "sp",
    categoryName: "SP 次世代材质",
    desc: "Substance Painter / 细节刻画 / 做旧处理",
    items: [
      { 
        id: "s1", title: "武士刀", brand: "模型材质", 
        desc: "硬表面做旧，刀刃血槽与护手处的划痕、氧化、泥土等复杂分层材质刻画。",
        img: "https://i.postimg.cc/Wbd3nMT8/AK-03.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        galleryLayout: 'full',
        gallery: [
          "https://i.postimg.cc/Wbd3nMT8/AK-03.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/hPXjr9KR/AK-01.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/pXmTZDR1/AK-02.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/RVWFRc4G/AK-04.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/CLR1NjwL/AK-05.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/905hYqpx/01dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/GtwCxsQ7/02dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/GtwCxsQg/03dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/PJsjQ84c/04dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/J0VL5Bq9/05dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/HnDg972R/06dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80",
          "https://i.postimg.cc/76T4zN3v/07dao.png?ixlib=rb-4.0.3&auto=format&fit=crop&w=2752&q=80"
        ]
      }
    ]
  }
];

const allFeaturedItems = portfolioCategories.flatMap(cat => 
  cat.items.map(item => ({...item, categoryName: cat.categoryName}))
);

// --- 基础组件 ---
const FadeInScroll = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      } ${className}`}
    >
      {children}
    </div>
  );
};

const GlassCard = ({ children, className = "" }) => (
  <div className={`bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] rounded-[2rem] p-8 hover:shadow-[0_16px_40px_0_rgba(31,38,135,0.12)] hover:border-white/80 hover:bg-white/50 transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// --- 主应用 ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [selectedProject, setSelectedProject] = useState(null); 
  const [zoomedImage, setZoomedImage] = useState(null); 
  const [activeVideo, setActiveVideo] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProject]);

  useEffect(() => {
    if (zoomedImage || activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [zoomedImage, activeVideo]);

  const handleProjectClick = (item) => {
    if (item.videoUrl) {
      setActiveVideo(item.videoUrl);
    } else if (item.link) {
      window.open(item.link, '_blank');
    } else {
      setSelectedProject(item);
    }
  };

  const navigateTo = (page) => {
    setSelectedProject(null);
    setCurrentPage(page);
  };

  // ==== 渲染卡片内容 ====
  const renderCard = (item, isFeatured = false) => {
    const isVideo = !!item.link || !!item.videoUrl;
    
    return (
      <div 
        onClick={() => handleProjectClick(item)} 
        className="group relative rounded-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.05)] aspect-[4/3] cursor-pointer hover:shadow-[0_16px_40px_rgba(0,0,0,0.12)] transition-shadow duration-500"
      >
        <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000 ease-out"/>
        <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {isVideo ? (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-bold text-blue-600 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1.5">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span> 播放视频
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-1.5">
            查看图集 ▤
          </div>
        )}

        <div className="absolute inset-x-4 bottom-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
          <div className="bg-white/85 backdrop-blur-xl border border-white/60 rounded-2xl p-5 shadow-lg flex flex-col gap-1">
            <span className="text-xs font-bold text-slate-500 tracking-wider uppercase">
              {isFeatured ? item.categoryName : item.brand}
            </span>
            <h3 className="text-xl font-bold text-slate-900 truncate">{item.title}</h3>
          </div>
        </div>
      </div>
    );
  };

  // ==== 渲染: 首页 ====
  const renderHome = () => (
    <div className="space-y-32">
      <section className="relative min-h-[90vh] flex flex-col justify-center pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none overflow-hidden mix-blend-overlay opacity-30 z-0">
          <h1 className="text-[15vw] font-black text-slate-300 tracking-tighter leading-none animate-pulse-slow">
            VISION
          </h1>
        </div>
        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <FadeInScroll>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/5 border border-slate-900/10 backdrop-blur-md mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-blue-500 absolute"></span>
                <span className="text-sm font-semibold text-slate-700 tracking-wide">AVAILABLE FOR WORK</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                构建沉浸式 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-teal-400">数字视觉体验</span>
              </h1>
            </FadeInScroll>
            <FadeInScroll delay={200}>
              <p className="text-xl md:text-2xl text-slate-500 font-light max-w-2xl leading-relaxed">
                我是 {personalInfo.name} ({personalInfo.enName})，一名前沿的 <strong>{personalInfo.title}</strong>。致力于将极简美学与硬核三维技术完美融合。
              </p>
            </FadeInScroll>
            <FadeInScroll delay={400}>
              <div className="flex flex-wrap gap-4 pt-4">
                <button onClick={() => navigateTo('portfolio')} className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 hover:scale-105 hover:shadow-2xl hover:shadow-slate-900/20 transition-all duration-300 flex items-center gap-2">
                  浏览精选作品 <span className="text-xl transition-transform group-hover:translate-x-1">→</span>
                </button>
                <a href="#contact" className="px-8 py-4 bg-white border border-slate-200 text-slate-800 rounded-full font-medium hover:bg-slate-50 hover:border-slate-300 hover:scale-105 transition-all duration-300">
                  联系我
                </a>
              </div>
            </FadeInScroll>
          </div>
          <div className="lg:col-span-5 relative">
            <FadeInScroll delay={600}>
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 rounded-[3rem] blur-2xl animate-pulse-slow"></div>
              <GlassCard className="relative z-10 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {personalInfo.name[0]}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400 font-medium tracking-widest uppercase">Base in</p>
                    <p className="text-slate-800 font-bold">{personalInfo.location}</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">关于我</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">{personalInfo.intro}</p>
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-400 tracking-widest uppercase">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {['UE5交互', 'CGI渲染', '汽车/电商', '空间漫游'].map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-white/60 border border-white/80 rounded-lg text-xs font-semibold text-slate-700">{tag}</span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </FadeInScroll>
          </div>
        </div>
      </section>

      {/* 履历 */}
      <section id="resume" className="relative z-10 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-8">
          <FadeInScroll>
            <h2 className="text-4xl font-extrabold text-slate-900">核心引擎<br/><span className="text-slate-400">&</span> 工作流</h2>
            <p className="text-slate-500 mt-4">跨软件协作，选择最适合呈现极度真实感与美学体验的生产管线。</p>
          </FadeInScroll>
          <FadeInScroll delay={200}>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <div key={index} className="px-5 py-3 bg-white/40 backdrop-blur-sm border border-white/60 rounded-2xl text-slate-700 font-medium shadow-sm hover:-translate-y-1 hover:shadow-md hover:bg-white/80 transition-all duration-300">
                  {skill}
                </div>
              ))}
            </div>
          </FadeInScroll>
        </div>
        <div className="md:col-span-7">
          <FadeInScroll delay={300}>
            <GlassCard className="space-y-8">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center"><span className="w-2 h-2 bg-blue-500 rounded-full"></span></span> 
                职业履历
              </h3>
              <div className="relative border-l-2 border-slate-100 ml-3 space-y-10">
                {experiences.map((exp, index) => (
                  <div key={index} className="relative pl-8 group">
                    <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-white border-4 border-slate-200 group-hover:border-blue-400 group-hover:scale-125 transition-all duration-300"></div>
                    <div className="text-sm font-bold text-blue-500 tracking-wider mb-1">{exp.period}</div>
                    <div className="text-xl font-bold text-slate-800">{exp.company}</div>
                    <div className="text-md font-medium text-slate-500 mb-3">{exp.role}</div>
                    <p className="text-slate-600 text-sm leading-relaxed max-w-lg">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </FadeInScroll>
        </div>
      </section>

      {/* 首页精选 */}
      <section className="relative z-10 pt-10">
        <FadeInScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-2">精选一瞥</h2>
              <p className="text-slate-500">展示部分极具代表性的视觉表现。</p>
            </div>
            <button onClick={() => navigateTo('portfolio')} className="group flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 transition-colors">
              分类查看所有作品 <span className="transform group-hover:translate-x-2 transition-transform">→</span>
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {allFeaturedItems.slice(0, 2).map((item, index) => (
              <FadeInScroll key={item.id} delay={index * 150}>
                {renderCard(item, true)}
              </FadeInScroll>
            ))}
          </div>
        </FadeInScroll>
      </section>

      {/* 联系 */}
      <section id="contact" className="pb-24 pt-10">
        <FadeInScroll>
          <GlassCard className="text-center py-20 relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent opacity-50 pointer-events-none"></div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 relative z-10 text-slate-900 tracking-tight">准备好开启下一个项目了吗？</h2>
            <div className="flex flex-wrap justify-center gap-6 relative z-10 mt-12">
              <a href={`tel:${personalInfo.phone}`} className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all font-medium">📞 {personalInfo.phone}</a>
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-3 px-8 py-4 bg-white shadow-sm border border-slate-200 text-slate-800 rounded-full hover:shadow-md hover:-translate-y-1 hover:border-slate-300 transition-all font-medium">✉️ {personalInfo.email}</a>
            </div>
          </GlassCard>
        </FadeInScroll>
      </section>
    </div>
  );

  // ==== 渲染: 作品集概览页 ====
  const renderPortfolio = () => (
    <div className="pt-24 pb-32 min-h-screen">
      <FadeInScroll>
        <button onClick={() => navigateTo('home')} className="group flex items-center gap-2 px-5 py-2.5 bg-white/50 backdrop-blur-md border border-white/60 rounded-full shadow-sm hover:bg-white/80 hover:shadow-md transition-all text-slate-700 font-medium mb-10">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 返回概览
        </button>
        <div className="mb-20">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">完整作品集</h1>
          <p className="text-xl text-slate-500 max-w-3xl">分门别类探索我在产品、空间、视频及互动方面的数字视觉成果。</p>
        </div>
      </FadeInScroll>

      <div className="space-y-32">
        {portfolioCategories.map((category) => (
          <div key={category.categoryId} className="relative">
            <FadeInScroll>
              <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 pb-6 mb-10">
                <div>
                  <h2 className="text-3xl font-extrabold text-slate-900 relative inline-block">
                    <span className="absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>
                    {category.categoryName}
                  </h2>
                  <p className="text-slate-500 mt-2 ml-2">{category.desc}</p>
                </div>
              </div>
            </FadeInScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item, index) => (
                <FadeInScroll key={item.id} delay={(index % 3) * 150}>
                  {renderCard(item, false)}
                </FadeInScroll>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // ==== 渲染: 作品图集详情页 ====
  const renderDetail = () => {
    const isGrid = selectedProject.galleryLayout === 'grid';
    const isPortrait = selectedProject.galleryLayout === 'portrait';
    
    const containerClass = (isGrid || isPortrait) 
      ? "grid grid-cols-1 md:grid-cols-2 gap-8" 
      : "flex flex-col gap-12";

    return (
      <div className="pt-24 pb-32 min-h-screen">
        <FadeInScroll>
          <button 
            onClick={() => setSelectedProject(null)}
            className="group flex items-center gap-2 px-5 py-2.5 bg-white/60 backdrop-blur-md border border-white/60 rounded-full shadow-sm hover:bg-white/90 hover:shadow-md transition-all text-slate-700 font-medium mb-12"
          >
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> 返回列表
          </button>
          
          <div className="grid md:grid-cols-2 gap-10 items-end mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 text-sm font-bold tracking-wider uppercase mb-4">
                {selectedProject.brand}
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {selectedProject.title}
              </h1>
            </div>
            {selectedProject.desc && (
              <p className="text-lg text-slate-500 leading-relaxed border-l-2 border-blue-500/30 pl-4">
                {selectedProject.desc}
              </p>
            )}
          </div>
        </FadeInScroll>

        <div className={containerClass}>
          {selectedProject.gallery && selectedProject.gallery.length > 0 ? (
            selectedProject.gallery.map((imgUrl, index) => (
              <FadeInScroll key={index} delay={index * 100}>
                <div 
                  className={`group relative rounded-[2rem] overflow-hidden shadow-xl border border-white/40 w-full cursor-zoom-in ${isPortrait ? 'aspect-[3/4]' : ''}`}
                  style={!isPortrait ? { aspectRatio: '2752 / 1536' } : {}}
                  onClick={() => setZoomedImage(imgUrl)}
                >
                  <img 
                    src={imgUrl} 
                    alt={`${selectedProject.title} detail ${index}`}
                    className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3)] rounded-[2rem] pointer-events-none"></div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full p-4 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-opacity duration-300 pointer-events-none">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
                  </div>
                </div>
              </FadeInScroll>
            ))
          ) : (
            <div className="py-20 text-center col-span-full text-slate-400">
              <p>暂无更多详情图</p>
            </div>
          )}
        </div>

        <FadeInScroll delay={200}>
          <div className="mt-20 pt-10 border-t border-slate-200 text-center">
            <button 
              onClick={() => setSelectedProject(null)}
              className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-blue-600 hover:shadow-xl transition-all duration-300"
            >
              ← 浏览其他作品
            </button>
          </div>
        </FadeInScroll>
      </div>
    );
  };

  const renderCurrentContent = () => {
    if (selectedProject) return renderDetail();
    if (currentPage === 'home') return renderHome();
    return renderPortfolio();
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden selection:bg-blue-200">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[-10%] w-[60vw] h-[60vw] bg-blue-200/50 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-blob" style={{ transform: `translateY(${scrollY * 0.15}px)` }} />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] bg-purple-200/40 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-blob animation-delay-2000" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[70vw] h-[70vw] bg-teal-100/40 rounded-full blur-[120px] mix-blend-multiply opacity-60 animate-blob animation-delay-4000" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
      </div>

      <nav className="fixed top-0 w-full z-40 px-6 py-4 transition-all duration-300">
        <div className={`max-w-6xl mx-auto flex justify-between items-center rounded-2xl px-6 py-4 transition-all duration-500 ${scrollY > 20 ? 'bg-white/60 backdrop-blur-xl shadow-sm border border-white/50' : 'bg-transparent'}`}>
          <div onClick={() => navigateTo('home')} className="text-xl font-black tracking-widest text-slate-900 cursor-pointer hover:text-blue-600 transition-colors">
            {personalInfo.enName}<span className="text-slate-400">.DESIGN</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm font-bold text-slate-600">
            <button onClick={() => navigateTo('home')} className={`hover:text-blue-600 transition-colors ${!selectedProject && currentPage === 'home' ? 'text-blue-600' : ''}`}>履历概览</button>
            <button onClick={() => navigateTo('portfolio')} className={`hover:text-blue-600 transition-colors ${!selectedProject && currentPage === 'portfolio' ? 'text-blue-600' : ''}`}>作品集</button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-6">
        {renderCurrentContent()}
      </main>

      <footer className="text-center py-10 text-slate-400 text-sm relative z-10 bg-white/20 backdrop-blur-sm border-t border-white/30 mt-12">
        <p>© {new Date().getFullYear()} {personalInfo.name} ({personalInfo.enName}). Crafted with React.</p>
      </footer>

      {/* --- 图片放大模态框 --- */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm cursor-zoom-out animate-fadeIn"
          onClick={() => setZoomedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all duration-300"
            onClick={(e) => { e.stopPropagation(); setZoomedImage(null); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <img 
            src={zoomedImage} 
            alt="Zoomed Detail" 
            className="max-w-[95vw] max-h-[90vh] object-contain rounded-xl shadow-2xl animate-scaleIn select-none"
          />
        </div>
      )}

      {/* --- 视频播放模态框 --- */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          {/* 关闭按钮 */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 backdrop-blur-md transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); setActiveVideo(null); }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          {/* 视频 iframe 容器 */}
          <div 
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl animate-scaleIn mx-4 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe 
              src={activeVideo} 
              className="w-full h-full"
              scrolling="no" 
              border="0" 
              frameBorder="no" 
              framespacing="0" 
              allowFullScreen={true}
              referrerPolicy="no-referrer" // 破解B站防盗链，防止黑屏或报错
            ></iframe>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); } 50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-blob { animation: blob 12s infinite; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f8fafc; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}} />
    </div>
  );
}