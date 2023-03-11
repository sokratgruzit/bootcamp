<template>
  <div id="webgl-holder"></div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { sphere_fragment, cloud_fragment } from "../assets/shaders/fragment.js";
import { sphere_vertex, cloud_vertex } from "../assets/shaders/vertex.js";
const TWEEN = require("@tweenjs/tween.js");

export default {
  name: "THREE",
  props:{
    scrollTop: {}
  },
  data() {
    return {
      threeMounted: true,
      scene: null,
      camera: null,
      controls: null,
      renderer: null,
      clock: new THREE.Clock(),
      mouse: new THREE.Vector2(),
      raycaster: new THREE.Raycaster(),
      windowHalfX: 500 / 2,
      windowHalfY: 500 / 2,
      width: 500,
      height: 500,
      isPointerDown: false,
      scaleVal: 1.7,
      posLeft: 0,
      anim: {},
      animSorates: {},
      pointAnim: {},
      uniforms: null,
      sphere: null,
      webglHovered: false,
      elOffsets: {
        onLoad: true,
        intro: {
          x: 0,
          y: 0
        },
        socrates: {
          x: 0,
          y: 0
        },
        techno: {
          x: 0,
          y: 0
        },
        sphere: {
          x: 0,
          y: 0
        },
        hello: {
          x: 0,
          y: 0
        }
      },
      playIntroHand: true,
      playSocrates: true,
      playHelloHand: true,
      playTechHand: true
    };
  },
  watch: {
    "$store.state.scrolled": function () {
      this.animateHolder();
    },
    "$store.state.sliderCount": function () {
      if (this.uniforms !== null) {
        if (this.$store.state.sliderCount === 0) {
          new TWEEN.Tween(this.uniforms.noiseDelta)
            .to({ value: 1.0 }, 500)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        }
        if (this.$store.state.sliderCount === 1) {
          new TWEEN.Tween(this.uniforms.noiseDelta)
            .to({ value: 5.0 }, 500)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        }
        if (this.$store.state.sliderCount === 2) {
          new TWEEN.Tween(this.uniforms.noiseDelta)
            .to({ value: 10.0 }, 500)
            .easing(TWEEN.Easing.Quadratic.In)
            .start();
        }
      }
    },
    "$store.state.visibleObjects.intro_hand": function () {
      let rock_hand = this.scene.getObjectByName("rock_hand");

      if (this.$store.state.visibleObjects.intro_hand) {
        if (rock_hand !== undefined) {
          new TWEEN.Tween(rock_hand.scale)
          .to({ x: 42, y: 42, z: 42 }, 500)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        }
      } else {
        if (rock_hand !== undefined) {
          new TWEEN.Tween(rock_hand.scale)
            .to({ x: 0, y: 0, z: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
      }
    },
    "$store.state.visibleObjects.socrates": function () {
      let socrates = this.scene.getObjectByName("socrates");

      if (socrates !== undefined) {
        if (this.$store.state.visibleObjects.socrates) {
          new TWEEN.Tween(socrates.scale)
            .to({ x: 150, y: 150, z: 150 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        } else {
          new TWEEN.Tween(socrates.scale)
            .to({ x: 0, y: 0, z: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
      }
    },
    "$store.state.visibleObjects.techno_hand": function () {
      let point_hand = this.scene.getObjectByName("point_hand");
      let sphere = this.scene.getObjectByName("sphere");

      if (point_hand !== undefined) {
        if (this.$store.state.visibleObjects.techno_hand) {
          if (this.$store.state.direction === "down") {
            //this.loadSphere();
          } else {
            //this.scene.remove(sphere);
          }

          new TWEEN.Tween(point_hand.scale)
            .to({ x: 34, y: 34, z: 34 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        } else {
          new TWEEN.Tween(point_hand.scale)
            .to({ x: 0, y: 0, z: 0 }, 500)
            .easing(TWEEN.Easing.Quadratic.Out)
            .start();
        }
      }
    },
    "$store.state.visibleObjects.sphere": function () {
      // let sphere = this.scene.getObjectByName("sphere");

      // if (sphere !== undefined) {
      //   if (this.$store.state.visibleObjects.sphere) {
      //     new TWEEN.Tween(sphere.scale)
      //     .to({ x: this.scaleVal, y: this.scaleVal, z: this.scaleVal }, 500)
      //     .easing(TWEEN.Easing.Quadratic.Out)
      //     .start();
      //   } else {
      //     new TWEEN.Tween(sphere.scale)
      //     .to({ x: 0, y: 0, z: 0 }, 500)
      //     .easing(TWEEN.Easing.Quadratic.Out)
      //     .start();
      //   }
      // }
    },
    "$store.state.visibleObjects.hello_hand": function () {
      let hello_hand = this.scene.getObjectByName("hello_hand");

      if (hello_hand !== undefined) {
        if (this.$store.state.visibleObjects.hello_hand) {
          new TWEEN.Tween(hello_hand.scale)
          .to({ x: 42, y: 42, z: 42 }, 500)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        } else {
          new TWEEN.Tween(hello_hand.scale)
          .to({ x: 0, y: 0, z: 0 }, 500)
          .easing(TWEEN.Easing.Quadratic.Out)
          .start();
        }
      }
    }
  },
  computed:{
    screenWdith(){
      return window.innerWidth;
    }
  },
  methods: {
    myScene: function () {
      this.scene = new THREE.Scene();
      let light = new THREE.AmbientLight(0xffffff);
      let container = document.getElementById("webgl-holder");

      this.camera = new THREE.PerspectiveCamera(
        45,
        this.width / this.height,
        1,
        1000
      );
      this.camera.position.z = 120;
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(this.width, this.height);
      container.appendChild(this.renderer.domElement);
      /*this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableZoom = false;
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
      this.controls.enablePan = false;*/
      this.scene.add(light);
      const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
      dirLight1.position.set(1, 0, 500);
      this.scene.add(dirLight1);
      const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
      dirLight2.position.set(-1, 0, -500);
      this.scene.add(dirLight2);
      this.scene.add(this.camera);

      this.loadRockHand();
      this.loadSocrates();
      this.loadPointHand();
      this.loadHelloHand();
    },
    render: async function () {
      let delta = this.clock.getDelta();
      let webglEl = document.getElementById("webgl-holder");
      let rock_hand = this.scene.getObjectByName("rock_hand");
      let socrates = this.scene.getObjectByName("socrates");
      let point_hand = this.scene.getObjectByName("point_hand");
      let sphere = this.scene.getObjectByName("sphere");
      let hello_hand = this.scene.getObjectByName("hello_hand");

      if (this.$store.state.visibleObjects.intro_hand) {
        if (rock_hand !== undefined) {
          if (this.webglHovered) {
            setTimeout(() => {
              this.playIntroHand = false;
            }, 6000.666666507720947);

            if (this.playIntroHand) {
              if (this.anim.mixer != null) this.anim.mixer.update(delta);
            }
          } else {
            setTimeout(() => {
              this.playIntroHand = true;
            }, 6000.666666507720947);

            if (!this.playIntroHand) {
              if (this.anim.mixer != null) this.anim.mixer.update(-delta);
            }
          }

          rock_hand.rotation.y += 0.01;
        }
      } 

      if (this.$store.state.visibleObjects.socrates) {
        if (socrates !== undefined) {
          if (socrates.position.y === -40) {
            new TWEEN.Tween(socrates.position)
            .to({ y: -35 }, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
            new TWEEN.Tween(socrates.rotation)
            .to({ y: -0.1 }, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
          }
          if (socrates.position.y === -35) {
            new TWEEN.Tween(socrates.position)
            .to({ y: -40 }, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
            new TWEEN.Tween(socrates.rotation)
            .to({ y: 0.1 }, 1000)
            .easing(TWEEN.Easing.Sinusoidal.InOut)
            .start();
          }
        }

        if (this.webglHovered && socrates !== undefined) {
          setTimeout(() => {
            this.playSocrates = false;
          }, 2000.125);

          if (this.playSocrates) {
            if (this.animSorates.mixer != null) this.animSorates.mixer.update(delta);
          } 
        }

        if (!this.webglHovered && socrates !== undefined) {
          setTimeout(() => {
            this.playSocrates = true;
          }, 2000.125);

          if (!this.playSocrates) {
            if (this.animSorates.mixer != null) this.animSorates.mixer.update(-delta);
          } 
        }
      } 

      if (this.$store.state.visibleObjects.techno_hand) {
        if (point_hand !== undefined) {
          if (this.webglHovered) {
            setTimeout(() => {
              this.playTechHand = false;
            }, 1000);

            if (this.playTechHand) {
              new TWEEN.Tween(point_hand.position)
                .to({ y: -30 }, 100)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();

              new TWEEN.Tween(point_hand.rotation)
                .to({ x: 0, y: 0, z: -5.9 }, 100)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();

              if (this.pointAnim.mixer != null) this.pointAnim.mixer.update(delta);
            }
          } else {
            setTimeout(() => {
              this.playTechHand = true;
            }, 1000);

            if (!this.playTechHand) {
              if (this.pointAnim.mixer != null) this.pointAnim.mixer.update(-delta);
            }

            if (point_hand.position.x === -30) {
              new TWEEN.Tween(point_hand.position)
                .to({ x: -25, y: -42 }, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();
              new TWEEN.Tween(point_hand.rotation)
                .to({ x: 2.5, y: -0.5, z: -4.7 }, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();
            }

            if (point_hand.position.x === -25) {
              new TWEEN.Tween(point_hand.position)
                .to({ x: -30 }, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();
              new TWEEN.Tween(point_hand.rotation)
                .to({ z: -4.9 }, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .start();
            }
          }
        }
      } 

      // if (this.$store.state.visibleObjects.sphere) {
      //   if (sphere !== undefined) {
      //     sphere.rotation.y -= 0.02;
      //   }
      // } 

      if (this.$store.state.visibleObjects.hello_hand) {
        if (hello_hand !== undefined) {
          if (this.webglHovered) {
            setTimeout(() => {
              this.playHelloHand = false;
            }, 2000.5);

            if (this.playHelloHand) {
              if (this.anim.mixer != null) this.anim.mixer.update(delta);
            }
          } else {
            setTimeout(() => {
              this.playHelloHand = true;
            }, 2000.5);

            if (!this.playHelloHand) {
              if (this.anim.mixer != null) this.anim.mixer.update(-delta);
            }
          }

          hello_hand.rotation.y += 0.01;
        }
      } 

      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.physicallyCorrectLights = true;
      this.renderer.render(this.scene, this.camera);
      //this.controls.update();
    },
    animate: async function () {
      if (this.threeMounted){
        requestAnimationFrame(this.animate);

        TWEEN.update();
        await this.render();
      }
    },
    onWindowResize: function () {
      this.windowHalfX = window.innerWidth / 2;
      this.windowHalfY = window.innerHeight / 2;
      this.camera.updateProjectionMatrix();
      this.render();
    },
    onPointerMove(event) {
      this.mouse.x = (event.clientX / this.width) * 2 - 1;
      this.mouse.y = -(event.clientY / this.height) * 2 + 1;
    },
    onPointerDown: function (event) {
      if (event.isPrimary === false) return;
      this.isPointerDown = true;
    },
    onPointerUp: function () {
      if (event.isPrimary === false) return;
      this.isPointerDown = false;
    },
    animateHolder() {
      let scrolled = this.$store.state.scrolled;
      let el = document.getElementById("webgl-holder");
      let introTop = document.getElementById("scroll-rock-hand").getBoundingClientRect().top;
      let introLeft = document.getElementById("scroll-rock-hand").getBoundingClientRect().left;
      let socratesTop = document.getElementById("scroll-socrates").getBoundingClientRect().top ;
      let socratesLeft = document.getElementById("scroll-socrates").getBoundingClientRect().left;
      let technoTop = document.getElementById("scroll-point-hand").getBoundingClientRect().top;
      let technoLeft = document.getElementById("scroll-point-hand").getBoundingClientRect().left;
      let sphereTop = document.getElementById("scroll-sphere").getBoundingClientRect().top;
      let sphereLeft = document.getElementById("scroll-sphere").getBoundingClientRect().left;
      let helloTop = document.getElementById("scroll-hello").getBoundingClientRect().top ;
      let helloLeft = document.getElementById("scroll-hello").getBoundingClientRect().left;

      //static top 
      let introTopStatic = introTop + this.scrollTop;
      let socratesTopStatic = socratesTop + this.scrollTop ;
      let technoTopStatic = technoTop + this.scrollTop;
      let sphereTopStatic = sphereTop + this.scrollTop;
      let helloTopStatic = helloTop + this.scrollTop ;
      let webglPosY = 0;
      let webglPosX = 0;

      if (this.elOffsets.onLoad) {
        this.elOffsets.intro.x = introLeft;
        this.elOffsets.intro.y = introTop;
        this.elOffsets.socrates.x = socratesLeft;
        this.elOffsets.socrates.y = socratesTop;
        this.elOffsets.techno.x = technoLeft;
        this.elOffsets.techno.y = technoTop;
        this.elOffsets.sphere.x = sphereLeft;
        this.elOffsets.sphere.y = sphereTop;
        this.elOffsets.hello.x = helloLeft;
        this.elOffsets.hello.y = helloTop;
        this.elOffsets.onLoad = false;
      }

      if (introTop > 0) {
        webglPosX = this.elOffsets.intro.x;
        webglPosY = introTopStatic;
      } else if (socratesTop > 0) {
        webglPosX = this.elOffsets.socrates.x;
        webglPosY = socratesTopStatic;
      } else if (technoTop > 0) {
        webglPosX = this.elOffsets.techno.x;
        webglPosY = technoTopStatic;
      } else if (sphereTop > 0) {
        webglPosX = this.elOffsets.sphere.x;
        webglPosY = sphereTopStatic;
      } else if (helloTop > 0) {
        webglPosX = this.elOffsets.hello.x;
        webglPosY = helloTopStatic;
      } 

      el.style.setProperty(
        "transform",
        "translate(" + webglPosX + "px, " + webglPosY + "px)"
      );
    },
    loadSocrates() {
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();
      let scene = this.scene;
      let obj_uri =`${process.env.BASE_URL}three_models/socrates.glb`;
      let anim = this.animSorates;
      loader.load(obj_uri, function (gltf) {
        let mesh = gltf.scene;
        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true; 
            node.material.side = THREE.DoubleSide;
          }
        });
        mesh.children[0].material = new THREE.MeshPhongMaterial({
          specular: 0x111111,
          map: textureLoader.load(require("../assets/parts/hand_base_stone.jpg")),
          specularMap: textureLoader.load(require("../assets/parts/hand_base_stone.jpg")),
          normalMap: textureLoader.load(require("../assets/parts/hand_base_blue.jpg")),
          shininess: 100
        });
        mesh.name = "socrates";
        mesh.scale.set(0, 0, 0);
        mesh.position.x = -20;
        mesh.position.y = -40;

        let mixer = new THREE.AnimationMixer(mesh);
        let clip = gltf.animations[0];

        mixer.clipAction(clip).play();
        anim.mixer = mixer;
        scene.add(mesh);
      });
    },
    loadRockHand() {
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();
      let scene = this.scene;
      let obj_uri =`${process.env.BASE_URL}three_models/rock_hand.glb`;
      let anim = this.anim;
      loader.load(obj_uri, function (gltf) {
        let mesh = gltf.scene;
        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.side = THREE.DoubleSide;
          }
        });
        /*mesh.children[3].children[1].material = new THREE.MeshPhongMaterial({
          specular: 0x000000,
          map: textureLoader.load(require("../assets/parts/lether.jpg")),
          specularMap: textureLoader.load(require("../assets/parts/lether.jpg")),
          normalMap: textureLoader.load(require("../assets/parts/hand_base_blue.jpg")),
          shininess: 100
        });*/
        mesh.scale.set(42, 42, 42);
        mesh.name = "rock_hand";
        mesh.rotation.y = 3;
        mesh.position.x = -30;
        mesh.position.y = -20;

        let mixer = new THREE.AnimationMixer(mesh);
        let actions = gltf.animations[0];

        mixer.clipAction(actions).play();
        anim.mixer = mixer;
        scene.add(mesh);
      });
    },
    loadPointHand() {
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();
      let scene = this.scene;
      let obj_uri =  `${process.env.BASE_URL}three_models/point_hand.glb`;
      let anim = this.pointAnim;
      loader.load(obj_uri, function (gltf) {
        let mesh = gltf.scene;
        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.side = THREE.DoubleSide;
          }
        });
        /*mesh.children[0].material = new THREE.MeshPhongMaterial({
          specular: 0x000000,
          map: textureLoader.load(require("../assets/parts/hand_base_stone.jpg")),
          specularMap: textureLoader.load(require("../assets/parts/hand_base_stone.jpg")),
          normalMap: textureLoader.load(require("../assets/parts/hand_base_blue.jpg")),
          shininess: 100
        });*/

        mesh.name = "point_hand";
        mesh.scale.set(0, 0, 0);

        mesh.rotation.z = -4.9;
        mesh.rotation.x = 2.5;
        mesh.rotation.y = -0.5;
        mesh.position.x = -30;
        mesh.position.y = -42;

        let mixer = new THREE.AnimationMixer(mesh);
        let actions = gltf.animations[0];

        mixer.clipAction(actions).play();
        anim.mixer = mixer;
        scene.add(mesh);
      });
    },
    loadSphere() {
      let geometry = new THREE.SphereBufferGeometry(
        20,
        250,
        250
      );
      
      if (this.screenWdith < 1024) {
        this.scaleVal = 1.2;
        this.posLeft = -21.5;
      } else {
        this.scaleVal = 1.7;
        this.posLeft = -11;
      }
      const textureLoader = new THREE.TextureLoader();
      let texture = textureLoader.load(require("../assets/circle.jpg"));

      this.uniforms = {
        time: { type: "f", value: 0.0 },
        noiseDelta: { type: "f", value: 0.0 },
        uColor: { value: new THREE.Color(0x000000) },
        pointTexture: { value: texture },
      };

      let material = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        vertexShader: sphere_vertex,
        fragmentShader: sphere_fragment,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });

      this.sphere = new THREE.Points(geometry, material);
      this.sphere.name = "sphere";
      this.sphere.position.y = -12;
      this.sphere.position.x = this.posLeft;
      this.sphere.scale.set(0, 0, 0);

      this.scene.add(this.sphere);
    },
    loadHelloHand() {
      const loader = new GLTFLoader();
      const textureLoader = new THREE.TextureLoader();
      let scene = this.scene;
      let obj_uri = `${process.env.BASE_URL}three_models/rock_hand.glb`;
      let anim = this.anim;
      loader.load(obj_uri, function (gltf) {
        let mesh = gltf.scene;
        gltf.scene.traverse(function (node) {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.material.side = THREE.DoubleSide;
          }
        });

        mesh.name = "hello_hand";
        mesh.scale.set(0, 0, 0);

        mesh.rotation.y = 3;
        mesh.position.x = -35;
        mesh.position.y = -28;

        let mixer = new THREE.AnimationMixer(mesh);
        let actions = gltf.animations[0];

        mixer.clipAction(actions).play();
        anim.mixer = mixer;
        scene.add(mesh);
      });
    },
  },
  async mounted() {
    let _this = this;
    this.myScene();
    this.animate();
    let webglEl = document.getElementById("webgl-holder");

    webglEl.addEventListener("mouseenter", () => {
      this.webglHovered = true;
    });

    webglEl.addEventListener("mouseleave", () => {
      this.webglHovered = false;
    });

    window.addEventListener("resize", this.onWindowResize, false);
    window.addEventListener("pointermove", this.onPointerMove);
    window.addEventListener("mouseup", this.onPointerUp, false);
    window.addEventListener("mousedown", this.onPointerDown, false);
  },
  beforeDestroy () {
    window.removeEventListener("resize", this.onWindowResize, false);
    window.removeEventListener("pointermove", this.onPointerMove);
    window.removeEventListener("mouseup", this.onPointerUp, false);
    window.removeEventListener("mousedown", this.onPointerDown, false);
    while(this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0]);
    }
    
    this.threeMounted = false;
  }
};
</script>
<style scoped>
#webgl-holder {
  height: 1px;
  width: 1px;
  position: relative;
  z-index: 10;
  transition-duration: 0.5s;
  /* pointer-events: none; */
}
#webgl-holder ::v-deep canvas{
  transform: translateY(-500px);
  pointer-events: auto !important;
  cursor: pointer;
}
</style>
