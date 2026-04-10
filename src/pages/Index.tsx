import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import HomePage from '@/pages/HomePage';
import QuestionsPage from '@/pages/QuestionsPage';
import RatingsPage from '@/pages/RatingsPage';
import ProfilePage from '@/pages/ProfilePage';
import SearchPage from '@/pages/SearchPage';
import ArticlesPage from '@/pages/ArticlesPage';

type Page = 'home' | 'questions' | 'articles' | 'ratings' | 'search' | 'profile';

export default function Index() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [profileUserId, setProfileUserId] = useState<number>(4);

  const handleNavigate = (page: string, params?: Record<string, unknown>) => {
    if (page === 'profile' && params?.userId) {
      setProfileUserId(params.userId as number);
    }
    setCurrentPage(page as Page);
  };

  return (
    <div className="min-h-screen bg-background">
      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'questions' && <QuestionsPage onNavigate={handleNavigate} />}
      {currentPage === 'articles' && <ArticlesPage onNavigate={handleNavigate} />}
      {currentPage === 'ratings' && <RatingsPage onNavigate={handleNavigate} />}
      {currentPage === 'profile' && <ProfilePage userId={profileUserId} onNavigate={handleNavigate} />}
      {currentPage === 'search' && <SearchPage onNavigate={handleNavigate} />}

      <BottomNav current={currentPage} onNavigate={(p) => setCurrentPage(p)} />
    </div>
  );
}
