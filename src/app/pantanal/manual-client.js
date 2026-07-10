'use client';
import { useEffect, useState } from 'react';

export function ManualNav({ chapters }) {
  const [active, setActive] = useState(chapters[0]?.id);

  useEffect(() => {
    const sections = chapters
      .map((c) => document.getElementById(c.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [chapters]);

  const links = chapters.map((c) => (
    <li key={c.id}>
      <a href={`#${c.id}`} aria-current={active === c.id || undefined}>
        <span className="mv-toc-num">{c.num}</span>
        <span className="mv-toc-label">{c.label}</span>
      </a>
    </li>
  ));

  return (
    <>
      <nav className="mv-toc" aria-label="Sumário do manual">
        <div>
          <a href="#capa" className="mv-toc-brand">hekbay</a>
          <p className="mv-toc-sub">Manual de<br />Identidade Visual</p>
        </div>
        <ul className="mv-toc-list">{links}</ul>
        <p className="mv-toc-foot">Pantanal Saúde<br />1ª edição — 2026</p>
      </nav>

      <nav className="mv-mobilebar" aria-label="Sumário do manual">
        <a href="#capa" className="mv-mobilebar-brand">hekbay</a>
        <ul className="mv-mobilebar-list">
          {chapters.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} aria-current={active === c.id || undefined}>
                {c.num}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}

export function CopyHex({ hex }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    let ok = false;
    try {
      await navigator.clipboard.writeText(hex);
      ok = true;
    } catch {
      const ta = document.createElement('textarea');
      ta.value = hex;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        ok = document.execCommand('copy');
      } catch {
        ok = false;
      }
      ta.remove();
    }
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    }
  };

  return (
    <button type="button" className="mv-copy" onClick={copy} title="Copiar código">
      {copied ? 'copiado' : hex}
    </button>
  );
}
