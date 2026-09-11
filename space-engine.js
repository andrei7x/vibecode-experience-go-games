'use strict';
// Pure game simulation: seconds and canvas coordinates, independent of frame rate.
class SpaceGame {
  constructor(random = Math.random) { this.random = random; this.reset(); }
  reset(mode = 'normal', shield = false) {
    this.time = 0; this.level = 1; this.kills = 0; this.x = 380;
    this.mode = {easy: .75, normal: 1, hard: 1.3}[mode] || 1;
    this.shield = shield ? 'ready' : 'off'; this.over = false;
    this.targets = []; this.shots = []; this.hostile = []; this.sparks = [];
    this.spawnIn = .65; this.cooldown = 0; this.invincible = 0;
  }
  difficulty() {
    const ramp = Math.min(this.time / 100, 1.8);
    return {fall: 80 * this.mode + ramp * 55,
      spawn: Math.max(.4, 1.3 / (this.mode + ramp * .6)),
      fire: Math.max(.7, 2.2 / (this.mode + ramp * .6)),
      bullet: 160 * this.mode + ramp * 65};
  }
  burst(x, y, color) {
    for (let i=0;i<10;i++) this.sparks.push({x,y,vx:(this.random()-.5)*150,vy:(this.random()-.5)*150,life:.35,color});
  }
  hit(target) {
    if (this.invincible > 0) return;
    if (this.shield === 'active') {
      this.shield = 'used'; this.invincible = .8;
      this.burst(this.x+20,410,'#52e5ed');
    } else this.over = true;
  }
  update(dt, keys = {}) {
    if (this.over) return;
    dt = Math.min(Math.max(dt,0),.04);
    this.time += dt; this.level = 1 + Math.floor(this.time / 15);
    const d = this.difficulty();
    this.x = Math.max(0,Math.min(760,this.x + (Number(!!keys.right)-Number(!!keys.left))*390*dt));
    this.invincible = Math.max(0,this.invincible-dt);
    this.cooldown = Math.max(0,this.cooldown-dt);
    if (keys.fire && this.cooldown <= 0) {
      this.shots.push({x:this.x+17,y:385,w:6,h:18}); this.cooldown = .19;
    }
    this.spawnIn -= dt;
    if (this.spawnIn <= 0) {
      this.spawnIn += d.spawn;
      const enemy = this.random() < .55;
      this.targets.push({x:20+this.random()*710,y:-45,w:enemy?44:38,h:enemy?34:38,
        enemy,fireIn:.65+this.random()*.55,phase:this.random()*6.28});
    }
    for (const o of this.targets) {
      o.y += d.fall * (o.enemy ? .7 : 1) * dt;
      if (o.enemy) {
        o.x = Math.max(0,Math.min(756,o.x+Math.sin(this.time*2+o.phase)*24*dt));
        o.fireIn -= dt;
        if (o.fireIn <= 0 && o.y > 15 && o.y < 305) {
          o.fireIn = d.fire;
          const x=o.x+o.w/2, y=o.y+o.h;
          // Bounded aiming leaves room to dodge; projectiles do not track the player.
          const vx=Math.max(-100,Math.min(100,(this.x+20-x)*.35));
          this.hostile.push({x:x-4,y,w:8,h:15,vx,vy:d.bullet});
        }
      }
    }
    for (const b of this.shots) {
      b.y -= 600*dt;
      for (const o of this.targets) if (!o.dead && !b.dead && SpaceGame.overlap(b,o)) {
        o.dead = true; b.dead = true; this.kills++;
        this.burst(o.x+o.w/2,o.y+o.h/2,o.enemy?'#ff798e':'#b4a0ff');
      }
    }
    for (const b of this.hostile) { b.y += b.vy*dt; b.x += b.vx*dt; }
    const player = {x:this.x+4,y:397,w:32,h:29};
    for (const o of [...this.targets,...this.hostile]) {
      if (!o.dead && SpaceGame.overlap(player,o)) { o.dead=true; this.hit(o); }
    }
    this.targets = this.targets.filter(o=>!o.dead && o.y<490);
    this.shots = this.shots.filter(o=>!o.dead && o.y>-25);
    this.hostile = this.hostile.filter(o=>!o.dead && o.y<480 && o.x>-20 && o.x<820);
    for (const s of this.sparks) { s.x+=s.vx*dt; s.y+=s.vy*dt; s.life-=dt; }
    this.sparks = this.sparks.filter(s=>s.life>0);
  }
  static overlap(a,b) { return a.x<b.x+b.w && a.x+a.w>b.x && a.y<b.y+b.h && a.y+a.h>b.y; }
}
