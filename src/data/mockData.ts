export type UserRole = 'student' | 'teacher';
export type RankTier = 'Новичок' | 'Ученик' | 'Знаток' | 'Эксперт' | 'Наставник' | 'Мастер' | 'Гуру' | 'Легенда';

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

const allAchievements: Achievement[] = [
  { id: 1, title: 'Первый ответ', icon: '🎯', description: 'Дать первый ответ на платформе', unlocked: false },
  { id: 2, title: 'Десятка', icon: '🔟', description: 'Дать 10 ответов', unlocked: false },
  { id: 3, title: 'Полсотни', icon: '5️⃣0️⃣', description: 'Дать 50 ответов', unlocked: false },
  { id: 4, title: 'Сотня', icon: '💯', description: 'Дать 100 ответов', unlocked: false },
  { id: 5, title: 'Двести', icon: '🏅', description: 'Дать 200 ответов', unlocked: false },
  { id: 6, title: 'Первый лайк', icon: '❤️', description: 'Получить первый лайк', unlocked: false },
  { id: 7, title: 'Популярный', icon: '⭐', description: 'Набрать 100 лайков', unlocked: false },
  { id: 8, title: 'Звезда', icon: '🌟', description: 'Набрать 500 лайков', unlocked: false },
  { id: 9, title: 'Суперзвезда', icon: '💫', description: 'Набрать 1000 лайков', unlocked: false },
  { id: 10, title: 'Лучший ответ', icon: '✅', description: 'Получить первый принятый ответ', unlocked: false },
  { id: 11, title: 'Наставник', icon: '🧑‍🏫', description: '10 принятых ответов', unlocked: false },
  { id: 12, title: 'Знаток', icon: '📚', description: 'Достичь ранга Знаток', unlocked: false },
  { id: 13, title: 'Эксперт', icon: '🔬', description: 'Достичь ранга Эксперт', unlocked: false },
  { id: 14, title: 'Мастер', icon: '🏆', description: 'Достичь ранга Мастер', unlocked: false },
  { id: 15, title: 'Гуру', icon: '🧠', description: 'Достичь ранга Гуру', unlocked: false },
  { id: 16, title: 'Легенда', icon: '👑', description: 'Достичь ранга Легенда', unlocked: false },
  { id: 17, title: 'Ранняя пташка', icon: '🌅', description: 'Первый ответ до 8 утра', unlocked: false },
  { id: 18, title: 'Полуночник', icon: '🌙', description: 'Ответить после полуночи', unlocked: false },
  { id: 19, title: 'Неделя подряд', icon: '📆', description: 'Активность 7 дней подряд', unlocked: false },
  { id: 20, title: 'Месяц без паузы', icon: '🗓️', description: 'Активность 30 дней подряд', unlocked: false },
];

