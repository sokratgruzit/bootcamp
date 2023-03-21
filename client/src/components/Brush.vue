<template>
  <div id="webgl-brush"></div>
</template>
<script>
import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from "three.meshline";
//import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
const TWEEN = require("@tweenjs/tween.js");

export default {
  data() {
    return {
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      clock: new THREE.Clock(),
      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      windowHalfX: window.innerWidth / 2,
      windowHalfY: window.innerHeight / 2,
      width: window.innerWidth,
      height: window.innerHeight,
      vectors: [],
      lineG: null,
      lineM: null,
    };
  },
  methods: {
    myScene: async function () {
      this.scene = new THREE.Scene();
      let light = new THREE.AmbientLight(0xffffff);
      let container = document.getElementById("webgl-brush");

      this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
      this.camera.position.z = 20;

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.width, this.height);
      container.appendChild(this.renderer.domElement);
      let canvas = container.children[0];
      canvas.style.position = "fixed";
      canvas.style.top = "0";

      //this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      //this.controls.minDistance = 50;
      //this.controls.maxDistance = 200;

      this.scene.add(light);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
      dirLight1.position.set(1, 0.75, 0.5);
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
      dirLight2.position.set(-1, 0.75, -0.5);
      this.scene.add(dirLight2);

      this.scene.add(this.camera);

      this.lineG = new MeshLine();
      const textureLoader = new THREE.TextureLoader();

      this.lineM = new MeshLineMaterial({
        useMap: 1,
        map: textureLoader.load(require("../assets/parts/brush.svg")),
      });

      const mesh = new THREE.Mesh(this.lineG, this.lineM);
      this.scene.add(mesh);
    },
    render: async function () {
      this.raycaster.setFromCamera(this.mouse, this.camera);

      const intersects = this.raycaster.intersectObjects(
        this.scene.children,
        true
      );

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.physicallyCorrectLights = true;
      this.renderer.render(this.scene, this.camera);
    },
    animate: async function () {
      requestAnimationFrame(this.animate);
      TWEEN.update();
      await this.render();
    },
    onWindowResize: async function () {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;

      this.camera.updateProjectionMatrix();

      this.render();
    },
    async onPointerMove(event) {
      this.mouse.x = (event.clientX / this.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.height) * 2 + 1;

      let vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0);
      vector.unproject(this.camera);

      let dir = vector.sub(this.camera.position).normalize();
      let distance = -this.camera.position.z / dir.z;
      let pos = this.camera.position.clone().add(dir.multiplyScalar(distance));

      if (this.vectors.length < 35) {
        this.vectors.push(pos);
      }

      await this.drawCurve(this.vectors);
    },
    drawCurve: async function (vectors, type) {
      this.scene.children[4].material.opacity = 1;

      this.lineG.setPoints(vectors.flat());

      if (vectors.length === 34) {
        await this.removeCurve();
      }
    },
    removeCurve: async function () {
      new TWEEN.Tween(this.scene.children[4].material)
        .to({ opacity: 0 }, 1000)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onComplete(() => {
          this.vectors = [];
        })
        .start();
    },
  },
  async mounted() {
    if(window.innerWidth > 1023){
      await this.myScene();
      await this.animate();
      window.addEventListener("resize", this.onWindowResize, false);
      window.addEventListener("pointermove", this.onPointerMove);
    }
  },
};
</script>
<style scoped>
#webgl-brush {
  height: 100vh;
  width: 100%;
  position: fixed;
  pointer-events: none;
  z-index: 10;
}
@media (max-width: 1023px) {
  #webgl-brush {
    display: none;
  }
}
</style>
