// V1.2 release QA: execute reward handlers in a minimal browser-like VM.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function environment(seed={}){
 const records=new Map(Object.entries(seed).map(([k,v])=>[k,JSON.stringify(v)]));
 const nodes=new Map();
 function element(tag='div'){return {tag,children:[],disabled:false,textContent:'',append(...children){this.children.push(...children)},replaceChildren(...children){this.children=children},set className(v){this._className=v},get className(){return this._className||''}}}
 const document={hidden:false,createElement:element,getElementById(id){if(!nodes.has(id))nodes.set(id,element());return nodes.get(id)},addEventListener(){}};
 const localStorage={getItem(k){return records.has(k)?records.get(k):null},setItem(k,v){records.set(k,String(v))}};
 const context=vm.createContext({document,localStorage,window:{addEventListener(){}},Number,Math,Array,Object,Set});
 return {records,nodes,document,context,run(file){vm.runInContext(fs.readFileSync(file,'utf8'),context,{filename:file})},read(k){return JSON.parse(records.get(k))},buttons(root){const out=[];function walk(n){if(n.tag==='button')out.push(n);for(const child of n.children)walk(child)}walk(document.getElementById(root));return out}};
}
const baseCity=()=>({gold:1200,wood:1000,stone:750,army:20,levels:{hall:2,barracks:1,forge:1,farm:1},harvest:0});
test('phase 5: strategic event spends and rewards once, even after reload',()=>{
 const env=environment({'loan12_hoalu_v03':baseCity(),'loan12_campaign_v06':{owned:['hoalu']}});
 env.run('strategic-events-v12.js');
 let button=env.buttons('strategic-events-v12').find(b=>b.textContent.includes('Lo hậu cần'));
 assert.ok(button);button.onclick();
 let city=env.read('loan12_hoalu_v03');
 assert.equal(city.gold,1080);assert.equal(city.wood,1180);assert.equal(city.stone,850);
 assert.equal(city.strategicEventChoices.council,'supplies');
 button.onclick();city=env.read('loan12_hoalu_v03');assert.equal(city.gold,1080);
 env.run('strategic-events-v12.js');
 assert.equal(env.buttons('strategic-events-v12').filter(b=>b.textContent.includes('Lo hậu cần')).length,0);
});
test('phase 5: insufficient resources do not consume a strategic event',()=>{
 const city=baseCity();city.gold=0;
 const env=environment({'loan12_hoalu_v03':city,'loan12_campaign_v06':{owned:['hoalu']}});
 env.run('strategic-events-v12.js');
 const button=env.buttons('strategic-events-v12').find(b=>b.textContent.includes('Lo hậu cần'));button.onclick();
 assert.equal(env.read('loan12_hoalu_v03').gold,0);
 assert.equal(env.read('loan12_hoalu_v03').strategicEventChoices,undefined);
});
test('phase 4: achievement receipt and resource reward remain idempotent',()=>{
 const env=environment({'loan12_hoalu_v03':baseCity(),'loan12_campaign_v06':{owned:['hoalu']},'loan12_hero_progress_v12':{}});
 env.run('achievements-v12.js');
 const button=env.buttons('achievements-v12').find(b=>b.textContent==='🎁 Nhận thành tựu');
 assert.ok(button);button.onclick();
 let city=env.read('loan12_hoalu_v03');
 assert.equal(city.gold,1300);assert.equal(city.wood,1080);
 assert.deepEqual(city.achievementRewardIds,['a1']);
 button.onclick();city=env.read('loan12_hoalu_v03');assert.equal(city.gold,1300);
});
test('phase 4 and 5: event preserves existing quest and achievement receipts',()=>{
 const city={...baseCity(),questRewardIds:['q1'],achievementRewardIds:['a1']};
 const env=environment({'loan12_hoalu_v03':city,'loan12_campaign_v06':{owned:['hoalu']}});
 env.run('strategic-events-v12.js');
 env.buttons('strategic-events-v12').find(b=>b.textContent.includes('Lo hậu cần')).onclick();
 const next=env.read('loan12_hoalu_v03');
 assert.deepEqual(next.questRewardIds,['q1']);
 assert.deepEqual(next.achievementRewardIds,['a1']);
});
