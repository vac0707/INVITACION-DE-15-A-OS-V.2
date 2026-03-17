/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Music, 
  Pause, 
  Play, 
  Calendar, 
  Clock, 
  MapPin, 
  Heart, 
  Users, 
  Gift, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Camera,
  Map as MapIcon,
  Shirt,
  Zap,
  PartyPopper,
  Music2,
  Star,
  Utensils,
  Mic2,
  GlassWater
} from 'lucide-react';

// Constants
const EVENT_DATE = new Date('2026-07-12T19:00:00');
const MAP_URL = 'https://maps.app.goo.gl/sq4KzQmazpaNrzLf6';
const WHATSAPP_NUMBER = '51932350348';
const WA_QR_LINK = 'https://wa.me/qr/6RFCERSFATCJK1';
const AUDIO_URL = 'https://res.cloudinary.com/dcnynnstm/video/upload/v1773717165/Marta_Albarracin_-_Quince_A%C3%B1os_sbr0ab.mp3';

const IMAGES = [
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934230/05_ipe13e.jpg',
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934230/06_mj527c.jpg',
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934230/04_iktjfn.jpg',
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934229/03_ozkkmr.jpg',
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934229/02_qbol1k.jpg',
  'https://res.cloudinary.com/dcnynnstm/image/upload/v1767934229/01_ievsr1.jpg'
];

const ITINERARY = [
  { time: '7:00 PM', event: 'Recepción de invitados', icon: Users },
  { time: '7:45 PM', event: 'Ingreso de la quinceañera', icon: Star },
  { time: '8:00 PM', event: 'Ceremonia simbólica', icon: Sparkles },
  { time: '8:30 PM', event: 'Vals principal', icon: Music },
  { time: '9:00 PM', event: 'Cena y brindis', icon: Utensils },
  { time: '10:00 PM', event: 'Presentación artística', icon: Mic2 },
  { time: '11:30 PM', event: 'Hora loca', icon: PartyPopper },
  { time: '12:30 AM', event: 'Gran fiesta', icon: Zap }
];

