import * as THREE from 'three';
import ImageCard from './ImageCard';
// import { Vector3 } from 'three';

export default class BgPlane {
  constructor(textures) {
    this.cards = [];
    this.textures = textures;
    this.geometry = new THREE.PlaneGeometry(80, 40, 1);
    this.material = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
    this.plane = new THREE.Mesh(this.geometry, this.material);
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

  setPositions = () => {
    for (let i = 0; i < 40; i++) {
      for (let j = 0; j < 20; j++) {
      
      } 
    }
  }

  createCards = () => { 
    this.textures.forEach(t => {
      const c = new ImageCard(t, {
        width: THREE.MathUtils.randFloat(2.5, 5),
        height: THREE.MathUtils.randFloat(2.5, 5),
        x: THREE.MathUtils.randFloat(-30, 30),
        y: THREE.MathUtils.randFloat(-10, 10),
        z: 0.1,
      })
      this.group.add(c.getCard())
      this.cards.push(c);
    })
  }
}