import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface GrandRevealProps {
  onNext: () => void; // Now used for exit
}

const HP_CHARACTERS = [
  { emoji: '⚡', name: 'Harry Potter', wish: 'May your magic shine bright! 🎂✨', color: '#DC143C', delay: 2 },
  { emoji: '🧙‍♀️', name: 'Hermione', wish: 'Knowledge, wisdom & joy! 📚💫', color: '#8B4513', delay: 2.5 },
  { emoji: '🧙‍♂️', name: 'Dumbledore', wish: 'Happiness in all times! 💫', color: '#4169E1', delay: 3 },
];

export function GrandReveal({ onNext }: GrandRevealProps) {
  const [showCharacters, setShowCharacters] = useState(false);

  useEffect(() => {
    // Show characters after initial fireworks
    const characterTimer = setTimeout(() => {
      setShowCharacters(true);
    }, 2000);

    return () => {
      clearTimeout(characterTimer);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-between overflow-y-auto p-4 sm:p-8"
    >
      {/* Dark background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Fireworks */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            scale: 0,
            opacity: 0,
          }}
          animate={{
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 600,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 400,
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: Math.random() * 2,
            duration: 2,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
          className="absolute"
        >
          <div
            className="w-4 h-4 rounded-full"
            style={{
              background: ['#FFD700', '#FF4DA6', '#4EC5F1', '#9D4EDD'][
                Math.floor(Math.random() * 4)
              ],
              boxShadow: `0 0 20px ${
                ['#FFD700', '#FF4DA6', '#4EC5F1', '#9D4EDD'][
                  Math.floor(Math.random() * 4)
                ]
              }`,
            }}
          />
        </motion.div>
      ))}

      {/* Confetti */}
      {Array.from({ length: 100 }).map((_, i) => (
        <motion.div
          key={`confetti-${i}`}
          initial={{
            x: Math.random() * window.innerWidth,
            y: -50,
            rotate: 0,
          }}
          animate={{
            y: window.innerHeight + 50,
            rotate: Math.random() * 720,
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 3 + Math.random() * 2,
            ease: 'linear',
            repeat: Infinity,
          }}
          className="absolute w-2 h-3 opacity-80"
          style={{
            background: ['#FFD700', '#FF4DA6', '#4EC5F1', '#9D4EDD', '#FFA500'][
              Math.floor(Math.random() * 5)
            ],
          }}
        />
      ))}

      {/* Sparkle bursts */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: i * 0.1,
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="absolute text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Main birthday message */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', duration: 1.5 }}
        className="relative z-10 text-center px-4 sm:px-8 flex-shrink-0"
      >
        <motion.div
          animate={{
            textShadow: [
              '0 0 20px rgba(255, 215, 0, 0.8)',
              '0 0 60px rgba(255, 215, 0, 1)',
              '0 0 20px rgba(255, 215, 0, 0.8)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          {/* Sparkles around text */}
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="hidden sm:block absolute -left-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            ✨
          </motion.span>
          <motion.span
            animate={{ rotate: -360 }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            className="hidden sm:block absolute -right-12 top-1/2 -translate-y-1/2 text-4xl"
          >
            ✨
          </motion.span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FF4DA6]">
            Happy Birthday
          </h1>
          <motion.h2
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            className="text-6xl sm:text-7xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-[#FF4DA6] via-[#9D4EDD] to-[#4EC5F1] mt-2 sm:mt-4"
          >
            Akhila
          </motion.h2>
        </motion.div>

        {/* Magical glow behind text */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-[#FFD700] rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 sm:w-[500px] h-64 sm:h-[500px] bg-[#FF4DA6] rounded-full blur-3xl"
          />
        </div>
      </motion.div>

      {/* Harry Potter Characters Wishing */}
      {showCharacters && (
        <div className="w-full z-20 flex-1 flex items-start justify-center overflow-y-auto mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 max-w-4xl mx-auto px-2">
            {HP_CHARACTERS.map((character, index) => (
              <motion.div
                key={character.name}
                initial={{ y: 100, opacity: 0, scale: 0.5 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{
                  delay: character.delay,
                  type: 'spring',
                  damping: 12,
                }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-[#2E1A47]/95 to-[#1a1438]/95 backdrop-blur-md rounded-lg sm:rounded-2xl p-2 sm:p-4 border-2 border-[#FFD700]/30 shadow-2xl hover:scale-105 transition-transform h-full">
                  {/* Character emoji */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: character.delay,
                    }}
                    className="text-3xl sm:text-4xl mb-1 text-center"
                  >
                    {character.emoji}
                  </motion.div>

                  {/* Character name */}
                  <div
                    className="font-serif text-center text-xs sm:text-sm"
                    style={{ color: character.color }}
                  >
                    {character.name}
                  </div>

                  {/* Wish */}
                  <p className="text-xs text-[#FFD700] text-center font-serif italic leading-tight mt-1">
                    {character.wish}
                  </p>

                  {/* Magical sparkle corner */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
                      scale: { duration: 1.5, repeat: Infinity },
                    }}
                    className="absolute -top-1 -right-1 text-lg"
                  >
                    ⭐
                  </motion.div>

                  {/* Glow effect on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 rounded-lg sm:rounded-2xl"
                    style={{
                      boxShadow: `0 0 30px ${character.color}`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Crackers */}
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="absolute top-12 left-12 text-5xl sm:text-7xl"
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ scale: 0, rotate: 45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring' }}
        className="absolute top-12 right-12 text-5xl sm:text-7xl"
      >
        🎉
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.9, type: 'spring' }}
        className="absolute top-32 left-1/4 text-4xl sm:text-6xl"
      >
        🎊
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        className="absolute top-32 right-1/4 text-4xl sm:text-6xl"
      >
        🎊
      </motion.div>

      {/* Next Page Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="fixed bottom-8 right-8 z-50 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg"
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