import { DiagnosticReport, SupportedLanguage, SkillProofChallenge, MentorMessage } from '../types';

export function runSimulationDiagnosis(
  problemTitle: string,
  businessType: string,
  description: string,
  metrics: {
    monthlyTurnover: number;
    supplierCreditDays: number;
    deadStockPercentage: number;
    workingCapitalGap: number;
  },
  language: SupportedLanguage
): DiagnosticReport {
  const deadStockAmount = Math.round((metrics.monthlyTurnover * (metrics.deadStockPercentage / 100)) * 1.5);
  const targetRecovery = Math.round(metrics.workingCapitalGap * 0.72);
  const turnoverFormatted = `₹${(metrics.monthlyTurnover / 100000).toFixed(1)} Lakhs`;
  const recoveryFormatted = `₹${(targetRecovery / 1000).toFixed(0)},000`;

  if (language === 'te') {
    return {
      engineUsed: 'Interactive Smart Simulation Engine (Offline Intelligent Mode)',
      generatedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      executiveSummary: `మీ సంస్థ (${businessType || 'జనరల్ స్టోర్'}) కు సంబంధించి సమగ్ర ఆర్థిక & కార్యకలాపాల సమీక్ష పూర్తయింది. ప్రధాన సమస్య: వర్కింగ్ క్యాపిటల్ లోటు ₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 మరియు నిలిచిపోయిన స్టాక్ ${metrics.deadStockPercentage}%. తక్షణ ఇన్వెంటరీ పునర్వ్యవస్థీకరణ ద్వారా సుమారు ${recoveryFormatted} నగదు ప్రవాహాన్ని తిరిగి పొందవచ్చు.`,
      rootCauseAnalysis: [
        `సప్లయర్ క్రెడిట్ గడువు (${metrics.supplierCreditDays} రోజులు) తక్కువగా ఉండటం వల్ల కస్టమర్ల నుండి బకాయిలు వచ్చేలోపే చెల్లింపుల ఒత్తిడి పెరుగుతోంది.`,
        `సుమారు ₹${(deadStockAmount / 1000).toFixed(0)},000 విలువైన మందకొడి ఇన్వెంటరీ నిల్వలు షెల్ఫ్‌లలో స్థానాన్ని మరియు మూలధనాన్ని ఆక్రమించాయి.`,
        `వేగంగా అమ్ముడయ్యే ఎఫ్‌ఎంసిజి వస్తువులపై డిస్ట్రిబ్యూటర్లతో ఉమ్మడి బేరసారాల కొరత వల్ల గ్రాస్ మార్జిన్ 4% నుండి 7% వరకు తగ్గుతోంది.`,
      ],
      financialImpact: {
        cashFlowImpact: `నెలకు ₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 లిక్విడిటీ కొరత`,
        projectedRecovery: `60 రోజుల్లో ${recoveryFormatted} నగదు పునరుద్ధరణ (72% రికవరీ)`,
        roiTimeline: '35 - 45 రోజులు',
      },
      actionPlan: [
        {
          phase: 'తక్షణ చర్యలు (రోజులు 1-7)',
          title: 'ఇన్వెంటరీ ఫాస్ట్ లిక్విడేషన్ & బండిల్ ఆఫర్లు',
          steps: [
            'నిలిచిపోయిన స్టాక్‌ను గుర్తించి, వేగంగా అమ్ముడయ్యే నిత్యావసరాలతో 10% రాయితీతో కాంబో ప్యాక్‌లుగా కట్టండి.',
            'ప్రధాన డిస్ట్రిబ్యూటర్లతో మాట్లాడి చెల్లింపుల గడువును 14 రోజుల నుండి 30 రోజులకు పొడిగించేందుకు రాతపూర్వక ప్రతిపాదన పంపండి.',
          ],
          expectedOutcome: 'మొదటి వారంలోనే ₹45,000 తక్షణ లిక్విడిటీ విడుదల.',
        },
        {
          phase: 'మధ్యంతర కార్యాచరణ (రోజులు 8-30)',
          title: 'డిజిటల్ లెడ్జర్ క్రమబద్ధీకరణ & ఉమ్మడి కొనుగోళ్లు',
          steps: [
            'కస్టమర్ల పాత బకాయిలకు స్వయంచాలిత యుపిఐ పేమెంట్ లింక్ రిమైండర్లను గౌరవప్రదమైన సందేశాలతో పంపండి.',
            'సమీపంలోని 5 ఇతర వ్యాపార మిత్రులతో కలిసి ఎఫ్‌ఎంసిజి సరుకులను టోకుగా ఆర్డర్ చేసి 5% అదనపు డిస్కౌంట్ పొందండి.',
          ],
          expectedOutcome: 'కస్టమర్ బకాయిల రికవరీ 65% వేగవంతం అవడం, కొనుగోలు ఖర్చులు తగ్గడం.',
        },
        {
          phase: 'దీర్ఘకాలిక స్థిరీకరణ (రోజులు 31-90)',
          title: 'ఆధునిక రిటైల్ నిర్వహణ & ఆడిట్ క్రమశిక్షణ',
          steps: [
            'వారపు స్టాక్ టర్నోవర్ నివేదికను సమీక్షించి, 40 రోజులకు మించి అమ్ముడుకాని వస్తువుల ఆర్డర్లను రద్దు చేయండి.',
            'బ్యాంకు వర్కింగ్ క్యాపిటల్ ముద్ర లేదా ఎంఎస్ఎంఈ క్రెడిట్ లైన్ కోసం స్పష్టమైన లెడ్జర్ రికార్డులను సమర్పించండి.',
          ],
          expectedOutcome: 'సంస్థాగత రుణ అర్హత మరియు స్థిరమైన 22% స్థూల లాభదాయకత.',
        },
      ],
      negotiationScript: `నమస్కారం సార్, మేము మీతో గత 4 సంవత్సరాలుగా నమ్మకంగా వ్యాపారం చేస్తున్నాము. ప్రస్తుతం మా స్టోర్ టర్నోవర్ నెలకు ${turnoverFormatted} కు చేరుకుంది. మా వర్కింగ్ క్యాపిటల్ రొటేషన్ మరియు ఆర్డర్ పరిమాణాన్ని రెట్టింపు చేసేందుకు, మా క్రెడిట్ గడువును 15 రోజుల నుండి 35 రోజులకు పెంచాలని కోరుతున్నాము. దీనివల్ల మా ఆర్డర్ సైజు పెరిగి మీకూ మాకూ పరస్పర లాభం చేకూరుతుంది.`,
      audioSummaryText: `మీ రిటైల్ స్టోర్ వ్యాపార ప్రణాళిక సిద్ధంగా ఉంది. స్తంభించిన ఇన్వెంటరీ నుండి ${recoveryFormatted} నగదును విడుదల చేయడానికి మరియు సప్లయర్ క్రెడిట్ గడువును 35 రోజులకు పెంచడానికి సూచనలు ఇవ్వబడ్డాయి. ఈ పద్ధతి ద్వారా 45 రోజుల్లో వర్కింగ్ క్యాపిటల్ సమస్య పరిష్కారమవుతుంది.`,
    };
  }

  if (language === 'hi') {
    return {
      engineUsed: 'Interactive Smart Simulation Engine (Offline Intelligent Mode)',
      generatedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
      executiveSummary: `आपके संस्थान (${businessType || 'जनरल स्टोर'}) के लिए एक विस्तृत रणनीतिक और वित्तीय मूल्यांकन संपन्न हुआ। मुख्य चुनौती: ₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 का कार्यशील पूंजी घाटा और ${metrics.deadStockPercentage}% धीमी इन्वेंट्री। प्रस्तावित योजना से लगभग ${recoveryFormatted} की तरलता 60 दिनों में पुनः प्राप्त होगी।`,
      rootCauseAnalysis: [
        `सप्लायर द्वारा दी जा रही अल्पकालिक क्रेडिट अवधि (${metrics.supplierCreditDays} दिन) के कारण ग्राहक भुगतान से पहले ही नकदी संकट बन जाता है।`,
        `लगभग ₹${(deadStockAmount / 1000).toFixed(0)},000 मूल्य का धीमा स्टॉक अलमारियों और कार्यशील पूंजी दोनों को अवरुद्ध किए हुए है।`,
        `बड़ी ऑनलाइन कंपनियों की मूल्य प्रतिस्पर्धा के सामने व्यक्तिगत खरीद के कारण थोक छूट से वंचित रहना।`,
      ],
      financialImpact: {
        cashFlowImpact: `प्रति माह ₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 की तरलता का दबाव`,
        projectedRecovery: `60 दिनों में ${recoveryFormatted} की नकदी वसूली (72% सुधार)`,
        roiTimeline: '40 - 50 दिन',
      },
      actionPlan: [
        {
          phase: 'तत्काल चरण (दिन 1-7)',
          title: 'इन्वेंट्री का त्वरित मुद्रीकरण और बंडल डिस्काउंट',
          steps: [
            'धीमे स्टॉक को उच्च मांग वाली रोजमर्रा की वस्तुओं के साथ मिलाकर कॉम्बो पैक बनाएं और 8-10% छूट पर निकालें।',
            'मुख्य डिस्ट्रीब्यूटर से औपचारिक चर्चा कर 15 दिन के स्थान पर 30-35 दिन की क्रेडिट सीमा का प्रस्ताव रखें।',
          ],
          expectedOutcome: 'प्रथम सप्ताह में ही ₹50,000 की तरल पूंजी की वापसी।',
        },
        {
          phase: 'मध्यम चरण (दिन 8-30)',
          title: 'डिजिटल उधारी समाधान और संयुक्त खरीद सिंडिकेट',
          steps: [
            'ग्राहकों को बिना किसी तनाव के सम्मानजनक व्हाट्सएप/एसएमएस रिमाइंडर भेजें, जिसमें त्वरित भुगतान पर 2% कैशबैक हो।',
            'आस-पास के 5-6 प्रतिष्ठित जनरल स्टोर्स के साथ संयुक्त ऑर्डर देकर सीधे डिस्ट्रीब्यूटर से 6% अतिरिक्त मार्जिन लें।',
          ],
          expectedOutcome: 'पुरानी उधारी की 65% तक वसूली और खरीद लागत में महत्वपूर्ण कमी।',
        },
        {
          phase: 'दीर्घकालिक सुदृढ़ीकरण (दिन 31-90)',
          title: 'ऑडिट-अनुकूल बहीखाता और एमएसएमई क्रेडिट लाइन',
          steps: [
            'स्टॉक टर्नओवर का नियमित साप्ताहिक रिकॉर्ड बनाएं और 45 दिनों से अधिक धीमे सामान का ऑर्डर बंद करें।',
            'मुद्रा अथवा सरकारी बैंक योजना से कम ब्याज वाली कार्यशील पूंजी लिमिट के लिए डिजिटल रिकॉर्ड तैयार रखें।',
          ],
          expectedOutcome: '20-24% का स्थिर ग्रॉस मार्जिन और शून्य नकदी संकट।',
        },
      ],
      negotiationScript: `नमस्कार डिस्ट्रीब्यूटर जी, हम वर्षों से आपके नियमित और समयनिष्ठ भागीदार हैं। हमारा वर्तमान मासिक कारोबार ${turnoverFormatted} है। हम अपने ऑर्डर की मात्रा को 35% बढ़ाने की योजना बना रहे हैं, जिसके लिए हमें 15 दिन के बजाय 35 दिन की क्रेडिट साइकिल की आवश्यकता है। इससे हमारा संयुक्त वॉल्यूम बढ़ेगा और दोनों पक्षों को दीर्घकालिक लाभ होगा।`,
      audioSummaryText: `आपके व्यापार की रणनीतिक योजना तैयार है। धीमी इन्वेंट्री को तेजी से भुनाकर और सप्लायर क्रेडिट को 35 दिन तक बढ़ाकर आप 60 दिनों में ${recoveryFormatted} की तरलता वापस पा सकते हैं।`,
    };
  }

  // Default English
  return {
    engineUsed: 'Interactive Smart Simulation Engine (Universal Intelligent Mode)',
    generatedAt: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
    executiveSummary: `A comprehensive strategic diagnostic has been completed for your enterprise (${businessType || 'General Retail & Commercial Store'}). Primary operational bottleneck: a ₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 working capital compression exacerbated by ${metrics.deadStockPercentage}% aged inventory and restrictive ${metrics.supplierCreditDays}-day supplier settlement cycles. By executing this phased rationalization blueprint, your enterprise can liberate approximately ${recoveryFormatted} within 60 days.`,
    rootCauseAnalysis: [
      `Misaligned Cash Conversion Cycle: Operating on ${metrics.supplierCreditDays}-day payables while customer receivables cycle averages 38 days creates a chronic 24-day operational liquidity trap.`,
      `Trapped Capital in Aged SKUs: An estimated ₹${(deadStockAmount / 1000).toFixed(0)},000 in slow-moving non-perishables restricts open-to-buy budgets for high-velocity daily goods.`,
      `Fragmented Purchasing Inefficiency: Procuring goods as an isolated unit forfeits 4% to 8% in tier-1 FMCG distributor volume rebates available to regional syndicates.`,
    ],
    financialImpact: {
      cashFlowImpact: `₹${(metrics.workingCapitalGap / 1000).toFixed(0)},000 working capital compression`,
      projectedRecovery: `${recoveryFormatted} recovered within 60 days (72% efficiency)`,
      roiTimeline: '30 - 45 Days to Operational Equilibrium',
    },
    actionPlan: [
      {
        phase: 'Phase 1: Immediate Stabilization (Days 1 - 7)',
        title: 'Tactical SKU Liquidation & Supplier Credit Realignment',
        steps: [
          'Group stagnant SKUs into attractive value bundles with staple FMCG necessities at a 7-10% bundled margin clearance rate.',
          'Formally present our structured dialogue script to primary distributors to stretch credit terms from 15 to 30 days based on verifiable sales velocity.',
        ],
        expectedOutcome: 'Immediate liberation of ₹45,000 to ₹60,000 in liquid working capital.',
      },
      {
        phase: 'Phase 2: Structural Optimization (Days 8 - 30)',
        title: 'Digitized Receivables Recovery & Buying Consortium Formation',
        steps: [
          'Deploy polite, automated digital payment notifications with dynamic 2% prompt-settlement incentives to recover aged customer credit accounts.',
          'Convene 4-8 reputable neighborhood retail store owners to pool purchase orders for top-20 packaged goods, capturing wholesale tier pricing.',
        ],
        expectedOutcome: '60% acceleration of receivables collection and 5.5% gross procurement savings.',
      },
      {
        phase: 'Phase 3: Scale & Institutional Resilience (Days 31 - 90)',
        title: 'Formalized Inventory Audits & MSME Banking Facility',
        steps: [
          'Establish a strict 30-day inventory velocity benchmark; immediately discontinue low-margin SKUs that turn slower than 6 weeks.',
          'Leverage digitized transaction ledgers to secure formal bank working capital credit (Mudra / CGTMSE) at competitive interest rates.',
        ],
        expectedOutcome: 'Sustainable 22% gross operating margin and absolute insulation against predatory quick-commerce pricing.',
      },
    ],
    negotiationScript: `"Good morning Mr. Distributor. Over the past 3 years, our store has achieved consistent volume growth, now handling ${turnoverFormatted} in monthly retail turnover with an impeccable settlement track record. To sustainably scale our procurement volume by 30% for the upcoming festive cycle, we require our payment cycle adjusted from 15 to 35 days. This allows us to double our order frequency with your firm and eliminates inventory stockouts for both of our enterprises."`,
    audioSummaryText: `Executive strategic diagnosis complete. By realigning supplier credit terms to 35 days and liquidating aged stock through high-velocity bundle merchandising, your enterprise will recover approximately ${recoveryFormatted} in working capital within 45 days.`,
  };
}

