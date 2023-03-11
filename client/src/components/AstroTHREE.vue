<template>
    <div id="webgl-astro"></div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const TWEEN = require('@tweenjs/tween.js');
export default {
    name: "AstroTHREE",
    data() {
        return {
            scene: null,
            camera: null,
            controls: null,
            renderer: null,
            clock: new THREE.Clock(),
            mouse: new THREE.Vector2(),
            raycaster: new THREE.Raycaster(),
            windowHalfX: 350 / 2,
            windowHalfY: 350 / 2,
            width: 350,
            height: 350,
            hoveredHyper: false,
            int: [],
            hyperPos: {
                x: 0,
                y: 0,
                s: 5.3
            },
            isPointerDown: false,
            stopScene: false,
            anim: {}
        }
    },
    watch: {
        /*"$store.state.visibleObjects.intro_hand": function() {
            if (this.$store.state.visibleObjects.intro_hand) {
                this.stopScene = false;
                this.animate();
            } else {
                this.stopScene = true;
            }
        }*/
    },
    methods: {
        myScene: function() {
            this.scene = new THREE.Scene();
            let light = new THREE.AmbientLight(0xffffff);
            let container = document.getElementById("webgl-astro");
            
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 1000);
            this.camera.position.z = 120;
            this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            this.renderer.setSize(this.width, this.height);            
            container.appendChild(this.renderer.domElement);
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableZoom = false;
            this.controls.enableDamping = true;
            this.controls.dampingFactor = 0.5;
            this.controls.enablePan = false;
            this.scene.add(light);
            const dirLight1 = new THREE.DirectionalLight(0xffffff, 1);
            dirLight1.position.set(1, 0, 500);
            this.scene.add(dirLight1);
            const dirLight2 = new THREE.DirectionalLight(0xffffff, 1);
            dirLight2.position.set(-1, 0, -500);
            this.scene.add(dirLight2);
            this.scene.add(this.camera);
            
            this.loadAstro();
        },
        render: function() {
            if (!this.stopScene) {
                let astro = this.scene.getObjectByName("astro");

                if (astro !== undefined) {
                    if (astro.position.y === 0) {
                        new TWEEN.Tween(astro.position)
                        .to({ y: -5 }, 1000)
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                        new TWEEN.Tween(astro.rotation)
                        .to({ y: 0.1 }, 1000)
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                    }
                    if (astro.position.y === -5) {
                        new TWEEN.Tween(astro.position)
                        .to({ y: 0 }, 1000)
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                        new TWEEN.Tween(astro.rotation)
                        .to({ y: 0 }, 1000)
                        .easing(TWEEN.Easing.Sinusoidal.InOut)
                        .start();
                    }

                    astro.rotation.x += 0.01;
                    astro.rotation.z -= 0.01;
                }

                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.physicallyCorrectLights = true;
                this.renderer.render(this.scene, this.camera);
                this.controls.update();
            }
        },
        animate: async function() {
            if (!this.stopScene) {
                requestAnimationFrame(this.animate);
                TWEEN.update();
                this.render();
            }
        },
        onWindowResize: function() { 
            if (!this.stopScene) {
                this.windowHalfX = window.innerWidth / 2;
                this.windowHalfY = window.innerHeight / 2;
                this.camera.aspect = this.width / this.height;
                this.camera.updateProjectionMatrix();
                this.renderer.setSize(this.width, this.height);
                this.render();
            }
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
        loadAstro: function() {
            const loader = new GLTFLoader();
            const textureLoader = new THREE.TextureLoader();
            let scene = this.scene;
            let obj_uri =`${process.env.BASE_URL}three_models/astro.glb`;
            let anim = this.anim;
            loader.load(obj_uri, function (gltf) {
                let mesh = gltf.scene;
                console.log(mesh)
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
                mesh.scale.set(35, 35, 35);
                mesh.name = "astro";
                //mesh.rotation.y = 3;
                //mesh.position.x = -30;
                //mesh.position.y = -20;

                /*let mixer = new THREE.AnimationMixer(mesh);
                let actions = gltf.animations[0];

                mixer.clipAction(actions).play();
                anim.mixer = mixer;*/
                scene.add(mesh);
            });
        }
    },
    mounted() {
        this.myScene();
        this.animate();
        let webGlEl = document.getElementById('webgl-astro');
        
        webGlEl.addEventListener('mouseenter', () => {
            this.hoveredHyper = true;
        });

        webGlEl.addEventListener('mouseleave', () => {
            this.hoveredHyper = false;
        });
        
        window.addEventListener('resize', this.onWindowResize, false);
        window.addEventListener('pointermove', this.onPointerMove);
        window.addEventListener('mouseup', this.onPointerUp, false);
        window.addEventListener('mousedown', this.onPointerDown, false);
    }
}
</script>
<style scoped>
    #webgl-astro {
        height: 350px;
        width: 350px;
        position: absolute;
        pointer-events: auto !important;
        z-index: 10;
        top: 0;
        left: 5%;
        cursor: pointer;
    }
</style>