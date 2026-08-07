
// TABS (delegado em document, funciona mesmo se a árvore de tabs for recriada)
document.addEventListener('click', e=>{
  const t = e.target.closest('.tab');
  if(!t) return;
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.view').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');
  const view = document.getElementById('v-'+t.dataset.v);
  if(view) view.classList.add('active');
});

// BOTÃO GAMER 🎮 (interruptor: off = normal, on = tudo RGB)
const GAMER_KEY='varakos_gamer_mode';
function toggleGamerMode(){
  const sheet=document.querySelector('.sheet');
  const gbtn=document.getElementById('gamerBtn');
  if(!sheet||!gbtn) return;
  const on=sheet.classList.toggle('gamer-mode');
  gbtn.classList.toggle('on',on);
  try{ localStorage.setItem(GAMER_KEY, on?'1':'0'); }catch(e){}
}
try{
  if(localStorage.getItem(GAMER_KEY)==='1'){
    const sheet=document.querySelector('.sheet');
    const gbtn=document.getElementById('gamerBtn');
    if(sheet) sheet.classList.add('gamer-mode');
    if(gbtn) gbtn.classList.add('on');
  }
}catch(e){}

const KEY='varakos_sheet_v1';
const DEFAULT_BG='https://teacherana.com.br/wp-content/uploads/teste/assets/varakos.png';

// BG
function setBg(url){document.getElementById('bgArt').style.backgroundImage=url?`url(${url})`:'none';state.bg=url||null;}
function restoreDefaultBg(){setBg(DEFAULT_BG);saveSheet();}
document.getElementById('bgInput').addEventListener('change',e=>{
  const f=e.target.files[0];if(!f)return;
  const r=new FileReader();r.onload=ev=>{setBg(ev.target.result);saveSheet();};r.readAsDataURL(f);
});

const ATTRS=[['for','Força'],['des','Destreza'],['con','Constituição'],['int','Inteligência'],['sab','Sabedoria'],['car','Carisma']];
const SKILLS=[['Acrobacia','des'],['Arcanismo','int'],['Atletismo','for'],['Atuação','car'],['Enganação','car'],['Furtividade','des'],['História','int'],['Intimidação','car'],['Intuição','sab'],['Investigação','int'],['Lidar c/ Animais','sab'],['Medicina','sab'],['Natureza','int'],['Percepção','sab'],['Persuasão','car'],['Prestidigitação','des'],['Religião','int'],['Sobrevivência','sab']];
const DEF_SCORES={for:13,des:13,con:16,int:14,sab:18,car:20};
const DEF_SAVEPROF={sab:true,car:true};
const DEF_SKILLPROF={'Arcanismo':1,'Persuasão':1,'Intuição':1,'Percepção':1};

let state={scores:{...DEF_SCORES},saveProf:{...DEF_SAVEPROF},skillProf:{...DEF_SKILLPROF},lvlBrx:5,deathS:0,deathF:0,bg:null};

