import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface WordSearchPuzzleProps {
  onComplete: () => void;
}

const WORDS = ['AKHILA', 'ROSE', 'KANHA', 'MANGO', 'JUNNU'];

// Create a 10x10 grid with hidden words
const createGrid = () => {
  const grid: string[][] = Array(10).fill(null).map(() => Array(10).fill(''));
  
  // Place words in the grid
  const placements = [
    { word: 'AKHILA', row: 2, col: 1, dir: 'horizontal' },
    { word: 'ROSE', row: 1, col: 7, dir: 'vertical' },
    { word: 'KANHA', row: 5, col: 1, dir: 'horizontal' },
    { word: 'MANGO', row: 7, col: 2, dir: 'horizontal' },
    { word: 'JUNNU', row: 3, col: 8, dir: 'vertical' },
  ];

  placements.forEach(({ word, row, col, dir }) => {
    for (let i = 0; i < word.length; i++) {
      if (dir === 'horizontal') {
        grid[row][col + i] = word[i];
      } else if (dir === 'vertical') {
        grid[row + i][col] = word[i];
      } else if (dir === 'diagonal') {
        grid[row + i][col + i] = word[i];
      }
    }
  });

  // Fill empty spaces with random letters
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (!grid[i][j]) {
        grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
      }
    }
  }

  return grid;
};

