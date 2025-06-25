import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AuthForm from './components/AuthForm';
import GameDashboard from './components/GameDashboard';
import MissionInterface from './components/MissionInterface';
import { Mission, Specialization } from './types/game';
import { specializations, missions } from './data/realisticGameData';

function AppContent() {
  const { user, player, loading, updatePlayer } = useAuth();
  const [currentMission, setCurrentMission] = React.useState<Mission | null>(null);
  const [gameState, setGameState] = React.useState<'dashboard' | 'mission'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading CyberGuardian Academy...</p>
        </div>
      </div>
    );
  }

  if (!user || !player) {
    return <AuthForm />;
  }

  const handleStartMission = (mission: Mission) => {
    setCurrentMission(mission);
    setGameState('mission');
  };

  const handleMissionComplete = async (xpGained: number, success: boolean) => {
    if (!currentMission) return;

    const newXP = player.xp + xpGained;
    const newLevel = Math.floor(newXP / 200) + 1;
    const xpToNext = (newLevel * 200) - newXP;

    const updatedPlayer = {
      ...player,
      xp: newXP,
      level: newLevel,
      xpToNext: xpToNext,
      completedMissions: [...player.completedMissions, currentMission.id],
      achievements: success && player.achievements.length === 0 
        ? [...player.achievements, { 
            id: 'first-mission', 
            title: 'Cyber Guardian Initiate', 
            description: 'Complete your first cybersecurity mission',
            icon: 'award',
            rarity: 'common' as const,
            unlockedAt: new Date()
          }]
        : player.achievements
    };

    await updatePlayer(updatedPlayer);
    setCurrentMission(null);
    setGameState('dashboard');
  };

  const handleExitMission = () => {
    setCurrentMission(null);
    setGameState('dashboard');
  };

  const handleChangeSpecialization = async (spec: Specialization) => {
    await updatePlayer({
      ...player,
      specialization: spec
    });
  };

  const availableMissions = missions.filter(mission => 
    !player.completedMissions.includes(mission.id)
  );

  return (
    <div className="min-h-screen">
      {gameState === 'dashboard' && (
        <GameDashboard
          player={player}
          availableMissions={availableMissions}
          specializations={specializations}
          onStartMission={handleStartMission}
          onChangeSpecialization={handleChangeSpecialization}
        />
      )}
      
      {gameState === 'mission' && currentMission && (
        <MissionInterface
          mission={currentMission}
          onComplete={handleMissionComplete}
          onExit={handleExitMission}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;