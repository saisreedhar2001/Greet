import { motion } from 'motion/react';
import { FloatingCandles } from './FloatingCandles';

interface GreatHallProps {
  onNext: () => void;
}

export function GreatHall({ onNext }: GreatHallProps) {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#2E1A47] via-[#1a1438] to-[#0D0F2B]" />

      {/* Great hall perspective */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        {/* Floor with perspective */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#1a1438] to-transparent"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'rotateX(60deg) translateZ(-200px)',
          }}
        >
          {/* Floor tiles */}
          <div className="grid grid-cols-8 h-full opacity-20">
            {Array.from({ length: 32 }).map((_, i) => (
              <div key={i} className="border border-[#FFD700]/20" />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating candles */}
      <FloatingCandles count={12} />

      {/* Magical particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight - 100,
              Math.random() * window.innerHeight,
            ],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            delay: Math.random() * 2,
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute w-1 h-1 bg-[#4EC5F1] rounded-full blur-[1px]"
        />
      ))}

      {/* Wizard students silhouettes */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 0.4, x: 100 }}
        transition={{ delay: 1, duration: 2 }}
        className="absolute left-20 bottom-32 text-8xl"
      >
        🧙
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 0.4, x: -50 }}
        transition={{ delay: 1.5, duration: 2 }}
        className="absolute right-32 bottom-40 text-7xl"
      >
        🧙‍♀️
      </motion.div>

      {/* Floating decorations */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-40 left-1/4 text-6xl opacity-60"
      >
        🎀
      </motion.div>

      <motion.div
        animate={{
          y: [0, -15, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
        className="absolute top-32 right-1/4 text-5xl opacity-60"
      >
        🎊
      </motion.div>

      {/* Central text */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="relative z-10 text-center max-w-2xl px-8 mb-32"
      >
        <motion.div
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 215, 0, 0.5)',
              '0 0 40px rgba(255, 215, 0, 0.8)',
              '0 0 20px rgba(255, 215, 0, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="font-serif text-5xl text-[#FFD700] mb-6"
        >
          The Great Hall Awaits
        </motion.div>
        <p className="text-2xl text-[#4EC5F1] font-serif italic">
          Something magical is being prepared...
        </p>
      </motion.div>

      {/* Glowing lights */}
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#FFD700] rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#4EC5F1] rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* Next Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="absolute bottom-8 right-8 z-50 relative px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 215, 0, 0.8)',
              '0 0 20px rgba(255, 215, 0, 1)',
              '0 0 10px rgba(255, 215, 0, 0.8)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        />
        <span className="relative z-10">Next ➜</span>
      </motion.button>
      </motion.div>
      );
      }
