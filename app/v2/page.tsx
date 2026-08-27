"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { techniques, type PracticeCase, type Technique } from "../content";
import { siteBasePath } from "../site";

const repositoryUrl = "https://github.com/holynova/psy-talks";

const sectionBlueprint = [
  {
    title: "一、基础与倾听（基石）",
    subtitle: "先稳住关系，再把体验说清楚",
    ids: [
      "nonjudgmental-stance",
      "empathic-understanding",
      "concretization",
      "reflection-of-feeling",
      "validation-normalization",
      "open-questions",
    ],
  },
  {
    title: "二、进阶与干预（觉察）",
    subtitle: "从片段走向理解，从理解回到当下",
    ids: [
      "paraphrase",
      "focusing-summarizing",
      "theme-pattern",
      "gentle-challenge",
      "silence-minimal-encouragers",
      "immediacy",
    ],
  },
  {
    title: "三、目标与改变（行动）",
    subtitle: "让方向可见，让边界可执行",
    ids: [
      "goal-clarification",
      "resources-exceptions",
      "small-step-action",
      "congruence-boundary",
      "information-permission",
      "risk-referral",
    ],
  },
];

const englishNames: Record<string, string> = {
  "nonjudgmental-stance": "Non-judgmental Stance",
  "empathic-understanding": "Empathic Understanding",
  concretization: "Concretization",
  "reflection-of-feeling": "Reflection of Feeling",
  "validation-normalization": "Validation & Normalization",
  "open-questions": "Open Questions",
  paraphrase: "Paraphrase",
  "focusing-summarizing": "Focusing & Summarizing",
  "theme-pattern": "Theme & Pattern",
  "gentle-challenge": "Gentle Challenge",
  "silence-minimal-encouragers": "Silence & Minimal Encouragers",
  immediacy: "Immediacy",
  "goal-clarification": "Goal Clarification",
  "resources-exceptions": "Resources & Exceptions",
  "small-step-action": "Small-step Action",
  "congruence-boundary": "Congruence & Boundaries",
  "information-permission": "Information & Advice",
  "risk-referral": "Risk Screening & Referral",
};

const recallPrompts = [
  "我觉得自己很失败，连休息都不敢。",
  "我不想生孩子，家里人说我自私。",
  "他一不回消息我就坐立不安。",
  "你今天是不是有点不耐烦？",
  "我不想活了，但你别告诉任何人。",
  "我想好起来，可我不知道什么才算好起来。",
  "我想和伴侣谈，但我们肯定会吵起来。",
  "我什么都做不好，找优点也没有用。",
  "我最近一想到上班就胸口发紧。",
  "我每说一句话都要看你的反应。",
  "我想让他停止这样对我，可我不知道能做什么。",
  "我们聊了很久，好像还是没有解决什么。",
];

function findTechnique(id: string): Technique {
  return techniques.find((technique) => technique.id === id) ?? techniques[0];
}

