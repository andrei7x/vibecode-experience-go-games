'use strict';
// Original procedural arcade soundtrack; no downloaded music or external requests.
class SpaceAudio {
  constructor(){this.enabled=true;this.playing=false;this.step=0;this.next=0;}
  async activate(){
    try{if(!this.ctx){this.ctx=new (window.AudioContext||window.webkitAudioContext)();this.master=this.ctx.createGain();this.master.gain.value=.16;this.master.connect(this.ctx.destination);}
      if(this.ctx.state==='suspended')await this.ctx.resume();return true;
    }catch{this.enabled=false;return false;}
  }
  tone(freq,duration,type='square',volume=.12,when=this.ctx?.currentTime,end=freq){
    if(!this.ctx||!this.enabled||!this.playing)return;
    const o=this.ctx.createOscillator(),g=this.ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,when);o.frequency.exponentialRampToValueAtTime(Math.max(20,end),when+duration);
    g.gain.setValueAtTime(volume,when);g.gain.exponentialRampToValueAtTime(.001,when+duration);o.connect(g);g.connect(this.master);o.start(when);o.stop(when+duration);o.onended=()=>{o.disconnect();g.disconnect();};
  }
  effect(name){const bank={shot:[900,.065,'sawtooth',.08,220],impact:[150,.07,'square',.12,50],explosion:[85,.3,'sawtooth',.26,20],boss:[110,.6,'sawtooth',.2,220],victory:[523,.6,'triangle',.25,1046],defeat:[220,.5,'sawtooth',.2,30]};const a=bank[name];if(a)this.tone(a[0],a[1],a[2],a[3],this.ctx?.currentTime,a[4]);}
  setPlaying(on){this.playing=on;if(this.master)this.master.gain.setTargetAtTime(on && this.enabled ? .16 : 0,this.ctx.currentTime,.025);if(on)this.next=this.ctx?.currentTime||0;}
  tick(boss,stage){
    if(!this.ctx||!this.enabled||!this.playing)return;
    const now=this.ctx.currentTime;if(now<this.next)return;
    const beat=60/(boss?150:Math.min(144,110+stage*6))/4;this.next=now+beat;
    const notes=[0,7,12,7,3,10,15,10,5,12,17,12,3,10,15,7],root=[110,123.47,98][(stage-1)%3];
    this.tone(root*2**(notes[this.step%16]/12),beat*.8,'triangle',.23);
    if(this.step%4===0){this.tone(130,.12,'sine',.6,now,35);this.tone(root/2,beat*3,'sawtooth',.1);}
    if(this.step%2===1)this.tone(5000,.025,'square',.025,now,1800);
    this.step++;
  }
}
