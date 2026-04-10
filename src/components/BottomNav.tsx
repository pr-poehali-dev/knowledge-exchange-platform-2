import Icon from '@/components/ui/icon';

type Page = 'home' | 'questions' | 'articles' | 'ratings' | 'search' | 'profile';

interface BottomNavProps {
  current: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'questions', label: 'Вопросы', icon: 'HelpCircle' },
  { id: 'articles', label: 'Статьи', icon: 'BookOpen' },
  { id: 'ratings', label: 'Рейтинг', icon: 'Trophy' },
  { id: 'search', label: 'Поиск', icon: 'Search' },
];

export default function BottomNav({ current, onNavigate }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border">
      <div className="max-w-2xl mx-auto flex items-stretch">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`nav-item flex-1 ${current === item.id ? 'active' : ''}`}
          >
            <Icon name={item.icon as 'Home'} size={20} />
            <span className="text-[10px] font-semibold">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
