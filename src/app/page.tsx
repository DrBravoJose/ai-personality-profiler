"use client";

import { useState, useEffect } from "react";
import { DICT, Language } from "@/lib/i18n";

export default function Home() {
  const [sessionId, setSessionId] = useState("");
  const [lang, setLang] = useState<Language>('en'); // 默认英文
  const [copied, setCopied] = useState(false);

  // 页面加载时自动检测浏览器语言
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('zh')) {
        setLang('zh');
      } else {
        setLang('en');
      }
    }
  }, []);

  const dict = DICT[lang];

  const generateLink = () => {
    setSessionId(Math.random().toString(36).substring(2, 10));
  };

  const copyRawPrompt = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
    const text = `${dict.promptHeader}\n\n${dict.promptFooter(baseUrl, sessionId, lang)}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
      {/* Language toggle */}
      <header style={{
        display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
        padding: '12px 16px',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(245,247,250,0.85)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {(['en', 'zh'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{
              padding: '6px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600,
              border: 'none', cursor: 'pointer',
              background: lang === l ? '#2d3748' : 'transparent',
              color: lang === l ? '#fff' : '#718096',
            }}>{l === 'en' ? 'EN' : '中文'}</button>
          ))}
        </div>
      </header>

      {/* Main */}
      <main style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: !sessionId ? 'center' : 'flex-start',
        padding: '24px 16px 40px', maxWidth: 560, margin: '0 auto', width: '100%',
      }}>
        {/* Hero */}
        <div className="animate-slide-up" style={{ textAlign: 'center', marginBottom: 32, width: '100%' }}>
          <h1 style={{ fontSize: '1.875rem', marginBottom: 8, lineHeight: 1.25 }}>
            {dict.heroTitle}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            {dict.heroSubtitle}
          </p>
        </div>

        {!sessionId ? (
          <button onClick={generateLink} className="mbti-btn mbti-btn-primary" style={{
            fontSize: '1.0625rem', padding: '16px 36px',
          }}>
            {lang === 'zh' ? '🧪 生成 AI 性格试卷' : '🧪 Generate AI Test'}
          </button>
        ) : (
          <div className="animate-slide-up" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Method 1 */}
            <div className="mbti-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: '50%', fontSize: 13, fontWeight: 700,
                  background: 'var(--color-green)', color: '#fff',
                }}>1</span>
                <h3 style={{ color: 'var(--color-green)', fontSize: '1rem', margin: 0 }}>
                  {dict.method1Title}
                </h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: 16 }}>
                {dict.method1Desc}
              </p>
              <button onClick={copyRawPrompt} className="mbti-btn" style={{
                width: '100%', background: copied ? '#2c8c63' : 'var(--color-green)',
                color: '#fff', border: 'none',
              }}>
                {copied
                  ? (lang === 'zh' ? '✅ 已复制到剪贴板！' : '✅ Copied!')
                  : dict.copyBtn}
              </button>
            </div>

            {/* Method 2 */}
            <div className="mbti-card" style={{ opacity: 0.85 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  width: 28, height: 28, borderRadius: '50%', fontSize: 13, fontWeight: 700,
                  background: 'var(--color-purple)', color: '#fff',
                }}>2</span>
                <h3 style={{ color: 'var(--color-purple)', fontSize: '1rem', margin: 0 }}>
                  {dict.method2Title}
                </h3>
              </div>

              <div className="note-box" style={{ marginBottom: 12 }}>
                {lang === 'zh'
                  ? '⚠️ 此功能需要通过 ngrok 等工具将本地服务映射为公网地址后才能被 AI 访问。localhost 地址无法被远程 AI 读取。'
                  : '⚠️ This requires exposing your local server via ngrok or similar. AI cannot access localhost URLs.'}
              </div>

              <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', lineHeight: 1.6, marginBottom: 12 }}>
                {dict.method2Desc}
              </p>

              <div style={{
                padding: '10px 12px', background: '#f7fafc', border: '1px solid #e2e8f0',
                borderRadius: 10, fontFamily: 'monospace', fontSize: '0.75rem',
                wordBreak: 'break-all', lineHeight: 1.5, marginBottom: 12, color: '#718096',
              }}>
                {typeof window !== 'undefined' ? `${window.location.origin}/exam/${sessionId}?lang=${lang}` : '...'}
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={() => {
                  const url = typeof window !== 'undefined' ? `${window.location.origin}/exam/${sessionId}?lang=${lang}` : '';
                  navigator.clipboard.writeText(url);
                  alert(lang === 'zh' ? '已复制链接' : 'Copied!');
                }} className="mbti-btn" style={{ flex: 1, fontSize: '0.875rem' }}>
                  {dict.copyUrlBtn}
                </button>
                <button onClick={() => setSessionId("")} className="mbti-btn" style={{ color: '#e53e3e', fontSize: '0.875rem' }}>
                  {dict.resetBtn}
                </button>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
