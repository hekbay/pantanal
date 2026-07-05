"use client";
import './lautrec.css';
import Script from 'next/script';

const htmlContent = `

<div class="bg-art" id="bgArt"></div>
<div class="vignette"></div>

<div class="sheet">

  <div class="crest"><span class="mark">Praise the Sun</span></div>
  <h1 class="name"><span class="edit" contenteditable="true">Lautrec Fahrenheit</span></h1>
  <div class="subtitle">
    <span class="edit" contenteditable="true">Quickstep · Custom Lineage</span>
    <span class="sep">·</span>
    <span class="edit" contenteditable="true">Juramento de Vingança</span>
  </div>

  <div class="bg-controls">
    <button onclick="document.getElementById('bgInput').click()">Trocar fundo</button>
    <button onclick="restoreDefaultBg()">Restaurar arte</button>
    <input type="file" id="bgInput" accept="image/*" style="display:none">
  </div>

  <div class="tabs">
    <div class="tab active" data-v="base">Ficha Base</div>
    <div class="tab" data-v="classe">Classe</div>
    <div class="tab" data-v="combate">Combate</div>
    <div class="tab" data-v="magia">Magia</div>
    <div class="tab" data-v="lore">Lore</div>
  </div>

  <!-- ============ FICHA BASE ============ -->
  <div class="view active" id="v-base">
    <div class="grid2">
      <div class="col-stack">

        <div class="panel">
          <h2>Identidade</h2>
          <div class="statline"><span class="k">Nome</span><span class="v edit" contenteditable="true">Lautrec Fahrenheit</span></div>
          <div class="statline"><span class="k">Raça</span><span class="v edit" contenteditable="true">Quickstep (Custom Lineage)</span></div>
          <div class="statline"><span class="k">Classe</span><span class="v" id="idClasse">Paladino 2 / Echo Knight 3</span></div>
          <div class="statline"><span class="k">Nível Total</span><span class="v auto" id="idNivel">5</span></div>
          <div class="statline"><span class="k">Nível Paladino</span><span><input class="inl" type="number" id="lvlPal" value="2" min="0" max="20"></span></div>
          <div class="statline"><span class="k">Nível Fighter</span><span><input class="inl" type="number" id="lvlFig" value="3" min="0" max="20"></span></div>
          <div class="statline"><span class="k">Experiência (XP)</span><span><input class="inl" type="number" id="xp" value="6500" min="0"></span></div>
          <div class="statline"><span class="k">Inspiração</span><span><input class="inl" type="number" id="insp" value="0" min="0"></span></div>
        </div>

        <div class="panel">
          <h2>Atributos</h2>
          <div class="attrs" id="attrGrid"></div>
        </div>

        <div class="panel">
          <h2>Combate Base</h2>
          <div class="statline"><span class="k">Classe de Armadura</span><span class="v edit" contenteditable="true">18</span></div>
          <div class="statline"><span class="k">Iniciativa</span><span class="v auto" id="initVal">+0</span></div>
          <div class="statline"><span class="k">Bônus de Proficiência</span><span class="v auto" id="profVal">+3</span></div>
          <div class="statline"><span class="k">Deslocamento</span><span class="v" id="speedVal">15 m (10 quadrados)</span></div>
          <div class="hp-note">Editar deslocamento (em metros): <span class="edit" contenteditable="true" id="speedInput" oninput="updateSpeed()">15</span> m</div>
        </div>

        <div class="panel">
          <h2>Vitalidade</h2>
          <div class="hp-top">
            <span class="lbl">Pontos de Vida</span>
            <span class="hp-nums"><input type="number" id="hpcur" value="52"> / <span class="mx" id="hpmax">52</span></span>
          </div>
          <div class="hp-bar"><div class="hp-fill" id="hpfill"></div></div>
          <div class="statline" style="margin-top:12px"><span class="k">PV Temporários</span><span><input class="inl" type="number" id="hptmp" value="0" min="0"></span></div>
          <div class="hp-note">HP máx = dado cheio por nível + (mod. Con × nível). Recalcula sozinho.</div>
        </div>

        <div class="panel">
          <h2>Salvaguardas contra Morte</h2>
          <div class="deathbox">
            <div class="deathcol">
              <div class="lbl">Sucessos</div>
              <div class="pips" id="deathS"></div>
            </div>
            <div class="deathcol">
              <div class="lbl">Falhas</div>
              <div class="pips" id="deathF"></div>
            </div>
          </div>
        </div>

        <div class="panel">
          <h2>Talentos <button class="addbtn" onclick="addFeat()">+ talento</button></h2>
          <div id="featList">
            <!-- preenchido pelo JS -->
          </div>
        </div>

      </div>

      <div class="col-stack">

        <div class="panel">
          <h2>Salvaguardas</h2>
          <div id="savesList"></div>
          <div class="hp-note" style="margin-top:9px">◆ proficiente (Paladino: Sab e Car). Clique para alternar.</div>
        </div>

        <div class="panel">
          <h2>Perícias</h2>
          <div id="skillsList"></div>
          <div class="hp-note" style="margin-top:9px">Clique: proficiência → especialização → limpa.</div>
        </div>

        <div class="panel">
          <h2>Idiomas <button class="addbtn" onclick="addChip('langChips','novo idioma')">+ idioma</button></h2>
          <div class="chips" id="langChips">
            <span class="chip"><span class="edit" contenteditable="true">Élfico</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
            <span class="chip"><span class="edit" contenteditable="true">Umbral</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
            <span class="chip"><span class="edit" contenteditable="true">Comum</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
          </div>
        </div>

        <div class="panel">
          <h2>Traços de Raça — Quickstep <button class="addbtn" onclick="addEntry('raceList','Novo traço','Quickstep','Descrição....')">+ traço</button></h2>
          <div id="raceList"></div>
        </div>

        <div class="panel">
          <h2>Inventário <button class="addbtn" onclick="addEntry('invList','Novo item','Item','Descrição....')">+ item</button></h2>
          <div id="invList"></div>
        </div>

        <div class="panel">
          <h2>Notas de Sessão</h2>
          <div class="desc edit" contenteditable="true" data-empty="Anotações...." style="min-height:80px;display:block;line-height:1.6">Indo a Grenmoor prestar condolências à família de Caelan. Há algo suspeito na morte dele.</div>
        </div>

      </div>
    </div>
  </div>

  <!-- ============ CLASSE ============ -->
  <div class="view" id="v-classe">
    <div class="grid1">

      <div class="panel">
        <h2>Recursos de Classe</h2>
        <div class="statline"><span class="k">Vow of Enmity</span><span class="v edit" contenteditable="true">1 / desc. curto</span></div>
        <div class="statline"><span class="k">Unleash Incarnation</span><span class="v" id="unleashRes">3 / desc. longo</span></div>
        <div class="statline"><span class="k">Divine Sense</span><span class="v" id="dsenseRes">3 / desc. longo</span></div>
        <div class="statline"><span class="k">Startling Speed (Quickstep)</span><span class="v" id="startRes">5 rounds / dia</span></div>

        <div style="margin-top:16px">
          <div class="hp-top">
            <span class="lbl" style="color:var(--emerald)">Lay on Hands — Poço de Cura</span>
            <span class="hp-nums"><input type="number" id="lohcur" value="10"> / <span class="mx" id="lohmax">10</span></span>
          </div>
          <div class="pool-bar"><div class="pool-fill" id="lohfill"></div></div>
          <div class="hp-note">Máximo = 5 × nível de Paladino (automático). Edite o valor atual conforme gasta. 5 pts curam veneno/doença.</div>
        </div>
      </div>

      <div class="panel">
        <h2>Habilidades de Classe <button class="addbtn" onclick="addEntry('classList','Nova habilidade','Classe','Descrição....')">+ habilidade</button></h2>
        <div id="classList"></div>
      </div>

    </div>
  </div>

  <!-- ============ COMBATE ============ -->
  <div class="view" id="v-combate">

    <div class="summary">
      <div class="sumcard"><div class="l">Classe Armadura</div><div class="v" id="sumCA">18</div></div>
      <div class="sumcard hp"><div class="l">Pontos de Vida</div><div class="v" id="sumHP">52</div></div>
      <div class="sumcard"><div class="l">Iniciativa</div><div class="v" id="sumInit">+0</div></div>
      <div class="sumcard"><div class="l">Deslocamento</div><div class="v" id="sumSpeed" style="font-size:1.1rem">15 m</div></div>
    </div>

    <div class="grid1">

      <div class="panel">
        <h2>Ataques <button class="addbtn" onclick="addAttack()">+ ataque</button></h2>
        <div class="atk-row atk-head"><div>Arma</div><div>Acerto</div><div>Dano</div><div></div></div>
        <div id="atkList"></div>
        <div class="statline" style="margin-top:12px"><span class="k">Ataque Extra</span><span class="v edit" contenteditable="true">Sim — 2 ataques por ação (Fighter nv5)</span></div>
      </div>

      <div class="panel">
        <h2>Combos Salvos</h2>
        <div id="comboList"></div>
        <button class="addbtn" style="margin-top:6px;position:static" onclick="addCombo()">+ combo</button>
      </div>

      <div class="panel">
        <h2>Bônus & Modificadores de Combate <button class="addbtn" onclick="addEntry('bonusList','Novo bônus','','Descrição....')">+ bônus</button></h2>
        <div id="bonusList"></div>
      </div>

      <div class="panel">
        <h2>Habilidades de Combate <button class="addbtn" onclick="addEntry('cabilList','Nova habilidade','','Descrição....')">+ habilidade</button></h2>
        <div id="cabilList"></div>
      </div>

    </div>
  </div>

  <!-- ============ MAGIA ============ -->
  <div class="view" id="v-magia">
    <div class="grid1">

      <div class="panel">
        <h2>Conjuração — Paladino</h2>
        <div class="statline"><span class="k">Atributo de Conjuração</span><span class="v">Carisma</span></div>
        <div class="statline"><span class="k">CD das Magias</span><span class="v auto" id="spellDC">13</span></div>
        <div class="statline"><span class="k">Modificador de Ataque Mágico</span><span class="v auto" id="spellAtk">+5</span></div>
      </div>

      <div class="panel">
        <h2>Magias Preparadas <button class="addbtn" onclick="addSpell()">+ magia</button></h2>

        <div class="spelltier"><span>Nível 1</span><span class="slots" id="slot1">2 espaços</span></div>
        <div class="spell-warn" id="warn1"></div>
        <div id="spell1"></div>

        <div class="spelltier"><span>Nível 2</span><span class="slots" id="slot2">— espaços</span></div>
        <div class="spell-warn" id="warn2"></div>
        <div id="spell2"></div>

        <div class="spelltier"><span>Nível 3</span><span class="slots" id="slot3">— espaços</span></div>
        <div class="spell-warn" id="warn3"></div>
        <div id="spell3"></div>
      </div>

    </div>
  </div>

  <div class="view" id="v-lore">
    <div class="grid1">
      <div class="panel" style="grid-column: 1 / -1;">
        <h2>Mundo & Cidades</h2>
        <div class="map-container">
          <div class="map-region ocidente">
            <h3 class="map-title">Ocidente</h3>
            <div class="map-grid">
               <div class="map-node node-dralmor">
                 <div class="node-name edit" contenteditable="true">Dralmor (Gélido)</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-karzu">
                 <div class="node-name edit" contenteditable="true">Karzu (Deserto)</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-velindar">
                 <div class="node-name edit" contenteditable="true">Velindar (Central)</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-velferium">
                 <div class="node-name edit" contenteditable="true">Velferium</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-vales">
                 <div class="node-name edit" contenteditable="true">Vales Uivantes</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-aesmeril">
                 <div class="node-name edit" contenteditable="true">Aesmeril (Magocracia)</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
               <div class="map-node node-jandora">
                 <div class="node-name edit" contenteditable="true">Jandora (Selva)</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
            </div>
          </div>
          <div class="map-region oriente">
            <h3 class="map-title">Oriente (?)</h3>
            <div class="map-grid">
               <div class="map-node node-oriente-unknown">
                 <div class="node-name edit" contenteditable="true">Terras Desconhecidas</div>
                 <div class="node-desc edit" contenteditable="true" data-empty="Anotações..."></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="grid2">
      <div class="panel">
        <h2>Contatos <button class="addbtn" onclick="addContact()">+ contato</button></h2>
        <div id="contactList" class="feat-list"></div>
      </div>

      <div class="panel">
        <h2>Missões <button class="addbtn" onclick="addQuest()">+ missão</button></h2>
        <div id="questList" class="feat-list"></div>
      </div>
    </div>
  </div>

  <div class="footnote" id="foot">Lautrec Fahrenheit · Nível 5 · Vingança</div>

</div>

<div class="toolbar">
  <button onclick="saveSheet()">Salvar</button>
  <button onclick="resetSheet()">Restaurar</button>
  <span class="saved" id="savedmsg"></span>
</div>


`;

export default function LautrecPage() {
  return (
    <div className="sheet-container">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/lautrec-script.js" strategy="lazyOnload" />
    </div>
  );
}
