export type UserRole = 'student' | 'teacher';
export type RankTier = 'Новичок' | 'Знаток' | 'Эксперт' | 'Мастер' | 'Легенда';

export interface User {
  id: number;
  name: string;
  avatar: string;
  role: UserRole;
  rank: RankTier;
  rating: number;
  answersCount: number;
  likesReceived: number;
  subject?: string;
  bio?: string;
  achievements: Achievement[];
}

export interface Achievement {
  id: number;
  title: string;
  icon: string;
  description: string;
  unlocked: boolean;
}

export interface Question {
  id: number;
  title: string;
  body: string;
  category: string;
  tags: string[];
  authorId: number;
  createdAt: string;
  views: number;
  answersCount: number;
  answers: Answer[];
}

export interface Answer {
  id: number;
  body: string;
  authorId: number;
  createdAt: string;
  likes: number;
  isAccepted: boolean;
}

export interface Notification {
  id: number;
  type: 'like' | 'answer' | 'achievement';
  text: string;
  time: string;
  read: boolean;
}

export const users: User[] = [
  {
    id: 1,
    name: 'Александра Морозова',
    avatar: '👩‍🏫',
    role: 'teacher',
    rank: 'Легенда',
    rating: 4820,
    answersCount: 312,
    likesReceived: 1840,
    subject: 'Математика',
    bio: 'Преподаю высшую математику уже 12 лет. Люблю объяснять сложное простым языком.',
    achievements: [
      { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дал первый ответ', unlocked: true },
      { id: 2, title: 'Популярный', icon: '⭐', description: '100 лайков', unlocked: true },
      { id: 3, title: 'Мастер', icon: '🏆', description: '200 ответов', unlocked: true },
      { id: 4, title: 'Легенда', icon: '👑', description: '4000+ рейтинга', unlocked: true },
    ],
  },
  {
    id: 2,
    name: 'Дмитрий Козлов',
    avatar: '👨‍💻',
    role: 'teacher',
    rank: 'Мастер',
    rating: 3650,
    answersCount: 218,
    likesReceived: 1200,
    subject: 'Программирование',
    bio: 'Разработчик и преподаватель. Специализация — Python и алгоритмы.',
    achievements: [
      { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дал первый ответ', unlocked: true },
      { id: 2, title: 'Популярный', icon: '⭐', description: '100 лайков', unlocked: true },
      { id: 3, title: 'Мастер', icon: '🏆', description: '200 ответов', unlocked: true },
      { id: 4, title: 'Легенда', icon: '👑', description: '4000+ рейтинга', unlocked: false },
    ],
  },
  {
    id: 3,
    name: 'Елена Петрова',
    avatar: '👩‍🔬',
    role: 'teacher',
    rank: 'Эксперт',
    rating: 2940,
    answersCount: 175,
    likesReceived: 890,
    subject: 'Физика',
    bio: 'Кандидат физических наук. Объясняю квантовую механику на пальцах.',
    achievements: [
      { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дал первый ответ', unlocked: true },
      { id: 2, title: 'Популярный', icon: '⭐', description: '100 лайков', unlocked: true },
      { id: 3, title: 'Мастер', icon: '🏆', description: '200 ответов', unlocked: false },
      { id: 4, title: 'Легенда', icon: '👑', description: '4000+ рейтинга', unlocked: false },
    ],
  },
  {
    id: 4,
    name: 'Иван Сидоров',
    avatar: '👨‍🎓',
    role: 'student',
    rank: 'Знаток',
    rating: 1870,
    answersCount: 94,
    likesReceived: 420,
    subject: undefined,
    bio: 'Студент 3 курса МГТУ. Увлекаюсь математикой и теорфизикой.',
    achievements: [
      { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дал первый ответ', unlocked: true },
      { id: 2, title: 'Популярный', icon: '⭐', description: '100 лайков', unlocked: true },
      { id: 3, title: 'Мастер', icon: '🏆', description: '200 ответов', unlocked: false },
      { id: 4, title: 'Легенда', icon: '👑', description: '4000+ рейтинга', unlocked: false },
    ],
  },
  {
    id: 5,
    name: 'Мария Новикова',
    avatar: '👩‍🎓',
    role: 'student',
    rank: 'Знаток',
    rating: 1540,
    answersCount: 72,
    likesReceived: 310,
    bio: 'Студентка факультета информатики. Помогаю с задачами по программированию.',
    achievements: [
      { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дал первый ответ', unlocked: true },
      { id: 2, title: 'Популярный', icon: '⭐', description: '50 лайков', unlocked: true },
      { id: 3, title: 'Мастер', icon: '🏆', description: '200 ответов', unlocked: false },
      { id: 4, title: 'Легенда', icon: '👑', description: '4000+ рейтинга', unlocked: false },
    ],
  },
];

export const questions: Question[] = [
  {
    id: 1,
    title: 'Как доказать теорему Пифагора через площади?',
    body: 'Изучаю геометрию и хочу понять разные способы доказательства. Особенно интересен метод через площади фигур.',
    category: 'Математика',
    tags: ['геометрия', 'теоремы', 'доказательства'],
    authorId: 4,
    createdAt: '2 часа назад',
    views: 234,
    answersCount: 3,
    answers: [
      {
        id: 1,
        body: 'Классическое доказательство через площади: рассмотрим квадрат со стороной (a+b). Его площадь равна (a+b)². Внутри расположим 4 прямоугольных треугольника со сторонами a, b, c. Площадь каждого треугольника равна ab/2. Оставшаяся фигура в центре — квадрат со стороной c. Таким образом: (a+b)² = 4·(ab/2) + c², что упрощается до a² + b² = c². ✓',
        authorId: 1,
        createdAt: '1 час назад',
        likes: 42,
        isAccepted: true,
      },
      {
        id: 2,
        body: 'Есть также элегантное доказательство через подобные треугольники. Проведём высоту из прямого угла на гипотенузу. Получим три подобных треугольника, из соотношений которых напрямую следует теорема.',
        authorId: 3,
        createdAt: '45 минут назад',
        likes: 18,
        isAccepted: false,
      },
      {
        id: 3,
        body: 'Я использовал метод из книги Полья "Математика и правдоподобные рассуждения" — там несколько страниц посвящено именно площадям. Очень наглядно!',
        authorId: 4,
        createdAt: '30 минут назад',
        likes: 7,
        isAccepted: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Чем отличается список от кортежа в Python?',
    body: 'Начинаю изучать Python и запутался в типах данных. В чём практическая разница между list и tuple?',
    category: 'Программирование',
    tags: ['python', 'типы данных', 'основы'],
    authorId: 5,
    createdAt: '4 часа назад',
    views: 189,
    answersCount: 2,
    answers: [
      {
        id: 4,
        body: 'Главное отличие: список (list) — изменяемый, кортеж (tuple) — нет. Список: [1, 2, 3], можно добавить, удалить элемент. Кортеж: (1, 2, 3), нельзя изменить после создания. Кортежи быстрее при итерации и используют меньше памяти. Применяй кортежи для фиксированных данных (координаты, RGB-цвет), списки — для коллекций, которые меняются.',
        authorId: 2,
        createdAt: '3 часа назад',
        likes: 35,
        isAccepted: true,
      },
      {
        id: 5,
        body: 'Добавлю: кортежи можно использовать как ключи словаря (dict), а списки — нет, именно из-за неизменяемости. Это важный практический момент.',
        authorId: 5,
        createdAt: '2 часа назад',
        likes: 12,
        isAccepted: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Что такое квантовая суперпозиция?',
    body: 'Читал про квантовый компьютер и встретил этот термин. Можно объяснить простыми словами?',
    category: 'Физика',
    tags: ['квантовая физика', 'основы', 'теория'],
    authorId: 4,
    createdAt: '1 день назад',
    views: 412,
    answersCount: 2,
    answers: [
      {
        id: 6,
        body: 'Суперпозиция — это когда квантовый объект (например, электрон) одновременно находится в нескольких состояниях. Представь монету в воздухе: пока она летит, она "и орёл, и решка". В момент измерения (падения) — выбирается одно из состояний. В квантовом компьютере кубит может быть одновременно 0 и 1, что позволяет обрабатывать огромное количество вариантов параллельно.',
        authorId: 3,
        createdAt: '22 часа назад',
        likes: 67,
        isAccepted: true,
      },
      {
        id: 7,
        body: 'Кот Шрёдингера — самый известный пример суперпозиции. Хотя это был мысленный эксперимент-абсурд, он хорошо иллюстрирует идею.',
        authorId: 4,
        createdAt: '20 часов назад',
        likes: 29,
        isAccepted: false,
      },
    ],
  },
  {
    id: 4,
    title: 'Как работает алгоритм быстрой сортировки?',
    body: 'Нужно понять QuickSort для экзамена. Как выбирается опорный элемент и почему алгоритм считается быстрым?',
    category: 'Программирование',
    tags: ['алгоритмы', 'сортировка', 'сложность'],
    authorId: 5,
    createdAt: '2 дня назад',
    views: 356,
    answersCount: 1,
    answers: [
      {
        id: 8,
        body: 'QuickSort выбирает "опорный элемент" (pivot), разделяет массив на два подмассива: меньше и больше опорного, затем рекурсивно сортирует каждый. Среднее время — O(n log n). Опорный элемент можно выбрать: первый, последний, случайный или медиана трёх. Случайный выбор защищает от худшего случая O(n²) на отсортированных данных.',
        authorId: 2,
        createdAt: '1 день назад',
        likes: 28,
        isAccepted: true,
      },
    ],
  },
  {
    id: 5,
    title: 'Что такое интеграл и зачем он нужен?',
    body: 'Прохожу математику в университете. Понимаю производную, но с интегралом сложнее. Можно объяснить на примерах?',
    category: 'Математика',
    tags: ['математический анализ', 'интегралы', 'основы'],
    authorId: 4,
    createdAt: '3 дня назад',
    views: 521,
    answersCount: 2,
    answers: [
      {
        id: 9,
        body: 'Интеграл — это "накопление". Если производная показывает скорость изменения, то интеграл — суммирует изменения. Простой пример: если у тебя есть функция скорости автомобиля, то интеграл этой функции даст пройденное расстояние. Геометрически — это площадь под кривой. Применяется в физике, экономике, технике везде, где нужно "посчитать суммарный эффект".',
        authorId: 1,
        createdAt: '2 дня назад',
        likes: 54,
        isAccepted: true,
      },
      {
        id: 10,
        body: 'Добавлю: связь интеграла и производной — это теорема Ньютона-Лейбница. Дифференцирование и интегрирование — обратные операции, как умножение и деление.',
        authorId: 3,
        createdAt: '2 дня назад',
        likes: 31,
        isAccepted: false,
      },
    ],
  },
];

export const notifications: Notification[] = [
  { id: 1, type: 'like', text: 'Александра Морозова лайкнула ваш ответ', time: '5 мин назад', read: false },
  { id: 2, type: 'answer', text: 'Новый ответ на ваш вопрос про интегралы', time: '1 час назад', read: false },
  { id: 3, type: 'achievement', text: 'Достижение разблокировано: "Первый ответ"', time: '2 часа назад', read: false },
  { id: 4, type: 'like', text: 'Дмитрий Козлов лайкнул ваш ответ', time: '5 часов назад', read: true },
  { id: 5, type: 'answer', text: 'Новый ответ на ваш вопрос про Python', time: '1 день назад', read: true },
];

export const categories = [
  { name: 'Математика', icon: '📐', count: 142 },
  { name: 'Программирование', icon: '💻', count: 218 },
  { name: 'Физика', icon: '⚛️', count: 89 },
  { name: 'Химия', icon: '🧪', count: 64 },
  { name: 'История', icon: '📜', count: 55 },
  { name: 'Биология', icon: '🧬', count: 71 },
  { name: 'Литература', icon: '📚', count: 43 },
  { name: 'Английский', icon: '🌍', count: 97 },
];
