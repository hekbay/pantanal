
const KEY='lautrec_sheet_v3';
const DEFAULT_BG="https://teacherana.com.br/wp-content/uploads/teste/assets/lautrec.jpeg";

const ATTRS=[['for','Força'],['des','Destreza'],['con','Constituição'],['int','Inteligência'],['sab','Sabedoria'],['car','Carisma']];
const SKILLS=[['Acrobacia','des'],['Arcanismo','int'],['Atletismo','for'],['Atuação','car'],['Enganação','car'],['Furtividade','des'],['História','int'],['Intimidação','car'],['Intuição','sab'],['Investigação','int'],['Lidar c/ Animais','sab'],['Medicina','sab'],['Natureza','int'],['Percepção','sab'],['Persuasão','car'],['Prestidigitação','des'],['Religião','int'],['Sobrevivência','sab']];
const DEF_SCORES={for:20,des:10,con:16,int:10,sab:12,car:15};
const DEF_SAVEPROF={sab:true,car:true};
const DEF_SKILLPROF={'Intimidação':1,'Percepção':1,'Atletismo':1};

let state={scores:{...DEF_SCORES},saveProf:{...DEF_SAVEPROF},skillProf:{...DEF_SKILLPROF},lvlPal:2,lvlFig:3,deathS:0,deathF:0,bg:null};

function mod(s){return Math.floor((s-10)/2);}
function fmt(n){return (n>=0?'+':'')+n;}
function profBonus(t){return Math.ceil(t/4)+1;}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function cssId(s){return s.replace(/[^a-zA-Z0-9]/g,'_');}

function calcMaxHP(){const t=state.lvlPal+state.lvlFig;return 10*t + mod(state.scores.con)*t;}

function paladinSlots(p){
  const T={0:[0,0,0,0],1:[0,0,0,0],2:[0,2,0,0],3:[0,3,0,0],4:[0,3,0,0],5:[0,4,2,0],6:[0,4,2,0],7:[0,4,3,0],8:[0,4,3,0],9:[0,4,3,2],10:[0,4,3,2],11:[0,4,3,3],12:[0,4,3,3]};
  const r=T[Math.min(p,12)]||[0,0,0,0];return {1:r[1]||0,2:r[2]||0,3:r[3]||0};
}
function slotTxt(n){return n>0?n+' espaço'+(n>1?'s':''):'— espaços';}

function updateSpeed(){
  const m=parseFloat((document.getElementById('speedInput').textContent||'').replace(',','.'))||0;
  const sq=Math.round(m/1.5);
  document.getElementById('speedVal').textContent=m+' m ('+sq+' quadrados)';
  document.getElementById('sumSpeed').textContent=m+' m';
}

function recalc(){
  const pal=state.lvlPal,fig=state.lvlFig,total=pal+fig;
  document.getElementById('idNivel').textContent=total;
  document.getElementById('idClasse').textContent='Paladino '+pal+' / Echo Knight '+fig;
  const pb=profBonus(total);
  document.getElementById('profVal').textContent=fmt(pb);

  ATTRS.forEach(([k])=>{const e=document.getElementById('mod_'+k);if(e)e.textContent=fmt(mod(state.scores[k]));});
  document.getElementById('initVal').textContent=fmt(mod(state.scores.des));

  ATTRS.forEach(([k,label])=>{
    const m=mod(state.scores[k]),prof=!!state.saveProf[k],tot=m+(prof?pb:0);
    const v=document.getElementById('save_'+k);if(v)v.textContent=fmt(tot);
    const r=document.getElementById('saverow_'+k);if(r)r.classList.toggle('prof',prof);
  });
  SKILLS.forEach(([name,ab])=>{
    const lvl=state.skillProf[name]||0,m=mod(state.scores[ab]);
    const tot=m+(lvl===1?pb:lvl===2?pb*2:0);
    const v=document.getElementById('skv_'+cssId(name));if(v)v.textContent=fmt(tot);
    const r=document.getElementById('skr_'+cssId(name));if(r){r.classList.toggle('prof',lvl===1);r.classList.toggle('expert',lvl===2);}
  });

  const maxhp=calcMaxHP();
  document.getElementById('hpmax').textContent=maxhp;
  const cur=document.getElementById('hpcur');
  if(cur.dataset.synced!=='1'||parseInt(cur.value)>maxhp){cur.value=maxhp;cur.dataset.synced='1';}
  updateHPbar();

  const cm=mod(state.scores.car);
  document.getElementById('spellDC').textContent=8+pb+cm;
  document.getElementById('spellAtk').textContent=fmt(pb+cm);

  const slots=paladinSlots(pal);
  document.getElementById('slot1').textContent=slotTxt(slots[1]);
  document.getElementById('slot2').textContent=slotTxt(slots[2]);
  document.getElementById('slot3').textContent=slotTxt(slots[3]);

  document.getElementById('unleashRes').textContent=Math.max(1,mod(state.scores.con))+' / desc. longo';
  document.getElementById('dsenseRes').textContent=(1+cm)+' / desc. longo';
  document.getElementById('startRes').textContent=total+' rounds / dia';

  const lohmax=pal*5;
  document.getElementById('lohmax').textContent=lohmax;
  const lc=document.getElementById('lohcur');
  if(lc.dataset.synced!=='1'||parseInt(lc.value)>lohmax){lc.value=lohmax;lc.dataset.synced='1';}
  updateLOH();

  document.getElementById('sumCA').textContent=document.querySelector('#v-base .panel:nth-child(3)') ? (document.querySelectorAll('#v-base .statline .v.edit')[0]?.textContent||'18') : '18';
  document.getElementById('sumInit').textContent=fmt(mod(state.scores.des));
  document.getElementById('sumHP').textContent=document.getElementById('hpcur').value+' / '+maxhp;

  document.getElementById('foot').textContent='Lautrec Fahrenheit · Nível '+total+' · Vingança';
  updateSpeed();
  checkSpellSpace();
}

