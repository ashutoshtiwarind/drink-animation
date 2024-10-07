import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

scene.background = new THREE.Color(0x87ceeb); 

let clouds = [];

const loader = new THREE.TextureLoader();
loader.load('images/cloud.png', (texture) => {
  function createCloud(x, y, z, sizeX = 5, sizeY = 2.5) {
    const geometry = new THREE.PlaneGeometry(sizeX, sizeY); 
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const cloud = new THREE.Mesh(geometry, material);

    cloud.position.set(x, y, z);

    scene.add(cloud);
    clouds.push(cloud);
  }

  createCloud(-10, 2, 4);  
  createCloud(-12, 3, 3);  
  createCloud(-15, 4, 5);  
  createCloud(-20, 1, 4);  
  createCloud(-25, 2.5, 5); 
});

let bottle;
loader.load('images/bottle.png', (bottleTexture) => {
    const bottleGeometry = new THREE.PlaneGeometry(2, 4); 
    const bottleMaterial = new THREE.MeshBasicMaterial({ map: bottleTexture, transparent: true });
    
    bottle = new THREE.Mesh(bottleGeometry, bottleMaterial);
  
    bottle.position.set(-20, -1, 7); 
    scene.add(bottle);
  });

const animate = function () {
  requestAnimationFrame(animate);

  clouds.forEach((cloud) => {
    cloud.position.x += 0.02; 

    if (cloud.position.x > 10) {
      cloud.position.x = -30; 
    }
  });

  if (bottle) {
    bottle.position.x += 0.05; 

    if (bottle.position.x > 10) {
      bottle.position.x = -30;  
    }
  }

  renderer.render(scene, camera);
};

animate();

camera.position.z = 10;

window.addEventListener('resize', () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});