function makeAchievements(unlockedIds: number[]): Achievement[] {
  return allAchievements.map(a => ({ ...a, unlocked: unlockedIds.includes(a.id) }));
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
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 19]),
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
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 19, 20]),
  },
  {
    id: 3,
    name: 'Елена Петрова',
    avatar: '👩‍🔬',
    role: 'teacher',
    rank: 'Наставник',
    rating: 2940,
    answersCount: 175,
    likesReceived: 890,
    subject: 'Физика',
    bio: 'Кандидат физических наук. Объясняю квантовую механику на пальцах.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 19]),
  },
  {
    id: 6,
    name: 'Павел Громов',
    avatar: '👨‍🔬',
    role: 'teacher',
    rank: 'Гуру',
    rating: 5610,
    answersCount: 401,
    likesReceived: 2300,
    subject: 'Химия',
    bio: 'Доктор химических наук, профессор МГУ. 20 лет преподавательского опыта.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 19, 20]),
  },
  {
    id: 7,
    name: 'Наталья Соколова',
    avatar: '👩‍💼',
    role: 'teacher',
    rank: 'Эксперт',
    rating: 2100,
    answersCount: 130,
    likesReceived: 620,
    subject: 'История',
    bio: 'Историк, люблю рассказывать о событиях через судьбы людей.',
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 13, 19]),
  },
  {
    id: 8,
    name: 'Андрей Зайцев',
    avatar: '👨‍🎨',
    role: 'teacher',
    rank: 'Мастер',
    rating: 3120,
    answersCount: 190,
    likesReceived: 1050,
    subject: 'Литература',
    bio: 'Филолог, преподаватель русской и зарубежной литературы.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 20]),
  },
  {
    id: 9,
    name: 'Ирина Лебедева',
    avatar: '🧑‍💻',
    role: 'teacher',
    rank: 'Знаток',
    rating: 1200,
    answersCount: 88,
    likesReceived: 380,
    subject: 'Английский язык',
    bio: 'CELTA сертифицированный преподаватель английского. Помогаю с грамматикой и произношением.',
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 10, 11, 12, 19]),
  },
  {
    id: 10,
    name: 'Сергей Волков',
    avatar: '👨‍🏫',
    role: 'teacher',
    rank: 'Наставник',
    rating: 2450,
    answersCount: 155,
    likesReceived: 730,
    subject: 'Биология',
    bio: 'Биолог-эколог, преподаю в университете и школе. Пишу понятно о сложных процессах.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17]),
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
    bio: 'Студент 3 курса МГТУ. Увлекаюсь математикой и теорфизикой.',
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 8, 10, 11, 12, 19]),
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
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 10, 12, 19]),
  },
  {
    id: 11,
    name: 'Артём Попов',
    avatar: '🧑‍🎓',
    role: 'student',
    rank: 'Эксперт',
    rating: 2050,
    answersCount: 118,
    likesReceived: 540,
    bio: 'Студент 4 курса физфака. Помогаю с классической механикой и матанализом.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 19, 20]),
  },
  {
    id: 12,
    name: 'Дарья Кузнецова',
    avatar: '👩‍💻',
    role: 'student',
    rank: 'Ученик',
    rating: 320,
    answersCount: 18,
    likesReceived: 55,
    bio: 'Первокурсница на IT-специальности. Учусь и помогаю другим первокурсникам.',
    achievements: makeAchievements([1, 2, 6, 10, 12]),
  },
  {
    id: 13,
    name: 'Никита Орлов',
    avatar: '👨‍💼',
    role: 'student',
    rank: 'Знаток',
    rating: 1100,
    answersCount: 60,
    likesReceived: 240,
    bio: 'Студент юрфака, но очень люблю математику. Объясняю задачи через логику.',
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 10, 12, 19]),
  },
  {
    id: 14,
    name: 'Алина Смирнова',
    avatar: '🧕',
    role: 'student',
    rank: 'Эксперт',
    rating: 1980,
    answersCount: 105,
    likesReceived: 490,
    bio: 'Магистрантка химфака. Помогаю с органической химией и стехиометрией.',
    achievements: makeAchievements([1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 17, 18]),
  },
  {
    id: 15,
    name: 'Кирилл Михайлов',
    avatar: '🧑‍🔬',
    role: 'student',
    rank: 'Новичок',
    rating: 90,
    answersCount: 5,
    likesReceived: 12,
    bio: 'Только начинаю. Учусь на первом курсе биофака.',
    achievements: makeAchievements([1, 6]),
  },
  {
    id: 16,
    name: 'Полина Фёдорова',
    avatar: '👩‍🎨',
    role: 'student',
    rank: 'Знаток',
    rating: 1350,
    answersCount: 67,
    likesReceived: 280,
    bio: 'Студентка лингвистики. Помогаю с английским и немецким языками.',
    achievements: makeAchievements([1, 2, 3, 4, 6, 7, 10, 12, 18, 19]),
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
    answersCount: 4,
    answers: [
      {
        id: 1,
        body: 'Классическое доказательство через площади: рассмотрим квадрат со стороной (a+b). Его площадь равна (a+b)². Внутри расположим 4 прямоугольных треугольника со сторонами a, b, c. Площадь каждого — ab/2. Оставшаяся фигура в центре — квадрат со стороной c. Итого: (a+b)² = 4·(ab/2) + c², что упрощается до a² + b² = c². ✓',
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
        body: 'Я нашёл ещё один визуальный способ: нарисуй квадрат на каждой стороне треугольника. Площадь квадрата на гипотенузе равна сумме площадей квадратов на катетах. Это можно буквально "вырезать и сложить" из бумаги!',
        authorId: 11,
        createdAt: '30 минут назад',
        likes: 14,
        isAccepted: false,
      },
      {
        id: 101,
        body: 'Лучшее доказательство для визуалов — метод Бхаскары: нарисуй квадрат со стороной c, внутри него расположи 4 треугольника. В центре получится квадрат со стороной (a-b). Дальше — простая алгебра.',
        authorId: 6,
        createdAt: '20 минут назад',
        likes: 22,
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
    answersCount: 4,
    answers: [
      {
        id: 4,
        body: 'Главное отличие: список (list) — изменяемый, кортеж (tuple) — нет. Список: [1, 2, 3], можно добавить/удалить элемент. Кортеж: (1, 2, 3), нельзя изменить после создания. Кортежи быстрее при итерации и используют меньше памяти. Применяй кортежи для фиксированных данных (координаты, RGB-цвет), списки — для коллекций, которые меняются.',
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
      {
        id: 102,
        body: 'С точки зрения производительности: tuple занимает ~20-30% меньше памяти, чем list с теми же данными. Проверить можно через sys.getsizeof(). Для больших структур данных это ощутимо.',
        authorId: 13,
        createdAt: '1 час назад',
        likes: 9,
        isAccepted: false,
      },
      {
        id: 103,
        body: 'Ещё важный нюанс: tuple с одним элементом пишется как (42,) — с запятой. Без запятой (42) — это просто число в скобках. Классическая ловушка для новичков!',
        authorId: 12,
        createdAt: '40 минут назад',
        likes: 21,
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
    answersCount: 3,
    answers: [
      {
        id: 6,
        body: 'Суперпозиция — это когда квантовый объект одновременно находится в нескольких состояниях. Представь монету в воздухе: пока летит — "и орёл, и решка". В момент измерения — выбирается одно состояние. В квантовом компьютере кубит может быть одновременно 0 и 1, что позволяет обрабатывать огромное количество вариантов параллельно.',
        authorId: 3,
        createdAt: '22 часа назад',
        likes: 67,
        isAccepted: true,
      },
      {
        id: 7,
        body: 'Кот Шрёдингера — самый известный пример суперпозиции. Хотя это был мысленный эксперимент-абсурд для критики копенгагенской интерпретации, он хорошо иллюстрирует идею.',
        authorId: 11,
        createdAt: '20 часов назад',
        likes: 29,
        isAccepted: false,
      },
      {
        id: 104,
        body: 'Если хочешь глубже — почитай про интерференцию квантовых состояний. Именно она делает квантовые вычисления мощными: правильные ответы "усиливаются", а неправильные "гасятся".',
        authorId: 10,
        createdAt: '18 часов назад',
        likes: 17,
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
    answersCount: 3,
    answers: [
      {
        id: 8,
        body: 'QuickSort выбирает "опорный элемент" (pivot), разделяет массив на два подмассива: меньше и больше опорного, затем рекурсивно сортирует каждый. Среднее время — O(n log n). Опорный: первый, последний, случайный или медиана трёх. Случайный выбор защищает от худшего случая O(n²).',
        authorId: 2,
        createdAt: '1 день назад',
        likes: 28,
        isAccepted: true,
      },
      {
        id: 105,
        body: 'Важно понимать, почему QuickSort быстрее MergeSort на практике, несмотря на одинаковую асимптотику. Дело в кэш-дружелюбности: QuickSort работает "на месте" и реже обращается к памяти.',
        authorId: 14,
        createdAt: '20 часов назад',
        likes: 19,
        isAccepted: false,
      },
      {
        id: 106,
        body: 'Совет для экзамена: запомни три случая — лучший O(n log n), средний O(n log n) и худший O(n²). Худший возникает, когда каждый раз выбирается минимальный/максимальный элемент как pivot (например, уже отсортированный массив).',
        authorId: 11,
        createdAt: '15 часов назад',
        likes: 24,
        isAccepted: false,
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
    answersCount: 4,
    answers: [
      {
        id: 9,
        body: 'Интеграл — это "накопление". Если производная показывает скорость изменения, то интеграл суммирует изменения. Простой пример: если есть функция скорости автомобиля, интеграл даёт пройденное расстояние. Геометрически — площадь под кривой.',
        authorId: 1,
        createdAt: '2 дня назад',
        likes: 54,
        isAccepted: true,
      },
      {
        id: 10,
        body: 'Связь интеграла и производной — теорема Ньютона-Лейбница. Дифференцирование и интегрирование — обратные операции, как умножение и деление.',
        authorId: 3,
        createdAt: '2 дня назад',
        likes: 31,
        isAccepted: false,
      },
      {
        id: 107,
        body: 'Физический смысл интеграла: если ты знаешь силу как функцию координаты, интеграл даст работу. Если знаешь мощность как функцию времени — интеграл даст энергию. Буквально — "сумма бесконечно малых слагаемых".',
        authorId: 10,
        createdAt: '1 день назад',
        likes: 38,
        isAccepted: false,
      },
      {
        id: 108,
        body: 'Для понимания очень помогает метод прямоугольников: разбиваем площадь под кривой на узкие столбики. Интеграл — это предел такой суммы при стремлении ширины к нулю. Попробуй порисовать графики!',
        authorId: 16,
        createdAt: '22 часа назад',
        likes: 15,
        isAccepted: false,
      },
    ],
  },
  {
    id: 6,
    title: 'Как сбалансировать химическое уравнение?',
    body: 'Никак не могу понять алгоритм расстановки коэффициентов. Есть ли универсальный метод?',
    category: 'Химия',
    tags: ['химические уравнения', 'коэффициенты', 'основы'],
    authorId: 12,
    createdAt: '5 часов назад',
    views: 143,
    answersCount: 3,
    answers: [
      {
        id: 109,
        body: 'Метод электронного баланса: 1) Определи степени окисления всех элементов. 2) Найди те, что изменились. 3) Составь электронный баланс (число принятых е⁻ = числу отданных). 4) Полученные множители — коэффициенты перед окислителем и восстановителем.',
        authorId: 6,
        createdAt: '4 часа назад',
        likes: 33,
        isAccepted: true,
      },
      {
        id: 110,
        body: 'Для простых уравнений работает метод подбора: начни с самого сложного вещества, проставь коэффициент 1, затем балансируй остальные. Проверяй, чтобы количество атомов каждого элемента совпадало с обеих сторон.',
        authorId: 14,
        createdAt: '3 часа назад',
        likes: 18,
        isAccepted: false,
      },
      {
        id: 111,
        body: 'Лайфхак: кислород и водород расставляй в последнюю очередь — они обычно "подстраиваются" под остальные коэффициенты. Начинай с металлов и сложных ионов.',
        authorId: 4,
        createdAt: '2 часа назад',
        likes: 11,
        isAccepted: false,
      },
    ],
  },
  {
    id: 7,
    title: 'В чём разница между TCP и UDP?',
    body: 'Изучаю сетевые протоколы. Когда нужно использовать TCP, а когда UDP?',
    category: 'Программирование',
    tags: ['сети', 'протоколы', 'TCP', 'UDP'],
    authorId: 13,
    createdAt: '1 день назад',
    views: 278,
    answersCount: 3,
    answers: [
      {
        id: 112,
        body: 'TCP — надёжный, с гарантией доставки и порядка пакетов (握手, подтверждения, повторная отправка). UDP — быстрый, без гарантий. TCP: веб (HTTP/S), email, файлы. UDP: видеозвонки, онлайн-игры, DNS — там важнее скорость, чем потеря пакета.',
        authorId: 2,
        createdAt: '22 часа назад',
        likes: 45,
        isAccepted: true,
      },
      {
        id: 113,
        body: 'Аналогия: TCP — заказное письмо с уведомлением о вручении. UDP — обычная листовка в ящик: быстро, но не знаешь, получили ли.',
        authorId: 11,
        createdAt: '20 часов назад',
        likes: 37,
        isAccepted: false,
      },
      {
        id: 114,
        body: 'Интересный факт: QUIC (HTTP/3) работает поверх UDP, но реализует надёжность на уровне приложения — это позволяет снизить latency по сравнению с TCP.',
        authorId: 5,
        createdAt: '18 часов назад',
        likes: 22,
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

export const rankSystem = [
  { rank: 'Новичок' as RankTier, min: 0, max: 149, icon: '🌱', color: 'badge-blue' },
  { rank: 'Ученик' as RankTier, min: 150, max: 499, icon: '📖', color: 'badge-blue' },
  { rank: 'Знаток' as RankTier, min: 500, max: 1199, icon: '📚', color: 'badge-bronze' },
  { rank: 'Эксперт' as RankTier, min: 1200, max: 1999, icon: '🔬', color: 'badge-blue' },
  { rank: 'Наставник' as RankTier, min: 2000, max: 2999, icon: '🧑‍🏫', color: 'badge-purple' },
  { rank: 'Мастер' as RankTier, min: 3000, max: 4499, icon: '🏆', color: 'badge-silver' },
  { rank: 'Гуру' as RankTier, min: 4500, max: 5999, icon: '🧠', color: 'badge-teal' },
  { rank: 'Легенда' as RankTier, min: 6000, max: Infinity, icon: '👑', color: 'badge-gold' },
];