function checkSpellSpace(){
  const slots=paladinSlots(state.lvlPal);
  [1,2,3].forEach(t=>{
    const have=document.querySelectorAll('#spell'+t+' .entry').length;
    const cap=slots[t],w=document.getElementById('warn'+t);
    if(cap>0&&have<cap){w.textContent='⚠ Você tem '+cap+' espaço(s) de magia nível '+t+' mas só '+have+' magia(s) preparada(s). Adicione mais.';w.classList.add('show');}
    else w.classList.remove('show');
  });
}

function updateHPbar(){
  const c=parseInt(document.getElementById('hpcur').value)||0;
  const m=parseInt(document.getElementById('hpmax').textContent)||1;
  document.getElementById('hpfill').style.width=Math.max(0,Math.min(100,(c/m)*100))+'%';
  const sm=document.getElementById('sumHP');if(sm)sm.textContent=c+' / '+m;
}
function updateLOH(){
  const c=parseInt(document.getElementById('lohcur').value)||0;
  const m=parseInt(document.getElementById('lohmax').textContent)||1;
  document.getElementById('lohfill').style.width=Math.max(0,Math.min(100,(c/m)*100))+'%';
}
document.getElementById('hpcur').addEventListener('input',()=>{document.getElementById('hpcur').dataset.synced='1';updateHPbar();});
document.getElementById('lohcur').addEventListener('input',()=>{document.getElementById('lohcur').dataset.synced='1';updateLOH();});

function buildAttrs(){
  const g=document.getElementById('attrGrid');g.innerHTML='';
  ATTRS.forEach(([k,label])=>{
    const d=document.createElement('div');d.className='attr';
    d.innerHTML=`<div class="lbl">${label}</div><input class="score" type="number" id="sc_${k}" value="${state.scores[k]}" min="1" max="30"><div class="mod" id="mod_${k}">+0</div>`;
    g.appendChild(d);
    d.querySelector('input').addEventListener('input',e=>{state.scores[k]=parseInt(e.target.value)||0;recalc();});
  });
}
function buildSaves(){
  const c=document.getElementById('savesList');c.innerHTML='';
  ATTRS.forEach(([k,label])=>{
    const r=document.createElement('div');r.className='statline skill-row';r.id='saverow_'+k;
    r.innerHTML=`<span class="k"><span class="dot"></span>${label}</span><span class="v auto" id="save_${k}">+0</span>`;
    r.addEventListener('click',()=>{state.saveProf[k]=!state.saveProf[k];recalc();});
    c.appendChild(r);
  });
}
function buildSkills(){
  const c=document.getElementById('skillsList');c.innerHTML='';
  SKILLS.forEach(([name,ab])=>{
    const r=document.createElement('div');r.className='statline skill-row';r.id='skr_'+cssId(name);
    r.innerHTML=`<span class="k"><span class="dot"></span>${name} <span style="opacity:0.5;font-size:0.7rem">(${ab.toUpperCase()})</span></span><span class="v auto" id="skv_${cssId(name)}">+0</span>`;
    r.addEventListener('click',()=>{const cur=state.skillProf[name]||0;state.skillProf[name]=(cur+1)%3;recalc();});
    c.appendChild(r);
  });
}
function buildDeath(){
  const S=document.getElementById('deathS'),F=document.getElementById('deathF');
  S.innerHTML='';F.innerHTML='';
  for(let i=1;i<=3;i++){
    const s=document.createElement('div');s.className='pip succ';s.dataset.i=i;
    s.onclick=()=>{state.deathS=(state.deathS===i?i-1:i);renderDeath();saveSheet();};
    S.appendChild(s);
    const f=document.createElement('div');f.className='pip fail';f.dataset.i=i;
    f.onclick=()=>{state.deathF=(state.deathF===i?i-1:i);renderDeath();saveSheet();};
    F.appendChild(f);
  }
  renderDeath();
}
function renderDeath(){
  document.querySelectorAll('#deathS .pip').forEach(p=>p.classList.toggle('on',+p.dataset.i<=state.deathS));
  document.querySelectorAll('#deathF .pip').forEach(p=>p.classList.toggle('on',+p.dataset.i<=state.deathF));
}

