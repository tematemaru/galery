import React from 'react';
import gsap from 'gsap';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import images from './hotGirls';

import BgPlane from './BgPlane';
import GradietnHelper from './GradietnHelper';

import './Gallery.css';

export default class Gallery extends React.PureComponent {
  constructor(props) {
    super(props);
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector3();
    this.textures = [];
    this.radius = 5;
    this.point = new THREE.Vector3();
  }
  componentDidMount() {
    this.preload();
  }

  preload = () => {
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    images.forEach(url => {
      this.textures.push(loader.load(url));
    });

    loadManager.onLoad = () => {
      this.initScane();
      this.addListeners();
      this.animate();
    };    
  }

  initScane = () => {
    this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 1000 );
    this.camera.position.z = 10;
    this.scene = new THREE.Scene();

    this.Plane = new BgPlane(this.textures);
    this.GradietnHelper = new GradietnHelper(2.5);
    this.scene.add(this.GradietnHelper.getCard());
    this.scene.add(this.Plane.getPlane());
    
 
    this.renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.rootNode.appendChild( this.renderer.domElement );

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.25
    this.controls.enableZoom = true;
  }

  addListeners = () => {
    window.addEventListener( 'mousemove', this.onMouseMove, false );
  }

  onMouseMove = (event) => {
    gsap.to(this.mouse, {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -( event.clientY / window.innerHeight ) * 2 + 1,
      duration: 1,
      value: 5,
      onUpdate: () => {
        this.camera.position.x *= this.mouse.x;
        this.camera.position.y *= this.mouse.y;
        // this.Plane.setPos(this.point);
        this.Plane.getCards().forEach(c => {
          const dist = this.point.distanceTo(c.getCenterCoord());
          const z = (THREE.MathUtils.clamp(this.radius / dist, 0.1, 10));
          c.setZpos(z);
        })
      }
    });
  }

  animate = () => {
    requestAnimationFrame( this.animate );
    this.raycaster.setFromCamera(this.mouse, this.camera);
    this.renderer.render(this.scene,this.camera );
    var intersects = this.raycaster.intersectObjects([this.Plane.plane]);
	  for ( let i = 0; i < intersects.length; i++ ) {
      this.point = intersects[i].point;
      
		  // intersects[i].object.material.color.set( 0xff0000 );
    }
    this.GradietnHelper.setPosition(this.point)
  }

  render() {
    return(
      <div className="Gallery" ref={(node) => { this.rootNode = node}} />
    );
  }
  
}
