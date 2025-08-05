export interface Question {
  id: number;
  category: string;
  question: string;
  options?: {
    value: number | string;
    label: string;
  }[];
  isIndustry?: boolean;
  isText?: boolean;
  inputType?: 'text' | 'email' | 'select';
  placeholder?: string;
}

export const questions: Question[] = [
  {
    id: -4,
    category: "基本情報",
    question: "会社名を教えてください",
    isText: true,
    inputType: "text",
    placeholder: "例：株式会社〇〇"
  },
  {
    id: -3,
    category: "基本情報",
    question: "従業員数はどのくらいですか？",
    inputType: "select",
    options: [
      { value: "1-50", label: "1-50名" },
      { value: "51-100", label: "51-100名" },
      { value: "101-500", label: "101-500名" },
      { value: "501-1000", label: "501-1000名" },
      { value: "1001-5000", label: "1001-5000名" },
      { value: "5001+", label: "5001名以上" }
    ]
  },
  {
    id: -2,
    category: "基本情報",
    question: "お名前を教えてください",
    isText: true,
    inputType: "text",
    placeholder: "例：山田太郎"
  },
  {
    id: -1,
    category: "基本情報",
    question: "メールアドレスを教えてください",
    isText: true,
    inputType: "email",
    placeholder: "例：example@company.com"
  },
  {
    id: 0,
    category: "業種",
    question: "どちらの業界ですか？",
    isIndustry: true,
    options: [
      { value: "製造", label: "製造業" },
      { value: "小売", label: "小売業" },
      { value: "金融", label: "金融業" },
      { value: "医療", label: "医療・ヘルスケア" },
      { value: "IT", label: "IT・テクノロジー" },
      { value: "教育", label: "教育" },
      { value: "その他", label: "その他" }
    ]
  },
  {
    id: 1,
    category: "現状把握",
    question: "今、一番困っている業務は何ですか？",
    options: [
      { value: 0, label: "特に困っていることはない" },
      { value: 3, label: "いくつか改善したい業務がある" },
      { value: 7, label: "すぐに解決したい課題がある" }
    ]
  },
  {
    id: 2,
    category: "現状把握",
    question: "社長や経営陣はAIについてどう思っていますか？",
    options: [
      { value: 0, label: "よくわからない・興味なさそう" },
      { value: 3, label: "気になっているみたい" },
      { value: 5, label: "前向きに検討している" },
      { value: 7, label: "ぜひ導入したいと言っている" }
    ]
  },
  {
    id: 3,
    category: "現状把握",
    question: "社内にITに詳しい人はいますか？",
    options: [
      { value: 0, label: "いない" },
      { value: 3, label: "1-2名はいる" },
      { value: 5, label: "チームがある" },
      { value: 7, label: "専門部署がある" }
    ]
  },
  {
    id: 4,
    category: "社内の様子",
    question: "社員の皆さんはAIについてどう感じていますか？",
    options: [
      { value: 0, label: "全く知らない・聞いたことがない" },
      { value: 3, label: "ニュースで聞く程度" },
      { value: 5, label: "興味を持っている人もいる" },
      { value: 7, label: "勉強会をしたりしている" }
    ]
  },
  {
    id: 5,
    category: "社内の様子",
    question: "新しいシステムを入れるとき、社内の反応は？",
    options: [
      { value: 0, label: "かなり抵抗がある" },
      { value: 3, label: "最初は戸惑うが慣れる" },
      { value: 6, label: "比較的スムーズに受け入れる" }
    ]
  },
  {
    id: 6,
    category: "データの状況",
    question: "売上や顧客情報などのデータはどう管理していますか？",
    options: [
      { value: 0, label: "紙やノートが中心" },
      { value: 3, label: "Excelで管理している" },
      { value: 5, label: "専用システムを使っている" },
      { value: 7, label: "データベースで一元管理" }
    ]
  },
  {
    id: 7,
    category: "データの状況",
    question: "データを使って何か分析したことはありますか？",
    options: [
      { value: 0, label: "特にない" },
      { value: 3, label: "簡単な集計くらい" },
      { value: 7, label: "定期的に分析している" }
    ]
  },
  {
    id: 8,
    category: "データの状況",
    question: "日々の業務記録はどうしていますか？",
    options: [
      { value: 0, label: "特に記録していない" },
      { value: 3, label: "必要最低限だけ記録" },
      { value: 6, label: "きちんと記録して活用している" }
    ]
  },
  {
    id: 9,
    category: "IT環境",
    question: "パソコンやタブレットの活用状況は？",
    options: [
      { value: 0, label: "最低限しか使わない" },
      { value: 3, label: "業務で普通に使っている" },
      { value: 7, label: "積極的に活用している" }
    ]
  },
  {
    id: 10,
    category: "IT環境",
    question: "情報セキュリティは気にしていますか？",
    options: [
      { value: 0, label: "あまり気にしていない" },
      { value: 3, label: "基本的なことはやっている" },
      { value: 5, label: "しっかり対策している" },
      { value: 7, label: "専門家に任せている" }
    ]
  },
  {
    id: 11,
    category: "AIへの関心",
    question: "ChatGPTなどのAIサービスを使ったことは？",
    options: [
      { value: 0, label: "使ったことがない" },
      { value: 3, label: "試してみたことがある" },
      { value: 7, label: "業務で活用している" }
    ]
  },
  {
    id: 12,
    category: "AIへの関心",
    question: "AIを導入したら効果を測定できそうですか？",
    options: [
      { value: 0, label: "どう測ればいいかわからない" },
      { value: 3, label: "なんとなくわかる" },
      { value: 5, label: "ある程度測定できそう" },
      { value: 6, label: "きちんと測定できる" }
    ]
  },
  {
    id: 13,
    category: "改善への姿勢",
    question: "普段から業務改善の提案は出ますか？",
    options: [
      { value: 0, label: "ほとんどない" },
      { value: 3, label: "たまに出る" },
      { value: 5, label: "よく出る" },
      { value: 7, label: "改善が当たり前の文化" }
    ]
  },
  {
    id: 14,
    category: "改善への姿勢",
    question: "新しいことを始めるときのスピード感は？",
    options: [
      { value: 0, label: "かなり慎重・時間がかかる" },
      { value: 3, label: "必要なら検討する" },
      { value: 7, label: "良いと思ったらすぐ試す" }
    ]
  },
  {
    id: 15,
    category: "外部との関係",
    question: "ITやAIについて相談できる相手はいますか？",
    options: [
      { value: 0, label: "いない" },
      { value: 3, label: "探している" },
      { value: 5, label: "知り合いにいる" },
      { value: 6, label: "既に相談している" }
    ]
  }
];

export const calculateScore = (answers: Record<number, number | string>): number => {
  const totalScore = Object.entries(answers).reduce((sum, [id, value]) => {
    const questionId = parseInt(id);
    // Skip company info questions (id: -4 to -1) and industry question (id: 0)
    if (questionId <= 0 || typeof value === 'string') return sum;
    return sum + value;
  }, 0);
  const maxScore = 100;
  return Math.round((totalScore / maxScore) * 100);
};

export const getIndustry = (answers: Record<number, number | string>): string => {
  return (answers[0] as string) || 'その他';
};

export const getTier = (score: number): string => {
  if (score >= 70) return "★★★";
  if (score >= 40) return "★★";
  return "★";
};