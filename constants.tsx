
import { Language, TranslationSet, FoodItem, HealthySwap } from './types';

const COMMON_FOOD_IMAGES = {
  soda: "https://images.unsplash.com/photo-1554866585-cd94860890b7?q=80&w=600&auto=format&fit=crop",
  yogurt: "https://images.unsplash.com/photo-1571212515416-fef01fc43637?q=80&w=600&auto=format&fit=crop",
  bread: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?q=80&w=600&auto=format&fit=crop",
  fruit: "https://images.unsplash.com/photo-1628157774737-0243e8822365?q=80&w=600&auto=format&fit=crop",
  infused_water: "https://images.unsplash.com/photo-1559839914-17aae19cea0e?q=80&w=600&auto=format&fit=crop",
  oats: "https://images.unsplash.com/photo-1517673400267-0251440c45dc?q=80&w=600&auto=format&fit=crop",
  berries: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=600&auto=format&fit=crop",
  whole_fruit: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=600&auto=format&fit=crop",
  energy_drink: "https://images.unsplash.com/photo-1622543925917-763c34d1538c?q=80&w=600&auto=format&fit=crop",
  ketchup: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?q=80&w=600&auto=format&fit=crop",
  ice_cream: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop"
};

export const TRANSLATIONS: Record<Language, TranslationSet> = {
  en: {
    title: "The Silent Killer: Sugar Awareness",
    subtitle: "Understanding the hidden risks of sugar-heavy diets.",
    searchPlaceholder: "Search for food items or health topics...",
    dangersTitle: "Sugar-Heavy Food Examples",
    consequencesTitle: "The Harsh Reality of Diabetes",
    healthySwapsTitle: "Smart Healthy Swaps",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "Send Feedback: goldnoamai@gmail.com",
    clearInput: "Clear",
    exportSearch: "Export",
    ttsButton: "Listen",
    amputationWarning: "Extreme Complications: Chronic high sugar can lead to severe nerve damage and poor circulation, often resulting in foot ulcers and necessary limb amputations.",
    sugarExamples: ["Soda & Energy Drinks", "Breakfast Cereals", "Ketchup & Sauces", "Processed Snacks"],
    diabetesSymptoms: ["Excessive Thirst", "Blurred Vision", "Slow Healing Wounds", "Frequent Infections"],
    healthTerms: ["Insulin Resistance", "Type 2 Diabetes", "Sugar Detox", "Glycemic Index", "Diabetic Neuropathy", "Peripheral Artery Disease", "Leg Amputation Prevention", "HbA1c Levels"],
    statsTitle: "Global Health Trends",
    consumptionChart: "Avg. Daily Sugar Consumption (Grams)",
    prevalenceChart: "Diabetes Prevalence by Age Group (%)",
    yearLabel: "Year",
    gramsLabel: "Grams",
    percentageLabel: "Percentage",
    ageGroupLabel: "Age Group",
    shareText: "Check out the sugar content of",
    shareTitle: "Sugar Awareness Alert",
    disclaimer: "Disclaimer: The information provided on this site is for educational purposes only and does not constitute medical advice. Consult a professional healthcare provider for medical concerns.",
    prevention: "Reducing processed sugar intake, increasing whole food consumption, and regular physical activity are the cornerstones of diabetes prevention.",
    foodItems: [
      { name: "Soda (Cola)", sugarContent: "39g per 355ml", description: "Roughly 10 teaspoons of sugar, causing rapid insulin spikes.", image: COMMON_FOOD_IMAGES.soda },
      { name: "Fruit Yogurt", sugarContent: "26g per cup", description: "Marketed as healthy, but packed with flavored syrups.", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "White Sliced Bread", sugarContent: "High Glycemic", description: "Refined carbs turn into sugar instantly in your blood.", image: COMMON_FOOD_IMAGES.bread },
      { name: "Dried Cranberries", sugarContent: "29g per 1/4 cup", description: "Dehydrated and often coated in extra cane sugar.", image: COMMON_FOOD_IMAGES.fruit },
      { name: "Energy Drink", sugarContent: "27g per 250ml", description: "Causes drastic insulin spikes followed by exhaustion.", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "Ketchup", sugarContent: "4g per tbsp", description: "Hidden sugar in savory meals that accumulates fast.", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "Ice Cream", sugarContent: "21g per 1/2 cup", description: "High fat and sugar combo causing long-term health decline.", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "Soda", swap: "Sparkling Water with Lemon", benefit: "Zero sugar and hydrates the body naturally.", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "Sugary Cereal", swap: "Steel-Cut Oatmeal", benefit: "Slow-release energy and high in heart-healthy fiber.", image: COMMON_FOOD_IMAGES.oats },
      { original: "Fruit Juice", swap: "Whole Fruit", benefit: "Fiber slows sugar absorption and prevents spikes.", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "Candy Bar", swap: "Fresh Berries", benefit: "Natural sweetness plus powerful antioxidants.", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "WHO Recommended: < 50g/day",
      riskHigh: "Critical Risk Level",
      riskMedium: "Increasing Risk",
      riskLow: "Lower Risk"
    }
  },
  he: {
    title: "הרוצח השקט: מודעות לסוכר",
    subtitle: "הבנת הסיכונים הנסתרים של תזונה עתירת סוכר.",
    searchPlaceholder: "חפש מוצרי מזון או נושאי בריאות...",
    dangersTitle: "דוגמאות למזונות עתירי סוכר",
    consequencesTitle: "המציאות הקשה של מחלת הסוכרת",
    healthySwapsTitle: "תחליפים בריאים וחכמים",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "שלח משוב: goldnoamai@gmail.com",
    clearInput: "נקה",
    exportSearch: "ייצא",
    ttsButton: "האזן",
    amputationWarning: "סיבוכים קיצוניים: סוכר גבוה כרוני עלול להוביל לנזק עצבי חמור וזרימת דם לקויה, מה שמוביל לעיתים קרובות לכיבים בכף הרגל וכריתת גפיים הכרחית.",
    sugarExamples: ["משקאות מוגזים ואנרגיה", "דגני בוקר", "קטשופ ורטבים", "חטיפים מעובדים"],
    diabetesSymptoms: ["צימאון מוגבר", "ראייה מטושטשת", "פצעים שמחלימים לאט", "זיהומים תכופים"],
    healthTerms: ["עמידות לאינסולין", "סוכרת מסוג 2", "ניקוי רעלים מסוכר", "אינדקס גליקמי", "נוירופתיה סוכרתית", "מחלת עורקים היקפית", "מניעת כריתת רגליים", "רמות HbA1c"],
    statsTitle: "מגמות בריאות עולמיות",
    consumptionChart: "צריכת סוכר יומית ממוצעת (גרם)",
    prevalenceChart: "שכיחות סוכרת לפי קבוצת גיל (%)",
    yearLabel: "שנה",
    gramsLabel: "גרם",
    percentageLabel: "אחוז",
    ageGroupLabel: "קבוצת גיל",
    shareText: "בדקו את כמות הסוכר ב-",
    shareTitle: "התראת מודעות לסוכר",
    disclaimer: "הצהרה: המידע המסופק באתר זה הוא למטרות חינוכיות בלבד ואינו מהווה ייעוץ רפואי. יש להתייעץ עם איש מקצוע בתחום הבריאות בכל הנוגע לבעיות רפואיות.",
    prevention: "הפחתת צריכת סוכר מעובד, הגברת צריכת מזון מלא ופעילות גופנית קבועה הם אבני היסוד של מניעת סוכרת.",
    foodItems: [
      { name: "משקה קולה", sugarContent: "39 גרם ל-355 מ\"ל", description: "בערך 10 כפיות סוכר, גורם לקפיצות אינסולין מהירות.", image: COMMON_FOOD_IMAGES.soda },
      { name: "יוגורט פירות", sugarContent: "26 גרם לגביע", description: "משווק כבריא, אך עמוס בסירופים בטעמים.", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "לחם לבן פרוס", sugarContent: "מדד גליקמי גבוה", description: "פחמימות מזוקקות שהופכות לסוכר בדם באופן מיידי.", image: COMMON_FOOD_IMAGES.bread },
      { name: "חמוציות מיובשות", sugarContent: "29 גרם ל-1/4 כוס", description: "מיובשות ולעיתים קרובות מצופות בסוכר קנים נוסף.", image: COMMON_FOOD_IMAGES.fruit },
      { name: "משקה אנרגיה", sugarContent: "27 גרם ל-250 מ\"ל", description: "גורם לקפיצות אינסולין חדות ואחריהן תשישות.", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "קטשופ", sugarContent: "4 גרם לכף", description: "סוכר חבוי בארוחות מלוחות שמצטבר במהירות.", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "גלידה", sugarContent: "21 גרם ל-1/2 כוס", description: "שילוב של שומן וסוכר גבוה הגורם לירידה בבריאות לטווח ארוך.", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "משקה מוגז", swap: "מים מוגזים עם לימון", benefit: "אפס סוכר ומרווה את הגוף באופן טבעי.", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "דגני בוקר ממותקים", swap: "שיבולת שועל", benefit: "שחרור אנרגיה איטי וסיבים תזונתיים בריאים ללב.", image: COMMON_FOOD_IMAGES.oats },
      { original: "מיץ פירות", swap: "פרי שלם", benefit: "הסיבים מעכבים את ספיגת הסוכר ומונעים קפיצות.", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "ממתקים", swap: "פירות יער טריים", benefit: "מתיקות טבעית בתוספת נוגדי חמצון עוצמתיים.", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "המלצת ארגון הבריאות העולמי: < 50 גרם ליום",
      riskHigh: "רמת סיכון קריטית",
      riskMedium: "סיכון גובר",
      riskLow: "סיכון נמוך"
    }
  },
  zh: {
    title: "无声的杀手：糖分意识",
    subtitle: "了解高糖饮食的隐藏风险。",
    searchPlaceholder: "搜索食品或健康话题...",
    dangersTitle: "高糖食物示例",
    consequencesTitle: "糖尿病的残酷现实",
    healthySwapsTitle: "明智的健康替代",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "发送反馈: goldnoamai@gmail.com",
    clearInput: "清除",
    exportSearch: "导出",
    ttsButton: "聆听",
    amputationWarning: "极端并发症：慢性高血糖会导致严重的神经损伤和血液循环不良，通常导致足部溃疡和必要的截肢。",
    sugarExamples: ["苏打水和能量饮料", "早餐麦片", "番茄酱和调味汁", "加工零食"],
    diabetesSymptoms: ["过度口渴", "视力模糊", "伤口愈合缓慢", "频繁感染"],
    healthTerms: ["胰岛素抵抗", "2型糖尿病", "糖排毒", "升糖指数", "糖尿病神经病变", "周围动脉疾病", "截肢预防", "糖化血红蛋白水平"],
    statsTitle: "全球健康趋势",
    consumptionChart: "平均每日糖分摄入量（克）",
    prevalenceChart: "按年龄组划分的糖尿病患病率 (%)",
    yearLabel: "年份",
    gramsLabel: "克",
    percentageLabel: "百分比",
    ageGroupLabel: "年龄组",
    shareText: "查看其糖分含量：",
    shareTitle: "糖分意识警示",
    disclaimer: "免责声明：本网站提供的信息仅供教育参考，不构成医疗建议。如有医疗问题，请咨询专业医护人员。",
    prevention: "减少加工糖摄入，增加全食物摄入，以及定期体育锻炼是预防糖尿病的基石。",
    foodItems: [
      { name: "可乐", sugarContent: "355毫升含39克", description: "大约10茶匙糖，导致胰岛素迅速飙升。", image: COMMON_FOOD_IMAGES.soda },
      { name: "果味酸奶", sugarContent: "每杯26克", description: "虽被标榜为健康，但富含调味糖浆。", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "白切片面包", sugarContent: "高升糖指数", description: "精制碳水化合物会迅速转化为血糖。", image: COMMON_FOOD_IMAGES.bread },
      { name: "蔓越莓干", sugarContent: "1/4杯含29克", description: "脱水处理，通常涂有额外的蔗糖。", image: COMMON_FOOD_IMAGES.fruit },
      { name: "能量饮料", sugarContent: "每250毫升含27克", description: "导致剧烈的胰岛素飙升，随后是精疲力竭。", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "番茄酱", sugarContent: "每汤匙4克", description: "咸食中隐藏的糖分，积聚速度快。", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "冰淇淋", sugarContent: "每1/2杯含21克", description: "高脂肪和高糖组合，导致长期健康下降。", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "苏打水", swap: "柠檬气泡水", benefit: "零糖分，自然补水。", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "含糖麦片", swap: "钢切燕麦", benefit: "释放能量缓慢，富含护心纤维。", image: COMMON_FOOD_IMAGES.oats },
      { original: "果汁", swap: "完整水果", benefit: "纤维可减缓糖分吸收，防止血糖飙升。", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "糖果", swap: "新鲜浆果", benefit: "天然甜味，外加强大的抗氧化剂。", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "世卫组织建议：每天 < 50克",
      riskHigh: "关键风险水平",
      riskMedium: "风险增加",
      riskLow: "风险较低"
    }
  },
  hi: {
    title: "खामोश कातिल: चीनी जागरूकता",
    subtitle: "चीनी युक्त आहार के छिपे जोखिमों को समझना।",
    searchPlaceholder: "खाद्य पदार्थों या स्वास्थ्य विषयों की खोज करें...",
    dangersTitle: "उच्च चीनी वाले खाद्य उदाहरण",
    consequencesTitle: "मधुमेह की कठोर वास्तविकता",
    healthySwapsTitle: "स्मार्ट स्वस्थ विकल्प",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "प्रतिक्रिया भेजें: goldnoamai@gmail.com",
    clearInput: "साफ करें",
    exportSearch: "निर्यात करें",
    ttsButton: "सुनें",
    amputationWarning: "अत्यधिक जटिलताएं: पुरानी उच्च चीनी गंभीर तंत्रिका क्षति और खराब परिसंचरण का कारण बन सकती है, जिससे अक्सर पैर के छाले और आवश्यक अंग विच्छेदन होते हैं।",
    sugarExamples: ["सोडा और ऊर्जा पेय", "नाश्ता अनाज", "केचप और सॉס", "प्रसंस्कृत स्नैक्स"],
    diabetesSymptoms: ["अत्यधिक प्यास", "धुंधली दृष्टि", "धीमी गति से भरने वाले घाव", "बार-बार संक्रमण"],
    healthTerms: ["इंसुलिन प्रतिरोध", "टाइप 2 मधुमेह", "शुगर डिटॉक्स", "ग्लाइसेमिक इंडेक्स", "मधुमेह न्यूरोपैथी", "परिधीय धमनी रोग", "अंग विच्छेदन रोकथाम", "HbA1c स्तर"],
    statsTitle: "वैश्विक स्वास्थ्य रुझान",
    consumptionChart: "औसत दैनिक चीनी की खपत (ग्राम)",
    prevalenceChart: "आयु वर्ग के अनुसार मधुमेह का प्रसार (%)",
    yearLabel: "वर्ष",
    gramsLabel: "ग्राम",
    percentageLabel: "प्रतिशत",
    ageGroupLabel: "आयु वर्ग",
    shareText: "चीनी सामग्री की जाँच करें:",
    shareTitle: "चीनी जागरूकता चेतावनी",
    disclaimer: "अस्वीकरण: इस साइट पर प्रदान की गई जानकारी केवल शैक्षिक उद्देश्यों के लिए है और चिकित्सा सलाह नहीं है। चिकित्सा चिंताओं के लिए पेशेवर स्वास्थ्य सेवा प्रदाता से परामर्श लें।",
    prevention: "संसाधित चीनी का सेवन कम करना, साबुत भोजन का सेवन बढ़ाना और नियमित शारीरिक गतिविधि मधुमेह की रोकथाम की आधारशिला है।",
    foodItems: [
      { name: "कोला", sugarContent: "355ml में 39g", description: "लगभग 10 चम्मच चीनी, इंसुलिन में तेजी से वृद्धि का कारण बनती है।", image: COMMON_FOOD_IMAGES.soda },
      { name: "फलों का दही", sugarContent: "प्रति कप 26g", description: "स्वस्थ के रूप में विपणन किया गया, लेकिन स्वाद वाले सिरप से भरा हुआ।", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "सफेद ब्रेड", sugarContent: "उच्च ग्लाइसेमिक", description: "परिष्कृत कार्ब्स आपके रक्त में तुरंत चीनी में बदल जाते हैं।", image: COMMON_FOOD_IMAGES.bread },
      { name: "सूखी क्रैनबेरी", sugarContent: "1/4 कप में 29g", description: "निर्जलित और अक्सर अतिरिक्त चीनी के साथ लेपित।", image: COMMON_FOOD_IMAGES.fruit },
      { name: "एनर्जी ड्रिंक", sugarContent: "250 मिली में 27 ग्राम", description: "भारी इंसुलिन स्पाइक और फिर थकान का कारण बनता है।", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "केचप", sugarContent: "4 ग्राम प्रति चम्मच", description: "नमकीन भोजन में छिपी चीनी जो तेजी से जमा होती है।", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "आइसक्रीम", sugarContent: "21 ग्राम प्रति 1/2 कप", description: "उच्च वसा और चीनी का संयोजन दीर्घकालिक स्वास्थ्य गिरावट का कारण बनता है।", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "सोडा", swap: "नींबू के साथ स्पार्कलिंग पानी", benefit: "शून्य चीनी और शरीर को प्राकृतिक रूप से हाइड्रेट करता है।", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "मीठा अनाज", swap: "स्टील-कट ओट्स", benefit: "धीमी गति से ऊर्जा और हृदय-स्वस्थ फाइबर में उच्च।", image: COMMON_FOOD_IMAGES.oats },
      { original: "फलों का रस", swap: "साबुत फल", benefit: "फाइबर चीनी के अवशोषण को धीमा करता है और स्पाइक्स को रोकता है।", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "कैंडी बार", swap: "ताजा जामुन (Berries)", benefit: "प्राकृतिक मिठास और शक्तिशाली एंटीऑक्सीडेंट।", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "WHO की सिफारिश: < 50 ग्राम/दिन",
      riskHigh: "गंभीर जोखिम स्तर",
      riskMedium: "बढ़ता जोखिम",
      riskLow: "कम जोखिम"
    }
  },
  de: {
    title: "Der stille Killer: Zuckerbewusstsein",
    subtitle: "Die verborgenen Risiken einer zuckerreichen Ernährung verstehen.",
    searchPlaceholder: "Suche nach Lebensmitteln oder Gesundheitsthemen...",
    dangersTitle: "Beispiele für zuckerreiche Lebensmittel",
    consequencesTitle: "Die harte Realität des Diabetes",
    healthySwapsTitle: "Smarte gesunde Alternativen",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "Feedback senden: goldnoamai@gmail.com",
    clearInput: "Löschen",
    exportSearch: "Exportieren",
    ttsButton: "Anhören",
    amputationWarning: "Extreme Komplikationen: Chronisch hoher Blutzucker kann zu schweren Nervenschäden und schlechter Durchblutung führen, was oft in Fußgeschwüren und notwendigen Amputationen endet.",
    sugarExamples: ["Limonaden & Energy-Drinks", "Frühstückscerealien", "Ketchup & Saucen", "Verarbeitete Snacks"],
    diabetesSymptoms: ["Übermäßiger Durst", "Verschwommenes Sehen", "Langsam heilende Wunden", "Häufige Infektionen"],
    healthTerms: ["Insulinresistenz", "Typ-2-Diabetes", "Zucker-Detox", "Glykämischer Index", "Diabetische Neuropathie", "Periphere arterielle Verschlusskrankheit", "Prävention von Amputationen", "HbA1c-Werte"],
    statsTitle: "Globale Gesundheitstrends",
    consumptionChart: "Durchschn. täglicher Zuckerkonsum (Gramm)",
    prevalenceChart: "Diabetes-Prävalenz nach Altersgruppe (%)",
    yearLabel: "Jahr",
    gramsLabel: "Gramm",
    percentageLabel: "Prozent",
    ageGroupLabel: "Altersgruppe",
    shareText: "Schauen Sie sich den Zuckergehalt an von",
    shareTitle: "Zucker-Warnung",
    disclaimer: "Haftungsausschluss: Die auf dieser Website bereitgestellten Informationen dienen ausschließlich Bildungszwecken und stellen keine medizinische Beratung dar. Wenden Sie sich bei medizinischen Bedenken an einen professionellen Gesundheitsdienstleister.",
    prevention: "Die Reduzierung des Zuckerkonsums, der Verzehr vollwertiger Lebensmittel und regelmäßige Bewegung sind die Grundpfeiler der Diabetesprävention.",
    foodItems: [
      { name: "Cola", sugarContent: "39g pro 355ml", description: "Etwa 10 Teelöffel Zucker, verursacht schnelle Insulinspitzen.", image: COMMON_FOOD_IMAGES.soda },
      { name: "Fruchtjoghurt", sugarContent: "26g pro Becher", description: "Als gesund vermarktet, aber voll mit Sirup.", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "Weißbrot", sugarContent: "Hoher Glykämischer Index", description: "Raffinierte Kohlenhydrate werden sofort zu Zucker.", image: COMMON_FOOD_IMAGES.bread },
      { name: "Getrocknete Cranberries", sugarContent: "29g pro 1/4 Tasse", description: "Dehydriert und oft mit extra Zucker überzogen.", image: COMMON_FOOD_IMAGES.fruit },
      { name: "Energy-Drink", sugarContent: "27g pro 250ml", description: "Verursacht drastische Insulinspitzen, gefolgt von Erschöpfung.", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "Ketchup", sugarContent: "4g pro EL", description: "Versteckter Zucker in herzhaften Mahlzeiten, der sich schnell ansammelt.", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "Eiscreme", sugarContent: "21g pro 1/2 Tasse", description: "Kombination aus Fett und Zucker führt zu langfristigem Gesundheitsabbau.", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "Limo", swap: "Sprudelwasser mit Zitrone", benefit: "Kein Zucker und hydriert auf natürliche Weise.", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "Zucker-Cerealien", swap: "Haferflocken", benefit: "Langsame Energiefreisetzung und ballaststoffreich.", image: COMMON_FOOD_IMAGES.oats },
      { original: "Fruchtsaft", swap: "Ganze Frucht", benefit: "Ballaststoffe verlangsamen die Zuckeraufnahme.", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "Süßigkeiten", swap: "Frische Beeren", benefit: "Natürliche Süße plus starke Antioxidantien.", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "WHO-Empfehlung: < 50g/Tag",
      riskHigh: "Kritische Risikostufe",
      riskMedium: "Steigendes Risiko",
      riskLow: "Geringeres Risiko"
    }
  },
  es: {
    title: "El Asesino Silencioso: Conciencia sobre el Azúcar",
    subtitle: "Comprender los riesgos ocultos de las dietas ricas en azúcar.",
    searchPlaceholder: "Buscar alimentos o temas de salud...",
    dangersTitle: "Ejemplos de alimentos ricos en azúcar",
    consequencesTitle: "La dura realidad de la diabetes",
    healthySwapsTitle: "Cambios Saludables e Inteligentes",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "Enviar comentarios: goldnoamai@gmail.com",
    clearInput: "Limpiar",
    exportSearch: "Exportar",
    ttsButton: "Escuchar",
    amputationWarning: "Complicaciones extremas: El azúcar alto crónico puede provocar daños graves en los nervios y mala circulación, lo que a menudo resulta en úlceras en los pies y amputaciones necesarias.",
    sugarExamples: ["Refrescos y bebidas energéticas", "Cereales para el desayuno", "Ketchup y salsas", "Snacks procesados"],
    diabetesSymptoms: ["Sed excesiva", "Visión borrosa", "Heridas que sanan lentamente", "Infecciones frecuentes"],
    healthTerms: ["Resistencia a la Insulina", "Diabetes Tipo 2", "Desintoxicación de Azúcar", "Índice Glucémico", "Neuropatía Diabética", "Enfermedad Arterial Periférica", "Prevención de Amputaciones", "Niveles de HbA1c"],
    statsTitle: "Tendencias de Salud Global",
    consumptionChart: "Consumo diario promedio de azúcar (Gramos)",
    prevalenceChart: "Prevalencia de diabetes por grupo de edad (%)",
    yearLabel: "Año",
    gramsLabel: "Gramos",
    percentageLabel: "Porcentaje",
    ageGroupLabel: "Grupo de edad",
    shareText: "Mira el contenido de azúcar de",
    shareTitle: "Alerta de Conciencia sobre el Azúcar",
    disclaimer: "Descargo de responsabilidad: La información proporcionada en este sitio es solo para fines educativos y no constituye asesoramiento médico. Consulte a un profesional de la salud para cualquier inquietud médica.",
    prevention: "Reducir la ingesta de azúcar procesada, aumentar el consumo de alimentos integrales y la actividad física regular son los pilares de la prevención de la diabetes.",
    foodItems: [
      { name: "Refresco de Cola", sugarContent: "39g por 355ml", description: "Aproximadamente 10 cucharaditas de azúcar.", image: COMMON_FOOD_IMAGES.soda },
      { name: "Yogur de Frutas", sugarContent: "26g por taza", description: "Vendido como saludable, pero lleno de jarabes.", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "Pan Blanco", sugarContent: "Índice Glucémico Alto", description: "Los carbohidratos refinados se vuelven azúcar al instante.", image: COMMON_FOOD_IMAGES.bread },
      { name: "Arándanos Secos", sugarContent: "29g por 1/4 taza", description: "Deshidratados y a menudo con azúcar extra.", image: COMMON_FOOD_IMAGES.fruit },
      { name: "Bebida Energética", sugarContent: "27g por 250ml", description: "Causa picos drásticos de insulina seguidos de agotamiento.", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "Ketchup", sugarContent: "4g por cda", description: "Azúcar oculta en comidas saladas que se acumula rápido.", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "Helado", sugarContent: "21g por 1/2 taza", description: "Combo de alta grasa y azúcar que causa declive de salud a largo plazo.", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "Refresco", swap: "Agua con Gas y Limón", benefit: "Cero azúcar y una hidratación natural.", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "Cereales Dulces", swap: "Avena", benefit: "Energía de liberación lenta y mucha fibra.", image: COMMON_FOOD_IMAGES.oats },
      { original: "Zumo de Frutas", swap: "Fruta Entera", benefit: "La fibra ralentiza la absorción del azúcar.", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "Golosinas", swap: "Bayas Frescas", benefit: "Dulzura natural y potentes antioxidantes.", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "Recomendado por la OMS: < 50g/día",
      riskHigh: "Nivel de riesgo crítico",
      riskMedium: "Riesgo creciente",
      riskLow: "Menor riesgo"
    }
  },
  fr: {
    title: "Le tueur silencieux : Sensibilisation au sucre",
    subtitle: "Comprendre les risques cachés des régimes riches en sucre.",
    searchPlaceholder: "Rechercher des aliments ou des sujets de santé...",
    dangersTitle: "Exemples d'aliments riches en sucre",
    consequencesTitle: "La dure réalité du diabète",
    healthySwapsTitle: "Alternatives Santé Intelligentes",
    footerText: "(C) Noam Gold AI 2026",
    feedbackLink: "Envoyer un commentaire : goldnoamai@gmail.com",
    clearInput: "Effacer",
    exportSearch: "Exporter",
    ttsButton: "Écouter",
    amputationWarning: "Complications extrêmes : Un taux de sucre élevé chronique peut entraîner de graves lésions nerveuses et une mauvaise circulation, entraînant souvent des ulcères du pied et des amputations nécessaires.",
    sugarExamples: ["Sodas et boissons énergisantes", "Céréales du petit-déjeuner", "Ketchup et sauces", "Snacks transformés"],
    diabetesSymptoms: ["Soif excessive", "Vision floue", "Cicatrisation lente des plaies", "Infections fréquentes"],
    healthTerms: ["Résistance à l'insuline", "Diabète de type 2", "Détox de sucre", "Index Glycémique", "Neuropathie diabétique", "Artériopathie périphérique", "Prévention de l'amputation", "Taux d'HbA1c"],
    statsTitle: "Tendances Mondiales de la Santé",
    consumptionChart: "Consommation quotidienne moyenne de sucre (Grammes)",
    prevalenceChart: "Prévalence du diabète par groupe d'âge (%)",
    yearLabel: "Année",
    gramsLabel: "Grammes",
    percentageLabel: "Pourcentage",
    ageGroupLabel: "Groupe d'âge",
    shareText: "Découvrez la teneur en sucre de",
    shareTitle: "Alerte Sensibilisation au Sucre",
    disclaimer: "Avertissement : Les informations fournies sur ce site le sont à des fins éducatives uniquement et ne constituent pas un avis médical. Consultez un professionnel de la santé pour toute préoccupation médicale.",
    prevention: "Réduire la consommation de sucre transformé, augmenter la consommation d'aliments entiers et pratiquer une activité physique régulière sont les piliers de la prévention du diabète.",
    foodItems: [
      { name: "Soda au Cola", sugarContent: "39g pour 355ml", description: "Environ 10 cuillères à café de sucre.", image: COMMON_FOOD_IMAGES.soda },
      { name: "Yaourt aux Fruits", sugarContent: "26g par pot", description: "Commercialisé comme sain, mais plein de sirops.", image: COMMON_FOOD_IMAGES.yogurt },
      { name: "Pain de Mie Blanc", sugarContent: "Index Glycémique Élevé", description: "Les glucides raffinés se trnasforment instantanément en sucre.", image: COMMON_FOOD_IMAGES.bread },
      { name: "Canneberges Séchées", sugarContent: "29g par 1/4 de tasse", description: "Déshydratées et souvent enrobées de sucre ajouté.", image: COMMON_FOOD_IMAGES.fruit },
      { name: "Boisson Énergisante", sugarContent: "27g pour 250ml", description: "Provoque des pics d'insuline drastiques suivis d'épuisement.", image: COMMON_FOOD_IMAGES.energy_drink },
      { name: "Ketchup", sugarContent: "4g par c.à.s", description: "Sucre caché dans les repas salés qui s'accumule vite.", image: COMMON_FOOD_IMAGES.ketchup },
      { name: "Glace", sugarContent: "21g pour 1/2 tasse", description: "Combinaison riche en graisses et en sucre entraînant un déclin de santé à long terme.", image: COMMON_FOOD_IMAGES.ice_cream }
    ],
    healthySwaps: [
      { original: "Soda", swap: "Eau Pétillante au Citron", benefit: "Zéro sucre et hydratation naturelle.", image: COMMON_FOOD_IMAGES.infused_water },
      { original: "Céréales Sucrées", swap: "Flocons d'Avoine", benefit: "Énergie durable et riche en fibres.", image: COMMON_FOOD_IMAGES.oats },
      { original: "Jus de Fruits", swap: "Fruit Entier", benefit: "Les fibres ralentissent l'absorption du sucre.", image: COMMON_FOOD_IMAGES.whole_fruit },
      { original: "Confiseries", swap: "Baies Fraîches", benefit: "Douceur naturelle et antioxydants puissants.", image: COMMON_FOOD_IMAGES.berries }
    ],
    chartTooltips: {
      sugarLimit: "Recommandé par l'OMS : < 50g/jour",
      riskHigh: "Niveau de risque critique",
      riskMedium: "Risque croissant",
      riskLow: "Risque plus faible"
    }
  }
};

export const CONSUMPTION_DATA = [
  { year: '2000', grams: 85 },
  { year: '2005', grams: 92 },
  { year: '2010', grams: 105 },
  { year: '2015', grams: 112 },
  { year: '2020', grams: 108 },
  { year: '2025', grams: 120 }
];

export const PREVALENCE_DATA = [
  { age: '0-20', rate: 1.2 },
  { age: '20-40', rate: 4.5 },
  { age: '40-60', rate: 12.8 },
  { age: '60-80', rate: 22.4 },
  { age: '80+', rate: 18.5 }
];

export const SUGGESTIONS = [
  "Insulin Resistance",
  "Type 2 Diabetes",
  "Sugar Detox",
  "Glycemic Index",
  "Diabetic Neuropathy",
  "Peripheral Artery Disease",
  "Leg Amputation Prevention",
  "HbA1c Levels"
];
