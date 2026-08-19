"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { layers, techniques, type LayerId, type PracticeCase } from "./content";
import { siteBasePath } from "./site";

const repositoryUrl = "https://github.com/holynova/psy-talks";

const sourceLinks = [
  {
    label: "Clara E. Hill · Helping Skills, 5th ed.",
    href: "https://www.apa.org/pubs/books/4311039",
    note: "探索—领悟—行动",
  },
  {
    label: "Gerard Egan · The Skilled Helper",
    href: "https://www.cengage.com/c/the-skilled-helper-a-problem-management-and-opportunity-development-approach-to-helping-10e-egan/9781285065717/",
    note: "问题管理与机会发展",
  },
  {
    label: "NCBI · Person-Centered Therapy",
    href: "https://www.ncbi.nlm.nih.gov/books/NBK589708/",
    note: "共情、反映与积极关注",
  },
  {
    label: "Penn State · Counseling Microskills",
    href: "https://courses.worldcampus.psu.edu/welcome/rhs301/001/content/01_lesson/06_page.html",
    note: "提问、释义、情感反映、概述",
  },
];

const initialOpen = ["empathic-understanding"];

const testPrompts = [
  "我最近总觉得自己很失败，连休息都不敢。",
  "他一不回消息我就坐立不安，但我知道他可能只是忙。",
  "我是不是太脆弱了，怎么一点小事就想哭？",
  "我总觉得领导在针对我，可我又说不出具体是哪一次。",
  "我不想生孩子，家里人说我自私。",
  "你今天是不是有点不耐烦？",
  "我想和他亲近，但他一发消息我就不想回。",
  "我不想活了，但你别告诉任何人。",
  "我想好起来，可我不知道什么才算好起来。",
  "我们聊了很久，好像还是没有解决什么。",
  "我想辞职，可是家里现在离不开我的收入。",
  "我一直在照顾别人，最后却突然不想理任何人。",
  "我已经几个月没睡好，是不是该去看精神科？",
  "我每说一句话都要看你一眼，怕你觉得我说错了。",
  "我想和伴侣谈一件重要的事，但我们肯定会吵起来。",
  "我知道不该这样，可我还是停不下和同事暧昧。",
  "我这次又没完成记录练习，看来我就是坚持不了。",
  "我明明想升职，却总想躲开别人的反馈。",
  "我最近一想到上班就胸口发紧，可我不能辞职。",
  "我对孩子很没耐心，有时真想摔门就走。",
  "我什么都做不好，找优点也没有用。",
  "我不想见任何人，消息也不想回。",
  "我上次分手过了很久才恢复，这次是不是也不会好了？",
  "我希望他停止这样对我，可我不知道自己能做什么。",
];

function layerOf(id: LayerId) {
  return layers.find((layer) => layer.id === id) ?? layers[0];
}

function caseText(practiceCase: PracticeCase) {
  return [
    practiceCase.situation,
    ...practiceCase.wrong.map((item) => item.reply),
    ...practiceCase.better,
  ]
    .join(" ")
    .toLocaleLowerCase();
}

