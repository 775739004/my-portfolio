<!DOCTYPE html>
<html lang="zh-CN" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>周辉 (Jimmy) - 3D视觉设计师 / 动画师个人作品集</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- React 18 & ReactDOM CDN -->
    <script src="https://unpkg.com/react@18/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js" crossorigin></script>
    <!-- Babel Standalone CDN -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        background: #fff;
        font-family: 'Inter', Arial, Helvetica, sans-serif;
        color: #0f172a;
        overflow-x: hidden;
        user-select: none;
      }

      /* 首屏 Hero 样式 */
      .hero-section {
        text-align: center;
        padding-top: 60px;
        padding-bottom: 20px;
      }

      .hero-section h1 {
        font-size: 72px;
        line-height: 0.95;
        font-weight: 800;
        letter-spacing: -3px;
        color: #0f172a;
      }

      .hero-section p {
        margin-top: 24px;
        color: #64748b;
        font-size: 18px;
        letter-spacing: -0.2px;
      }

      /* 图片区域蒙版与滑动长条 */
      .gallery-wrapper {
        width: 100%;
        overflow: hidden;
        padding: 28px 0;
        -webkit-mask-image: linear-gradient(
          to right,
          transparent,
          black 8%,
          black 92%,
          transparent
        );
        mask-image: linear-gradient(
          to right,
          transparent,
          black 8%,
          black 92%,
          transparent
        );
      }

      .gallery-track {
        display: flex;
        gap: 18px;
        width: max-content;
        cursor: grab;
        user-select: none;
        will-change: transform;
      }

      .gallery-track.dragging {
        cursor: grabbing;
      }

      /* 16:9 横向照片卡片尺寸 */
      .gallery-card {
        width: 300px;
        aspect-ratio: 16 / 9;
        overflow: hidden;
        flex-shrink: 0;
        border-radius: 16px;
        position: relative;
        transition: transform .35s ease, box-shadow .35s ease;
        background: #f1f5f9;
      }

      .gallery-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        pointer-events: none;
      }

      .gallery-card:hover {
        transform: scale(1.08);
        z-index: 10;
        box-shadow: 0 20px 35px rgba(0,0,0,0.12);
      }

      /* 防盗图属性与高精度画质保障 */
      img {
        -webkit-user-drag: none;
        -khtml-user-drag: none;
        -moz-user-drag: none;
        -o-user-drag: none;
        user-select: none;
        -webkit-user-select: none;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: crisp-edges;
      }

      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #fff; }
      ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }

      /* 弹窗专用精致内嵌滚动条 */
      .custom-modal-scroll::-webkit-scrollbar { width: 6px; }
      .custom-modal-scroll::-webkit-scrollbar-track { background: transparent; margin: 12px 0; }
      .custom-modal-scroll::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 9999px; }
      .custom-modal-scroll::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
    </style>
