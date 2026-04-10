import { useState } from 'react';
import { questions, users, categories } from '@/data/mockData';
import type { Question } from '@/data/mockData';
import Icon from '@/components/ui/icon';

interface QuestionsPageProps {
  onNavigate: (page: string, params?: Record<string, unknown>) => void;
}

const getUserById = (id: number) => users.find(u => u.id === id);

function AnswerBlock({ questionId }: { questionId: number }) {
  const question = questions.find(q => q.id === questionId);
  if (!question) return null;
  return (
    <div className="mt-3 space-y-3 animate-fade-in">
      {question.answers.map(answer => {
        const author = getUserById(answer.authorId);
        return (
          <div key={answer.id} className={`answer-card ${answer.isAccepted ? 'border-green-200 bg-green-50/60' : ''}`}>
            {answer.isAccepted && (
              <div className="flex items-center gap-1 text-green-600 text-xs font-semibold mb-2">
                <Icon name="CheckCircle" size={13} />
                Лучший ответ
              </div>
            )}
            <p className="text-sm text-foreground leading-relaxed mb-3">{answer.body}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg">{author?.avatar}</span>
                <div>
                  <span className="text-xs font-semibold text-foreground">{author?.name}</span>
                  <span className="text-xs text-muted-foreground ml-1">· {answer.createdAt}</span>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-primary/5">
                <Icon name="ThumbsUp" size={13} />
                {answer.likes}
              </button>
            </div>
          </div>
        );
      })}
      <div className="bg-card border border-dashed border-border rounded-xl p-3">
        <textarea
          placeholder="Написать ответ..."
          className="w-full text-sm text-foreground bg-transparent resize-none outline-none placeholder:text-muted-foreground min-h-[60px]"
        />
        <div className="flex justify-end mt-2">
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Ответить
          </button>
        </div>
      </div>
    </div>
  );
}

export default function QuestionsPage({ onNavigate }: QuestionsPageProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const [showCategories, setShowCategories] = useState(false);

  const filteredQuestions = activeCategory
    ? questions.filter(q => q.category === activeCategory)
    : questions;

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b border-border px-5 py-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold font-montserrat">Вопросы</h2>
            <button
              onClick={() => setShowCategories(!showCategories)}
              className="flex items-center gap-1.5 text-sm text-primary font-medium"
            >
              <Icon name="Filter" size={15} />
              Категории
            </button>
          </div>
          {showCategories && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none animate-fade-in">
              <button
                onClick={() => setActiveCategory(null)}
                className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${!activeCategory ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
              >
                Все
              </button>
              {categories.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name === activeCategory ? null : cat.name)}
                  className={`shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${activeCategory === cat.name ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-muted'}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-muted-foreground">
            {filteredQuestions.length} {filteredQuestions.length === 1 ? 'вопрос' : 'вопросов'}
            {activeCategory && ` · ${activeCategory}`}
          </span>
          <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-3 py-2 rounded-xl hover:bg-primary/90 transition-colors">
            <Icon name="Plus" size={13} />
            Задать вопрос
          </button>
        </div>

        <div className="space-y-3">
          {filteredQuestions.map((question: Question) => {
            const author = getUserById(question.authorId);
            const isExpanded = expandedQuestion === question.id;
            return (
              <div key={question.id} className={`bg-card border rounded-2xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border-primary/30 shadow-md' : 'border-border hover:border-primary/20 hover:shadow-sm'}`}>
                <button
                  className="w-full text-left p-5"
                  onClick={() => setExpandedQuestion(isExpanded ? null : question.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full font-medium">
                          {question.category}
                        </span>
                        {question.answers.some(a => a.isAccepted) && (
                          <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-medium flex items-center gap-1">
                            <Icon name="Check" size={10} /> Ответ есть
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-1.5">{question.title}</h3>
                      {!isExpanded && (
                        <p className="text-xs text-muted-foreground line-clamp-2">{question.body}</p>
                      )}
                      {isExpanded && (
                        <p className="text-sm text-muted-foreground mb-3">{question.body}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base">{author?.avatar}</span>
                          <span className="text-xs text-muted-foreground">{author?.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="MessageCircle" size={11} /> {question.answersCount}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Icon name="Eye" size={11} /> {question.views}
                        </span>
                        <span className="text-xs text-muted-foreground">{question.createdAt}</span>
                      </div>
                    </div>
                    <Icon
                      name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                      size={16}
                      className="text-muted-foreground mt-0.5 shrink-0"
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 border-t border-border/50 pt-4">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {question.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 bg-secondary text-muted-foreground rounded-lg">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                      {question.answersCount} {question.answersCount === 1 ? 'ответ' : 'ответа'}
                    </h4>
                    <AnswerBlock questionId={question.id} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
