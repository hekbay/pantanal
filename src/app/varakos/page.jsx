"use client";
import './varakos.css';
import Script from 'next/script';

const htmlContent = `

<div class="bg-art" id="bgArt"></div>
<div class="vignette"></div>

<button class="gamer-btn" id="gamerBtn" onclick="toggleGamerMode()">botão gamer</button>

<div class="sheet">

  <div class="crest"><span class="sigil">⬡ Patrono das Sombras ⬡</span></div>
  <h1 class="name"><span class="edit" contenteditable="true">Varakos (Kos)</span></h1>
  <div class="subtitle">
    <span class="edit" contenteditable="true">Bruxo · Corruptor 5</span>
    <span class="sep">·</span>
    <span class="edit" contenteditable="true">Yuan-Ti · Viajante Distante</span>
  </div>
  <div class="divider">— ⬡ —</div>

  <div class="bg-controls">
    <button onclick="document.getElementById('bgInput').click()">Trocar fundo</button>
    <button onclick="restoreDefaultBg()">Restaurar arte</button>
    <input type="file" id="bgInput" accept="image/*" style="display:none">
  </div>

  <div class="tabs">
    <div class="tab active" data-v="base">Ficha Base</div>
    <div class="tab" data-v="classe">Pacto & Classe</div>
    <div class="tab" data-v="combate">Combate</div>
    <div class="tab" data-v="magia">Magia</div>
    <div class="tab" data-v="lore">Lore</div>
    <div class="tab" data-v="bag">Bag of Holding</div>
  </div>

  <!-- FICHA BASE -->
  <div class="view active" id="v-base">
    <div class="grid2">
      <div class="col-stack">

        <div class="panel">
          <h2>Identidade</h2>
          <div class="statline"><span class="k">Nome</span><span class="v edit" contenteditable="true">Varakos (Kos)</span></div>
          <div class="statline"><span class="k">Raça</span><span class="v edit" contenteditable="true">Yuan-Ti</span></div>
          <div class="statline"><span class="k">Classe</span><span class="v" id="idClasse">Bruxo / Corruptor 5</span></div>
          <div class="statline"><span class="k">Nível Total</span><span class="v auto" id="idNivel">5</span></div>
          <div class="statline"><span class="k">Nível Bruxo</span><span><input class="inl" type="number" id="lvlBrx" value="5" min="0" max="20"></span></div>
          <div class="statline"><span class="k">Antecedente</span><span class="v edit" contenteditable="true">Viajante Distante</span></div>
          <div class="statline"><span class="k">Alinhamento</span><span class="v edit" contenteditable="true">Neutro</span></div>
          <div class="statline"><span class="k">Experiência (XP)</span><span><input class="inl" type="number" id="xp" value="0" min="0"></span></div>
          <div class="statline"><span class="k">Inspiração</span><span><input class="inl" type="number" id="insp" value="0" min="0"></span></div>
        </div>

        <div class="panel">
          <h2>Atributos</h2>
          <div class="attrs" id="attrGrid"></div>
        </div>

        <div class="panel">
          <h2>Combate Base</h2>
          <div class="statline"><span class="k">Classe de Armadura</span><span class="v edit" contenteditable="true">12</span></div>
          <div class="statline"><span class="k">Iniciativa</span><span class="v auto" id="initVal">+0</span></div>
          <div class="statline"><span class="k">Bônus de Proficiência</span><span class="v auto" id="profVal">+3</span></div>
          <div class="statline"><span class="k">Deslocamento</span><span class="v" id="speedVal">9 m (6 quadrados)</span></div>
          <div class="hp-note">Deslocamento (m): <span class="edit" contenteditable="true" id="speedInput" oninput="updateSpeed()">9</span> m</div>
        </div>

        <div class="panel">
          <h2>Vitalidade</h2>
          <div class="hp-top">
            <span class="lbl">Pontos de Vida</span>
            <span class="hp-nums"><input type="number" id="hpcur" value="55"> / <span class="mx" id="hpmax">55</span></span>
          </div>
          <div class="hp-bar"><div class="hp-fill" id="hpfill"></div></div>
          <div class="statline" style="margin-top:12px"><span class="k">PV Temporários</span><span><input class="inl" type="number" id="hptmp" value="0" min="0"></span></div>
          <div class="hp-note">HP máx recalcula automaticamente.</div>
        </div>

        <div class="panel">
          <h2>Salvaguardas contra Morte</h2>
          <div class="deathbox">
            <div class="deathcol"><div class="lbl">Sucessos</div><div class="pips" id="deathS"></div></div>
            <div class="deathcol"><div class="lbl">Falhas</div><div class="pips" id="deathF"></div></div>
          </div>
        </div>

        <div class="panel">
          <h2>Talentos <button class="addbtn" onclick="addFeat()">+ talento</button></h2>
          <div id="featList"></div>
        </div>

      </div>

      <div class="col-stack">

        <div class="panel">
          <h2>Salvaguardas</h2>
          <div id="savesList"></div>
          <div class="hp-note" style="margin-top:9px">◆ proficiente (Bruxo: Sab e Car). Clique para alternar.</div>
        </div>

        <div class="panel">
          <h2>Perícias</h2>
          <div id="skillsList"></div>
          <div class="hp-note" style="margin-top:9px">Clique: proficiência → especialização → limpa.</div>
        </div>

        <div class="panel">
          <h2>Idiomas <button class="addbtn" onclick="addChip('langChips','novo idioma')">+ idioma</button></h2>
          <div class="chips" id="langChips">
            <span class="chip"><span class="edit" contenteditable="true">Comum</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
            <span class="chip"><span class="edit" contenteditable="true">Abissal</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
            <span class="chip"><span class="edit" contenteditable="true">Dracônico</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
            <span class="chip"><span class="edit" contenteditable="true">Umbral</span><button class="del" onclick="this.parentElement.remove()">✕</button></span>
          </div>
        </div>

        <div class="panel">
          <h2>Traços Raciais — Yuan-Ti <button class="addbtn" onclick="addEntry('raceList','Novo traço','Yuan-Ti','Descrição...')">+ traço</button></h2>
          <div id="raceList"></div>
        </div>

        <div class="panel">
          <h2>Equipamento <button class="addbtn" onclick="addEntry('invList','Novo item','Item','Descrição...')">+ item</button></h2>
          <div id="invList"></div>
        </div>

        <div class="panel">
          <h2>Notas de Sessão</h2>
          <div class="desc edit" contenteditable="true" data-empty="Anotações..." style="min-height:80px;display:block;line-height:1.6"></div>
        </div>

      </div>
    </div>
  </div>

  <!-- PACTO & CLASSE -->
  <div class="view" id="v-classe">
    <div class="grid1">

      <div class="panel">
        <h2>Conjuração — Bruxo</h2>
        <div class="statline"><span class="k">Atributo de Conjuração</span><span class="v">Carisma</span></div>
        <div class="statline"><span class="k">CD das Magias</span><span class="v auto" id="spellDC">—</span></div>
        <div class="statline"><span class="k">Mod. de Ataque Mágico</span><span class="v auto" id="spellAtk">—</span></div>
        <div class="statline"><span class="k">Nível dos Espaços de Magia</span><span class="v auto" id="pactSlotLvl">—</span></div>
        <div class="statline"><span class="k">Espaços de Magia (Pacto)</span><span class="v auto" id="pactSlotCount">—</span></div>

        <div style="margin-top:16px">
          <div class="hp-top">
            <span class="lbl" style="color:var(--venom)">Espaços de Pacto</span>
            <span class="hp-nums"><input type="number" id="pactcur" value="2"> / <span class="mx" id="pactmax">2</span></span>
          </div>
          <div class="pool-bar"><div class="pool-fill" id="pactfill"></div></div>
          <div class="hp-note">Recupera todos no descanso curto. Edite o atual conforme usa.</div>
        </div>
      </div>

      <div class="panel">
        <h2>Habilidades de Classe <button class="addbtn" onclick="addEntry('classList','Nova habilidade','Classe','Descrição...')">+ habilidade</button></h2>
        <div id="classList"></div>
      </div>

      <div class="panel">
        <h2>Invocações Místicas <button class="addbtn" onclick="addEntry('invocList','Nova invocação','Invocação','Descrição...')">+ invocação</button></h2>
        <div id="invocList"></div>
      </div>

    </div>
  </div>

  <!-- COMBATE -->
  <div class="view" id="v-combate">
    <div class="summary">
      <div class="sumcard"><div class="l">Classe Armadura</div><div class="v" id="sumCA">12</div></div>
      <div class="sumcard hp"><div class="l">Pontos de Vida</div><div class="v" id="sumHP">55</div></div>
      <div class="sumcard"><div class="l">Iniciativa</div><div class="v" id="sumInit">+1</div></div>
      <div class="sumcard"><div class="l">Deslocamento</div><div class="v" id="sumSpeed" style="font-size:1.1rem">9 m</div></div>
    </div>

    <div class="grid1">
      <div class="panel">
        <h2>Ataques <button class="addbtn" onclick="addAttack()">+ ataque</button></h2>
        <div class="atk-row atk-head"><div>Arma / Magia</div><div>Acerto</div><div>Dano</div><div></div></div>
        <div id="atkList"></div>
      </div>

      <div class="panel">
        <h2>Combos Salvos</h2>
        <div id="comboList"></div>
        <button class="addbtn" style="margin-top:6px;position:static" onclick="addCombo()">+ combo</button>
      </div>

      <div class="panel">
        <h2>Bônus & Modificadores <button class="addbtn" onclick="addEntry('bonusList','Novo bônus','','Descrição...')">+ bônus</button></h2>
        <div id="bonusList"></div>
      </div>

      <div class="panel">
        <h2>Habilidades de Combate <button class="addbtn" onclick="addEntry('cabilList','Nova habilidade','','Descrição...')">+ habilidade</button></h2>
        <div id="cabilList"></div>
      </div>
    </div>
  </div>

  <!-- MAGIA -->
  <div class="view" id="v-magia">
    <div class="grid1">

      <div class="panel">
        <h2>Magias Conhecidas <button class="addbtn" onclick="addSpell()">+ magia</button></h2>
        <div class="spelltier"><span>Truques</span></div>
        <div id="spell0"></div>
        <div class="spelltier"><span>Magias de Pacto</span><span class="slots" id="slot1">— espaços</span></div>
        <div class="spell-warn" id="warn1"></div>
        <div id="spell1"></div>
        <div class="spelltier"><span>Rituais (Livro dos Segredos)</span></div>
        <div id="spellR"></div>
      </div>

    </div>
  </div>

  <!-- LORE -->
  <div class="view" id="v-lore">
    <div class="grid1">
      <div class="panel" style="grid-column: 1 / -1;">
        <h2>Lore & Anotações</h2>
        <div class="lore-notes edit" id="loreNotes" contenteditable="true" data-empty="Escreva aqui suas anotações de lore, história, mundo, o que quiser..."></div>
      </div>
    </div>
  </div>

  <div class="view" id="v-bag">
    <div class="grid1">
      <div class="panel bag-panel" id="bagPanel">
        <h2>
          Bag of Holding
          <span class="bag-status" id="bagStatus">🔒 Somente visualização</span>
          <button class="addbtn" id="bagLockBtn" onclick="toggleBagLock()">Destravar edição</button>
          <button class="addbtn bag-only" onclick="addBagItem()">+ item</button>
        </h2>
        <div class="hp-note" style="margin-bottom:10px">Compartilhada com o grupo — atualiza sozinha para todo mundo, sem precisar recarregar a página.</div>
        <div id="bagList"></div>
      </div>
    </div>
  </div>

  <p class="footnote" id="foot">Varakos (Kos) · Nível 5 · Corruptor</p>
</div>

<div class="toolbar">
  <button onclick="saveSheet(true)">Salvar</button>
  <button onclick="resetSheet()">Restaurar</button>
  <span class="saved" id="savedmsg"></span>
</div>

`;

export default function VarakosPage() {
  return (
    <div className="sheet-container">
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <Script src="/varakos-script.js" strategy="lazyOnload" />
    </div>
  );
}
