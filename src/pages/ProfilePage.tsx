import { useState } from 'react';
import { users, questions, rankSystem } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface ProfilePageProps {
  userId?: number;
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const rankColors: Record<string, string> = {
  'Оракул': 'badge-gold',
  'Архитектор': 'badge-teal',
  'Компилятор': 'badge-silver',
  'Синтаксис': 'badge-purple',
  'Хакер': 'badge-blue',
  'Дебаггер': 'badge-bronze',
  'Любопытный': 'badge-blue',
  'Нулёвый': 'badge-blue',
};

type ProfileTab = 'answers' | 'achievements';

export default function ProfilePage({ userId = 4, onNavigate }: ProfilePageProps) {
  const [tab, setTab] = useState<ProfileTab>('answers');
  const user = users.find(u => u.id === userId) || users[3];

  const userAnswers = questions.flatMap(q =>
    q.answers
      .filter(a => a.authorId === user.id)
      .map(a => ({ ...a, questionTitle: q.title, category: q.category }))
  ).sort((a, b) => b.likes - a.likes);

  const currentTier = rankSystem.find(r => r.rank === user.rank);
  const currentIndex = rankSystem.findIndex(r => r.rank === user.rank);
  const nextTier = currentIndex < rankSystem.length - 1 ? rankSystem[currentIndex + 1] : null;

  const progress = currentTier && nextTier
    ? Math.min(100, Math.round(((user.rating - currentTier.min) / (nextTier.min - currentTier.min)) * 100))
    : 100;

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <button onClick={() => onNavigate('home')} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <Icon name="ArrowLeft" size={18} className="text-muted-foreground" />
          </button>
          <h2 className="text-lg font-bold font-montserrat">Профиль</h2>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-6">
        {/* Profile card */}
        <div className="bg-card border border-border rounded-2xl p-6 mb-5 animate-fade-in">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center text-4xl shrink-0">
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-lg font-bold font-montserrat text-foreground">{user.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`rank-badge ${rankColors[user.rank]}`}>{user.rank}</span>
                    <span className="text-xs text-muted-foreground">
                      {user.role === 'teacher' ? `👩‍🏫 Преподаватель` : '👨‍🎓 Студент'}
                      {user.subject && ` · ${user.subject}`}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-primary font-montserrat">{user.rating.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">очков</div>
                </div>
              </div>
              {user.bio && (
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{user.bio}</p>
              )}
            </div>
          </div>

          {/* Progress bar */}
          {nextTier && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
                <span>До ранга «{nextTier.icon} {nextTier.rank}»</span>
                <span>{(nextTier.min - user.rating).toLocaleString()} очков</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border">
            {[
              { label: 'Ответов', value: user.answersCount, icon: 'MessageCircle' },
              { label: 'Лайков', value: user.likesReceived, icon: 'ThumbsUp' },
              { label: 'Рейтинг', value: `#${[...users].sort((a,b)=>b.rating-a.rating).findIndex(u=>u.id===user.id)+1}`, icon: 'Award' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <Icon name={stat.icon as 'Award'} size={16} className="text-primary mx-auto mb-1" />
                <div className="text-base font-bold text-foreground font-montserrat">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-secondary rounded-xl p-1 mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {(['answers', 'achievements'] as ProfileTab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${tab === t ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {t === 'answers' ? `💬 Ответы (${userAnswers.length})` : `🏆 Достижения`}
            </button>
          ))}
        </div>

        {/* Answers tab */}
        {tab === 'answers' && (
          <div className="space-y-3 animate-fade-in">
            {userAnswers.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="MessageCircle" size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">Пока нет ответов</p>
              </div>
            ) : userAnswers.map(answer => (
              <div key={answer.id} className="bg-card border border-border rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{answer.category}</span>
                  {answer.isAccepted && (
                    <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
                      <Icon name="CheckCircle" size={10} /> Лучший ответ
                    </span>
                  )}
                </div>
                <p className="text-xs font-semibold text-muted-foreground mb-1">К вопросу: {answer.questionTitle}</p>
                <p className="text-sm text-foreground line-clamp-2 leading-relaxed">{answer.body}</p>
                <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Icon name="ThumbsUp" size={12} /> {answer.likes} лайков
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Achievements tab */}
        {tab === 'achievements' && (
          <div className="grid grid-cols-2 gap-3 animate-fade-in">
            {user.achievements.map(achievement => (
              <div
                key={achievement.id}
                className={`bg-card border rounded-2xl p-4 text-center transition-all ${achievement.unlocked ? 'border-primary/20 shadow-sm' : 'border-border opacity-50'}`}
              >
                <div className={`text-3xl mb-2 ${!achievement.unlocked ? 'grayscale' : ''}`}>
                  {achievement.icon}
                </div>
                <div className="text-sm font-semibold text-foreground">{achievement.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{achievement.description}</div>
                {achievement.unlocked && (
                  <div className="mt-2 text-xs text-primary font-medium flex items-center justify-center gap-1">
                    <Icon name="CheckCircle" size={11} /> Получено
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}