function mod(s){return Math.floor((s-10)/2);}
function fmt(n){return (n>=0?'+':'')+n;}
function profBonus(t){return Math.ceil(t/4)+1;}
function esc(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function cssId(s){return s.replace(/[^a-zA-Z0-9]/g,'_');}
function calcMaxHP(){const t=state.lvlBrx;return 8+(t-1)*5 + mod(state.scores.con)*t;}

function pactSlots(l){
  const T={1:[1,1],2:[1,2],3:[2,2],4:[2,2],5:[2,3],6:[2,3],7:[2,4],8:[2,4],9:[2,5],10:[2,5],11:[3,5],12:[3,5],13:[3,5],14:[3,5],15:[3,5],16:[3,5],17:[4,5],18:[4,5],19:[4,5],20:[4,5]};
  const r=T[Math.min(l,20)]||[1,1];return {count:r[0],level:r[1]};
}

function updateSpeed(){
  const m=parseFloat((document.getElementById('speedInput').textContent||'').replace(',','.'))||0;
  const sq=Math.round(m/1.5);
  document.getElementById('speedVal').textContent=m+' m ('+sq+' quadrados)';
  document.getElementById('sumSpeed').textContent=m+' m';
}

function recalc(){
  const brx=state.lvlBrx;
  document.getElementById('idNivel').textContent=brx;
  document.getElementById('idClasse').textContent='Bruxo / Corruptor '+brx;
  const pb=profBonus(brx);
  document.getElementById('profVal').textContent=fmt(pb);

  ATTRS.forEach(([k])=>{const e=document.getElementById('mod_'+k);if(e)e.textContent=fmt(mod(state.scores[k]));});
  document.getElementById('initVal').textContent=fmt(mod(state.scores.des));

  ATTRS.forEach(([k])=>{
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

  const ps=pactSlots(brx);
  document.getElementById('pactSlotCount').textContent=ps.count+' espaço(s)';
  document.getElementById('pactSlotLvl').textContent=ps.level+'º círculo';
  document.getElementById('pactmax').textContent=ps.count;
  updatePactBar();

  document.getElementById('sumCA').textContent=document.querySelectorAll('#v-base .statline .v.edit')[0]?.textContent||'12';
  document.getElementById('sumInit').textContent=fmt(mod(state.scores.des));
  document.getElementById('sumHP').textContent=document.getElementById('hpcur').value+' / '+maxhp;
  document.getElementById('foot').textContent='Varakos (Kos) · Nível '+brx+' · Corruptor';
  updateSpeed();
}

function updateHPbar(){
  const c=parseInt(document.getElementById('hpcur').value)||0;
  const m=parseInt(document.getElementById('hpmax').textContent)||1;
  document.getElementById('hpfill').style.width=Math.max(0,Math.min(100,(c/m)*100))+'%';
  const sm=document.getElementById('sumHP');if(sm)sm.textContent=c+' / '+m;
}
function updatePactBar(){
  const c=parseInt(document.getElementById('pactcur').value)||0;
  const m=parseInt(document.getElementById('pactmax').textContent)||1;
  document.getElementById('pactfill').style.width=Math.max(0,Math.min(100,(c/m)*100))+'%';
}
document.getElementById('hpcur').addEventListener('input',()=>{document.getElementById('hpcur').dataset.synced='1';updateHPbar();});
document.getElementById('pactcur').addEventListener('input',()=>{updatePactBar();saveSheet();});

function buildAttrs(){
  const g=document.getElementById('attrGrid');g.innerHTML='';
  ATTRS.forEach(([k,label])=>{
    const d=document.createElement('div');d.className='attr';
    d.innerHTML=`<div class="lbl">${label}</div><input class="score" type="number" id="sc_${k}" value="${state.scores[k]}" min="1" max="30"><div class="mod" id="mod_${k}">${fmt(mod(state.scores[k]))}</div>`;
    d.querySelector('input').addEventListener('input',e=>{state.scores[k]=parseInt(e.target.value)||10;recalc();saveSheet();});
    g.appendChild(d);
  });
}

function buildSaves(){
  const c=document.getElementById('savesList');c.innerHTML='';
  ATTRS.forEach(([k,label])=>{
    const pb=profBonus(state.lvlBrx),m=mod(state.scores[k]),tot=m+(state.saveProf[k]?pb:0);
    const r=document.createElement('div');
    r.className='statline skill-row'+(state.saveProf[k]?' prof':'');r.id='saverow_'+k;
    r.innerHTML=`<span class="k"><span class="dot"></span>${label}</span><span class="v" id="save_${k}">${fmt(tot)}</span>`;
    r.addEventListener('click',()=>{state.saveProf[k]=!state.saveProf[k];recalc();saveSheet();});
    c.appendChild(r);
  });
}

function buildSkills(){
  const c=document.getElementById('skillsList');c.innerHTML='';
  const pb=profBonus(state.lvlBrx);
  SKILLS.forEach(([name,ab])=>{
    const lvl=state.skillProf[name]||0,m=mod(state.scores[ab]),tot=m+(lvl===1?pb:lvl===2?pb*2:0);
    const r=document.createElement('div');
    r.className='statline skill-row'+(lvl===1?' prof':lvl===2?' expert':'');r.id='skr_'+cssId(name);
    r.innerHTML=`<span class="k"><span class="dot"></span>${name} <small style="color:var(--ash-dim)">(${ab})</small></span><span class="v" id="skv_${cssId(name)}">${fmt(tot)}</span>`;
    r.addEventListener('click',()=>{const c=(state.skillProf[name]||0);state.skillProf[name]=(c+1)%3;recalc();saveSheet();});
    c.appendChild(r);
  });
}

function buildDeath(){
  ['deathS','deathF'].forEach(id=>{
    const c=document.getElementById(id);c.innerHTML='';
    for(let i=0;i<3;i++){
      const p=document.createElement('div');
      const type=id==='deathS'?'succ':'fail';
      const on=id==='deathS'?i<state.deathS:i<state.deathF;
      p.className='pip'+(on?' on '+type:'');
      p.addEventListener('click',()=>{
        if(id==='deathS')state.deathS=(state.deathS===i+1?i:i+1);
        else state.deathF=(state.deathF===i+1?i:i+1);
        buildDeath();saveSheet();
      });
      c.appendChild(p);
    }
  });
}

// entries
function makeEntry(t,tag,d){
  const e=document.createElement('div');e.className='entry';
  e.innerHTML=`<div class="title"><span class="edit" contenteditable="true">${t||''}</span><span class="tag edit" contenteditable="true">${tag||''}</span></div><div class="desc edit" contenteditable="true" data-empty="Descrição...">${d||''}</div><button class="del" onclick="this.closest('.entry').remove();saveSheet();">✕</button>`;
  return e;
}
function makeSpell(t,d){
  const e=document.createElement('div');e.className='entry';
  e.innerHTML=`<div class="title"><span class="edit" contenteditable="true">${t||''}</span></div><div class="desc edit" contenteditable="true" data-empty="Efeito da magia...">${d||''}</div><button class="del" onclick="this.closest('.entry').remove();saveSheet();">✕</button>`;
  return e;
}
function addEntry(id,t,tag,d){const l=document.getElementById(id);l.appendChild(makeEntry(t,tag,d));l.lastChild.querySelector('.edit').focus();saveSheet();}
function addSpell(){
  document.getElementById('spell1').appendChild(makeSpell('Nova Magia',''));
  document.getElementById('spell1').lastChild.querySelector('.edit').focus();
  saveSheet();
}

// ataques
function makeAttack(nm,bon,dmg){
  const r=document.createElement('div');r.className='atk-row';
  r.innerHTML=`<input class="nm" value="${esc(nm)}" placeholder="Foco Arcano"><input value="${esc(bon)}" placeholder="+5"><input value="${esc(dmg)}" placeholder="1d10+5 arcano"><button class="del" onclick="this.closest('.atk-row').remove();saveSheet();">✕</button>`;
  r.querySelectorAll('input').forEach(i=>i.addEventListener('input',()=>saveSheet()));
  return r;
}
function addAttack(){document.getElementById('atkList').appendChild(makeAttack('','',''));saveSheet();}

// combos
function makeCombo(nm,seq){
  const c=document.createElement('div');c.className='combo';
  c.innerHTML=`<div class="cname edit" contenteditable="true" data-empty="Nome do combo">${nm||''}</div><div class="cseq edit" contenteditable="true" data-empty="Sequência de ações...">${seq||''}</div><button class="del" style="position:absolute;top:8px;right:8px;background:transparent;border:none;color:var(--ash-dim);cursor:pointer;opacity:0;font-size:.88rem;transition:.15s" onclick="this.closest('.combo').remove();saveSheet();">✕</button>`;
  c.style.position='relative';
  c.addEventListener('mouseover',()=>c.querySelector('.del').style.opacity='1');
  c.addEventListener('mouseout',()=>c.querySelector('.del').style.opacity='0');
  return c;
}
function addCombo(){document.getElementById('comboList').appendChild(makeCombo('Novo Combo',''));saveSheet();}

// chips
function addChip(id,placeholder){
  const c=document.getElementById(id);
  const s=document.createElement('span');s.className='chip';
  s.innerHTML=`<span class="edit" contenteditable="true">${placeholder}</span><button class="del" onclick="this.parentElement.remove();saveSheet();">✕</button>`;
  c.appendChild(s);s.querySelector('.edit').focus();saveSheet();
}

// TALENTOS
const FEATS_DEFAULT=[
  ['Rajada de Veneno','Yuan-Ti','Como ação bônus, você pode forçar uma criatura que você acertou neste turno a fazer um save de Constituição (CD Magia). Falha: 2d10 de veneno.'],
  ['Sugestão','Yuan-Ti','1× por dia, como magia Sugestão (CD Magia) sem gastar espaço de magia.'],
  ['Armadura de Sombra','Invocação','Sua CA se torna 13 + mod. Des enquanto não usa armadura.'],
  ['Armadura Arcana a Vontade','Invocação','Você pode conjurar Armor of Agathys sem gastar espaço de magia uma vez por descanso longo.'],
  ['Explosão Agonizante','Invocação','Adicione o mod. de Carisma ao dano da Rajada Mística.'],
  ['Livro dos Segredos Antigos','Invocação','Acesso a 2 rituais de nível 1 que podem ser conjurados como rituais.'],
];

function makeFeat(name,src,desc,expanded){
  const item=document.createElement('div');
  item.className='feat-item'+(expanded?' open':'');
  item.innerHTML=`<div class="feat-header"><button class="feat-toggle" onclick="toggleFeat(this)" title="Expandir/recolher">▶</button><span class="feat-name" contenteditable="true" data-empty="Nome do talento">${esc(name)}</span><span class="feat-src" contenteditable="true" data-empty="Fonte">${esc(src)}</span></div><div class="feat-body" contenteditable="true" data-empty="Descreva o que este talento concede...">${esc(desc)}</div><button class="feat-del" onclick="this.closest('.feat-item').remove();saveSheet();" title="Remover">✕</button>`;
  return item;
}
function toggleFeat(btn){btn.closest('.feat-item').classList.toggle('open');}
function addFeat(){const l=document.getElementById('featList');const item=makeFeat('Novo Talento','','',true);l.appendChild(item);item.querySelector('.feat-name').focus();saveSheet();}
function seedFeats(){const l=document.getElementById('featList');if(!l||l.children.length>0)return;FEATS_DEFAULT.forEach(f=>l.appendChild(makeFeat(...f)));}

// SEED DEFAULTS
function seedDefaults(){
  addEntry('raceList','Visão no Escuro','Yuan-Ti','18 metros (6 quadrados). Você enxerga em escuridão como se fosse luz difusa.');
  addEntry('raceList','Amizade Animal — Cobras','Yuan-Ti','Você pode se comunicar com cobras e elas não atacam você por instinto.');
  addEntry('raceList','Resistência Mágica','Yuan-Ti','Vantagem em saves contra magias e outros efeitos mágicos.');
  addEntry('raceList','Imune a Veneno','Yuan-Ti','Você é imune ao dano de veneno e à condição envenenado.');
  addEntry('raceList','Olhos em Mim (Antecedente)','Viajante','Bênção do Obscuro: adicione seu nível de bruxo como bônus de VT ao Carisma.');
  addEntry('invList','Armadura de couro','Item','CA base 11 + Des.');
  addEntry('invList','2 Adagas','Item','1d4 + Des. Corpo a corpo ou arremesso (6/18 m).');
  addEntry('invList','Foco Arcano','Item','Necessário para conjurar. Bônus de ataque mágico +3.');
  addEntry('invList','Selo da Linhagem','Item','Objeto ritual ligado ao seu patrono.');
  addEntry('invList','Joia da Terra Natal','Item','Pertence às suas origens como Yuan-Ti.');
  addEntry('invList','15 po','Moeda','Bolsa de ouro padrão.');
  addEntry('classList','Pacto do Tomo — Corruptor','Classe','Você possui um Livro das Sombras. Ganhe 3 truques adicionais de qualquer lista.');
  addEntry('classList','Benção do Escuro (Bênção)','Classe','Quando você reduz um inimigo a 0 PV, ganhe PVs temporários iguais a Car + nível de bruxo.');
  addEntry('classList','Forma Sinistra','Classe','Você pode gastar um espaço de Pacto para transformar-se. Consulte o livro do patrono.');
  addEntry('invocList','Armadura de Sombra','Invocação','CA 13 + mod. Des enquanto sem armadura. Calculada automaticamente se não usar escudo.');
  addEntry('invocList','Armadura Arcana a Vontade','Invocação','Conjure Armor of Agathys 1× por descanso longo, sem gastar espaço.');
  addEntry('invocList','Explosão Agonizante','Invocação','Adicione mod. de Carisma ao dano de cada raio da Rajada Mística.');
  addEntry('invocList','Livro dos Segredos Antigos','Invocação','2 rituais de qualquer lista (nv 1). Atualize conforme aprende mais.');
  document.getElementById('atkList').appendChild(makeAttack('Foco Arcano','+8','1d10+5 arcano'));
  // spell0 = truques
  document.getElementById('spell0').appendChild(makeSpell('Rajada Mística','1d10 de dano arcano por raio. Ataque mágico à distância (36 m). Padrão: 1 raio; +1 por nível.'));
  document.getElementById('spell0').appendChild(makeSpell('Magia das Trevas','Cria escuridão mágica num raio de 4,5 m. Criaturas sem vis. no escuro ficam cegas. Concentração, 10 min.'));
  document.getElementById('spell0').appendChild(makeSpell('Ilusão Menor','Cria um som ou imagem ilusória de objeto em área de até 1,5 m. Concentração, 1 min.'));
  // spell1 = magias de pacto
  document.getElementById('spell1').appendChild(makeSpell('Armadura de Agathys','PVs temporários + dano frio para atacantes corpo a corpo. Escalonável com o nível do espaço.'));
  document.getElementById('spell1').appendChild(makeSpell('Sugestão','Planta uma ação razoável na mente de uma criatura (save Car). Concentração, 8 h.'));
  document.getElementById('spell1').appendChild(makeSpell('Hipnotismo','Criatura com menos PV fica hipnotizada. Atk com vantagem contra ela.'));
  // spellR = rituais
  document.getElementById('spellR').appendChild(makeSpell('Compreender Idiomas (ritual)','Entende qualquer idioma falado ou escrito por 1 hora. Sem save.'));
  document.getElementById('spellR').appendChild(makeSpell('Identificar (ritual)','Determina propriedades mágicas de um objeto ou efeito. Toque.'));
}

// ─── SUPABASE CONFIG ────────────────────────────────────────
const SB_URL  = 'https://tvxxkvoamgxblaehnlhf.supabase.co';
const SB_KEY  = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR2eHhrdm9hbWd4YmxhZWhubGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzODg5MTEsImV4cCI6MjA5NTk2NDkxMX0.hDEj28pF_4B8B6asQlfEuPcuVy-2u9dXlJrKlOw6API';
const SHEET_ID = 'varakos-kos';

function serial(id){return [...document.getElementById(id).children].map(e=>({t:e.querySelector('.title .edit')?.innerHTML||e.querySelector('.cname')?.innerHTML||'',tag:e.querySelector('.tag')?.innerHTML||'',d:e.querySelector('.desc')?.innerHTML||e.querySelector('.cseq')?.innerHTML||''}));}

function collect(){
  return {state,
    name:document.querySelector('h1.name .edit').innerHTML,
    sub:[...document.querySelectorAll('.subtitle .edit')].map(e=>e.innerHTML),
    caEdit:document.querySelectorAll('#v-base .statline .v.edit')[0]?.innerHTML||'12',
    race:document.querySelectorAll('#v-base .statline .v.edit')[1]?.innerHTML||'Yuan-Ti',
    ant:document.querySelectorAll('#v-base .statline .v.edit')[2]?.innerHTML||'Viajante Distante',
    ali:document.querySelectorAll('#v-base .statline .v.edit')[3]?.innerHTML||'Neutro',
    speed:document.getElementById('speedInput').textContent,
    xp:document.getElementById('xp').value,insp:document.getElementById('insp').value,
    hpcur:document.getElementById('hpcur').value,hptmp:document.getElementById('hptmp').value,
    pactcur:document.getElementById('pactcur').value,
    atks:[...document.querySelectorAll('#atkList .atk-row')].map(r=>[...r.querySelectorAll('input')].map(i=>i.value)),
    combos:[...document.querySelectorAll('#comboList .combo')].map(c=>[c.querySelector('.cname').innerHTML,c.querySelector('.cseq').innerHTML]),
    bonus:serial('bonusList'),cabil:serial('cabilList'),classL:serial('classList'),
    invoc:serial('invocList'),race_:serial('raceList'),inv:serial('invList'),
    sp0:serial('spell0'),sp1:serial('spell1'),spR:serial('spellR'),
    langs:[...document.querySelectorAll('#langChips .edit')].map(e=>e.innerHTML),
    notes:document.querySelector('#v-base .panel:last-child .desc.edit')?.innerHTML||'',
    lore:document.getElementById('loreNotes')?.innerHTML||'',
    feats:[...document.querySelectorAll('#featList .feat-item')].map(item=>({
      n:item.querySelector('.feat-name')?.innerHTML||'',
      s:item.querySelector('.feat-src')?.innerHTML||'',
      d:item.querySelector('.feat-body')?.innerHTML||'',
      open:item.classList.contains('open')
    }))
  };
}

function applyData(d){
  if(!d)return false;
  state=Object.assign(state,d.state||{});
  document.getElementById('lvlBrx').value=state.lvlBrx;
  buildAttrs();buildSaves();buildSkills();buildDeath();
  if(d.name)document.querySelector('h1.name .edit').innerHTML=d.name;
  if(d.sub){const s=document.querySelectorAll('.subtitle .edit');d.sub.forEach((v,i)=>{if(s[i])s[i].innerHTML=v;});}
  const ed=document.querySelectorAll('#v-base .statline .v.edit');
  if(d.caEdit&&ed[0])ed[0].innerHTML=d.caEdit;
  if(d.race&&ed[1])ed[1].innerHTML=d.race;
  if(d.ant&&ed[2])ed[2].innerHTML=d.ant;
  if(d.ali&&ed[3])ed[3].innerHTML=d.ali;
  if(d.speed)document.getElementById('speedInput').textContent=d.speed;
  if(d.xp)document.getElementById('xp').value=d.xp;
  if(d.insp)document.getElementById('insp').value=d.insp;
  if(d.hptmp)document.getElementById('hptmp').value=d.hptmp;
  if(d.pactcur){document.getElementById('pactcur').value=d.pactcur;}
  document.getElementById('atkList').innerHTML='';
  (d.atks||[]).forEach(a=>document.getElementById('atkList').appendChild(makeAttack(...a)));
  document.getElementById('comboList').innerHTML='';
  (d.combos||[]).forEach(c=>document.getElementById('comboList').appendChild(makeCombo(c[0],c[1])));
  function rebuild(id,arr,fn){if(!arr)return;const c=document.getElementById(id);c.innerHTML='';arr.forEach(o=>c.appendChild(fn(o)));}
  rebuild('bonusList',d.bonus,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('cabilList',d.cabil,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('classList',d.classL,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('invocList',d.invoc,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('raceList',d.race_,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('invList',d.inv,o=>makeEntry(o.t,o.tag,o.d));
  rebuild('spell0',d.sp0,o=>makeSpell(o.t,o.d));
  rebuild('spell1',d.sp1,o=>makeSpell(o.t,o.d));
  rebuild('spellR',d.spR,o=>makeSpell(o.t,o.d));
  if(d.langs){const c=document.getElementById('langChips');c.innerHTML='';d.langs.forEach(l=>{const s=document.createElement('span');s.className='chip';s.innerHTML=`<span class="edit" contenteditable="true">${l}</span><button class="del" onclick="this.parentElement.remove();saveSheet();">✕</button>`;c.appendChild(s);});}
  if(d.feats){const fl=document.getElementById('featList');fl.innerHTML='';d.feats.forEach(f=>fl.appendChild(makeFeat(f.n,f.s,f.d,f.open)));}
  if(d.notes){const n=document.querySelector('#v-base .panel:last-child .desc.edit');if(n)n.innerHTML=d.notes;}
  if(d.lore){const l=document.getElementById('loreNotes');if(l)l.innerHTML=d.lore;}
  if(d.hpcur){document.getElementById('hpcur').value=d.hpcur;document.getElementById('hpcur').dataset.synced='1';}
  setBg(d.state?.bg||DEFAULT_BG);
  return true;
}

// SAVE / LOAD
let _saveTimer=null;
function saveSheet(immediate=false){
  const data=collect();
  try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){}
  if(immediate){_push(data);return;}
  clearTimeout(_saveTimer);
  _saveTimer=setTimeout(()=>_push(data),1200);
}
async function _push(data){
  flash('Salvando…',false);
  try{
    const res=await fetch(`${SB_URL}/rest/v1/character_sheets`,{
      method:'POST',
      headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`,'Content-Type':'application/json','Prefer':'resolution=merge-duplicates,return=minimal'},
      body:JSON.stringify({sheet_id:SHEET_ID,data,updated_at:new Date().toISOString()})
    });
    if(!res.ok)throw new Error(await res.text());
    flash('Salvo ✓');
  }catch(e){flash('⚠ Erro ao salvar');console.error('[SB]',e.message||e);}
}
async function loadSheet(){
  try{
    const rows=await (await fetch(`${SB_URL}/rest/v1/character_sheets?sheet_id=eq.${SHEET_ID}&select=data&limit=1`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}})).json();
    if(rows&&rows.length>0&&rows[0].data){applyData(rows[0].data);try{localStorage.setItem(KEY,JSON.stringify(rows[0].data));}catch(e){}return true;}
  }catch(e){console.warn('SB offline, usando localStorage');}
  try{const d=JSON.parse(localStorage.getItem(KEY)||'null');if(d){applyData(d);return true;}}catch(e){}
  return false;
}
function resetSheet(){if(confirm('Restaurar a ficha original?')){localStorage.removeItem(KEY);fetch(`${SB_URL}/rest/v1/character_sheets?sheet_id=eq.${SHEET_ID}`,{method:'DELETE',headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}}).catch(()=>{});location.reload();}}
function flash(m,fade=true){const x=document.getElementById('savedmsg');x.textContent=m;if(fade)setTimeout(()=>x.textContent='',2500);}

document.getElementById('lvlBrx').addEventListener('input',e=>{state.lvlBrx=parseInt(e.target.value)||0;recalc();});
document.addEventListener('blur',e=>{if(e.target.closest&&e.target.closest('.sheet')&&!e.target.closest('#v-bag'))saveSheet();},true);
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='s'){e.preventDefault();saveSheet(true);}});

// ─── BAG OF HOLDING (compartilhada com o Lautrec, edição travada por PIN) ──
const BAG_PIN='1517';
const BAG_SHEET_ID='bag-of-holding-shared';
const BAG_UNLOCK_KEY='bag_unlocked_v1';
let bagUnlocked=localStorage.getItem(BAG_UNLOCK_KEY)==='1';
let bagUpdatedAt=null;

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
  status.textContent=bagUnlocked?'🔓 Modo edição':'🔒 Somente visualização';
  btn.textContent=bagUnlocked?'Travar edição':'Destravar edição';
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
  if(immediate){_pushBag(items);return;}
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
  }catch(e){console.error('[Bag] erro ao salvar',e.message||e);}
}
async function loadBag(){
  try{
    const rows=await(await fetch(`${SB_URL}/rest/v1/character_sheets?sheet_id=eq.${BAG_SHEET_ID}&select=data,updated_at&limit=1`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}})).json();
    if(rows&&rows.length>0){
      renderBagItems(rows[0].data?.items||[]);
      bagUpdatedAt=rows[0].updated_at;
    }
  }catch(e){console.warn('[Bag] offline ao carregar',e);}
}
async function pollBag(){
  if(document.activeElement&&document.activeElement.closest&&document.activeElement.closest('#bagList')) return;
  try{
    const rows=await(await fetch(`${SB_URL}/rest/v1/character_sheets?sheet_id=eq.${BAG_SHEET_ID}&select=data,updated_at&limit=1`,{headers:{'apikey':SB_KEY,'Authorization':`Bearer ${SB_KEY}`}})).json();
    if(rows&&rows.length>0&&rows[0].updated_at!==bagUpdatedAt){
      bagUpdatedAt=rows[0].updated_at;
      renderBagItems(rows[0].data?.items||[]);
    }
  }catch(e){}
}
function initBag(){
  updateBagLockUI();
  loadBag();
  setInterval(pollBag,4000);
  document.addEventListener('blur',e=>{if(e.target.closest&&e.target.closest('#bagList'))saveBagSheet();},true);
}

(async()=>{
  buildAttrs();buildSaves();buildSkills();buildDeath();
  const loaded=await loadSheet();
  if(!loaded){seedDefaults();setBg(DEFAULT_BG);}
  seedFeats();
  initBag();
  recalc();
})();
