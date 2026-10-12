// Node.js built-in smoke tests for V1.0 static game.
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const files=['index.html','map.html','battle.html','quests.html','story.html'];
const read=f=>fs.readFileSync(f,'utf8');
test('all gameplay pages exist and link to local scripts',()=>{
 for(const file of files){assert.ok(fs.existsSync(file),file);const html=read(file);assert.match(html,/<meta name="viewport"/);for(const m of html.matchAll(/<script\s+src="([^"]+)"/g)){assert.ok(fs.existsSync(m[1]),file+' missing '+m[1])}for(const m of html.matchAll(/<link\s+rel="stylesheet"\s+href="([^"]+)"/g)){assert.ok(fs.existsSync(m[1]),file+' missing '+m[1])}}
});
test('every JS file parses',()=>{for(const file of fs.readdirSync('.').filter(f=>f.endsWith('.js'))){assert.doesNotThrow(()=>new vm.Script(read(file),{filename:file}),file)}});
test('city save key is shared by city, map, quests and battle',()=>{for(const file of ['index.html','map.js','quests.js','battle.js'])assert.ok(read(file).includes('loan12_hoalu_v03'),file)});
test('campaign save key is shared by map, battle and quests',()=>{for(const file of ['map.js','battle.js','quests.js'])assert.ok(read(file).includes('loan12_campaign_v06'),file)});
test('quest rewards have a single-record receipt and legacy compatibility',()=>{const code=read('quests.js');assert.match(code,/questRewardIds/);assert.match(code,/loan12_quest_claims_v08/);assert.match(code,/localStorage\.setItem\(CITY/);});
test('campaign contains 13 unique regions and valid prerequisites',()=>{
 const html=read('map.html'),m=html.match(/const REGIONS=(\[[\s\S]*?\]);<\/script>/);assert.ok(m,'region dataset');const regions=JSON.parse(m[1]);assert.equal(regions.length,13);const ids=new Set(regions.map(r=>r.id));assert.equal(ids.size,13);assert.ok(ids.has('hoalu'));for(const r of regions)for(const dep of r.requires)assert.ok(ids.has(dep),r.id+' invalid prerequisite '+dep);
});
test('quest definitions include mid and end milestones',()=>{const html=read('quests.html');assert.match(html,/COUNT7/);assert.match(html,/COUNT13/);});

test('V1.1 phase assets and UI hooks exist',()=>{
 const city=read('index.html'),battle=read('battle.html'),quests=read('quests.html');
 for(const file of ['hoalu-v11.css','hoalu-v11.js','heroes-v11.css','enemy-ai-v11.css','economy-v11.js','economy-v11.css','battle-audio-v11.js','battle-mobile-v11.css'])assert.ok(fs.existsSync(file),file);
 for(const id of ['board','audio-toggle','doctrine','difficulty','result'])assert.ok(battle.includes('id="'+id+'"'),id);
 assert.ok(city.includes('id="economy-v11"'));
 for(const id of ['q7','q8','q9'])assert.ok(quests.includes('"'+id+'"'),id);
});
test('V1.1 gameplay retains battle and campaign invariants',()=>{
 const battle=read('battle.js'),quests=read('quests.js');
 assert.match(battle,/const N=7/);
 assert.match(battle,/loan12_formation_v05/);
 assert.match(battle,/loan12_doctrine_v11/);
 assert.match(battle,/loan12_battle_difficulty_v11/);
 assert.match(battle,/targetId\?'normal':difficulty/);
 assert.match(quests,/eligible\(requirements,ids\(\),current\)/);
 assert.match(quests,/questRewardIds/);
});
test('V1.1 audio is opt-in and motion effects are preference-aware',()=>{
 const audio=read('battle-audio-v11.js'),fx=read('battle-fx-v10.js');
 assert.match(audio,/enabled=false/);
 assert.match(audio,/loan12_audio_v11/);
 assert.match(audio,/AudioContext/);
 assert.match(audio,/ctx\.resume\(\)/);
 assert.match(fx,/prefers-reduced-motion/);
 assert.match(fx,/const reduced=\(\)=>motion\.matches/);
});

test('V1.2 chronicle exists and reads saves without writing',()=>{
 const page=read('chronicle.html'),script=read('chronicle-v12.js');
 assert.match(page,/chronicle-v12\.js/);
 assert.match(page,/chronicle-v12\.css/);
 assert.match(read('index.html'),/href="chronicle.html"/);
 for(const key of ['loan12_campaign_v06','loan12_hoalu_v03','loan12_quest_claims_v08'])assert.ok(script.includes(key),key);
 assert.doesNotMatch(script,/localStorage\.setItem\s*\(/);
 assert.match(script,/textContent=value/);
});

test('V1.2 hero progression is separate and awarded only for eligible wins',()=>{
 const battle=read('battle.js'),page=read('battle.html'),hero=read('hero-progress-v12.js');
 assert.match(page,/hero-progress-v12\.js/);
 assert.match(page,/id="hero-progress-v12"/);
 assert.match(hero,/loan12_hero_progress_v12/);
 assert.match(hero,/if\(!won\|\|!eligible\)return/);
 assert.match(hero,/daily>=10/);
 assert.match(battle,/if\(ended\)return;ended=true/);
 assert.match(battle,/eligible:!targetId\|\|conquered/);
});
