/* V1.0 Phase 5: progression guidance; read-only and backward compatible. */
(()=>{'use strict';
const CAM='loan12_campaign_v06',CITY='loan12_hoalu_v03',CLAIM='loan12_quest_claims_v08';
const read=(key,fallback)=>{try{return JSON.parse(localStorage.getItem(key))??fallback}catch(e){return fallback}};
const root=document.getElementById('progression-v10');if(!root)return;
function render(){
 const campaign=read(CAM,{}),city=read(CITY,{}),claimed=read(CLAIM,[]);
 const owned=new Set(Array.isArray(campaign.owned)?campaign.owned:['hoalu']);
 const claims=new Set(Array.isArray(claimed)?claimed:[]);
 const quests=typeof QUESTS==='undefined'?[]:QUESTS;
 const ready=quests.filter(q=>!claims.has(q[0])&&q[3].every(id=>id==='COUNT7'?owned.size>=7:id==='COUNT13'?owned.size>=13:owned.has(id)));
 const pending=quests.filter(q=>!claims.has(q[0])).length;
 root.replaceChildren();
 const h=document.createElement('h2');h.textContent=owned.size>=13?'🏆 Thiên hạ quy nhất':'🧭 Hành trình thống nhất';root.append(h);
 const p=document.createElement('p');p.textContent='Lãnh thổ: '+owned.size+'/13 · Nhiệm vụ đã nhận: '+claims.size+'/'+quests.length+' · Còn '+pending+' nhiệm vụ chưa nhận thưởng.';root.append(p);
 const meter=document.createElement('progress');meter.max=13;meter.value=Math.min(13,owned.size);meter.setAttribute('aria-label','Tiến độ thống nhất');root.append(meter);
 const notice=document.createElement('p');notice.className='v10-notice';notice.textContent=ready.length?'🎁 Có '+ready.length+' nhiệm vụ đủ điều kiện nhận thưởng!':'Tiếp tục chinh phục lãnh thổ để mở khóa phần thưởng.';root.append(notice);
 const next=quests.find(q=>!claims.has(q[0])&&!ready.includes(q));
 if(next){const n=document.createElement('p');n.textContent='Mục tiêu kế tiếp: '+next[1]+'.';root.append(n)}
 const resources=document.createElement('p');resources.className='v10-resources';resources.textContent='Kho Hoa Lư: '+Math.floor(Number(city.gold)||0).toLocaleString('vi-VN')+' vàng · '+Math.floor(Number(city.wood)||0).toLocaleString('vi-VN')+' gỗ · '+Math.floor(Number(city.stone)||0).toLocaleString('vi-VN')+' đá';root.append(resources);
}
window.addEventListener('storage',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
const questList=document.getElementById('quests');if(questList){const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(()=>{queued=false;render()})}});let queued=false;observer.observe(questList,{childList:true});}
render();
})();