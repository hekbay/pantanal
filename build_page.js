const fs = require('fs');
const html = fs.readFileSync('public/lautrecantigo.html', 'utf8');
const bodyMatch = html.match(/<body>([\s\S]*?)<script>/);
if (!bodyMatch) { console.error('No body match'); process.exit(1); }
let body = bodyMatch[1];
// Escape backticks and standard react interpolation
body = body.replace(/`/g, '\\`').replace(/\$/g, '\\$');
const component = `"use client";
import './lautrec.css';
import Script from 'next/script';

const htmlContent = \`
${body}
\`;

export default function LautrecPage() {
  return (
    <div className="sheet-container">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/lautrec-script.js" strategy="lazyOnload" />
    </div>
  );
}
`;
fs.writeFileSync('src/app/lautrec/page.jsx', component);
console.log('Component written');
