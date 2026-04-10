import { useState } from 'react';
import { questions, users, categories } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface SearchPageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

type FilterType = 'all' | 'questions' | 'users';

export default function SearchPage({ onNavigate }: SearchPageProps) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const q = query.toLowerCase().trim();

  const matchedQuestions = q ? questions.filter(question =>
    question.title.toLowerCase().includes(q) ||
    question.body.toLowerCase().includes(q) ||
    question.category.toLowerCase().includes(q) ||
    question.tags.some(t => t.toLowerCase().includes(q))
  ) : [];

  const matchedUsers = q ? users.filter(user =>
    user.name.toLowerCase().includes(q) ||
    (user.subject || '').toLowerCase().includes(q) ||
    user.rank.toLowerCase().includes(q)
  ) : [];

  const hasResults = matchedQuestions.length > 0 || matchedUsers.length > 0;

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-lg font-bold font-montserrat mb-3">Поиск</h2>
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Вопросы, пользователи, категории..."
              className="w-full pl-10 pr-4 py-3 bg-secondary border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40 focus:bg-card transition-all"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={15} />
              </button>
            )}
          </div>
          {query && (
            <div className="flex gap-1.5 mt-3">
              {(['all', 'questions', 'users'] as FilterType[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${filter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
                >
                  {f === 'all' ? 'Всё' : f === 'questions' ? `Вопросы (${matchedQuestions.length})` : `Люди (${matchedUsers.length})`}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        {!query && (
          <div className="animate-fade-in">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">Категории</p>
            <div className="grid grid-cols-2 gap-3">
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setQuery(cat.name)}
                  className="flex items-center gap-3 bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all text-left"
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <div className="text-sm font-semibold text-foreground">{cat.name}</div>
                    <div className="text-xs text-muted-foreground">{cat.count} вопросов</div>
                  </div>
                </button>
              ))}
            </div>

            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-8 mb-4">Популярные запросы</p>
            <div className="flex flex-wrap gap-2">
              {['Python', 'интеграл', 'физика', 'алгоритмы', 'квантовая', 'математика', 'теорема'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1.5 bg-secondary text-muted-foreground rounded-lg text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {query && !hasResults && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={40} className="mx-auto mb-4 text-muted-foreground opacity-30" />
            <p className="text-base font-semibold text-foreground">Ничего не найдено</p>
            <p className="text-sm text-muted-foreground mt-1">Попробуйте другой запрос</p>
          </div>
        )}

        {query && hasResults && (
          <div className="animate-fade-in">
            {/* Questions */}
            {(filter === 'all' || filter === 'questions') && matchedQuestions.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon name="HelpCircle" size={13} />
                  Вопросы · {matchedQuestions.length}
                </p>
                <div className="space-y-2">
                  {matchedQuestions.map(q => (
                    <button
                      key={q.id}
                      onClick={() => onNavigate('questions')}
                      className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">{q.category}</span>
                          </div>
                          <p className="text-sm font-semibold text-foreground mb-1">{q.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1">{q.body}</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="MessageCircle" size={11} /> {q.answersCount} ответов
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Icon name="Eye" size={11} /> {q.views}
                            </span>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={15} className="text-muted-foreground mt-0.5 shrink-0" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Users */}
            {(filter === 'all' || filter === 'users') && matchedUsers.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Icon name="Users" size={13} />
                  Пользователи · {matchedUsers.length}
                </p>
                <div className="space-y-2">
                  {matchedUsers.map(user => (
                    <button
                      key={user.id}
                      onClick={() => onNavigate('profile', { userId: user.id })}
                      className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary/20 hover:shadow-sm transition-all flex items-center gap-3"
                    >
                      <div className="text-2xl">{user.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {user.role === 'teacher' ? `Преподаватель · ${user.subject}` : 'Студент'}
                          {' · '}
                          {user.rating.toLocaleString()} очков
                        </p>
                      </div>
                      <Icon name="ChevronRight" size={15} className="text-muted-foreground shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
