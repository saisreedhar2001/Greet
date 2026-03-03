import { motion } from 'motion/react';
import { useState } from 'react';
import { FloatingCandles } from './FloatingCandles';

interface SpecialGiftProps {
  onNext: () => void;
}

export function SpecialGift({ onNext }: SpecialGiftProps) {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-center overflow-hidden p-4"
    >
      {/* Dark magical background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Floating candles */}
      <FloatingCandles count={12} />

      {/* Wizard with glowing wand */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute left-4 sm:left-12 top-1/4 z-20"
      >
        <div className="text-6xl sm:text-8xl">🧙‍♂️</div>
        <motion.div
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -right-8 top-0 text-4xl"
        >
          ✨
        </motion.div>
      </motion.div>

      {/* Golden particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{
            x: Math.random() * window.innerWidth - window.innerWidth / 2,
            y: window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: -window.innerHeight,
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: Math.random() * 3,
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
          }}
          className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-xl mx-auto text-center px-4">
        {!envelopeOpened ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: 'spring' }}
            className="flex flex-col items-center"
          >
            {/* Typing dialogue */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1 }}
              className="mb-8 px-4"
            >
              <p className="text-2xl sm:text-3xl font-serif text-[#FFD700] mb-4 leading-relaxed">
                Dear Akhila…
              </p>
              <p className="text-lg sm:text-xl font-serif text-[#4EC5F1] mb-3 leading-relaxed">
                On this most enchanted day…
              </p>
              <p className="text-lg sm:text-xl font-serif text-[#4EC5F1] mb-3 leading-relaxed">
                I present to you a rare and extraordinary gift.
              </p>
              <p className="text-lg sm:text-xl font-serif text-[#FFD700] font-bold leading-relaxed">
                You are hereby granted admission to
                <br />
                Hogwarts School of Witchcraft and Wizardry.
              </p>
            </motion.div>

            {/* Envelope */}
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 3.5, type: 'spring' }}
              whileHover={{ scale: 1.05 }}
              onClick={() => setEnvelopeOpened(true)}
              className="cursor-pointer mb-8"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                    '0 0 40px rgba(255, 215, 0, 0.8)',
                    '0 0 20px rgba(255, 215, 0, 0.5)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-32 h-20 sm:w-40 sm:h-24 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg shadow-2xl flex items-center justify-center text-5xl sm:text-6xl"
              >
                ✉️
              </motion.div>
              <p className="text-sm text-[#4EC5F1] mt-4 font-serif italic">
                Click to open
              </p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            {/* Light burst effect */}
            <motion.div
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute w-32 h-32 bg-[#FFD700] rounded-full blur-3xl"
            />

            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl sm:text-3xl font-serif text-[#FFD700] mb-8 font-bold"
            >
              Will you accept this destiny?
            </motion.p>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onNext}
              className="relative px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 15px rgba(255, 215, 0, 0.8)',
                    '0 0 30px rgba(255, 215, 0, 1)',
                    '0 0 15px rgba(255, 215, 0, 0.8)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <span className="relative z-10">👉 Accept the Magical Admission</span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
