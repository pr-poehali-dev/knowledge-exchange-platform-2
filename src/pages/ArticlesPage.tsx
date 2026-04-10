import { useState } from 'react';
import { articles, users } from '@/data/mockData';
import type { Article } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface ArticlesPageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const articleCategories = ['Все', ...Array.from(new Set(articles.map(a => a.category)))];

const getUserById = (id: number) => users.find(u => u.id === id);

function ArticleCard({ article, onOpen }: { article: Article; onOpen: () => void }) {
  const author = getUserById(article.authorId);
  return (
    <button
      onClick={onOpen}
      className="w-full text-left bg-card border border-border rounded-2xl p-5 hover:border-primary/30 hover:shadow-md transition-all duration-200 group"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs px-2.5 py-1 bg-accent text-accent-foreground rounded-full font-medium">
          {article.category}
        </span>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Icon name="Clock" size={11} /> {article.readTime} мин
        </span>
      </div>
      <h3 className="text-sm font-bold font-montserrat text-foreground mb-2 leading-snug group-hover:text-primary transition-colors">
        {article.title}
      </h3>
      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
        {article.body}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-base">{author?.avatar}</span>
          <div>
            <span className="text-xs font-semibold text-foreground">{author?.name}</span>
            <span className="text-xs text-muted-foreground ml-1">· {article.createdAt}</span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Icon name="Heart" size={12} /> {article.likes}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Eye" size={12} /> {article.views}
          </span>
        </div>
      </div>
    </button>
  );
}

function ArticleModal({ article, onClose, onAuthorClick }: { article: Article; onClose: () => void; onAuthorClick: (id: number) => void }) {
  const author = getUserById(article.authorId);
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background animate-fade-in">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-5 py-4 flex items-center gap-3">
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
          <Icon name="ArrowLeft" size={18} className="text-muted-foreground" />
        </button>
        <span className="text-xs px-2.5 py-1 bg-accent text-accent-foreground rounded-full font-medium">
          {article.category}
        </span>
        <div className="flex-1" />
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Icon name="Clock" size={12} /> {article.readTime} мин чтения
        </span>
      </header>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="max-w-2xl mx-auto px-5 pt-6">
          <h1 className="text-xl font-bold font-montserrat text-foreground leading-snug mb-5">
            {article.title}
          </h1>

          <button
            onClick={() => onAuthorClick(article.authorId)}
            className="flex items-center gap-3 mb-6 group"
          >
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-xl">
              {author?.avatar}
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {author?.name}
              </p>
              <p className="text-xs text-muted-foreground">
                {author?.role === 'teacher' ? `Преподаватель · ${author.subject}` : 'Студент'} · {article.createdAt}
              </p>
            </div>
          </button>

          <div className="prose prose-sm max-w-none">
            {article.body.split('. ').reduce((acc: string[], sentence, i, arr) => {
              if (i % 4 === 0 && i !== 0) acc.push('\n\n');
              acc.push(sentence + (i < arr.length - 1 ? '. ' : ''));
              return acc;
            }, []).join('').split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-foreground leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-border">
            {article.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-lg">
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icon name="Eye" size={14} /> {article.views} просмотров
              </span>
            </div>
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${liked ? 'bg-red-50 text-red-500 border border-red-200' : 'bg-secondary text-muted-foreground hover:bg-red-50 hover:text-red-500'}`}
            >
              <Icon name="Heart" size={16} className={liked ? 'fill-red-500' : ''} />
              {liked ? article.likes + 1 : article.likes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage({ onNavigate }: ArticlesPageProps) {
  const [activeCategory, setActiveCategory] = useState('Все');
  const [openArticle, setOpenArticle] = useState<Article | null>(null);
  const [sortBy, setSortBy] = useState<'new' | 'popular'>('popular');

  const filtered = articles
    .filter(a => activeCategory === 'Все' || a.category === activeCategory)
    .sort((a, b) => sortBy === 'popular' ? b.likes - a.likes : b.id - a.id);

  if (openArticle) {
    return (
      <ArticleModal
        article={openArticle}
        onClose={() => setOpenArticle(null)}
        onAuthorClick={(id) => {
          setOpenArticle(null);
          onNavigate('profile', { userId: id });
        }}
      />
    );
  }

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-montserrat">Статьи</h2>
            <div className="flex bg-secondary rounded-xl p-1 gap-0.5">
              <button
                onClick={() => setSortBy('popular')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${sortBy === 'popular' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Популярные
              </button>
              <button
                onClick={() => setSortBy('new')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${sortBy === 'new' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
              >
                Новые
              </button>
            </div>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {articleCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory === cat ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">{filtered.length} статей</span>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors">
            <Icon name="PenLine" size={13} />
            Написать статью
          </button>
        </div>

        <div className="space-y-4">
          {filtered.map((article, i) => (
            <div key={article.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.04}s` }}>
              <ArticleCard article={article} onOpen={() => setOpenArticle(article)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
