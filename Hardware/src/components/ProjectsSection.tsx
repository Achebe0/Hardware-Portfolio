import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Folder, ExternalLink, Github, CircuitBoard, Cpu, Zap } from 'lucide-react';

const projects = [
  {
    title: 'Smart Home Controller',
    description: 'A multi-sensor IoT hub with custom PCB featuring ESP32, environmental sensors, and OLED display.',
    tech: ['ESP32', 'KiCad', 'MQTT', 'FreeRTOS'],
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
  },
  {
    title: 'RF Transmitter Module',
    description: 'Low-power 915MHz radio module with custom antenna design and long-range communication.',
    tech: ['CC1101', 'RF Design', 'Impedance Matching', 'PCB Antenna'],
    icon: CircuitBoard,
    color: 'primary',
  },
  {
    title: 'LED Matrix Display',
    description: '64x32 RGB LED matrix controller with real-time animation engine and DMX512 support.',
    tech: ['FPGA', 'Verilog', 'Hub75', 'DMX512'],
    icon: Zap,
    color: 'secondary',
  },
  {
    title: 'Battery Management System',
    description: 'Multi-cell lithium battery BMS with cell balancing, protection circuits, and SOC estimation.',
    tech: ['BQ76940', 'Cell Balancing', 'I2C', 'Safety'],
    icon: Cpu,
    color: 'accent',
  },
];

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                className="group bg-card border border-border rounded p-6 hover:border-primary transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Header */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <project.icon className="w-10 h-10 text-primary" />
                  <div className="flex gap-2">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-card-foreground mb-3 group-hover:text-primary transition-colors relative z-10">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 relative z-10 font-mono leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 relative z-10">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-1 bg-muted text-primary rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
