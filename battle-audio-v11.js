/* V1.1 Phase 5: optional synthesized audio, presentation only. */
(()=>{'use strict';
const KEY='loan12_audio_v11',status=document.getElementById('status'),result=document.getElementById('result'),enemy=document.getElementById('etxt'),hero=document.getElementById('ptxt');
const button=document.getElementById('audio-toggle');if(!button||!status||!result)return;
let enabled=false,ctx=null,lastStatus=status.textContent,lastEnemy=enemy?.textContent,lastHero=hero?.textContent,lastResult=false;
try{enabled=localStorage.getItem(KEY)==='on'}catch(e){}
function label(){button.textContent=enabled?'🔊 Âm thanh: Bật':'🔇 Âm thanh: Tắt';button.setAttribute('aria-pressed',String(enabled))}
function play(freq,duration=.09,type='sine',volume=.045){if(!enabled||document.hidden)return;try{
const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
if(!ctx)ctx=new AC();if(ctx.state==='suspended'){ctx.resume().catch(()=>{});return}
const osc=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;
osc.type=type;osc.frequency.setValueAtTime(freq,now);gain.gain.setValueAtTime(.0001,now);
gain.gain.exponentialRampToValueAtTime(volume,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+duration);
osc.connect(gain);gain.connect(ctx.destination);osc.start(now);osc.stop(now+duration+.015)
}catch(e){}}
button.onclick=()=>{enabled=!enabled;try{localStorage.setItem(KEY,enabled?'on':'off')}catch(e){}label();if(enabled){try{if(!ctx){const AC=window.AudioContext||window.webkitAudioContext;if(AC)ctx=new AC()}if(ctx?.state==='suspended')ctx.resume().then(()=>play(660,.1)).catch(()=>{});else play(660,.1)}catch(e){}}};
label();
let queued=false;
function check(){queued=false;
const current=status.textContent;
if(current!==lastStatus){if(/đợt ghép/.test(current))play(520,.1,'triangle');else if(/kỹ năng|kích hoạt/i.test(current))play(760,.16,'sine');lastStatus=current}
if(enemy?.textContent!==lastEnemy){if(lastEnemy!==null)play(410,.08,'triangle',.025);lastEnemy=enemy?.textContent}
if(hero?.textContent!==lastHero){lastHero=hero?.textContent}
const visible=!result.classList.contains('hidden');
if(visible&&!lastResult){const win=(document.getElementById('result-title')?.textContent||'').includes('Chiến thắng');play(win?880:220,.24,win?'sine':'triangle')}
lastResult=visible}
const observer=new MutationObserver(()=>{if(!queued){queued=true;requestAnimationFrame(check)}});
[status,result,enemy,hero].filter(Boolean).forEach(el=>observer.observe(el,{subtree:true,childList:true,characterData:true,attributes:el===result,attributeFilter:el===result?['class']:undefined}));
})();