function removeOuterQuotes(text: string) {
  const value = text.trim();
  const startsWithQuote = /^[“‘\"']/.test(value);
  const endsWithQuote = /[”’\"']$/.test(value);

  return startsWithQuote && endsWithQuote ? value.slice(1, -1).trim() : value;
}

function CaseComparison({
  practiceCase,
  caseNumber,
}: {
  practiceCase: PracticeCase;
  caseNumber: string;
}) {
  return (
    <article className="v2-case">
      <div className="v2-case-label">
        <span>CASE {caseNumber}</span>
      </div>
      <blockquote>{removeOuterQuotes(practiceCase.situation)}</blockquote>
      <div className="v2-comparison">
        <section className="v2-response v2-response-wrong" aria-label="别做啥">
          <h4>别做啥 <small>错误示范</small></h4>
          <ul>
            {practiceCase.wrong.map((item) => (
              <li key={item.label}>
                <p className="v2-reply">{removeOuterQuotes(item.reply)}</p>
                <p className="v2-why">{item.label}：{item.why}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="v2-response v2-response-better" aria-label="要说啥">
          <h4>要说啥 <small>正确示范</small></h4>
          <ul>
            {practiceCase.better.map((reply, index) => (
              <li key={reply}>
                <p className="v2-reply">{removeOuterQuotes(reply)}</p>
                <p className="v2-why">回应 {String.fromCharCode(65 + index)} · 保留对方的选择权</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <p className="v2-case-note">练习重点：{practiceCase.note}</p>
    </article>
  );
}

export default function ReadingEdition() {
  const [isDark, setIsDark] = useState(false);
  const [recallIndex, setRecallIndex] = useState(0);
  const [activeTechnique, setActiveTechnique] = useState("nonjudgmental-stance");

  useEffect(() => {
    const targets = sectionBlueprint
      .flatMap((section) => section.ids)
      .map((id) => document.getElementById(`v2-${id}`))
      .filter((target): target is HTMLElement => Boolean(target));

    if (!targets.length || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveTechnique(visible.target.id.replace("v2-", ""));
      },
      { rootMargin: "-112px 0px -68% 0px", threshold: [0, 0.1, 0.5] },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function nextRecall() {
    setRecallIndex((current) => (current + 1) % recallPrompts.length);
  }

  return (
    <main className={isDark ? "v2-shell v2-dark" : "v2-shell"}>
      <aside className="v2-sidebar">
        <div className="v2-brand">
          <a href={`${siteBasePath}/`}>助人对话 <span>{"//"}</span> SKILLS</a>
          <span>Reading Edition</span>
        </div>
        <div className="v2-sidebar-rule" />
        <p className="v2-breadcrumb">— 助人技术（重排版）</p>
        <nav className="v2-toc" aria-label="阅读版章节导航">
          {sectionBlueprint.map((section, sectionIndex) => (
            <div className="v2-toc-section" key={section.title}>
              <p>{section.title}</p>
              <span>{section.subtitle}</span>
              <ol>
                {section.ids.map((id, index) => {
                  const technique = findTechnique(id);
                  const number = sectionIndex * 6 + index + 1;
                  return (
                    <li key={id}>
                      <a
                        href={`#v2-${id}`}
                        className={activeTechnique === id ? "is-active" : undefined}
                        aria-current={activeTechnique === id ? "location" : undefined}
                        onClick={() => setActiveTechnique(id)}
                        title={technique.title}
                      >
                        <span>{String(number).padStart(2, "0")}. {technique.title}</span>
                        <small>#{String(number).padStart(2, "0")}</small>
                      </a>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </nav>
        <div className="v2-sidebar-bottom">
          <button type="button" onClick={() => setIsDark((current) => !current)}>
            <span className="v2-wide-label">{isDark ? "切换明亮模式" : "切换暗黑模式"}</span>
            <span className="v2-compact-label">{isDark ? "明亮" : "暗色"}</span>
          </button>
        </div>
      </aside>

      <div className="v2-main">
        <header className="v2-topbar">
          <div>
            <span className="v2-eyebrow">HELPING SKILLS / RE-EDITED</span>
            <h1>助人对话训练手册</h1>
          </div>
        </header>

        <section className="v2-recall" aria-labelledby="v2-recall-title">
          <div>
            <span className="v2-eyebrow">RECALL BEFORE READING</span>
            <h2 id="v2-recall-title">先回一句，再看答案。</h2>
          </div>
          <div className="v2-recall-card">
            <span>闪卡 {String(recallIndex + 1).padStart(2, "0")} / {String(recallPrompts.length).padStart(2, "0")}</span>
            <p>{removeOuterQuotes(recallPrompts[recallIndex])}</p>
            <button type="button" onClick={nextRecall}>换一个场景</button>
          </div>
        </section>

        <div className="v2-intro-note">
          <strong>阅读方式</strong>
          <span>每项技能先看“该做 / 不该做”，再读核心定义，最后用案例对照自己的第一反应。</span>
        </div>

        {sectionBlueprint.map((section, sectionIndex) => (
          <section className="v2-section" key={section.title}>
            <div className="v2-section-heading">
              <div>
                <span className="v2-eyebrow">SECTION {String(sectionIndex + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
              </div>
              <p>{section.subtitle}</p>
            </div>

            {section.ids.map((id, techniqueIndex) => {
              const technique = findTechnique(id);
              const number = sectionIndex * 6 + techniqueIndex + 1;
              const accent = sectionIndex === 0 ? "#2c7ab6" : sectionIndex === 1 ? "#71599b" : "#3b8063";
              return (
                <article
                  className="v2-technique"
                  id={`v2-${id}`}
                  key={id}
                  style={{ "--v2-accent": accent } as CSSProperties}
                >
                  <header className="v2-technique-heading">
                    <span className="v2-tech-badge">TECH #{String(number).padStart(2, "0")}</span>
                    <h3>{technique.title} <small>({englishNames[id]})</small></h3>
                  </header>

                  <div className="v2-guardrail">
                    <div className="v2-guardrail-do-not">
                      <strong>别做啥</strong>
                      <span>{technique.dont}</span>
                    </div>
                    <div className="v2-guardrail-do">
                      <strong>要做啥</strong>
                      <span>{technique.do}</span>
                    </div>
                  </div>

                  <div className="v2-definition">
                    <strong>核心定义：</strong>
                    <span>{technique.summary}</span>
                    <em>口诀：{technique.mnemonic}</em>
                  </div>

                  <div className="v2-cases">
                    {technique.cases.map((practiceCase, caseIndex) => (
                      <CaseComparison
                        key={`${id}-${caseIndex}`}
                        practiceCase={practiceCase}
                        caseNumber={`${sectionIndex + 1}.${caseIndex + 1}`}
                      />
                    ))}
                  </div>
                </article>
              );
            })}
          </section>
        ))}

        <footer className="v2-footer">
          <p>好的回应不一定漂亮，但应该让对方更接近自己的经验，而不是更接近你的答案。</p>
          <div>
            <span>助人技术 · 阅读版 v2</span>
            <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub 源码 ↗</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