function makeAttack(nm='',hit='',dmg=''){
  const r=document.createElement('div');r.className='atk-row';
  r.innerHTML=`<input class="nm" placeholder="arma" value="${esc(nm)}"><input placeholder="+0" value="${esc(hit)}"><input placeholder="1d8" value="${esc(dmg)}"><button class="del" onclick="this.parentElement.remove()">✕</button>`;
  return r;
}
function addAttack(){document.getElementById('atkList').appendChild(makeAttack());}

function makeLocationNode(name,desc,children,open){
  const node=document.createElement('div');node.className='loc-node'+(open?' open':'');
  node.innerHTML=`<div class="loc-head"><button class="loc-toggle" onclick="toggleLocNode(this)" title="Expandir/recolher">▶</button><span class="loc-name edit" contenteditable="true" data-empty="Nome do local">${name||''}</span><span class="loc-btns"><button class="loc-addchild" onclick="addSubLocation(this)">+ sub-local</button><button class="del" onclick="removeLocNode(this)">✕</button></span></div><div class="loc-desc edit" contenteditable="true" data-empty="Anotações...">${desc||''}</div><div class="loc-children"></div>`;
  const wrap=node.querySelector(':scope > .loc-children');
  (children||[]).forEach(c=>wrap.appendChild(makeLocationNode(c.name,c.desc,c.children,c.open)));
  updateLocState(node);
  return node;
}
function updateLocState(node){
  const wrap=node.querySelector(':scope > .loc-children');
  if(wrap) node.classList.toggle('has-children',wrap.children.length>0);
}
function toggleLocNode(btn){
  btn.closest('.loc-node').classList.toggle('open');
  saveSheet();
}
function addLocation(){
  const l=document.getElementById('locTree');
  const n=makeLocationNode('Novo Local','',[],false);
  l.appendChild(n);
  n.querySelector('.loc-name').focus();
  saveSheet();
}
function addSubLocation(btn){
  const parent=btn.closest('.loc-node');
  const wrap=parent.querySelector(':scope > .loc-children');
  const n=makeLocationNode('Novo Sub-local','',[],false);
  wrap.appendChild(n);
  parent.classList.add('open');
  updateLocState(parent);
  n.querySelector('.loc-name').focus();
  saveSheet();
}
function removeLocNode(btn){
  const node=btn.closest('.loc-node');
  const parentWrap=node.parentElement;
  const parentNode=parentWrap.closest('.loc-node');
  node.remove();
  if(parentNode) updateLocState(parentNode);
  saveSheet();
}
function serializeLocTree(container){
  if(!container) return [];
  return [...container.children].filter(n=>n.classList.contains('loc-node')).map(n=>({
    name:n.querySelector(':scope > .loc-head .loc-name')?.innerHTML||'',
    desc:n.querySelector(':scope > .loc-desc')?.innerHTML||'',
    open:n.classList.contains('open'),
    children:serializeLocTree(n.querySelector(':scope > .loc-children'))
  }));
}
function toggleLocTree(){
  const t=document.getElementById('locTree');
  const btn=document.getElementById('locToggleBtn');
  const willCollapse = t.style.display!=='none';
  t.style.display = willCollapse ? 'none' : '';
  btn.textContent = willCollapse ? 'Mostrar' : 'Esconder';
  state.locCollapsed = willCollapse;
  saveSheet();
}
function applyLocCollapse(){
  const t=document.getElementById('locTree');
  const btn=document.getElementById('locToggleBtn');
  if(!t||!btn) return;
  t.style.display = state.locCollapsed ? 'none' : '';
  btn.textContent = state.locCollapsed ? 'Mostrar' : 'Esconder';
}
function seedLocations(){
  const l=document.getElementById('locTree');
  if(!l||l.children.length>0)return;
  [['Dralmor (Gélido)',''],['Karzu (Deserto)',''],['Velindar (Central)',''],['Velferium',''],['Vales Uivantes',''],['Aesmeril (Magocracia)',''],['Jandora (Selva)',''],['Terras Desconhecidas (Oriente)','']].forEach(([n,d])=>l.appendChild(makeLocationNode(n,d,[],false)));
}

function makeEntry(t,tag,d){
  const e=document.createElement('div');e.className='entry';
  e.innerHTML=`<div class="title"><span class="edit" contenteditable="true">${t||''}</span>${tag?`<span class="tag edit" contenteditable="true">${tag}</span>`:''}</div><div class="desc edit" contenteditable="true">${d||''}</div><button class="del" onclick="this.parentElement.remove()">✕</button>`;
  return e;
}
function addEntry(id,t,tag,d){document.getElementById(id).appendChild(makeEntry(t,tag,d));}

function addContact() {
  addEntry('contactList', 'Nome do Contato', 'Facção/Cargo', 'Anotações sobre a relação...');
}
function addQuest() {
  addEntry('questList', 'Nova Missão', 'Ativa', 'Descreva a missão...');
}

