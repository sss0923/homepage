const views = {
  home: document.querySelector('[data-view="home"]'),
  agent: document.querySelector('[data-view="agent"]'),
};

const processList = document.querySelector("#processList");
const resultArea = document.querySelector(".result-area");
const assistantStatus = document.querySelector(".assistant-status");
const taskToast = document.querySelector(".task-toast");
const taskActions = document.querySelector(".task-actions");
const processView = document.querySelector(".process-view");
const pivotView = document.querySelector(".pivot-view");
const chartCard = document.querySelector(".chart-card");
const chartTitle = document.querySelector(".chart-card h2");
const dateLabel = document.querySelector(".date-chip span");
const dateChip = document.querySelector(".date-chip strong");
const userBubble = document.querySelector(".user-bubble");
const selectedTable = document.querySelector(".selected-table strong");
const agentComplete = document.querySelector(".agent-complete");
const legend = document.querySelector(".legend");
const chartWrap = document.querySelector(".chart-wrap");
const orderPanel = document.querySelector(".order-panel");
const orderTotal = document.querySelector(".order-total");
const categoryAmounts = document.querySelector(".category-amounts");
const reportPanel = document.querySelector(".report-panel");
const reportFrame = document.querySelector(".report-panel iframe");
const funnelPanel = document.querySelector(".funnel-panel");
const fieldItem = document.querySelector('[data-field="category"]');
const rowZone = document.querySelector(".row-zone");
const pivotGuide = document.querySelector(".pivot-guide");
const pivotModeBtn = document.querySelector(".pivot-mode-btn");
const pivotDragDemo = document.querySelector(".pivot-drag-demo");
const pivotQuery = document.querySelector(".pivot-query");
const activeHistoryItem = document.querySelector(".history-item.is-active");
let chartDrawn = false;
let timers = [];
let chartState = { points: [] };
let activeCase = "daily-traffic";
let orderFieldPlaced = false;

const processSteps = [
  {
    title: "意图识别完成！",
    content: `{"classification": "《可能的数据分析请求》", "response": ""}`,
  },
  {
    title: "查询重写完成！",
    content: `{"standalone_query": "查询2026年4月每天的访问用户数量并用折线图展示趋势"}`,
  },
  {
    title: "获取证据完成！",
    content:
      "查询2026年4月每天的访问用户数量并用折线图展示趋势正在获取证据...已找到 5 条相关证据文档，如下是文档的部分信息：证据1：访问次数；证据2：活跃用户；访问用户；访问用户数；访问用户量；访问人数；证据3：下单用户数；证据4：日均订单量；证据5：订单量；",
  },
  {
    title: "问题增强完成！",
    content: `{ "canonical_query": "查询2026年4月1日至2026年4月30日期间，每天按用户ID去重统计的活跃用户数，并以折线图展示日活趋势", "expanded_queries": [ "统计2026年4月份每日的活跃用户数（按用户ID去重），并用折线图呈现每日变化趋势", "以折线图方式展示2026年4月每天的日活跃用户数量趋势变化" ]}`,
  },
  {
    title: "初步Schema信息召回完成.",
    content: "初步表信息召回完成，数量: 1，表名: 用户行为日表",
  },
  {
    title: "初始Schema构建完成.",
    content: "",
  },
  {
    title: "选择数据表完成。",
    content: "用户行为日表",
  },
  {
    title: "Schema选择处理完成.",
    content: `{ "thought_process" : "根据问题生成SQL", "execution_plan" : [ { "step" : 1, "tool_to_use" : "SQL_GENERATE_NODE", "tool_parameters" : { "instruction" : "SQL生成" } } ], "is_bi_datasource" : false}`,
  },
  {
    title: "SQL生成完成，准备执行",
    content:
      "SELECT DATE_FORMAT(m.field_1, '%Y-%m-%d') AS 日期, COUNT(DISTINCT m.field_2) AS 活跃用户数 FROM main_94002 m WHERE m.field_1 >= '2026-04-01' AND m.field_1 < '2026-05-01' GROUP BY DATE_FORMAT(m.field_1, '%Y-%m-%d') ORDER BY 日期",
  },
  {
    title: "语义一致性校验完成",
    content: "通过",
  },
  {
    title: "执行SQL完成",
    content:
      "执行SQL查询：SELECT DATE_FORMAT(m.field_1, '%Y-%m-%d') AS 日期, COUNT(DISTINCT m.field_2) AS 活跃用户数 FROM main_94002 m WHERE m.field_1 >= '2026-04-01' AND m.field_1 < '2026-05-01' GROUP BY DATE_FORMAT(m.field_1, '%Y-%m-%d') ORDER BY 日期",
  },
];

