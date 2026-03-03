import { motion } from 'motion/react';
import { useState } from 'react';
import { Sparkles } from './Sparkles';
import { FloatingCandles } from './FloatingCandles';
import { WordSearchPuzzle } from './WordSearchPuzzle';

interface LandingSceneProps {
  onNext: () => void;
}

export function LandingScene({ onNext }: LandingSceneProps) {
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [puzzleSolved, setPuzzleSolved] = useState(false);

  const handleOpenLetter = () => {
    setShowPuzzle(true);
  };

  const handlePuzzleComplete = () => {
    setPuzzleSolved(true);
  };

  return (
    <div className="relative size-full flex items-center justify-center overflow-hidden">
      {/* Dark night background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />
      
      {/* Stars twinkling */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
          }}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
        />
      ))}
      
      {/* Castle silhouette - Hogwarts inspired */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64"
      >
        <svg viewBox="0 0 800 200" className="w-full h-full">
          <path
            d="M0 200 L0 150 L50 150 L50 120 L80 120 L80 100 L100 100 L100 80 L120 80 L120 60 L150 60 L150 80 L170 80 L170 100 L200 100 L200 120 L230 120 L230 100 L260 100 L260 80 L290 80 L290 60 L320 60 L320 40 L350 40 L350 60 L380 60 L380 80 L410 80 L410 100 L440 100 L440 120 L470 120 L470 100 L500 100 L500 80 L530 80 L530 60 L560 60 L560 80 L590 80 L590 100 L620 100 L620 120 L650 120 L650 150 L700 150 L700 120 L730 120 L730 150 L800 150 L800 200 Z"
            fill="#000"
            opacity="0.5"
          />
        </svg>
      </motion.div>

      {/* Dumbledore icon - small and simple */}
      {!showPuzzle && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1.5, type: 'spring' }}
          className="absolute left-2 sm:left-10 top-20 sm:top-32 z-20"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <div className="text-6xl sm:text-8xl">🧙‍♂️</div>
            
            {/* Magical wand effect */}
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-4 top-1/2 text-3xl sm:text-4xl"
            >
              ✨
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Floating candles */}
      <FloatingCandles count={8} />

      {/* Flying owl with letter */}
      {!showPuzzle && (
        <motion.div
          initial={{ x: -200, y: 100, opacity: 0 }}
          animate={{ x: window.innerWidth / 2 - 100, y: 150, opacity: 1 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute"
        >
          <div className="relative">
            <div className="text-6xl">🦉</div>
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 3, duration: 1, type: 'spring' }}
              className="absolute -bottom-4 -right-4 text-4xl"
            >
              ✉️
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Magical parchment letter */}
      {!showPuzzle && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 4, duration: 1, type: 'spring' }}
          className="relative z-10 max-w-xs sm:max-w-md mx-auto px-4 sm:px-8"
        >
          <div className="relative bg-gradient-to-br from-[#f4e4c1] to-[#d4c4a1] p-6 sm:p-12 rounded-lg shadow-2xl border-4 border-[#8B4513]/30">
            {/* Magical glow */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                  '0 0 40px rgba(255, 215, 0, 0.7)',
                  '0 0 20px rgba(255, 215, 0, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-lg"
            />

            {/* Wax seal */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 4.5, type: 'spring' }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-[#8B0000] to-[#DC143C] rounded-full flex items-center justify-center shadow-lg"
            >
              <div className="text-3xl">🦁</div>
            </motion.div>

            {/* Letter content */}
            <div className="relative text-center space-y-4 sm:space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.5 }}
                className="font-serif text-[#2E1A47]"
              >
                <p className="text-xs sm:text-sm uppercase tracking-widest text-[#8B4513] mb-1 sm:mb-2">Hogwarts School of Witchcraft and Wizardry</p>
                <p className="text-xl sm:text-2xl italic mb-2 sm:mb-4">Dear Akhila,</p>
                <p className="text-base sm:text-xl leading-relaxed">
                  You are invited to a magical celebration tonight.
                </p>
              </motion.div>

              {/* Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 5.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpenLetter}
                className="relative mt-6 sm:mt-8 px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg"
              >
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 10px rgba(255, 215, 0, 0.8)',
                      '0 0 25px rgba(255, 215, 0, 1)',
                      '0 0 10px rgba(255, 215, 0, 0.8)',
                    ],
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-full"
                />
                <span className="relative z-10">Accept the Quest</span>
              </motion.button>

              {/* Sparkles around button */}
              <Sparkles />
            </div>
          </div>
        </motion.div>
      )}

      {/* Word Search Puzzle */}
      {showPuzzle && !puzzleSolved && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 px-2 sm:px-8 max-w-full h-full flex items-center justify-center overflow-auto"
        >
          <div className="w-full">
            <WordSearchPuzzle onComplete={handlePuzzleComplete} />
          </div>
        </motion.div>
      )}

      {/* Portal button after puzzle solved */}
      {puzzleSolved && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1 }}
          className="relative z-10 text-center px-4 sm:px-8"
        >
          <motion.div
            animate={{
              textShadow: [
                '0 0 20px rgba(255, 215, 0, 0.8)',
                '0 0 40px rgba(255, 215, 0, 1)',
                '0 0 20px rgba(255, 215, 0, 0.8)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl sm:text-4xl text-[#FFD700] font-serif mb-4 sm:mb-8"
          >
            🔑 The Portal Key is Yours! 🔑
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNext}
            className="relative px-8 sm:px-12 py-3 sm:py-5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg sm:text-2xl shadow-lg"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(255, 215, 0, 0.8)',
                  '0 0 40px rgba(255, 215, 0, 1)',
                  '0 0 20px rgba(255, 215, 0, 0.8)',
                ],
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
            />
            <span className="relative z-10">Enter the Great Hall</span>
          </motion.button>

          {/* Portal effect */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
              scale: { duration: 2, repeat: Infinity },
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10"
          >
            <div className="w-96 h-96 rounded-full bg-gradient-to-r from-[#FFD700] via-[#4EC5F1] to-[#9D4EDD] opacity-30 blur-3xl" />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}