function makeSpell(t,d){
  const e=document.createElement('div');e.className='entry';
  e.innerHTML=`<div class="title"><span class="edit" contenteditable="true">${t||''}</span></div><div class="desc edit" contenteditable="true">${d||''}</div><button class="del" onclick="this.parentElement.remove();checkSpellSpace()">✕</button>`;
  return e;
}
function addSpell(){
  const t=prompt('Nível da magia? (1, 2 ou 3)','1');
  const tier=(t==='3')?3:(t==='2')?2:1;
  document.getElementById('spell'+tier).appendChild(makeSpell('Nova Magia','Descrição....'));
  checkSpellSpace();
}

function makeCombo(name,seq){
  const d=document.createElement('div');d.className='combo';
  d.innerHTML=`<div class="cname edit" contenteditable="true">${name||''}</div><div class="cseq edit" contenteditable="true">${seq||''}</div><button class="del" style="position:static;opacity:0.5;float:right" onclick="this.parentElement.remove()">✕ remover</button>`;
  return d;
}
function addCombo(){document.getElementById('comboList').appendChild(makeCombo('Novo Combo','ação 1 → ação 2 → ação 3'));}

function addChip(id,ph){
  const c=document.getElementById(id);
  const s=document.createElement('span');s.className='chip';
  s.innerHTML=`<span class="edit" contenteditable="true">${esc(ph)}</span><button class="del" onclick="this.parentElement.remove()">✕</button>`;
  c.appendChild(s);s.querySelector('.edit').focus();
}

// background
function setBg(u){document.getElementById('bgArt').style.setProperty('--bg-art-url','url('+u+')');}
function restoreDefaultBg(){setBg(DEFAULT_BG);state.bg=null;saveSheet();flash('Arte restaurada');}
document.getElementById('bgInput').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{setBg(ev.target.result);state.bg=ev.target.result;saveSheet();flash('Fundo trocado');};
  r.readAsDataURL(f);
});

// tabs (delegado em document, funciona mesmo se a árvore de tabs for recriada)
document.addEventListener('click', e=>{
  const t = e.target.closest('.tab');
  if(!t) return;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const view = document.getElementById('v-'+t.dataset.v);
  if(view) view.classList.add('active');
  if(t.dataset.v==='combate') recalc();
});

// seed
function seedDefaults(){
  [['Espada Longa +2','+10','1d8+7 cortante'],['Espada Longa +2 (2 mãos)','+10','1d10+7 cortante'],['Echo — Unleash Incarnation','+10','1d8+7 (extra)'],['Divine Smite','—','+2d8 radiante / slot']].forEach(a=>document.getElementById('atkList').appendChild(makeAttack(...a)));

  [['Combo Burst','Vow of Enmity (bônus) → Ataque + Ataque Extra → Unleash Incarnation (Echo) → Divine Smite no maior acerto'],
   ['Combo Controle','Hold Person no alvo → ataques corpo a corpo viram crítico → Divine Smite com dados dobrados'],
   ['Combo Seguro','Manifest Echo a 15 ft → ataca da posição do Echo → recua sem provocar ataque de oportunidade']].forEach(c=>document.getElementById('comboList').appendChild(makeCombo(...c)));

  [['Ataque Extra','Fighter','2 ataques sempre que usa a ação Atacar (nível 5 de Fighter).'],
   ['Vow of Enmity','Vingança','Vantagem em todos os ataques contra um alvo por 1 min.'],
   ['Exploit Opening','Zhentarim','Dano de Ataque de Oportunidade rola 2× — usa o melhor.'],
   ['Fighting Style: Dueling','Paladino','+2 de dano com arma de uma mão e nada na outra.']].forEach(f=>document.getElementById('bonusList').appendChild(makeEntry(...f)));

  [['Manifest Echo','Echo Knight','Ação bônus: eco a até 15 ft (CA 14, 1 PV). Troca de lugar (15 ft) e ataca da posição dele.'],
   ['Unleash Incarnation','Echo Knight','Ao usar Ataque Extra, o Echo faz um ataque adicional. Usos = mod. Con / desc. longo.']].forEach(f=>document.getElementById('cabilList').appendChild(makeEntry(...f)));

  [['Divine Smite','Paladino','Ao acertar corpo a corpo, gasta slot p/ +2d8 radiante (3d8 vs mortos-vivos). +1d8 por nível de slot acima do 1º.'],
   ['Lay on Hands','Paladino','Poço de cura = 5 × nível Paladino por desc. longo. 5 pts curam veneno/doença.'],
   ['Vow of Enmity','Juramento · Vingança','Ação bônus: vantagem em todos os ataques contra um alvo por 1 min. 1x / desc. curto.'],
   ['Channel Divinity','Paladino','Disponível a partir do nível 3 de Paladino.'],
   ['Manifest Echo','Echo Knight','Cria um eco manobrável de si mesmo. Base do estilo Echo Knight.'],
   ['Unleash Incarnation','Echo Knight','Ataque adicional pelo Echo ao usar Ataque Extra.']].forEach(f=>document.getElementById('classList').appendChild(makeEntry(...f)));

  [['Startling Speed','Quickstep','Mover ≥3 m (2 quadrados): ataques contra você têm desvantagem até seu próximo turno. Rounds/dia = nível.'],
   ['Fey Ancestry','Quickstep','Vantagem vs enfeitiçado. Magia não te faz dormir.'],
   ['Darkvision','Quickstep','Enxerga no escuro a 18 m.'],
   ['Nimble','Quickstep','Proficiência em Acrobacia e Prestidigitação.'],
   ['Deslocamento Acelerado','Quickstep','Deslocamento base de 15 m.']].forEach(f=>document.getElementById('raceList').appendChild(makeEntry(...f)));

  [['Espada Longa Consciente +2','Item','Usável com Destreza. Personalidade ainda desconhecida — revelada no dia.'],
   ['Pote de Poção Infinita','Item','4d8+Con por gole, 4 goles/dia, reabastece toda manhã. Tudo de uma vez: 128+Con + rola 1d20 efeito colateral.'],
   ['Botas da Pata de Aranha','Item','Anda em paredes e tetos sem teste, mãos livres.'],
   ['Poção da Força do Gigante da Tempestade','Item','Força 29 por 1 hora. Guardar para chefe.'],
   ['Anel do Perigo Indiscreto','Item','Grita quando inimigo visível se aproxima. Nunca surpreendido.'],
   ['Meia Placa · Escudo · Forgery Kit','Equip.','Combate e antecedente Zhentarim.']].forEach(i=>document.getElementById('invList').appendChild(makeEntry(...i)));

  [['Wrathful Smite','Ação bônus. +1d6 psíquico e save de Sabedoria ou amedrontado (concentração).'],['Bless','Concentração. Até 3 criaturas: +1d4 em ataques e saves por 1 min.'],['Shield of Faith','Ação bônus. +2 CA a uma criatura por 10 min (concentração).']].forEach(s=>document.getElementById('spell1').appendChild(makeSpell(...s)));
  [['Hold Person','Paralisa humanoide (save Sabedoria). Ataques corpo a corpo contra paralisado são críticos.'],['Misty Step','Ação bônus. Teleporta até 9 m.']].forEach(s=>document.getElementById('spell2').appendChild(makeSpell(...s)));
}