</head>
<body class="bg-white text-slate-900 antialiased">
    <div id="root"></div>

    <script type="text/babel">
      const { useState, useEffect, useRef, useMemo } = React;

      const personalInfo = {
        name: "周辉",
        enName: "Jimmy",
        title: "3D视觉设计师 / 动画师",
        phone: "13052223179",
        email: "775739004@qq.com",
        wechat: "JimmyZ1106",
        location: "上海市",
        bilibili: "https://space.bilibili.com/411572714",
        intro: "深耕照明亮化、消费电子、汽车广告及数字孪生领域近10年。具备独立完成从项目创意到后期制作的全流程。主要负责动画、模型、渲染、特效、虚幻引擎蓝图开发，有丰富的室内外日夜景动画漫游效果、汽车广告宣传图/视频、电商产品宣传图/动效视频、数字孪生、可视化交互程序开发、裸眼 3D 及沉浸式视频片源制作，熟练运用 AI 辅助设计管线优化效率，精通多款 DCC 软件与引擎协同作业。"
      };

      const skills = [
        "3DS Max", "Blender", "虚幻引擎 (UE5)", "Twinmotion", "Substance 3D Painter", "After Effects", "Photoshop", "AI 辅助设计"
      ];

      const experiences = [
        {
          period: "2021.05 - 至今",
          company: "上海三思电子工程有限公司",
          role: "3D设计组长",
          desc: "创意把控：主导项目整体视觉创意设计与技术方案落地，确保项目艺术表现与商业目标高度契合。\n流程管理：负责组内任务分配与进度追踪，协调跨部门资源解决 UE 蓝图开发、大型场景渲染等核心技术难题。\n标杆案例：主导深圳体育场全球首例毫米级开合屏视觉模拟、苏州科技馆 26米巨型球幕沉浸式影片制作、上海八万人体育场近万平天幕亮化设计。"
        },
        {
          period: "2019.09 - 2021.05",
          company: "深圳名家汇科技股份有限公司",
          role: "3D设计组长",
          desc: "负责项目整体创意设计，跨部门沟通协调，保障城市级夜景亮化与数字孪生项目顺利运行与动态视觉输出。"
        },
        {
          period: "2016.10 - 2019.09",
          company: "上海领路人科技有限公司",
          role: "3D设计师",
          desc: "负责项目的模型、渲染、粒子特效，动态视频输出，主导汽车广告及电商产品动效视觉表现。"
        }
      ];

      const projectExperiences = [
        {
          name: "某部队全息 Cave 屏设计",
          role: "3D设计组长",
          period: "2025.01 - 2025.06",
          desc: "部队信息化作战 2000 平方 CAVE 屏和全息屏制作（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        },
        {
          name: "苏州科技馆",
          role: "3D设计组长",
          period: "2024.06 - 2024.09",
          desc: "直径 26 米的球幕，虚拟沉浸式影片制作（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        },
        {
          name: "深圳体育场",
          role: "3D设计组长",
          period: "2023.06 - 2024.09",
          desc: "深圳体育场巨型屏开合设计，全球第一例开合稳定毫米级精度对接（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        },
        {
          name: "上海八万人体育场",
          role: "3D设计组长",
          period: "2021.05 - 2022.02",
          desc: "近 10000 平的体育场天幕夜景亮化设计（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        },
        {
          name: "华为会议一体机",
          role: "3D设计组长",
          period: "2021.06 - 2021.12",
          desc: "消费级产品华为会议一体机，设计外观制作售后安装动画（项目费用过亿，已上线各大电商平台）。",
          tag: "过亿 / 电商上线"
        },
        {
          name: "上海三思 LED 灯具产品",
          role: "3D设计组长",
          period: "2021.06 - 2021.12",
          desc: "消费级产品各类 LED 灯具动态视频制作，产品网页效果图设计（已上线各大电商平台）。",
          tag: "电商上线"
        },
        {
          name: "埃及新首都 CBD",
          role: "3D设计师",
          period: "2020.06 - 2020.09",
          desc: "埃及新首都 CBD 城市夜景亮化设计、产品效果、动态视觉（项目费用过十亿，部分已落地）。",
          tag: "过十亿 / 部分落地"
        },
        {
          name: "成都天府机场",
          role: "3D设计师",
          period: "2018.04 - 2019.04",
          desc: "机场建筑外立面夜景亮化设计（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        },
        {
          name: "杭州萧山机场",
          role: "3D设计师",
          period: "2017.06 - 2017.10",
          desc: "机场建筑外立面夜景亮化设计（项目费用过亿，已落地）。",
          tag: "过亿 / 已落地"
        }
      ];

      const education = [
        { period: "2020.09 - 2023.01", school: "上海华东师范大学", major: "公共关系学", degree: "本科" }
      ];

      const portfolioCategories = [
        {
          categoryId: "video",
          categoryName: "动态视频 & 交互开发",
          desc: "虚幻引擎 UE5 动画 / 展厅漫游 / 汽车动态表现",
          items: [
            { 
              id: "v1", title: "Porsche Panamera", brand: "汽车动态视频设计", 
              img: "https://i.postimg.cc/jdXbwCvQ/porsche.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=116407555591280&bvid=BV1v7QjBiEYt&cid=37523032809&p=1" 
            },
            { 
              id: "v2", title: "建筑漫游", brand: "建筑漫游动态视频设计", 
              img: "https://i.postimg.cc/x8bw3YmL/jian-zhu-man-you.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087854988764&bvid=BV1kggp6cEjt&cid=40875919034&p=1" 
            },
            { 
              id: "v3", title: "扫地机器人", brand: "扫地机器人动态视频设计", 
              img: "https://i.postimg.cc/F152PqbL/sao-de-ji-qi-ren.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087871699004&bvid=BV1pMgp6aEU7&cid=40875921331&p=1" 
            },
            { 
              id: "v4", title: "雪花啤酒", brand: "雪花啤酒动态视频设计", 
              img: "https://i.postimg.cc/LhKry7k3/xue-hua-pi-jiu.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087871698951&bvid=BV1pMgp6aEUK&cid=40875920243&p=1" 
            },
            { 
              id: "v5", title: "RIO鸡尾酒", brand: "RIO鸡尾酒动态视频设计", 
              img: "https://i.postimg.cc/sD3FhF2k/RIO-ji-wei-jiu.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087787812077&bvid=BV1JLgp6oEtq&cid=40875263174&p=1" 
            },
            { 
              id: "v6", title: "机械手表", brand: "机械手表动态设计", 
              img: "https://i.postimg.cc/fy0GfZdx/ji-xie-shou-biao.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087771035346&bvid=BV1PUgp6NEhR&cid=40874213908&p=1" 
            },
            { 
              id: "v7", title: "XBOX游戏手柄", brand: "XBOX游戏手柄动态设计", 
              img: "https://i.postimg.cc/d3TbjvCd/XBOX-shou-bing.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=117087452268426&bvid=BV1X3gW6EEDy&cid=40872447366&p=1" 
            },
            { 
              id: "v8", title: "室内可视化交互设计", brand: "室内交互设计", 
              img: "https://i.postimg.cc/g25J32x7/shinei.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=317694844&bvid=BV1YP411W7Jc&cid=1246777944&p=1" 
            },
            { 
              id: "v9", title: "奔驰交互设计", brand: "汽车交互设计", 
              img: "https://i.postimg.cc/W1K301dX/benz.webp", 
              videoUrl: "https://player.bilibili.com/player.html?isOutside=true&aid=113577574795283&bvid=BV14tzZY7EYM&cid=27127451276&p=1" 
            }
          ]
        },
        {
          categoryId: "product",
          categoryName: "产品渲染",
          desc: "美妆 / 家电 / 3C数码 / 逼真材质表现",
          items: [
            { 
              id: "p1", title: "SUNBURST CITRUS", brand: "饮料", 
              img: "https://i.postimg.cc/NMfX6CrK/yin-liao-chang-jing4.webp",
              aspectRatio: "1792 / 2400",
              comparisons: [
                { before: "https://i.postimg.cc/MTKB73j5/yin-liao-chang-jing-bai-mo1.webp", after: "https://i.postimg.cc/4dNc62hJ/yin-liao-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/Tw7DCjrW/yin-liao-chang-jing-bai-mo2.webp", after: "https://i.postimg.cc/W3bZGYJ3/yin-liao-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/RFsHX1cf/yin-liao-chang-jing-bai-mo3.webp", after: "https://i.postimg.cc/76Yz3tTL/yin-liao-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/qRb3jc8y/yin-liao-chang-jing-bai-mo4.webp", after: "https://i.postimg.cc/NMfX6CrK/yin-liao-chang-jing4.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/NMJHp81R/yin-liao-chang-jing-bai-mo5.webp", after: "https://i.postimg.cc/TwYbVNWL/yin-liao-chang-jing5.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/V6GCD9jj/yin-liao-chang-jing-bai-mo6.webp", after: "https://i.postimg.cc/0Q2SYXJS/yin-liao-chang-jing6.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/cH9nX7QB/yin-liao-chang-jing-bai-mo7.webp", after: "https://i.postimg.cc/MTKB73jY/yin-liao-chang-jing7.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/0Q2SYXJ9/yin-liao-chang-jing-bai-mo8.webp", after: "https://i.postimg.cc/RFsHX1cH/yin-liao-chang-jing8.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p2", title: "HYDRATION", brand: "运动产品", 
              img: "https://i.postimg.cc/SRnZmfk0/yun-dong-shui-hu-jian-shen-chang-jing.webp",
              comparisons: [
                { before: "https://i.postimg.cc/J0sTR5mF/yun-dong-shui-hu-jian-shen-bai-mo.webp", after: "https://i.postimg.cc/SRnZmfk0/yun-dong-shui-hu-jian-shen-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/rsDhqNcQ/yun-dong-shui-hu-chuang-yi-bai-mo.webp", after: "https://i.postimg.cc/SRnZmfq5/yun-dong-shui-hu-chuang-yi-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/yxDf7yBP/yun-dong-shui-hu-cao-chang-bai-mo.webp", after: "https://i.postimg.cc/RhWPvL9g/yun-dong-shui-hu-cao-chang-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/tJsr9NpG/yun-dong-shui-hu-qi-che-bai-mo.webp", after: "https://i.postimg.cc/0jhVjK2h/yun-dong-shui-hu-qi-che-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/d3g53Ztz/yun-dong-shui-hu-ye-wai-bai-mo.webp", after: "https://i.postimg.cc/NFZdF2jc/yun-dong-shui-hu-ye-wai-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/J0Sp0H4f/yun-dong-shui-hu-ye-wai-bai-mo1.webp", after: "https://i.postimg.cc/C59c5nxY/yun-dong-shui-hu-ye-wai-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/d3g53Ztz/yun-dong-shui-hu-ye-wai-bai-mo.webp", after: "https://i.postimg.cc/NFZdF2jc/yun-dong-shui-hu-ye-wai-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p3", title: "电动牙刷", brand: "3C产品", 
              img: "https://i.postimg.cc/d0M8r048/ke-huan-chang-jing.webp",
              comparisons: [
                { before: "https://i.postimg.cc/XYBfr5cZ/chuang-yi-bai-mo.webp", after: "https://i.postimg.cc/Z5v8WNF8/chuang-yi-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/kgRQ2SFt/chuang-yi-bai-mo2.webp", after: "https://i.postimg.cc/Z5v8WNFF/chuang-yi-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/RZJ7WtQJ/chuang-yi-bai-mo3.webp", after: "https://i.postimg.cc/rwR1D4CS/chuang-yi-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/KYXnBYJC/yu-shi-bai-mo.webp", after: "https://i.postimg.cc/YCL6vFfG/yu-shi-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/Mpf7nBbm/ke-huan-bai-mo.webp", after: "https://i.postimg.cc/d0M8r048/ke-huan-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/nh94XmYS/ye-wai-bai-mo.webp", after: "https://i.postimg.cc/CKyjkKmJ/ye-wai-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/Dw4rSGdx/ye-wai-bai-mo2.webp", after: "https://i.postimg.cc/nL8vBL0d/ye-wai-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/QMLp1M0g/ye-wai-bai-mo3.webp", after: "https://i.postimg.cc/mrxQCr8X/ye-wai-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/9f3GZfJp/ye-wai-bai-mo4.webp", after: "https://i.postimg.cc/k5rxK5fH/ye-wai-chang-jing4.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/W4RMg4X8/ye-wai-bai-mo5.webp", after: "https://i.postimg.cc/rp6SxpQY/ye-wai-chang-jing5.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p4", title: "扫地机器人", brand: "家电产品", 
              img: "https://i.postimg.cc/vBv5Vg86/sao-de-ji-qi-ren2.webp",
              comparisons: [
                { before: "https://i.postimg.cc/1tKDqnRH/sao-de-ji-qi-ren-bai-mo1.webp", after: "https://i.postimg.cc/0QC7wM5h/sao-de-ji-qi-ren1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/bJR1tDYR/sao-de-ji-qi-ren-bai-mo2.webp", after: "https://i.postimg.cc/vBv5Vg86/sao-de-ji-qi-ren2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/SsGcM2QD/sao-de-ji-qi-ren-bai-mo3.webp", after: "https://i.postimg.cc/0QC7wM57/sao-de-ji-qi-ren3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/hj0Vdz4y/sao-de-ji-qi-ren-bai-mo4.webp", after: "https://i.postimg.cc/FRx0LdFc/sao-de-ji-qi-ren4.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/ydT0Zg6p/sao-de-ji-qi-ren-bai-mo5.webp", after: "https://i.postimg.cc/MTY1QMZy/sao-de-ji-qi-ren5.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/zBkTgbDQ/sao-de-ji-qi-ren-bai-mo6.webp", after: "https://i.postimg.cc/76NS2GPn/sao-de-ji-qi-ren6.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p5", title: "手持风扇", brand: "3C产品", 
              img: "https://i.postimg.cc/Kvt3k39g/shou-chi-feng-shan-sha-tan-chang-jing2.webp",
              aspectRatio: "1536 / 2752",
              comparisons: [
                { before: "https://i.postimg.cc/3J2040Ly/shou-chi-feng-shan-shi-nei-bai-mo1.webp", after: "https://i.postimg.cc/MK1fMfsm/shou-chi-feng-shan-shi-nei-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/zXTHbHdC/shou-chi-feng-shan-shi-nei-bai-mo2.webp", after: "https://i.postimg.cc/MK1fMfs5/shou-chi-feng-shan-shi-nei-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/m271z1db/shou-chi-feng-shan-sha-tan-bai-mo1.webp", after: "https://i.postimg.cc/4NpH7H87/shou-chi-feng-shan-sha-tan-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/kXWR6Rj7/shou-chi-feng-shan-sha-tan-bai-mo2.webp", after: "https://i.postimg.cc/Kvt3k39g/shou-chi-feng-shan-sha-tan-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/TYn5L5kf/shou-chi-feng-shan-sha-tan-bai-mo3.webp", after: "https://i.postimg.cc/sD5GQGnG/shou-chi-feng-shan-sha-tan-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/28nLbLHw/shou-chi-feng-shan-xue-de-bai-mo.webp", after: "https://i.postimg.cc/TYn5L5kd/shou-chi-feng-shan-xue-de-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p6", title: "鼠标", brand: "3C产品", 
              img: "https://i.postimg.cc/3NXfWCd8/shu-biao-chuang-yi-chang-jing4.webp",
              comparisons: [
                { before: "https://i.postimg.cc/1RwjWPMv/shu-biao-chuang-yi-bai-mo1.webp", after: "https://i.postimg.cc/x8DF0FT9/shu-biao-chuang-yi-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/CMkQvYJv/shu-biao-chuang-yi-bai-mo2.webp", after: "https://i.postimg.cc/T1MHRHYR/shu-biao-chuang-yi-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/905NWNXL/shu-biao-chuang-yi-bai-mo3.webp", after: "https://i.postimg.cc/nr4SMYCJ/shu-biao-chuang-yi-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/0jRH8H5t/shu-biao-chuang-yi-bai-mo4.webp", after: "https://i.postimg.cc/3NXfWCd8/shu-biao-chuang-yi-chang-jing4.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/VvQHYHsD/shu-biao-chuang-yi-bai-mo5.webp", after: "https://i.postimg.cc/fycqkjJT/shu-biao-chuang-yi-chang-jing5.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/cCy5s519/shu-biao-chuang-yi-bai-mo6.webp", after: "https://i.postimg.cc/prfcyYpn/shu-biao-chuang-yi-chang-jing6.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/0jRH8H2q/shu-biao-chuang-yi-bai-mo7.webp", after: "https://i.postimg.cc/j2H3CQLf/shu-biao-chuang-yi-chang-jing7.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p7", title: "剃须刀", brand: "3C产品", 
              img: "https://i.postimg.cc/dQNLxP1C/ti-xu-dao-ke-huan-chang-jing1.webp",
              comparisons: [
                { before: "https://i.postimg.cc/x8Z8JH7B/ti-xu-dao-chuang-yi-bai-mo.webp", after: "https://i.postimg.cc/gj7jXRQb/ti-xu-dao-chuang-yi-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/zD2VcZBd/ti-xu-dao-sha-mo-bai-mo1.webp", after: "https://i.postimg.cc/8kXj0Q5x/ti-xu-dao-sha-mo-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/PJ7JpZcg/ti-xu-dao-ke-huan-bai-mo1.webp", after: "https://i.postimg.cc/dQNLxP1C/ti-xu-dao-ke-huan-chang-jing1.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/br5rDbWp/ti-xu-dao-ke-huan-bai-mo2.webp", after: "https://i.postimg.cc/CMrzQT14/ti-xu-dao-ke-huan-chang-jing2.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/hvYvzx6D/ti-xu-dao-ke-huan-bai-mo3.webp", after: "https://i.postimg.cc/y6pkb4dn/ti-xu-dao-ke-huan-chang-jing3.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/kMYBp34V/ti-xu-dao-ke-huan-bai-mo4.webp", after: "https://i.postimg.cc/zD2VcZBx/ti-xu-dao-ke-huan-chang-jing4.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/G3gH5wt0/ti-xu-dao-xue-de-bai-mo.webp", after: "https://i.postimg.cc/XqPqGFhT/ti-xu-dao-xue-de-chang-jing.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
              ]
            },
            { 
              id: "p8", title: "宝马M4", brand: "汽车", 
              img: "https://i.postimg.cc/hvnWCGm7/M4lei-ting02.webp",
              comparisons: [
                { before: "https://i.postimg.cc/VvFy2c9K/M4lei-ting-bai-mo02.webp", after: "https://i.postimg.cc/hvnWCGm7/M4lei-ting02.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/5ymcDM5P/M4lei-ting-bai-mo03.webp", after: "https://i.postimg.cc/QCDG6M77/M4lei-ting03.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/MHYkg80P/M4lei-ting-bai-mo04.webp", after: "https://i.postimg.cc/4yGk83cv/M4lei-ting04.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/RhTr2z1j/M4lei-ting-bai-mo07.webp", after: "https://i.postimg.cc/0jCghqGM/M4lei-ting07.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/qqGfWdcS/M4lei-ting-bai-mo08.webp", after: "https://i.postimg.cc/1XKxbZ0G/M4lei-ting08.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/8cGQyCvJ/M4lei-ting-bai-mo10.webp", after: "https://i.postimg.cc/3NZMzHjF/M4lei-ting10.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/qBcdN8fk/M4lei-ting-bai-mo09.webp", after: "https://i.postimg.cc/1XKxbZ0H/M4lei-ting09.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/hv0FNq80/M4lei-ting-bai-mo01.webp", after: "https://i.postimg.cc/9025xf9T/M4lei-ting01.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/RhTr2z1b/M4lei-ting-bai-mo05.webp", after: "https://i.postimg.cc/VvFy2c9S/M4lei-ting05.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" },
                { before: "https://i.postimg.cc/C54y9VC9/M4lei-ting-bai-mo06.webp", after: "https://i.postimg.cc/j2hVBr6n/M4lei-ting06.webp", beforeLabel: "(白模)", afterLabel: "(渲染)" }
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
              id: "i1", title: "沙漠酒店", brand: "空间渲染", 
              img: "https://i.postimg.cc/k43KprgG/sha-mo-jiu-dian10.webp",
              gallery: [
                "https://i.postimg.cc/yd4cbq8N/sha-mo-jiu-dian01.webp",
                "https://i.postimg.cc/26RhKpSq/sha-mo-jiu-dian02.webp",
                "https://i.postimg.cc/0QRDBgyb/sha-mo-jiu-dian03.webp",
                "https://i.postimg.cc/B69HVWn5/sha-mo-jiu-dian04.webp",
                "https://i.postimg.cc/sXY7FnMB/sha-mo-jiu-dian05.webp",
                "https://i.postimg.cc/XJfdM2rd/sha-mo-jiu-dian06.webp",
                "https://i.postimg.cc/ydmcqfDh/sha-mo-jiu-dian07.webp",
                "https://i.postimg.cc/mDYCxdPw/sha-mo-jiu-dian08.webp",
                "https://i.postimg.cc/fLcm4HV5/sha-mo-jiu-dian09.webp",
                "https://i.postimg.cc/k43KprgG/sha-mo-jiu-dian10.webp"
              ]
            },
            { 
              id: "i2", title: "万豪酒店", brand: "空间渲染", 
              img: "https://i.postimg.cc/vZymkQWS/wan-hao-jiu-dian2.webp",
              gallery: [
                "https://i.postimg.cc/0yvNF8pB/wan-hao-jiu-dian1.webp",
                "https://i.postimg.cc/vZymkQWS/wan-hao-jiu-dian2.webp",
                "https://i.postimg.cc/QdDMwXpq/wan-hao-jiu-dian3.webp",
                "https://i.postimg.cc/8zGC91RN/wan-hao-jiu-dian4.webp",
                "https://i.postimg.cc/sgz2qVY2/wan-hao-jiu-dian5.webp",
                "https://i.postimg.cc/JzQhW9xm/wan-hao-jiu-dian6.webp",
                "https://i.postimg.cc/ht0GqHsc/wan-hao-jiu-dian7.webp",
                "https://i.postimg.cc/cLcJNVh4/wan-hao-jiu-dian8.webp",
                "https://i.postimg.cc/jdP5MWJ9/wan-hao-jiu-dian9.webp"
              ]
            },
            { 
              id: "i3", title: "悬崖海边别墅", brand: "空间渲染", 
              img: "https://i.postimg.cc/L6gV8Vg5/xuan-ya-hai-bian-bie-shu2.webp",
              gallery: [
                "https://i.postimg.cc/VL0FkF05/xuan-ya-hai-bian-bie-shu1.webp",
                "https://i.postimg.cc/L6gV8Vg5/xuan-ya-hai-bian-bie-shu2.webp",
                "https://i.postimg.cc/YqLxCxL9/xuan-ya-hai-bian-bie-shu3.webp",
                "https://i.postimg.cc/05Bfv4jD/xuan-ya-hai-bian-bie-shu4.webp",
                "https://i.postimg.cc/kXRygyRR/xuan-ya-hai-bian-bie-shu5.webp",
                "https://i.postimg.cc/8Pfbzbf6/xuan-ya-hai-bian-bie-shu6.webp",
                "https://i.postimg.cc/8Pfbzbfr/xuan-ya-hai-bian-bie-shu7.webp",
                "https://i.postimg.cc/yY3T8T3R/xuan-ya-hai-bian-bie-shu8.webp"
              ]
            },
            { 
              id: "i4", title: "中式别墅", brand: "空间渲染", 
              img: "https://i.postimg.cc/zB3gPJnF/zhong-shi-bie-shu1.webp",
              gallery: [
                "https://i.postimg.cc/LXh10HzB/zhong-shi-bie-shu2.webp",
                "https://i.postimg.cc/RFqHbMc1/zhong-shi-bie-shu3.webp",
                "https://i.postimg.cc/C1dq6Fjj/zhong-shi-bie-shu4.webp",
                "https://i.postimg.cc/gJ56CfDK/zhong-shi-bie-shu5.webp",
                "https://i.postimg.cc/MT4jChDd/zhong-shi-bie-shu6.webp",
                "https://i.postimg.cc/nz5Qy6kS/zhong-shi-bie-shu7.webp",
                "https://i.postimg.cc/rmbtBvJH/zhong-shi-bie-shu8.webp",
                "https://i.postimg.cc/zB3gPJnF/zhong-shi-bie-shu1.webp"
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
              desc: "硬表面做旧，刀刃血槽与护手处的划痕、氧化、泥线等复杂分层材质刻画。",
              img: "https://i.postimg.cc/c4CTJFwn/2ak.webp",
              gallery: [
                "https://i.postimg.cc/c4CTJFwn/2ak.webp",
                "https://i.postimg.cc/NfFb0dmR/1ak.webp",
                "https://i.postimg.cc/ncrTL3B0/3ak.webp",
                "https://i.postimg.cc/GhfKTvxv/4ak.webp",
                "https://i.postimg.cc/5NyptsLF/1md.webp",
                "https://i.postimg.cc/yYxnNLcy/2md.webp",
                "https://i.postimg.cc/wTMFBwLX/1td.webp",
                "https://i.postimg.cc/ZKnjqwpc/2td.webp",
                "https://i.postimg.cc/8PY4fLmv/3td.webp",
                "https://i.postimg.cc/rFHjR5NN/4td.webp",
                "https://i.postimg.cc/xTZ5NL3R/5td.webp"
              ]
            }
          ]
        }
      ];

      const ImageCompareSlider = ({ before, after, beforeLabel = "Before", afterLabel = "After", aspectRatio = "16 / 9" }) => {
        const [sliderPos, setSliderPos] = useState(50);
        const [isSliding, setIsSliding] = useState(false);
        const containerRef = useRef(null);
        const isDraggingRef = useRef(false);

        const handleMove = (clientX) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const x = clientX - rect.left;
          let pos = (x / rect.width) * 100;
          if (pos < 0) pos = 0;
          if (pos > 100) pos = 100;
          setSliderPos(pos);
        };

        useEffect(() => {
          const onMouseMove = (e) => {
            if (isDraggingRef.current) {
              handleMove(e.clientX);
            }
          };
          const onMouseUp = () => {
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              setIsSliding(false);
            }
          };
          const onTouchMove = (e) => {
            if (isDraggingRef.current && e.touches.length > 0) {
              handleMove(e.touches[0].clientX);
            }
          };
          const onTouchEnd = () => {
            if (isDraggingRef.current) {
              isDraggingRef.current = false;
              setIsSliding(false);
            }
          };

          window.addEventListener('mousemove', onMouseMove);
          window.addEventListener('mouseup', onMouseUp);
          window.addEventListener('touchmove', onTouchMove);
          window.addEventListener('touchend', onTouchEnd);

          return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
          };
        }, []);

        const handleStart = (clientX) => {
          isDraggingRef.current = true;
          setIsSliding(true);
          handleMove(clientX);
        };

        return (
          <div 
            ref={containerRef}
            className="relative w-full h-full rounded-2xl overflow-hidden select-none bg-slate-900 shadow-lg group cursor-ew-resize"
            style={{ aspectRatio: aspectRatio }}
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          >
            <img 
              src={after} 
              alt={afterLabel} 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
            />
            
            <div 
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
            >
              <img 
                src={before} 
                alt={beforeLabel} 
                className="absolute inset-0 w-full h-full object-contain pointer-events-none" 
              />
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full pointer-events-none font-medium border border-white/20">
              {beforeLabel}
            </div>
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full pointer-events-none font-medium border border-white/20">
              {afterLabel}
            </div>

            {/* Divider Line & Centered Compact Handle */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] pointer-events-none"
              style={{ left: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-7 h-7 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-800 border border-slate-200">
                <svg className="w-3.5 h-3.5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7l-5 5 5 5M16 7l5 5-5 5"/>
                </svg>
              </div>
            </div>
          </div>
        );
      };

      const ResumeModal = ({ isOpen, onClose }) => {
        if (!isOpen) return null;

        return (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 md:p-6">
            <div className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden relative">
              
              {/* Sticky Top Header with Fixed Close Button */}
              <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  <span className="font-bold text-slate-800 text-lg">个人简历 - {personalInfo.name} ({personalInfo.enName})</span>
                </div>
                <button 
                  onClick={onClose}
                  className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors font-bold text-lg"
                  title="关闭"
                >
                  ✕
                </button>
              </div>

              {/* Scrollable Body */}
              <div className="flex-1 overflow-y-auto custom-modal-scroll p-6 md:p-10 space-y-10">
                {/* 个人基本信息 */}
                <div className="flex flex-col md:flex-row justify-between gap-6 pb-8 border-b border-slate-100">
                  <div>
                    <h2 className="text-3xl font-black text-slate-900">{personalInfo.name} <span className="text-xl font-medium text-slate-400">({personalInfo.enName})</span></h2>
                    <p className="text-blue-600 font-bold mt-1 text-lg">{personalInfo.title}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-slate-600">
                    <p>📞 电话：<a href={`tel:${personalInfo.phone}`} className="text-slate-900 font-semibold hover:underline">{personalInfo.phone}</a></p>
                    <p>✉️ 邮箱：<a href={`mailto:${personalInfo.email}`} className="text-slate-900 font-semibold hover:underline">{personalInfo.email}</a></p>
                    <p>💬 微信：<span className="text-slate-900 font-semibold">{personalInfo.wechat}</span></p>
                    <p>📍 城市：<span className="text-slate-900 font-semibold">{personalInfo.location}</span></p>
                  </div>
                </div>

                {/* 自我介绍 */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-3">自我介绍 / ABOUT ME</h3>
                  <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-5 rounded-2xl border border-slate-100">
                    {personalInfo.intro}
                  </p>
                </div>

                {/* 核心技能 */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-3">技能清单 / SKILLS</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <span key={index} className="px-3.5 py-1.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-xl">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 工作经历 */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-6">工作经历 / WORK EXPERIENCE</h3>
                  <div className="space-y-6">
                    {experiences.map((exp, idx) => (
                      <div key={idx} className="border-l-2 border-blue-500 pl-4 py-1">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <h4 className="font-bold text-slate-900 text-base">{exp.company}</h4>
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{exp.period}</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-500 mb-2">{exp.role}</p>
                        <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 重点项目经历 */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-6">重点项目经历 / PROJECT EXPERIENCE</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {projectExperiences.map((proj, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-2">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="font-bold text-slate-900 text-sm">{proj.name}</h4>
                            <span className="text-[10px] font-extrabold text-blue-600 bg-blue-100/60 px-2 py-0.5 rounded-md whitespace-nowrap">{proj.tag}</span>
                          </div>
                          <p className="text-xs text-slate-400 font-medium mb-2">{proj.role} • {proj.period}</p>
                          <p className="text-xs text-slate-600 leading-relaxed">{proj.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 教育背景 */}
                <div>
                  <h3 className="text-sm font-bold text-slate-400 tracking-wider uppercase mb-4">教育背景 / EDUCATION</h3>
                  <div className="space-y-2">
                    {education.map((edu, idx) => (
                      <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-slate-900">{edu.school}</p>
                          <p className="text-slate-500">{edu.major} ({edu.degree})</p>
                        </div>
                        <span className="text-slate-400 font-medium">{edu.period}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        );
      };

      const HeroCarousel = ({ items, onItemClick }) => {
        const trackRef = useRef(null);
        const [isDragging, setIsDragging] = useState(false);
        const dragStartX = useRef(0);
        const dragStartTranslate = useRef(0);
        const [currentTranslate, setCurrentTranslate] = useState(0);
        const isMovedRef = useRef(false);

        // 每项宽度 300px + 18px Gap
        const cardWidth = 300 + 18;
        const totalWidth = items.length * cardWidth;

        // 拼接 3 份实现完全无缝循环
        const extendedItems = useMemo(() => {
          if (!items || items.length === 0) return [];
          return [...items, ...items, ...items];
        }, [items]);

        useEffect(() => {
          let animationFrameId;
          const speed = 0.5;

          const loop = () => {
            if (!isDragging && totalWidth > 0) {
              setCurrentTranslate(prev => {
                let next = prev - speed;
                if (Math.abs(next) >= totalWidth) {
                  next += totalWidth;
                }
                return next;
              });
            }
            animationFrameId = requestAnimationFrame(loop);
          };

          loop();
          return () => cancelAnimationFrame(animationFrameId);
        }, [isDragging, totalWidth]);

        const handleStart = (clientX) => {
          setIsDragging(true);
          dragStartX.current = clientX;
          dragStartTranslate.current = currentTranslate;
          isMovedRef.current = false;
        };

        const handleMove = (clientX) => {
          if (!isDragging) return;
          const deltaX = clientX - dragStartX.current;
          if (Math.abs(deltaX) > 6) {
            isMovedRef.current = true;
          }
          let next = dragStartTranslate.current + deltaX;
          if (next > 0) {
            next -= totalWidth;
          } else if (Math.abs(next) >= totalWidth * 2) {
            next += totalWidth;
          }
          setCurrentTranslate(next);
        };

        const handleEnd = () => {
          setIsDragging(false);
        };

        return (
          <div className="gallery-wrapper my-6 overflow-hidden">
            <div 
              ref={trackRef}
              className={`gallery-track ${isDragging ? 'dragging' : ''}`}
              style={{ transform: `translateX(${currentTranslate}px)` }}
              onMouseDown={(e) => handleStart(e.clientX)}
              onMouseMove={(e) => handleMove(e.clientX)}
              onMouseUp={handleEnd}
              onMouseLeave={handleEnd}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
              onTouchMove={(e) => handleMove(e.touches[0].clientX)}
              onTouchEnd={handleEnd}
            >
              {extendedItems.map((item, index) => (
                <div 
                  key={`${item.id}-${index}`}
                  className="gallery-card cursor-pointer group relative"
                  onClick={() => {
                    if (!isMovedRef.current) {
                      onItemClick(item);
                    }
                  }}
                >
                  <img src={item.img} alt={item.title} loading="lazy" />
                  {item.videoUrl && (
                    <div className="absolute top-2.5 right-2.5 bg-blue-600/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1 z-10">
                      <span>▶</span> 视频
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-end p-3.5 pointer-events-none">
                    <span className="text-white text-xs font-bold truncate">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      };

      function App() {
        const [currentPage, setCurrentPage] = useState('home'); 
        const [selectedProject, setSelectedProject] = useState(null); 
        const [isResumeOpen, setIsResumeOpen] = useState(false);
        const [savedScrollPos, setSavedScrollPos] = useState(0);
        
        const [comparisonModalItem, setComparisonModalItem] = useState(null);
        const [singleZoomImg, setSingleZoomImg] = useState(null);
        const [activeVideo, setActiveVideo] = useState(null);

        // 随机打乱算法 (Fisher-Yates) 组合 Hero 视图图片
        const randomizedHeroItems = useMemo(() => {
          const allItems = portfolioCategories.flatMap(c => c.items);
          const shuffled = [...allItems];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          return shuffled;
        }, []);

        useEffect(() => {
          const handleContextMenu = (e) => {
            if (e.target.tagName === 'IMG') {
              e.preventDefault(); 
            }
          };
          document.addEventListener('contextmenu', handleContextMenu);
          return () => document.removeEventListener('contextmenu', handleContextMenu);
        }, []);

        const navigateTo = (page) => {
          setSelectedProject(null);
          setCurrentPage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        };

        const handleProjectClick = (item) => {
          if (item.videoUrl) {
            setActiveVideo(item.videoUrl);
          } else {
            setSavedScrollPos(window.scrollY);
            setSelectedProject(item);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        };

        const handleBackFromDetail = () => {
          setSelectedProject(null);
          setTimeout(() => {
            window.scrollTo({ top: savedScrollPos, behavior: 'smooth' });
          }, 50);
        };

        const handleHeroItemClick = (item) => {
          if (item.videoUrl) {
            setActiveVideo(item.videoUrl);
          } else if (item.comparisons || item.gallery) {
            handleProjectClick(item);
          } else {
            setSingleZoomImg(item.img);
          }
        };

        return (
          <div className="min-h-screen bg-white text-slate-900 font-sans">
            {/* Top Navigation */}
            <nav className="w-full px-8 py-6 flex justify-between items-center border-b border-slate-100">
              <div 
                onClick={() => navigateTo('home')} 
                className="text-lg font-black tracking-tighter text-slate-900 cursor-pointer hover:text-blue-600 transition-colors"
              >
                周辉 (Jimmy) <span className="text-xs text-slate-400 font-normal">/ 3D视觉设计师</span>
              </div>
              <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
                <button onClick={() => navigateTo('home')} className={`hover:text-black ${currentPage === 'home' && !selectedProject ? 'text-black font-extrabold' : ''}`}>首页</button>
                <button onClick={() => navigateTo('portfolio')} className={`hover:text-black ${currentPage === 'portfolio' && !selectedProject ? 'text-black font-extrabold' : ''}`}>作品集</button>
                <button onClick={() => setIsResumeOpen(true)} className="hover:text-black">简历</button>
              </div>
            </nav>

            {/* Main Content Container */}
            <main className="max-w-7xl mx-auto px-4 md:px-8">
              {!selectedProject ? (
                currentPage === 'home' ? (
                  <div>
                    {/* Hero Section */}
                    <section className="hero-section">
                      <h1>
                        3D Visual<br />
                        Animation<br />
                        Studio
                      </h1>
                      <p>周辉 (Jimmy) — 3D视觉设计师 & 动画师个人作品集</p>
                    </section>

                    {/* Infinite Hero Carousel with Randomized Items */}
                    <HeroCarousel 
                      items={randomizedHeroItems} 
                      onItemClick={handleHeroItemClick}
                    />

                    {/* Intro Actions */}
                    <div className="text-center my-10 space-y-6">
                      <p className="text-slate-600 text-base max-w-xl mx-auto leading-relaxed font-medium">
                        深耕照明亮化、消费电子、汽车广告及数字孪生领域近十年，具备独立完成创意策划、渲染、动效至UE蓝图开发的全流程能力。
                      </p>
                      
                      <div className="flex justify-center items-center gap-4 flex-wrap pt-2">
                        <button 
                          onClick={() => navigateTo('portfolio')} 
                          className="group px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-full transition-all text-sm border border-slate-200 inline-flex items-center gap-2"
                        >
                          <span>查看完整作品集集锦</span>
                          <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => setIsResumeOpen(true)} 
                          className="px-7 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-full transition-all text-sm border border-slate-200"
                        >
                          查看个人简历 📄
                        </button>
                      </div>
                    </div>

                    {/* Contact Section */}
                    <section className="border-t border-slate-100 pt-16 pb-20 text-center">
                      <h2 className="text-2xl font-black text-slate-900 mb-2">预约合作 / CONTACT</h2>
                      <p className="text-slate-500 text-sm mb-8">欢迎联系沟通商业 CGI 广告、产品渲染及数字孪生项目。</p>
                      <div className="flex justify-center flex-wrap gap-4 text-sm font-bold">
                        <a href={`tel:${personalInfo.phone}`} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-800 hover:bg-slate-900 hover:text-white transition-all">
                          📞 {personalInfo.phone}
                        </a>
                        <a href={`mailto:${personalInfo.email}`} className="px-6 py-3 bg-slate-50 border border-slate-200 rounded-full text-slate-800 hover:bg-slate-900 hover:text-white transition-all">
                          ✉️ {personalInfo.email}
                        </a>
                        <a href={personalInfo.bilibili} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-[#fb7299]/10 text-[#fb7299] border border-[#fb7299]/30 rounded-full hover:bg-[#fb7299] hover:text-white transition-all">
                          📺 Bilibili 主页
                        </a>
                      </div>
                    </section>
                  </div>
                ) : (
                  /* Portfolio Overview */
                  <div className="py-12 space-y-12">
                    <div className="flex items-center">
                      <button 
                        onClick={() => navigateTo('home')} 
                        className="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors text-sm font-semibold"
                      >
                        ← 返回首页
                      </button>
                    </div>

                    <div className="text-center max-w-2xl mx-auto">
                      <h1 className="text-4xl font-black text-slate-900 mb-3">完整作品集</h1>
                      <p className="text-slate-500 text-sm">分类浏览涵盖动态视频、产品渲染、室内外空间及 SP 次世代材质的代表作品。</p>
                    </div>

                    {portfolioCategories.map((category) => (
                      <div key={category.categoryId} className="space-y-6">
                        <div className="border-b border-slate-200 pb-3">
                          <h2 className="text-2xl font-bold text-slate-900">{category.categoryName}</h2>
                          <p className="text-slate-500 text-xs mt-1">{category.desc}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {category.items.map((item) => (
                            <div 
                              key={item.id} 
                              onClick={() => handleProjectClick(item)}
                              className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all bg-slate-50"
                            >
                              <div className="aspect-[16/9] overflow-hidden relative">
                                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                {item.videoUrl && (
                                  <div className="absolute top-3 right-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
                                    ▶ 视频
                                  </div>
                                )}
                              </div>
                              <div className="p-4">
                                <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-600 transition-colors">{item.title}</h3>
                                <p className="text-xs text-slate-400 mt-1">{item.brand}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Detail View */
                <div className="py-12 space-y-12 animate-fadeIn">
                  <div className="flex items-center gap-4 text-sm font-semibold">
                    <button 
                      onClick={handleBackFromDetail}
                      className="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 transition-colors"
                    >
                      ← 返回列表
                    </button>
                  </div>

                  <div>
                    <h1 className="text-3xl font-black text-slate-900">{selectedProject.title}</h1>
                    <p className="text-blue-600 font-bold text-sm mt-1">{selectedProject.brand}</p>
                    {selectedProject.desc && (
                      <p className="text-slate-600 text-sm mt-3 leading-relaxed">{selectedProject.desc}</p>
                    )}
                  </div>

                  {/* Comparisons or Gallery Grid */}
                  {selectedProject.comparisons && selectedProject.comparisons.length > 0 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-lg font-bold text-slate-800">
                          视角效果图集 <span className="text-xs text-slate-400 font-normal ml-2">（点击任意图片开启全屏滑动对比）</span>
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedProject.comparisons.map((comp, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setComparisonModalItem({ ...comp, aspectRatio: selectedProject.aspectRatio })}
                            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 relative shadow-md hover:shadow-xl transition-all"
                            style={{ aspectRatio: selectedProject.aspectRatio || '16 / 9' }}
                          >
                            <img 
                              src={comp.after} 
                              alt={comp.afterLabel} 
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/20">
                              {comp.afterLabel}
                            </div>
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md transform group-hover:scale-105 transition-all flex items-center gap-1.5">
                                🔍 点击全屏滑动对比
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : selectedProject.gallery && selectedProject.gallery.length > 0 ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h2 className="text-lg font-bold text-slate-800">
                          视角效果图集 <span className="text-xs text-slate-400 font-normal ml-2">（点击任意图片全屏放大查看）</span>
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {selectedProject.gallery.map((imgUrl, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setSingleZoomImg(imgUrl)}
                            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-100 bg-slate-900 relative shadow-md hover:shadow-xl transition-all aspect-[16/9]"
                          >
                            <img 
                              src={imgUrl} 
                              alt={`视角 ${idx + 1}`} 
                              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                            />
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-medium border border-white/20">
                              视角 {String.fromCharCode(65 + idx)}
                            </div>
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md transform group-hover:scale-105 transition-all flex items-center gap-1.5">
                                🔍 点击全屏放大
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  <div className="pt-10 border-t border-slate-100 text-center">
                    <button 
                      onClick={handleBackFromDetail}
                      className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-full hover:bg-blue-600 transition-colors text-sm"
                    >
                      ← 返回列表
                    </button>
                  </div>
                </div>
              )}
            </main>

            <footer className="border-t border-slate-100 py-8 text-center text-xs text-slate-400">
              <p>© {new Date().getFullYear()} 周辉 (Jimmy). 3D Designer Portfolio.</p>
            </footer>

            {/* Comparison Full-screen Modal */}
            {comparisonModalItem && (() => {
              const ratioStr = comparisonModalItem.aspectRatio || '16 / 9';
              const parts = ratioStr.split('/').map(s => parseFloat(s.trim()));
              const rVal = (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1]) && parts[1] !== 0) 
                ? (parts[0] / parts[1]) 
                : (16 / 9);

              return (
                <div 
                  className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                  onClick={() => setComparisonModalItem(null)}
                >
                  <div 
                    className="relative flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      aspectRatio: ratioStr,
                      width: `min(90vw, calc(85vh * ${rVal}))`,
                      maxWidth: '90vw',
                      maxHeight: '85vh'
                    }}
                  >
                    <button 
                      onClick={() => setComparisonModalItem(null)}
                      className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white font-bold flex items-center justify-center transition-all border border-white/20 shadow-lg"
                      title="关闭对比"
                    >
                      ✕
                    </button>
                    <ImageCompareSlider 
                      before={comparisonModalItem.before}
                      after={comparisonModalItem.after}
                      beforeLabel={comparisonModalItem.beforeLabel}
                      afterLabel={comparisonModalItem.afterLabel}
                      aspectRatio={ratioStr}
                    />
                  </div>
                </div>
              );
            })()}

            {/* Single Image Full-screen Modal */}
            {singleZoomImg && (
              <div 
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={() => setSingleZoomImg(null)}
              >
                <div className="relative max-w-5xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setSingleZoomImg(null)}
                    className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white font-bold flex items-center justify-center border border-white/20 transition-all text-sm"
                  >
                    ✕
                  </button>
                  <img src={singleZoomImg} alt="Enlarged view" className="max-w-full max-h-[85vh] rounded-xl object-contain shadow-2xl" />
                </div>
              </div>
            )}

            {/* Video Modal */}
            {activeVideo && (
              <div 
                className="fixed inset-0 z-[110] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                onClick={() => setActiveVideo(null)}
              >
                <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black" onClick={(e) => e.stopPropagation()}>
                  <button 
                    onClick={() => setActiveVideo(null)}
                    className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white font-bold flex items-center justify-center border border-white/20 transition-all text-sm"
                  >
                    ✕
                  </button>
                  <iframe 
                    src={activeVideo} 
                    className="w-full h-full"
                    scrolling="no" 
                    frameBorder="0" 
                    allowFullScreen={true}
                    referrerPolicy="no-referrer"
                  ></iframe>
                </div>
              </div>
            )}

            {/* Resume Modal */}
            <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
          </div>
        );
      }

      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(<App />);
    </script>
</body>
</html>