const reportProcessSteps = [
  {
    title: "推理计划完成！",
    content:
      "基于当前销售数据生成 HTML 经营报告，覆盖核心指标、趋势分析、品类结构与经营建议。",
  },
  {
    title: "工具调用完成！",
    content: "已加载深度洞察与报告生成能力。",
  },
  {
    title: "数据探查完成！",
    content: "已识别时间、地区、门店、商品、品类、销量、销售额、成本额等字段。",
  },
  {
    title: "核心指标计算完成！",
    content: "总销售、总毛利、毛利率、订单数、客单价、门店覆盖等指标已完成。",
  },
  {
    title: "多维度分析完成！",
    content: "已完成月度趋势、品类结构、Top 商品、省份分布与品类月份热力图。",
  },
  {
    title: "HTML 报告生成完成！",
    content: "商品销售经营报告已生成。",
  },
];

const funnelProcessSteps = [
  {
    title: "推理计划完成！",
    content: "识别为电商用户转化漏斗分析任务，使用 funnel-analysis 方法论执行。",
  },
  {
    title: "工具调用完成！",
    content: "已加载 funnel-analysis skill。",
  },
  {
    title: "Schema 信息召回完成！",
    content: "已识别访问、加购、下单、支付标志位与各步骤时间戳。",
  },
  {
    title: "漏斗设计完成！",
    content: "访问 → 加购 → 下单（结账） → 支付。",
  },
  {
    title: "数据查询完成！",
    content: "已计算各环节用户数、流失人数、单步转化率、累计转化率与平均耗时。",
  },
  {
    title: "漏斗分析报告完成！",
    content: "已输出关键洞察、瓶颈诊断与优化优先级。",
  },
];

const trafficValues = [
  1286, 1468, 1135, 1512, 1394, 1682, 1247, 1576, 1328, 1743,
  1815, 1096, 1172, 1928, 1439, 1588, 1664, 1351, 2016, 1269,
  1712, 1845, 1208, 1376, 1633, 1541, 1479, 982, 1768, 1695,
];

document.querySelectorAll("[data-route]").forEach((el) => {
  el.addEventListener("click", (event) => {
    event.preventDefault();
    showView(el.dataset.route);
  });
});

document.querySelectorAll("[data-case]").forEach((card) => {
  card.addEventListener("click", () => {
    showView("agent", card.dataset.case);
  });
});