// ─── SUPABASE CONFIG ────────────────────────────────────────────────────────
const SB_URL  = 'https://tvxxkvoamgxblaehnlhf.supabase.co';
const SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eHhrdm9hbWd4YmxhZWhubGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODg5MTEsImV4cCI6MjA5NTk2NDkxMX0.hDEj28pF_4B8B6asQlfEuPcuVy-2u9dXlJrKlOw6API';
const SHEET_ID = 'lautrec-fahrenheit'; // identificador único desta ficha

async function sbFetch(path, opts={}) {
  const res = await fetch(`${SB_URL}/rest/v1/${path}`, {
    ...opts,
    headers: {
      'apikey': SB_KEY,
      'Authorization': `Bearer ${SB_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': opts.prefer || '',
      ...opts.headers
    }
  });
  if (!res.ok) { const err = await res.text(); throw new Error(err); }
  const txt = await res.text();
  return txt ? JSON.parse(txt) : null;
}

// ─── SERIALIZE / APPLY ──────────────────────────────────────────────────────
function serial(id){return [...document.getElementById(id).children].map(e=>({t:e.querySelector('.title .edit')?.innerHTML||e.querySelector('.cname')?.innerHTML||'',tag:e.querySelector('.tag')?.innerHTML||'',d:e.querySelector('.desc')?.innerHTML||e.querySelector('.cseq')?.innerHTML||''}));}

function collect(){
  return {state,
    name:document.querySelector('h1.name .edit').innerHTML,
    sub:[...document.querySelectorAll('.subtitle .edit')].map(e=>e.innerHTML),
    idName:document.querySelectorAll('#v-base .statline .v.edit')[0]?.innerHTML||'',
    race:document.querySelectorAll('#v-base .statline .v.edit')[1]?.innerHTML||'',
    ca:document.querySelectorAll('#v-base .statline .v.edit')[2]?.innerHTML||'18',
    speed:document.getElementById('speedInput').textContent,
    xp:document.getElementById('xp').value,insp:document.getElementById('insp').value,
    hpcur:document.getElementById('hpcur').value,hptmp:document.getElementById('hptmp').value,
    lohcur:document.getElementById('lohcur').value,
    atks:[...document.querySelectorAll('#atkList .atk-row')].map(r=>[...r.querySelectorAll('input')].map(i=>i.value)),
    combos:[...document.querySelectorAll('#comboList .combo')].map(c=>[c.querySelector('.cname').innerHTML,c.querySelector('.cseq').innerHTML]),
    bonus:serial('bonusList'),cabil:serial('cabilList'),classL:serial('classList'),
    race_:serial('raceList'),inv:serial('invList'),
    sp1:serial('spell1'),sp2:serial('spell2'),sp3:serial('spell3'),
    langs:[...document.querySelectorAll('#langChips .edit')].map(e=>e.innerHTML),
    notes:document.querySelector('#v-base .panel:last-child .desc.edit')?.innerHTML||'',
    feats:[...document.querySelectorAll('#featList .feat-item')].map(item=>({
      n:item.querySelector('.feat-name')?.innerHTML||'',
      s:item.querySelector('.feat-src')?.innerHTML||'',
      d:item.querySelector('.feat-body')?.innerHTML||'',
      expanded:!item.classList.contains('collapsed')
    })),
    contacts:serial('contactList'),
    quests:serial('questList'),
    locTree:serializeLocTree(document.getElementById('locTree'))
  };
}

function applyData(d) {
  if (!d) return false;
  state = Object.assign(state, d.state||{});
  document.getElementById('lvlPal').value = state.lvlPal;
  document.getElementById('lvlFig').value = state.lvlFig;
  buildAttrs(); buildSaves(); buildSkills(); buildDeath();
  if(d.name) document.querySelector('h1.name .edit').innerHTML = d.name;
  if(d.sub){const s=document.querySelectorAll('.subtitle .edit');d.sub.forEach((v,i)=>{if(s[i])s[i].innerHTML=v;});}
  const ed = document.querySelectorAll('#v-base .statline .v.edit');
  if(d.idName&&ed[0]) ed[0].innerHTML=d.idName;
  if(d.race&&ed[1])   ed[1].innerHTML=d.race;
  if(d.ca&&ed[2])     ed[2].innerHTML=d.ca;
  if(d.speed) document.getElementById('speedInput').textContent=d.speed;
  if(d.xp)   document.getElementById('xp').value=d.xp;
  if(d.insp) document.getElementById('insp').value=d.insp;
  if(d.hptmp) document.getElementById('hptmp').value=d.hptmp;
  document.getElementById('atkList').innerHTML='';
  (d.atks||[]).forEach(a=>document.getElementById('atkList').appendChild(makeAttack(...a)));
  document.getElementById('comboList').innerHTML='';
  (d.combos||[]).forEach(c=>document.getElementById('comboList').appendChild(makeCombo(c[0],c[1])));
  rebuild('bonusList',d.bonus,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('cabilList',d.cabil,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('classList',d.classL,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('raceList',d.race_,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('invList',d.inv,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('spell1',d.sp1,o=>makeSpell(o.t,o.d));
  rebuild('spell2',d.sp2,o=>makeSpell(o.t,o.d));
  rebuild('spell3',d.sp3,o=>makeSpell(o.t,o.d));
  if(d.langs){const c=document.getElementById('langChips');c.innerHTML='';d.langs.forEach(l=>{const s=document.createElement('span');s.className='chip';s.innerHTML=`<span class="edit" contenteditable="true">${l}</span><button class="del" onclick="this.parentElement.remove()">✕</button>`;c.appendChild(s);});}
  
  document.getElementById('featList').innerHTML='';
  (d.feats||[]).forEach(f=>{
    const el = makeFeat(f.n, f.s, f.d, f.expanded);
    if(f.expanded===false) el.classList.add('collapsed');
    document.getElementById('featList').appendChild(el);
  });

  document.getElementById('contactList').innerHTML='';
  (d.contacts||[]).forEach(c=>addEntry('contactList',c.t,c.tag,c.d));

  document.getElementById('questList').innerHTML='';
  (d.quests||[]).forEach(q=>addEntry('questList',q.t,q.tag,q.d));

  document.getElementById('locTree').innerHTML='';
  if(d.locTree && d.locTree.length){
    d.locTree.forEach(n=>document.getElementById('locTree').appendChild(makeLocationNode(n.name,n.desc,n.children,n.open)));
  } else if(d.locations && d.locations.length){
    // migração do formato masonry (sem hierarquia)
    d.locations.forEach(l=>document.getElementById('locTree').appendChild(makeLocationNode(l.name,l.desc,[],false)));
  } else if(d.mapNodes && d.mapNodes.length){
    // migração do formato antigo (mapa Ocidente/Oriente com nós fixos)
    d.mapNodes.forEach(n=>document.getElementById('locTree').appendChild(makeLocationNode(n.name,n.desc,[],false)));
  }

  if(d.notes){const n=document.querySelector('#v-base .panel:last-child .desc.edit');if(n)n.innerHTML=d.notes;}
  if(d.hpcur){document.getElementById('hpcur').value=d.hpcur;}
  if(d.lohcur){document.getElementById('lohcur').value=d.lohcur;}
  setBg(state.bg||DEFAULT_BG);
  return true;
}

function rebuild(id,arr,fn){if(!arr)return;const c=document.getElementById(id);c.innerHTML='';arr.forEach(o=>c.appendChild(fn(o)));}

// ─── SAVE ────────────────────────────────────────────────────────────────────
let _saveTimer = null;
function saveSheet(immediate=false) {
  const data = collect();
  // sempre persiste no localStorage como fallback offline
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch(e){}

  if (immediate) { _pushToSupabase(data); return; }
  clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => _pushToSupabase(data), 1200);
}

async function _pushToSupabase(data) {
  flash('Salvando…', false);
  try {
    const res = await fetch(`${SB_URL}/rest/v1/character_sheets`, {
      method: 'POST',
      headers: {
        'apikey': SB_KEY,
        'Authorization': `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates,return=minimal'
      },
      body: JSON.stringify({ sheet_id: SHEET_ID, data, updated_at: new Date().toISOString() })
    });
    if (!res.ok) throw new Error(await res.text());
    flash('Salvo ✓');
  } catch(e) {
    flash('⚠ Erro ao salvar');
    console.error('[SB] Erro:', e.message || e);
  }
}

