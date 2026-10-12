(()=>{'use strict';
const CAM='loan12_campaign_v06',CITY='loan12_hoalu_v03',CLAIM='loan12_quest_claims_v08';
const $=id=>document.getElementById(id);
function read(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}}
function ids(){const c=read(CAM,{owned:['hoalu']});return new Set(Array.isArray(c.owned)?c.owned:['hoalu'])}
function eligible(req,owned,city){return req.every(x=>x==='COUNT7'?owned.size>=7:x==='COUNT13'?owned.size>=13:x==='HALL2'?(Number(city?.levels?.hall)||0)>=2:x==='FORGE2'?(Number(city?.levels?.forge)||0)>=2:x==='FARM3'?(Number(city?.levels?.farm)||0)>=3:owned.has(x))}
function ledger(city){return Array.isArray(city?.questRewardIds)?city.questRewardIds:[]}
function render(){
 const owned=ids(),city=read(CITY,null),old=read(CLAIM,[]),claimed=new Set([...(Array.isArray(old)?old:[]),...ledger(city)]);
 $('quests').replaceChildren();
 QUESTS.forEach(([id,name,desc,requirements,reward])=>{
 const done=eligible(requirements,owned,city);
 const card=document.createElement('article'),h=document.createElement('h2'),p=document.createElement('p'),note=document.createElement('p'),b=document.createElement('button');
 h.textContent=name;p.textContent=desc;note.textContent='Thưởng: '+Object.entries(reward).map(([k,v])=>v+' '+({gold:'vàng',wood:'gỗ',stone:'đá'}[k])).join(' · ');
 b.textContent=claimed.has(id)?'✓ Đã nhận':done?'🎁 Nhận thưởng':'🔒 Chưa hoàn thành';
 b.disabled=!done||claimed.has(id);
 b.onclick=()=>{
  const current=read(CITY,null),legacy=read(CLAIM,[]);
  if(!current||typeof current!=='object'||!current.levels){$('notice').textContent='Hãy vào Hoa Lư để khởi tạo thành trì trước khi nhận thưởng.';return}
  const previously=new Set([...(Array.isArray(legacy)?legacy:[]),...ledger(current)]);
  if(previously.has(id)||!eligible(requirements,ids(),current)){render();return}
  // Store reward and claim receipt together in the same city record.
  // This prevents a second reward after a partial write of the legacy claim key.
  const updated={...current,questRewardIds:[...ledger(current),id]};
  for(const [k,v] of Object.entries(reward))updated[k]=(Number(updated[k])||0)+v;
  try{
   localStorage.setItem(CITY,JSON.stringify(updated));
   // The old claim list is a compatibility mirror only, never the reward authority.
   try{localStorage.setItem(CLAIM,JSON.stringify([...previously,id]))}catch(e){}
   $('notice').textContent='Đã nhận thưởng '+name;render();
  }catch(e){$('notice').textContent='Không lưu được phần thưởng. Vui lòng thử lại.'}
 };
 card.append(h,p,note,b);$('quests').append(card);
 });
}
window.addEventListener('storage',render);render();
})();