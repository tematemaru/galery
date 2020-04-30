import * as THREE from 'three';
import gsap from 'gsap';

export default class ImageCard {
  constructor(texture, params) {
    this.planeGeometry = new THREE.PlaneGeometry(13, 5, 1);
    
    this.planeMaterial = new THREE.MeshBasicMaterial({ color: this.color });
    this.plane = new THREE.Mesh(this.planeGeometry, this.planeMaterial);
    this.vertexSrc = document.getElementById('shader-vs').innerText;
    this.fragmentSrc = document.getElementById('shader-fs').innerText;
    this.texture = texture;
    const { x, y } = this.getUvRate(this.texture.image, params.width, params.height);
    this.uvRate = new THREE.Vector2(x, y);
    this.radius = 1;
    this.progress = 0;
    
    this.initCard(params);
  }

  getCenterCoord = () => {
    return this.card.position;
  }

  getPlane = () => {
    return this.plane;
  }

  getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '0x';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return Number(color);
  }

  getUvRate = (image, width, height) => {
    const wrapperAspect = width / height;
    const imageAspect = image.width / image.height;
  
    if (wrapperAspect > imageAspect) {
      const sizes = {
        width,
        height: (width / image.width) * image.height,
      };
      return { x: 1, y: (height / sizes.height) / (width / sizes.width) };
    }
    const sizes = {
      width: (height / image.height) * image.width,
      height,
    };
    const x = (width / sizes.width) / (height / sizes.height);
    return {x, y: 1};
  };
  

  initCard = (params) => {
    this.w = params.width;
    this.h = params.height;
    this.x = params.x;
    this.y = params.y;
    this.z = params.z;

    this.geometry = new THREE.PlaneBufferGeometry(this.w, this.h, 1, 1);
    this.material = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      uniforms: {
        texture: {
          value: this.texture,
        },
        time: { type: "f", value: 0 },
        progress: { type: "f", value: 5 },
        angle: { type: "f", value: 0.2 },
        uvRate: {
          type: 'v2',
          value: this.uvRate,
        },
        pixeles: {type: 'v2', value: new THREE.Vector2(this.w, this.h)},
      },
      vertexShader: this.vertexSrc,
      fragmentShader: this.fragmentSrc
    });

    this.card = new THREE.Mesh( this.geometry, this.material );
    this.card.position.x = this.x;
    this.card.position.y = this.y;
    this.card.position.z = this.z;
    this.plane.position.x = this.x;
    this.plane.position.y = this.y;
    this.plane.position.z = 1;
  }

  getCard = () => {
    return this.card;
  }

  setZpos = (z) => {
    this.card.position.z = z;
  }

  setXpos = (x) => {
    this.card.position.x = x;
  }

  setYpos = (y) => {
    this.card.position.y = y;
  }

  rollingCard = (duration = 5, pos) => {
    this.isHover = true;
    gsap.to(this.material.uniforms.progress, {
      duration,
      value: 5,
    });
  }

  unRollingCard = (duration, pos) => {
    gsap.to(this.material.uniforms.progress, {
      duration,
      value: 0,
    });
  }
}