// ─── LOAD ────────────────────────────────────────────────────────────────────
async function loadSheet() {
  // 1. tenta Supabase
  try {
    const rows = await sbFetch(`character_sheets?sheet_id=eq.${SHEET_ID}&select=data&limit=1`);
    if (rows && rows.length > 0 && rows[0].data) {
      applyData(rows[0].data);
      // sincroniza localStorage com o que veio do servidor
      try { localStorage.setItem(KEY, JSON.stringify(rows[0].data)); } catch(e){}
      return true;
    }
  } catch(e) {
    console.warn('Supabase offline, usando localStorage:', e);
  }

  // 2. fallback: localStorage
  try {
    const d = JSON.parse(localStorage.getItem(KEY)||'null');
    if (d) { applyData(d); return true; }
  } catch(e) {}

  return false;
}

function resetSheet(){
  if(confirm('Restaurar a ficha original? Edições salvas serão perdidas.')){
    localStorage.removeItem(KEY);
    // apaga também no Supabase
    sbFetch(`character_sheets?sheet_id=eq.${SHEET_ID}`, { method:'DELETE' }).catch(()=>{});
    location.reload();
  }
}

function flash(m, fade=true) {
  const x = document.getElementById('savedmsg');
  x.textContent = m;
  if (fade) setTimeout(()=>x.textContent='', 2500);
}

