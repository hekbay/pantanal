import './pantanal.css';
import './antigravity.css';
import { ManualNav, CopyHex } from './manual-client';
import Animations from './Animations';

export const metadata = {
  title: 'Manual de Identidade Visual — Pantanal Saúde',
  description:
    'Manual de identidade visual da Pantanal Saúde: logotipo, tipografia, cores, peças de aplicação e arquivos para download. Produzido por hekbay.',
};

const CHAPTERS = [
  { id: 'capa', num: '00', label: 'Capa' },
  { id: 'marca', num: '01', label: 'A marca' },
  { id: 'logo', num: '02', label: 'Logotipo' },
  { id: 'tipografia', num: '03', label: 'Tipografia' },
  { id: 'paleta', num: '04', label: 'Cores' },
  { id: 'aplicacoes', num: '05', label: 'Peças' },
  { id: 'downloads', num: '06', label: 'Arquivos' },
];

const CORES = [
  { nome: 'Azul Principal', hex: '#0c2b52', rgb: '12 · 43 · 82', cmyk: '85 · 48 · 0 · 68', uso: 'Cor dominante, tipografia e fundos', border: false },
  { nome: 'Off-white', hex: '#f7f4ef', rgb: '247 · 244 · 239', cmyk: '0 · 1 · 3 · 3', uso: 'Fundo principal, respiro visual', border: true },
  { nome: 'Azul Destaque', hex: '#0a4681', rgb: '10 · 70 · 129', cmyk: '92 · 46 · 0 · 49', uso: 'Links, destaques e Planos', border: false },
  { nome: 'Verde NR1', hex: '#1b8b73', rgb: '27 · 139 · 115', cmyk: '81 · 0 · 17 · 45', uso: 'Saúde ocupacional, NR1', border: false },
  { nome: 'Amarelo Plantão', hex: '#f2c52f', rgb: '242 · 197 · 47', cmyk: '0 · 19 · 81 · 5', uso: 'Plantão 24h, urgência', border: false },
];

const COMBOS = [
  { nome: 'Azul / Off-white', fg: '#0c2b52', bg: '#f7f4ef', ratio: '12,9 : 1', nivel: 'AAA — qualquer texto', border: true },
  { nome: 'Branco / Azul Principal', fg: '#ffffff', bg: '#0c2b52', ratio: '14,2 : 1', nivel: 'AAA — qualquer texto', border: false },
  { nome: 'Branco / Azul Destaque', fg: '#ffffff', bg: '#0a4681', ratio: '9,5 : 1', nivel: 'AAA — qualquer texto', border: false },
  { nome: 'Azul / Amarelo', fg: '#0c2b52', bg: '#f2c52f', ratio: '8,6 : 1', nivel: 'AAA — qualquer texto', border: false },
  { nome: 'Branco / Verde', fg: '#ffffff', bg: '#1b8b73', ratio: '4,2 : 1', nivel: 'AA — só textos grandes', border: false },
];

function ChapterHead({ num, titulo, intro, entregavel }) {
  return (
    <header>
      <div className="mv-chap-head">
        <span className="mv-chap-num" aria-hidden="true">{num}</span>
        <h2>{titulo}</h2>
        <span className="mv-chap-idx">
          {entregavel ? `Entregável ${entregavel} / 05` : `Seção ${num} / 06`}
        </span>
      </div>
      {intro && <p className="mv-chap-intro">{intro}</p>}
    </header>
  );
}

