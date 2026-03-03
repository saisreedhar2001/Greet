import { useState } from 'react';
import { LandingScene } from './components/LandingScene';
import { GreatHall } from './components/GreatHall';
import { MagicalSpell } from './components/MagicalSpell';
import { GrandReveal } from './components/GrandReveal';
import { SpecialGift } from './components/SpecialGift';
import { ChooseHouse } from './components/ChooseHouse';
import { HogwartsID } from './components/HogwartsID';
import { MagicalLetter } from './components/MagicalLetter';
import { BirthdaySong } from './components/BirthdaySong';

export default function App() {
  const [currentScene, setCurrentScene] = useState(0);
  const [cakeAppeared, setCakeAppeared] = useState(false);
  const [selectedHouse, setSelectedHouse] = useState<string | null>(null);

  const goToScene = (sceneNumber: number) => {
    setCurrentScene(sceneNumber);
  };

  const resetToHome = () => {
    setCurrentScene(0);
    setCakeAppeared(false);
    setSelectedHouse(null);
  };

  const onCakeAppear = () => {
    setCakeAppeared(true);
  };

  // Determine theme and autoPlay based on current scene
  const getTheme = (): 'harryPotter' | 'birthday' => {
    if (currentScene === 2 && cakeAppeared) return 'birthday'; // Cake scene
    return 'birthday'; // Default (won't be played)
  };

  const shouldAutoPlay = 
    (currentScene === 2 && cakeAppeared); // Cake scene autoPlay only

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#0D0F2B]">
      {/* Music disabled */}
      {/* <BirthdaySong theme={getTheme()} autoPlay={shouldAutoPlay} /> */}
      {currentScene === 0 && <LandingScene onNext={() => goToScene(1)} />}
      {currentScene === 1 && <GreatHall onNext={() => goToScene(2)} />}
      {currentScene === 2 && <MagicalSpell onNext={() => goToScene(3)} onCakeAppear={onCakeAppear} />}
      {currentScene === 3 && <GrandReveal onNext={() => goToScene(4)} />}
      {currentScene === 4 && <SpecialGift onNext={() => goToScene(5)} />}
      {currentScene === 5 && <ChooseHouse onNext={() => goToScene(6)} onHouseSelect={setSelectedHouse} />}
      {currentScene === 6 && <HogwartsID house={selectedHouse} onNext={() => goToScene(7)} />}
      {currentScene === 7 && <MagicalLetter onExit={resetToHome} />}
    </div>
  );
}