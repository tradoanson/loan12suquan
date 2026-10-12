(()=>{'use strict';
const CAM='loan12_campaign_v06',CHO='loan12_choices_v08';
const id=new URLSearchParams(location.search).get('region'),s=STORY[id],root=document.getElementById('choices'),$=x=>document.getElementById(x);
const read=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
const choices=read(CHO,{});
if(!s){$('chapter').textContent='Chọn lãnh địa trên bản đồ';return}
$('chapter').textContent=s.chapter;$('line').textContent=s.intro;
function link(label,url){const a=document.createElement('a');a.href=url;a.textContent=label;root.append(a)}
function btn(label,mode){const b=document.createElement('button');b.textContent=label;b.onclick=()=>{choices[id]=mode;localStorage.setItem(CHO,JSON.stringify(choices));render()};root.append(b)}
function render(){root.replaceChildren();const mode=choices[id];
const c=read(CAM,{owned:['hoalu']});const taken=(c.owned||[]).includes(id);
if(taken){const p=document.createElement('p');p.textContent='Lãnh địa đã quy phục Hoa Lư.';root.append(p)}
else if(!mode){btn('🤝 Cử sứ giả hòa giải','peace');btn('⚔️ Tập kích bất ngờ','raid');btn('🛡️ Chuẩn bị phòng tuyến','defend')}
else{const p=document.createElement('p');p.className='muted';p.textContent=mode==='peace'?'Đã chọn hòa giải: nếu lãnh địa cho phép ngoại giao, chi phí giảm còn 180 vàng và 60 gỗ.':mode==='raid'?'Đã chọn tập kích: địch giảm 12% sinh lực, nhưng phản công mạnh hơn 12%.':'Đã chọn phòng thủ: địch giữ nguyên sinh lực; quân ta được cộng 100 giáp đầu trận.';root.append(p);btn('↩ Thay đổi quyết định',null)}
link('🗺️ Về bản đồ và thực hiện','map.html?focus='+encodeURIComponent(id));
}
render();
})();