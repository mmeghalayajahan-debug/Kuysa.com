import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Terminal, 
  Lock, 
  Search, 
  Cpu, 
  Globe, 
  ChevronRight, 
  Menu, 
  X, 
  Github, 
  Twitter, 
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { COURSES, SERVICES, ACADEMY_NAME, ACADEMY_TAGLINE } from './constants';
import { ContactFormData } from './types';
import { sendTelegramNotification } from './services/telegramService';

const IconMap: Record<string, React.ReactNode> = {
  Terminal: <Terminal className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Search: <Search className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Lock: <Lock className="w-6 h-6" />,
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    course: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const result = await sendTelegramNotification(formData);
    
    if (result.success) {
      setStatus('success');
      setFormData({ name: '', email: '', course: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } else {
      setStatus('error');
      setErrorMessage(result.error || 'TRANSMISSION FAILED. PLEASE TRY AGAIN.');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-cyber-green/30 selection:text-cyber-green">
      <div className="scanline" />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-cyber-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-cyber-green/10 rounded-lg border border-cyber-green/20">
                <Shield className="w-8 h-8 text-cyber-green" />
              </div>
              <span className="text-xl font-bold font-mono tracking-tighter text-white">
                ZYNOVIA<span className="text-cyber-green">_</span>
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="flex items-baseline space-x-8">
                {['Home', 'Courses', 'Services', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-sm font-medium text-gray-400 hover:text-cyber-green transition-colors font-mono"
                  >
                    {item.toUpperCase()}
                  </a>
                ))}
                <button className="bg-cyber-green text-cyber-dark px-6 py-2 rounded-md font-bold text-sm hover:bg-cyber-green/90 transition-all transform hover:scale-105">
                  ENROLL NOW
                </button>
              </div>
            </div>
            
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-400">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-cyber-dark pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {['Home', 'Courses', 'Services', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-bold font-mono text-white hover:text-cyber-green"
                >
                  {item.toUpperCase()}
                </a>
              ))}
              <button className="w-full bg-cyber-green text-cyber-dark py-4 rounded-md font-bold text-lg">
                ENROLL NOW
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden cyber-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-xs font-mono mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyber-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyber-green"></span>
              </span>
              SYSTEMS ONLINE: SECURE CONNECTION ESTABLISHED
            </div>
            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tight text-white mb-6 glitch-text">
              {ACADEMY_NAME.toUpperCase()}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              {ACADEMY_TAGLINE}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="group relative px-8 py-4 bg-cyber-green text-cyber-dark font-bold rounded-lg overflow-hidden transition-all hover:pr-12">
                <span className="relative z-10">START LEARNING</span>
                <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all" />
              </button>
              <button className="px-8 py-4 border border-white/10 text-white font-bold rounded-lg hover:bg-white/5 transition-all">
                VIEW CURRICULUM
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-cyber-green/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyber-blue/5 blur-[150px] rounded-full" />
      </section>

      {/* Course List */}
      <section id="courses" className="py-24 bg-cyber-dark relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-bold font-mono text-white mb-4 flex items-center gap-3">
              <Terminal className="text-cyber-green" />
              AVAILABLE_COURSES
            </h2>
            <div className="h-1 w-24 bg-cyber-green" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COURSES.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-cyber-card border border-white/5 rounded-xl hover:border-cyber-green/30 transition-all hover:shadow-[0_0_30px_rgba(0,255,65,0.05)]"
              >
                <div className="w-12 h-12 bg-cyber-green/10 rounded-lg flex items-center justify-center text-cyber-green mb-6 group-hover:scale-110 transition-transform">
                  {IconMap[course.icon]}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-mono">{course.title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyber-green">{course.level}</span>
                  <span className="text-gray-500">{course.duration}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 bg-cyber-card/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold font-mono text-white mb-6">
                OUR_SERVICES<span className="text-cyber-green">.</span>
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Beyond education, we provide professional cyber security solutions to protect your digital assets and infrastructure.
              </p>
              <button className="flex items-center gap-2 text-cyber-green font-mono text-sm hover:gap-4 transition-all">
                EXPLORE ALL SERVICES <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SERVICES.map((service) => (
                <div key={service.id} className="p-8 bg-cyber-dark border border-white/5 rounded-2xl">
                  <div className="text-cyber-blue mb-6">
                    {IconMap[service.icon]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 font-mono">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold font-mono text-white mb-4">INITIALIZE_CONTACT</h2>
            <p className="text-gray-400">Ready to start your journey? Send us a message and our team will get back to you.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Full Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="w-full bg-cyber-card border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Email Address</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="w-full bg-cyber-card border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Select Course</label>
              <select
                required
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full bg-cyber-card border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all appearance-none"
              >
                <option value="" disabled>Choose a course</option>
                {COURSES.map(c => <option key={c.id} value={c.title}>{c.title}</option>)}
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-mono text-gray-500 uppercase tracking-widest">Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                placeholder="Tell us about your goals..."
                className="w-full bg-cyber-card border border-white/10 rounded-lg px-4 py-3 text-white focus:border-cyber-green focus:ring-1 focus:ring-cyber-green outline-none transition-all resize-none"
              />
            </div>
            
            <button
              disabled={status === 'loading'}
              type="submit"
              className="w-full bg-cyber-green text-cyber-dark font-bold py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-cyber-green/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <div className="w-6 h-6 border-2 border-cyber-dark/30 border-t-cyber-dark animate-spin rounded-full" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  TRANSMIT DATA
                </>
              )}
            </button>
            
            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-cyber-green/10 border border-cyber-green/20 rounded-lg flex items-center gap-3 text-cyber-green"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-sm font-mono">DATA TRANSMITTED SUCCESSFULLY. WE WILL CONTACT YOU SOON.</span>
                </motion.div>
              )}
              
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-500"
                >
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-mono uppercase">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 bg-cyber-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-cyber-green" />
              <span className="text-lg font-bold font-mono text-white">
                ZYNOVIA<span className="text-cyber-green">_</span>
              </span>
            </div>
            
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-cyber-green transition-colors"><Github className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-cyber-green transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-500 hover:text-cyber-green transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
            
            <p className="text-gray-600 text-xs font-mono">
              © {new Date().getFullYear()} ZYNOVIA CYBER ACADEMY. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
