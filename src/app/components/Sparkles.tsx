import { motion } from 'motion/react';

export function Sparkles() {
  const sparkles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: -100 + Math.random() * 200,
    y: -100 + Math.random() * 200,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-visible">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            delay: sparkle.delay,
            duration: sparkle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute text-[#FFD700]"
          style={{
            left: `calc(50% + ${sparkle.x}px)`,
            top: `calc(50% + ${sparkle.y}px)`,
            fontSize: `${0.5 + Math.random() * 0.5}rem`,
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
}
