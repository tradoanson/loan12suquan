/* V1.2 Phase 4: achievement claims use city record as reward receipt authority. */
(()=>{'use strict';
const CITY='loan12_hoalu_v03',CAM='loan12_campaign_v06',HERO='loan12_hero_progress_v12';
const ACH=[
{id:'a1',name:'🏯 Dựng nghiệp Hoa Lư',title:'Người dựng cờ',desc:'Bắt đầu xây dựng thành Hoa Lư.',reward:{gold:100,wood:80},done:(c,p,h)=>!!c?.levels},
{id:'a2',name:'🏛️ Đại điện vững bền',title:'Chủ thành Hoa Lư',desc:'Nâng Đại điện lên cấp 3.',reward:{gold:250,stone:200},done:c=>(Number(c?.levels?.hall)||0)>=3},
{id:'a3',name:'🌾 Mùa vàng no ấm',title:'Người chăm lo dân sinh',desc:'Nâng Nông điền lên cấp 3.',reward:{gold:250,wood:200},done:c=>(Number(c?.levels?.farm)||0)>=3},
{id:'a4',name:'🗺️ Khai mở giang sơn',title:'Người mở cõi',desc:'Thu phục ít nhất 4 lãnh địa.',reward:{gold:300,stone:150},done:(c,p)=>p.size>=4},
{id:'a5',name:'⚔️ Nửa cõi sơn hà',title:'Hào kiệt phương Nam',desc:'Kiểm soát ít nhất 7 lãnh địa.',reward:{gold:450,wood:250},done:(c,p)=>p.size>=7},
{id:'a6',name:'👑 Nhất thống thiên hạ',title:'Minh chủ thiên hạ',desc:'Kiểm soát đủ 13 lãnh địa.',reward:{gold:900,wood:400,stone:400},done:(c,p)=>p.size>=13},
{id:'a7',name:'🛡️ Tướng sĩ tinh nhuệ',title:'Người luyện binh',desc:'Có ít nhất một tướng đạt cấp 3.',reward:{gold:200,stone:120},done:(c,p,h)=>['dinh','bac','dien'].some(id=>level(h[id])>=3)},
{id:'a8',name:'🌟 Tam kiệt Hoa Lư',title:'Bậc thầy dụng tướng',desc:'Cả ba tướng đạt cấp 5.',reward:{gold:500,wood:300,stone:200},done:(c,p,h)=>['dinh','bac','dien'].every(id=>level(h[id])>=5)}
];
const $=id=>document.getElementById(id);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch(e){return fallback}}
function level(x){const n=Number(x);return Math.min(10,1+Math.floor(Math.sqrt(Math.max(0,Number.isFinite(n)?n:0)/100)))}
function context(){const city=read(CITY,null),campaign=read(CAM,{owned:['hoalu']}),heroes=read(HERO,{});return {city,owned:new Set(Array.isArray(campaign?.owned)?campaign.owned:['hoalu']),heroes:heroes&&typeof heroes==='object'?heroes:{}}}
function receipts(city){return Array.isArray(city?.achievementRewardIds)?city.achievementRewardIds:[]}
function render(){
 const root=$('achievements-v12');if(!root)return;root.replaceChildren();const {city,owned,heroes}=context(),claimed=new Set(receipts(city));
 const count=ACH.filter(a=>claimed.has(a.id)).length;
 const summary=document.createElement('p');summary.className='muted';summary.textContent='Đã nhận '+count+'/'+ACH.length+' thành tựu · Phần thưởng nhận một lần.';root.append(summary);
 const grid=document.createElement('div');grid.className='achievement-grid';
 for(const a of ACH){const done=a.done(city,owned,heroes),received=claimed.has(a.id),card=document.createElement('article');card.className='achievement-card';
 const h=document.createElement('h3');h.textContent=a.name;const desc=document.createElement('p');desc.textContent=a.desc;
 const reward=document.createElement('p');reward.textContent='🎁 '+Object.entries(a.reward).map(([k,v])=>v+' '+({gold:'vàng',wood:'gỗ',stone:'đá'}[k])).join(' · ');
 const title=document.createElement('small');title.textContent='Danh hiệu: '+a.title;
 const button=document.createElement('button');button.type='button';button.disabled=received||!done;button.textContent=received?'✓ Đã nhận':done?'🎁 Nhận thành tựu':'🔒 Chưa đạt';
 button.onclick=()=>claim(a.id);card.append(h,desc,reward,title,button);grid.append(card)}
 root.append(grid)
}
function claim(id){
 const a=ACH.find(x=>x.id===id),notice=$('achievement-notice');if(!a)return;
 const {city,owned,heroes}=context();
 if(!city||typeof city!=='object'||!city.levels){if(notice)notice.textContent='Vui lòng vào Hoa Lư khởi tạo thành trì trước.';return}
 if(receipts(city).includes(id)||!a.done(city,owned,heroes)){render();return}
 const updated={...city,achievementRewardIds:[...receipts(city),id]};
 for(const [key,amount] of Object.entries(a.reward))updated[key]=(Number(updated[key])||0)+amount;
 try{localStorage.setItem(CITY,JSON.stringify(updated));if(notice)notice.textContent='Đã nhận danh hiệu '+a.title+' và phần thưởng.'}
 catch(e){if(notice)notice.textContent='Không thể lưu phần thưởng, hãy thử lại.'}
 render()
}
render();window.addEventListener('storage',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
})();
