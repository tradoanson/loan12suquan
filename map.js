(()=>{"use strict";
const CHO='loan12_choices_v08';const KEY='loan12_campaign_v06',CITY='loan12_hoalu_v03',PENDING='loan12_pending_battle_v06';
const $=id=>document.getElementById(id);
let state;try{state=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!state||!Array.isArray(state.owned))state={owned:['hoalu'],events:['Khởi nghĩa tại Hoa Lư bắt đầu.'],rewarded:[]};
const owned=id=>state.owned.includes(id);
let selected=new URLSearchParams(location.search).get('focus')||'bohai';if(!REGIONS.some(r=>r.id===selected))selected='bohai';
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function ready(r){return r.requires.some(owned)}
function canTalk(r){return r.type==='ally'&&ready(r)&&!owned(r.id)}
function say(s){$('feedback').textContent=s}
function log(s){state.events.unshift(s);state.events=state.events.slice(0,15);save()}
function render(){let root=$('map');root.querySelectorAll('.node').forEach(n=>n.remove());
REGIONS.forEach(r=>{let b=document.createElement('button');b.className='node '+(owned(r.id)?'owned':r.type==='ally'?'ally':'')+(!owned(r.id)&&!ready(r)?' locked':'')+(selected===r.id?' selected':'');b.style.left=r.x+'%';b.style.top=r.y+'%';b.innerHTML=`<span>${owned(r.id)?'🏯':r.type==='ally'?'🤝':'⚔️'}</span><strong></strong>`;b.querySelector('strong').textContent=r.name;b.onclick=()=>{selected=r.id;say('');render()};root.append(b)});
const r=REGIONS.find(x=>x.id===selected);$('regionTitle').textContent=r.name;$('details').textContent=`Thủ lĩnh: ${r.leader}. ${owned(r.id)?'Đã quy phục Hoa Lư.':ready(r)?'Đã mở tuyến tiếp cận.':'Chưa có đường tiếp cận; cần kiểm soát lãnh địa liền kề.'} ${r.type==='ally'?'Có thể dùng ngoại giao bằng tài nguyên; chọn hòa giải ở Cốt truyện để giảm chi phí.':''}`;
$('attack').disabled=owned(r.id)||!ready(r);$('diplomacy').disabled=!canTalk(r);
$('summary').textContent=`Đã thống nhất ${state.owned.length}/${REGIONS.length} khu vực (gồm Hoa Lư).`;$('bar').style.width=(100*state.owned.length/REGIONS.length)+'%';$('progressText').textContent=state.owned.length===REGIONS.length?'🏆 Thiên hạ quy nhất! Kết thúc chiến dịch mẫu.':'Chọn vùng đang mở để tiến đánh hoặc chiêu hàng.';$('events').replaceChildren(...state.events.map(e=>{let p=document.createElement('p');p.textContent='• '+e;return p}));
}
$('story').onclick=()=>{location.href='story.html?region='+encodeURIComponent(selected)};
$('attack').onclick=()=>{const r=REGIONS.find(x=>x.id===selected);if(!r||owned(r.id)||!ready(r))return;let token=Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);localStorage.setItem(PENDING,JSON.stringify({id:r.id,token,at:Date.now()}));location.href='battle.html?region='+encodeURIComponent(r.id)+'&token='+encodeURIComponent(token)};
$('diplomacy').onclick=()=>{const r=REGIONS.find(x=>x.id===selected);if(!r||!canTalk(r))return;let city;try{city=JSON.parse(localStorage.getItem(CITY))}catch(e){}let choice={};try{choice=JSON.parse(localStorage.getItem(CHO))||{}}catch(e){}const peace=choice[r.id]==='peace',gold=peace?180:300,wood=peace?60:100;if(!city||city.gold<gold||city.wood<wood){say('Cần '+gold+' vàng và '+wood+' gỗ để đàm phán.');return}city.gold-=gold;city.wood-=wood;localStorage.setItem(CITY,JSON.stringify(city));state.owned.push(r.id);log(`Đã chiêu hàng ${r.leader} tại ${r.name} (${gold} vàng, ${wood} gỗ).`);say('Chiêu hàng thành công!');render()};
$('resetMap').onclick=()=>{if(!confirm('Xóa tiến trình bản đồ? Thành trì và quân đội vẫn được giữ.'))return;state={owned:['hoalu'],events:['Bắt đầu chiến dịch mới tại Hoa Lư.'],rewarded:[]};save();render()};
window.addEventListener('storage',render);render();
})();