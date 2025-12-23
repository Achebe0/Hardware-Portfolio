import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// 7-segment display mapping for each character
// Segments: a(top), b(top-right), c(bottom-right), d(bottom), e(bottom-left), f(top-left), g(middle)
const segmentMap: Record<string, boolean[]> = {
  'A': [true, true, true, false, true, true, true],
  'B': [true, true, true, true, true, true, true],
  'C': [true, false, false, true, true, true, false],
  'D': [false, true, true, true, true, false, true],
  'E': [true, false, false, true, true, true, true],
  'F': [true, false, false, false, true, true, true],
  'G': [true, false, true, true, true, true, false],
  'H': [false, true, true, false, true, true, true],
  'I': [false, false, false, false, true, true, false],
  'J': [false, true, true, true, false, false, false],
  'L': [false, false, false, true, true, true, false],
  'N': [false, true, true, false, true, true, false],
  'O': [true, true, true, true, true, true, false],
  'P': [true, true, false, false, true, true, true],
  'R': [false, false, false, false, true, false, true],
  'S': [true, false, true, true, false, true, true],
  'T': [false, false, false, true, true, true, true],
  'U': [false, true, true, true, true, true, false],
  'Y': [false, true, true, true, false, true, true],
  '0': [true, true, true, true, true, true, false],
  '1': [false, true, true, false, false, false, false],
  '2': [true, true, false, true, true, false, true],
  '3': [true, true, true, true, false, false, true],
  '4': [false, true, true, false, false, true, true],
  '5': [true, false, true, true, false, true, true],
  '6': [true, false, true, true, true, true, true],
  '7': [true, true, true, false, false, false, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
  ' ': [false, false, false, false, false, false, false],
  '-': [false, false, false, false, false, false, true],
};

interface SegmentProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  isOn: boolean;
  color?: string;
  horizontal?: boolean;
}

const Segment = ({ position, rotation = [0, 0, 0], isOn, color = '#00ff00', horizontal = true }: SegmentProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current && materialRef.current) {
      // Subtle flicker effect for lit segments
      if (isOn) {
        const flicker = 0.95 + Math.sin(state.clock.elapsedTime * 50) * 0.05;
        materialRef.current.emissiveIntensity = intensity * flicker;
      }
    }
  });

  const width = horizontal ? 0.8 : 0.15;
  const height = horizontal ? 0.15 : 0.8;

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={[width, height, 0.08]} />
      <meshStandardMaterial
        ref={materialRef}
        color={isOn ? color : '#0a1a0a'}
        emissive={color}
        emissiveIntensity={isOn ? intensity : 0.02}
        metalness={0.3}
        roughness={0.6}
      />
    </mesh>
  );
};

interface SevenSegmentCharProps {
  char: string;
  position: [number, number, number];
  isVisible: boolean;
  color?: string;
}

const SevenSegmentChar = ({ char, position, isVisible, color = '#00ff00' }: SevenSegmentCharProps) => {
  const [activeSegments, setActiveSegments] = useState<boolean[]>(new Array(7).fill(false));
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timeouts
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current = [];

    if (isVisible) {
      const segments = segmentMap[char] || segmentMap[' '];
      // Animate segments turning on one by one
      segments.forEach((shouldBeOn, index) => {
        const timeout = setTimeout(() => {
          setActiveSegments(prev => {
            const newState = [...prev];
            newState[index] = shouldBeOn;
            return newState;
          });
        }, index * 50);
        timeoutRefs.current.push(timeout);
      });
    } else {
      setActiveSegments(new Array(7).fill(false));
    }

    return () => {
      timeoutRefs.current.forEach(clearTimeout);
    };
  }, [isVisible, char]);

  return (
    <group position={position}>
      {/* Background housing */}
      <mesh position={[0, 0, -0.1]}>
        <boxGeometry args={[1.3, 2.2, 0.15]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Segment a - top horizontal */}
      <Segment position={[0, 0.85, 0]} isOn={activeSegments[0]} color={color} horizontal />
      
      {/* Segment b - top right vertical */}
      <Segment position={[0.45, 0.45, 0]} isOn={activeSegments[1]} color={color} horizontal={false} />
      
      {/* Segment c - bottom right vertical */}
      <Segment position={[0.45, -0.45, 0]} isOn={activeSegments[2]} color={color} horizontal={false} />
      
      {/* Segment d - bottom horizontal */}
      <Segment position={[0, -0.85, 0]} isOn={activeSegments[3]} color={color} horizontal />
      
      {/* Segment e - bottom left vertical */}
      <Segment position={[-0.45, -0.45, 0]} isOn={activeSegments[4]} color={color} horizontal={false} />
      
      {/* Segment f - top left vertical */}
      <Segment position={[-0.45, 0.45, 0]} isOn={activeSegments[5]} color={color} horizontal={false} />
      
      {/* Segment g - middle horizontal */}
      <Segment position={[0, 0, 0]} isOn={activeSegments[6]} color={color} horizontal />
    </group>
  );
};

// Animation modes for the display
type AnimationMode = 'typeIn' | 'flash' | 'scroll' | 'countdown' | 'wave';

interface DisplayState {
  text: string;
  color: string;
  mode: AnimationMode;
}

