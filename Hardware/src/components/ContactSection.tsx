import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully!', {
      description: 'I will get back to you soon.',
    });
    setFormState({ name: '', email: '', message: '' });
  };

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:hello@achebe.dev', label: 'Email' },
  ];

  return (
    <section id="contact" className="py-24 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section header */}
          <div className="flex items-center gap-4 mb-12">
            <Mail className="w-6 h-6 text-primary" />
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              <span className="text-primary">04.</span> Contact
            </h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-display font-bold text-card-foreground mb-4">
                Let's Build Something Together
              </h3>
              <p className="text-muted-foreground font-mono mb-8">
                Have a project in mind? Looking for a hardware consultant? 
                Or just want to say hello? I'd love to hear from you.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-muted-foreground font-mono">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Available Worldwide (Remote)</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground font-mono">
                  <Mail className="w-5 h-5 text-primary" />
                  <span>hello@achebe.dev</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 bg-card border border-border rounded flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Terminal-style status */}
              <motion.div
                className="mt-8 p-4 bg-card border border-border rounded font-mono text-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.6 }}
              >
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span>status.sh</span>
                </div>
                <p className="text-primary">$ availability --check</p>
                <p className="text-card-foreground">→ Currently accepting new projects</p>
                <p className="text-card-foreground">→ Response time: ~24 hours</p>
              </motion.div>
            </motion.div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">&gt;</span> Name
                  </label>
                  <Input
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Your name"
                    className="bg-card border-border focus:border-primary font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">&gt;</span> Email
                  </label>
                  <Input
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="your@email.com"
                    className="bg-card border-border focus:border-primary font-mono"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-mono text-muted-foreground mb-2">
                    <span className="text-primary">&gt;</span> Message
                  </label>
                  <Textarea
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="bg-card border-border focus:border-primary font-mono resize-none"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono group"
                >
                  <Send className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;