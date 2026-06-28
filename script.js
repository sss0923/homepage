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
      title: "我把专业知识，做成四个真实世界的答案",
      lead: "大二系统学习专业知识后，我不再满足于只在课堂里得到标准答案，而是开始把模型、数据与产品方法带进真实问题：从低碳行为、智能车队到地下物流与校园服务。",
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
      category: "本科毕业 · 方向确认",
      date: "2025.06",
      title: "毕业这一年，我终于把自己的优势说清楚",
      lead: "高绩点、奖学金和竞赛荣誉给了本科四年一个漂亮的句号；主修交通工程、辅修计算机科学与技术的经历，则让我看清真正想走的方向。",
      stats: [["3.67", "本科 GPA / 4.0"], ["TOP 10%", "专业排名"], ["交通 × 计算机", "复合背景"]],
      body: `
        <p class="story-paragraph">本科四年，我在专业学习、科研竞赛、学生工作和产品实践之间不断切换。毕业时回头看，这些经历并不分散：工程训练让我理解复杂系统，计算机辅修让我能与技术对话，而一次次组织与实践让我更关注用户和结果。</p>
        <p class="story-paragraph">于是，“懂技术 × 懂产品”不再只是一句求职标签，而成为我下一阶段明确要积累的复合能力——站在用户、业务与技术之间，把不同语言翻译成真正能落地的产品。</p>
        <section class="story-honors" aria-label="代表性荣誉">
          <p class="story-honors-title">SELECTED HONORS <span>代表性荣誉</span></p>
          <span>温氏筠诚 / 广科企业奖学金</span><span>华南理工大学二等奖学金</span><span>全国大学生交通科技大赛二等奖</span><span>全国节能减排竞赛三等奖</span>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-04.jpg",
      alt: "苏弈秋在美团暑期实习期间留影",
      category: "本科至硕士 · 实习实践",
      date: "2024 — 2026",
      title: "四段实习后，我开始读懂一款产品如何落地",
      lead: "从本科阶段开始，我先后走进小鹏、货拉拉、美团与 vivo。场景从飞行汽车、研发效能到自动驾驶和 Data Agent 不断变化，但我始终在做同一件事：理解真实业务，让技术能力转化为用户能感知的产品价值。",
      stats: [["4 段", "连续实习实践"], ["2 年+", "跨阶段业务积累"], ["技术 × 业务", "复合产品视角"]],
      body: `
        <section class="story-role">
          <div class="story-role-head"><strong>小鹏汽车 · 项目管理实习生</strong><span>2024.07 — 10</span></div>
          <p>从 X3 飞行汽车试制 BOM、ERP 数据到整车节点与设变流程，第一次理解复杂硬件产品如何依靠准确数据和跨团队协同向前推进。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>货拉拉 · 产品项目实习生</strong><span>2024.10 — 2025.03</span></div>
          <p>从 0 到 1 设计研发协同工作台，并用 Python 建立项目交付周期回归模型；我开始从“推进项目”转向“设计让协作更高效的产品”。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>美团 · 产品运营实习生</strong><span>2025.05 — 08</span></div>
          <p>基于 SQL 建设无人车指标体系，联动路测、数仓与算法团队完成异常闭环，推动自动驾驶里程占比从 57% 稳定提升至 70%。</p>
        </section>
        <section class="story-role">
          <div class="story-role-head"><strong>vivo · Data Agent 产品策划</strong><span>2026.05 — 09</span></div>
          <p>负责首页、体验馆与 Skill 市场策划，继续练习把技术能力组织成清晰、可发现、可使用的体验，完成从业务产品到 AI 产品的能力迁移。</p>
        </section>
      `
    },
    {
      image: "assets/gallery/gallery-05.jpg",
      alt: "苏弈秋获香港中文大学信息工程系最佳学术表现奖",
      category: "硕士进阶 · CUHK",
      date: "2026.05",
      title: "换一座校园，我仍把自己放在前 5%",
      lead: "进入香港中文大学信息工程硕士项目后，我把本科形成的学习方法带进更密集的技术课程，凭全年级 TOP 5% 的成绩获得信息工程系最佳学术表现奖。",
      stats: [["TOP 5%", "全年级学业表现"], ["BEST", "Academic Performance"], ["CUHK", "信息工程硕士"]],
      body: `
        <p class="story-paragraph">这一次的变化，不只是从本科生成为硕士生，而是从跨学科探索走向更主动的能力整合：用研究训练保持严谨，用信息工程课程补深技术，再把实习中的用户与业务视角带回课堂。</p>
        <p class="story-paragraph">最佳学术表现奖是对成绩的认可，也是我继续成为“懂技术 × 懂产品”复合人才的新起点。面对更复杂的系统，我希望既能理解底层逻辑，也能做出清晰、可靠且真正有用的产品决策。</p>
      `
    }
  ];
  let galleryIndex = 0;

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
    storyStats.innerHTML = story.stats.map(([value, label]) => `<div class="story-stat"><strong>${value}</strong><span>${label}</span></div>`).join("");
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
    galleryIndex = clamp(0, index, galleryCards.length - 1);
    galleryCurrent.textContent = String(galleryIndex + 1).padStart(2, "0");
    galleryPrev.disabled = galleryIndex === 0;
    galleryNext.disabled = galleryIndex === galleryCards.length - 1;
    galleryCards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === galleryIndex));
    galleryYears.forEach((year, yearIndex) => {
      const active = yearIndex === galleryIndex;
      year.classList.toggle("is-active", active);
      year.setAttribute("aria-pressed", String(active));
    });
  };

  const goToGalleryCard = index => {
    const nextIndex = clamp(0, index, galleryCards.length - 1);
    if (galleryTrack.scrollWidth > galleryTrack.clientWidth + 4) {
      galleryCards[nextIndex].scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "nearest",
        inline: "start"
      });
    }
    setGalleryIndex(nextIndex);
  };

  galleryPrev?.addEventListener("click", () => goToGalleryCard(galleryIndex - 1));
  galleryNext?.addEventListener("click", () => goToGalleryCard(galleryIndex + 1));
  galleryYears.forEach(year => year.addEventListener("click", () => goToGalleryCard(Number(year.dataset.galleryIndex))));
  document.querySelectorAll(".story-trigger").forEach(trigger => trigger.addEventListener("click", () => openGalleryStory(Number(trigger.dataset.storyIndex))));
  storyClose?.addEventListener("click", closeGalleryStory);
  storyDialog?.addEventListener("close", () => { document.body.style.overflow = ""; });
  storyDialog?.addEventListener("click", event => {
    if (event.target === storyDialog) closeGalleryStory();
  });

  if (galleryTrack) {
    let galleryTicking = false;
    galleryTrack.addEventListener("scroll", () => {
      if (galleryTicking) return;
      galleryTicking = true;
      requestAnimationFrame(() => {
        const trackLeft = galleryTrack.getBoundingClientRect().left;
        let nearestIndex = 0;
        let nearestDistance = Infinity;
        galleryCards.forEach((card, index) => {
          const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestIndex = index;
          }
        });
        setGalleryIndex(nearestIndex);
        galleryTicking = false;
      });
    }, { passive: true });
  }

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
  document.querySelectorAll(".section-heading, .gallery-heading, .project-reveal, .work-card, .about-grid").forEach(el => revealObserver.observe(el));

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