document.querySelector(".interpret-btn").addEventListener("click", (event) => {
  const panel = document.querySelector(".insight-panel");
  const guide = document.querySelector(".interpret-guide");
  const shouldOpen = panel.hidden;
  panel.hidden = !shouldOpen;
  if (activeCase === "daily-traffic") {
    event.currentTarget.classList.toggle("is-active", shouldOpen);
    event.currentTarget.classList.remove("should-guide");
  } else {
    event.currentTarget.classList.remove("is-active", "should-guide");
  }
  guide.hidden = true;
  if (shouldOpen) {
    panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
});

taskActions.addEventListener("click", (event) => {
  if (event.target.matches(".replay-btn")) {
    if (activeCase === "order-amount") {
      startOrderDemo();
      return;
    }
    if (taskToast.classList.contains("is-complete")) {
      startActiveDemo();
    } else {
      showFinalResult();
    }
  }
});

fieldItem.addEventListener("click", placeOrderRowField);
fieldItem.addEventListener("dragstart", (event) => {
  event.dataTransfer.setData("text/plain", "category");
});
rowZone.addEventListener("dragover", (event) => {
  event.preventDefault();
});
rowZone.addEventListener("drop", (event) => {
  event.preventDefault();
  if (event.dataTransfer.getData("text/plain") === "category") {
    placeOrderRowField();
  }
});
pivotQuery.addEventListener("click", showOrderPivotResult);
reportFrame.addEventListener("load", () => {
  try {
    reportFrame.contentWindow.scrollTo(0, 0);
    reportFrame.contentWindow.dispatchEvent(new Event("resize"));
  } catch (error) {
    // File iframe may be isolated in some browsers; loading still works without resize access.
  }
});

function showView(route, caseId = "daily-traffic") {
  if (route === "home") {
    clearTimers();
    document.body.classList.remove("agent-active");
    views.agent.classList.remove("order-case", "report-case", "funnel-case");
    views.agent.hidden = true;
    views.home.hidden = false;
    return;
  }

  activeCase = caseId;
  document.body.classList.add("agent-active");
  views.home.hidden = true;
  views.agent.hidden = false;
  startActiveDemo();
}

function startActiveDemo() {
  if (activeCase === "order-amount") {
    startOrderDemo();
    return;
  }
  if (activeCase === "sales-report") {
    startReportDemo();
    return;
  }
  if (activeCase === "funnel-analysis") {
    startFunnelDemo();
    return;
  }
  startTrafficDemo();
}

function startTrafficDemo() {
  clearTimers();
  chartDrawn = false;
  views.agent.classList.remove("order-case", "report-case", "funnel-case");
  processView.hidden = false;
  pivotView.hidden = true;
  resultArea.hidden = true;
  taskToast.hidden = false;
  userBubble.textContent = "2026年4月每天有多少访问用户？用折线图表现趋势";
  activeHistoryItem.textContent = "2026年4月每天有多少访问用...";
  selectedTable.textContent = "用户行为日志";
  chartTitle.textContent = "2026年4月日活趋势";
  dateLabel.textContent = "日期";
  dateChip.textContent = "2026-04-01 ≤ 且 < 2026-05-01";
  agentComplete.querySelector("span").textContent = "深度探索完成";
  agentComplete.querySelector("small").textContent = "28s";
  legend.hidden = false;
  chartWrap.hidden = false;
  orderPanel.hidden = true;
  reportPanel.hidden = true;
  funnelPanel.hidden = true;
  reportFrame.removeAttribute("src");
  pivotModeBtn.classList.remove("is-active");
  pivotDragDemo.classList.add("is-hidden");
  document.querySelector(".insight-panel").hidden = true;
  document.querySelector(".interpret-btn").classList.remove("is-active", "should-guide");
  document.querySelector(".interpret-guide").hidden = true;
  assistantStatus.classList.remove("is-hidden");
  taskToast.classList.remove("is-complete");
  taskToast.querySelector("strong").textContent = "正在执行任务...";
  taskToast.querySelector(".replay-btn").textContent = "查看结果";
  taskToast.querySelector(".primary-task-btn").hidden = true;
  processList.innerHTML = "";

  processSteps.forEach((step) => {
    const item = document.createElement("li");
    item.className = "process-item";
    item.innerHTML = `
      <span class="check">✓</span>
      <div>
        <div class="process-title"><span>${step.title}</span></div>
        ${step.content ? `<div class="process-content">${escapeHtml(step.content)}</div>` : ""}
      </div>
    `;
    processList.appendChild(item);
  });

  const items = [...document.querySelectorAll(".process-item")];
  items.forEach((item, index) => {
    timers.push(
      window.setTimeout(() => {
        item.classList.add("is-visible");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 220 + index * 280)
    );
  });

  timers.push(
    window.setTimeout(() => {
      showFinalResult();
    }, 220 + processSteps.length * 280 + 260)
  );
}

function startOrderDemo() {
  clearTimers();
  chartDrawn = false;
  orderFieldPlaced = false;
  views.agent.classList.remove("report-case", "funnel-case");
  views.agent.classList.add("order-case");
  processView.hidden = true;
  pivotView.hidden = false;
  resultArea.hidden = false;
  taskToast.hidden = false;
  taskToast.classList.remove("is-complete");
  taskToast.querySelector("strong").textContent = "正在执行任务...";
  taskToast.querySelector(".replay-btn").textContent = "查看回放";
  taskToast.querySelector(".primary-task-btn").hidden = false;
  assistantStatus.classList.add("is-hidden");
  userBubble.textContent = "2026年4月总订单金额是多少？";
  activeHistoryItem.textContent = "2026年4月总订单金额是多少？";
  selectedTable.textContent = "订单交易表";
  chartTitle.textContent = "2026年4月订单支付金额合计";
  dateLabel.textContent = "日期";
  dateChip.textContent = "2026-04-01 ≤ 且 < 2026-04-30";
  agentComplete.querySelector("span").textContent = "深度探索完成";
  agentComplete.querySelector("small").textContent = "26s";
  document.querySelector(".insight-panel").hidden = true;
  document.querySelector(".interpret-btn").classList.remove("is-active", "should-guide");
  document.querySelector(".interpret-guide").hidden = true;
  legend.hidden = true;
  chartWrap.hidden = true;
  orderPanel.hidden = false;
  reportPanel.hidden = true;
  funnelPanel.hidden = true;
  reportFrame.removeAttribute("src");
  orderTotal.hidden = false;
  categoryAmounts.hidden = true;
  pivotModeBtn.classList.add("is-active");
  fieldItem.classList.add("is-guided");
  pivotQuery.disabled = true;
  pivotQuery.classList.remove("is-guided");
  pivotDragDemo.classList.remove("is-hidden");
  pivotGuide.className = "pivot-guide field-guide";
  pivotGuide.textContent = "点击“商品品类”，把它放到行维。";
  rowZone.querySelector("p").hidden = false;
  rowZone.querySelectorAll(".pill").forEach((pill) => pill.remove());
}

function startReportDemo() {
  clearTimers();
  chartDrawn = false;
  views.agent.classList.remove("order-case", "funnel-case");
  views.agent.classList.add("report-case");
  processView.hidden = false;
  pivotView.hidden = true;
  resultArea.hidden = true;
  taskToast.hidden = false;
  taskToast.classList.remove("is-complete");
  taskToast.querySelector("strong").textContent = "正在执行任务...";
  taskToast.querySelector(".replay-btn").textContent = "查看结果";
  taskToast.querySelector(".primary-task-btn").hidden = true;
  userBubble.textContent = "请基于当前销售数据，生成一份html格式的商品销售经营报告，并给出重点发现和经营建议。";
  activeHistoryItem.textContent = "请基于当前销售数据，生成...";
  selectedTable.textContent = "商品销售汇总表";
  chartTitle.textContent = "商品销售经营报告";
  dateLabel.textContent = "日期";
  dateChip.textContent = "2020-01-01 ≤ 且 < 2020-09-01";
  agentComplete.querySelector("span").textContent = "深度探索完成";
  agentComplete.querySelector("small").textContent = "7m 11s";
  legend.hidden = true;
  chartWrap.hidden = true;
  orderPanel.hidden = true;
  reportPanel.hidden = true;
  funnelPanel.hidden = true;
  reportFrame.removeAttribute("src");
  document.querySelector(".insight-panel").hidden = true;
  document.querySelector(".interpret-btn").classList.remove("is-active", "should-guide");
  document.querySelector(".interpret-guide").hidden = true;
  assistantStatus.classList.remove("is-hidden");
  pivotModeBtn.classList.remove("is-active");
  pivotDragDemo.classList.add("is-hidden");
  processList.innerHTML = "";

  reportProcessSteps.forEach((step) => {
    const item = document.createElement("li");
    item.className = "process-item";
    item.innerHTML = `
      <span class="check">✓</span>
      <div>
        <div class="process-title"><span>${step.title}</span></div>
        ${step.content ? `<div class="process-content">${escapeHtml(step.content)}</div>` : ""}
      </div>
    `;
    processList.appendChild(item);
  });

  const items = [...document.querySelectorAll(".process-item")];
  items.forEach((item, index) => {
    timers.push(
      window.setTimeout(() => {
        item.classList.add("is-visible");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 220 + index * 420)
    );
  });

  timers.push(
    window.setTimeout(() => {
      showReportFinalResult();
    }, 220 + reportProcessSteps.length * 420 + 320)
  );
}

function startFunnelDemo() {
  clearTimers();
  chartDrawn = false;
  views.agent.classList.remove("order-case", "report-case");
  views.agent.classList.add("funnel-case");
  processView.hidden = false;
  pivotView.hidden = true;
  resultArea.hidden = true;
  taskToast.hidden = false;
  taskToast.classList.remove("is-complete");
  taskToast.querySelector("strong").textContent = "正在执行任务...";
  taskToast.querySelector(".replay-btn").textContent = "查看结果";
  taskToast.querySelector(".primary-task-btn").hidden = true;
  userBubble.textContent = "使用funnel-analysis分析电商用户从访问-加购-下单-支付的转化漏斗，输出各环节数据与转化率。";
  activeHistoryItem.textContent = "使用funnel-analysis分析电商...";
  selectedTable.textContent = "funnel_single_table";
  chartTitle.textContent = "电商用户转化漏斗分析报告";
  agentComplete.querySelector("span").textContent = "深度探索完成";
  agentComplete.querySelector("small").textContent = "1m 10s";
  legend.hidden = true;
  chartWrap.hidden = true;
  orderPanel.hidden = true;
  reportPanel.hidden = true;
  funnelPanel.hidden = true;
  reportFrame.removeAttribute("src");
  document.querySelector(".insight-panel").hidden = true;
  document.querySelector(".interpret-btn").classList.remove("is-active", "should-guide");
  document.querySelector(".interpret-guide").hidden = true;
  assistantStatus.classList.remove("is-hidden");
  pivotModeBtn.classList.remove("is-active");
  pivotDragDemo.classList.add("is-hidden");
  processList.innerHTML = "";

  funnelProcessSteps.forEach((step) => {
    const item = document.createElement("li");
    item.className = "process-item";
    item.innerHTML = `
      <span class="check">✓</span>
      <div>
        <div class="process-title"><span>${step.title}</span></div>
        ${step.content ? `<div class="process-content">${escapeHtml(step.content)}</div>` : ""}
      </div>
    `;
    processList.appendChild(item);
  });

  const items = [...document.querySelectorAll(".process-item")];
  items.forEach((item, index) => {
    timers.push(
      window.setTimeout(() => {
        item.classList.add("is-visible");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }, 220 + index * 360)
    );
  });

  timers.push(
    window.setTimeout(() => {
      showFunnelFinalResult();
    }, 220 + funnelProcessSteps.length * 360 + 300)
  );
}

function placeOrderRowField() {
  if (activeCase !== "order-amount" || orderFieldPlaced) return;
  orderFieldPlaced = true;
  fieldItem.classList.remove("is-guided");
  pivotDragDemo.classList.add("is-hidden");
  rowZone.querySelector("p").hidden = true;
  rowZone.insertAdjacentHTML("beforeend", '<span class="pill blue">商品品类</span>');
  pivotQuery.disabled = false;
  pivotQuery.classList.add("is-guided");
  pivotGuide.className = "pivot-guide query-guide";
  pivotGuide.textContent = "商品品类已放入行维，点击右上角“查询”生成分类订单金额。";
}

function showOrderPivotResult() {
  if (activeCase !== "order-amount" || !orderFieldPlaced) return;
  orderTotal.hidden = true;
  categoryAmounts.hidden = false;
  pivotQuery.classList.remove("is-guided");
  pivotGuide.classList.add("is-hidden");
  pivotGuide.textContent = "已按商品品类生成订单金额数据透视结果。";
}

function showFinalResult() {
  if (activeCase === "order-amount") {
    showOrderPivotResult();
    return;
  }
  if (activeCase === "sales-report") {
    showReportFinalResult();
    return;
  }
  if (activeCase === "funnel-analysis") {
    showFunnelFinalResult();
    return;
  }
  clearTimers();
  document.querySelectorAll(".process-item").forEach((item) => {
    item.classList.add("is-visible");
  });
  assistantStatus.classList.add("is-hidden");
  resultArea.hidden = false;
  taskToast.classList.add("is-complete");
  taskToast.querySelector("strong").textContent = "每日访问量查询任务已完成";
  taskToast.querySelector(".replay-btn").textContent = "查看回放";
  taskToast.querySelector(".primary-task-btn").hidden = false;
  drawTrafficChart();
  showInterpretGuide();
}

function showReportFinalResult() {
  clearTimers();
  document.querySelectorAll(".process-item").forEach((item) => {
    item.classList.add("is-visible");
  });
  assistantStatus.classList.add("is-hidden");
  resultArea.hidden = false;
  reportPanel.hidden = false;
  reportFrame.src = "";
  window.requestAnimationFrame(() => {
    reportFrame.src = reportFrame.dataset.src;
  });
  taskToast.classList.add("is-complete");
  taskToast.querySelector("strong").textContent = "商品销售经营报告已完成";
  taskToast.querySelector(".replay-btn").textContent = "查看回放";
  taskToast.querySelector(".primary-task-btn").hidden = false;
}

function showFunnelFinalResult() {
  clearTimers();
  document.querySelectorAll(".process-item").forEach((item) => {
    item.classList.add("is-visible");
  });
  assistantStatus.classList.add("is-hidden");
  resultArea.hidden = false;
  funnelPanel.hidden = false;
  taskToast.classList.add("is-complete");
  taskToast.querySelector("strong").textContent = "电商用户转化漏斗分析已完成";
  taskToast.querySelector(".replay-btn").textContent = "查看回放";
  taskToast.querySelector(".primary-task-btn").hidden = false;
}

function showInterpretGuide() {
  const panel = document.querySelector(".insight-panel");
  if (!panel.hidden) return;
  document.querySelector(".interpret-btn").classList.add("should-guide");
  document.querySelector(".interpret-guide").hidden = false;
}

function clearTimers() {
  timers.forEach((timer) => window.clearTimeout(timer));
  timers = [];
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function drawTrafficChart() {
  if (chartDrawn) return;
  chartDrawn = true;

  const canvas = document.querySelector("#trafficChart");
  const ctx = canvas.getContext("2d");
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = Math.round(rect.width * ratio);
  canvas.height = Math.round(rect.height * ratio);
  ctx.scale(ratio, ratio);

  const width = rect.width;
  const height = rect.height;
  const padding = { top: 16, right: 24, bottom: 74, left: 46 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;
  const maxValue = Math.max(...trafficValues);
  const yMax = Math.ceil(maxValue / 500) * 500;
  const yTicks = Array.from({ length: 6 }, (_, index) => Math.round((yMax / 5) * index));

  ctx.clearRect(0, 0, width, height);
  ctx.font = "12px Inter, Microsoft YaHei, sans-serif";
  ctx.textBaseline = "middle";

  yTicks.forEach((tick) => {
    const y = padding.top + plotH - (tick / yMax) * plotH;
    ctx.strokeStyle = "#e7ebf1";
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();

    ctx.fillStyle = "#8b94a4";
    ctx.setLineDash([]);
    ctx.textAlign = "right";
    ctx.fillText(tick.toLocaleString("zh-CN"), padding.left - 8, y);
  });

  const points = trafficValues.map((value, index) => {
    const x = padding.left + (index / (trafficValues.length - 1)) * plotW;
    const y = padding.top + plotH - (value / yMax) * plotH;
    const day = String(index + 1).padStart(2, "0");
    return { x, y, value, date: `2026-04-${day}`, label: `04/${day}` };
  });
  chartState = { points, padding, plotW, plotH, yMax };

  ctx.strokeStyle = "#2184ff";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.stroke();

  points.forEach((point) => {
    ctx.fillStyle = "#2184ff";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.7, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = "#8b94a4";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (let index = 0; index < 30; index += 1) {
    const x = padding.left + (index / 29) * plotW;
    const y = padding.top + plotH + 30;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(`04/${String(index + 1).padStart(2, "0")}`, 0, 0);
    ctx.restore();
  }

  setupChartTooltip(canvas);
}

function setupChartTooltip(canvas) {
  const wrap = canvas.closest(".chart-wrap");
  let tooltip = wrap.querySelector(".chart-tooltip");

  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.className = "chart-tooltip";
    wrap.appendChild(tooltip);
  }

  canvas.onmousemove = (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const nearest = chartState.points.reduce((best, point) => {
      const distance = Math.hypot(point.x - x, point.y - y);
      return distance < best.distance ? { point, distance } : best;
    }, { point: null, distance: Infinity });

    if (!nearest.point || nearest.distance > 18) {
      tooltip.classList.remove("is-visible");
      return;
    }

    tooltip.innerHTML = `
      <div class="chart-tooltip-date">${nearest.point.date}</div>
      <div class="chart-tooltip-row"><span></span>活跃用户数 <strong>${nearest.point.value.toLocaleString("zh-CN")}</strong></div>
    `;
    tooltip.style.left = `${Math.min(Math.max(nearest.point.x + 12, 8), rect.width - 170)}px`;
    tooltip.style.top = `${Math.max(nearest.point.y - 66, 8)}px`;
    tooltip.classList.add("is-visible");
  };

  canvas.onmouseleave = () => {
    tooltip.classList.remove("is-visible");
  };
}

window.addEventListener("resize", () => {
  if (!resultArea.hidden && activeCase === "daily-traffic") {
    chartDrawn = false;
    drawTrafficChart();
  }
});
