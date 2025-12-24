import { motion } from 'framer-motion';
import SevenSegmentDisplay from './SevenSegmentDisplay';
import { ChevronDown, Cpu, Zap, CircuitBoard } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden pt-16">
      {/* PCB Pattern Background */}
      <div className="absolute inset-0 pcb-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      
      {/* Animated circuit lines */}
      <div className="absolute top-1/4 left-0 right-0 circuit-line opacity-20" />
      <div className="absolute top-1/3 left-0 right-0 circuit-line opacity-10" />
      <div className="absolute top-2/3 left-0 right-0 circuit-line opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center justify-center min-h-screen py-20">
          {/* Status indicators */}
          <motion.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono text-muted-foreground">SYSTEM_ACTIVE</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-xs font-mono text-muted-foreground">READY</span>
            </div>
          </motion.div>

          {/* 7-Segment Display */}
          <motion.div
            className="w-full max-w-4xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <SevenSegmentDisplay />
          </motion.div>

          {/* Title and subtitle */}
          <motion.div
            className="text-center mt-8 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="text-primary led-glow">Computer</span>{' '}
              <span className="text-card-foreground">Engineer</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-2xl mx-auto">
              <span className="text-primary">&lt;</span>
              An FPGA's biggest fan
              <span className="text-primary">/&gt;</span>
            </p>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
          >
            {[
              { icon: CircuitBoard, label: 'FPGA Design' },
              { icon: Cpu, label: 'Electrical Circuits' },
              { icon: Zap, label: 'Power Electronics' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3 + index * 0.2 }}
              >
                <item.icon className="w-4 h-4 text-primary" />
                <span className="text-sm font-mono text-card-foreground">{item.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 3.5, duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-primary" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;