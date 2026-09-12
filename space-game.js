'use strict';
const canvas=$('#game'),ctx=canvas.getContext('2d'),game=new SpaceGame();
let state='ready',last=0,raf=0,keys={left:false,right:false,fire:false};
const sound=new SpaceAudio();
const sectors=['ÓRBITA VIOLETA','PLANETA GLACIAL','FRONTEIRA SOLAR'];
let best=Number(safeStore.get('vibecode-space-best'))||0;
$('#best').textContent=best.toFixed(1);
function ship(x,y,enemy=false) {
  ctx.save();ctx.translate(x+20,y+19);if(enemy)ctx.rotate(Math.PI);
  ctx.shadowColor=enemy?'#ff657e':'#ccff47';ctx.shadowBlur=12;
  ctx.fillStyle=enemy?'#ff657e':'#ccff47';
  ctx.beginPath();ctx.moveTo(0,-20);ctx.lineTo(21,17);ctx.lineTo(6,11);ctx.lineTo(0,17);ctx.lineTo(-6,11);ctx.lineTo(-21,17);ctx.closePath();ctx.fill();
  ctx.shadowBlur=0;ctx.fillStyle='#153344';ctx.fillRect(-4,-5,8,13);
  ctx.fillStyle='#65e7ff';ctx.fillRect(-3,18,6,8+Math.sin(game.time*40)*3);ctx.restore();
}
function scenery(){
  const colors=[['#673f97','#c477df'],['#154e6b','#6ddfff'],['#763321','#ffb863']][(game.stage-1)%3];
  const glow=ctx.createRadialGradient(610,145,10,610,145,340);glow.addColorStop(0,colors[0]+'99');glow.addColorStop(1,'#070b1600');ctx.fillStyle=glow;ctx.fillRect(0,0,800,450);
  ctx.save();ctx.translate(610,145);ctx.rotate(-.4);ctx.strokeStyle=colors[1]+'40';ctx.lineWidth=10;ctx.beginPath();ctx.ellipse(0,0,150,35,0,0,Math.PI*2);ctx.stroke();
  const planet=ctx.createRadialGradient(-30,-30,2,0,0,83);planet.addColorStop(0,colors[1]);planet.addColorStop(.6,colors[0]);planet.addColorStop(1,'#060915');ctx.fillStyle=planet;ctx.beginPath();ctx.arc(0,0,80,0,Math.PI*2);ctx.fill();ctx.restore();
  ctx.strokeStyle=colors[1]+'12';ctx.lineWidth=1;for(let y=0;y<450;y+=75){ctx.beginPath();ctx.moveTo(0,(y+game.time*8)%450);ctx.lineTo(800,(y+game.time*8)%450);ctx.stroke();}
}
function draw(){
  const bg=ctx.createLinearGradient(0,0,800,450);bg.addColorStop(0,'#101326');bg.addColorStop(1,'#050c15');ctx.fillStyle=bg;ctx.fillRect(0,0,800,450);
  scenery();
  for(let i=0;i<65;i++){const y=(i*73+game.time*(15+i%3*15))%450;ctx.fillStyle=i%3?'#687689':'#c7e5ff';ctx.fillRect((i*137)%800,y,i%3?1:2,i%3?2:4);}
  for(const o of game.targets){if(o.enemy){ctx.save();ctx.translate(o.x,o.y);ctx.scale(o.w/42,o.h/40);if(o.flash)ctx.globalAlpha=.45;ship(0,0,true);ctx.restore();if(o.maxHp>1&&!o.boss){ctx.fillStyle='#292c40';ctx.fillRect(o.x,o.y-9,o.w,4);ctx.fillStyle=o.boss?'#ffcb65':'#ff657e';ctx.fillRect(o.x,o.y-9,o.w*o.hp/o.maxHp,4);}continue;}ctx.save();ctx.translate(o.x+19,o.y+19);ctx.rotate(game.time+o.phase);ctx.strokeStyle='#b4a0ff';ctx.fillStyle='#382e59';ctx.lineWidth=2;ctx.beginPath();for(let i=0;i<7;i++){const a=i*Math.PI*2/7,r=i%2?17:22;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}
  for(const [list,color] of [[game.shots,'#ccff47'],[game.hostile,'#ff657e']]){ctx.fillStyle=color;ctx.shadowColor=color;ctx.shadowBlur=10;for(const b of list)ctx.fillRect(b.x,b.y,b.w,b.h);}ctx.shadowBlur=0;
  for(const s of game.sparks){ctx.globalAlpha=s.life/.35;ctx.fillStyle=s.color;ctx.fillRect(s.x,s.y,4,4);}ctx.globalAlpha=1;
  if(game.shield==='active'||game.invincible>0){ctx.strokeStyle='#52e5ed';ctx.lineWidth=3;ctx.beginPath();ctx.arc(game.x+20,412,34,0,Math.PI*2);ctx.stroke();}
  ship(game.x,390);
  ctx.font='bold 14px Arial';ctx.fillStyle='#c4c9df';ctx.fillText('FASE '+game.stage+' / '+sectors[(game.stage-1)%3],18,24);
  if(game.boss){ctx.fillStyle='#ffcb65';ctx.fillText('BOSS · DESTRUIDOR '+game.stage,18,45);ctx.fillStyle='#343247';ctx.fillRect(230,15,350,10);ctx.fillStyle='#ff657e';ctx.fillRect(230,15,350*game.boss.hp/game.boss.maxHp,10);}
  else{ctx.fillStyle='#969eb5';ctx.fillText('Chefe em '+Math.max(0,Math.ceil(30-game.stageTime))+'s',630,24);}
  if(game.banner>0){ctx.textAlign='center';ctx.font='bold 28px Arial';ctx.fillStyle='#ccff47';ctx.fillText('FASE '+game.stage+' · '+sectors[(game.stage-1)%3],400,230);ctx.textAlign='left';}
}
function updateHUD(){
  $('#score').textContent=game.time.toFixed(1);$('#level').textContent=game.level;$('#kills').textContent=game.kills;
  const labels={off:'Ative a opção para usar o escudo.',ready:'Escudo disponível. Use Espaço ou o botão.',active:'Escudo ativo: absorve o próximo impacto.',used:'Escudo consumido nesta partida.'};
  $('#shield-status').textContent=labels[game.shield];$('#activate-shield').disabled=state!=='playing'||game.shield!=='ready';
}
function activateShield(){if(state==='playing'&&game.shield==='ready'){game.shield='active';updateHUD();draw();canvas.focus({preventScroll:true});}}
function showOverlay(label,title,desc,button){$('#game-label').textContent=label;$('#game-title').textContent=title;$('#game-description').textContent=desc;$('#start-game').textContent=button;$('#game-overlay').hidden=false;}
function finish(){state='over';setTimeout(()=>{if(state==='over')sound.setPlaying(false);},300);keys={};cancelAnimationFrame(raf);if(game.time>best){best=game.time;safeStore.set('vibecode-space-best',String(best));$('#best').textContent=best.toFixed(1);}$('#pause-game').disabled=true;$('#difficulty').disabled=false;$('#shield-option').disabled=false;updateHUD();showOverlay('FIM DE PARTIDA',`${game.time.toFixed(1)} segundos`,`${game.kills} alvos destruídos · Fase ${game.stage}. Prepare sua próxima missão!`,'Jogar novamente');$('#start-game').focus({preventScroll:true});}
function frame(t){if(state!=='playing')return;game.update((t-last)/1000,keys);last=t;for(const event of game.events)sound.effect(event);sound.tick(!!game.boss,game.stage);updateHUD();draw();if(game.over){finish();return;}raf=requestAnimationFrame(frame);}
function start(){sound.activate().then(()=>{sound.setPlaying(state==='playing');updateSound();});if(state==='paused'){resume();return;}cancelAnimationFrame(raf);game.reset($('#difficulty').value,$('#shield-option').checked);state='playing';keys={};$('#game-overlay').hidden=true;$('#pause-game').disabled=false;$('#pause-game').textContent='Pausar';$('#difficulty').disabled=true;$('#shield-option').disabled=true;updateHUD();last=performance.now();canvas.focus({preventScroll:true});raf=requestAnimationFrame(frame);}
function pause(){if(state!=='playing')return;state='paused';sound.setPlaying(false);keys={};cancelAnimationFrame(raf);$('#pause-game').textContent='Continuar';showOverlay('MISSÃO EM ESPERA','Pausa','Naves, tiros e dificuldade ficam congelados.','Continuar');updateHUD();}
function resume(){if(state!=='paused')return;sound.setPlaying(true);state='playing';keys={};$('#game-overlay').hidden=true;$('#pause-game').textContent='Pausar';last=performance.now();updateHUD();canvas.focus({preventScroll:true});raf=requestAnimationFrame(frame);}
$('#start-game').addEventListener('click',start);$('#pause-game').addEventListener('click',()=>state==='playing'?pause():resume());$('#activate-shield').addEventListener('click',activateShield);
$('#shield-option').addEventListener('change',()=>{if(state!=='playing'&&state!=='paused'){game.shield=$('#shield-option').checked?'ready':'off';updateHUD();}});
const keyMap={ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right',ArrowUp:'fire'};
canvas.addEventListener('keydown',e=>{if(keyMap[e.key]||[' ','p','P'].includes(e.key))e.preventDefault();if(keyMap[e.key])keys[keyMap[e.key]]=true;if(e.key===' ')activateShield();if(['p','P'].includes(e.key)&&!e.repeat)state==='playing'?pause():resume();});
document.addEventListener('keyup',e=>{if(keyMap[e.key])keys[keyMap[e.key]]=false;});
canvas.addEventListener('blur',()=>{keys={};});
for(const [id,key] of [['move-left','left'],['move-right','right'],['fire-shot','fire']]){const b=$('#'+id);b.addEventListener('pointerdown',e=>{e.preventDefault();if(state!=='playing')return;b.setPointerCapture(e.pointerId);keys[key]=true;});for(const ev of ['pointerup','pointercancel','lostpointercapture'])b.addEventListener(ev,()=>keys[key]=false);b.addEventListener('keydown',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();keys[key]=true;}});b.addEventListener('keyup',e=>{if([' ','Enter'].includes(e.key)){e.preventDefault();keys[key]=false;}});b.addEventListener('blur',()=>keys[key]=false);}
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});window.addEventListener('blur',()=>{keys={};pause();});new IntersectionObserver(([entry])=>{if(!entry.isIntersecting)pause();},{threshold:.15}).observe(canvas);draw();updateHUD();

function updateSound(){$('#toggle-sound').textContent=sound.enabled?'Som: ligado':'Som: desligado';$('#toggle-sound').setAttribute('aria-pressed',String(sound.enabled));}
$('#toggle-sound').addEventListener('click',async()=>{sound.enabled=!sound.enabled;if(sound.enabled)await sound.activate();sound.setPlaying(state==='playing');updateSound();});
