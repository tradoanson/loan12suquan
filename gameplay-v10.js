/* V1.0 gameplay overview: read-only campaign progress + safe city actions. */
(()=>{'use strict';
const CITY='loan12_hoalu_v03',CAMPAIGN='loan12_campaign_v06';
const $=id=>document.getElementById(id);
function read(key){try{return JSON.parse(localStorage.getItem(key))}catch(e){return null}}
function fmt(n){return Math.floor(n).toLocaleString('vi-VN')}
const box=document.createElement('section');box.className='panel gameplay-dashboard';box.setAttribute('aria-label','Tổng quan chiến dịch');
box.innerHTML='<h2>🧭 Chiến dịch nhất thống · V1.0</h2><div id="v10-overview" aria-live="polite"></div><div class="v10-links"><a href="map.html">🗺️ Tiến quân</a><a href="battle.html">⚔️ Luyện trận</a><a href="quests.html">📜 Nhận thưởng</a></div><p class="muted">Tiến trình lưu trên thiết bị này. Hoàn thành nhiệm vụ để nhận tài nguyên nâng cấp thành trì.</p>';
const side=document.querySelector('.side');if(!side)return;side.prepend(box);
function render(){
const city=read(CITY),campaign=read(CAMPAIGN);
const owned=Array.isArray(campaign?.owned)?new Set(campaign.owned):new Set(['hoalu']);
const levels=city?.levels||{};
const lv=Object.values(levels).filter(x=>Number.isFinite(x)).reduce((a,b)=>a+b,0);
const progress=Math.min(100,Math.round(owned.size/13*100));
const root=$('v10-overview');root.replaceChildren();
const stats=document.createElement('div');stats.className='v10-stats';
for(const [name,value] of [['Lãnh thổ',owned.size+'/13'],['Nghĩa quân',fmt(city?.army==null?20:Number(city.army))],['Cấp công trình',lv+'/12']]){
 const item=document.createElement('div');const strong=document.createElement('strong');strong.textContent=value;const label=document.createElement('span');label.textContent=name;item.append(strong,label);stats.append(item);
}
const bar=document.createElement('div');bar.className='v10-progress';bar.setAttribute('role','progressbar');bar.setAttribute('aria-valuenow',String(progress));bar.setAttribute('aria-valuemin','0');bar.setAttribute('aria-valuemax','100');bar.setAttribute('aria-label','Tiến độ thống nhất');const fill=document.createElement('span');fill.style.width=progress+'%';bar.append(fill);
const note=document.createElement('p');note.className='muted';note.textContent=owned.size>=13?'🏆 Thiên hạ quy nhất!':'Đã hoàn thành '+progress+'% chiến dịch. Hãy mở bản đồ để chọn lãnh địa tiếp theo.';
root.append(stats,bar,note);
}
render();window.addEventListener('storage',render);
const watch=['upgrade','train','collect','reset'];for(const id of watch){const el=$(id);if(el)el.addEventListener('click',()=>queueMicrotask(render))}
document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
})();