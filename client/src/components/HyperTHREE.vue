<template>
    <div id="webgl-intro" ref="intro"></div>
</template>
<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
const TWEEN = require('@tweenjs/tween.js');
export default {
    name: "HyperTHREE",
    data() {
        return {
            scene: null,
            camera: null,
            controls: null,
            renderer: null,
            clock: new THREE.Clock(),
            mouse: new THREE.Vector2(),
            raycaster: new THREE.Raycaster(),
            windowHalfX: 130 / 2,
            windowHalfY: 130 / 2,
            width: 130,
            height: 130,
            cube1: null,
            cube2: null,
            cube3: null,
            hoveredHyper: false,
            int: [],
            hyperPos: {
                x: 0,
                y: 0,
                s: 5.3
            },
            isPointerDown: false,
            cubeParams: {
                size: [
                    new THREE.Vector3(50, 2, 2),
                    new THREE.Vector3(2, 50, 2),
                    new THREE.Vector3(2, 50, 2),
                    new THREE.Vector3(50, 2, 2),
                    new THREE.Vector3(2, 2, 50),
                    new THREE.Vector3(2, 2, 50),
                    new THREE.Vector3(2, 2, 50),
                    new THREE.Vector3(2, 2, 50),
                    new THREE.Vector3(50, 2, 2),
                    new THREE.Vector3(2, 50, 2),
                    new THREE.Vector3(2, 50, 2),
                    new THREE.Vector3(50, 2, 2)
                ],
                pos: [
                    new THREE.Vector3(0, -24.5, -24.5),
                    new THREE.Vector3(-24.5, 0, -24.5),
                    new THREE.Vector3(24.5, 0, -24.5),
                    new THREE.Vector3(0, 24.5, -24.5),
                    new THREE.Vector3(24.5, 24.5, 0),
                    new THREE.Vector3(-24.5, 24.5, 0),
                    new THREE.Vector3(24.5, -24.5, 0),
                    new THREE.Vector3(-24.5, -24.5, 0),
                    new THREE.Vector3(0, -24.5, 24.5),
                    new THREE.Vector3(-24.5, 0, 24.5),
                    new THREE.Vector3(24.5, 0, 24.5),
                    new THREE.Vector3(0, 24.5, 24.5)
                ]
            },
            stopScene: false
        }
    },
    watch: {
        "$store.state.visibleObjects.intro_hand": function() {
            if (this.$store.state.visibleObjects.intro_hand) {
                this.stopScene = false;
                this.animate();
            } else {
                this.stopScene = true;
            }
        }
    },
    methods: {
        myScene: function() {
            this.scene = new THREE.Scene();
            let light = new THREE.AmbientLight(0xffffff);
            let container = document.getElementById("webgl-intro");
            
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
            this.loadHyperCube(this.cube1, new THREE.Vector3(0.2, 0.2, 0.2), 15, "hyper1");
            this.loadHyperCube(this.cube2, new THREE.Vector3(0.15, 0.15, 0.15), 0, "hyper2");
            this.loadHyperCube(this.cube3, new THREE.Vector3(0.1, 0.1, 0.1), 15, "hyper3");            
        },
        render: function() {
            if (!this.stopScene) {
                let hyper1 = this.scene.getObjectByName("hyper1");
                let hyper2 = this.scene.getObjectByName("hyper2");
                let hyper3 = this.scene.getObjectByName("hyper3");
                
                if (
                    hyper1 !== undefined &&
                    hyper2 !== undefined &&
                    hyper3 !== undefined 
                ) {
                    if (this.hoveredHyper) {
                        new TWEEN.Tween(hyper1.rotation)
                        .to({ x: 0, y: 1, z: 0 }, 500)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                        new TWEEN.Tween(hyper2.rotation)
                        .to({ x: 0, y: 1, z: 0 }, 500)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                        new TWEEN.Tween(hyper3.rotation)
                        .to({ x: 0, y: 1, z: 0 }, 500)
                        .easing(TWEEN.Easing.Linear.None)
                        .start();
                    } else {
                        if (hyper1.rotation.x === 0) {
                            new TWEEN.Tween(hyper1.rotation)
                            .to({ x: 12, y: -12, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                            new TWEEN.Tween(hyper2.rotation)
                            .to({ x: -12, y: 12, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                            new TWEEN.Tween(hyper3.rotation)
                            .to({ x: -12, y: -12, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                        } else if (hyper1.rotation.x === 12) {
                            new TWEEN.Tween(hyper1.rotation)
                            .to({ x: 0, y: 1, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                            new TWEEN.Tween(hyper2.rotation)
                            .to({ x: 0, y: 1, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                            new TWEEN.Tween(hyper3.rotation)
                            .to({ x: 0, y: 1, z: 0 }, 30000)
                            .easing(TWEEN.Easing.Linear.None)
                            .start();
                        }
                    }
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
        loadHyperCube(cube, scale, rotZ, name) {
            cube = new THREE.Group();
            cube.scale.set(scale.x * this.hyperPos.s, scale.y * this.hyperPos.s, scale.z * this.hyperPos.s);
            cube.rotateZ(rotZ);
            const textureLoader = new THREE.TextureLoader();
            for (let i = 0; i < 12; i++) {
                let edgeG = new THREE.BoxBufferGeometry(
                    this.cubeParams.size[i].x,
                    this.cubeParams.size[i].y,
                    this.cubeParams.size[i].z
                );
                let edgeM = new THREE.MeshPhongMaterial({
                    map: textureLoader.load(require("../assets/parts/metalik.jpg")),
                });
                let edge = new THREE.Mesh(edgeG, edgeM);
                edge.position.set(
                    this.cubeParams.pos[i].x,
                    this.cubeParams.pos[i].y,
                    this.cubeParams.pos[i].z
                );
                cube.add(edge);
                cube.position.x = this.hyperPos.x;
                cube.position.y = this.hyperPos.y;
                cube.rotation.y = 1;
            }
            cube.name = name;
            this.int.push(cube);
            
            this.scene.add(cube);
        },
    },
    mounted() {
        this.myScene();
        this.animate();
        let webGlEl = document.getElementById('webgl-intro');
        
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
    #webgl-intro {
        height: 130px;
        width: 130px;
        position: absolute;
        pointer-events: auto !important;
        z-index: 10;
        top: 0;
        left: 50%;
        cursor: pointer;
    }
</style>