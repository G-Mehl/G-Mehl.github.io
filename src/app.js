import * as THREE from '../node_modules/three/build/three.module.js'; 

// Function to create a circular texture
function createCircleTexture() {
    const size = 32; // Size of the texture
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');

    // Draw a white circle
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, true);
    context.fillStyle = 'white';
    context.fill();
    context.closePath();

    return new THREE.CanvasTexture(canvas);
}

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 5; // Adjust the camera position if needed

const particleCount = 2000; // Increase the number of particles
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3); // 3 coordinates per particle
const colors = new Float32Array(particleCount * 3); // 3 color components per particle

// Create particles
for (let i = 0; i < particleCount; i++) {
    // Random positions
    positions[i * 3] = (Math.random() - 0.5) * 10; // X
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10; // Y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // Z

    // Set all colors to white
    colors[i * 3] = 1;   // R
    colors[i * 3 + 1] = 1; // G
    colors[i * 3 + 2] = 1;   // B
}

// Set the positions and colors to the particle geometry
particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particles.setAttribute('color', new THREE.BufferAttribute(colors, 3));

// Create a circular texture for the particles
const particleTexture = createCircleTexture();

// Create a point cloud with smaller particles using the circular texture
const particleMaterial = new THREE.PointsMaterial({
    size: 0.01, // Make particles smaller (half the previous size)
    map: particleTexture,
    transparent: true, // Allow transparency
});
const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Slow rotation for the particle system (slower than before)
    particleSystem.rotation.x += 0.0025; // Slower rotation
    particleSystem.rotation.y += 0.0025; // Slower rotation

    renderer.render(scene, camera);
}
animate();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth' // Enables smooth scrolling
        });
    });
});