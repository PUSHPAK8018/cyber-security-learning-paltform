import React, { useState } from 'react';
import { Shield, Zap, Search, Siren, Key, Users, ClipboardCheck, Bug, Trophy, Package, Star, ChevronRight, Play, LogOut, User } from 'lucide-react';
import { Player, Mission, Specialization } from '../types/game';
import { useAuth } from '../contexts/AuthContext';

interface GameDashboardProps {
  player: Player;
  availableMissions: Mission[];
  specializations: Specialization[];
  onStartMission: (mission: Mission) => void;
  onChangeSpecialization: (spec: Specialization) => void;
}

const iconMap = {
  shield: Shield,
  zap: Zap,
  search: Search,
  siren: Siren,
  key: Key,
  users: Users,
  'clipboard-check': ClipboardCheck,
  bug: Bug
};

export default function GameDashboard({ 
  player, 
  availableMissions, 
  specializations, 
  onStartMission,
  onChangeSpecialization 
}: GameDashboardProps) {
  const [activeTab, setActiveTab] = useState<'missions' | 'character' | 'achievements'>('missions');
  const { signOut, user } = useAuth();

  const xpPercentage = ((player.xp % 200) / 200) * 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400 bg-green-400/10';
      case 'intermediate': return 'text-yellow-400 bg-yellow-400/10';
      case 'advanced': return 'text-orange-400 bg-orange-400/10';
      case 'expert': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'story': return 'text-purple-400 bg-purple-400/10';
      case 'challenge': return 'text-blue-400 bg-blue-400/10';
      case 'simulation': return 'text-cyan-400 bg-cyan-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">CyberGuardian Academy</h1>
              <p className="text-cyan-400">Welcome back, {player.name}</p>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Level {player.level}</div>
                <div className="text-2xl font-bold text-white">{player.xp} XP</div>
              </div>
              <button
                onClick={handleSignOut}
                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:text-red-300 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Progress to Level {player.level + 1}</span>
              <span>{player.xp % 200} / 200 XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000 ease-out"
                style={{ width: `${xpPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Current Specialization */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${player.specialization.color}`}>
              {React.createElement(iconMap[player.specialization.icon as keyof typeof iconMap], {
                className: "w-6 h-6 text-white"
              })}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{player.specialization.name}</h3>
              <p className="text-gray-400 text-sm">{player.specialization.description}</p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: 'missions', label: 'Missions', icon: Play },
            { id: 'character', label: 'Character', icon: User },
            { id: 'achievements', label: 'Achievements', icon: Trophy }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-cyan-500 text-white'
                  : 'bg-black/40 text-gray-400 hover:bg-black/60 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content based on active tab */}
        {activeTab === 'missions' && (
          <div className="grid gap-4">
            <h2 className="text-2xl font-bold text-white mb-4">Available Missions</h2>
            {availableMissions.length === 0 ? (
              <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
                <Trophy className="w-16 h-16 mx-auto text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Congratulations!</h3>
                <p className="text-gray-400">You've completed all available missions. More content coming soon!</p>
              </div>
            ) : (
              availableMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-cyan-500/50 transition-all group cursor-pointer"
                  onClick={() => onStartMission(mission)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {mission.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      <p className="text-gray-400 mb-3">{mission.description}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(mission.difficulty)}`}>
                          {mission.difficulty}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(mission.type)}`}>
                          {mission.type}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold text-lg">+{mission.xpReward} XP</div>
                      <div className="text-xs text-gray-400">Reward</div>
                    </div>
                  </div>
                  
                  {mission.requirements.length > 0 && (
                    <div className="border-t border-gray-700/50 pt-3">
                      <div className="text-sm text-gray-400">
                        <span className="text-yellow-400">Requirements:</span> {mission.requirements.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'character' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Stats */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Skills & Expertise</h3>
              <div className="space-y-4">
                {Object.entries(player.stats).map(([skill, value]) => (
                  <div key={skill}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 capitalize">
                        {skill.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="text-cyan-400 font-medium">{value}/100</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specializations */}
            <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Choose Specialization</h3>
              <div className="grid gap-3 max-h-96 overflow-y-auto">
                {specializations.map((spec) => (
                  <button
                    key={spec.id}
                    onClick={() => onChangeSpecialization(spec)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      player.specialization.id === spec.id
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : 'border-gray-700 hover:border-gray-600 bg-black/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded bg-gradient-to-r ${spec.color}`}>
                        {React.createElement(iconMap[spec.icon as keyof typeof iconMap], {
                          className: "w-4 h-4 text-white"
                        })}
                      </div>
                      <div>
                        <div className="text-white font-medium">{spec.name}</div>
                        <div className="text-gray-400 text-xs">{spec.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Inventory */}
            <div className="lg:col-span-2 bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Package className="w-5 h-5" />
                Security Tools & Certifications
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {player.inventory.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      item.rarity === 'legendary' ? 'border-yellow-500 bg-yellow-500/5' :
                      item.rarity === 'epic' ? 'border-purple-500 bg-purple-500/5' :
                      item.rarity === 'rare' ? 'border-blue-500 bg-blue-500/5' :
                      'border-gray-600 bg-gray-600/5'
                    }`}
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg bg-gray-700 flex items-center justify-center">
                        <Star className="w-6 h-6 text-gray-400" />
                      </div>
                      <div className="text-white text-sm font-medium">{item.name}</div>
                      <div className="text-gray-400 text-xs capitalize">{item.type}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-black/40 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {player.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.rarity === 'legendary' ? 'border-yellow-500 bg-yellow-500/10' :
                    achievement.rarity === 'epic' ? 'border-purple-500 bg-purple-500/10' :
                    achievement.rarity === 'rare' ? 'border-blue-500 bg-blue-500/10' :
                    'border-gray-600 bg-gray-600/10'
                  }`}
                >
                  <div className="text-center">
                    <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                    <h4 className="text-white font-medium">{achievement.title}</h4>
                    <p className="text-gray-400 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
              {player.achievements.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-400">
                  Complete missions to unlock achievements!
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}