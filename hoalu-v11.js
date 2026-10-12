/* Hoa Lu V1.1 scene enhancement. No game-state writes. */
(()=>{'use strict';
const scene=document.querySelector('.city'),buildings=document.getElementById('buildings');
if(!scene||!buildings)return;
const hint=document.createElement('div');hint.className='city-hint';hint.setAttribute('aria-live','polite');hint.textContent='Chạm vào công trình để xem và nâng cấp';scene.append(hint);
const names={hall:'Đại điện',barracks:'Doanh trại',forge:'Xưởng binh khí',farm:'Nông điền'};
function update(){
 const active=buildings.querySelector('.building.active');
 for(const b of buildings.querySelectorAll('.building')){
  const img=b.querySelector('img'),src=img?.getAttribute('src')||'';
  const match=src.match(/(hall|barracks|forge|farm)_lv([123])\.png/);
  if(match){b.dataset.level=match[2];b.dataset.building=match[1]}
  b.setAttribute('aria-pressed',String(b===active));
 }
 if(active){const name=names[active.dataset.building]||'Công trình';hint.textContent='🏯 '+name+' · Cấp '+(active.dataset.level||'1')+' · Chạm công trình khác để chọn'}
}
let scheduled=false;
const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;update()})});
observer.observe(buildings,{childList:true});
update();
})();