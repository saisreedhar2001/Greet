import { motion } from 'motion/react';

interface HogwartsIDProps {
  house: string | null;
  onNext: () => void;
}

const HOUSE_COLORS: { [key: string]: string } = {
  Gryffindor: '#DC143C',
  Slytherin: '#00A651',
  Ravenclaw: '#4169E1',
  Hufflepuff: '#F0AD4E',
};

const HOUSE_ANIMALS: { [key: string]: string } = {
  Gryffindor: '🦁',
  Slytherin: '🐍',
  Ravenclaw: '🦅',
  Hufflepuff: '🦡',
};

export function HogwartsID({ house, onNext }: HogwartsIDProps) {
  const houseColor = house ? HOUSE_COLORS[house] : '#FFD700';

  const downloadCard = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 500;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/Hogwarts_ID_Akhila_Gryffindor.png';
      
      img.onload = () => {
        // Background with house color top
        ctx.fillStyle = houseColor;
        ctx.fillRect(0, 0, 500, 180);
        ctx.fillStyle = '#f4e4c1';
        ctx.fillRect(0, 180, 500, 720);

        // School name on colored section
        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px serif';
        ctx.textAlign = 'center';
        ctx.fillText('HOGWARTS SCHOOL OF', 250, 50);
        ctx.fillText('WITCHCRAFT & WIZARDRY', 250, 85);

        // Student ID Card label
        ctx.fillStyle = '#2E1A47';
        ctx.font = 'bold 16px serif';
        ctx.fillText('STUDENT ID CARD', 250, 145);

        // Circular photo - much larger with padding
        ctx.save();
        ctx.beginPath();
        ctx.arc(250, 290, 85, 0, Math.PI * 2);
        ctx.fillStyle = houseColor;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = houseColor;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.arc(250, 290, 82, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(img, 168, 208, 164, 164);
        ctx.restore();

        // Name - with padding
        ctx.font = 'bold 40px serif';
        ctx.fillStyle = houseColor;
        ctx.textAlign = 'center';
        ctx.fillText('AKHILA', 250, 430);

        // House - with padding
        ctx.font = '16px serif';
        ctx.fillStyle = '#666';
        ctx.textAlign = 'center';
        ctx.fillText('House: ' + (house || 'Unknown'), 250, 470);

        // Top divider line
        ctx.strokeStyle = houseColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, 495);
        ctx.lineTo(460, 495);
        ctx.stroke();

        // Details section - centered with line spacing
        ctx.font = '14px serif';
        ctx.fillStyle = '#2E1A47';
        ctx.textAlign = 'center';
        
        // Add background for details section
        ctx.fillStyle = 'rgba(255, 215, 0, 0.05)';
        ctx.fillRect(40, 510, 420, 115);
        
        ctx.fillStyle = '#2E1A47';
        ctx.fillText('Title: The Birthday Queen of Hogwarts', 250, 540);
        ctx.fillText('Special Power: More Magical & Prettier', 250, 575);
        ctx.fillText('Authorized By: Headmaster Dumbledore', 250, 610);

        // Bottom divider
        ctx.strokeStyle = houseColor;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(40, 635);
        ctx.lineTo(460, 635);
        ctx.stroke();

        // ID Number at bottom - with padding
        ctx.font = '13px monospace';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#666';
        ctx.fillText('ID: HGW-2024-AKHILA', 250, 680);

        // Star decoration
        ctx.font = 'bold 36px serif';
        ctx.fillStyle = houseColor;
        ctx.textAlign = 'center';
        ctx.fillText('⭐', 250, 750);
        
        // Bottom decoration line
        ctx.strokeStyle = houseColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(125, 790);
        ctx.lineTo(375, 790);
        ctx.stroke();

        // Download
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `Hogwarts_ID_Akhila_${house || 'Unassigned'}.png`;
        link.click();
      };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
      className="relative size-full flex flex-col items-center justify-center overflow-hidden p-4"
    >
      {/* Parchment background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4e4c1] via-[#e8d4b0] to-[#d4c4a1]" />

      {/* Sparkles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: i * 0.1,
            duration: 2,
            repeat: Infinity,
          }}
          className="absolute text-2xl pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Floating feather */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-12 right-12 text-4xl opacity-70"
      >
        🪶
      </motion.div>

      {/* ID Card */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1, type: 'spring' }}
        className="relative z-10 w-full max-w-xs mx-auto"
      >
        {/* College ID Card Design */}
        <motion.div
          animate={{
            boxShadow: [
              `0 0 20px ${houseColor}40`,
              `0 0 40px ${houseColor}80`,
              `0 0 20px ${houseColor}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="rounded-2xl overflow-hidden shadow-2xl"
          style={{ borderTop: `8px solid ${houseColor}` }}
        >
          {/* Top Color Section */}
          <div
            className="p-6 text-white text-center"
            style={{ backgroundColor: houseColor }}
          >
            <p className="text-xs uppercase tracking-widest font-bold mb-1">Hogwarts School</p>
            <p className="text-sm uppercase tracking-widest font-bold">of Witchcraft & Wizardry</p>
            <p className="text-xs uppercase tracking-widest mt-2">Student ID Card</p>
          </div>

          {/* Main Content */}
          <div className="bg-[#f4e4c1] p-6 space-y-3">
            {/* Photo Section */}
            <div className="text-center mb-4">
              <div className="w-24 h-24 mx-auto rounded-full border-4 overflow-hidden shadow-md" style={{ borderColor: houseColor }}>
                <img 
                  src="/Hogwarts_ID_Akhila_Gryffindor.png"
                  alt="Student ID Photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name Section */}
            <div className="text-center border-b-2 pb-3" style={{ borderColor: houseColor }}>
              <p className="text-xs uppercase tracking-wider text-gray-600 mb-1">Student Name</p>
              <motion.p
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold"
                style={{ color: houseColor }}
              >
                AKHILA
              </motion.p>
            </div>

            {/* House & Details */}
            <div className="space-y-2">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">House</p>
                <p className="text-lg font-bold" style={{ color: houseColor }}>
                  {house || 'Unknown House'}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">Title</p>
                <p className="text-xs font-semibold text-pink-600">Princess of Hogwarts</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">Special Power</p>
                <p className="text-xs font-semibold text-purple-600">
                  More Magical & Prettier Than Hermione
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">Authorized By</p>
                <p className="text-xs font-bold" style={{ color: houseColor }}>
                  Headmaster Dumbledore
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center border-t-2 pt-2" style={{ borderColor: houseColor }}>
              <p className="text-xs text-gray-600 font-mono">ID: HGW-2024-AKHILA</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Buttons - positioned right center with vertical stack */}
      <div className="absolute right-2 sm:right-12 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 sm:gap-4 px-2 sm:px-0">
        {/* Birthday Letter Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#2E1A47] rounded-full font-serif text-xs sm:text-sm shadow-lg whitespace-nowrap"
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
          <span className="relative z-10">💌 Birthday Letter</span>
        </motion.button>

        {/* Download ID Card Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={downloadCard}
          className="px-4 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-[#4EC5F1] to-[#9D4EDD] text-white rounded-full font-serif text-xs sm:text-sm shadow-lg whitespace-nowrap"
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 15px rgba(78, 197, 241, 0.8)',
                '0 0 30px rgba(78, 197, 241, 1)',
                '0 0 15px rgba(78, 197, 241, 0.8)',
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
          />
          <span className="relative z-10">📥 Download Card</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
