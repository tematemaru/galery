import * as THREE from 'three';
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
    this.createCards();
  }

  getPlane = () => {
    return this.group;
  }

  getCards = () => {
    return this.cards;
  }

  setPos =({ x, y }) => {
    this.group.position.x = -x;
    this.group.position.y = -y;
  }

  generatePositions = () => {
    const imgPerStrip = 6;
    const imgPerRow = 6;
    const positions = [];
    const w = 80 / imgPerStrip;
    const h = 40 / imgPerRow;
    
    for (let i = 0; i < imgPerStrip; i++) {
      for (let j = 0; j < imgPerRow; j++) {
        const x = (j) * w - 40 + 6.5;
        const y = i * h - 20 + 2.5;
        positions.push({ x, y });
      } 
    }
    return positions;
  }

  createCards = () => {
    const positions = this.generatePositions();
    this.textures.forEach((t, i) => {
      const pos = positions[i]
      const c = new ImageCard(t, {
        width: THREE.MathUtils.randFloat(4, 10),
        height: THREE.MathUtils.randFloat(4, 10),
        x: THREE.MathUtils.randFloat(pos.x - 5, pos.x + 5),
        y: THREE.MathUtils.randFloat(pos.y - 3, pos.y + 3),
        z: THREE.MathUtils.randFloat(0.1, 1),
      })
      this.group.add(c.getCard());
      // this.group.add(c.getPlane());
      this.cards.push(c);
    })
  }
}