import CustomCursor from "../../components/CustomCursor";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <div className="cursor-dot"></div>
      <div className="cursor-ring"></div>
<nav>
    <a href="#capa" className="nav-logo">hekbay</a>
    <ul className="nav-links">
      <li><a href="#marca">A marca</a></li>
      <li><a href="#logo">Logo</a></li>
      <li><a href="#paleta">Paleta</a></li>
      <li><a href="#tipografia">Tipografia</a></li>
      <li><a href="#downloads">Downloads</a></li>
    </ul>
  </nav>

  {/* ── BLOCO DARK SUPERIOR ── */}
  <div className="dark-wrap">
    <div className="blob blob-dark-1"></div>
    <div className="blob blob-dark-2"></div>
    <div className="blob blob-dark-3"></div>

    <section id="capa">
      <div className="capa-sparkle">
        <svg viewBox="0 0 100 100" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="80" height="80">
          <path d="M50 0 C50 30 55 45 70 50 C55 55 50 70 50 100 C50 70 45 55 30 50 C45 45 50 30 50 0 Z" />
          <path d="M28 25 C28 40 31 45 38 50 C31 55 28 60 28 75 C28 60 25 55 18 50 C25 45 28 40 28 25 Z" />
          <path d="M72 25 C72 40 69 45 62 50 C69 55 72 60 72 75 C72 60 75 55 82 50 C75 45 72 40 72 25 Z" />
        </svg>
      </div>
      <div className="capa-content">
        <p className="capa-label">Manual de Identidade Visual</p>
        <h1 className="capa-titulo">Pantanal<br/><span>Saúde.</span></h1>
        <div className="capa-meta glass-dark">
          <div className="capa-meta-item">
            <span className="capa-meta-label">Cliente</span>
            <span className="capa-meta-value">Pantanal Saúde</span>
          </div>
          <div className="capa-meta-item">
            <span className="capa-meta-label">Produzido por</span>
            <span className="capa-meta-value">hekbay · Henrique Corrêa da Costa</span>
          </div>
          <div className="capa-meta-item">
            <span className="capa-meta-label">Ano</span>
            <span className="capa-meta-value">2026</span>
          </div>
        </div>
      </div>
    </section>

    <section id="logo-full">
      <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/logograd2.jpg" alt="Logo Pantanal Saúde" />
    </section>
  </div>

  {/* ── BLOCO LIGHT CENTRAL ── */}
  <div className="light-wrap">
    <div className="blob blob-light-1"></div>
    <div className="blob blob-light-2"></div>
    <div className="blob blob-light-3"></div>

    <section id="marca">
      <div className="container">
        <h2 className="section-titulo">Quem é a<br/>Pantanal Saúde</h2>
        <p className="section-desc">Uma operadora de saúde B2B que nasce com um compromisso diferente: cuidar das pessoas
          antes que o problema apareça. Saúde corporativa com a personalidade do Pantanal: próxima, resiliente e
          genuína.</p>

        <div className="marca-hero glass-light">
          <span className="marca-hero-tag">Promessa Central</span>
          <p className="marca-promessa">Excelência começa de dentro. Quando sua equipe está bem, seu negócio cresce.</p>
        </div>

        <div className="marca-masonry">
          <div className="marca-bloco marca-card-large glass-light">
            <h3>Personalidade</h3>
            <div className="marca-palavras">
              <span className="palavra-tag">Acolhedora</span>
              <span className="palavra-tag">Segura</span>
              <span className="palavra-tag">Direta</span>
              <span className="palavra-tag">Atenciosa</span>
              <span className="palavra-tag">Ágil</span>
              <span className="palavra-tag">Confiável</span>
              <span className="palavra-tag">Humana</span>
            </div>
          </div>

          <div className="marca-bloco marca-card-small glass-light">
            <h3>Valores inegociáveis</h3>
            <div className="marca-valores">
              <div className="valor-item"><span className="valor-dot"></span>Comunicação clara</div>
              <div className="valor-item"><span className="valor-dot"></span>Dignidade humana acima de tudo</div>
              <div className="valor-item"><span className="valor-dot"></span>Sigilo e responsabilidade</div>
            </div>
          </div>

          <div className="marca-bloco marca-card-large glass-light" style={{}}>
            <h3>Diferenciais Reais</h3>
            <div className="marca-valores" style={{}}>
              <div className="valor-item"><span className="valor-dot"></span>Plantão psicológico 24h</div>
              <div className="valor-item"><span className="valor-dot"></span>NR1 com acompanhamento</div>
              <div className="valor-item"><span className="valor-dot"></span>Atendimento em até 1h</div>
              <div className="valor-item"><span className="valor-dot"></span>Redução de turnover</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="logo">
      <div className="container">
        <h2 className="section-titulo">O símbolo<br/>da marca</h2>
        <p className="section-desc">A arara canindé dentro da cruz médica. Identidade regional e saúde em uma forma única,
          limpa e organizacional.</p>

        <div className="logo-showcase">
          <div className="logo-card-main glass-light">
            <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/VERTICAL2.png" alt="Logo Principal" />
            <span className="logo-card-label" style={{}}>Versão Principal · Fundo Claro</span>
          </div>
          <div className="logo-card-sec glass-dark" style={{}}>
            <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/VERTICALB.png" alt="Logo Secundário" />
            <span className="logo-card-label" style={{}}>Versão Clara · Fundo Escuro</span>
          </div>
        </div>

        <h3 className="logo-produtos-titulo">Versões por produto</h3>
        <div className="logo-produtos">
          <div className="produto-card glass-light">
            <div className="produto-mark"><img
                src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/PLANTAO.png" alt="Plantão 24h" /></div>
            <div className="produto-nome">Plantão 24h</div>
            <div className="produto-cor"><span className="produto-cor-dot" style={{}}></span>#f2c52f</div>
          </div>
          <div className="produto-card glass-light">
            <div className="produto-mark"><img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/PLANOS.png"
                alt="Planos" /></div>
            <div className="produto-nome">Planos</div>
            <div className="produto-cor"><span className="produto-cor-dot" style={{}}></span>#0a4681</div>
          </div>
          <div className="produto-card glass-light">
            <div className="produto-mark"><img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/NR1.png"
                alt="NR1" /></div>
            <div className="produto-nome">NR1</div>
            <div className="produto-cor"><span className="produto-cor-dot" style={{}}></span>#1b8b73</div>
          </div>
        </div>

        <div className="logo-naofaca">
          <h3>Não faça isso</h3>
          <div className="naofaca-grid">
            <div className="naofaca-item glass-light">
              <div className="naofaca-visual">
                <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/nao-distorcer1.png"
                  alt="Exemplo: logo distorcido"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
                <span className="naofaca-ph"
                  style={{display: "none"}}>Logo
                  distorcido</span>
              </div>
              <div className="naofaca-desc">
                <strong>✕ Não distorça</strong>
                Nunca altere as proporções originais do logo.
              </div>
            </div>
            <div className="naofaca-item glass-light">
              <div className="naofaca-visual">
                <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/nao-recolorir1.png"
                  alt="Exemplo: cor fora do sistema"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
                <span className="naofaca-ph"
                  style={{display: "none"}}>Cor
                  fora do sistema</span>
              </div>
              <div className="naofaca-desc">
                <strong>✕ Não recolora</strong>
                Use apenas as cores do sistema de identidade.
              </div>
            </div>
            <div className="naofaca-item glass-light">
              <div className="naofaca-visual">
                <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/nao-sombra1.png"
                  alt="Exemplo: logo com sombra"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
                <span className="naofaca-ph"
                  style={{display: "none"}}>Logo
                  com sombra</span>
              </div>
              <div className="naofaca-desc">
                <strong>✕ Sem sombras</strong>
                O logo nunca recebe efeitos de sombra ou brilho.
              </div>
            </div>
            <div className="naofaca-item glass-light">
              <div className="naofaca-visual">
                <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/nao-fundo1.png"
                  alt="Exemplo: logo sobre foto"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'" />
                <span className="naofaca-ph"
                  style={{display: "none"}}>Logo
                  sobre foto</span>
              </div>
              <div className="naofaca-desc">
                <strong>✕ Sem fundos complexos</strong>
                Evite aplicar sobre texturas sem área de proteção.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="paleta">
      <div className="container">
        <h2 className="section-titulo">O sistema<br/>de cores</h2>
        <p className="section-desc">Duas cores primárias formam a âncora institucional; duas cores de produto entram no
          contexto de cada frente de serviço.</p>

        <div className="paleta-circulos">
          <div className="circulo-wrap">
            <div className="swatch-circle" style={{}}>
              <span className="swatch-nome">Azul Principal</span>
              <span className="swatch-hex">#0c2b52</span>
            </div>
            <span className="swatch-uso" style={{}}>Cor dominante, tipografia, fundos</span>
          </div>
          <div className="circulo-wrap">
            <div className="swatch-circle" style={{}}
              className="swatch-circle light-text">
              <span className="swatch-nome" style={{}}>Off-white</span>
              <span className="swatch-hex" style={{}}>#f7f4ef</span>
            </div>
            <span className="swatch-uso" style={{}}>Fundo principal, respiro visual</span>
          </div>
          <div className="circulo-wrap">
            <div className="swatch-circle" style={{}}>
              <span className="swatch-nome">Azul Destaque</span>
              <span className="swatch-hex">#0a4681</span>
            </div>
            <span className="swatch-uso" style={{}}>Links, destaques, Planos</span>
          </div>
          <div className="circulo-wrap">
            <div className="swatch-circle" style={{}}>
              <span className="swatch-nome">Verde NR1</span>
              <span className="swatch-hex">#1b8b73</span>
            </div>
            <span className="swatch-uso" style={{}}>Saúde ocupacional, NR1</span>
          </div>
          <div className="circulo-wrap">
            <div className="swatch-circle" style={{}}>
              <span className="swatch-nome" style={{}}>Amarelo Plantão</span>
              <span className="swatch-hex" style={{}}>#f2c52f</span>
            </div>
            <span className="swatch-uso" style={{}}>Plantão 24h, urgência</span>
          </div>
        </div>

        <div className="paleta-barras">
          <div className="barra-cor" style={{}}><span style={{}}>42%</span></div>
          <div className="barra-cor" style={{}}><span style={{}}>28%</span></div>
          <div className="barra-cor" style={{}}><span style={{}}>16%</span></div>
          <div className="barra-cor" style={{}}><span style={{}}>7%</span></div>
          <div className="barra-cor" style={{}}><span style={{}}>7%</span></div>
        </div>
      </div>
    </section>

    <section id="tipografia">
      <div className="container">
        <h2 className="section-titulo">O sistema<br/>tipográfico</h2>
        <p className="section-desc">Sora para display e títulos, transmitindo confiança e modernidade. Inter para o corpo do
          texto, garantindo legibilidade perfeita.</p>

        <div className="tipo-grid">
          <div className="tipo-card glass-light">
            <div className="tipo-head">
              <h3>Sora</h3>
              <span>Primária</span>
            </div>
            <div className="tipo-escala">
              <div className="tipo-linha"><span className="tipo-label">Display</span><span className="tipo-exemplo"
                  style={{}}>SAÚDE</span></div>
              <div className="tipo-linha"><span className="tipo-label">H1</span><span className="tipo-exemplo"
                  style={{}}>PANTANAL</span></div>
              <div className="tipo-linha"><span className="tipo-label">H2</span><span className="tipo-exemplo"
                  style={{}}>Planos de saúde corporativos</span></div>
            </div>
          </div>

          <div className="tipo-card glass-light">
            <div className="tipo-head">
              <h3>Inter</h3>
              <span>Secundária</span>
            </div>
            <div className="tipo-escala">
              <div className="tipo-linha"><span className="tipo-label">Body L</span><span className="tipo-exemplo"
                  style={{}}>Quando sua equipe está bem
                  cuidada.</span></div>
              <div className="tipo-linha"><span className="tipo-label">Body</span><span className="tipo-exemplo"
                  style={{}}>Plantão psicológico 24 horas,
                  NR1.</span></div>
              <div className="tipo-linha"><span className="tipo-label">Caption</span><span className="tipo-exemplo"
                  style={{}}>Campo Grande, MS · Operadora
                  B2B</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="aplicacoes">
      <div className="container">
        <h2 className="section-titulo">A marca<br/>em uso</h2>

        <div className="app-wrap">
          <div className="app-row">
            <div className="app-img mockup-bg-1">
              <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/mockup-cartao.png" alt="Cartão" />
            </div>
            <div className="app-text glass-light">
              <p className="app-num">01 · Papelaria</p>
              <h3 className="app-title">Cartão de visita</h3>
              <p className="app-desc">Frente com o símbolo isolado, verso com dados de contato em layout limpo e espaço
                negativo generoso.</p>
              <div className="app-specs">
                <div className="spec-item"><span className="spec-k">Formato</span><span className="spec-v">90 × 50 mm</span></div>
                <div className="spec-item"><span className="spec-k">Papel</span><span className="spec-v">Off-white 300g</span></div>
              </div>
              <a href="#downloads" className="btn-outline">Baixar arquivo</a>
            </div>
          </div>

          <div className="app-row">
            <div className="app-text glass-light">
              <p className="app-num">02 · Digital</p>
              <h3 className="app-title">Banner de site</h3>
              <p className="app-desc">Hero institucional para o site da Pantanal Saúde. Fundo flat com a cruz-arara como
                elemento âncora.</p>
              <div className="app-specs">
                <div className="spec-item"><span className="spec-k">Desktop</span><span className="spec-v">1920 × 600 px</span>
                </div>
                <div className="spec-item"><span className="spec-k">Mobile</span><span className="spec-v">768 × 800 px</span></div>
              </div>
              <a href="#downloads" className="btn-outline">Baixar arquivo</a>
            </div>
            <div className="app-img mockup-bg-2">
              <img src="https://teacherana.com.br/wp-content/uploads/teste/assets/ps/mockup-banner.png" alt="Banner" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>

  {/* ── BLOCO DARK INFERIOR ── */}
  <div className="dark-wrap">
    <div className="blob blob-dark-1" style={{}}></div>
    <div className="blob blob-dark-3" style={{}}></div>

    <section id="downloads">
      <div className="container">
        <h2 className="section-titulo">Arquivos<br/>da marca</h2>
        <p className="section-desc">Todos os arquivos finais, prontos para uso digital e gráfica. Baixe item por item
          conforme a necessidade.</p>

        <div className="downloads-grid">
          <div className="download-card glass-dark">
            <div className="dl-top"><span className="dl-format">SVG · AI</span><span className="dl-weight">Vetorial</span></div>
            <h3 className="dl-title">Logo vetorial completo</h3>
            <p className="dl-desc">Todas as versões em arquivo editável e escalável.</p>
            <a href="#" className="btn-solid">Baixar ZIP</a>
          </div>

          <div className="download-card glass-dark">
            <div className="dl-top"><span className="dl-format">PNG</span><span className="dl-weight">Digital</span></div>
            <h3 className="dl-title">Logo em alta resolução</h3>
            <p className="dl-desc">PNG transparente em 2x e 3x. Fundos claro e escuro.</p>
            <a href="#" className="btn-solid">Baixar ZIP</a>
          </div>

          <div className="download-card glass-dark">
            <div className="dl-top"><span className="dl-format">PNG</span><span className="dl-weight">Produtos</span></div>
            <h3 className="dl-title">Logos por produto</h3>
            <p className="dl-desc">Plantão, Planos e NR1 recortados para uso.</p>
            <a href="#" className="btn-solid">Baixar ZIP</a>
          </div>

          <div className="download-card glass-dark">
            <div className="dl-top"><span className="dl-format">PDF</span><span className="dl-weight">Impressão</span></div>
            <h3 className="dl-title">Material Gráfico</h3>
            <p className="dl-desc">Cartão, folders, tudo fechado com sangria e marcas.</p>
            <a href="#" className="btn-solid">Baixar ZIP</a>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <div className="footer-inner">
        <div className="footer-left">
          <span className="footer-sparkle">✦</span>
          <p>Produzido por <strong>hekbay</strong></p>
          <p>OBRIGADO PELA CONFIANÇA</p>
        </div>
        <div className="footer-right">
          <p>Manual de Identidade Visual</p>
          <p>Pantanal Saúde · 2026</p>
        </div>
      </div>
    </footer>
  </div>
    </>
  );
}
