/* V1.0 Phase 2: presentation-only effects; battle.js remains authoritative. */
(()=>{'use strict';
const board=document.getElementById('board'),status=document.getElementById('status'),result=document.getElementById('result');
if(!board||!status||!result)return;
const layer=document.createElement('div');layer.className='battle-fx-layer';layer.setAttribute('aria-hidden','true');document.body.append(layer);
const hp=document.getElementById('etxt'),php=document.getElementById('ptxt'),shield=document.getElementById('shieldtxt');
let lastEnemy=null,lastHero=null,lastShield=null,lastStatus='',lastResult=false;
const number=s=>{const m=String(s||'').match(/\d+/);return m?Number(m[0]):null};
const motion=window.matchMedia('(prefers-reduced-motion: reduce)');const reduced=()=>motion.matches;
function float(text,anchor,kind){if(reduced()||!anchor)return;const rect=anchor.getBoundingClientRect();if(!rect.width)return;const el=document.createElement('span');el.className='battle-float '+kind;el.textContent=text;el.style.left=Math.max(10,Math.min(window.innerWidth-90,rect.left+rect.width/2))+'px';el.style.top=Math.max(20,rect.top+rect.height/2)+'px';layer.append(el);el.addEventListener('animationend',()=>el.remove(),{once:true});setTimeout(()=>el.remove(),1200)}
function pulse(el,cls){if(reduced()||!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),650)}
function check(){
const enemy=number(hp?.textContent),hero=number(php?.textContent),guard=number(shield?.textContent);
if(lastEnemy!==null&&enemy!==null&&enemy<lastEnemy){float('−'+(lastEnemy-enemy),document.querySelector('.fighter.enemy'),'damage');pulse(document.querySelector('.fighter.enemy'),'battle-hit')}
if(lastHero!==null&&hero!==null&&hero<lastHero){float('−'+(lastHero-hero),document.querySelector('.fighter.player'),'damage');pulse(document.querySelector('.fighter.player'),'battle-hit')}
if(lastHero!==null&&hero!==null&&hero>lastHero)float('+'+(hero-lastHero),document.querySelector('.fighter.player'),'heal');
if(lastShield!==null&&guard!==null&&guard>lastShield)float('🛡️ +'+(guard-lastShield),document.querySelector('.fighter.player'),'shield');
lastEnemy=enemy;lastHero=hero;lastShield=guard;
const current=status.textContent||'';
if(current!==lastStatus){lastStatus=current;const m=current.match(/(\d+) đợt ghép/);if(m&&Number(m[1])>1){pulse(board,'battle-combo');float('COMBO ×'+m[1],board,'combo')}}
const visible=!result.classList.contains('hidden');
if(visible&&!lastResult){const title=document.getElementById('result-title');const win=(title?.textContent||'').includes('Chiến thắng');result.querySelector('.dialog')?.classList.add(win?'battle-victory':'battle-defeat');}
if(!visible)result.querySelector('.dialog')?.classList.remove('battle-victory','battle-defeat');
lastResult=visible;
}
const observer=new MutationObserver(()=>{if(!pending){pending=true;requestAnimationFrame(()=>{pending=false;check()})}});let pending=false;
[hp,php,shield,status,result].filter(Boolean).forEach(el=>observer.observe(el,{subtree:true,childList:true,characterData:true,attributes:el===result,attributeFilter:el===result?['class']:undefined}));
check();
})();