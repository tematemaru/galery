import * as THREE from 'three';
// import gsap from 'gsap';

export default class GradietnHelper {
  constructor(radius = 10) {
    this.radius = radius;
    this.x = 0;
    this.y = 0;
    this.z = 1;
    
    this.initPlane();
  }

  getCenterCoord = () => {
    return this.card.position;
  }

  initPlane = () => {
    this.geometry = new THREE.CircleGeometry( this.radius, 32 );
    this.material = new THREE.MeshBasicMaterial( { color: 0xbababa } );

    this.card = new THREE.Mesh( this.geometry, this.material );
    this.card.position.x = this.x;
    this.card.position.y = this.y;
    this.card.position.z = this.z;
  }

  getCard = () => {
    return this.card;
  }

  setPosition = ({ x, y }) => {
    this.card.position.x = x;
    this.card.position.y = y;
  }

  setZpos = (z) => {
    this.card.position.z = z;
  }
}