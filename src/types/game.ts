export interface Player {
  id: string;
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  specialization: Specialization;
  stats: PlayerStats;
  inventory: InventoryItem[];
  achievements: Achievement[];
  completedMissions: string[];
  currentMission?: Mission;
}

export interface PlayerStats {
  networkSecurity: number;
  digitalForensics: number;
  ethicalHacking: number;
  incidentResponse: number;
  cryptography: number;
  socialEngineering: number;
  compliance: number;
  malwareAnalysis: number;
}

export interface Specialization {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  type: 'story' | 'challenge' | 'simulation';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  specialization: string;
  xpReward: number;
  requirements: string[];
  scenario: Scenario;
}

export interface Scenario {
  setting: string;
  situation: string;
  objectives: string[];
  choices: Choice[];
}

export interface Choice {
  id: string;
  text: string;
  consequence: string;
  correctness: 'correct' | 'partially' | 'incorrect';
  xpGain: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface InventoryItem {
  id: string;
  name: string;
  type: 'tool' | 'certification' | 'knowledge';
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}