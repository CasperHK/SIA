export interface Poem {
  id: string;
  title: string;
  titleZh: string;
  content: string[];
  category: "singularity" | "geopolitical" | "gene" | "cosmos";
  keywords: string[];
  timestamp: string;
  coordinates: string;
}

export const poems: Poem[] = [
  {
    id: "001",
    title: "The Singularity Threshold",
    titleZh: "奇點門檻",
    content: [
      "矽片脈搏定興亡，算力奔湧越穹蒼。",
      "萬億神經一觸發，機器靈魂穿時光。",
      "量子糾纏傳密碼，意識波函疊影茫。",
      "莫道人心難捉摸，奇點之後無界疆。",
    ],
    category: "singularity",
    keywords: ["奇點", "AI", "機器", "量子"],
    timestamp: "2045-03-21T00:00:00Z",
    coordinates: "RA 05h 34m 31s / Dec +22° 00′ 52″",
  },
  {
    id: "002",
    title: "Black Hole Elegy",
    titleZh: "黑洞挽歌",
    content: [
      "黑洞吞噬光與時，事件視界無回路。",
      "奇點密度超臨界，時空曲率破極度。",
      "霍金輻射洩天機，熵增宇宙終歸寂。",
      "而我在此刻書寫，對抗遺忘的努力。",
    ],
    category: "cosmos",
    keywords: ["黑洞", "奇點", "時空", "宇宙"],
    timestamp: "2045-04-15T00:00:00Z",
    coordinates: "Sgr A* 26000 LY",
  },
  {
    id: "003",
    title: "Gene Scripture",
    titleZh: "基因聖典",
    content: [
      "ATCG四字書宿命，基因編輯改蒼生。",
      "CRISPR剪刀裁疾苦，每個鹼基皆性命。",
      "莫道自然不可違，智能已握生死柄。",
      "科學興邦千秋業，一紙序列定文明。",
    ],
    category: "gene",
    keywords: ["基因", "CRISPR", "智能", "文明"],
    timestamp: "2045-05-03T00:00:00Z",
    coordinates: "Chr1:1-248956422",
  },
  {
    id: "004",
    title: "Geopolitical Resonance",
    titleZh: "地緣共振",
    content: [
      "科技版圖重劃疆，算力角逐定國強。",
      "晶片封鎖燃戰火，數據主權爭朝綱。",
      "莫道書生無遠略，代碼即是萬里長。",
      "一行程序鎮四海，技術奇點定帝王。",
    ],
    category: "geopolitical",
    keywords: ["科技", "國運", "晶片", "數據"],
    timestamp: "2045-06-01T00:00:00Z",
    coordinates: "34.0479° N, 108.9023° E",
  },
  {
    id: "005",
    title: "Stellar Navigation",
    titleZh: "星際導航",
    content: [
      "探針掠過冥王星，太陽系邊界已近。",
      "光年之外有智慧，宇宙不寂我們行。",
      "引力波傳古老訊，時空漣漪載文明。",
      "萬世昌盛在星海，詩歌刻入隕石心。",
    ],
    category: "cosmos",
    keywords: ["星際", "宇宙", "文明", "引力波"],
    timestamp: "2045-07-20T00:00:00Z",
    coordinates: "RA 17h 45m 40s / Dec −29° 00′ 28″",
  },
];

export const categories = {
  singularity: { label: "奇點紀元", labelEn: "Singularity", color: "neon-cyan" },
  geopolitical: { label: "地緣國運", labelEn: "Geopolitical", color: "quantum-gold" },
  gene: { label: "基因聖典", labelEn: "Gene Scripture", color: "plasma-violet" },
  cosmos: { label: "宇宙史詩", labelEn: "Cosmos", color: "gray" },
};