document.getElementById('lvlPal').addEventListener('input',e=>{state.lvlPal=parseInt(e.target.value)||0;recalc();});
document.getElementById('lvlFig').addEventListener('input',e=>{state.lvlFig=parseInt(e.target.value)||0;recalc();});
document.addEventListener('blur',e=>{if(e.target.closest&&e.target.closest('.sheet')&&!e.target.closest('#v-bag'))saveSheet();},true);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();saveSheet(true);}});

// ─── BAG OF HOLDING (compartilhada, edição travada por PIN, sincroniza sozinha) ──
const BAG_PIN = '1517';
const BAG_SHEET_ID = 'bag-of-holding-shared';
const BAG_UNLOCK_KEY = 'bag_unlocked_v1';
let bagUnlocked = localStorage.getItem(BAG_UNLOCK_KEY) === '1';
let bagUpdatedAt = null;
let bagPollTimer = null;

function makeBagItem(t,tag,d){
  const e=document.createElement('div');e.className='entry';
  e.innerHTML=`<div class="title"><span class="edit" contenteditable="true">${t||''}</span>${tag?`<span class="tag edit" contenteditable="true">${tag}</span>`:''}</div><div class="desc edit" contenteditable="true">${d||''}</div><button class="del" onclick="removeBagItem(this)">✕</button>`;
  return e;
}
function addBagItem(){
  if(!bagUnlocked) return;
  const l=document.getElementById('bagList');
  const item=makeBagItem('Novo Item','','Descrição....');
  l.appendChild(item);
  item.querySelector('.edit').focus();
  saveBagSheet(true);
}
function removeBagItem(btn){
  if(!bagUnlocked) return;
  btn.closest('.entry').remove();
  saveBagSheet(true);
}
function renderBagItems(items){
  const l=document.getElementById('bagList');
  l.innerHTML='';
  (items||[]).forEach(o=>l.appendChild(makeBagItem(o.t,o.tag,o.d)));
}
function collectBagItems(){
  return [...document.getElementById('bagList').children].map(e=>({
    t:e.querySelector('.title .edit')?.innerHTML||'',
    tag:e.querySelector('.tag')?.innerHTML||'',
    d:e.querySelector('.desc')?.innerHTML||''
  }));
}