// Components
const ConfirmationModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '1',
    attendance: 'confirmado',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `¡Hola Valeria! 👑✨%0A%0AQuiero confirmar mi asistencia a tu gran fiesta de XV Años. 🎂🥳%0A%0A👤 *Nombre:* ${formData.name}%0A📞 *Teléfono:* ${formData.phone}%0A👨‍👩‍👧‍👦 *Cantidad de personas:* ${formData.guests}%0A💌 *Asistencia:* ${formData.attendance === 'confirmado' ? '✅ ¡Allí estaré!' : '❌ No podré asistir'}%0A💬 *Mensaje:* ${formData.message}%0A%0A¡Gracias por la invitación! Nos vemos pronto. 🥂💖`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-pearl w-full max-w-md rounded-[2.5rem] overflow-y-auto max-h-[90vh] shadow-2xl border border-gold/20"
          >
            <div className="bg-aqua p-8 text-white text-center relative">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 hover:rotate-90 transition-transform"
              >
                <Sparkles size={20} />
              </button>
              <Heart className="mx-auto mb-2" />
              <h3 className="text-3xl font-calligraphy">Confirmar Asistencia</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold font-semibold">Nombre Completo</label>
                <input 
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-aqua/5 border border-aqua/20 rounded-xl px-4 py-2 focus:outline-none focus:border-gold transition-colors font-serif text-sm"
                  placeholder="Tu nombre..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-semibold">Teléfono</label>
                  <input 
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-aqua/5 border border-aqua/20 rounded-xl px-4 py-2 focus:outline-none focus:border-gold transition-colors font-serif text-sm"
                    placeholder="Ej: 987654321"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-widest text-gold font-semibold">Personas</label>
                  <select 
                    value={formData.guests}
                    onChange={(e) => setFormData({...formData, guests: e.target.value})}
                    className="w-full bg-aqua/5 border border-aqua/20 rounded-xl px-4 py-2 focus:outline-none focus:border-gold transition-colors font-serif text-sm"
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Persona' : 'Personas'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold font-semibold">¿Asistirás?</label>
                <select 
                  value={formData.attendance}
                  onChange={(e) => setFormData({...formData, attendance: e.target.value})}
                  className="w-full bg-aqua/5 border border-aqua/20 rounded-xl px-4 py-2 focus:outline-none focus:border-gold transition-colors font-serif text-sm"
                >
                  <option value="confirmado">Sí, asistiré con gusto</option>
                  <option value="cancelado">Lo siento, no podré asistir</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-widest text-gold font-semibold">Mensaje Especial</label>
                <textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-aqua/5 border border-aqua/20 rounded-xl px-4 py-2 focus:outline-none focus:border-gold transition-colors font-serif h-20 resize-none text-sm"
                  placeholder="Escribe algo para Valeria..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-white py-3 rounded-full font-bold tracking-widest shadow-lg hover:shadow-gold/20 transition-all uppercase text-xs"
              >
                Enviar a WhatsApp
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = EVENT_DATE.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-2xl mx-auto px-4">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center bg-white/80 backdrop-blur-sm p-3 md:p-6 rounded-2xl shadow-lg border border-aqua/20">
          <span className="text-2xl md:text-4xl font-serif font-bold text-gold">{value}</span>
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-aqua font-semibold mt-1">
            {label === 'days' ? 'Días' : label === 'hours' ? 'Horas' : label === 'minutes' ? 'Minutos' : 'Segundos'}
          </span>
        </div>
      ))}
    </div>
  );
};

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[4/5] md:aspect-video overflow-hidden rounded-3xl shadow-2xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={IMAGES[currentIndex]}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </AnimatePresence>
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
      
      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full text-white transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-gold w-6' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState<'preloader' | 'cover' | 'invitation'>('preloader');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const startInvitation = () => {
    setView('cover');
    // Auto-play music on start (user interaction allows this)
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="font-sans selection:bg-aqua/30">
      {/* Audio Element */}
      <audio ref={audioRef} src={AUDIO_URL} loop />

      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Preloader */}
      <AnimatePresence>
        {view === 'preloader' && (
          <motion.div 
            exit={{ opacity: 0, y: -100 }}
            className="fixed inset-0 z-[100] bg-pearl flex flex-col items-center justify-center p-6 text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <div className="relative">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-48 h-48 border-2 border-dashed border-gold/30 rounded-full flex items-center justify-center"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="text-gold w-12 h-12" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h2 className="text-gold font-serif text-xl tracking-[0.2em] uppercase">Estás invitado a una</h2>
                <h1 className="text-4xl md:text-6xl font-calligraphy text-aqua">Noche Inolvidable</h1>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={startInvitation}
                className="bg-gold text-white px-10 py-4 rounded-full font-semibold tracking-widest shadow-xl hover:shadow-gold/20 transition-all uppercase text-sm"
              >
                Abrir invitación
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle Floating Button */}
      {view !== 'preloader' && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md p-4 rounded-full shadow-2xl border border-gold/30 text-gold group"
        >
          <div className="relative">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            {isPlaying && (
              <motion.div 
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 bg-gold rounded-full -z-10"
              />
            )}
          </div>
        </motion.button>
      )}

      {/* 2. Portada Principal */}
      <AnimatePresence>
        {view === 'cover' && (
          <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center text-center"
          >
            <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={IMAGES[0]} 
                className="w-full h-full object-cover"
                alt="Valeria Fernanda"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </motion.div>

            <div className="relative z-10 px-6 space-y-6 max-w-4xl">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-white/80 font-serif text-lg md:text-2xl tracking-[0.3em] uppercase"
              >
                Mis XV Años
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="text-6xl md:text-9xl font-calligraphy gold-gradient"
              >
                Valeria Fernanda
              </motion.h1>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex flex-col items-center space-y-4"
              >
                <div className="h-px w-24 bg-gold" />
                <p className="text-white text-xl md:text-3xl font-serif tracking-widest">
                  12 de Julio de 2026
                </p>
                <div className="h-px w-24 bg-gold" />
              </motion.div>

              <motion.button
                onClick={() => setView('invitation')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="inline-block bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-medium tracking-widest transition-all mt-8"
              >
                Ver Invitación
              </motion.button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 3. Invitación Details (The "Separate Page") */}
      {view === 'invitation' && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          {/* Back to Cover Button */}
          <button 
            onClick={() => setView('cover')}
            className="absolute top-6 left-6 z-50 bg-white/50 backdrop-blur-md p-2 rounded-full text-gold hover:bg-white transition-all shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>

          {/* 3. Mensaje de la Quinceañera */}
      <section id="mensaje" className="py-24 px-6 bg-pearl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border border-gold rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border border-aqua rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-8"
        >
          <Heart className="text-gold mx-auto w-10 h-10" />
          <p className="text-2xl md:text-4xl font-serif italic leading-relaxed text-gray-700">
            "Hoy dejo atrás una etapa de mi vida para abrir las puertas a nuevos sueños.
            Me encantaría que formes parte de esta noche tan especial para mí."
          </p>
          <div className="space-y-2">
            <p className="text-4xl md:text-5xl font-calligraphy gold-gradient">Valeria Fernanda</p>
            <div className="w-16 h-0.5 bg-gold mx-auto" />
          </div>
        </motion.div>
      </section>

      {/* 4. Contador Regresivo */}
      <section className="py-20 bg-aqua-soft">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center space-y-12"
        >
          <div className="space-y-2">
            <h2 className="text-gold font-serif text-sm tracking-[0.3em] uppercase">Faltan solo</h2>
            <h3 className="text-3xl md:text-5xl font-serif text-aqua">Para el gran día</h3>
          </div>
          <Countdown />
        </motion.div>
      </section>

      {/* 5. Galería de Fotos */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <Camera className="text-gold mx-auto w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-calligraphy text-aqua">Mis Recuerdos</h2>
            <p className="text-gray-500 font-serif tracking-widest uppercase text-xs">Momentos especiales</p>
          </motion.div>
          <Gallery />
        </div>
      </section>

      {/* 6. Padres y Padrinos */}
      <section className="py-24 px-6 bg-pearl relative">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center md:text-right"
          >
            <div className="space-y-2">
              <Users className="text-gold mx-auto md:ml-auto md:mr-0 w-8 h-8" />
              <h2 className="text-3xl font-serif text-aqua italic">Con orgullo invitan</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-gold font-serif uppercase tracking-widest text-xs mb-2">Mis Padres</p>
                <p className="text-2xl font-serif text-gray-800">Luis Alberto Quispe Vargas</p>
                <p className="text-2xl font-serif text-gray-800">María Elena Rojas Palomino</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 text-center md:text-left"
          >
            <div className="space-y-2">
              <Sparkles className="text-gold mx-auto md:mr-auto md:ml-0 w-8 h-8" />
              <h2 className="text-3xl font-serif text-aqua italic">Mis Padrinos</h2>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-gold font-serif uppercase tracking-widest text-xs mb-2">Acompañan con cariño</p>
                <p className="text-2xl font-serif text-gray-800">Carlos Eduardo Rojas Medina</p>
                <p className="text-2xl font-serif text-gray-800">Rosa Patricia Vargas Quispe</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. Detalles del Evento */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Calendar, title: 'Fecha', detail: 'Sábado 12 de Julio, 2026' },
              { icon: Clock, title: 'Hora', detail: '7:00 PM' },
              { icon: MapPin, title: 'Lugar', detail: 'Casa Verde - Salón de Eventos' },
              { icon: Shirt, title: 'Dress Code', detail: 'Elegante' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-pearl p-8 rounded-3xl border border-aqua/10 text-center space-y-4 hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-aqua/10 rounded-full flex items-center justify-center mx-auto text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-gold font-serif uppercase tracking-widest text-xs">{item.title}</h3>
                <p className="text-xl font-serif text-gray-800">{item.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Mapa Interactivo */}
      <section className="py-24 px-6 bg-aqua-soft">
        <div className="max-w-5xl mx-auto space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <MapIcon className="text-gold mx-auto w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-calligraphy text-aqua">Ubicación</h2>
            <p className="text-gray-600 font-serif">Te esperamos en este hermoso lugar</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white p-4 rounded-[2rem] shadow-2xl space-y-4"
          >
            <div className="w-full rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="https://res.cloudinary.com/dcnynnstm/image/upload/v1773723965/497927484_1363051325167172_558942534762591556_n_w2cdp4.jpg" 
                alt="Referencia del local" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="aspect-video w-full rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://maps.google.com/maps?q=Casa%20Verde%20Salón%20de%20Eventos&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          <div className="text-center">
            <motion.a
              href={MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 bg-gold text-white px-10 py-4 rounded-full font-semibold tracking-widest shadow-xl"
            >
              Cómo llegar <ChevronRight size={18} />
            </motion.a>
          </div>
        </div>
      </section>

      {/* 9. Itinerario de la Noche */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <Clock className="text-gold mx-auto w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-calligraphy text-aqua">Itinerario</h2>
            <p className="text-gray-500 font-serif tracking-widest uppercase text-xs">El desarrollo de la noche</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/50 to-transparent" />
            
            <div className="space-y-12">
              {ITINERARY.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex items-center gap-4 md:gap-8 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <p className="text-gold font-bold text-lg md:text-2xl font-serif">{item.time}</p>
                    <p className="text-gray-700 text-lg md:text-xl font-serif">{item.event}</p>
                  </div>
                  
                  <div className="relative flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 3, 
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      className="relative z-10 w-12 h-12 md:w-16 md:h-16 bg-white border-2 border-gold rounded-full flex items-center justify-center shadow-xl text-gold"
                    >
                      <item.icon size={24} className="md:w-8 md:h-8" />
                    </motion.div>
                    <div className="absolute w-4 h-4 bg-gold rounded-full blur-sm opacity-50 animate-pulse" />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 10. Shows y Presentaciones */}
      <section className="py-24 px-6 bg-pearl">
        <div className="max-w-6xl mx-auto space-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <Music className="text-gold mx-auto w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-calligraphy text-aqua">Shows & Música</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Orquesta Internacional', name: '"Son del Valle"', color: 'bg-aqua/10' },
              { title: 'DJ Residente', name: 'DJ Alex Beat', color: 'bg-gold/10' },
              { title: 'Show Coreográfico', name: 'Star Dance Crew', color: 'bg-aqua/10' },
              { title: 'Banda Festiva', name: 'Los Elegantes', color: 'bg-gold/10' }
            ].map((show, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className={`${show.color} p-8 rounded-3xl text-center space-y-2 border border-white/50 backdrop-blur-sm`}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500">{show.title}</p>
                <p className="text-xl font-serif font-bold text-gray-800">{show.name}</p>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-gold/20 text-center space-y-10"
          >
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <PartyPopper className="text-gold w-10 h-10" />
                </motion.div>
                <h3 className="text-4xl md:text-5xl font-calligraphy text-gold italic">Hora Loca Temática</h3>
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  <Zap className="text-aqua w-10 h-10" />
                </motion.div>
              </div>
              <p className="text-gray-600 text-lg font-serif">Una explosión de alegría, luces y diversión sin límites</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  {[
                    { name: 'Robots LED', icon: Zap },
                    { name: 'Batucada', icon: Music2 },
                    { name: 'Personajes', icon: Star },
                    { name: 'Cotillón', icon: PartyPopper }
                  ].map((item, i) => (
                    <motion.span 
                      key={i} 
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 px-6 py-3 bg-aqua/10 text-aqua rounded-full text-sm font-semibold tracking-wider border border-aqua/20"
                    >
                      <item.icon size={16} />
                      {item.name}
                    </motion.span>
                  ))}
                </div>
                <p className="text-gray-500 italic text-sm md:text-left">
                  Prepárate para la mejor fiesta de tu vida con efectos especiales y mucha energía.
                </p>
              </div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative group overflow-hidden rounded-2xl shadow-2xl aspect-video md:aspect-square"
              >
                <img 
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800" 
                  alt="Hora Loca Referencia" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6">
                  <p className="text-white font-serif italic text-sm">Diversión garantizada</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 11. Regalo Sugerido */}
      <section className="py-24 px-6 bg-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-8 bg-pearl p-12 rounded-[3rem] border-2 border-dashed border-gold/30"
        >
          <Gift className="text-gold mx-auto w-12 h-12" />
          <div className="space-y-4">
            <h2 className="text-3xl font-serif text-aqua">Regalo Sugerido</h2>
            <p className="text-xl font-serif text-gray-600 leading-relaxed">
              "Tu presencia es el mejor regalo. Pero si deseas obsequiar algo, se sugiere lluvia de sobres."
            </p>
          </div>
        </motion.div>
      </section>

      {/* 12. Confirmación de Asistencia */}
      <section className="py-24 px-6 bg-aqua text-white text-center relative overflow-hidden">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Heart size={400} fill="white" />
        </motion.div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-calligraphy">¿Nos acompañas?</h2>
            <p className="text-xl font-serif opacity-90">Por favor, confirma tu asistencia antes del 1 de Julio</p>
          </motion.div>

          <motion.button
            onClick={() => setIsModalOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-aqua px-12 py-5 rounded-full font-bold text-lg tracking-widest shadow-2xl hover:shadow-white/20 transition-all"
          >
            Confirmar asistencia
          </motion.button>
        </div>
      </section>

      {/* 13. Footer Final */}
      <footer className="py-24 px-6 bg-pearl text-center border-t border-gold/10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-12"
        >
          <div className="space-y-6">
            <p className="text-2xl md:text-3xl font-serif italic text-gray-700 leading-relaxed">
              "Gracias por ser parte de este momento tan especial en mi vida.
              ¡Te espero para celebrar juntos esta noche inolvidable!"
            </p>
            <div className="w-24 h-px bg-gold mx-auto" />
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl font-calligraphy gold-gradient">XV Años de Valeria Fernanda</h2>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-gray-500 font-serif text-sm tracking-widest uppercase">
              <span>12 Julio 2026</span>
              <span className="hidden md:block">•</span>
              <span>Casa Verde - Salón de Eventos</span>
            </div>
          </div>

          <p className="text-[10px] text-gold/50 uppercase tracking-[0.5em] pt-12">
            Hecho con amor para Valeria
          </p>
        </motion.div>
      </footer>
    </motion.div>
  )}
</div>
);
}
