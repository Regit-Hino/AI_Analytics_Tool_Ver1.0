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
    question: "会社名・組織名を入力してください",
    isText: true,
    inputType: "text",
    placeholder: "例：株式会社〇〇"
  },
  {
    id: -3,
    category: "基本情報",
    question: "従業員数を選択してください",
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
    question: "お名前を入力してください",
    isText: true,
    inputType: "text",
    placeholder: "例：山田太郎"
  },
  {
    id: -1,
    category: "基本情報",
    question: "メールアドレスを入力してください",
    isText: true,
    inputType: "email",
    placeholder: "例：example@company.com"
  },
  {
    id: 0,
    category: "業種",
    question: "あなたの組織の業種を選択してください",
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
    category: "戦略・ビジョン",
    question: "AIを使って解決したい業務課題は明確になっていますか？",
    options: [
      { value: 0, label: "いいえ、まだ明確ではない" },
      { value: 3, label: "いくつか候補はある" },
      { value: 7, label: "課題が明確で、優先度も定まっている" }
    ]
  },
  {
    id: 2,
    category: "戦略・ビジョン",
    question: "経営層はAI導入にどの程度関心がありますか？",
    options: [
      { value: 0, label: "関心なし" },
      { value: 3, label: "関心あり" },
      { value: 5, label: "積極的に支援" },
      { value: 7, label: "経営層自身が積極的に活用している" }
    ]
  },
  {
    id: 3,
    category: "組織・人材",
    question: "AI活用を推進する専門チーム・人材は存在しますか？",
    options: [
      { value: 0, label: "存在しない" },
      { value: 3, label: "検討中" },
      { value: 5, label: "一部存在" },
      { value: 7, label: "充実している" }
    ]
  },
  {
    id: 4,
    category: "組織・人材",
    question: "社員のAIリテラシー向上のための教育を実施していますか？",
    options: [
      { value: 0, label: "実施していない" },
      { value: 3, label: "計画中" },
      { value: 5, label: "一部実施" },
      { value: 7, label: "定期的に実施" }
    ]
  },
  {
    id: 5,
    category: "組織・人材",
    question: "社内でAIを活用することへの不安や抵抗感はありますか？",
    options: [
      { value: 0, label: "抵抗感が強く、導入は難しそう" },
      { value: 3, label: "興味もあるが、不安の声もある" },
      { value: 6, label: "興味関心が高く、前向きな雰囲気がある" }
    ]
  },
  {
    id: 6,
    category: "データ",
    question: "AIに活用できるデータの整備状況はいかがですか？",
    options: [
      { value: 0, label: "未整備" },
      { value: 3, label: "収集開始" },
      { value: 5, label: "部分的に整備" },
      { value: 7, label: "体系的に整備" }
    ]
  },
  {
    id: 7,
    category: "データ",
    question: "社内のデータ管理方法はどうなっていますか？",
    options: [
      { value: 0, label: "担当者やルールは特にない" },
      { value: 3, label: "Excelやファイルで個別に管理している" },
      { value: 7, label: "部門横断で一元管理されている" }
    ]
  },
  {
    id: 8,
    category: "データ",
    question: "日々の業務データはどのように扱われていますか？",
    options: [
      { value: 0, label: "紙・口頭・手作業中心" },
      { value: 3, label: "Excelでまとめているが活用できていない" },
      { value: 6, label: "データを活かして改善提案などに使っている" }
    ]
  },
  {
    id: 9,
    category: "技術・インフラ",
    question: "業務で使っているITツール（Excelなど）は、どのように活用されていますか？",
    options: [
      { value: 0, label: "Excelや紙ベースが主で共有は少ない" },
      { value: 3, label: "チーム内で共有して使っている" },
      { value: 7, label: "業務ツールが連携され自動化も進んでいる" }
    ]
  },
  {
    id: 10,
    category: "技術・インフラ",
    question: "セキュリティ・プライバシー対策は十分ですか？",
    options: [
      { value: 0, label: "不十分" },
      { value: 3, label: "基本的な対策のみ" },
      { value: 5, label: "概ね十分" },
      { value: 7, label: "万全の体制" }
    ]
  },
  {
    id: 11,
    category: "実践・運用",
    question: "AIに対して、どのくらい興味や関心がありますか？",
    options: [
      { value: 0, label: "ほとんど興味がない" },
      { value: 3, label: "興味はあるが、詳しくは知らない" },
      { value: 7, label: "社内で話題になっており、導入も検討している" }
    ]
  },
  {
    id: 12,
    category: "実践・運用",
    question: "AIを使って業務の効率化や成果を上げた場合、その取り組みが人事評価にきちんと結びつくような体制になっていますか？",
    options: [
      { value: 0, label: "全く結びついていない" },
      { value: 3, label: "検討中・一部で試行" },
      { value: 5, label: "ある程度評価に反映される" },
      { value: 6, label: "しっかりと評価される仕組みがある" }
    ]
  },
  {
    id: 13,
    category: "ガバナンス",
    question: "社内業務の改善活動は活発に行われていますか？",
    options: [
      { value: 0, label: "ほとんど行われていない" },
      { value: 3, label: "時々改善提案がある" },
      { value: 5, label: "定期的に改善活動を実施" },
      { value: 7, label: "常に改善を追求する文化がある" }
    ]
  },
  {
    id: 14,
    category: "ガバナンス",
    question: "新しい技術やツールの導入に対する社内の反応はどうですか？",
    options: [
      { value: 0, label: "慎重で導入までに時間がかかる" },
      { value: 3, label: "必要性が明確なら導入を検討" },
      { value: 7, label: "積極的に新技術を試す風土がある" }
    ]
  },
  {
    id: 15,
    category: "パートナーシップ",
    question: "現時点で古い業務システム・担当者のいないシステムが社内に存在していますか？",
    options: [
      { value: 0, label: "多数存在し、大きな課題となっている" },
      { value: 3, label: "いくつか存在するが、なんとか運用している" },
      { value: 5, label: "少し存在するが、計画的に更新を進めている" },
      { value: 6, label: "ほとんど存在しない・全て管理されている" }
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