export const PRECONFIGURED_CHALLENGES: SkillProofChallenge[] = [
  {
    id: 'challenge-festive-procurement',
    title: {
      en: 'Festive Surge: Bulk Cash Discount vs. 45-Day Liquidity Buffer',
      te: 'పండుగ సీజన్: బల్క్ క్యాష్ డిస్కౌంట్ వర్సెస్ 45 రోజుల లిక్విడిటీ బఫర్',
      hi: 'त्योहारी सीजन: थोक नकद छूट बनाम 45-दिवसीय तरलता सुरक्षा',
    },
    domain: {
      en: 'Procurement Strategy & Liquidity Defense',
      te: 'కొనుగోలు వ్యూహం & నగదు భద్రత',
      hi: 'खरीद रणनीति और नकदी सुरक्षा',
    },
    difficulty: 'Executive',
    scenario: {
      en: 'A premier FMCG distributor arrives 3 weeks before Diwali. They offer an unprecedented 11% spot-cash discount if your store buys ₹2,50,000 worth of packaged confectionery and cooking oils immediately in cash. However, committing your entire liquid cash reserve (₹2,20,000) will leave zero emergency buffer for daily dairy, bakery deliveries, and utility overheads over the next 18 days.',
      te: 'దీపావళి పండుగకు 3 వారాల ముందు ఒక ప్రముఖ ఎఫ్‌ఎంసిజి డిస్ట్రిబ్యూటర్ మీ వద్దకు వచ్చారు. మీరు ₹2,50,000 విలువైన మిఠాయిలు, వంట నూనెలను వెంటనే నగదు చెల్లించి కొనుగోలు చేస్తే 11% భారీ రాయితీ ఇస్తామని ఆఫర్ చేశారు. అయితే, మీ వద్ద ఉన్న ₹2,20,000 పూర్తి నగదును ఉపయోగిస్తే, రోజువారీ పాలు, బేకరీ మరియు కరెంట్ బిల్లుల చెల్లింపులకు తక్షణ నగదు నిల్వలు పూర్తిగా ఖాళీ అవుతాయి.',
      hi: 'दिवाली से 3 सप्ताह पहले एक प्रमुख डिस्ट्रीब्यूटर आपके पास आता है। यदि आप तुरंत ₹2,50,000 की कन्फेक्शनरी और कुकिंग ऑयल नकद में खरीदते हैं, तो वह 11% की विशेष नकद छूट देता है। लेकिन आपकी कुल उपलब्ध नकदी ₹2,20,000 है; सारा पैसा लगाने पर रोज़ाना दूध, ब्रेड और बिजली बिल के लिए 18 दिनों तक कोई कैश नहीं बचेगा।',
    },
    financialContext: {
      availableCash: '₹2,20,000',
      creditOwed: '₹65,000',
      weeklyTurnover: '₹1,40,000',
      inventoryAtRisk: '₹2,50,000',
    },
    options: [
      {
        id: 'A',
        text: 'Pay 100% Cash: Borrow ₹30,000 from informal sources to claim the full 11% discount on the entire lot.',
        financialScore: 55,
        riskScore: 25,
        relationshipScore: 70,
        explanation: 'High Risk: Over-leveraging emergency capital creates severe default hazard for daily operational bills and high interest costs wipe out the 11% margin advantage.',
      },
      {
        id: 'B',
        text: 'Counter-Propose Split Procurement: Commit ₹1,00,000 in upfront cash for an 8% discount on fast-turning cooking oils, taking the remaining ₹1,50,000 on standard 30-day credit.',
        financialScore: 92,
        riskScore: 90,
        relationshipScore: 95,
        explanation: 'Optimal Executive Decision: Preserves ₹1,20,000 cash liquidity for daily high-margin essentials while capturing a strong margin boost on high-velocity items and maintaining stellar distributor relations.',
      },
      {
        id: 'C',
        text: 'Reject Deal Completely: Stick strictly to standard weekly small orders on 15-day credit with 0% extra discount.',
        financialScore: 60,
        riskScore: 85,
        relationshipScore: 65,
        explanation: 'Sub-Optimal: Zero risk to cash, but leaves massive festive margins on the table and loses competitiveness to nearby supermarket chains.',
      },
    ],
    bestOptionId: 'B',
    executiveDebrief: {
      en: 'Executive Analysis: Strategic capital rationing is the hallmark of resilient retail enterprises. Option B balances margin defense with critical liquidity resilience, ensuring the enterprise thrives throughout the festive cycle without exposing operations to catastrophic cash insolvency.',
      te: 'నిపుణుల సమీక్ష: వ్యూహాత్మక మూలధన కేటాయింపు వ్యాపార విజయానికి మూలస్తంభం. ఎంపిక B ద్వారా మార్జిన్ లాభాన్ని పొందడంతో పాటు, రోజువారీ అవసరాలకు ₹1,20,000 నగదు భద్రతను కాపాడుకోవచ్చు.',
      hi: 'कार्यकारी विश्लेषण: समझदार पूंजी आवंटन ही सफल व्यापार की पहचान है। विकल्प B से लाभ मार्जिन भी सुरक्षित रहता है और रोज़मर्रा के खर्चों के लिए ₹1,20,000 की आवश्यक तरलता भी बनी रहती है।',
    },
  },
  {
    id: 'challenge-customer-credit-dispute',
    title: {
      en: 'High-Value Customer Ledger Dispute & Account Retention',
      te: 'ప్రధాన కస్టమర్ ఖాతా వివాదం & గౌరవప్రదమైన పరిష్కారం',
      hi: 'प्रमुख ग्राहक खाता विवाद और सम्मानजनक समाधान',
    },
    domain: {
      en: 'Receivables Governance & Patron Relationship',
      te: 'బకాయిల రికవరీ & కస్టమర్ సంబంధాలు',
      hi: 'उधारी प्रबंधन और ग्राहक संबंध',
    },
    difficulty: 'Operational',
    scenario: {
      en: 'Your store\'s second-largest regular customer (who purchases ₹18,000 monthly) disputes a ₹4,800 entry in their 45-day credit book (Bahi-Khata), claiming their family never authorized that specific dry-goods purchase. They refuse to clear their entire ₹22,500 outstanding balance until the issue is solved, threatening to shift their patronage to a rival commercial store.',
      te: 'మీ స్టోర్‌లో నెలకు ₹18,000 విలువైన సరుకులు కొనుగోలు చేసే ఒక ప్రధాన కస్టమర్, వారి క్రెడిట్ ఖాతాలోని ₹4,800 ఎంట్రీని తమ కుటుంబం తీసుకోలేదని వాదిస్తున్నారు. ఈ వివాదం పరిష్కారమయ్యే వరకు మిగిలిన మొత్తం ₹22,500 బకాయిలను చెల్లించబోమని, వేరే స్టోర్‌కి వెళ్లిపోతామని చెబుతున్నారు.',
      hi: 'हर महीने ₹18,000 की खरीदारी करने वाला आपका एक प्रमुख नियमित ग्राहक अपनी खाता बही में ₹4,800 की प्रविष्टि पर विवाद करता है कि उनके परिवार ने यह सामान नहीं लिया। समाधान होने तक वे पूरी ₹22,500 की उधारी रोकने और दूसरे स्टोर जाने की बात कर रहे हैं।',
    },
    financialContext: {
      availableCash: '₹95,000',
      creditOwed: '₹40,000',
      weeklyTurnover: '₹1,20,000',
      inventoryAtRisk: '₹22,500',
    },
    options: [
      {
        id: 'A',
        text: 'Confront Strongly: Insist every line in your store register is sacred and demand immediate full payment before selling another single item.',
        financialScore: 40,
        riskScore: 30,
        relationshipScore: 10,
        explanation: 'Detrimental: Guarantees permanent loss of a ₹2,16,000 annual customer and incites negative community word-of-mouth.',
      },
      {
        id: 'B',
        text: 'Executive Audit Reconciliation: Politely invite the customer for tea, present digital billing slips/timestamps, offer a 50% goodwill settlement on the disputed ₹4,800, and immediately onboard their account onto automated WhatsApp digital invoicing.',
        financialScore: 94,
        riskScore: 88,
        relationshipScore: 98,
        explanation: 'Masterclass Commercial Governance: Recovers ₹20,100 immediately, preserves an invaluable lifelong relationship, and permanently eliminates future manual ledger ambiguities.',
      },
      {
        id: 'C',
        text: 'Total Surrender: Forgive the entire disputed ₹4,800 unconditionally and apologize without reviewing physical transaction logs.',
        financialScore: 65,
        riskScore: 50,
        relationshipScore: 80,
        explanation: 'Vulnerable: Sets a perilous precedent where other patrons can exploit informal book ambiguities for unearned deductions.',
      },
    ],
    bestOptionId: 'B',
    executiveDebrief: {
      en: 'Executive Analysis: In high-trust retail communities, dignified customer conflict de-escalation combined with structural digital transition (Option B) turns an operational friction point into permanent patron loyalty.',
      te: 'నిపుణుల సమీక్ష: నమ్మకమైన వ్యాపారంలో గౌరవప్రదమైన చర్చ మరియు డిజిటల్ రికార్డుల పారదర్శకత (ఎంపిక B) వివాదాన్ని శాశ్వత కస్టమర్ విధేయతగా మారుస్తుంది.',
      hi: 'कार्यकारी विश्लेषण: सम्मानजनक संवाद और डिजिटल रसीद की पारदर्शिता (विकल्प B) विवाद को समाप्त कर ग्राहक के विश्वास को हमेशा के लिए सुदृढ़ बनाती है।',
    },
  },
];

