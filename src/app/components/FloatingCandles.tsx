import { motion } from 'motion/react';

interface FloatingCandlesProps {
  count?: number;
}

export function FloatingCandles({ count = 10 }: FloatingCandlesProps) {
  const candles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <>
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            delay: candle.delay,
            duration: candle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute"
          style={{
            left: `${candle.x}%`,
            top: '20%',
          }}
        >
          <div className="relative">
            {/* Candle body */}
            <div className="w-2 h-8 bg-gradient-to-b from-[#f4e4c1] to-[#d4c4a1] rounded-sm" />
            {/* Flame */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -top-3 left-1/2 -translate-x-1/2"
            >
              <div className="w-3 h-4 bg-gradient-to-t from-[#FFD700] via-[#FFA500] to-transparent rounded-full blur-[1px]" />
            </motion.div>
            {/* Glow */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#FFD700] rounded-full blur-md opacity-50" />
          </div>
        </motion.div>
      ))}
    </>
  );
}