function updateBagLockUI(){
  const panel=document.getElementById('bagPanel');
  const status=document.getElementById('bagStatus');
  const btn=document.getElementById('bagLockBtn');
  panel.classList.toggle('unlocked',bagUnlocked);
  status.textContent = bagUnlocked ? '🔓 Modo edição' : '🔒 Somente visualização';
  btn.textContent = bagUnlocked ? 'Travar edição' : 'Destravar edição';
}
function toggleBagLock(){
  if(bagUnlocked){
    bagUnlocked=false;
    localStorage.removeItem(BAG_UNLOCK_KEY);
    updateBagLockUI();
    return;
  }
  const pin=prompt('PIN de edição da Bag of Holding:');
  if(pin===null) return;
  if(pin===BAG_PIN){
    bagUnlocked=true;
    localStorage.setItem(BAG_UNLOCK_KEY,'1');
    updateBagLockUI();
  } else {
    alert('PIN incorreto.');
  }
}

let _bagSaveTimer=null;
function saveBagSheet(immediate=false){
  if(!bagUnlocked) return;
  const items=collectBagItems();
  if(immediate){ _pushBag(items); return; }
  clearTimeout(_bagSaveTimer);
  _bagSaveTimer=setTimeout(()=>_pushBag(items),1000);
}
async function _pushBag(items){
  try{
    const now=new Date().toISOString();
    const res=await fetch(`${SB_URL}/rest/v1/character_sheets`,{
      method:'POST',
      headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({sheet_id:BAG_SHEET_ID,data:{items},updated_at:now})
    });
    if(!res.ok) throw new Error(await res.text());
    bagUpdatedAt=now;
  }catch(e){ console.error('[Bag] erro ao salvar', e.message||e); }
}
async function loadBag(){
  try{
    const rows=await sbFetch(`character_sheets?sheet_id=eq.${BAG_SHEET_ID}&select=data,updated_at&limit=1`);
    if(rows && rows.length>0){
      renderBagItems(rows[0].data?.items||[]);
      bagUpdatedAt=rows[0].updated_at;
    }
  }catch(e){ console.warn('[Bag] offline ao carregar', e); }
}
async function pollBag(){
  // não atualiza se alguém estiver digitando dentro da bag agora
  if(document.activeElement && document.activeElement.closest && document.activeElement.closest('#bagList')) return;
  try{
    const rows=await sbFetch(`character_sheets?sheet_id=eq.${BAG_SHEET_ID}&select=data,updated_at&limit=1`);
    if(rows && rows.length>0 && rows[0].updated_at!==bagUpdatedAt){
      bagUpdatedAt=rows[0].updated_at;
      renderBagItems(rows[0].data?.items||[]);
    }
  }catch(e){ /* silencioso, tenta de novo no próximo ciclo */ }
}
function initBag(){
  updateBagLockUI();
  loadBag();
  bagPollTimer=setInterval(pollBag,4000);
  document.addEventListener('blur',e=>{if(e.target.closest&&e.target.closest('#bagList'))saveBagSheet();},true);
}

// TALENTOS — accordion editável
const FEATS_DEFAULT = [
  ['War Caster', 'Talento', 'Vantagem em saves de Constituição para manter concentração. Pode conjurar magias como ataque de oportunidade. Permite somatic components com mãos ocupadas.'],
  ['Polearm Master', 'Talento', 'Ataque bônus com a extremidade da arma (1d4 + mod. Força, dano contundente). Ataques de oportunidade quando inimigo entra no seu alcance.'],
  ['Sentinel', 'Talento', 'Ataques de oportunidade reduzem deslocamento para 0. Pode atacar criaturas que atacam aliados adjacentes. Inimigos que Recuam provocam ataque de oportunidade.'],
];

function makeFeat(name, src, desc, expanded) {
  const item = document.createElement('div');
  item.className = 'feat-item' + (expanded ? ' open' : '');
  item.innerHTML = `
    <div class="feat-header">
      <button class="feat-toggle" onclick="toggleFeat(this)" title="Expandir/recolher">▶</button>
      <span class="feat-name" contenteditable="true" data-empty="Nome do talento">${name}</span>
      <span class="feat-src" contenteditable="true" data-empty="Fonte">${src}</span>
    </div>
    <div class="feat-body" contenteditable="true" data-empty="Descreva o que este talento concede...">${desc}</div>
    <button class="feat-del" onclick="this.closest('.feat-item').remove();saveSheet();" title="Remover">✕</button>
  `;
  return item;
}

function toggleFeat(btn) {
  const item = btn.closest('.feat-item');
  item.classList.toggle('open');
}

function addFeat() {
  const list = document.getElementById('featList');
  const item = makeFeat('Novo Talento', 'Talento', '', true);
  list.appendChild(item);
  // foca no nome automaticamente
  item.querySelector('.feat-name').focus();
  saveSheet();
}

function seedFeats() {
  const list = document.getElementById('featList');
  if (!list || list.children.length > 0) return;
  FEATS_DEFAULT.forEach(f => list.appendChild(makeFeat(...f)));
}

buildAttrs(); buildSaves(); buildSkills(); buildDeath();
(async () => {
  const loaded = await loadSheet();
  if (!loaded) { seedDefaults(); setBg(DEFAULT_BG); }
  seedFeats();
  seedLocations();
  applyLocCollapse();
  initBag();
  recalc();
})();

