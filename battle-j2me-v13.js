/* V1.3 P1: purely visual events, battle.js is the single gameplay authority. */
(()=>{'use strict';
const board=document.getElementById('board'),status=document.getElementById('status');if(!board||!status||typeof MutationObserver==='undefined')return;
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)');let previous=[],previousStatus=status.textContent||'',queued=false;
const snapshot=()=>Array.from(board.children).map(el=>el.textContent);
function label(value){if(reduced?.matches)return;const node=document.createElement('span');node.className='v13-combo-label';node.textContent=value;board.parentElement.append(node);node.addEventListener('animationend',()=>node.remove(),{once:true});setTimeout(()=>node.remove(),900)}
function update(){queued=false;const current=snapshot();if(current.length!==49)return;
 const message=status.textContent||'';const m=message.match(/(\d+) đợt ghép/);
 if(message!==previousStatus&&m&&Number(m[1])>1){board.classList.remove('v13-combo');void board.offsetWidth;board.classList.add('v13-combo');label('COMBO ×'+m[1])}
 previousStatus=message;
 if(previous.length===49&&!reduced?.matches){let changed=0;current.forEach((v,i)=>{if(v!==previous[i]){changed++;board.children[i]?.classList.add('v13-new')}});if(changed>0&&changed<49){setTimeout(()=>{for(const el of board.children)el.classList.remove('v13-new')},280)}}
 previous=current;
}
const observer=new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(update)});
observer.observe(board,{childList:true});observer.observe(status,{childList:true,characterData:true,subtree:true});update();
})();
