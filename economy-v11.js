/* V1.1 city economy overview, read-only. */
(()=>{'use strict';const CITY='loan12_hoalu_v03';const root=document.getElementById('economy-v11');if(!root)return;
const fmt=n=>Math.max(0,Math.floor(Number(n)||0)).toLocaleString('vi-VN');
function read(){try{return JSON.parse(localStorage.getItem(CITY))}catch(e){return null}}
function update(){const c=read();if(!c?.levels){root.textContent='Đang khởi tạo kinh tế thành trì…';return}
const lv=Math.max(1,Math.min(3,Number(c.levels.farm)||1)),b=Math.max(1,Math.min(3,Number(c.levels.barracks)||1));
const wait=Math.max(0,Math.ceil((10000-(Date.now()-(Number(c.harvest)||0)))/1000));
root.replaceChildren();const title=document.createElement('h2');title.textContent='📊 Kinh tế Hoa Lư';
const summary=document.createElement('p');summary.textContent='🌾 Thu hoạch mỗi đợt: +'+fmt(120*lv)+' vàng · +'+fmt(95*lv)+' gỗ · +'+fmt(70*lv)+' đá';
const train=document.createElement('p');train.textContent='⚔️ Tuyển quân: '+(10*b)+' quân / 150 vàng + 70 gỗ';
const time=document.createElement('p');time.textContent=wait?'⏳ Thu hoạch sau '+wait+' giây':'✅ Có thể thu hoạch ngay';
const note=document.createElement('p');note.className='muted';note.textContent='Nâng Nông điền để tăng sản lượng; nâng Doanh trại để tuyển nhiều quân hơn.';
root.append(title,summary,train,time,note)}
update();setInterval(()=>{if(!document.hidden)update()},1000);window.addEventListener('storage',e=>{if(e.key===CITY)update()});
})();