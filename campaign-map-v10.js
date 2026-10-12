/* V1.0 phase 3: campaign routes and actionable territory legend.
   Visual-only extension, existing map.js remains authoritative for actions. */
(()=>{'use strict';
const map=document.getElementById('map');if(!map||!Array.isArray(window.REGIONS)&&typeof REGIONS==='undefined')return;
const regions=typeof REGIONS!=='undefined'?REGIONS:window.REGIONS;
const KEY='loan12_campaign_v06';
function ownedSet(){try{const c=JSON.parse(localStorage.getItem(KEY));return new Set(Array.isArray(c?.owned)?c.owned:['hoalu'])}catch(e){return new Set(['hoalu'])}}
const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 100 100');svg.setAttribute('preserveAspectRatio','none');svg.setAttribute('class','campaign-routes');svg.setAttribute('aria-hidden','true');
map.insertBefore(svg,map.firstChild);
const info=document.createElement('div');info.className='campaign-legend';info.innerHTML='<span>🏯 Đã thu phục</span><span>⚔️ Có thể tiến đánh</span><span>🤝 Có thể chiêu hàng</span><span>🔒 Chưa mở</span>';
map.insertAdjacentElement('afterend',info);
const panel=document.createElement('div');panel.className='campaign-next panel';panel.innerHTML='<h2>🧭 Mục tiêu tiếp theo</h2><div id="campaign-next-list"></div>';
const aside=document.querySelector('aside');if(aside)aside.insertBefore(panel,aside.firstChild);
const ns='http://www.w3.org/2000/svg';
function refresh(){
const owned=ownedSet();svg.replaceChildren();
for(const region of regions){for(const dep of region.requires||[]){const source=regions.find(r=>r.id===dep);if(!source)continue;
const line=document.createElementNS(ns,'line');line.setAttribute('x1',source.x);line.setAttribute('y1',source.y);line.setAttribute('x2',region.x);line.setAttribute('y2',region.y);
line.setAttribute('class',owned.has(source.id)?'route-open':'route-locked');svg.append(line);
}}
const nodes=map.querySelectorAll('.node');nodes.forEach((node,i)=>{const r=regions[i];if(!r)return;const isOwned=owned.has(r.id),ready=(r.requires||[]).some(id=>owned.has(id));
node.classList.toggle('campaign-available',!isOwned&&ready);
node.classList.toggle('campaign-inaccessible',!isOwned&&!ready);
node.setAttribute('aria-label',r.name+' — '+(isOwned?'Đã thu phục':ready?'Có thể tiếp cận':'Chưa mở'));
});
const available=regions.filter(r=>!owned.has(r.id)&&(r.requires||[]).some(id=>owned.has(id)));
const list=document.getElementById('campaign-next-list');if(!list)return;list.replaceChildren();
if(!available.length){const p=document.createElement('p');p.textContent=owned.size===regions.length?'🏆 Thiên hạ đã thống nhất!':'Chưa có tuyến tiến quân mới.';list.append(p);return}
available.forEach(r=>{const a=document.createElement('a');a.className='campaign-target';a.href='map.html?focus='+encodeURIComponent(r.id);a.textContent=(r.type==='ally'?'🤝 ':'⚔️ ')+r.name+' · '+r.leader;list.append(a)});
}
map.addEventListener('click',()=>setTimeout(refresh,0));
for(const id of ['diplomacy','resetMap']){const button=document.getElementById(id);if(button)button.addEventListener('click',()=>setTimeout(refresh,0))}
window.addEventListener('storage',refresh);
refresh();
})();