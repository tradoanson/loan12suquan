/* V1.2: separate hero progression; no modification of battle calculations. */
(()=>{'use strict';
const KEY='loan12_hero_progress_v12',HEROES=[['dinh','👑','Đinh Bộ Lĩnh','Long Đảm'],['bac','🛡️','Nguyễn Bặc','Thiết Bích'],['dien','🏹','Đinh Điền','Vạn Tiễn']];
const $=id=>document.getElementById(id);
const UNLOCKS={dinh:['Long Đảm tinh luyện: +8% sát thương','Long Đảm đại thành: +15% sát thương'],bac:['Thiết Bích tinh luyện: +8% giáp và hồi máu','Thiết Bích đại thành: +15% giáp và hồi máu'],dien:['Vạn Tiễn tinh luyện: +8% sát thương','Vạn Tiễn đại thành: +15% sát thương']};
function read(){try{const v=JSON.parse(localStorage.getItem(KEY));return v&&typeof v==='object'?v:{}}catch(e){return {}}}
function level(xp){return Math.min(10,1+Math.floor(Math.sqrt(Math.max(0,xp)/100)))}
function heroLevel(id){const data=read();const xp=Math.max(0,Math.floor(Number(data[id])||0));return level(xp)}
function skillBonus(id){const lv=heroLevel(id);return lv>=5?1.15:lv>=3?1.08:1}
function progress(){const data=read(),root=$('hero-progress-v12');if(!root)return;root.replaceChildren();for(const [id,icon,name,skill] of HEROES){const xp=Math.max(0,Math.floor(Number(data[id])||0)),lv=level(xp);const card=document.createElement('article');card.className='hero-progress-card';const title=document.createElement('strong');title.textContent=icon+' '+name;const info=document.createElement('p');info.textContent='Cấp '+lv+'/10 · '+xp+' kinh nghiệm';const next=document.createElement('small');next.textContent=lv===10?'Đã đạt cấp tối đa':'Còn '+(100*lv*lv-xp)+' XP đến cấp '+(lv+1);const move=document.createElement('p');move.textContent='Kỹ năng: '+skill;const unlock=document.createElement('small');unlock.textContent=lv>=5?'✨ '+UNLOCKS[id][1]:lv>=3?'✨ '+UNLOCKS[id][0]:'🔒 Kỹ năng tinh luyện mở ở cấp 3, đại thành ở cấp 5';card.append(title,info,next,move,unlock);root.append(card)}}
function award({won,mode,conquered,eligible}){if(!won||!eligible)return;const data=read(),day=new Date().toLocaleDateString('en-CA'),daily=data._daily&&data._daily.day===day?data._daily.count:0;if(daily>=10)return;const gain=conquered?100:mode==='boss'?50:25;const next={...data,_daily:{day,count:daily+1}};for(const [id] of HEROES)next[id]=Math.max(0,Math.floor(Number(data[id])||0))+gain;try{localStorage.setItem(KEY,JSON.stringify(next));progress()}catch(e){}}
window.Loạn12HeroProgress={award,refresh:progress,heroLevel,skillBonus};progress();window.addEventListener('storage',e=>{if(e.key===KEY)progress()});
})();
