/* V1.2 Phase 5: optional one-time strategic events; campaign ledger is the authority. */
(()=>{'use strict';
const CAM='loan12_campaign_v06',CITY='loan12_hoalu_v03';
const EVENTS=[
{id:'council',title:'🏯 Hội nghị Hoa Lư',desc:'Khi Đại điện đạt cấp 2, triệu tập quần thần bàn kế dựng nước.',eligible:(c,o)=>(Number(c?.levels?.hall)||0)>=2,options:[
{id:'supplies',label:'🌾 Lo hậu cần',cost:{gold:120},reward:{wood:180,stone:100},detail:'Chi 120 vàng, nhận 180 gỗ và 100 đá.'},
{id:'recruit',label:'⚔️ Chiêu mộ nghĩa sĩ',cost:{gold:180,wood:80},reward:{army:15},detail:'Chi 180 vàng và 80 gỗ, nhận 15 nghĩa quân.'}]},
{id:'border',title:'🗺️ Biên cương biến động',desc:'Sau khi kiểm soát 4 lãnh địa, chọn ưu tiên củng cố vùng mới.',eligible:(c,o)=>o.size>=4,options:[
{id:'fortify',label:'🛡️ Gia cố phòng tuyến',cost:{wood:160},reward:{stone:200},detail:'Chi 160 gỗ, nhận 200 đá.'},
{id:'trade',label:'🤝 Mở đường giao thương',cost:{stone:100},reward:{gold:300},detail:'Chi 100 đá, nhận 300 vàng.'}]},
{id:'unification',title:'👑 Khải hoàn giữa thời loạn',desc:'Sau khi kiểm soát 7 lãnh địa, lựa chọn kế sách phát triển Hoa Lư.',eligible:(c,o)=>o.size>=7,options:[
{id:'people',label:'🌾 Chăm lo dân sinh',cost:{gold:300},reward:{wood:350,stone:220},detail:'Chi 300 vàng, nhận 350 gỗ và 220 đá.'},
{id:'army',label:'⚔️ Củng cố quân lực',cost:{gold:350,wood:180},reward:{army:35},detail:'Chi 350 vàng và 180 gỗ, nhận 35 nghĩa quân.'}]}
];
const $=id=>document.getElementById(id);
function read(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}}
function context(){const c=read(CITY,null),p=read(CAM,null);return {city:c,campaign:p,owned:new Set(Array.isArray(p?.owned)?p.owned:['hoalu'])}}
function ledger(c){return c?.strategicEventChoices&&typeof c.strategicEventChoices==='object'&&!Array.isArray(c.strategicEventChoices)?c.strategicEventChoices:{}}
function text(tag,value){const el=document.createElement(tag);el.textContent=value;return el}
function render(){const root=$('strategic-events-v12');if(!root)return;root.replaceChildren();const {city,owned}=context(),done=ledger(city);
 for(const event of EVENTS){const box=document.createElement('article');box.className='strategic-event';box.append(text('h3',event.title),text('p',event.desc));
 const choice=event.options.find(o=>o.id===done[event.id]);if(choice){box.append(text('p','✓ Đã quyết định: '+choice.label));}
 else if(!event.eligible(city,owned)){box.append(text('p','🔒 Chưa đủ điều kiện mở sự kiện.'))}
 else {for(const option of event.options){const button=text('button',option.label);button.type='button';button.title=option.detail;button.onclick=()=>choose(event.id,option.id);box.append(button,text('small',option.detail))}}
 root.append(box)}
}
function choose(id,optionId){const event=EVENTS.find(e=>e.id===id),option=event?.options.find(o=>o.id===optionId),notice=$('strategic-events-notice');if(!event||!option)return;
 const {city,owned}=context();if(!city||!city.levels){if(notice)notice.textContent='Hãy khởi tạo Hoa Lư trước.';return}
 if(ledger(city)[id]||!event.eligible(city,owned)){render();return}
 if(Object.entries(option.cost).some(([k,v])=>(Number(city[k])||0)<v)){if(notice)notice.textContent='Không đủ tài nguyên cho quyết định này.';return}
 const next={...city,strategicEventChoices:{...ledger(city),[id]:optionId}};
 for(const [k,v] of Object.entries(option.cost))next[k]=(Number(next[k])||0)-v;
 for(const [k,v] of Object.entries(option.reward))next[k]=(Number(next[k])||0)+v;
 try{localStorage.setItem(CITY,JSON.stringify(next));if(notice)notice.textContent='Đã ghi nhận: '+option.label+'. Quyết định này không thể chọn lại.'}
 catch(e){if(notice)notice.textContent='Không lưu được quyết định, vui lòng thử lại.'}
 render()
}
render();window.addEventListener('storage',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
})();
