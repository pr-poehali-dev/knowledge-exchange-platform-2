import { useState } from 'react';
import { users, rankSystem } from '@/data/mockData';
import type { User } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface RatingsPageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

type TabType = 'all' | 'teachers' | 'students';

const rankColors: Record<string, string> = {
  'Легенда': 'badge-gold',
  'Гуру': 'badge-teal',
  'Мастер': 'badge-silver',
  'Наставник': 'badge-purple',
  'Эксперт': 'badge-blue',
  'Знаток': 'badge-bronze',
  'Ученик': 'badge-blue',
  'Новичок': 'badge-blue',
};

const rankIcons: Record<string, string> = {
  'Легенда': '👑',
  'Гуру': '🧠',
  'Мастер': '🏆',
  'Наставник': '🧑‍🏫',
  'Эксперт': '🔬',
  'Знаток': '📚',
  'Ученик': '📖',
  'Новичок': '🌱',
};

const tabs: { id: TabType; label: string }[] = [
  { id: 'all', label: 'Общий' },
  { id: 'teachers', label: 'Преподаватели' },
  { id: 'students', label: 'Студенты' },
];

export default function RatingsPage({ onNavigate }: RatingsPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const filteredUsers: User[] = [...users]
    .filter(u => activeTab === 'all' ? true : activeTab === 'teachers' ? u.role === 'teacher' : u.role === 'student')
    .sort((a, b) => b.rating - a.rating);

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-bold font-montserrat mb-3">Рейтинги</h2>
          <div className="flex bg-secondary rounded-xl p-1 gap-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${activeTab === tab.id ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        {/* Top 3 podium */}
        {filteredUsers.length >= 3 && (
          <div className="flex items-end justify-center gap-3 mb-8 animate-fade-in">
            {/* 2nd */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-3xl">{filteredUsers[1].avatar}</div>
              <div className="text-xs font-semibold text-center text-foreground leading-tight">{filteredUsers[1].name.split(' ')[0]}</div>
              <div className="text-xs text-muted-foreground font-bold">{filteredUsers[1].rating.toLocaleString()}</div>
              <div className="w-full h-16 bg-slate-100 border border-slate-200 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl">🥈</span>
              </div>
            </div>
            {/* 1st */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-3xl">{filteredUsers[0].avatar}</div>
              <div className="text-xs font-semibold text-center text-foreground leading-tight">{filteredUsers[0].name.split(' ')[0]}</div>
              <div className="text-xs font-bold text-amber-600">{filteredUsers[0].rating.toLocaleString()}</div>
              <div className="w-full h-24 bg-amber-50 border border-amber-200 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl">🥇</span>
              </div>
            </div>
            {/* 3rd */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="text-3xl">{filteredUsers[2].avatar}</div>
              <div className="text-xs font-semibold text-center text-foreground leading-tight">{filteredUsers[2].name.split(' ')[0]}</div>
              <div className="text-xs text-muted-foreground font-bold">{filteredUsers[2].rating.toLocaleString()}</div>
              <div className="w-full h-10 bg-orange-50 border border-orange-200 rounded-t-xl flex items-center justify-center">
                <span className="text-2xl">🥉</span>
              </div>
            </div>
          </div>
        )}

        {/* Full list */}
        <div className="space-y-2">
          {filteredUsers.map((user, index) => (
            <button
              key={user.id}
              onClick={() => onNavigate('profile', { userId: user.id })}
              className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all text-left animate-fade-in"
              style={{ animationDelay: `${index * 0.04}s` }}
            >
              <div className="text-sm font-bold text-muted-foreground w-7 text-center font-montserrat">
                {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
              </div>
              <div className="text-2xl">{user.avatar}</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-semibold text-foreground">{user.name}</span>
                  <span className={`rank-badge ${rankColors[user.rank]}`}>
                    {rankIcons[user.rank]} {user.rank}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {user.role === 'teacher' ? `Преподаватель · ${user.subject}` : 'Студент'}
                  {' · '}
                  <span>{user.answersCount} отв.</span>
                  {' · '}
                  <span>{user.likesReceived} 👍</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-base font-bold text-primary font-montserrat">{user.rating.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">очков</div>
              </div>
            </button>
          ))}
        </div>

        {/* Rank legend */}
        <div className="mt-8 bg-card border border-border rounded-2xl p-5 animate-fade-in">
          <h4 className="text-sm font-bold font-montserrat mb-4 flex items-center gap-2">
            <Icon name="Award" size={16} className="text-primary" />
            Система рангов
          </h4>
          <div className="space-y-2.5">
            {rankSystem.map(item => (
              <div key={item.rank} className="flex items-center justify-between">
                <span className={`rank-badge ${item.color}`}>{item.icon} {item.rank}</span>
                <span className="text-xs text-muted-foreground">
                  {item.max === Infinity ? `${item.min.toLocaleString()}+` : `${item.min.toLocaleString()} – ${item.max.toLocaleString()}`} очков
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}