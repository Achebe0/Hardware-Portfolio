import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Terminal, Code, Cpu, Wrench } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const stats = [
    { value: '5+', label: 'Design Classes Completed' },
    { value: '3+', label: 'Projects Completed' },
    
  ];

  return (
    <section id="about" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <Terminal className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">01.</span> About_Me
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* About text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-card border border-border rounded p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4 text-muted-foreground">
                  <div className="w-3 h-3 rounded-full bg-led-red" />
                  <div className="w-3 h-3 rounded-full bg-led-amber" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="ml-2">about.txt</span>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <span className="text-primary">$</span> Hello! I'm a passionate computer engineer 
                    who enjoys designing and building electrical systems zooming in on FPGA's and embedded systems.
                  </p>
                 
                  <p className="text-primary animate-blink">_</p>
                </div>
              </div>
            </motion.div>

            {/* Skills icons */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              {[ 
                { icon: Code, title: 'Languages', desc: 'C, C++, Python, VHDL, Systems Verilog, Verilog' },
                { icon: Wrench, title: 'Tools', desc: 'KiCad, Altium, Eagle, AMD Vivado, Xilinx' }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-card border border-border rounded p-4 hover:border-primary transition-colors group"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <item.icon className="w-8 h-8 text-primary mb-3 group-hover:animate-pulse" />
                  <h3 className="font-display font-semibold text-card-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-mono">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 border border-border rounded bg-card/50"
              >
                <div className="text-3xl md:text-4xl font-display font-bold text-primary led-glow mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-mono">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;