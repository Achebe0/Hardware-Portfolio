import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Folder, ExternalLink, Github, CircuitBoard, Cpu, Zap } from 'lucide-react';

const projects = [
  {
    title: 'Trip Genie Route Selector',
    description: 'Designed a combinational logic circuit to output the fastest travel route between cities based on predefined highway costs',
    tech: ['Nexys 3 A7', 'Xilinx ISE'],
    icon: CircuitBoard,
    color: 'primary',
  },
  {
    title: 'Motor Drive System',
    description: 'High-efficiency BLDC motor controller with FOC algorithm implementation and CAN bus interface.',
    tech: ['STM32F4', 'Power Electronics', 'CAN', 'Altium'],
    icon: Zap,
    color: 'secondary',
  },
  {
    title: 'Data Logger Pro',
    description: 'Industrial-grade data acquisition system with 16-bit ADC, SD card storage, and USB interface.',
    tech: ['SAMD21', 'USB HID', 'FAT32', 'Python GUI'],
    icon: Cpu,
    color: 'accent',
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  position: [number, number, number];
  rotation: [number, number, number];
  isEnlarged: boolean;
  onClick: () => void;
}

const ProjectCard = ({ project, position, rotation, isEnlarged, onClick }: ProjectCardProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { camera } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      // Smooth transition to enlarged state
      const targetScale = isEnlarged ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Look at camera when enlarged
      if (isEnlarged) {
        meshRef.current.lookAt(camera.position);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={meshRef} onClick={onClick} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
        {/* Card background */}
        <boxGeometry args={[4, 3, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" />

        {/* Project content using Html */}
        <Html position={[0, 0, 0.06]} transform occlude>
          <div className="w-64 p-4 bg-card border border-border rounded-lg shadow-lg">
            <div className="flex items-center gap-3 mb-3">
              <project.icon className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-card-foreground">{project.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
            <div className="flex flex-wrap gap-1">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs px-2 py-1 bg-muted text-primary rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </Html>
      </mesh>
    </group>
  );
};

const Particles = () => {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create particle positions
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

const ProjectsScene = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Auto-slide slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      if (enlargedIndex === null) {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [enlargedIndex]);

  useFrame((state) => {
    if (groupRef.current && enlargedIndex === null) {
      // Smooth horizontal sliding animation
      const targetX = -currentIndex * 6; // 6 units spacing between cards
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        0.05
      );

      // Add subtle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  const handleCardClick = (index: number) => {
    if (enlargedIndex === index) {
      setEnlargedIndex(null);
    } else {
      setEnlargedIndex(index);
      setCurrentIndex(index);
    }
  };

  const spacing = 6; // Space between cards

  return (
    <>
      {/* Creative lighting setup */}
      <ambientLight intensity={0.3} />
      <pointLight position={[0, 5, 5]} intensity={1} color="#00ff88" />
      <pointLight position={[-5, -5, 0]} intensity={0.5} color="#ff6b6b" />
      <pointLight position={[5, -5, 0]} intensity={0.5} color="#4ecdc4" />

      {/* Background particles */}
      <Particles />

      <group ref={groupRef}>
        {projects.map((project, index) => {
          const x = index * spacing;
          const isEnlarged = enlargedIndex === index;

          return (
            <ProjectCard
              key={project.title}
              project={project}
              position={[x, 0, 0]}
              rotation={[0, 0, 0]}
              isEnlarged={isEnlarged}
              onClick={() => handleCardClick(index)}
            />
          );
        })}
      </group>

      {/* Navigation indicators */}
      <Html position={[0, -4, 0]} center>
        <div className="flex gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setEnlargedIndex(null);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </Html>
    </>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref,
     { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <Folder className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">02.</span> Projects
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Three.js Projects Slideshow */}
          <div className="w-full h-[600px] md:h-[700px] relative">
            <Canvas
              camera={{ position: [0, 0, 15], fov: 50 }}
              style={{ background: 'transparent' }}
            >
              <ProjectsScene />
            </Canvas>

            {/* Instructions overlay */}
            <motion.div
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-sm text-muted-foreground font-mono">
                Click on a project to enlarge • Auto-slideshow every 4 seconds
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
