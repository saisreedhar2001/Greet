import { motion } from 'motion/react';
import { useState } from 'react';

interface ChooseHouseProps {
  onNext: () => void;
  onHouseSelect: (house: string) => void;
}

const HOUSES = [
  { name: 'Gryffindor', color: '#DC143C', glow: 'rgba(220, 20, 60, 0.6)', emoji: '🦁' },
  { name: 'Slytherin', color: '#00A651', glow: 'rgba(0, 166, 81, 0.6)', emoji: '🐍' },
  { name: 'Ravenclaw', color: '#4169E1', glow: 'rgba(65, 105, 225, 0.6)', emoji: '🦅' },
  { name: 'Hufflepuff', color: '#F0AD4E', glow: 'rgba(240, 173, 78, 0.6)', emoji: '🦡' },
];

export function ChooseHouse({ onNext, onHouseSelect }: ChooseHouseProps) {
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  const handleHouseSelect = (house: string) => {
    setSelectedHouse(house);
    onHouseSelect(house);
    // Play thunder effect could be added here
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-start overflow-y-auto p-4 pb-24"
    >
      {/* Dark chamber background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0F2B] via-[#1a1438] to-[#2E1A47]" />

      {/* Light rays */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-2xl"
        style={{
          background: 'radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Sorting Hat */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
        className="relative z-20 mb-8 text-8xl"
      >
        🎩
        <motion.div
          animate={{
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="origin-center"
        />
      </motion.div>

      {/* Dialogue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-20 text-center mb-8 max-w-2xl px-4 mt-12"
      >
        <p className="text-xl sm:text-2xl font-serif text-[#4EC5F1] italic leading-relaxed">
          "Ahhhh… Akhila…
          <br />I see courage… intelligence… kindness… ambition…
          <br />But where do you truly belong?"
        </p>
      </motion.div>

      {/* House Cards Grid */}
      <div className="relative z-20 grid grid-cols-2 gap-6 sm:gap-8 max-w-2xl mb-8 px-4">
        {HOUSES.map((house, index) => (
          <motion.div
            key={house.name}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + index * 0.2, type: 'spring' }}
            onClick={() => handleHouseSelect(house.name)}
            className="cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={
                selectedHouse === house.name
                  ? {
                      boxShadow: [
                        `0 0 20px ${house.glow}`,
                        `0 0 40px ${house.glow}`,
                        `0 0 20px ${house.glow}`,
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: Infinity }}
              className="relative p-6 rounded-2xl border-2 transition-all"
              style={{
                borderColor: house.color,
                backgroundColor: selectedHouse === house.name ? `${house.glow}` : 'rgba(46, 26, 71, 0.5)',
              }}
            >
              <div className="text-5xl mb-3 text-center">{house.emoji}</div>
              <p className="text-lg font-serif font-bold text-center" style={{ color: house.color }}>
                {house.name}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Next Button */}
      {selectedHouse && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="relative z-20 px-8 py-4 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-lg shadow-lg mt-8"
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
          <span className="relative z-10">👉 Generate My Hogwarts ID</span>
        </motion.button>
      )}
    </motion.div>
  );
}
