(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector(".site-header");
  const menuButton = document.querySelector(".menu-button");
  const mobileNav = document.querySelector(".mobile-nav");
  const clamp = (min, value, max) => Math.min(Math.max(value, min), max);

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }, { passive: true });

  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "关闭导航菜单" : "打开导航菜单");
    mobileNav.classList.toggle("is-open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileNav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }));

  const contactDialog = document.querySelector(".contact-dialog");
  const contactClose = contactDialog?.querySelector(".contact-close");

  const openContactDialog = event => {
    if (!contactDialog) return;
    event.preventDefault();
    if (contactDialog.open) return;
    if (typeof contactDialog.showModal === "function") contactDialog.showModal();
    else contactDialog.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  };

  const closeContactDialog = () => {
    if (!contactDialog) return;
    if (typeof contactDialog.close === "function") contactDialog.close();
    else contactDialog.removeAttribute("open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-contact-open]").forEach(trigger => {
    trigger.addEventListener("click", openContactDialog);
  });
  contactClose?.addEventListener("click", closeContactDialog);
  contactDialog?.addEventListener("click", event => {
    if (event.target === contactDialog) closeContactDialog();
  });
  contactDialog?.addEventListener("cancel", event => {
    event.preventDefault();
    closeContactDialog();
  });

  document.querySelector(".back-top")?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  const galleryTrack = document.querySelector(".gallery-track");
  const galleryCards = [...document.querySelectorAll(".gallery-card")];
  const galleryPrev = document.querySelector(".gallery-prev");
  const galleryNext = document.querySelector(".gallery-next");
  const galleryCurrent = document.querySelector(".gallery-count b");
  const galleryYears = [...document.querySelectorAll(".gallery-year")];
  const storyDialog = document.querySelector(".story-dialog");
  const storyImage = storyDialog?.querySelector(".story-media img");
  const storyImageIndex = storyDialog?.querySelector(".story-image-index");
  const storyCategory = storyDialog?.querySelector(".story-category");
  const storyTitle = storyDialog?.querySelector("#story-title");
  const storyLead = storyDialog?.querySelector(".story-lead");
  const storyStats = storyDialog?.querySelector(".story-stats");
  const storyBody = storyDialog?.querySelector(".story-body");
  const storyClose = storyDialog?.querySelector(".story-close");
  const enhanceHonorTargets = () => {
    storyBody?.querySelectorAll(".story-honors > span").forEach(pill => {
      const frame = document.createElement("span");
      frame.className = "honor-target-corners";
      frame.setAttribute("aria-hidden", "true");
      frame.innerHTML = '<i class="corner-tl"></i><i class="corner-tr"></i><i class="corner-br"></i><i class="corner-bl"></i>';
      pill.append(frame);
    });
  };
  const galleryStories = [
    {
      image: "assets/gallery/gallery-01.jpg",
      alt: "苏弈秋参加广东省大学生运动会志愿服务",
      category: "志愿服务 · 学生工作",
      date: "2022.06",
      title: "从志愿服务的参与者到组织者",
      lead: "从志愿服务的参与者，到成为万人赛事志愿者招募总负责人；我累计完成超过 300 小时志愿服务，也把一次次参与变成了长期坚持。",
      stats: [["300+", "累计志愿小时"], ["100+", "志愿活动组织招募"], ["10+", "志愿实践相关荣誉"]],
      body: `
        <section class="story-role is-title-only">
          <div class="story-role-head"><strong>土木与交通学院学生会志愿实践部 · 副部长</strong><span>2021 — 2025</span></div>
        </section>
        <section class="story-role is-title-only">
          <div class="story-role-head"><strong>华南理工大学校青年志愿者指导中心实践部 · 部长</strong><span>2021 — 2025</span></div>
        </section>
        <section class="story-honors" aria-label="代表性荣誉">
          <p class="story-honors-title">SELECTED HONORS <span>代表性荣誉</span></p>
          <span>省大运会省级优秀志愿者</span><span>校级优秀公益组织骨干</span><span>校级抗疫积极分子</span><span>一星志愿者</span><span class="story-honor-wide">院级学生会优秀干事</span>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-02.jpg",
      alt: "苏弈秋参加全国大学生交通科技大赛",
      category: "专业学习 · 科研竞赛",
      date: "2024.05",
      title: "从课堂走向真实问题",
      lead: "大二系统学习专业知识后，我不再满足于只在课堂里得到标准答案，于是我开始和同学组队参加科研竞赛，探索学术前沿课题，并取得了不错的成绩。",
      stats: [],
      body: `
        <section class="story-role">
          <div class="story-role-head"><strong>政策视域下高校学生节能减排行为影响因素研究</strong><span>第一负责人</span></div>
          <p>带队完成问卷与实地访谈，构建潜变量结构方程模型并使用 AMOS 分析数据；负责研究方法、数据分析、论文与答辩展示，获全国节能减排社会实践与科技竞赛三等奖。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>DOS 攻击下 CAV 车队匝道合流安全控制器设计</strong><span>第二负责人</span></div>
          <p>基于 V2V-LPF 通信拓扑，设计结合卡尔曼滤波的安全分布式观测器与 PID 双环控制器，实现 15m 安全间距的车队合流与编队跟踪；负责总体框架、控制方案、论文及仿真视频，获全国大学生交通科技大赛二等奖。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>基于地铁客货同列的地下物流系统设计</strong><span>核心成员</span></div>
          <p>参与基于归档式退火算法 NAMOSA 的地下物流网络模型设计，负责商业计划书、平台方案、论文与展示材料，推动研究从模型走向可落地的系统方案。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>校园跑腿平台软件系统设计</strong><span>产品设计</span></div>
          <p>围绕“发布任务—接单履约—获得报酬”设计完整服务流程；负责市场调研、需求说明书、详细设计、模块架构与原型图，让技术项目第一次有了清晰的产品视角。</p>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-03.jpg",
      alt: "苏弈秋于华南理工大学本科毕业",
      category: "本科四年 · 跨学科探索",
      date: "2025.06",
      title: "在课堂与项目中扎实成长",
      lead: "本科阶段，我逐渐意识到，产品构想要真正落地，离不开对数据与软件系统的理解。因此，我辅修计算机科学与技术，并开始参与跨学科科研项目。",
      stats: [["3.67/4.0", "GPA"], ["TOP 10%", "专业排名"], ["计算机科学与技术", "辅修专业"]],
      body: `
        <section class="story-honors" aria-label="代表性荣誉">
          <p class="story-honors-title">SELECTED HONORS <span>代表性荣誉</span></p>
          <span>温氏筠诚奖学金</span><span>广科企业奖学金</span><span>华南理工大学二等奖学金</span><span>全国大学生交通科技大赛二等奖</span><span>全国节能减排竞赛三等奖</span>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-04.jpg",
      alt: "苏弈秋在美团暑期实习期间留影",
      category: "四段实习 · 产品实践",
      date: "2024 — 2026",
      title: "把所学带进真实业务",
      lead: "科研项目让我积累了分析问题与设计方案的方法，我也希望把学到的知识放进真实业务中检验。因此，我先后在小鹏、货拉拉、美团和 vivo 实习。",
      stats: [],
      body: `
        <p class="story-paragraph">四段实习让我逐渐理解，产品工作并不只是输出原型和文档，而是先理解业务问题，再通过流程、数据和跨团队协作推动方案真正落地。</p>
        <section class="story-role">
          <div class="story-role-head"><strong>小鹏汽车科技有限公司 · 项目管理</strong><span>2024.07 — 10</span></div>
          <p>负责 X3 飞行汽车试制 BOM、ERP 数据和技术状态管理，跟进设计变更并支持 ET1 整车开发节点。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>依时货拉拉科技有限公司 · 产品经理</strong><span>2024.10 — 2025.03</span></div>
          <p>从 0 到 1 设计研发协同工作台，并通过数据看板和 Python 回归模型分析需求交付效率，推动数据准确率由 86.2% 提升至 98.9%。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>美团科技有限公司 · 产品运营</strong><span>2025.05 — 09</span></div>
          <p>建设无人配送指标体系，分析异常订单并联动算法、路测团队解决问题，推动自动驾驶里程占比由 57% 提升至 70%。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>vivo · AI 产品经理</strong><span>2026.05 — 至今</span></div>
          <p>参与企业级 Data Agent 建设，负责 Skill 模块、PC 端功能策划和 NL2SQL 评测，设计并开发 20+ 官方数据分析 Skills。</p>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-05.jpg",
      alt: "苏弈秋获香港中文大学信息工程系最佳学术表现奖",
      category: "香港中文大学 · 信息工程硕士",
      date: "2026.05",
      title: "做懂技术的产品人",
      lead: "我发现很多产品判断都建立在对数据与技术的理解之上。因此，我进入香港中文大学信息工程硕士项目继续学习。为了成为懂底层技术的产品经理，我主动补足开发与 AI 能力。",
      stats: [["3.71/4.0", "GPA"], ["TOP 5%", "全年级排名"], ["最佳学术表现奖", "信息工程系"]],
      body: `
        <section class="story-courses" aria-label="核心课程">
          <p class="story-courses-title">CORE COURSES <span>核心课程</span></p>
          <span>IT 管理</span><span>安卓开发</span><span>多媒体编码</span><span>密码学</span><span>社交网络</span><span>数据科学</span>
        </section>
      `
    }
  ];

  let galleryIndex = 2;

  const openGalleryStory = index => {
    const story = galleryStories[index];
    if (!story || !storyDialog) return;
    setGalleryIndex(index);
    storyImage.src = story.image;
    storyImage.alt = story.alt;
    storyImageIndex.textContent = `${String(index + 1).padStart(2, "0")} / 05`;
    storyCategory.textContent = story.category;
    storyTitle.textContent = story.title;
    storyTitle.classList.toggle("is-single-line", index === 0);
    storyLead.textContent = story.lead;
    storyStats.hidden = story.stats.length === 0;
    storyStats.innerHTML = story.stats.map(([value, label]) => {
      const longValueClass = value === "计算机科学与技术" ? " is-long" : "";
      return `<div class="story-stat${longValueClass}"><strong>${value}</strong><span>${label}</span></div>`;
    }).join("");
    storyBody.innerHTML = story.body;
    enhanceHonorTargets();
    if (typeof storyDialog.showModal === "function") storyDialog.showModal();
    else storyDialog.setAttribute("open", "");
    document.body.style.overflow = "hidden";
  };

  const closeGalleryStory = () => {
    if (!storyDialog) return;
    if (typeof storyDialog.close === "function") storyDialog.close();
    else storyDialog.removeAttribute("open");
    document.body.style.overflow = "";
  };

  const setGalleryIndex = index => {
    const cardCount = galleryCards.length;
    const nextIndex = ((index % cardCount) + cardCount) % cardCount;
    const hasChanged = nextIndex !== galleryIndex;
    galleryIndex = nextIndex;
    galleryCurrent.textContent = String(galleryIndex + 1).padStart(2, "0");
    galleryPrev.disabled = false;
    galleryNext.disabled = false;
    galleryCards.forEach((card, cardIndex) => {
      const active = cardIndex === galleryIndex;
      let offset = cardIndex - galleryIndex;
      if (offset > cardCount / 2) offset -= cardCount;
      if (offset < -cardCount / 2) offset += cardCount;
      card.classList.toggle("is-active", active);
      card.dataset.offset = String(offset);
      card.setAttribute("aria-current", active ? "true" : "false");
    });
    galleryYears.forEach((year, yearIndex) => {
      const active = yearIndex === galleryIndex;
      year.classList.toggle("is-active", active);
      year.setAttribute("aria-pressed", String(active));
    });

    if (hasChanged && !reducedMotion && window.gsap && window.innerWidth > 767) {
      const activeCard = galleryCards[galleryIndex];
      const photo = activeCard?.querySelector(".gallery-photo-wrap");
      const copy = activeCard ? [...activeCard.querySelectorAll("figcaption > div, figcaption h3, figcaption p")] : [];
      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timeline
        .fromTo(photo,
          { y: 10, scale: .975, autoAlpha: .72 },
          { y: 0, scale: 1, autoAlpha: 1, duration: .46, ease: "power3.out", clearProps: "transform,opacity,visibility" })
        .fromTo(copy,
          { y: 8, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .34, ease: "power2.out", stagger: .045, clearProps: "transform,opacity,visibility" },
          .08)
        .fromTo(galleryCurrent,
          { y: -5, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: .25, ease: "power2.out", clearProps: "transform,opacity,visibility" },
          0);
    }
  };

  const isMobileGallery = () => window.innerWidth <= 767;

  // 程序滚动期间（点箭头切卡）暂停反向同步，避免滚动中途经过的卡片覆盖目标索引。
  let galleryProgrammaticUntil = 0;

  const scrollGalleryToCard = index => {
    const card = galleryCards[index];
    if (!card || !galleryTrack) return;
    // 手动计算目标 scrollLeft，比 scrollIntoView 在 scroll-snap 容器里更可控，
    // 避免移动端浏览器平滑滚动过冲跳到更远的卡片。
    const targetLeft = card.offsetLeft + card.offsetWidth / 2 - galleryTrack.clientWidth / 2;
    galleryProgrammaticUntil = Date.now() + 700;
    galleryTrack.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: reducedMotion ? "auto" : "smooth"
    });
  };

  const goToGalleryCard = index => {
    const cardCount = galleryCards.length;
    const nextIndex = ((index % cardCount) + cardCount) % cardCount;
    setGalleryIndex(nextIndex);
    // 移动端卡片流的位置由滚动决定，切卡时同步把目标卡片滚到视口中心。
    if (isMobileGallery() && galleryTrack) scrollGalleryToCard(nextIndex);
  };

  // 移动端手动滑动卡片流时，反向同步计数器与 active 状态。
  let galleryScrollRaf = null;
  galleryTrack?.addEventListener("scroll", () => {
    if (!isMobileGallery() || galleryScrollRaf) return;
    galleryScrollRaf = requestAnimationFrame(() => {
      galleryScrollRaf = null;
      if (Date.now() < galleryProgrammaticUntil) return;
      const trackRect = galleryTrack.getBoundingClientRect();
      const center = trackRect.left + trackRect.width / 2;
      let bestIndex = 0;
      let bestDist = Infinity;
      galleryCards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const dist = Math.abs(rect.left + rect.width / 2 - center);
        if (dist < bestDist) { bestDist = dist; bestIndex = i; }
      });
      if (bestIndex !== galleryIndex) setGalleryIndex(bestIndex);
    });
  }, { passive: true });

  galleryPrev?.addEventListener("click", () => goToGalleryCard(galleryIndex - 1));
  galleryNext?.addEventListener("click", () => goToGalleryCard(galleryIndex + 1));
  galleryYears.forEach(year => year.addEventListener("click", () => goToGalleryCard(Number(year.dataset.galleryIndex))));
  galleryTrack?.addEventListener("keydown", event => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goToGalleryCard(galleryIndex - 1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goToGalleryCard(galleryIndex + 1);
    }
  });
  document.querySelectorAll(".story-trigger").forEach(trigger => trigger.addEventListener("click", () => {
    const index = Number(trigger.dataset.storyIndex);
    // 移动端卡片流：点击任意可见卡片直接打开详情，无需先切到 active。
    if (isMobileGallery()) {
      openGalleryStory(index);
    } else {
      if (index === galleryIndex) openGalleryStory(index);
      else goToGalleryCard(index);
    }
  }));
  storyClose?.addEventListener("click", closeGalleryStory);
  storyDialog?.addEventListener("close", () => { document.body.style.overflow = ""; });
  storyDialog?.addEventListener("click", event => {
    if (event.target === storyDialog) closeGalleryStory();
  });

  setGalleryIndex(2);

  const tabs = [...document.querySelectorAll(".exp-tab")];
  const cards = [...document.querySelectorAll(".experience-card")];
  const showExperience = (tab, animateCard = true) => {
    const next = document.getElementById(tab.dataset.target);
    if (!next) return;
    tabs.forEach(item => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });
    cards.forEach(card => {
      card.getAnimations?.().forEach(animation => animation.cancel());
      card.hidden = card !== next;
      card.classList.toggle("is-active", card === next);
      card.style.opacity = "";
      card.style.transform = "";
    });
    if (animateCard && !reducedMotion && typeof next.animate === "function") {
      next.animate([
        { opacity: 0, transform: "translateY(28px)" },
        { opacity: 1, transform: "translateY(0)" }
      ], { duration: 560, easing: "cubic-bezier(.22,1,.36,1)" });
    }
  };

  const initialExperienceTab = tabs.find(tab => tab.classList.contains("is-active")) || tabs[0];
  if (initialExperienceTab) showExperience(initialExperienceTab, false);
  tabs.forEach(tab => tab.addEventListener("click", () => showExperience(tab)));

  const interestPile = document.querySelector(".interest-pile");
  const interestChips = [...document.querySelectorAll(".interest-chip")];
  if (!reducedMotion && interestPile && interestChips.length && window.gsap) {
    interestPile.classList.add("is-animating");
    const chipTimeline = gsap.timeline({
      delay: .72,
      defaults: { duration: .86, ease: "bounce.out" },
      onComplete: () => interestPile.classList.remove("is-animating")
    });

    chipTimeline.fromTo(interestChips,
      {
        autoAlpha: 0,
        x: index => [-34, 28, -18, 42, -26][index % 5],
        y: index => -190 - (index % 4) * 34,
        rotation: index => (index % 2 ? 1 : -1) * (18 + index * 3),
        scale: .88
      },
      {
        autoAlpha: 1,
        x: 0,
        y: 0,
        rotation: index => Number(interestChips[index].dataset.r || 0),
        scale: 1,
        stagger: { each: .085, from: "random" }
      },
      0
    );

    interestChips.forEach(chip => {
      chip.addEventListener("pointerenter", () => gsap.to(chip, {
        y: -7, rotation: 0, scale: 1.035, duration: .28, ease: "power2.out", overwrite: "auto"
      }));
      chip.addEventListener("pointerleave", () => gsap.to(chip, {
        y: 0, rotation: Number(chip.dataset.r || 0), scale: 1, duration: .4, ease: "back.out(1.5)", overwrite: "auto"
      }));
    });
  }

  const projectFiles = [...document.querySelectorAll(".project-file")];
  const projectHoverQuery = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
  const animateProjectFile = (file, isOpen) => {
    if (!file || reducedMotion || typeof gsap === "undefined") return;
    if (!isOpen || projectHoverQuery.matches) return;
    gsap.fromTo(file.querySelectorAll(".file-paper p"),
      { y: 9, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: .3, stagger: .035, ease: "power3.out", overwrite: "auto" }
    );
  };
  const setProjectFileOpen = (file, isOpen) => {
    const summary = file.querySelector("summary");
    const paper = file.querySelector(".file-paper");
    file.open = isOpen;
    summary?.setAttribute("aria-expanded", String(isOpen));
    paper?.setAttribute("tabindex", isOpen ? "0" : "-1");
    paper?.setAttribute("aria-hidden", String(!isOpen));
    animateProjectFile(file, isOpen);
  };
  const closeOtherProjectFiles = activeFile => projectFiles.forEach(otherFile => {
    if (otherFile !== activeFile) {
      setProjectFileOpen(otherFile, false);
    }
  });
  projectFiles.forEach(file => setProjectFileOpen(file, false));

  projectFiles.forEach(file => {
    const summary = file.querySelector("summary");
    const paper = file.querySelector(".file-paper");
    paper?.setAttribute("role", "region");
    paper?.removeAttribute("aria-label");
    if (paper && !paper.querySelector(".file-paper-close")) {
      const closeButton = document.createElement("button");
      closeButton.type = "button";
      closeButton.className = "file-paper-close";
      closeButton.setAttribute("aria-label", "收起项目详情");
      closeButton.innerHTML = '<span aria-hidden="true"></span>';
      paper.prepend(closeButton);
    }
    setProjectFileOpen(file, file.open);

    summary?.addEventListener("click", event => {
      event.preventDefault();
      if (projectHoverQuery.matches) return;
      const shouldOpen = !file.open;
      closeOtherProjectFiles(file);
      setProjectFileOpen(file, shouldOpen);
    });

    file.addEventListener("pointerenter", () => {
      if (!projectHoverQuery.matches) return;
      closeOtherProjectFiles(file);
      setProjectFileOpen(file, true);
    });

    file.addEventListener("pointerleave", () => {
      if (!projectHoverQuery.matches) return;
      setProjectFileOpen(file, false);
    });

    summary?.addEventListener("focus", () => {
      if (!projectHoverQuery.matches) return;
      closeOtherProjectFiles(file);
      setProjectFileOpen(file, true);
    });

    file.addEventListener("focusout", event => {
      if (!projectHoverQuery.matches || file.contains(event.relatedTarget)) return;
      setProjectFileOpen(file, false);
    });

    const closeFromPaper = () => {
      if (!file.open) return;
      setProjectFileOpen(file, false);
      summary?.focus({ preventScroll: true });
    };
    paper?.querySelector(".file-paper-close")?.addEventListener("click", closeFromPaper);
  });

  document.addEventListener("keydown", event => {
    if (event.key !== "Escape") return;
    const openFile = projectFiles.find(file => file.open);
    if (!openFile) return;
    setProjectFileOpen(openFile, false);
    openFile.querySelector("summary")?.focus({ preventScroll: true });
  });

  if (reducedMotion) {
    document.querySelectorAll(".statement-copy span").forEach(el => el.classList.add("is-lit"));
    document.querySelectorAll(".count-up").forEach(el => el.textContent = el.dataset.count);
    return;
  }

  const animate = (element, keyframes, options = {}) => element?.animate(keyframes, {
    duration: 760,
    easing: "cubic-bezier(.22,1,.36,1)",
    fill: "none",
    ...options
  });

  animate(header, [{ opacity: 0, transform: "translateY(-30px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700 });
  document.querySelectorAll(".title-line > span").forEach((el, index) => animate(el,
    [{ transform: "translateY(115%) rotate(2deg)" }, { transform: "translateY(0) rotate(0)" }],
    { duration: 1050, delay: 180 + index * 90 }
  ));
  document.querySelectorAll(".hero-reveal").forEach((el, index) => animate(el,
    [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
    { duration: 700, delay: 320 + index * 75 }
  ));
  animate(document.querySelector(".portrait-frame"),
    [{ opacity: 0, transform: "scale(.88)" }, { opacity: 1, transform: "scale(1)" }],
    { duration: 950, delay: 430 }
  );
  document.querySelectorAll(".float-card").forEach((el, index) => animate(el,
    [{ opacity: 0, transform: "translateY(35px) rotate(0)" }, { opacity: 1, transform: getComputedStyle(el).transform }],
    { duration: 720, delay: 560 + index * 110 }
  ));

  if (window.matchMedia("(min-width: 768px)").matches) {
    const visual = document.querySelector(".hero-visual");
    const floatCards = [...document.querySelectorAll(".float-card")];
    visual?.addEventListener("pointermove", event => {
      const rect = visual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      floatCards.forEach(card => {
        const depth = Number(card.dataset.depth || 1);
        const baseRotation = card.classList.contains("card-cuhk") ? 7 : -7;
        card.style.transform = `translate3d(${x * 34 * depth}px, ${y * 28 * depth}px, 0) rotate(${baseRotation}deg)`;
      });
    }, { passive: true });
  }

  const glow = document.querySelector(".cursor-glow");
  let glowX = innerWidth / 2;
  let glowY = innerHeight / 2;
  let targetX = glowX;
  let targetY = glowY;
  window.addEventListener("pointermove", event => { targetX = event.clientX; targetY = event.clientY; }, { passive: true });
  const driftGlow = () => {
    glowX += (targetX - glowX) * .08;
    glowY += (targetY - glowY) * .08;
    if (glow) glow.style.transform = `translate3d(${glowX - 240}px, ${glowY - 240}px, 0)`;
    requestAnimationFrame(driftGlow);
  };
  driftGlow();

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      animate(el, [{ opacity: 0, transform: "translateY(50px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 850 });
      revealObserver.unobserve(el);
    });
  }, { threshold: .12, rootMargin: "0px 0px -7%" });
  document.querySelectorAll(".section-heading, .gallery-heading, .project-reveal, .campus-entry, .evaluation-heading, .evaluation-capability, .evaluation-side").forEach(el => revealObserver.observe(el));

  const evaluationSection = document.querySelector(".evaluation");
  const evaluationVisual = evaluationSection?.querySelector(".evaluation-visual");
  const evaluationOrb = evaluationSection?.querySelector(".evaluation-orb");
  const orbCanvas = evaluationSection?.querySelector(".orb-canvas");

  if (evaluationSection && evaluationVisual && evaluationOrb && orbCanvas) {
    const orbContext = orbCanvas.getContext("2d");
    const orbPointCount = 620;
    const orbPoints = Array.from({ length: orbPointCount }, (_, index) => {
      const y = 1 - (index / (orbPointCount - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const angle = index * Math.PI * (3 - Math.sqrt(5));
      const seed = Math.abs(Math.sin(index * 12.9898) * 43758.5453) % 1;
      return {
        x: Math.cos(angle) * radiusAtY,
        y,
        z: Math.sin(angle) * radiusAtY,
        seed,
        currentX: Number.NaN,
        currentY: Number.NaN,
        previousX: Number.NaN,
        previousY: Number.NaN
      };
    });
    let orbWidth = 0;
    let orbHeight = 0;
    let orbFrame = 0;
    let orbIsVisible = false;
    let orbPointerX = 0;
    let orbPointerY = 0;
    let orbPointerTargetX = 0;
    let orbPointerTargetY = 0;
    let orbVortex = 0;
    let orbVortexTarget = 0;
    let orbLastTime = performance.now();

    const resizeOrb = () => {
      const rect = orbCanvas.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      orbWidth = Math.max(1, rect.width);
      orbHeight = Math.max(1, rect.height);
      orbCanvas.width = Math.round(orbWidth * pixelRatio);
      orbCanvas.height = Math.round(orbHeight * pixelRatio);
      orbContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      orbPoints.forEach(point => {
        if (Number.isFinite(point.currentX) && Number.isFinite(point.currentY)) return;
        point.currentX = orbWidth / 2;
        point.currentY = orbHeight / 2;
        point.previousX = point.currentX;
        point.previousY = point.currentY;
      });
    };

    const drawBlackHole = (centerX, centerY, sphereRadius, time, front = false) => {
      if (orbVortex < .025) return;
      const strength = Math.min(1, orbVortex);
      orbContext.save();
      orbContext.translate(centerX, centerY);
      orbContext.rotate(-.18 + orbPointerX * .16 + Math.sin(time * .0003) * .035);
      orbContext.scale(1, .31 + Math.abs(orbPointerY) * .08);

      if (!front) {
        const aura = orbContext.createRadialGradient(0, 0, sphereRadius * .05, 0, 0, sphereRadius * 1.65);
        aura.addColorStop(0, `rgba(90, 55, 255, ${.32 * strength})`);
        aura.addColorStop(.18, `rgba(46, 91, 255, ${.26 * strength})`);
        aura.addColorStop(.55, `rgba(20, 45, 155, ${.1 * strength})`);
        aura.addColorStop(1, "rgba(0, 0, 0, 0)");
        orbContext.fillStyle = aura;
        orbContext.beginPath();
        orbContext.arc(0, 0, sphereRadius * 1.65, 0, Math.PI * 2);
        orbContext.fill();

        orbContext.globalCompositeOperation = "lighter";
        for (let ring = 0; ring < 5; ring += 1) {
          const ringRadius = sphereRadius * (.33 + ring * .095 + Math.sin(time * .0014 + ring) * .012);
          orbContext.beginPath();
          orbContext.arc(0, 0, ringRadius, Math.PI * .08, Math.PI * 1.12);
          orbContext.strokeStyle = ring % 2
            ? `rgba(139, 76, 255, ${(.22 - ring * .025) * strength})`
            : `rgba(65, 139, 255, ${(.3 - ring * .03) * strength})`;
          orbContext.lineWidth = Math.max(1, 7 - ring);
          orbContext.shadowBlur = 22;
          orbContext.shadowColor = ring % 2 ? "#8a49ff" : "#3f86ff";
          orbContext.stroke();
        }
      } else {
        orbContext.globalCompositeOperation = "source-over";
        const voidGradient = orbContext.createRadialGradient(-sphereRadius * .045, -sphereRadius * .04, 0, 0, 0, sphereRadius * .255);
        voidGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        voidGradient.addColorStop(.58, "rgba(2, 2, 8, .99)");
        voidGradient.addColorStop(.78, `rgba(18, 13, 52, ${.95 * strength})`);
        voidGradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        orbContext.fillStyle = voidGradient;
        orbContext.beginPath();
        orbContext.arc(0, 0, sphereRadius * .27, 0, Math.PI * 2);
        orbContext.fill();

        orbContext.globalCompositeOperation = "lighter";
        orbContext.beginPath();
        orbContext.arc(0, 0, sphereRadius * .355, Math.PI * .03, Math.PI * .96);
        orbContext.strokeStyle = `rgba(203, 220, 255, ${.82 * strength})`;
        orbContext.lineWidth = 3.2;
        orbContext.shadowBlur = 28;
        orbContext.shadowColor = "#6b8cff";
        orbContext.stroke();
      }
      orbContext.restore();
      orbContext.globalCompositeOperation = "source-over";
    };

    const drawOrb = time => {
      if (!orbWidth || !orbHeight) resizeOrb();
      const frameScale = Math.min(2, Math.max(.45, (time - orbLastTime) / 16.667));
      orbLastTime = time;
      orbPointerX += (orbPointerTargetX - orbPointerX) * .06 * frameScale;
      orbPointerY += (orbPointerTargetY - orbPointerY) * .06 * frameScale;
      orbVortex += (orbVortexTarget - orbVortex) * (orbVortexTarget > orbVortex ? .042 : .06) * frameScale;
      orbContext.clearRect(0, 0, orbWidth, orbHeight);

      const centerX = orbWidth / 2 + orbPointerX * orbWidth * .075 * orbVortex;
      const centerY = orbHeight / 2 + orbPointerY * orbHeight * .055 * orbVortex;
      const sphereRadius = Math.min(orbWidth, orbHeight) * .31;
      const camera = sphereRadius * 3.65;
      const rotationY = time * .00016 + orbPointerX * .62;
      const rotationX = -.16 + Math.sin(time * .00024) * .055 + orbPointerY * .42;
      const cosY = Math.cos(rotationY);
      const sinY = Math.sin(rotationY);
      const cosX = Math.cos(rotationX);
      const sinX = Math.sin(rotationX);

      const projected = orbPoints.map(point => {
        const rotatedX = point.x * cosY + point.z * sinY;
        const rotatedZ = -point.x * sinY + point.z * cosY;
        const rotatedY = point.y * cosX - rotatedZ * sinX;
        const depth = point.y * sinX + rotatedZ * cosX;
        const perspective = camera / (camera - depth * sphereRadius);
        const homeX = centerX + rotatedX * sphereRadius * perspective;
        const homeY = centerY + rotatedY * sphereRadius * perspective;
        const homeAngle = Math.atan2(homeY - centerY, homeX - centerX);
        const homeRadius = Math.hypot(homeX - centerX, homeY - centerY);
        const innerStream = point.seed > .79;
        const streamSeed = innerStream ? (point.seed - .79) / .21 : point.seed / .79;
        const vortexRadius = innerStream
          ? sphereRadius * (.18 + streamSeed * .62)
          : sphereRadius * (.78 + streamSeed * 1.28);
        const spiralAngle = homeAngle
          + orbVortex * (1.45 + point.seed * 5.8)
          + time * .00042 * orbVortex * (.45 + point.seed * 1.4);
        const burst = Math.sin(Math.min(1, orbVortex) * Math.PI) * sphereRadius * (.25 + point.seed * .65);
        const galaxyRadius = vortexRadius + burst;
        const galaxyX = centerX + Math.cos(spiralAngle) * galaxyRadius;
        const galaxyY = centerY
          + Math.sin(spiralAngle) * galaxyRadius * (.34 + point.seed * .24)
          + (point.seed - .5) * sphereRadius * .18;
        const targetX = homeX + (galaxyX - homeX) * orbVortex;
        const targetY = homeY + (galaxyY - homeY) * orbVortex;

        point.previousX = point.currentX;
        point.previousY = point.currentY;
        point.currentX += (targetX - point.currentX) * (.065 + point.seed * .035) * frameScale;
        point.currentY += (targetY - point.currentY) * (.065 + point.seed * .035) * frameScale;
        return { point, depth, perspective, x: point.currentX, y: point.currentY };
      });

      drawBlackHole(centerX, centerY, sphereRadius, time, false);

      if (orbVortex < .75) {
        orbContext.beginPath();
        for (let index = 1; index < projected.length; index += 3) {
          const current = projected[index];
          const previous = projected[index - 1];
          const distance = Math.hypot(current.x - previous.x, current.y - previous.y);
          if (distance > sphereRadius * .31) continue;
          orbContext.moveTo(previous.x, previous.y);
          orbContext.lineTo(current.x, current.y);
        }
        orbContext.strokeStyle = `rgba(72, 112, 255, ${.13 * (1 - orbVortex)})`;
        orbContext.lineWidth = .7;
        orbContext.stroke();
      }

      orbContext.globalCompositeOperation = "lighter";
      projected
        .sort((a, b) => a.depth - b.depth)
        .forEach(projectedPoint => {
          const { point } = projectedPoint;
          const light = (projectedPoint.depth + 1) / 2;
          const speed = Math.hypot(point.currentX - point.previousX, point.currentY - point.previousY);
          if (orbVortex > .08 && speed > .16) {
            orbContext.beginPath();
            orbContext.moveTo(point.previousX, point.previousY);
            orbContext.lineTo(point.currentX, point.currentY);
            orbContext.strokeStyle = point.seed > .68
              ? `rgba(158, 91, 255, ${Math.min(.48, speed * .055) * orbVortex})`
              : `rgba(67, 144, 255, ${Math.min(.5, speed * .06) * orbVortex})`;
            orbContext.lineWidth = .45 + point.seed * 1.2;
            orbContext.stroke();
          }

          const dotRadius = .45 + light * 1.25 + orbVortex * point.seed * .65;
          orbContext.beginPath();
          orbContext.arc(projectedPoint.x, projectedPoint.y, dotRadius, 0, Math.PI * 2);
          orbContext.fillStyle = point.seed > .72
            ? `rgba(${Math.round(137 + light * 108)}, ${Math.round(82 + light * 130)}, 255, ${.34 + light * .62})`
            : `rgba(${Math.round(62 + light * 170)}, ${Math.round(108 + light * 140)}, 255, ${.28 + light * .7})`;
          orbContext.fill();
        });
      orbContext.globalCompositeOperation = "source-over";
      drawBlackHole(centerX, centerY, sphereRadius, time, true);
    };

    const animateOrb = time => {
      drawOrb(time);
      if (orbIsVisible && !reducedMotion) orbFrame = requestAnimationFrame(animateOrb);
    };

    resizeOrb();
    drawOrb(performance.now());
    window.addEventListener("resize", () => {
      resizeOrb();
      if (reducedMotion || !orbIsVisible) drawOrb(performance.now());
    }, { passive: true });

    if (!reducedMotion) {
      evaluationVisual.addEventListener("pointerenter", () => {
        orbVortexTarget = 1;
        evaluationVisual.classList.add("is-vortex");
      });
      evaluationVisual.addEventListener("pointermove", event => {
        const rect = evaluationVisual.getBoundingClientRect();
        orbPointerTargetX = (event.clientX - rect.left) / rect.width - .5;
        orbPointerTargetY = (event.clientY - rect.top) / rect.height - .5;
      }, { passive: true });
      evaluationVisual.addEventListener("pointerleave", () => {
        orbPointerTargetX = 0;
        orbPointerTargetY = 0;
        orbVortexTarget = 0;
        evaluationVisual.classList.remove("is-vortex");
      });
    }

    const orbVisibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        orbIsVisible = entry.isIntersecting;
        if (orbIsVisible && !reducedMotion) {
          cancelAnimationFrame(orbFrame);
          orbFrame = requestAnimationFrame(animateOrb);
        } else {
          cancelAnimationFrame(orbFrame);
        }
      });
    }, { threshold: .08 });
    orbVisibilityObserver.observe(evaluationSection);

    if (window.gsap) {
      const evaluationMedia = gsap.matchMedia();
      evaluationMedia.add({
        desktop: "(min-width: 768px)",
        reduceMotion: "(prefers-reduced-motion: reduce)"
      }, context => {
        const { desktop, reduceMotion } = context.conditions;
        if (reduceMotion) return undefined;

        const orbitTweens = [
          gsap.to(".orb-ring-a", { rotationZ: "+=360", duration: 17, repeat: -1, ease: "none", paused: true }),
          gsap.to(".orb-ring-b", { rotationZ: "-=360", rotationY: "+=360", duration: 23, repeat: -1, ease: "none", paused: true }),
          gsap.to(".orb-ring-c", { rotationX: "+=360", rotationZ: "+=180", duration: 19, repeat: -1, ease: "none", paused: true }),
          gsap.to(".orb-satellite-a", { x: 18, y: -11, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
          gsap.to(".orb-satellite-b", { x: -16, y: 14, duration: 3.6, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true }),
          gsap.to(".orb-satellite-c", { x: 10, y: -18, duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut", paused: true })
        ];

        if (desktop) {
          evaluationVisual.addEventListener("pointermove", event => {
            const rect = evaluationVisual.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;
            gsap.to(evaluationOrb, {
              x: x * 10,
              y: y * 8,
              rotationX: y * -5,
              rotationY: x * 7,
              duration: .55,
              ease: "power2.out",
              overwrite: "auto"
            });
          }, { passive: true });
          evaluationVisual.addEventListener("pointerleave", () => gsap.to(evaluationOrb, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            duration: .8,
            ease: "power3.out",
            overwrite: "auto"
          }));
        }

        let hasEntered = false;
        const evaluationObserver = new IntersectionObserver(entries => {
          entries.forEach(entry => {
            orbitTweens.forEach(tween => entry.isIntersecting ? tween.play() : tween.pause());
            if (!entry.isIntersecting || hasEntered) return;
            hasEntered = true;
            const entrance = gsap.timeline({ defaults: { duration: .72, ease: "power3.out" } });
            entrance
              .addLabel("intro", 0)
              .from(evaluationSection.querySelectorAll(".evaluation-intro > *"), { autoAlpha: 0, y: 28, stagger: .08 }, "intro")
              .from(evaluationSection.querySelectorAll(".evaluation-advantage-title > *"), { autoAlpha: 0, y: 18, stagger: .06 }, "intro+=.2")
              .from(evaluationSection.querySelectorAll(".evaluation-capability"), { autoAlpha: 0, y: 24, stagger: .075 }, "intro+=.3")
              .from(evaluationSection.querySelectorAll(".evaluation-personality-block > *"), { autoAlpha: 0, y: 18, stagger: .06 }, "intro+=.54")
              .from(evaluationVisual, { autoAlpha: 0, scale: .9, rotationY: -10, transformOrigin: "50% 50%" }, "intro+=.08")
              .from(evaluationOrb, { autoAlpha: 0, scale: .62, rotationZ: -14, duration: 1.15, ease: "back.out(1.35)" }, "intro+=.24");
          });
        }, { threshold: .24 });
        evaluationObserver.observe(evaluationSection);

        return () => {
          evaluationObserver.disconnect();
          orbitTweens.forEach(tween => tween.kill());
        };
      });
    }
  }

  const statementObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => entry.target.classList.toggle("is-lit", entry.isIntersecting));
  }, { threshold: .72 });
  document.querySelectorAll(".statement-copy span").forEach(el => statementObserver.observe(el));

  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const number = entry.target;
      const target = Number(number.dataset.count);
      const start = performance.now();
      const tick = now => {
        const progress = clamp(0, (now - start) / 1400, 1);
        number.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3)));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(number);
    });
  }, { threshold: .6 });
  document.querySelectorAll(".count-up").forEach(el => countObserver.observe(el));

  const honorsPanel = document.querySelector(".honors-reveal");
  if (honorsPanel && window.gsap) {
    const honorParts = [
      honorsPanel.querySelector(".honors-file-head"),
      ...honorsPanel.querySelectorAll(".honors-index li")
    ].filter(Boolean);
    const honorsObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        gsap.from(honorParts, {
          autoAlpha: 0,
          y: 22,
          duration: .72,
          stagger: .055,
          ease: "power3.out",
          clearProps: "opacity,visibility,transform"
        });
        honorsObserver.unobserve(entry.target);
      });
    }, { threshold: .28 });
    honorsObserver.observe(honorsPanel);

    honorsPanel.querySelectorAll(".honors-index li").forEach(item => {
      item.addEventListener("pointerenter", () => gsap.to(item, {
        x: 7,
        duration: .22,
        ease: "power2.out",
        overwrite: "auto"
      }));
      item.addEventListener("pointerleave", () => gsap.to(item, {
        x: 0,
        duration: .3,
        ease: "power2.out",
        overwrite: "auto"
      }));
    });
  }

  document.querySelectorAll(".tilt-card").forEach(card => {
    const image = card.querySelector(".work-image");
    card.addEventListener("pointermove", event => {
      const rect = card.getBoundingClientRect();
      const rx = ((event.clientY - rect.top) / rect.height - .5) * -3;
      const ry = ((event.clientX - rect.left) / rect.width - .5) * 3;
      image.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(.995)`;
    }, { passive: true });
    card.addEventListener("pointerleave", () => { image.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; });
  });

  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55%", threshold: 0 });
  document.querySelectorAll("main section[id]").forEach(section => navObserver.observe(section));

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const hero = document.querySelector(".hero");
      const portrait = document.querySelector(".portrait-frame");
      if (hero && portrait && scrollY < hero.offsetHeight) portrait.style.translate = `0 ${scrollY * .09}px`;
      ticking = false;
    });
  }, { passive: true });
})();
