
"use client";
import './lautrec.css';
import Script from 'next/script';

const htmlContent = \$bodyHtml\;

export default function LautrecPage() {
  return (
    <div className="sheet-container">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/lautrec-script.js" strategy="lazyOnload" />
    </div>
  );
}

