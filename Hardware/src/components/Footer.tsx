import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.div
            className="flex items-center gap-2 text-muted-foreground font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span>Built with passion by</span>
            <span className="text-primary led-glow">ACHEBE</span>
          </motion.div>

          <motion.div
            className="text-muted-foreground font-mono text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-primary">©</span> {new Date().getFullYear()} All rights reserved
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
