import { useState } from 'react';
import { users, notifications } from '@/data/mockData';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/context/ThemeContext';

interface HomePageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

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

const topUsers = [...users].sort((a, b) => b.rating - a.rating).slice(0, 5);
const unreadCount = notifications.filter(n => !n.read).length;

export default function HomePage({ onNavigate }: HomePageProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-bold font-montserrat text-foreground">KnowHub</h1>
            <p className="text-xs text-muted-foreground">Платформа знаний</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
              title={theme === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
            >
              <Icon name={theme === 'dark' ? 'Sun' : 'Moon'} size={18} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <Icon name="Bell" size={20} className="text-muted-foreground" />
              {unreadCount > 0 && <span className="notification-dot" />}
            </button>
            <button
              onClick={() => onNavigate('profile', { userId: 4 })}
              className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-lg hover:bg-primary/20 transition-colors"
            >
              👨‍🎓
            </button>
          </div>
        </div>
      </header>

      {/* Notifications dropdown */}
      {showNotifications && (
        <div className="fixed top-[72px] right-4 z-50 w-80 bg-card border border-border rounded-2xl shadow-xl animate-scale-in">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <span className="font-semibold text-sm">Уведомления</span>
            {unreadCount > 0 && (
              <span className="text-xs text-primary font-medium">{unreadCount} новых</span>
            )}
          </div>
          <div className="max-h-72 overflow-y-auto">
            {notifications.map((n) => (
              <div key={n.id} className={`px-4 py-3 flex items-start gap-3 border-b border-border last:border-0 ${!n.read ? 'bg-accent/30' : ''}`}>
                <div className={`text-base mt-0.5 ${n.type === 'like' ? '❤️' : n.type === 'answer' ? '💬' : '🏆'}`}>
                  {n.type === 'like' ? '❤️' : n.type === 'answer' ? '💬' : '🏆'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-snug">{n.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
                </div>
                {!n.read && <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {showNotifications && (
        <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
      )}

      <div className="max-w-2xl mx-auto px-5 pt-6">
        {/* Hero */}
        <div className="mb-8 animate-fade-in">
          <div className="bg-gradient-to-br from-primary/10 to-accent rounded-2xl p-6">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Добро пожаловать</p>
            <h2 className="text-2xl font-bold font-montserrat text-foreground mb-2">
              Задавайте вопросы.<br />Делитесь знаниями.
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Получайте ответы от лучших преподавателей и студентов платформы.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('questions')}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <Icon name="HelpCircle" size={16} />
                Задать вопрос
              </button>
              <button
                onClick={() => onNavigate('search')}
                className="flex items-center gap-2 bg-card border border-border text-foreground px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary transition-colors"
              >
                <Icon name="Search" size={16} />
                Поиск
              </button>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {[
            { label: 'Вопросов', value: '1 240', icon: 'HelpCircle' },
            { label: 'Ответов', value: '4 870', icon: 'MessageCircle' },
            { label: 'Участников', value: '892', icon: 'Users' },
          ].map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-2xl p-4 text-center">
              <Icon name={stat.icon as 'HelpCircle'} size={18} className="text-primary mx-auto mb-1" />
              <div className="text-lg font-bold font-montserrat text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Top 5 */}
        <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-montserrat">Топ-5 участников</h3>
            <button
              onClick={() => onNavigate('ratings')}
              className="text-xs text-primary font-medium hover:underline"
            >
              Все рейтинги →
            </button>
          </div>

          <div className="space-y-2">
            {topUsers.map((user, index) => (
              <button
                key={user.id}
                onClick={() => onNavigate('profile', { userId: user.id })}
                className="w-full flex items-center gap-4 bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all text-left"
                style={{ animationDelay: `${0.1 + index * 0.05}s` }}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm font-montserrat"
                  style={{
                    background: index === 0 ? '#FEF3C7' : index === 1 ? '#F1F5F9' : index === 2 ? '#FEF0E6' : '#EFF6FF',
                    color: index === 0 ? '#B45309' : index === 1 ? '#475569' : index === 2 ? '#C2410C' : '#1D4ED8',
                  }}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </div>
                <div className="text-2xl">{user.avatar}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground truncate">{user.name}</span>
                    <span className={`rank-badge ${rankColors[user.rank]}`}>{user.rank}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.role === 'teacher' ? `Преподаватель · ${user.subject}` : 'Студент'} · {user.answersCount} ответов
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-primary">{user.rating.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">очков</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent questions preview */}
        <div className="mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold font-montserrat">Последние вопросы</h3>
            <button
              onClick={() => onNavigate('questions')}
              className="text-xs text-primary font-medium hover:underline"
            >
              Все вопросы →
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Как доказать теорему Пифагора?', cat: 'Математика', answers: 3 },
              { title: 'Чем отличается list от tuple в Python?', cat: 'Программирование', answers: 2 },
              { title: 'Что такое квантовая суперпозиция?', cat: 'Физика', answers: 2 },
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => onNavigate('questions')}
                className="w-full text-left question-card"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">{q.title}</p>
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{q.cat}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Icon name="MessageCircle" size={12} /> {q.answers} ответа
                      </span>
                    </div>
                  </div>
                  <Icon name="ChevronRight" size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}