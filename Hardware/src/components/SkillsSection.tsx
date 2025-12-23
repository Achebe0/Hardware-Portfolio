import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Settings } from 'lucide-react';

const skills = [
  { name: 'PCB Design', level: 95 },
  { name: 'Embedded C/C++', level: 90 },
  { name: 'ARM Microcontrollers', level: 88 },
  { name: 'Circuit Analysis', level: 92 },
  { name: 'Power Electronics', level: 85 },
  { name: 'FPGA/Verilog', level: 75 },
  { name: 'Signal Processing', level: 80 },
  { name: 'Communication Protocols', level: 88 },
];

const tools = [
  'KiCad', 'Altium Designer', 'Eagle', 'LTSpice', 'MATLAB',
  'STM32CubeIDE', 'PlatformIO', 'Git', 'Oscilloscope', 'Logic Analyzer'
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-24 relative" ref={ref}>
      {/* Background pattern */}
      <div className="absolute inset-0 pcb-pattern opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <Settings className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">03.</span> Skills
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Skill bars */}
            <div className="space-y-6">
              <h3 className="text-xl font-display font-semibold text-card-foreground mb-6">
                Technical Proficiency
              </h3>
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-card-foreground">{skill.name}</span>
                    <span className="font-mono text-sm text-primary">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    >
                      {/* Glow effect */}
                      <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-r from-transparent to-primary/50 blur-sm" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Tools grid */}
            <div>
              <h3 className="text-xl font-display font-semibold text-card-foreground mb-6">
                Tools & Software
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool}
                    className="bg-card border border-border rounded px-4 py-3 text-center font-mono text-sm text-muted-foreground hover:border-primary hover:text-primary transition-all duration-300 cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tool}
                  </motion.div>
                ))}
              </div>

              {/* Additional info */}
              <motion.div
                className="mt-8 p-6 bg-card border border-border rounded"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="font-mono text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span>system_info.log</span>
                  </div>
                  <p className="text-card-foreground">
                    <span className="text-primary">[INFO]</span> Always learning and exploring new technologies
                  </p>
                  <p className="text-card-foreground">
                    <span className="text-accent">[NOTE]</span> Open to collaboration on exciting projects
                  </p>
                  <p className="text-card-foreground">
                    <span className="text-secondary">[STATUS]</span> Currently exploring RISC-V architecture
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};