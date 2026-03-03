import { motion } from 'motion/react';

interface VideoMessageProps {
  onExit?: () => void;
}

export function VideoMessage({ onExit }: VideoMessageProps) {
  const handleExit = () => {
    if (onExit) {
      onExit();
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-center overflow-hidden p-2 sm:p-4"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Soft sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 0.6, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            delay: Math.random() * 5,
            duration: 3,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
          className="absolute w-1 h-1 bg-[#FFD700] rounded-full blur-[1px]"
        />
      ))}

      {/* Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 max-w-2xl w-full h-full flex flex-col items-center justify-center"
      >
        {/* Header text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-lg sm:text-2xl text-[#4EC5F1] font-serif italic text-center mb-3 sm:mb-6"
        >
          One more message from someone special…
        </motion.p>

        {/* Magical frame for video */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, type: 'spring' }}
          className="relative w-full flex-1 max-h-80"
        >
          {/* Glowing border effect */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 30px rgba(255, 215, 0, 0.5)',
                '0 0 60px rgba(255, 215, 0, 0.8)',
                '0 0 30px rgba(255, 215, 0, 0.5)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -inset-2 bg-gradient-to-br from-[#FFD700] via-[#4EC5F1] to-[#9D4EDD] rounded-2xl blur-md opacity-50"
          />

          {/* Inner frame */}
          <div className="relative bg-gradient-to-br from-[#2E1A47] to-[#1a1438] p-3 sm:p-4 rounded-lg h-full">
            {/* Corner decorations - hidden on mobile */}
            <div className="hidden sm:block absolute top-2 left-2 text-2xl opacity-70">✨</div>
            <div className="hidden sm:block absolute top-2 right-2 text-2xl opacity-70">✨</div>
            <div className="hidden sm:block absolute bottom-2 left-2 text-2xl opacity-70">✨</div>
            <div className="hidden sm:block absolute bottom-2 right-2 text-2xl opacity-70">✨</div>

            {/* Video placeholder */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#0D0F2B] to-[#2E1A47] rounded-lg overflow-hidden flex items-center justify-center border-2 border-[#FFD700]/30">
              {/* Placeholder content */}
              <div className="text-center p-3">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-4xl sm:text-6xl mb-2"
                >
                  🎥
                </motion.div>
                <p className="text-xs sm:text-lg text-[#FFD700] font-serif mb-1">
                  Video Message
                </p>
              </div>

              {/* Floating sparkles around video */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    delay: i * 0.2,
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="absolute text-2xl"
                  style={{
                    left: `${(i / 8) * 100}%`,
                    top: i % 2 === 0 ? '0%' : '100%',
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </div>
          </div>

          {/* Floating particles around frame */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.sin(i) * 20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                delay: i * 0.2,
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute w-1 h-1 rounded-full"
              style={{
                background: ['#FFD700', '#4EC5F1', '#FF4DA6'][i % 3],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        {/* Bottom message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
          className="text-center mt-3 sm:mt-6 px-2"
        >
          <motion.p
            animate={{
              textShadow: [
                '0 0 10px rgba(255, 215, 0, 0.5)',
                '0 0 20px rgba(255, 215, 0, 0.8)',
                '0 0 10px rgba(255, 215, 0, 0.5)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm sm:text-xl font-serif text-[#FFD700] italic"
          >
            "May all your dreams shine brighter."
          </motion.p>
        </motion.div>
        </motion.div>

      {/* Exit Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleExit}
        className="absolute bottom-8 right-8 z-50 relative px-6 py-3 bg-gradient-to-r from-[#FF4DA6] to-[#9D4EDD] text-white rounded-full font-serif shadow-lg"
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 77, 166, 0.8)',
              '0 0 20px rgba(255, 77, 166, 1)',
              '0 0 10px rgba(255, 77, 166, 0.8)',
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        />
        <span className="relative z-10">Exit</span>
      </motion.button>

       {/* Dreamy background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4EC5F1] rounded-full blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF4DA6] rounded-full blur-3xl opacity-10 animate-pulse" />
      </motion.div>
      );
      }
