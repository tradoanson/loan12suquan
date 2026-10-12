/* V1.0 Phase 4: City economy extension; retains existing save format. */
(()=>{'use strict';
const $=id=>document.getElementById(id);
const train=$('train'),collect=$('collect'),timer=$('harvest-timer'),bonus=$('city-bonus');
if(!train||!collect||!timer||!bonus)return;
const labels={hall:'🏯 Đại điện: trung tâm điều hành, nâng tối đa cấp 3.',barracks:'⚔️ Doanh trại: tăng số quân tuyển mỗi lần theo cấp.',forge:'🔨 Xưởng binh khí: tăng 12% sát thương chiến đấu mỗi cấp trên cấp 1.',farm:'🌾 Nông điền: tăng lượng tài nguyên thu hoạch theo cấp.'};
function quantity(){return 10*Math.max(1,Math.min(3,Number(state.levels.barracks)||1))}
function refresh(){
const level=Number(state.levels[selected])||1;
bonus.textContent=labels[selected]+' Hiện tại cấp '+level+'/3.'+(selected==='farm'?' Mỗi đợt: +'+(120*level)+' vàng, +'+(95*level)+' gỗ, +'+(70*level)+' đá.':'');
train.textContent='⚔️ Tuyển '+quantity()+' quân (150 vàng · 70 gỗ)';
const left=Math.max(0,10000-(Date.now()-(Number(state.harvest)||0)));
timer.textContent=left>0?'⏳ Thu hoạch tiếp sau '+Math.ceil(left/1000)+' giây':'✅ Nông điền đã sẵn sàng thu hoạch';
collect.disabled=left>0;
}
train.addEventListener('click',e=>{
if(selected!=='barracks')return;
e.stopImmediatePropagation();
if(Number(state.gold)<150||Number(state.wood)<70){msg('Không đủ 150 vàng và 70 gỗ để tuyển quân.');return}
const count=quantity();state.gold-=150;state.wood-=70;state.army=(Number(state.army)||0)+count;
save();render();msg('Đã tuyển '+count+' nghĩa quân nhờ Doanh trại cấp '+state.levels.barracks+'.');refresh();
},true);
for(const id of ['upgrade','collect','reset'])$(id)?.addEventListener('click',()=>setTimeout(refresh,0));
$('buildings')?.addEventListener('click',()=>setTimeout(refresh,0));
window.addEventListener('storage',event=>{if(event.key==='loan12_hoalu_v03'){try{const next=JSON.parse(event.newValue);if(next&&next.levels){state=next;render()}}catch(e){}}refresh()});
document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});
setInterval(()=>{if(!document.hidden)refresh()},1000);
refresh();
})();