export function getSimulatedMentorReply(
  userQuery: string,
  language: SupportedLanguage
): { replyText: string; audioSummary: string; suggestedFollowUps: string[] } {
  const q = userQuery.toLowerCase();

  if (language === 'te') {
    if (q.includes('క్రెడిట్') || q.includes('సప్లయర్') || q.includes('డిస్ట్రిబ్యూటర్') || q.includes('supplier') || q.includes('credit')) {
      return {
        replyText: `డిస్ట్రిబ్యూటర్లతో క్రెడిట్ గడువు పెంపుపై మీ ఆలోచన చాలా సరైనది. 
1. మీ గత 6 నెలల ఆర్డర్ల రికార్డును చూపించి, మీ చెల్లింపుల క్రమశిక్షణను ఆధారంగా చేసుకోండి.
2. ఆర్డర్ సైజును 20% పెంచుతామని హామీ ఇస్తూ, క్రెడిట్ సైకిల్‌ను 15 నుండి 35 రోజులకు పెంచమని ప్రతిపాదించండి.
3. ప్రతి సోమవారం డిజిటల్ నెఫ్ట్/యుపిఐ ద్వారా నిర్ణీత మొత్తాన్ని క్రమం తప్పకుండా పంపుతామని ఒప్పందం చేసుకోండి.`,
        audioSummary: 'డిస్ట్రిబ్యూటర్లతో మాట్లాడేటప్పుడు మీ సమయపాలన రికార్డును చూపించి క్రెడిట్ గడువును 35 రోజులకు పెంచుకోవచ్చు.',
        suggestedFollowUps: [
          'డిస్ట్రిబ్యూటర్ తిరస్కరిస్తే తదుపరి మార్గం ఏమిటి?',
          'కస్టమర్ల నుండి బకాయిలు వేగంగా రాబట్టడం ఎలా?',
        ],
      };
    }

    return {
      replyText: `మీ వ్యాపార ప్రశ్న చాలా విలువైనది. ఒక జనరల్ స్టోర్ లేదా కమర్షియల్ ఎంటర్‌ప్రైజ్ విజయవంతం కావడానికి రెండు నియమాలు ముఖ్యం:
1. రోజువారీ లిక్విడిటీని కాపాడుకోవడం: ఎట్టి పరిస్థితుల్లోనూ వేగంగా అమ్ముడుకాని వస్తువులలో మూలధనాన్ని ఇరికించవద్దు.
2. కస్టమర్ అనుభవం & డిజిటల్ బిల్లింగ్: ప్రతి కొనుగోలుకు స్పష్టమైన డిజిటల్ రసీదు ఇవ్వడం వల్ల నమ్మకం రెట్టింపు అవుతుంది.
మీ ప్రశ్నకు సంబంధించి వెంటనే అమలు చేయదగిన ప్రణాళికను సిద్ధం చేయవచ్చు.`,
      audioSummary: 'మీ వ్యాపారాన్ని మరింత లాభదాయకంగా మార్చడానికి స్పష్టమైన నగదు నియంత్రణ మరియు డిజిటల్ రికార్డులు అవసరం.',
      suggestedFollowUps: [
        'స్టాక్ రొటేషన్ వేగవంతం చేయడం ఎలా?',
        'పెండింగ్ ఉధారీలు ఎలా రికవర్ చేయాలి?',
      ],
    };
  }

  if (language === 'hi') {
    if (q.includes('उधारी') || q.includes('सप्लायर') || q.includes('क्रेडिट') || q.includes('supplier') || q.includes('credit')) {
      return {
        replyText: `सप्लायर से अनुकूल क्रेडिट शर्तें प्राप्त करने के लिए यह रणनीति अपनाएं:
1. अपने पिछले 6 महीनों के नियमित भुगतान का ट्रैक रिकॉर्ड उनके सामने रखें।
2. उन्हें आश्वस्त करें कि 35 दिनों का क्रेडिट मिलने पर आप अपने ऑर्डर का आकार 25% तक बढ़ाएंगे।
3. साप्ताहिक निश्चित भुगतान का डिजिटल शेड्यूल तय करें ताकि उनका जोखिम शून्य रहे।`,
        audioSummary: 'सप्लायर को ऑर्डर बढ़ाने का विश्वास दिलाकर क्रेडिट अवधि 15 से बढ़ाकर 35 दिन की जा सकती है।',
        suggestedFollowUps: [
          'धीमे बिकने वाले स्टॉक को कैसे निकालें?',
          'ग्राहकों को उधारी वसूली का सम्मानजनक संदेश कैसे भेजें?',
        ],
      };
    }

    return {
      replyText: `आपका प्रश्न अत्यंत व्यावहारिक है। एक सफल और प्रतिष्ठित रिटेल व्यापार के लिए यह दो बिंदु महत्वपूर्ण हैं:
1. कार्यशील पूंजी की सुरक्षा: कभी भी धीमी बिकने वाली वस्तुओं में अत्यधिक पूंजी न लगाएं।
2. डिजिटल बहीखाता: व्हाट्सएप और यूपीआई रसीदों से ग्राहकों का विश्वास बढ़ता है और उधारी का जोखिम कम होता है।
आपकी परिस्थिति के अनुसार हम तत्काल समाधान लागू कर सकते हैं।`,
      audioSummary: 'कार्यशील पूंजी का सही प्रबंधन और पारदर्शी डिजिटल बिलिंग आपके व्यापार को नई ऊंचाई देगा।',
      suggestedFollowUps: [
        'सप्लायर से अतिरिक्त 5% मार्जिन कैसे लें?',
        'त्योहारी सीजन में स्टॉक योजना कैसे बनाएं?',
      ],
    };
  }

  // Default English
  return {
    replyText: `Here is the executive operational recommendation for your retail enterprise:
1. **Working Capital Discipline**: Never commit more than 20% of your open-to-buy budget to unproven or seasonal SKUs. Anchor 80% of purchasing in verified high-velocity staples.
2. **Supplier Leverage**: Present distributors with your verified monthly sales velocity. Request a 30-day revolving credit line backed by automated bi-weekly ACH/UPI disbursements.
3. **Receivables Protection**: Cap individual customer credit lines at 15% of their average monthly spend and transition ledger balances to automated WhatsApp notifications with early-settlement rebates.`,
    audioSummary: 'Anchor 80% of procurement in fast-turning daily staples and transition informal customer accounts to polite automated digital reconciliation.',
    suggestedFollowUps: [
      'How to negotiate 35-day credit terms with FMCG distributors?',
      'Best strategy to recover 60-day overdue customer ledger accounts?',
    ],
  };
}