export default function ManualPantanal() {
  return (
    <div className="mv">
      <ManualNav chapters={CHAPTERS} />

      <main className="mv-main">
        {/* ── 00 · CAPA ── */}
        <div className="dark-wrap relative overflow-x-clip">
          <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-500/20 rounded-full mix-blend-screen blur-[80px] blob-anim will-change-transform pointer-events-none"></div>
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-teal-500/20 rounded-full mix-blend-screen blur-[80px] blob-anim will-change-transform pointer-events-none"></div>
          
          <section id="capa" className="mv-cover relative z-10">
          <div className="mv-cover-top">
            <span>Pantanal Saúde — Operadora de saúde B2B</span>
            <span>1ª edição — 2026</span>
          </div>
          <div className="mv-cover-center">
            <img src="/pantanal/assets/vertical-branca.png" alt="Logo Pantanal Saúde" />
            <h1>Manual de Identidade Visual.</h1>
          </div>
          <div className="mv-cover-spec">
            <div><span className="k">Cliente</span><span className="v">Pantanal Saúde</span></div>
            <div><span className="k">Projeto</span><span className="v">Identidade visual</span></div>
            <div><span className="k">Design</span><span className="v">hekbay · Henrique Corrêa da Costa</span></div>
            <div><span className="k">Local · Ano</span><span className="v">Campo Grande, MS · 2026</span></div>
          </div>
        </section>
        </div>

        {/* ── SUMÁRIO ── */}
        <div className="light-wrap relative overflow-x-clip bg-[var(--paper)]">
          <div className="absolute top-[5%] left-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full mix-blend-multiply blur-[80px] blob-anim will-change-transform pointer-events-none"></div>
          <div className="absolute top-[40%] right-[-5%] w-[600px] h-[600px] bg-amber-400/10 rounded-full mix-blend-multiply blur-[80px] blob-anim will-change-transform pointer-events-none"></div>
          <div className="absolute bottom-[10%] left-[10%] w-[700px] h-[700px] bg-teal-600/10 rounded-full mix-blend-multiply blur-[80px] blob-anim will-change-transform pointer-events-none"></div>

          <section className="mv-sumario relative z-10" aria-label="Sumário">
          <div className="mv-wrap">
            <span className="mv-label">Sumário</span>
            <ol className="mv-sumario-list">
              <li><a href="#marca"><span className="num">01</span><span className="titulo">A marca</span></a></li>
              <li><a href="#logo"><span className="num">02</span><span className="titulo">Logotipo &amp; variações</span></a></li>
              <li><a href="#tipografia"><span className="num">03</span><span className="titulo">Sistema tipográfico</span></a></li>
              <li><a href="#paleta"><span className="num">04</span><span className="titulo">Paleta cromática</span></a></li>
              <li><a href="#aplicacoes"><span className="num">05</span><span className="titulo">Peças de aplicação</span></a></li>
              <li><a href="#downloads"><span className="num">06</span><span className="titulo">Arquivos da marca</span></a></li>
            </ol>
          </div>
        </section>

        {/* ── 01 · A MARCA ── */}
        <section id="marca" className="mv-chapter">
          <div className="mv-wrap">
            <ChapterHead
              num="01"
              titulo="A marca"
              intro="A Pantanal Saúde é uma operadora de saúde B2B que nasce com um compromisso diferente: cuidar das pessoas antes que o problema apareça. Saúde corporativa com a personalidade do Pantanal — próxima, resiliente e genuína. Este capítulo é a fundação: tudo o que os entregáveis seguintes materializam."
            />

            <div className="mv-pull">
              <span className="mv-label">Promessa central</span>
              <blockquote>Excelência começa de dentro. Quando sua equipe está bem, seu negócio cresce.</blockquote>
            </div>

            <div className="mv-subhead"><span className="mv-label">1.1 — Personalidade e valores</span></div>
            <div className="mv-grid-2">
              <div>
                <div className="mv-tags">
                  <span className="mv-tag">Acolhedora</span>
                  <span className="mv-tag">Segura</span>
                  <span className="mv-tag">Direta</span>
                  <span className="mv-tag">Atenciosa</span>
                  <span className="mv-tag">Ágil</span>
                  <span className="mv-tag">Confiável</span>
                  <span className="mv-tag">Humana</span>
                </div>
              </div>
              <ul className="mv-numlist">
                <li><span className="num">01</span>Comunicação clara</li>
                <li><span className="num">02</span>Dignidade humana acima de tudo</li>
                <li><span className="num">03</span>Sigilo e responsabilidade</li>
              </ul>
            </div>

            <div className="mv-subhead"><span className="mv-label">1.2 — Diferenciais reais</span></div>
            <div className="mv-difs">
              <div><span className="num">01</span><span className="titulo">Plantão psicológico 24h</span></div>
              <div><span className="num">02</span><span className="titulo">NR1 com acompanhamento</span></div>
              <div><span className="num">03</span><span className="titulo">Atendimento em até 1h</span></div>
              <div><span className="num">04</span><span className="titulo">Redução de turnover</span></div>
            </div>
          </div>
        </section>

        {/* ── 02 · LOGOTIPO & VARIAÇÕES ── */}
        <section id="logo" className="mv-chapter">
          <div className="mv-wrap">
            <ChapterHead
              num="02"
              titulo="Logotipo & variações"
              entregavel="01"
              intro="A arara canindé dentro da cruz médica: identidade regional e saúde em uma forma única, limpa e organizacional. Todas as versões estão disponíveis em vetor editável (.AI), SVG e PNG — baixe direto na legenda de cada figura ou o pacote completo na seção 06."
            />

            <div className="mv-subhead"><span className="mv-label">2.1 — Versões principais</span></div>
            <div className="mv-figpair">
              <figure className="mv-fig">
                <div className="mv-fig-canvas">
                  <img src="/pantanal/assets/vertical.png" alt="Logo Pantanal Saúde, versão vertical para fundo claro" />
                </div>
                <figcaption className="mv-fig-caption">
                  <span>Fig. 2.1 — Vertical · fundo claro</span>
                  <span className="mv-fig-actions">
                    <a className="mv-dl-link" href="/pantanal/assets/vertical.png" download="pantanal-saude-vertical.png">PNG ↓</a>
                    <a className="mv-dl-link" href="/pantanal/assets/vertical.svg" download="pantanal-saude-vertical.svg">SVG ↓</a>
                  </span>
                </figcaption>
              </figure>
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--navy">
                  <img src="/pantanal/assets/vertical-branca.png" alt="Logo Pantanal Saúde, versão vertical branca para fundo escuro" />
                </div>
                <figcaption className="mv-fig-caption">
                  <span>Fig. 2.2 — Vertical branca</span>
                  <span className="mv-fig-actions">
                    <a className="mv-dl-link" href="/pantanal/assets/vertical-branca.png" download="pantanal-saude-vertical-branca.png">PNG ↓</a>
                    <a className="mv-dl-link" href="/pantanal/assets/vertical-branca.svg" download="pantanal-saude-vertical-branca.svg">SVG ↓</a>
                  </span>
                </figcaption>
              </figure>
            </div>
            <div className="mv-figpair mv-figpair--even">
              <figure className="mv-fig">
                <div className="mv-fig-canvas">
                  <img src="/pantanal/assets/horizontal.png" alt="Logo Pantanal Saúde, versão horizontal para fundo claro" style={{ maxHeight: '140px' }} />
                </div>
                <figcaption className="mv-fig-caption">
                  <span>Fig. 2.3 — Horizontal · fundo claro</span>
                  <span className="mv-fig-actions">
                    <a className="mv-dl-link" href="/pantanal/assets/horizontal.png" download="pantanal-saude-horizontal.png">PNG ↓</a>
                    <a className="mv-dl-link" href="/pantanal/assets/horizontal.svg" download="pantanal-saude-horizontal.svg">SVG ↓</a>
                  </span>
                </figcaption>
              </figure>
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--navy">
                  <img src="/pantanal/assets/horizontal-branca.png" alt="Logo Pantanal Saúde, versão horizontal branca para fundo escuro" style={{ maxHeight: '140px' }} />
                </div>
                <figcaption className="mv-fig-caption">
                  <span>Fig. 2.4 — Horizontal · branca</span>
                  <span className="mv-fig-actions">
                    <a className="mv-dl-link" href="/pantanal/assets/horizontal-branca.png" download="pantanal-saude-horizontal-branca.png">PNG ↓</a>
                    <a className="mv-dl-link" href="/pantanal/assets/horizontal-branca.svg" download="pantanal-saude-horizontal-branca.svg">SVG ↓</a>
                  </span>
                </figcaption>
              </figure>
            </div>
            <figure className="mv-fig">
              <div className="mv-fig-canvas mv-fig-canvas--navy">
                <img src="/pantanal/assets/simbolo-branca.png" alt="Símbolo isolado Pantanal Saúde, versão monocromática branca" style={{ maxHeight: '200px' }} />
              </div>
              <figcaption className="mv-fig-caption">
                <span>Fig. 2.5 — Símbolo isolado · monocromática branca</span>
                <span className="mv-fig-actions">
                  <a className="mv-dl-link" href="/pantanal/assets/simbolo-branca.png" download="pantanal-saude-simbolo-branca.png">PNG ↓</a>
                  <a className="mv-dl-link" href="/pantanal/assets/simbolo-branca.svg" download="pantanal-saude-simbolo-branca.svg">SVG ↓</a>
                </span>
              </figcaption>
            </figure>

            <div className="mv-subhead"><span className="mv-label">2.2 — Versões por produto</span></div>
            <div className="mv-prod-grid">
              <div className="mv-prod">
                <div className="mv-prod-canvas"><img src="/pantanal/assets/PLANTAO.png" alt="Símbolo do produto Plantão 24h" /></div>
                <div className="mv-prod-info">
                  <div className="nome">Plantão 24h</div>
                  <div className="cor"><i style={{ background: '#f2c52f' }} />#f2c52f</div>
                </div>
              </div>
              <div className="mv-prod">
                <div className="mv-prod-canvas"><img src="/pantanal/assets/PLANOS.png" alt="Símbolo do produto Planos" /></div>
                <div className="mv-prod-info">
                  <div className="nome">Planos</div>
                  <div className="cor"><i style={{ background: '#0a4681' }} />#0a4681</div>
                </div>
              </div>
              <div className="mv-prod">
                <div className="mv-prod-canvas"><img src="/pantanal/assets/NR1.png" alt="Símbolo do produto NR1" /></div>
                <div className="mv-prod-info">
                  <div className="nome">NR1</div>
                  <div className="cor"><i style={{ background: '#1b8b73' }} />#1b8b73</div>
                </div>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">2.3 — Como aplicar o logotipo</span></div>
            <div className="mv-rules">
              <div>
                <span className="num">R.1</span>
                <div>
                  <h4>Área de proteção</h4>
                  <p>Preserve ao redor do logo um respiro mínimo equivalente à altura da cruz do símbolo. Nenhum texto, imagem ou borda deve invadir essa área.</p>
                </div>
              </div>
              <div>
                <span className="num">R.2</span>
                <div>
                  <h4>Tamanho mínimo</h4>
                  <p>Versão vertical: 80 px de altura no digital e 20 mm na impressão. Abaixo disso, prefira o símbolo isolado, que mantém a leitura em tamanhos reduzidos.</p>
                </div>
              </div>
              <div>
                <span className="num">R.3</span>
                <div>
                  <h4>Qual versão usar</h4>
                  <p>Fundo claro pede a versão principal. Fundo azul-marinho ou fotografia escura pede a versão clara. Avatares, favicon e assinaturas de e-mail pedem o símbolo isolado. Materiais de produto usam a versão da cor correspondente.</p>
                </div>
              </div>
              <div>
                <span className="num">R.4</span>
                <div>
                  <h4>Sobre quais fundos</h4>
                  <p>Aplique somente sobre as cores do sistema ou fotografias com área de descanso visual. Nunca sobre texturas ruidosas sem área de proteção.</p>
                </div>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">2.4 — Usos incorretos</span></div>
            <div className="mv-no-grid">
              <div className="mv-no">
                <div className="mv-no-visual"><img src="/pantanal/assets/nao-distorcer1.png" alt="Exemplo de logo distorcido" /></div>
                <span className="titulo">Não distorça</span>
                <p>Nunca altere as proporções originais do logo.</p>
              </div>
              <div className="mv-no">
                <div className="mv-no-visual"><img src="/pantanal/assets/nao-recolorir1.png" alt="Exemplo de logo com cor fora do sistema" /></div>
                <span className="titulo">Não recolora</span>
                <p>Use apenas as cores do sistema de identidade.</p>
              </div>
              <div className="mv-no">
                <div className="mv-no-visual"><img src="/pantanal/assets/nao-sombra1.png" alt="Exemplo de logo com sombra" /></div>
                <span className="titulo">Sem sombras</span>
                <p>O logo nunca recebe efeitos de sombra ou brilho.</p>
              </div>
              <div className="mv-no">
                <div className="mv-no-visual"><img src="/pantanal/assets/nao-fundo1.png" alt="Exemplo de logo sobre fundo complexo" /></div>
                <span className="titulo">Sem fundos complexos</span>
                <p>Evite aplicar sobre texturas sem área de proteção.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 03 · SISTEMA TIPOGRÁFICO ── */}
        <section id="tipografia" className="mv-chapter">
          <div className="mv-wrap">
            <ChapterHead
              num="03"
              titulo="Sistema tipográfico"
              entregavel="02"
              intro="Duas famílias com papéis definidos: Sora para display e títulos, transmitindo confiança e modernidade; Inter para o corpo do texto, garantindo legibilidade perfeita em qualquer tamanho."
            />

            <div className="mv-subhead"><span className="mv-label">3.1 — Tipografia principal</span></div>
            <div className="mv-type">
              <div className="mv-type-head">
                <h3>Sora</h3>
                <span className="mv-label">Primária — Display &amp; títulos</span>
              </div>
              <div className="mv-type-glyphs">
                <div className="aa" style={{ fontFamily: 'var(--font-display)', fontWeight: 800 }}>Aa Bb 09</div>
                <div className="charset" style={{ fontFamily: 'var(--font-display)' }}>
                  ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789
                </div>
              </div>
              <div className="mv-type-row">
                <span className="spec">Display<br />48px — 800</span>
                <span className="sample" style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 800, lineHeight: 1.1 }}>SAÚDE</span>
              </div>
              <div className="mv-type-row">
                <span className="spec">H1<br />32px — 700</span>
                <span className="sample" style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 700, lineHeight: 1.15 }}>PANTANAL</span>
              </div>
              <div className="mv-type-row">
                <span className="spec">H2<br />24px — 700</span>
                <span className="sample" style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 700, lineHeight: 1.25 }}>Planos de saúde corporativos</span>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">3.2 — Tipografia secundária</span></div>
            <div className="mv-type">
              <div className="mv-type-head">
                <h3>Inter</h3>
                <span className="mv-label">Secundária — Corpo de texto</span>
              </div>
              <div className="mv-type-row">
                <span className="spec">Body L<br />18px — 400</span>
                <span className="sample" style={{ fontSize: '18px', color: 'var(--ink-muted)' }}>Quando sua equipe está bem cuidada.</span>
              </div>
              <div className="mv-type-row">
                <span className="spec">Body<br />15px — 400</span>
                <span className="sample" style={{ fontSize: '15px', color: 'var(--ink-muted)' }}>Plantão psicológico 24 horas, NR1.</span>
              </div>
              <div className="mv-type-row">
                <span className="spec">Caption<br />12px — 500</span>
                <span className="sample" style={{ fontSize: '12px', fontWeight: 500, color: 'var(--ink-muted)' }}>Campo Grande, MS · Operadora B2B</span>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">3.3 — Como usar a tipografia</span></div>
            <div className="mv-rules">
              <div>
                <span className="num">R.1</span>
                <div>
                  <h4>Papel de cada família</h4>
                  <p>Sora assina títulos, números de destaque e chamadas. Inter cuida de parágrafos, legendas e interfaces. Não inverta os papéis: texto corrido nunca em Sora, títulos nunca em Inter.</p>
                </div>
              </div>
              <div>
                <span className="num">R.2</span>
                <div>
                  <h4>Hierarquia fixa</h4>
                  <p>Respeite a escala do sistema: Display 48/800 · H1 32/700 · H2 24/700 · Body 15–18/400 · Caption 12/500. Um nível por função, sem tamanhos intermediários inventados.</p>
                </div>
              </div>
              <div>
                <span className="num">R.3</span>
                <div>
                  <h4>Composição</h4>
                  <p>No máximo dois pesos tipográficos por peça. Alinhamento à esquerda como padrão; centralizado apenas em capas e convites.</p>
                </div>
              </div>
              <div>
                <span className="num">R.4</span>
                <div>
                  <h4>Onde obter as fontes</h4>
                  <p>Ambas são gratuitas no Google Fonts: <a href="https://fonts.google.com/specimen/Sora" target="_blank" rel="noreferrer">fonts.google.com/specimen/Sora</a> e <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noreferrer">fonts.google.com/specimen/Inter</a>. Qualquer equipe ou fornecedor pode instalá-las sem custo de licença.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 04 · PALETA CROMÁTICA ── */}
        <section id="paleta" className="mv-chapter">
          <div className="mv-wrap">
            <ChapterHead
              num="04"
              titulo="Paleta cromática"
              entregavel="03"
              intro="Duas cores primárias formam a âncora institucional; duas cores de produto entram no contexto de cada frente de serviço. Códigos em HEX, RGB e CMYK — clique no HEX para copiar."
            />

            <div className="mv-subhead"><span className="mv-label">4.1 — Paleta</span></div>
            <div className="mv-color-grid">
              {CORES.map((c) => (
                <div className="mv-color" key={c.hex}>
                  <div className="mv-color-swatch" style={{ background: c.hex }} />
                  <div className="mv-color-info">
                    <div className="nome">{c.nome}</div>
                    <div className="mv-color-line"><span className="k">HEX</span><CopyHex hex={c.hex} /></div>
                    <div className="mv-color-line"><span className="k">RGB</span><span>{c.rgb}</span></div>
                    <div className="mv-color-line"><span className="k">CMYK</span><span>{c.cmyk}</span></div>
                    <div className="uso">{c.uso}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mv-subhead"><span className="mv-label">4.2 — Proporção de uso</span></div>
            <div className="mv-bar" role="img" aria-label="Proporção de uso das cores: off-white 42%, azul principal 28%, azul destaque 16%, verde NR1 7%, amarelo Plantão 7%">
              <div style={{ width: '42%', background: '#f7f4ef' }} />
              <div style={{ width: '28%', background: '#0c2b52' }} />
              <div style={{ width: '16%', background: '#0a4681' }} />
              <div style={{ width: '7%', background: '#1b8b73' }} />
              <div style={{ width: '7%', background: '#f2c52f' }} />
            </div>
            <div className="mv-bar-legend">
              <span><i style={{ background: '#f7f4ef' }} />42% Off-white</span>
              <span><i style={{ background: '#0c2b52' }} />28% Azul Principal</span>
              <span><i style={{ background: '#0a4681' }} />16% Azul Destaque</span>
              <span><i style={{ background: '#1b8b73' }} />7% Verde NR1</span>
              <span><i style={{ background: '#f2c52f' }} />7% Amarelo Plantão</span>
            </div>

            <div className="mv-subhead"><span className="mv-label">4.3 — Combinações seguras de texto</span></div>
            <div className="mv-combo-grid">
              {COMBOS.map((c) => (
                <div className="mv-combo" key={c.nome}>
                  <div className="mv-combo-sample" style={{ background: c.bg, color: c.fg }}>Aa</div>
                  <div className="mv-combo-info">
                    {c.nome}<br />
                    <span className="r">{c.ratio}</span> — {c.nivel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 05 · PEÇAS DE APLICAÇÃO ── */}
        <section id="aplicacoes" className="mv-chapter">
          <div className="mv-wrap">
            <ChapterHead
              num="05"
              titulo="Peças de aplicação"
              entregavel="04"
              intro="Quatro materiais prontos para uso comercial, desenhados a partir do sistema visual: cartão de visita, banner de site, folder institucional e modelo de documento."
            />

            <div className="mv-subhead"><span className="mv-label">5.1 — Cartão de visita</span></div>
            <div className="mv-app">
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--flush">
                  <img src="/pantanal/assets/mockup-cartao.png" alt="Mockup do cartão de visita Pantanal Saúde" />
                </div>
                <figcaption className="mv-fig-caption"><span>Fig. 5.1 — Cartão de visita</span></figcaption>
              </figure>
              <div className="mv-app-text">
                <span className="mv-label">Peça 01 — Papelaria</span>
                <h3>Cartão de visita</h3>
                <p>Frente com o símbolo isolado, verso com dados de contato em layout limpo e espaço negativo generoso. Envie o arquivo fechado à gráfica sem alterações de cor ou fonte.</p>
                <div className="mv-app-specs">
                  <div><span className="k">Formato</span><span className="v">90 × 50 mm</span></div>
                  <div><span className="k">Papel</span><span className="v">Off-white 300g</span></div>
                </div>
                <a className="mv-dl-link" href="#downloads">Ver arquivos ↓</a>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">5.2 — Banner de site</span></div>
            <div className="mv-app mv-app--flip">
              <div className="mv-app-text">
                <span className="mv-label">Peça 02 — Digital</span>
                <h3>Banner de site</h3>
                <p>Hero institucional para o site da Pantanal Saúde, com fotografia tratada na atmosfera da marca. Quatro temas — Geral, Plantão 24h, Planos e NR1 — cada um com a arte finalizada e o fundo limpo para novas aplicações.</p>
                <div className="mv-app-specs">
                  <div><span className="k">Formato</span><span className="v">1920 × 1080 px</span></div>
                  <div><span className="k">Temas</span><span className="v">4 versões + fundos limpos</span></div>
                </div>
                <a className="mv-dl-link" href="#downloads">Ver arquivos ↓</a>
              </div>
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--flush">
                  <img src="/pantanal/assets/banner-geral.jpg" alt="Banner institucional Pantanal Saúde, tema geral" />
                </div>
                <figcaption className="mv-fig-caption"><span>Fig. 5.2 — Banner institucional · tema geral</span></figcaption>
              </figure>
            </div>

            <div className="mv-subhead"><span className="mv-label">5.3 — Folder institucional</span></div>
            <div className="mv-app">
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--flush">
                  <img src="/pantanal/assets/mockup-folder.jpg" alt="Mockup do folder institucional Pantanal Saúde" />
                </div>
                <figcaption className="mv-fig-caption"><span>Fig. 5.3 — Folder institucional</span></figcaption>
              </figure>
              <div className="mv-app-text">
                <span className="mv-label">Peça 03 — Impresso</span>
                <h3>Folder institucional</h3>
                <p>Tríptico com capa em Azul Principal e o símbolo em branco; painéis internos numerados apresentam os serviços para decisores de RH. Envie o PDF fechado à gráfica — o arquivo editável acompanha o pacote.</p>
                <div className="mv-app-specs">
                  <div><span className="k">Dobra</span><span className="v">Tríptico · 3 painéis</span></div>
                  <div><span className="k">Entrega</span><span className="v">PDF fechado + AI editável</span></div>
                </div>
                <a className="mv-dl-link" href="#downloads">Ver arquivos ↓</a>
              </div>
            </div>

            <div className="mv-subhead"><span className="mv-label">5.4 — Modelo de documento</span></div>
            <div className="mv-app mv-app--flip">
              <div className="mv-app-text">
                <span className="mv-label">Peça 04 — Definida em briefing</span>
                <h3>Modelo de documento</h3>
                <p>Documento timbrado para propostas, comunicados e materiais internos: logotipo no cabeçalho, rodapé com paginação e aviso de confidencialidade. Basta substituir o conteúdo no Word — a estrutura já está pronta.</p>
                <div className="mv-app-specs">
                  <div><span className="k">Formato</span><span className="v">A4 · 210 × 297 mm</span></div>
                  <div><span className="k">Entrega</span><span className="v">DOCX editável</span></div>
                </div>
                <a className="mv-dl-link" href="#downloads">Ver arquivos ↓</a>
              </div>
              <figure className="mv-fig">
                <div className="mv-fig-canvas mv-fig-canvas--flush">
                  <img src="/pantanal/assets/mockup-documento.jpg" alt="Mockup do modelo de documento timbrado Pantanal Saúde" />
                </div>
                <figcaption className="mv-fig-caption"><span>Fig. 5.4 — Modelo de documento</span></figcaption>
              </figure>
            </div>
          </div>
        </section>
        </div>

        {/* ── 06 · ARQUIVOS ── */}
        <div className="dark-wrap relative overflow-x-clip">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-blue-400/10 rounded-full mix-blend-screen blur-[80px] blob-anim will-change-transform pointer-events-none"></div>

          <section id="downloads" className="mv-files relative z-10">
          <div className="mv-wrap">
            <ChapterHead
              num="06"
              titulo="Arquivos da marca"
              intro="Os arquivos finais da marca, organizados por entregável: vetores editáveis (.AI), versões finais em PNG e SVG e as peças fechadas para gráfica. Baixe o pacote completo ou item por item, conforme a necessidade."
            />

            <div className="mv-file-list">
              <div className="mv-file-row">
                <span className="num">6.1</span>
                <div>
                  <div className="titulo">Logotipo completo</div>
                  <div className="desc">Master editável em .AI + PNG e SVG de todas as versões: vertical, horizontal, símbolo isolado, produtos e variações brancas.</div>
                </div>
                <span className="fmt">ZIP · AI · PNG · SVG — 2,2 MB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-logo.zip" download>Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.2</span>
                <div>
                  <div className="titulo">Cartão de visita</div>
                  <div className="desc">Arquivo editável para a gráfica preencher os dados de cada cartão — instruções no LEIA-ME incluso.</div>
                </div>
                <span className="fmt">ZIP · AI — 460 KB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-cartao-de-visita.zip" download>Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.3</span>
                <div>
                  <div className="titulo">Folder institucional</div>
                  <div className="desc">Tríptico: PDF fechado para gráfica, arquivo editável em .AI e mockup de apresentação.</div>
                </div>
                <span className="fmt">ZIP · AI · PDF — 11,3 MB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-folder.zip" download>Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.4</span>
                <div>
                  <div className="titulo">Modelo de documento</div>
                  <div className="desc">Template A4 timbrado, editável no Word, para propostas e comunicados.</div>
                </div>
                <span className="fmt">ZIP · DOCX — 3 MB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-documento.zip" download>Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.5</span>
                <div>
                  <div className="titulo">Banners de site</div>
                  <div className="desc">Quatro temas em 1920 × 1080 px — Geral, Plantão 24h, Planos e NR1 — com artes finalizadas e fundos limpos.</div>
                </div>
                <span className="fmt">ZIP · PNG — 8,3 MB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-banners.zip" download>Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.6</span>
                <div>
                  <div className="titulo">Arte da capa</div>
                  <div className="desc">Wallpaper institucional com o símbolo sobre gradiente, 1920 × 1080 px.</div>
                </div>
                <span className="fmt">JPG — 373 KB</span>
                <a className="mv-btn" href="/pantanal/assets/logograd2.jpg" download="pantanal-saude-arte-capa.jpg">Baixar ↓</a>
              </div>

              <div className="mv-file-row">
                <span className="num">6.7</span>
                <div>
                  <div className="titulo">Kit completo</div>
                  <div className="desc">Todos os entregáveis acima em um único pacote.</div>
                </div>
                <span className="fmt">ZIP — 27,1 MB</span>
                <a className="mv-btn" href="/pantanal/downloads/pantanal-saude-kit-completo.zip" download>Baixar ↓</a>
              </div>
            </div>

            <p className="mv-files-nota">
              Em preparação: códigos Pantone e o manual em PDF interativo.
            </p>

            <div className="mv-colofao">
              <span>Produzido por hekbay — obrigado pela confiança</span>
              <span>Manual de Identidade Visual · Pantanal Saúde · 1ª edição — 2026</span>
            </div>
          </div>
        </section>
        </div>
      </main>
      <Animations />
    </div>
  );
}
