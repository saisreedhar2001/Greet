import { useState } from 'react';
import { motion } from 'motion/react';

interface MagicalSpellProps {
  onNext: () => void;
  onCakeAppear?: () => void;
}

export function MagicalSpell({ onNext, onCakeAppear }: MagicalSpellProps) {
  const [cakeVisible, setCakeVisible] = useState(false);
  const [candlesLit, setCandlesLit] = useState(false);

  const castSpell = () => {
    setCakeVisible(true);
    if (onCakeAppear) {
      onCakeAppear();
    }
    setTimeout(() => {
      setCandlesLit(true);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-between overflow-hidden pb-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Birthday Decorations - Balloons */}
      {!cakeVisible && (
        <>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-20 left-10 text-6xl"
          >
            🎈
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="absolute top-32 right-20 text-6xl"
          >
            🎈
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="absolute top-16 left-1/3 text-6xl"
          >
            🎊
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="absolute top-24 right-1/3 text-6xl"
          >
            🎉
          </motion.div>
        </>
      )}

      {/* Magical particles swirling */}
      {cakeVisible && Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            scale: 0,
          }}
          animate={{
            x: window.innerWidth / 2 + (Math.random() - 0.5) * 300,
            y: window.innerHeight / 2 + (Math.random() - 0.5) * 300,
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeOut',
          }}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: Math.random() > 0.5 ? '#FFD700' : '#4EC5F1',
          }}
        />
      ))}

      {/* Initial text */}
      {!cakeVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="relative z-10 text-center mb-12"
        >
          <p className="text-4xl text-[#4EC5F1] font-serif italic mb-8">
            Let's create something magical…
          </p>
        </motion.div>
      )}

      {/* Wand */}
      {!cakeVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, rotate: -45 }}
          transition={{ delay: 1, type: 'spring' }}
          className="relative z-10 cursor-pointer"
          onClick={castSpell}
        >
          <motion.div
            animate={{
              rotate: [-45, -35, -45],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-8xl hover:scale-110 transition-transform"
          >
            🪄
          </motion.div>

          {/* Magical sparkles around wand */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                x: Math.cos((i / 12) * Math.PI * 2) * 60,
                y: Math.sin((i / 12) * Math.PI * 2) * 60,
              }}
              transition={{
                delay: i * 0.1,
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#FFD700] rounded-full"
            />
          ))}
        </motion.div>
      )}

      {/* Spell text */}
      {!cakeVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="relative z-10 mt-12 text-center"
        >
          <motion.p
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 215, 0, 0.8)',
                '0 0 30px rgba(255, 215, 0, 1)',
                '0 0 10px rgba(255, 215, 0, 0.8)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-5xl font-serif text-[#FFD700] italic"
          >
            Celebrata Lumina!
          </motion.p>
          <p className="text-xl text-[#4EC5F1] mt-4 font-serif">
            (Click the wand)
          </p>
        </motion.div>
      )}

      {/* Magical cake appearing with gifts and decorations */}
      {cakeVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 1.5 }}
          className="relative z-10 flex flex-col items-center flex-1 justify-center"
        >
          {/* Gift boxes around cake */}
          <div className="relative mb-8 flex gap-8 items-end">
            {/* Left gifts */}
            <motion.div
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-7xl"
            >
              🎁
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-6xl"
            >
              🎀
            </motion.div>

            {/* Big Cake */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="text-9xl mx-4"
            >
              🎂
            </motion.div>

            {/* Right gifts */}
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-6xl"
            >
              🎁
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-7xl"
            >
              🎉
            </motion.div>
          </div>

          {/* Candles lighting spell */}
          {!candlesLit && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: -80 }}
              transition={{ delay: 0.5 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 whitespace-nowrap"
            >
              <motion.p
                animate={{
                  textShadow: [
                    '0 0 10px rgba(255, 215, 0, 0.8)',
                    '0 0 30px rgba(255, 215, 0, 1)',
                    '0 0 10px rgba(255, 215, 0, 0.8)',
                  ],
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="text-4xl font-serif text-[#FFD700] italic"
              >
                Ignis Lumos!
              </motion.p>
            </motion.div>
          )}

          {/* Firecracker animation when cake is cut */}
          {candlesLit && (
            <>
              {/* Firecrackers bursting all around */}
              {Array.from({ length: 80 }).map((_, i) => {
                const angle = (i / 80) * Math.PI * 2;
                const distance = 300 + Math.random() * 200;
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;

                return (
                  <motion.div
                    key={`firecracker-${i}`}
                    initial={{
                      x: 0,
                      y: 0,
                      scale: 1,
                      opacity: 1,
                    }}
                    animate={{
                      x,
                      y,
                      scale: [1, 0.5, 0],
                      opacity: [1, 0.8, 0],
                    }}
                    transition={{
                      duration: 1.2 + Math.random() * 0.5,
                      delay: Math.random() * 0.2,
                      ease: 'easeOut',
                    }}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: ['#FFD700', '#FF4DA6', '#FF6B00', '#FFA500', '#FF1493'][
                          Math.floor(Math.random() * 5)
                        ],
                        boxShadow: `0 0 15px ${
                          ['#FFD700', '#FF4DA6', '#FF6B00', '#FFA500', '#FF1493'][
                            Math.floor(Math.random() * 5)
                          ]
                        }`,
                      }}
                    />
                  </motion.div>
                );
              })}

              {/* Glow effect */}
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFD700] rounded-full blur-3xl opacity-40 animate-pulse" />

              {/* Celebration text */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center z-20"
              >
                <motion.p
                  animate={{
                    textShadow: [
                      '0 0 20px rgba(255, 215, 0, 0.8)',
                      '0 0 40px rgba(255, 215, 0, 1)',
                      '0 0 20px rgba(255, 215, 0, 0.8)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl font-serif text-[#FFD700] font-bold"
                >
                  🎉 The Cake is Cut! 🎉
                </motion.p>
              </motion.div>
            </>
          )}
        </motion.div>
      )}

      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="w-96 h-96 bg-[#4EC5F1] rounded-full blur-3xl"
        />
      </div>

      {/* Next button when cake is cut - positioned at bottom right */}
      {candlesLit && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="absolute bottom-8 right-8 z-50 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg"
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
      )}
    </motion.div>
  );
}
