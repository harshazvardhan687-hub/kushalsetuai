import { ProblemPreset } from '../types';

export const STARTER_PRESETS: ProblemPreset[] = [
  {
    id: 'working-capital-optimization',
    title: {
      en: 'Working Capital & Inventory Liquidity Turnaround',
      te: 'వర్కింగ్ క్యాపిటల్ & ఇన్వెంటరీ లిక్విడిటీ క్రమబద్ధీకరణ',
      hi: 'कार्यशील पूंजी (Working Capital) और इन्वेंट्री तरलता अनुकूलन',
    },
    domain: {
      en: 'Capital Allocation & Cash Flow',
      te: 'మూలధన కేటాయింపు & నగదు ప్రవాహం',
      hi: 'पूंजी आवंटन और नकदी प्रवाह',
    },
    enterpriseType: {
      en: 'General Merchandise Store & Retail Emporium',
      te: 'జనరల్ మర్చండైజ్ స్టోర్ & రిటైల్ ఎంపోరియం',
      hi: 'जनरल स्टोर और रिटेल एंपोरियम',
    },
    summary: {
      en: 'Resolve severe cash-flow friction caused by ₹2.4 Lakhs locked in slow-moving non-perishable inventory and unfavorable 15-day supplier credit terms.',
      te: 'నెమ్మదిగా అమ్ముడయ్యే ఇన్వెంటరీలో నిలిచిపోయిన ₹2.4 లక్షల నిధులను విడుదల చేయడం మరియు 15 రోజుల సరఫరాదారు క్రెడిట్ నిబంధనలను 35 రోజులకు పొడిగించడం.',
      hi: 'धीमी गति से बिकने वाले स्टॉक में फंसे ₹2.4 लाख को निकालना और 15 दिनों की सप्लायर क्रेडिट शर्तों को 35 दिनों तक पुनर्गठित करना।',
    },
    defaultProblemText: {
      en: 'Our general retail enterprise has approximately ₹2,40,000 trapped in aged seasonal inventory. Meanwhile, primary FMCG distributors are demanding payment settlements within 15 days, resulting in recurring working capital crunches and inability to stock high-velocity daily goods. We need a structured inventory rationalization plan, an actionable distributor renegotiation script, and working capital safeguards.',
      te: 'మా జనరల్ రిటైల్ స్టోర్‌లో సుమారు ₹2,40,000 విలువైన నిల్వలు స్తంభించిపోయాయి. అదే సమయంలో ఎఫ్‌ఎంసిజి డిస్ట్రిబ్యూటర్లు 15 రోజుల్లోగా చెల్లింపులు కోరుతున్నారు, దీనివల్ల వేగంగా అమ్ముడయ్యే నిత్యావసర వస్తువులను స్టాక్ చేయడానికి వర్కింగ్ క్యాపిటల్ కొరత ఏర్పడుతోంది. ఇన్వెంటరీని వేగంగా నగదుగా మార్చడానికి మరియు డిస్ట్రిబ్యూటర్లతో చర్చించడానికి వ్యూహాత్మక ప్రణాళిక అవసరం.',
      hi: 'हमारे जनरल रिटेल स्टोर में लगभग ₹2,40,000 की पूंजी धीमी बिकने वाली इन्वेंट्री में फंसी हुई है। मुख्य डिस्ट्रीब्यूटर 15 दिनों में भुगतान की मांग कर रहे हैं, जिससे रोज़मर्रा की अधिक मांग वाले उत्पादों को स्टॉक करने में नकदी की कमी हो रही है। हमें एक व्यवस्थित इन्वेंट्री लिक्विडेशन योजना और सप्लायर वार्ता रणनीति चाहिए।',
    },
    audioScript: {
      en: 'Working capital diagnostic initiated for general merchandise retail. Focus areas: freeing trapped inventory liquidity and negotiating supplier credit terms to 35 days.',
      te: 'జనరల్ స్టోర్ కోసం వర్కింగ్ క్యాపిటల్ విశ్లేషణ ప్రారంభించబడింది. స్తంభించిన స్టాక్‌ను నగదుగా మార్చడం మరియు క్రెడిట్ గడువును 35 రోజులకు పెంచడం ప్రధాన లక్ష్యం.',
      hi: 'जनरल स्टोर के लिए कार्यशील पूंजी विश्लेषण प्रारंभ। फंसी हुई इन्वेंट्री को मुक्त करना और सप्लायर क्रेडिट को 35 दिनों तक बढ़ाना मुख्य लक्ष्य है।',
    },
    defaultMetrics: {
      monthlyTurnover: 480000,
      supplierCreditDays: 14,
      deadStockPercentage: 22,
      workingCapitalGap: 180000,
    },
  },
  {
    id: 'omnichannel-credit-reconciliation',
    title: {
      en: 'Commercial Customer Credit (Bahi-Khata) Reconciliation & Digital Settlement',
      te: 'కస్టమర్ క్రెడిట్ ఖాతా రికన్సిలియేషన్ & డిజిటల్ చెల్లింపుల వ్యవస్థ',
      hi: 'ग्राहक क्रेडिट (खाता बही) समाधान और डिजिटल निपटान',
    },
    domain: {
      en: 'Revenue Assurance & Receivables Risk',
      te: 'ఆదాయ భద్రత & క్రెడిట్ రిస్క్ మేనేజ్‌మెంట్',
      hi: 'राजस्व आश्वासन और उधारी जोखिम प्रबंधन',
    },
    enterpriseType: {
      en: 'Semi-Urban Provisions & Consumer Goods Hub',
      te: 'సెమీ-అర్బన్ ప్రొవిజన్స్ & కన్స్యూమర్ గూడ్స్ హబ్',
      hi: 'अर्ध-शहरी प्रोविजंस और उपभोक्ता वस्तुएं केंद्र',
    },
    summary: {
      en: 'Transform informal customer credit ledgers into automated, dignified WhatsApp/UPI reconciliation schedules to recover overdue receivables without damaging loyalty.',
      te: 'కస్టమర్లతో సత్సంబంధాలు దెబ్బతినకుండా, పెండింగ్ బకాయిలను గౌరవప్రదంగా వసూలు చేయడానికి ఆటోమేటెడ్ డిజిటల్ లెడ్జర్ మరియు యుపిఐ రిమైండర్ వ్యవస్థను అమలు చేయడం.',
      hi: 'ग्राहकों के साथ विश्वास और सम्मान बनाए रखते हुए, व्हाट्सएप/यूपीआई आधारित स्वचालित सुलह प्रणाली द्वारा पुरानी उधारी की वसूली करना।',
    },
    defaultProblemText: {
      en: 'Our enterprise maintains an active customer base with over ₹1,85,000 outstanding in rolling 30-to-60 day informal credit accounts. Manual follow-ups create friction with longtime patrons, and collection cycles average 48 days. We need a dignified, automated credit notification framework, tiered early-settlement incentive models, and unified digital payment reconciliation.',
      te: 'మా స్టోర్‌లో నమ్మకమైన కస్టమర్ల వద్ద సుమారు ₹1,85,000 బకాయిలు 45 రోజులకు పైగా పెండింగ్‌లో ఉన్నాయి. వ్యక్తిగతంగా అడగడం వల్ల సంబంధాలు ప్రభావితమవుతున్నాయి. గౌరవప్రదమైన డిజిటల్ రిమైండర్లు, త్వరిత చెల్లింపులపై చిన్న రాయితీలు మరియు యుపిఐ ఆటో-రికన్సిలియేషన్ పద్ధతిని సిద్ధం చేయాలి.',
      hi: 'हमारे संस्थान का ₹1,85,000 नियमित ग्राहकों के पास 30 से 60 दिनों से अटका हुआ है। बार-बार तकादा करने से प्रतिष्ठा और संबंधों पर असर पड़ता है। हमें एक स्वचालित, सम्मानजनक डिजिटल रिमाइंडर प्रक्रिया और समय पर भुगतान के लिए प्रोत्साहन मॉडल चाहिए।',
    },
    audioScript: {
      en: 'Receivables assurance protocol active. Implementing automated polite reminders, 2% dynamic cash discounts, and digitized ledger tracking.',
      te: 'బకాయిల రికవరీ విధానం ప్రారంభించబడింది. గౌరవప్రదమైన డిజిటల్ నోటిఫికేషన్లు మరియు సమయానికి చెల్లించేవారికి క్యాష్ డిస్కౌంట్ సిఫార్సు చేయబడింది.',
      hi: 'बकाया राशि समाधान प्रोटोकॉल सक्रिय। सम्मानजनक डिजिटल सूचनाएं और समय पर भुगतान के लिए 2% छूट की रणनीति तैयार की गई है।',
    },
    defaultMetrics: {
      monthlyTurnover: 550000,
      supplierCreditDays: 20,
      deadStockPercentage: 8,
      workingCapitalGap: 185000,
    },
  },
  {
    id: 'fmcg-procurement-margin-defense',
    title: {
      en: 'FMCG Margin Defense & Bulk Co-Procurement Syndicate',
      te: 'ఎఫ్‌ఎంసిజి మార్జిన్ రక్షణ & బల్క్ ప్రొక్యూర్మెంట్ సిండికేట్',
      hi: 'एफएमसीजी मार्जिन सुरक्षा और थोक खरीद सिंडिकेट',
    },
    domain: {
      en: 'Procurement Synergy & Price Competitiveness',
      te: 'కొనుగోలు సామర్థ్యం & ధరల పోటీతత్వం',
      hi: 'खरीद तालमेल और मूल्य प्रतिस्पर्धा',
    },
    enterpriseType: {
      en: 'Independent Retail Syndicate & Commercial Superstore',
      te: 'ఇండిపెండెంట్ రిటైల్ సిండికేట్ & కమర్షియల్ స్టోర్',
      hi: 'स्वतंत्र रिटेल सिंडिकेट और वाणिज्यिक सुपरस्टोर',
    },
    summary: {
      en: 'Combat margin squeeze from quick-commerce apps by aggregating buying power across 8 neighboring general stores to access Tier-1 distributor wholesale rebates (18-22%).',
      te: 'ఆన్‌లైన్ క్విక్-కామర్స్ నుండి వస్తున్న పోటీని ఎదుర్కొనేందుకు, సమీపంలోని 8 జనరల్ స్టోర్లతో కలిసి టోకు రేట్లను సాధించడం మరియు లాభాల మార్జిన్‌ను 18-22% వరకు పెంచడం.',
      hi: 'क्विक-कॉमर्स कंपनियों की प्रतिस्पर्धा के सामने 8 क्षेत्रीय जनरल स्टोर्स के साथ मिलकर सीधे डिस्ट्रीब्यूटर से थोक दरों पर 18-22% मार्जिन सुरक्षित करना।',
    },
    defaultProblemText: {
      en: 'Rapid expansion of online delivery platforms in our regional market has slashed retail gross margins on branded packaged consumer goods from 18% down to 9%. Single-store purchasing volumes prevent us from accessing tier-1 distributor volume discounts. We require a formal merchant buying syndicate structure, direct-from-manufacturer order pooling, and high-margin private label / regional FMCG cross-merchandising.',
      te: 'ఆన్‌లైన్ డెలివరీ యాప్‌ల వల్ల మా బ్రాండెడ్ ఉత్పత్తుల మార్జిన్ 18% నుండి 9% కి పడిపోయింది. ఒక్కడిగానే ఆర్డర్ చేయడం వల్ల డిస్ట్రిబ్యూటర్లు పెద్ద డిస్కౌంట్లు ఇవ్వడం లేదు. ప్రాంతీయ వ్యాపార మిత్రులతో కలిసి ఉమ్మడి కొనుగోలు గ్రూప్ ఏర్పాటు చేయడానికి మరియు అధిక లాభం ఇచ్చే స్థానిక బ్రాండ్లను ప్రవేశపెట్టడానికి వ్యూహం కావాలి.',
      hi: 'ऑनलाइन डिलीवरी कंपनियों के कारण हमारे ब्रांडेड उत्पादों का ग्रॉस मार्जिन 18% से घटकर 9% रह गया है। अकेले खरीदने के कारण थोक छूट नहीं मिलती। हमें स्थानीय व्यापारियों का एक खरीद सिंडिकेट और उच्च-मार्जिन वाले क्षेत्रीय उत्पादों की व्यवस्था चाहिए।',
    },
    audioScript: {
      en: 'Procurement synergy plan loaded. Target: Aggregated buying consortium to unlock 6% to 9% additional distributor margin rebates.',
      te: 'ఉమ్మడి కొనుగోలు ప్రణాళిక సిద్ధమైంది. స్థానిక స్టోర్ల భాగస్వామ్యంతో అదనంగా 6% నుండి 9% వరకు మార్జిన్ పొందే మార్గం ఇది.',
      hi: 'थोक खरीद तालमेल योजना सक्रिय। व्यापारियों के समूह के माध्यम से 6% से 9% अतिरिक्त डिस्ट्रीब्यूटर मार्जिन सुनिश्चित किया जा रहा है।',
    },
    defaultMetrics: {
      monthlyTurnover: 820000,
      supplierCreditDays: 25,
      deadStockPercentage: 11,
      workingCapitalGap: 240000,
    },
  },
  {
    id: 'perishables-cold-chain-shrinkage',
    title: {
      en: 'Perishables & Cold-Chain Shrinkage Reduction Protocol',
      te: 'తాజా నిత్యావసరాలు & శీతల నిల్వల నష్ట నివారణ ప్రణాళిక',
      hi: 'जल्दी खराब होने वाले सामान और कोल्ड-स्टोरेज नुकसान रोकथाम',
    },
    domain: {
      en: 'Quality Assurance & Wastage Elimination',
      te: 'నాణ్యతా ప్రమాణాలు & వేస్టేజ్ తగ్గింపు',
      hi: 'गुणवत्ता आश्वासन और बर्बादी में कमी',
    },
    enterpriseType: {
      en: 'Fresh Provisions & Dairy Retail Store',
      te: 'ఫ్రెష్ ప్రొవిజన్స్ & డెయిరీ రిటైల్ స్టోర్',
      hi: 'ताजा खाद्य सामग्री एवं डेयरी रिटेल स्टोर',
    },
    summary: {
      en: 'Implement dynamic time-decay pricing and optimized cold storage rotation to slash fresh goods spoilage from 12% to under 2.5% monthly.',
      te: 'డెయిరీ, పండ్లు మరియు తాజా సరుకుల్లో 12% ఉన్న నష్టాన్ని, సరైన శీతల నిల్వలు మరియు సాయంత్రం వేళల్లో డైనమిక్ రాయితీలతో 2.5% లోపుకి తగ్గించడం.',
      hi: 'डेयरी व ताज़ा उत्पादों में 12% होने वाले नुकसान को समय-आधारित छूट और बेहतर कोल्ड-स्टोरेज प्रबंधन द्वारा 2.5% से नीचे लाना।',
    },
    defaultProblemText: {
      en: 'Our store experiences an unacceptable 12.8% inventory shrinkage on temperature-sensitive dairy, bakery, and farm goods due to power inconsistencies and static end-of-day pricing. We write off approximately ₹34,000 each month. We require an operational cold-chain checklist, an algorithmic time-decay clearance markdown schedule, and institutional supply contracts.',
      te: 'విద్యుత్ హెచ్చుతగ్గులు మరియు రోజు ముగింపులో స్థిర ధరల కారణంగా మా డెయిరీ మరియు తాజా ఉత్పత్తులలో నెలకు ₹34,000 వరకు నష్టం వస్తోంది. వేస్టేజ్ తగ్గించే స్టోరేజ్ పద్ధతులు మరియు సాయంత్రం సమయంలో అమ్ముడయ్యేలా డిస్కౌంట్ ఫార్ములా కావాలి.',
      hi: 'बिजली की अनिश्चितता और शाम के समय स्थिर कीमतों के कारण हमारे डेयरी व बेकरी उत्पादों में हर महीने लगभग ₹34,000 का नुकसान हो रहा है। हमें वैज्ञानिक कोल्ड-चेन चेकलिस्ट और गतिशील मूल्य निर्धारण पद्धति चाहिए।',
    },
    audioScript: {
      en: 'Cold chain shrinkage diagnostic initialized. Deploying morning-to-evening dynamic markdown curves and backup chilling workflows.',
      te: 'శీతల నిల్వల నష్ట నివారణ విశ్లేషణ సిద్ధమైంది. సాయంత్రం డైనమిక్ రాయితీలు మరియు స్టోరేజ్ నియమాలతో నష్టాన్ని సున్నాకి చేర్చవచ్చు.',
      hi: 'कोल्ड-चेन नुकसान रोकथाम विश्लेषण तैयार। शाम की गतिशील छूट और बैकअप स्टोरेज रणनीतियों से बर्बादी रोकी जा सकती है।',
    },
    defaultMetrics: {
      monthlyTurnover: 410000,
      supplierCreditDays: 7,
      deadStockPercentage: 14,
      workingCapitalGap: 95000,
    },
  },
  {
    id: 'ngo-community-enterprise-compliance',
    title: {
      en: 'Community Enterprise & NGO Micro-Financing Grant Compliance',
      te: 'కమ్యూనిటీ ఎంటర్‌ప్రైజ్ & ఎన్జీవో మైక్రో-గ్రాంట్ జవాబుదారీతనం',
      hi: 'सामुदायिक उद्यम और एनजीओ माइक्रो-ग्रांट अनुपालन एवं ऑडिट',
    },
    domain: {
      en: 'Governance, Micro-Grants & Impact Audit',
      te: 'గవర్నెన్స్, మైక్రో-గ్రాంట్లు & ఆడిట్ రికార్డులు',
      hi: 'पारदर्शिता, अनुदान प्रबंधन और ऑडिट',
    },
    enterpriseType: {
      en: 'Community Co-operative & Rural NGO Operations',
      te: 'కమ్యూనిటీ కో-ఆపరేటివ్ & రూరల్ ఎన్జీవో సంస్థ',
      hi: 'सामुदायिक सहकारी समिति और ग्रामीण एनजीओ',
    },
    summary: {
      en: 'Establish audit-ready dual-entry retail inventory logging and beneficiary grant allocation tracking to maintain eligibility for national development micro-capital.',
      te: 'గ్రామీణ సహకార స్టోర్ మరియు స్వచ్ఛంద సంస్థల కోసం నిధుల వినియోగం, ఇన్వెంటరీ ఆడిట్ మరియు మైక్రో-ఫైనాన్స్ నిబంధనల పూర్తి రికార్డుల తయారీ.',
      hi: 'ग्रामीण सहकारी स्टोर और एनजीओ के लिए पारदर्शी इन्वेंट्री ऑडिट और सरकारी विकास अनुदानों की सतत पात्रता बनाए रखने की व्यवस्था।',
    },
    defaultProblemText: {
      en: 'Our community retail co-operative operates under a rural development NGO framework serving 420 member families. We received a ₹5,00,000 rotational working-capital grant, but lack rigorous digital SKU tracking and audit-compliant disbursement records. We face upcoming institutional scrutiny and need verified inventory balance sheets, beneficiary sales audits, and sustainability benchmarks.',
      te: 'మా కమ్యూనిటీ రిటైల్ కో-ఆపరేటివ్ 420 కుటుంబాలకు సేవలు అందిస్తోంది. మాకు ₹5,00,000 రివాల్వింగ్ వర్కింగ్ క్యాపిటల్ గ్రాంట్ మంజూరైంది, అయితే అధికారిక ఆడిట్ రికార్డులు మరియు డిజిటల్ లెడ్జర్ నిర్వహణ అవసరం. చట్టబద్ధమైన పారదర్శకతను నిరూపించే సమగ్ర డాక్యుమెంటేషన్ కావాలి.',
      hi: 'हमारी सामुदायिक सहकारी समिति 420 परिवारों को सेवा प्रदान करती है। हमें ₹5,00,000 का कार्यशील पूंजी अनुदान प्राप्त हुआ है, लेकिन ऑडिट के अनुरूप स्टॉक और बिक्री का पारदर्शी रिकॉर्ड तैयार करना अत्यंत आवश्यक है।',
    },
    audioScript: {
      en: 'Institutional compliance framework ready. Implementing double-check SKU auditing and micro-grant reconciliation standards.',
      te: 'సంస్థాగత ఆడిట్ నిబంధనల ప్రణాళిక సిద్ధమైంది. నిధుల సద్వినియోగం మరియు ఇన్వెంటరీ పారదర్శకతను ఇది నిర్ధారిస్తుంది.',
      hi: 'संस्थागत ऑडिट अनुपालन ढांचा तैयार। अनुदान की पारदर्शिता और इन्वेंट्री ट्रैकिंग के लिए पेशेवर मानक लागू किए जा रहे हैं।',
    },
    defaultMetrics: {
      monthlyTurnover: 650000,
      supplierCreditDays: 30,
      deadStockPercentage: 5,
      workingCapitalGap: 120000,
    },
  },
];
