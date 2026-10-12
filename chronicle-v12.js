/* V1.2 chronicle: strictly read-only view of existing saves. */
(()=>{'use strict';
const REGION={hoalu:'Hoa Lư',bohai:'Bố Hải Khẩu',dodong:'Đỗ Động Giang',tayphu:'Tây Phù Liệt',tegiang:'Tế Giang',sieu:'Siêu Loại',tiendu:'Tiên Du',dangchau:'Đằng Châu',duonglam:'Đường Lâm',tamdai:'Tam Đái',hoinho:'Hồi Hồ',phongchau:'Phong Châu',binhkieu:'Bình Kiều'};
const QUEST={q1:'Dựng cờ Hoa Lư',q2:'Kết giao Trần Lãm',q3:'Phá thế Đỗ Động',q4:'Dư âm nhà Ngô',q5:'Nửa giang sơn',q6:'Nhất thống thiên hạ',q7:'Củng cố Đại điện',q8:'Rèn binh luyện tướng',q9:'Phát triển nông điền'};
const $=id=>document.getElementById(id);
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch(e){return fallback}}
function text(tag,value,cls){const el=document.createElement(tag);el.textContent=value;if(cls)el.className=cls;return el}
function item(title,detail){const el=text('div',title,'item');if(detail)el.append(text('small',detail));return el}
function render(){
 const campaign=read('loan12_campaign_v06',{owned:['hoalu'],events:[]});
 const city=read('loan12_hoalu_v03',null);
 const old=read('loan12_quest_claims_v08',[]);
 const owned=[...new Set((Array.isArray(campaign?.owned)?campaign.owned:['hoalu']).filter(id=>Object.hasOwn(REGION,id)))];
 const claimed=[...new Set([...(Array.isArray(old)?old:[]),...(Array.isArray(city?.questRewardIds)?city.questRewardIds:[])])].filter(id=>Object.hasOwn(QUEST,id));
 const stats=$('chronicle-stats');stats.replaceChildren();
 for(const [n,label] of [[owned.length+'/13','Lãnh địa'],[claimed.length+'/9','Nhiệm vụ nhận thưởng'],[String(Math.max(0,Number(city?.army)||0)),'Nghĩa quân']]){const box=text('div','','stat');box.append(text('b',n),text('span',label));stats.append(box)}
 const cityBox=$('chronicle-city');cityBox.replaceChildren();
 if(city?.levels){const grid=text('div','','list');for(const [id,name] of [['hall','Đại điện'],['barracks','Doanh trại'],['forge','Xưởng binh khí'],['farm','Nông điền']])grid.append(item(name,'Cấp '+(Number(city.levels[id])||1)+'/3'));cityBox.append(grid)}else cityBox.append(text('p','Chưa có dữ liệu thành trì trên trình duyệt này.','muted'));
 const regions=$('chronicle-regions');regions.replaceChildren();const grid=text('div','','list');for(const id of owned)grid.append(item('🏳️ '+REGION[id],id==='hoalu'?'Kinh đô khởi nghiệp':'Đã thu phục'));regions.append(grid);
 const quests=$('chronicle-quests');quests.replaceChildren();if(claimed.length){const grid=text('div','','list');for(const id of claimed)grid.append(item('🏅 '+QUEST[id],'Đã nhận thưởng'));quests.append(grid)}else quests.append(text('p','Chưa có nhiệm vụ đã nhận thưởng.','muted'));
 const events=$('chronicle-events');events.replaceChildren();const records=Array.isArray(campaign?.events)?campaign.events.slice(-30).reverse():[];if(!records.length){events.append(text('p','Chưa có sự kiện chiến dịch được lưu.','muted'));return}
 for(const record of records){let value='';if(typeof record==='string')value=record;else if(record&&typeof record==='object'){value=[record.text,record.message,record.description,record.type,record.region].find(v=>typeof v==='string'&&v.trim())||'Sự kiện chiến dịch'}else value='Sự kiện chiến dịch';events.append(text('div',value.slice(0,260),'event'))}
}
render();window.addEventListener('storage',render);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});
})();