export default function Home() {
  const [activeLayer, setActiveLayer] = useState<LayerId | "all">("all");
  const [query, setQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(initialOpen.map((id) => [id, true])),
  );
  const [completed, setCompleted] = useState<string[]>([]);
  const [testIndex, setTestIndex] = useState(0);

  useEffect(() => {
    window.localStorage.setItem(
      "helper-skills-completed",
      JSON.stringify(completed),
    );
  }, [completed]);

  const visibleTechniques = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return techniques.filter((technique) => {
      const layerMatch = activeLayer === "all" || technique.layer === activeLayer;
      if (!layerMatch) return false;
      if (!normalized) return true;
      const searchText = [
        technique.title,
        technique.alias,
        technique.summary,
        technique.useWhen,
        technique.move,
        technique.watch,
        technique.mnemonic,
        technique.do,
        technique.dont,
        ...technique.cases.map(caseText),
      ]
        .join(" ")
        .toLocaleLowerCase();
      return searchText.includes(normalized);
    });
  }, [activeLayer, query]);

  const completedCount = completed.filter((id) =>
    techniques.some((technique) => technique.id === id),
  ).length;

  function scrollToSection(id: LayerId | "all") {
    setActiveLayer(id);
    if (id !== "all") {
      window.setTimeout(() => {
        document
          .getElementById("layer-" + id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    }
  }

  function toggleSection(id: string) {
    setOpenSections((current) => ({ ...current, [id]: !current[id] }));
  }

  function toggleCompleted(id: string) {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  }

  function setAllSections(open: boolean) {
    setOpenSections(
      Object.fromEntries(techniques.map((technique) => [technique.id, open])),
    );
  }

  function showRandomTestPrompt() {
    setTestIndex((current) => {
      let next = Math.floor(Math.random() * testPrompts.length);
      if (testPrompts.length > 1 && next === current) {
        next = (next + 1) % testPrompts.length;
      }
      return next;
    });
  }

  return (
    <main className="site-shell">
      <header className="masthead">
        <a className="wordmark" href="#top" aria-label="回到页面顶部">
          助人对话 <span>/</span> 练习册
        </a>
        <div className="masthead-meta">
          <span>移动端版</span>
          <span className="meta-dot" aria-hidden="true" />
          <span>v 1.1</span>
          <a className="version-link" href={`${siteBasePath}/v2`}>
            阅读版 v2 ↗
          </a>
        </div>
      </header>

      <div id="top" className="hero-grid">
        <section className="hero-copy" aria-labelledby="page-title">
          <p className="eyebrow">DIALOGUE FIELD NOTES · 01</p>
          <h1 id="page-title">
            先听懂，
            <br />
            再一起走下一步。
          </h1>
          <p className="hero-lede">
            把常见心理咨询对话微技能拆成能观察、能练习、能复盘的动作。
            不是话术库，而是一张帮助你减慢反应、提高准确度的地图。
          </p>
          <div className="hero-actions">
            <a className="primary-link" href="#map">
              开始练习 <span aria-hidden="true">↓</span>
            </a>
            <a className="quiet-link" href="#how-to-use">
              先看使用说明
            </a>
            <a className="quiet-link" href="#flash-test">
              随机自测
            </a>
          </div>
        </section>

        <aside className="hero-index" aria-label="内容概览">
          <div className="index-topline">
            <span>FIELD INDEX</span>
            <span>2026 / 08</span>
          </div>
          <div className="index-number">06</div>
          <div className="index-title">层次</div>
          <div className="index-rule" />
          <dl className="index-stats">
            <div>
              <dt>技巧</dt>
              <dd>{techniques.length}</dd>
            </div>
            <div>
              <dt>场景</dt>
              <dd>{techniques.length * 3}</dd>
            </div>
            <div>
              <dt>对照回复</dt>
              <dd>{techniques.length * 3 * 6}</dd>
            </div>
          </dl>
          <p className="index-caption">
            每个场景：3 个常见失误
            <br />
            + 3 个更稳妥示例
          </p>
        </aside>
      </div>

      <section className="warning-strip" aria-label="使用边界">
        <span className="warning-mark" aria-hidden="true">
          !
        </span>
        <p>
          <strong>先记住三件事：</strong>不急着解释，不抢着解决，不把猜测说成事实。
          本页用于学习与一般性助人练习，不替代心理治疗、医学评估、督导或危机干预。
        </p>
      </section>

      <section id="how-to-use" className="how-to-use">
        <div className="section-kicker">READ THE MAP</div>
        <div className="how-grid">
          <div>
            <h2>
              技巧有顺序，
              <br />
              但不是流水线。
            </h2>
          </div>
          <div className="how-body">
            <p>
              先建立关系，再澄清事实与体验；等情绪有了名字，才更适合一起看模式、定方向、做行动。
              真实会谈会来回移动，下面的层次是导航，不是固定脚本。
            </p>
            <div className="model-note">
              <span className="model-label">本页的骨架</span>
              <span>关系 → 澄清 → 情绪 → 模式 → 行动 → 安全</span>
            </div>
          </div>
        </div>
        <div className="book-note">
          <span className="book-note-label">名字先分清</span>
          <p>
            中文语境里的《助人技术》通常指 Clara E. Hill 的
            <em>Helping Skills</em>，主线是“探索—领悟—行动”。
            Gerard Egan 的 <em>The Skilled Helper</em> 是另一套“问题管理与机会发展”模型。
            两者都重视合作关系，但不要把作者和阶段模型混用。
          </p>
        </div>
        <div className="quick-rules" aria-label="总口诀">
          <div className="quick-rule">
            <span className="quick-rule-label">总口诀</span>
            <p>先人后事，先情后理，先问后劝，先稳后动。</p>
          </div>
          <div className="quick-rule">
            <span className="quick-rule-label">四不一问</span>
            <p>不抢答、不评判、不猜测、不急于解决；多问一句“我理解得对吗？”</p>
          </div>
        </div>
      </section>

      <section id="flash-test" className="flash-test" aria-labelledby="flash-title">
        <div className="flash-test-copy">
          <div className="section-kicker">RECALL BEFORE READING</div>
          <h2 id="flash-title">
            先回一句，
            <br />
            再看答案。
          </h2>
          <p>
            下面只给场景，不给参考回应。先在心里或纸上说一句，再回到技能地图自检：
            你先接住了什么？下一步问什么？
          </p>
        </div>
        <div className="flash-card" aria-live="polite">
          <div className="flash-card-topline">
            <span>RANDOM FLASHCARD</span>
            <span>{String(testIndex + 1).padStart(2, "0")} / {String(testPrompts.length).padStart(2, "0")}</span>
          </div>
          <p className="flash-prompt">“{testPrompts[testIndex]}”</p>
          <div className="flash-rule" />
          <p className="flash-instruction">停三秒。你会先说哪一句？</p>
          <button type="button" onClick={showRandomTestPrompt}>
            换一句 <span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>

      <section id="map" className="map-section" aria-labelledby="map-title">
        <div className="map-heading">
          <div>
            <div className="section-kicker">THE SKILL MAP</div>
            <h2 id="map-title">按层找动作</h2>
          </div>
          <p>
            从态度到技术，再回到安全边界。
            <br />
            点开一项，先读“怎么用”，再读场景对照。
          </p>
        </div>

        <nav className="layer-nav" aria-label="技巧层次">
          <button
            className={activeLayer === "all" ? "layer-tab is-active" : "layer-tab"}
            type="button"
            onClick={() => scrollToSection("all")}
          >
            <span className="tab-number">00</span>
            <span>全部</span>
          </button>
          {layers.map((layer) => (
            <button
              key={layer.id}
              className={
                activeLayer === layer.id ? "layer-tab is-active" : "layer-tab"
              }
              type="button"
              onClick={() => scrollToSection(layer.id)}
              style={{ "--tab-accent": layer.accent } as CSSProperties}
            >
              <span className="tab-number">{layer.number}</span>
              <span>
                {layer.title.replace("先把", "").replace("让", "").replace("把", "")}
              </span>
            </button>
          ))}
        </nav>

        <div className="tool-row">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">
              /
            </span>
            <span className="sr-only">搜索技巧、场景或回复</span>
            <input
              type="search"
              placeholder="搜索：具体化、失眠、边界……"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            {query ? (
              <button
                type="button"
                className="clear-search"
                aria-label="清空搜索"
                onClick={() => setQuery("")}
              >
                ×
              </button>
            ) : null}
          </label>
          <div className="tool-actions">
            <button type="button" onClick={() => setAllSections(true)}>
              展开全部
            </button>
            <button type="button" onClick={() => setAllSections(false)}>
              收起全部
            </button>
          </div>
        </div>

        <div className="result-line" aria-live="polite">
          <span>
            {query || activeLayer !== "all"
              ? "找到 " + visibleTechniques.length + " 项技巧"
              : "共 " + techniques.length + " 项技巧"}
          </span>
          <span className="progress-count">
            已读 {completedCount} / {techniques.length}
          </span>
        </div>

        <div className="technique-list">
          {layers.map((layer) => {
            const layerTechniques = visibleTechniques.filter(
              (technique) => technique.layer === layer.id,
            );
            if (layerTechniques.length === 0) return null;
            return (
              <section
                key={layer.id}
                id={"layer-" + layer.id}
                className="layer-section"
                style={{ "--layer-accent": layer.accent } as CSSProperties}
              >
                <div className="layer-heading">
                  <div className="layer-heading-main">
                    <span className="layer-number">{layer.number}</span>
                    <div>
                      <h3>{layer.title}</h3>
                      <p>{layer.subtitle}</p>
                    </div>
                  </div>
                  <span className="layer-count">
                    {String(layerTechniques.length).padStart(2, "0")} skills
                  </span>
                </div>

                <div className="technique-cards">
                  {layerTechniques.map((technique) => {
                    const layerInfo = layerOf(technique.layer);
                    const isOpen = Boolean(openSections[technique.id]);
                    const isDone = completed.includes(technique.id);
                    return (
                      <article
                        key={technique.id}
                        className={isDone ? "technique-card is-done" : "technique-card"}
                      >
                        <div className="technique-header">
                          <button
                            type="button"
                            className="technique-toggle"
                            aria-expanded={isOpen}
                            onClick={() => toggleSection(technique.id)}
                          >
                            <span className="technique-number">
                              {technique.number}
                            </span>
                            <span className="technique-title-wrap">
                              <span className="technique-title">
                                {technique.title}
                              </span>
                              <span className="technique-alias">
                                {technique.alias}
                              </span>
                            </span>
                            <span
                              className={isOpen ? "toggle-mark is-open" : "toggle-mark"}
                            >
                              +
                            </span>
                          </button>
                          <button
                            type="button"
                            className="practice-check"
                            aria-pressed={isDone}
                            aria-label={
                              isDone
                                ? "取消标记 " + technique.title
                                : "标记已读 " + technique.title
                            }
                            onClick={() => toggleCompleted(technique.id)}
                          >
                            <span aria-hidden="true">{isDone ? "✓" : ""}</span>
                          </button>
                        </div>

                        {isOpen ? (
                          <div className="technique-body">
                            <p className="technique-summary">{technique.summary}</p>
                            <div className="memory-card">
                              <div className="memory-head">
                                <span className="guidance-label">记忆卡</span>
                                <span className="memory-mnemonic">口诀：{technique.mnemonic}</span>
                              </div>
                              <div className="memory-columns">
                                <div className="memory-item">
                                  <span className="memory-label">该做</span>
                                  <p>{technique.do}</p>
                                </div>
                                <div className="memory-item is-dont">
                                  <span className="memory-label">不该做</span>
                                  <p>{technique.dont}</p>
                                </div>
                              </div>
                            </div>
                            <div className="technique-guidance">
                              <div>
                                <span className="guidance-label">适合用在</span>
                                <p>{technique.useWhen}</p>
                              </div>
                              <div>
                                <span className="guidance-label">动作提示</span>
                                <p>{technique.move}</p>
                              </div>
                              <div className="watch-out">
                                <span className="guidance-label">注意别滑过去</span>
                                <p>{technique.watch}</p>
                              </div>
                            </div>

                            <div className="practice-heading">
                              <div>
                                <span className="guidance-label">场景对照</span>
                                <h4>先辨认失误，再选一种回应</h4>
                              </div>
                              <span className="practice-count">03 CASES</span>
                            </div>

                            <div className="case-list">
                              {technique.cases.map((practiceCase, index) => (
                                <CaseBlock
                                  key={technique.id + "-" + index}
                                  practiceCase={practiceCase}
                                  index={index}
                                  accent={layerInfo.accent}
                                />
                              ))}
                            </div>
                          </div>
                        ) : null}
                      </article>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>

        {visibleTechniques.length === 0 ? (
          <div className="empty-state">
            <span className="empty-mark">?</span>
            <h3>没有找到这组词。</h3>
            <p>换一个更短的词，或先切回“全部”。</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setActiveLayer("all");
              }}
            >
              清除筛选
            </button>
          </div>
        ) : null}
      </section>

      <section className="closing-section">
        <div className="closing-quote">
          <span className="section-kicker">A SMALL REMINDER</span>
          <p>
            好的回应不一定漂亮，
            <br />
            但应该让对方更接近自己的经验，
            <br />
            而不是更接近你的答案。
          </p>
        </div>
        <div className="closing-side">
          <div className="closing-rule" />
          <p>
            如果对方出现明确的自伤、自杀、暴力或严重失控风险，
            不要只依赖对话技巧：直接评估当下危险，联系当地急救／危机服务，
            并连接可信任的现实支持。
          </p>
          <a className="back-top" href="#top">
            回到顶部 ↑
          </a>
        </div>
      </section>

      <footer id="sources" className="site-footer">
        <div className="footer-heading">
          <span className="section-kicker">REFERENCE SHEET</span>
          <h2>阅读线索</h2>
          <p>
            本页是学习型整理，不是对任何一本书的逐页复述。术语与框架做了面向移动阅读的重新编排。
          </p>
        </div>
        <div className="source-list">
          {sourceLinks.map((source, index) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="source-item"
            >
              <span className="source-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="source-copy">
                <span>{source.label}</span>
                <small>{source.note}</small>
              </span>
              <span className="source-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
          ))}
        </div>
        <div className="footer-bottom">
          <span>助人对话 / 练习册</span>
          <span>
            为学习者整理 · 请在督导与伦理框架内使用 · {" "}
            <a
              className="footer-repo-link"
              href={repositoryUrl}
              target="_blank"
              rel="noreferrer"
            >
              GitHub 源码 ↗
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}

function CaseBlock({
  practiceCase,
  index,
  accent,
}: {
  practiceCase: PracticeCase;
  index: number;
  accent: string;
}) {
  return (
    <details className="case-block">
      <summary>
        <span className="case-index">0{index + 1}</span>
        <span className="case-situation">{practiceCase.situation}</span>
        <span className="case-chevron" aria-hidden="true">
          +
        </span>
      </summary>
      <div
        className="case-content"
        style={{ "--case-accent": accent } as CSSProperties}
      >
        <div className="wrong-heading">
          <span className="wrong-dot" aria-hidden="true" />
          <span>三个容易滑过去的回复</span>
        </div>
        <div className="wrong-list">
          {practiceCase.wrong.map((item) => (
            <div className="wrong-item" key={item.label}>
              <div className="reply-meta">
                <span>{item.label}</span>
                <span className="reply-badge">不推荐</span>
              </div>
              <p className="reply-quote">“{item.reply}”</p>
              <p className="reply-why">{item.why}</p>
            </div>
          ))}
        </div>
        <div className="better-heading">
          <span className="better-dot" aria-hidden="true" />
          <span>三种可练习的回应</span>
        </div>
        <div className="better-list">
          {practiceCase.better.map((reply, responseIndex) => (
            <div className="better-item" key={responseIndex}>
              <div className="reply-meta">
                <span>回应 {String.fromCharCode(65 + responseIndex)}</span>
                <span className="reply-badge is-better">可练习</span>
              </div>
              <p className="better-quote">“{reply}”</p>
            </div>
          ))}
        </div>
        <p className="better-note">{practiceCase.note}</p>
      </div>
    </details>
  );
}