const displaySequence: DisplayState[] = [
  { text: 'ACHEBE', color: '#00ff00', mode: 'typeIn' },
  { text: 'HELLO ', color: '#00ffff', mode: 'flash' },
  { text: '------', color: '#ff0066', mode: 'wave' },
  { text: '543210', color: '#ffaa00', mode: 'countdown' },
  { text: 'CODE  ', color: '#ff00ff', mode: 'scroll' },
  { text: 'DESIGN', color: '#00ff88', mode: 'typeIn' },
  { text: '  GO  ', color: '#ffff00', mode: 'flash' },
];

const DisplayScene = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState('      ');
  const [displayColor, setDisplayColor] = useState('#00ff00');
  const [visibleChars, setVisibleChars] = useState<boolean[]>(new Array(6).fill(false));

  const currentState = displaySequence[currentIndex];
  const maxLen = 6;

  useEffect(() => {
    const runAnimation = async () => {
      const { text, color, mode } = currentState;
      const paddedText = text.padEnd(maxLen, ' ').slice(0, maxLen);
      setDisplayColor(color);
      setVisibleChars(new Array(maxLen).fill(false));

      switch (mode) {
        case 'typeIn':
          // Type in one character at a time
          for (let i = 0; i < maxLen; i++) {
            await new Promise(r => setTimeout(r, 200));
            setDisplayText(paddedText.slice(0, i + 1).padEnd(maxLen, ' '));
            setVisibleChars(prev => {
              const next = [...prev];
              next[i] = true;
              return next;
            });
          }
          await new Promise(r => setTimeout(r, 1500));
          break;

        case 'flash':
          // Flash on/off effect
          setDisplayText(paddedText);
          for (let i = 0; i < 6; i++) {
            setVisibleChars(new Array(maxLen).fill(i % 2 === 0));
            await new Promise(r => setTimeout(r, 150));
          }
          setVisibleChars(new Array(maxLen).fill(true));
          await new Promise(r => setTimeout(r, 1200));
          break;

        case 'scroll':
          // Scroll text from right to left
          const scrollText = '      ' + paddedText + '      ';
          for (let offset = 0; offset <= paddedText.length + 6; offset++) {
            const slice = scrollText.slice(offset, offset + maxLen);
            setDisplayText(slice);
            setVisibleChars(new Array(maxLen).fill(true));
            await new Promise(r => setTimeout(r, 180));
          }
          break;

        case 'countdown':
          // Count down effect
          setVisibleChars(new Array(maxLen).fill(true));
          for (let i = 0; i < paddedText.length; i++) {
            const countdownText = paddedText.slice(i).padStart(maxLen, ' ');
            setDisplayText(countdownText);
            await new Promise(r => setTimeout(r, 400));
          }
          await new Promise(r => setTimeout(r, 500));
          break;

        case 'wave':
          // Wave animation - segments light up in sequence
          setDisplayText(paddedText);
          for (let wave = 0; wave < 3; wave++) {
            for (let i = 0; i < maxLen; i++) {
              setVisibleChars(prev => {
                const next = new Array(maxLen).fill(false);
                next[i] = true;
                if (i > 0) next[i - 1] = true;
                if (i > 1) next[i - 2] = true;
                return next;
              });
              await new Promise(r => setTimeout(r, 100));
            }
          }
          setVisibleChars(new Array(maxLen).fill(true));
          await new Promise(r => setTimeout(r, 800));
          break;
      }

      // Clear and move to next
      setVisibleChars(new Array(maxLen).fill(false));
      await new Promise(r => setTimeout(r, 300));
      setCurrentIndex((prev) => (prev + 1) % displaySequence.length);
    };

    runAnimation();
  }, [currentIndex, currentState]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  const spacing = 1.6;
  const startX = -((maxLen - 1) * spacing) / 2;

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 5, 5]} intensity={1} color={displayColor} />
      <pointLight position={[-5, 0, 3]} intensity={0.5} color={displayColor} />
      <pointLight position={[5, 0, 3]} intensity={0.5} color={displayColor} />
      
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
        <group ref={groupRef}>
          <mesh position={[0, 0, -0.3]}>
            <boxGeometry args={[12, 3.5, 0.2]} />
            <meshStandardMaterial color="#0a2010" metalness={0.3} roughness={0.7} />
          </mesh>
          
          {[-1.5, 0, 1.5].map((y, i) => (
            <mesh key={i} position={[0, y * 0.4, -0.18]}>
              <boxGeometry args={[11, 0.03, 0.02]} />
              <meshStandardMaterial color="#b87333" metalness={0.9} roughness={0.3} />
            </mesh>
          ))}
          
          {displayText.split('').map((char, index) => (
            <SevenSegmentChar
              key={index}
              char={char}
              position={[startX + index * spacing, 0, 0]}
              isVisible={visibleChars[index]}
              color={displayColor}
            />
          ))}
        </group>
      </Float>
      
      <Particles color={displayColor} />
    </>
  );
};

const Particles = ({ color = '#00ff00' }: { color?: string }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const [positions] = useState(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return pos;
  });

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

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
      <pointsMaterial size={0.02} color={color} transparent opacity={0.6} />
    </points>
  );
};

const SevenSegmentDisplay = () => {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#050a05']} />
        <fog attach="fog" args={['#050a05', 10, 30]} />
        <DisplayScene />
      </Canvas>
    </div>
  );
};

export default SevenSegmentDisplay;