export function WordSearchPuzzle({ onComplete }: WordSearchPuzzleProps) {
  const [grid] = useState(createGrid());
  const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set());
  const [isDragging, setIsDragging] = useState(false);
  const [currentWord, setCurrentWord] = useState('');
  const [showHarryHelp, setShowHarryHelp] = useState(false);
  const [spellInput, setSpellInput] = useState('');
  const [spellAttempted, setSpellAttempted] = useState(false);

  useEffect(() => {
    if (foundWords.size === WORDS.length) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [foundWords, onComplete]);

  const getCellKey = (row: number, col: number) => `${row}-${col}`;

  const handleStartSelection = (row: number, col: number) => {
    setIsDragging(true);
    setSelectedCells(new Set([getCellKey(row, col)]));
    setCurrentWord(grid[row][col]);
  };

  const handleContinueSelection = (row: number, col: number) => {
    if (isDragging) {
      const key = getCellKey(row, col);
      setSelectedCells(prev => new Set([...prev, key]));
      setCurrentWord(prev => prev + grid[row][col]);
    }
  };

  const handleEndSelection = () => {
    setIsDragging(false);
    
    // Check if current word matches any of the target words
    const matchedWord = WORDS.find(word => currentWord.includes(word));
    if (matchedWord && !foundWords.has(matchedWord)) {
      setFoundWords(prev => new Set([...prev, matchedWord]));
    }
    
    setSelectedCells(new Set());
    setCurrentWord('');
  };

  const handleTouchStart = (e: React.TouchEvent, row: number, col: number) => {
    e.preventDefault();
    handleStartSelection(row, col);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.dataset.cellKey) {
      const [row, col] = element.dataset.cellKey.split('-').map(Number);
      handleContinueSelection(row, col);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    handleEndSelection();
  };

  const handleSpellSubmit = () => {
    if (spellInput.toUpperCase().trim() === 'AKHILA BEAUTIFICA SUPREMA!') {
      onComplete();
      setShowHarryHelp(false);
    } else {
      setSpellAttempted(true);
    }
  };

  return (
    <div className="relative w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-[#2E1A47]/90 to-[#1a1438]/90 backdrop-blur-xl p-2 sm:p-4 rounded-2xl border-2 border-[#FFD700]/40 shadow-2xl w-full h-full flex flex-col overflow-hidden"
      >
        <motion.h3
          animate={{
            textShadow: [
              '0 0 10px rgba(255, 215, 0, 0.5)',
              '0 0 20px rgba(255, 215, 0, 0.8)',
              '0 0 10px rgba(255, 215, 0, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-lg sm:text-2xl font-serif text-[#FFD700] text-center mb-1"
        >
          ⚡ Magical Puzzle ⚡
        </motion.h3>
        <p className="text-xs text-[#4EC5F1] text-center mb-2 font-serif italic">
          Find the words to unlock
        </p>

        {/* Word list */}
        <div className="flex flex-wrap justify-center gap-1 mb-2 px-2">
          {WORDS.map((word, index) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <motion.div
                className={`px-2 py-0.5 rounded-full border border-2 transition-all font-serif text-xs ${
                  foundWords.has(word)
                    ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500] border-[#FFD700] text-[#2E1A47] shadow-lg'
                    : 'bg-transparent border-[#4EC5F1] text-[#4EC5F1]'
                }`}
                animate={
                  foundWords.has(word)
                    ? {
                        boxShadow: [
                          '0 0 10px rgba(255, 215, 0, 0.5)',
                          '0 0 20px rgba(255, 215, 0, 0.8)',
                          '0 0 10px rgba(255, 215, 0, 0.5)',
                        ],
                      }
                    : {}
                }
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {foundWords.has(word) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block mr-1"
                  >
                    ✓
                  </motion.span>
                )}
                {word}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Grid */}
        <div
          className="flex justify-center select-none overflow-auto flex-1 px-2"
          onMouseUp={handleEndSelection}
          onMouseLeave={handleEndSelection}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid gap-0.5 bg-[#0D0F2B]/60 p-1 sm:p-2 rounded-lg backdrop-blur-sm border border-[#4EC5F1]/30 my-auto">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-0.5">
                {row.map((letter, colIndex) => {
                  const cellKey = getCellKey(rowIndex, colIndex);
                  const isSelected = selectedCells.has(cellKey);
                  
                  return (
                    <motion.div
                      key={cellKey}
                      data-cell-key={cellKey}
                      onMouseDown={() => handleStartSelection(rowIndex, colIndex)}
                      onMouseEnter={() => handleContinueSelection(rowIndex, colIndex)}
                      onTouchStart={(e) => handleTouchStart(e, rowIndex, colIndex)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center
                        font-serif text-[0.5rem] sm:text-xs font-semibold cursor-pointer
                        rounded-sm transition-all duration-200 select-none
                        ${isSelected
                          ? 'bg-gradient-to-br from-[#FFD700] to-[#FFA500] text-[#2E1A47] scale-110 shadow-lg'
                          : 'bg-[#2E1A47]/50 text-[#FFD700] hover:bg-[#2E1A47] border border-[#4EC5F1]/20'
                        }
                      `}
                      animate={
                        isSelected
                          ? {
                              boxShadow: [
                                '0 0 10px rgba(255, 215, 0, 0.5)',
                                '0 0 20px rgba(255, 215, 0, 1)',
                                '0 0 10px rgba(255, 215, 0, 0.5)',
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-1 text-center px-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <div className="flex-1 h-1.5 bg-[#0D0F2B]/60 rounded-full overflow-hidden border border-[#4EC5F1]/30">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(foundWords.size / WORDS.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-[#4EC5F1] to-[#FFD700]"
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          <p className="text-[#4EC5F1] font-serif text-xs">
            Found: <span className="text-[#FFD700] font-semibold">{foundWords.size}</span>/{WORDS.length}
          </p>
          {foundWords.size < WORDS.length && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHarryHelp(true)}
              className="mt-1 relative px-3 py-1 bg-gradient-to-r from-[#4EC5F1] to-[#9D4EDD] text-white rounded-full font-serif text-xs shadow-lg"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(78, 197, 241, 0.8)',
                    '0 0 20px rgba(78, 197, 241, 1)',
                    '0 0 10px rgba(78, 197, 241, 0.8)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <span className="relative z-10">Ask Harry 🪄</span>
            </motion.button>
          )}
          {foundWords.size === WORDS.length && (
            <motion.p
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="mt-1 text-xs sm:text-sm text-[#FFD700] font-serif"
            >
              ✨ Solved! ✨
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Sparkles around puzzle - only on desktop */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            delay: i * 0.2,
            duration: 2,
            repeat: Infinity,
          }}
          className="hidden sm:block absolute text-3xl pointer-events-none"
          style={{
            left: `${(i % 4) * 25}%`,
            top: `${Math.floor(i / 4) * 50}%`,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Harry Help Modal */}
      {showHarryHelp && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHarryHelp(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-[#2E1A47]/95 to-[#1a1438]/95 backdrop-blur-xl p-3 sm:p-4 rounded-2xl border-2 border-[#4EC5F1]/40 shadow-2xl max-w-xs w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Harry icon */}
            <div className="text-4xl sm:text-6xl text-center mb-2">⚡</div>
            
            {/* Title */}
            <motion.h3
              animate={{
                textShadow: [
                  '0 0 10px rgba(78, 197, 241, 0.5)',
                  '0 0 20px rgba(78, 197, 241, 0.8)',
                  '0 0 10px rgba(78, 197, 241, 0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-lg sm:text-xl font-serif text-[#4EC5F1] text-center mb-1"
            >
              Harry's Magic Words
            </motion.h3>

            <p className="text-xs sm:text-sm text-[#FFD700] text-center mb-2 font-serif italic">
              Speak the incantation:
            </p>

            {/* Magic words display */}
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 15px rgba(255, 215, 0, 0.3)',
                  '0 0 30px rgba(255, 215, 0, 0.6)',
                  '0 0 15px rgba(255, 215, 0, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-[#0D0F2B]/60 p-2 sm:p-3 rounded-lg mb-2 border border-[#FFD700]/30"
            >
              <p className="text-sm sm:text-base text-[#FFD700] text-center font-serif font-bold">
                "Akhila Beautifica Suprema!"
              </p>
            </motion.div>

            {/* Input field */}
            <div className="mb-2">
              <input
                type="text"
                value={spellInput}
                onChange={(e) => {
                  setSpellInput(e.target.value);
                  setSpellAttempted(false);
                }}
                placeholder='Type spell'
                className="w-full px-3 py-1.5 bg-[#0D0F2B]/80 border-2 border-[#4EC5F1]/50 rounded-lg text-[#FFD700] font-serif text-xs placeholder-[#4EC5F1]/50 focus:outline-none focus:border-[#4EC5F1] transition-all"
              />
              {spellAttempted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-400 mt-1 font-serif text-center"
                >
                  ❌ Incorrect!
                </motion.p>
              )}
            </div>

            {/* Submit button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSpellSubmit}
              className="w-full relative px-4 py-2 bg-gradient-to-r from-[#4EC5F1] to-[#9D4EDD] text-white rounded-full font-serif text-xs sm:text-sm shadow-lg mb-2"
            >
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(78, 197, 241, 0.8)',
                    '0 0 25px rgba(78, 197, 241, 1)',
                    '0 0 10px rgba(78, 197, 241, 0.8)',
                  ],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full"
              />
              <span className="relative z-10">Cast Spell ✨</span>
            </motion.button>

            {/* Cancel button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHarryHelp(false)}
              className="w-full px-4 py-1.5 bg-transparent border-2 border-[#4EC5F1]/50 text-[#4EC5F1] rounded-full font-serif text-xs hover:bg-[#4EC5F1]/10 transition-all"
            >
              Back
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}