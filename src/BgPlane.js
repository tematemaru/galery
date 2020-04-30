import * as THREE from 'three';
import gsap from 'gsap';
import ImageCard from './ImageCard';
// import { Vector3 } from 'three';

export default class BgPlane {
  constructor(textures) {
    this.cards = [];
    this.textures = textures;
    this.geometry = new THREE.PlaneGeometry(180, 140, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.position.z = -1;
    this.group = new THREE.Group();
    this.group.add(this.plane);
    this.positions = [];
    this.setInitPositions();
    this.createCards();
    this.initAnimation();
  }

  initAnimation = () => {
    const finPos = this.generateShafflePositions();
    for (let i = 0; i < this.positions.length; i++) {
      gsap.to(this.positions[i], {
        x: finPos[i].x,
        y: finPos[i].y,
        duration: 1,
        delay: i * 0.01,
        onUpdate: () => {
          this.cards[i].setXpos(this.positions[i].x);
          this.cards[i].setYpos(this.positions[i].y);
        },
        onComplete: () => {
          this.isAnimationEnd = true;
        }
      });
    }
  }

  generateShafflePositions = () => {
    const imgPerStrip = 6;
    const imgPerRow = 6;
    const positions = [];
    const w = 80 / imgPerStrip;
    const h = 40 / imgPerRow;
    
    for (let i = 0; i < imgPerStrip; i++) {
      for (let j = 0; j < imgPerRow; j++) {
        const x = (j) * w - 40 + 6.5;
        const y = i * h - 20 + 2.5;
        positions.push({
          x: THREE.MathUtils.randFloat(x - 5, x + 5),
          y: THREE.MathUtils.randFloat(y - 3, y + 3)
        });
      } 
    }
    return positions;
  }

  setInitPositions = () => {
    const imgPerStrip = 6;
    const imgPerRow = 6;
    for (let i = 0; i < imgPerStrip; i++) {
      for (let j = 0; j < imgPerRow; j++) {
        this.positions.push({ x: 0, y: 0 });
      } 
    }
  }

  getPlane = () => {
    return this.group;
  }

  getCards = () => {
    return this.cards;
  }

  setPos = ({ x, y }) => {
    this.group.position.x = -x;
    this.group.position.y = -y;
  }

  createCards = () => {
    const positions = this.positions;
    this.textures.forEach((t, i) => {
      const pos = positions[i]
      const c = new ImageCard(t, {
        width: THREE.MathUtils.randFloat(4, 10),
        height: THREE.MathUtils.randFloat(4, 10),
        x: pos.x,
        y: pos.y,
        z: (this.textures.length - i) / this.textures.length,
      })
      this.group.add(c.getCard());
      // this.group.add(c.getPlane());
      this.cards.push(c);
    })
  }
}