import { motion } from 'motion/react';
import { useState } from 'react';

interface MagicalLetterProps {
  onExit: () => void;
}

export function MagicalLetter({ onExit }: MagicalLetterProps) {
  const [showFireworks, setShowFireworks] = useState(false);

  const handleLetterComplete = () => {
    setShowFireworks(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-center overflow-hidden p-4"
    >
      {/* Candle-lit room background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Window with fireworks */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-[#FFD700]/20 to-transparent rounded-full blur-3xl"
      />

      {/* Golden aura */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 bg-radial-gradient pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Fireworks animation */}
      {showFireworks &&
        Array.from({ length: 40 }).map((_, i) => (
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
              delay: Math.random() * 0.5,
              duration: 2,
            }}
            className="absolute"
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{
                background: ['#FFD700', '#FF4DA6', '#4EC5F1', '#9D4EDD'][Math.floor(Math.random() * 4)],
              }}
            />
          </motion.div>
        ))}

      {/* Owl decoration - made larger and more visible */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 z-20"
      >
        <span className="text-8xl">🦉</span>
      </motion.div>

      {/* Main letter content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="relative z-10 max-w-2xl mx-auto h-[80vh] overflow-y-auto"
      >
        {/* Parchment background */}
        <div className="bg-gradient-to-br from-[#f4e4c1] to-[#d4c4a1] p-8 sm:p-12 rounded-lg shadow-2xl border-4 border-[#8B4513]/30">
          {/* Letter content */}
          <div className="space-y-4 text-[#2E1A47]">
            {/* Greeting - Updated */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="font-handwriting text-2xl space-y-2"
            >
              <p>Hi, Akhila.</p>
              <p>I don’t want this to sound like a movie dialogue 😅 ..</p>
              <p>I just want it to be real.</p>
            </motion.div>

            {/* Body */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="space-y-3 font-handwriting text-lg leading-relaxed"
            >
              <p>
              You came into my life so naturally, as if you were always meant to be there.
              But the difference you made… is beautifully immeasurable. 💛
              </p>
              <p>
               There’s something about you that feels calm and strong at the same time.
              You’re soft in the way you speak, but fierce in the way you chase what you want.
              You think deeply. You care genuinely. And you dream boldly.
              </p>
              <p>
                And I admire you so much.

                I admire how you don’t give up easily.
                I admire how you carry yourself with quiet confidence.
                I admire the way your presence changes the energy of a room.

              </p>

              <p>
                You don't even realize how powerful you are. On your birthday, I wish you happiness. I wish you strength when days feel heavy. I wish you success that feels earned and satisfying.
              </p>

              <p>
                No matter what, I am always proud of you. Not just for what you achieve, but for who you are.
              </p>
            </motion.div>

            {/* Signature Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5 }}
              className="pt-8 mt-8 border-t border-[#8B4513]/30"
            >
              <p className="font-handwriting text-xl mb-2">Happy Birthday, Junnuuuu 🤍</p>
              <p className="font-handwriting text-lg mb-4">May this year surprise you in the best possible ways.</p>
              <p className="font-handwriting text-base">- From someone who truly values you.</p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Exit button in bottom right - routes to landing page */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onExit}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-[#FF4DA6] to-[#9D4EDD] text-white rounded-full font-serif text-xs sm:text-sm shadow-2xl font-semibold"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 77, 166, 0.5)',
              '0 0 20px rgba(255, 77, 166, 0.8)',
              '0 0 10px rgba(255, 77, 166, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        />
        <span className="relative z-10">Exit</span>
      </motion.button>

      {/* Birthday text - appears after letter */}
      {showFireworks && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative z-10 mt-8"
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
            className="text-4xl sm:text-5xl font-serif text-[#FFD700] font-bold text-center"
          >
            ✨ HAPPY BIRTHDAY AKHILA ✨
          </motion.p>
        </motion.div>
      )}

      {/* Trigger completion after letter is fully visible */}
      <motion.div onAnimationComplete={handleLetterComplete} />
    </motion.div>
  );
}
