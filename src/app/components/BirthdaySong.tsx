import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Volume2, VolumeX } from 'lucide-react';

// Happy Birthday melody notes (in Hz)
const HAPPY_BIRTHDAY_MELODY = [
  { note: 262, duration: 400 }, // C - Happy
  { note: 262, duration: 200 }, // C - Birth-
  { note: 294, duration: 600 }, // D - day
  { note: 262, duration: 600 }, // C - to
  { note: 349, duration: 600 }, // F - you
  { note: 330, duration: 1200 }, // E - (hold)
  
  { note: 262, duration: 400 }, // C - Happy
  { note: 262, duration: 200 }, // C - Birth-
  { note: 294, duration: 600 }, // D - day
  { note: 262, duration: 600 }, // C - to
  { note: 392, duration: 600 }, // G - you
  { note: 349, duration: 1200 }, // F - (hold)
  
  { note: 262, duration: 400 }, // C - Happy
  { note: 262, duration: 200 }, // C - Birth-
  { note: 523, duration: 600 }, // C (high) - day
  { note: 440, duration: 600 }, // A - dear
  { note: 349, duration: 600 }, // F - Akhila
  { note: 330, duration: 600 }, // E
  { note: 294, duration: 600 }, // D
  
  { note: 466, duration: 400 }, // Bb - Happy
  { note: 466, duration: 200 }, // Bb - Birth-
  { note: 440, duration: 600 }, // A - day
  { note: 349, duration: 600 }, // F - to
  { note: 392, duration: 600 }, // G - you
  { note: 349, duration: 1200 }, // F - (hold)
];

// Harry Potter Hedwig's Theme (simplified version)
const HARRY_POTTER_THEME = [
  { note: 494, duration: 300 }, // B
  { note: 659, duration: 600 }, // E
  { note: 784, duration: 450 }, // G
  { note: 740, duration: 150 }, // F#
  { note: 659, duration: 600 }, // E
  { note: 988, duration: 600 }, // B (high)
  { note: 880, duration: 900 }, // A
  { note: 740, duration: 900 }, // F#
  
  { note: 659, duration: 600 }, // E
  { note: 784, duration: 450 }, // G
  { note: 740, duration: 150 }, // F#
  { note: 587, duration: 600 }, // D
  { note: 659, duration: 600 }, // E
  { note: 494, duration: 900 }, // B
  
  { note: 494, duration: 300 }, // B
  { note: 659, duration: 600 }, // E
  { note: 784, duration: 450 }, // G
  { note: 740, duration: 150 }, // F#
  { note: 659, duration: 600 }, // E
  { note: 988, duration: 600 }, // B (high)
  { note: 1047, duration: 600 }, // C (high)
  { note: 988, duration: 450 }, // B (high)
  { note: 880, duration: 150 }, // A
  { note: 784, duration: 600 }, // G
  { note: 740, duration: 1200 }, // F#
];

interface BirthdaySongProps {
  theme?: 'birthday' | 'harryPotter';
  autoPlay?: boolean;
}

export function BirthdaySong({ theme = 'birthday', autoPlay = false }: BirthdaySongProps) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(!autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const MELODY = theme === 'harryPotter' ? HARRY_POTTER_THEME : HAPPY_BIRTHDAY_MELODY;

  const playNote = (frequency: number, duration: number, startTime: number) => {
    if (!audioContextRef.current) return;

    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = theme === 'harryPotter' ? 'triangle' : 'sine';

    // Envelope for smoother sound
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.25, startTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration / 1000 - 0.01);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration / 1000);
  };

  const playMelody = () => {
    if (!audioContextRef.current) return;

    let currentTime = audioContextRef.current.currentTime;
    
    MELODY.forEach(({ note, duration }) => {
      playNote(note, duration, currentTime);
      currentTime += duration / 1000;
    });

    // Calculate total duration and schedule next play
    const totalDuration = MELODY.reduce((sum, { duration }) => sum + duration, 0);
    
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
    }
    
    intervalRef.current = setTimeout(() => {
      if (!isMuted) {
        playMelody();
      }
    }, totalDuration + 2000); // 2 second pause between loops
  };

  useEffect(() => {
    // Initialize Audio Context
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-play if enabled
    if (autoPlay && audioContextRef.current) {
      const playAudio = async () => {
        if (audioContextRef.current!.state === 'suspended') {
          await audioContextRef.current!.resume();
        }
        setIsMuted(false);
        setIsPlaying(true);
        playMelody();
      };
      
      // Delay slightly to ensure context is ready
      const timer = setTimeout(() => {
        playAudio();
      }, 500);
      
      return () => clearTimeout(timer);
    } else if (!autoPlay && !isMuted) {
      // Stop music when autoPlay is disabled
      setIsMuted(true);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    }
  }, [autoPlay, playMelody, isMuted]);

  const toggleMute = () => {
    if (!audioContextRef.current) return;

    if (isMuted) {
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      setIsMuted(false);
      setIsPlaying(true);
      playMelody();
    } else {
      setIsMuted(true);
      setIsPlaying(false);
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
    }
  };

  return (
    <>
      {/* Music control button - only show if not auto-playing */}
      {!autoPlay && (
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        onClick={toggleMute}
        className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full shadow-lg hover:scale-110 transition-transform"
        title={isMuted ? `Play ${theme === 'harryPotter' ? 'Magical' : 'Birthday'} Music` : 'Stop Music'}
      >
        <motion.div
          animate={{
            boxShadow: [
              '0 0 10px rgba(255, 215, 0, 0.5)',
              '0 0 20px rgba(255, 215, 0, 0.8)',
              '0 0 10px rgba(255, 215, 0, 0.5)',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full"
        />
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-[#2E1A47] relative z-10" />
        ) : (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <Volume2 className="w-6 h-6 text-[#2E1A47] relative z-10" />
          </motion.div>
          )}
          </motion.button>
          )}

          {/* Musical notes animation */}
      {isPlaying && !isMuted && (
        <div className="fixed top-8 right-8 z-40 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -150],
                opacity: [0, 1, 0],
                x: [0, Math.sin(i) * 40, Math.cos(i) * 20],
                rotate: [0, 360],
              }}
              transition={{
                delay: i * 0.4,
                duration: 3,
                repeat: Infinity,
                ease: 'easeOut',
              }}
              className="absolute text-4xl"
              style={{
                color: ['#FFD700', '#4EC5F1', '#FF4DA6', '#9D4EDD', '#FFA500'][i],
              }}
            >
              {['♪', '♫', '♪', '♫', '♪'][i]}
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}