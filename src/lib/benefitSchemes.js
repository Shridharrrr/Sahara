export const benefitSchemes = [
  // AGRICULTURE & FARMING
  {
    id: 'pm-kisan',
    name: 'PM-KISAN योजना',
    nameEn: 'PM-KISAN Scheme',
    category: 'Agriculture',
    amount: '₹6,000/year',
    eligibility: {
      occupation: ['farmer', 'agriculture worker', 'landowner'],
      landOwnership: 'required',
      incomeLimit: 200000,
      ageLimit: { min: 18, max: null },
      demographics: ['rural', 'semi-urban'],
      keywords: ['farmer', 'agriculture', 'land', 'crop', 'farming', 'किसान', 'खेती', 'फसल', 'जमीन', 'शेतकरी', 'शेती', 'पीक', 'जमीन']
    },
    description: 'Direct income support scheme for small and marginal farmers',
    documents: ['Aadhaar', 'Land records', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🌾',
    applicationProcess: 'Online through PM-KISAN portal',
    benefitType: 'Direct cash transfer'
  },
  {
    id: 'kisan-credit-card',
    name: 'किसान क्रेडिट कार्ड',
    nameEn: 'Kisan Credit Card',
    category: 'Agriculture Credit',
    amount: 'Credit limit based on land holding',
    eligibility: {
      occupation: ['farmer', 'agriculture'],
      landOwnership: 'required or tenant',
      ageLimit: { min: 18, max: 75 },
      demographics: ['rural', 'semi-urban'],
      keywords: ['credit', 'loan', 'farming', 'agriculture', 'crop loan', 'किसान', 'ऋण', 'खेती', 'फसल', 'शेतकरी', 'कर्ज', 'शेती', 'पीक कर्ज']
    },
    description: 'Flexible credit facility for farmers agricultural needs',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Income proof'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '💳',
    applicationProcess: 'Through banks and cooperative societies',
    benefitType: 'Agricultural credit facility'
  },
  {
    id: 'pm-fasal-bima',
    name: 'प्रधानमंत्री फसल बीमा योजना',
    nameEn: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Agriculture Insurance',
    amount: 'Crop insurance coverage up to sum insured',
    eligibility: {
      occupation: ['farmer'],
      landOwnership: 'owner or tenant',
      demographics: ['rural', 'semi-urban'],
      keywords: ['crop insurance', 'farming', 'natural disaster', 'weather', 'फसल बीमा', 'प्राकृतिक आपदा', 'पीक विमा', 'नैसर्गिक आपत्ती', 'हवामान']
    },
    description: 'Comprehensive crop insurance scheme for farmers',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Sowing certificate'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🛡️',
    applicationProcess: 'Through banks, CSCs, and online portal',
    benefitType: 'Crop insurance coverage'
  },
  {
    id: 'soil-health-card',
    name: 'मृदा स्वास्थ्य कार्ड योजना',
    nameEn: 'Soil Health Card Scheme',
    category: 'Agriculture Support',
    amount: 'Free soil testing and advisory',
    eligibility: {
      occupation: ['farmer'],
      landOwnership: 'required',
      demographics: ['rural', 'semi-urban'],
      keywords: ['soil testing', 'fertilizer', 'crop productivity', 'मिट्टी', 'उर्वरक', 'माती चाचणी', 'खत', 'पीक उत्पादकता']
    },
    description: 'Free soil testing and nutrient management advisory',
    documents: ['Land records', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🌱',
    applicationProcess: 'Through agriculture extension officers',
    benefitType: 'Agricultural advisory services'
  },
  {
    id: 'paramparagat-krishi-vikas-yojana',
    name: 'परम्परागत कृषि विकास योजना',
    nameEn: 'Paramparagat Krishi Vikas Yojana',
    category: 'Organic Farming',
    amount: '₹50,000 per hectare over 3 years',
    eligibility: {
      occupation: ['farmer'],
      landOwnership: 'required',
      farmingType: 'willing to adopt organic',
      demographics: ['rural'],
      keywords: ['organic farming', 'sustainable agriculture', 'जैविक खेती', 'टिकाऊ कृषि', 'सेंद्रिय शेती', 'टिकाऊ शेती']
    },
    description: 'Promotion of organic farming through cluster approach',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Group formation certificate'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🌿',
    applicationProcess: 'Through state agriculture departments',
    benefitType: 'Financial assistance for organic farming'
  },
  {
    id: 'national-horticulture-mission',
    name: 'राष्ट्रीय बागवानी मिशन',
    nameEn: 'National Horticulture Mission',
    category: 'Horticulture',
    amount: 'Up to ₹30,000 per hectare',
    eligibility: {
      occupation: ['farmer', 'horticulturist'],
      landOwnership: 'required',
      demographics: ['rural', 'semi-urban'],
      keywords: ['horticulture', 'fruits', 'vegetables', 'gardening', 'बागवानी', 'फल', 'सब्जी', 'फळे', 'भाज्या', 'बागायती']
    },
    description: 'Holistic development of horticulture sector',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Horticulture plan'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🍎',
    applicationProcess: 'Through state horticulture departments',
    benefitType: 'Subsidy for horticulture development'
  },
  {
    id: 'national-livestock-mission',
    name: 'राष्ट्रीय पशुधन मिशन',
    nameEn: 'National Livestock Mission',
    category: 'Animal Husbandry',
    amount: 'Variable subsidy based on activity',
    eligibility: {
      occupation: ['farmer', 'livestock owner'],
      demographics: ['rural', 'semi-urban'],
      keywords: ['livestock', 'cattle', 'dairy', 'animal husbandry', 'पशुधन', 'गाय', 'डेयरी', 'पशुपालन', 'गुरेढोरे', 'दुग्ध व्यवसाय']
    },
    description: 'Sustainable development of livestock sector',
    documents: ['Aadhaar', 'Bank account', 'Livestock ownership proof'],
    level: 'National',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    icon: '🐄',
    applicationProcess: 'Through state animal husbandry departments',
    benefitType: 'Subsidy for livestock activities'
  },
  {
    id: 'pradhan-mantri-matsya-sampada-yojana',
    name: 'प्रधानमंत्री मत्स्य सम्पदा योजना',
    nameEn: 'Pradhan Mantri Matsya Sampada Yojana',
    category: 'Fisheries',
    amount: 'Up to ₹60 Lakh for various activities',
    eligibility: {
      occupation: ['fisherman', 'fish farmer', 'entrepreneur'],
      demographics: ['coastal', 'rural', 'urban'],
      keywords: ['fisheries', 'fish farming', 'aquaculture', 'मत्स्य पालन', 'मछली', 'जलकृषि', 'मासेमारी', 'मत्स्य संवर्धन']
    },
    description: 'Sustainable development of fisheries sector',
    documents: ['Aadhaar', 'Bank account', 'Fisherman registration', 'Project proposal'],
    level: 'National',
    ministry: 'Ministry of Fisheries, Animal Husbandry and Dairying',
    icon: '🐟',
    applicationProcess: 'Through state fisheries departments',
    benefitType: 'Subsidy and credit support'
  },

  // HEALTHCARE
  {
    id: 'ayushman-bharat',
    name: 'आयुष्मान भारत',
    nameEn: 'Ayushman Bharat - PM-JAY',
    category: 'Healthcare',
    amount: '₹5 Lakh coverage per family per year',
    eligibility: {
      occupation: ['any'],
      incomeLimit: 180000,
      demographics: ['rural', 'urban', 'semi-urban'],
      familySize: { min: 1, max: null },
      specialConditions: ['BPL', 'economically vulnerable'],
      keywords: ['health', 'medical', 'hospital', 'treatment', 'surgery', 'medicine', 'स्वास्थ्य', 'इलाज', 'अस्पताल', 'दवा', 'आरोग्य', 'वैद्यकीय', 'रुग्णालय', 'उपचार']
    },
    description: 'Health insurance scheme providing cashless treatment',
    documents: ['Aadhaar', 'Ration card', 'Income certificate'],
    level: 'National',
    ministry: 'Ministry of Health and Family Welfare',
    icon: '🏥',
    applicationProcess: 'Through empaneled hospitals or online',
    benefitType: 'Health insurance coverage'
  },
  {
    id: 'esi-scheme',
    name: 'कर्मचारी राज्य बीमा योजना',
    nameEn: 'Employees State Insurance Scheme',
    category: 'Healthcare for Workers',
    amount: 'Comprehensive medical care',
    eligibility: {
      occupation: ['employee'],
      salaryLimit: 25000,
      employment: 'organized sector',
      demographics: ['urban', 'industrial areas'],
      keywords: ['employee', 'medical', 'worker', 'कर्मचारी', 'मजदूर', 'स्वास्थ्य बीमा', 'कर्मचारी', 'कामगार', 'आरोग्य विमा']
    },
    description: 'Medical care and cash benefits for employees and dependents',
    documents: ['Employment certificate', 'Salary certificate', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Labour and Employment',
    icon: '🏭',
    applicationProcess: 'Through employer registration',
    benefitType: 'Medical care and cash benefits'
  },
  {
    id: 'janani-suraksha-yojana',
    name: 'जननी सुरक्षा योजना',
    nameEn: 'Janani Suraksha Yojana',
    category: 'Maternal Health',
    amount: '₹1,400 (rural), ₹1,000 (urban)',
    eligibility: {
      gender: 'female',
      condition: 'pregnant',
      demographics: ['rural', 'urban'],
      specialConditions: ['BPL priority'],
      keywords: ['pregnancy', 'maternal', 'delivery', 'women', 'गर्भावस्था', 'प्रसव', 'महिला', 'गर्भधारणा', 'बाळंतपण', 'स्त्री']
    },
    description: 'Cash assistance for institutional delivery',
    documents: ['Aadhaar', 'Pregnancy certificate', 'BPL card (if applicable)'],
    level: 'National',
    ministry: 'Ministry of Health and Family Welfare',
    icon: '🤱',
    applicationProcess: 'Through ANM/ASHA workers',
    benefitType: 'Cash incentive for safe delivery'
  },
  {
    id: 'pradhan-mantri-matru-vandana-yojana',
    name: 'प्रधानमंत्री मातृ वंदना योजना',
    nameEn: 'Pradhan Mantri Matru Vandana Yojana',
    category: 'Maternal Support',
    amount: '₹5,000 in three installments',
    eligibility: {
      gender: 'female',
      condition: 'pregnant or lactating',
      ageLimit: { min: 19, max: null },
      childCount: 'first child',
      keywords: ['pregnancy', 'lactating', 'first child', 'women', 'गर्भवती', 'स्तनपान', 'गर्भधारणा', 'दूध पाजणे', 'पहिले बाळ']
    },
    description: 'Cash incentive for pregnant and lactating mothers',
    documents: ['Aadhaar', 'Bank account', 'Pregnancy certificate', 'Birth certificate'],
    level: 'National',
    ministry: 'Ministry of Women and Child Development',
    icon: '👶',
    applicationProcess: 'Through AWCs and health centers',
    benefitType: 'Direct cash transfer'
  },
  {
    id: 'national-health-mission',
    name: 'राष्ट्रीय स्वास्थ्य मिशन',
    nameEn: 'National Health Mission',
    category: 'Public Health',
    amount: 'Free healthcare services',
    eligibility: {
      demographics: ['rural', 'urban'],
      incomeCategory: ['all categories'],
      keywords: ['public health', 'healthcare', 'स्वास्थ्य सेवा', 'सार्वजनिक स्वास्थ्य', 'सार्वजनिक आरोग्य', 'आरोग्य सेवा']
    },
    description: 'Comprehensive healthcare services at grassroots level',
    documents: ['Aadhaar', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Health and Family Welfare',
    icon: '🩺',
    applicationProcess: 'Through government health facilities',
    benefitType: 'Free healthcare services'
  },
  {
    id: 'pradhan-mantri-surakshit-matritva-abhiyan',
    name: 'प्रधानमंत्री सुरक्षित मातृत्व अभियान',
    nameEn: 'Pradhan Mantri Surakshit Matritva Abhiyan',
    category: 'Maternal Healthcare',
    amount: 'Free comprehensive checkups',
    eligibility: {
      gender: 'female',
      condition: 'pregnant',
      gestationPeriod: 'second/third trimester',
      keywords: ['pregnancy checkup', 'maternal care', 'गर्भावस्था जांच', 'मातृ देखभाल', 'गर्भधारणा तपासणी', 'मातृत्व काळजी']
    },
    description: 'Comprehensive antenatal checkup on 9th of every month',
    documents: ['Aadhaar', 'Pregnancy card'],
    level: 'National',
    ministry: 'Ministry of Health and Family Welfare',
    icon: '🤰',
    applicationProcess: 'Through government health centers',
    benefitType: 'Free comprehensive checkups'
  },

  // HOUSING
  {
    id: 'pradhan-mantri-awas',
    name: 'प्रधानमंत्री आवास योजना',
    nameEn: 'Pradhan Mantri Awas Yojana',
    category: 'Housing',
    amount: 'Up to ₹2.5 Lakh subsidy',
    eligibility: {
      occupation: ['any'],
      incomeLimit: 1800000,
      houseOwnership: 'none',
      ageLimit: { min: 21, max: null },
      demographics: ['rural', 'urban'],
      familyComposition: ['nuclear family'],
      keywords: ['house', 'home', 'shelter', 'construction', 'housing', 'घर', 'मकान', 'आवास', 'निर्माण', 'घर', 'निवास', 'वास्तू']
    },
    description: 'Affordable housing scheme for economically weaker sections',
    documents: ['Aadhaar', 'Income certificate', 'Property documents', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Housing and Urban Affairs',
    icon: '🏠',
    applicationProcess: 'Online through PMAY portal',
    benefitType: 'Housing subsidy and loan'
  },
  {
    id: 'pradhan-mantri-awas-gramin',
    name: 'प्रधानमंत्री आवास योजना - ग्रामीण',
    nameEn: 'Pradhan Mantri Awas Yojana - Gramin',
    category: 'Rural Housing',
    amount: '₹1.2 Lakh (plain), ₹1.3 Lakh (hilly)',
    eligibility: {
      demographics: ['rural'],
      houseOwnership: 'none or kutcha house',
      incomeCategory: ['BPL', 'economically weaker'],
      keywords: ['rural housing', 'village', 'kutcha house', 'ग्रामीण आवास', 'गांव', 'ग्रामीण घर', 'गावठाण', 'कच्चे घर']
    },
    description: 'Pucca houses for rural homeless and kutcha house owners',
    documents: ['Aadhaar', 'Job card', 'Income certificate', 'Land documents'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '🏘️',
    applicationProcess: 'Through Gram Panchayat and online portal',
    benefitType: 'Housing construction assistance'
  },
  {
    id: 'credit-linked-subsidy-scheme',
    name: 'क्रेडिट लिंक्ड सब्सिडी स्कीम',
    nameEn: 'Credit Linked Subsidy Scheme',
    category: 'Housing Finance',
    amount: 'Interest subsidy up to ₹2.67 Lakh',
    eligibility: {
      incomeLimit: 1800000,
      loanAmount: { min: 600000, max: 1200000 },
      houseOwnership: 'first time buyer',
      keywords: ['home loan', 'interest subsidy', 'housing finance', 'होम लोन', 'ब्याज सब्सिडी', 'घर कर्ज', 'व्याज अनुदान', 'गृह वित्त']
    },
    description: 'Interest subsidy on home loans for middle income groups',
    documents: ['Income certificate', 'Property documents', 'Loan sanction letter', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Housing and Urban Affairs',
    icon: '🏡',
    applicationProcess: 'Through lending institutions',
    benefitType: 'Interest subsidy on home loans'
  },

  // EDUCATION
  {
    id: 'mid-day-meal',
    name: 'प्रधानमंत्री पोषण शक्ति निर्माण',
    nameEn: 'PM POSHAN (Mid Day Meal Scheme)',
    category: 'Education & Nutrition',
    amount: 'Free nutritious meals',
    eligibility: {
      ageLimit: { min: 6, max: 14 },
      education: 'enrolled in government/aided schools',
      demographics: ['rural', 'urban', 'semi-urban'],
      familyIncome: 'any',
      keywords: ['school', 'children', 'student', 'education', 'meal', 'nutrition', 'बच्चे', 'स्कूल', 'भोजन', 'शिक्षा', 'मुले', 'शाळा', 'जेवण', 'पोषण']
    },
    description: 'Nutritious cooked meals for school children',
    documents: ['School enrollment certificate', 'Aadhaar (child)'],
    level: 'National',
    ministry: 'Ministry of Education',
    icon: '🍽️',
    applicationProcess: 'Automatic enrollment through schools',
    benefitType: 'Free meals and nutrition support'
  },
  {
    id: 'sarva-shiksha-abhiyan',
    name: 'सर्व शिक्षा अभियान',
    nameEn: 'Sarva Shiksha Abhiyan',
    category: 'Elementary Education',
    amount: 'Free education and materials',
    eligibility: {
      ageLimit: { min: 6, max: 14 },
      demographics: ['rural', 'urban'],
      incomeCategory: ['all'],
      keywords: ['elementary education', 'free education', 'प्राथमिक शिक्षा', 'मुफ्त शिक्षा', 'प्राथमिक शिक्षण', 'मोफत शिक्षण']
    },
    description: 'Universalization of elementary education',
    documents: ['Birth certificate', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Education',
    icon: '📚',
    applicationProcess: 'Through schools and education department',
    benefitType: 'Free elementary education'
  },
  {
    id: 'national-scholarship-portal',
    name: 'राष्ट्रीय छात्रवृत्ति पोर्टल',
    nameEn: 'National Scholarship Portal',
    category: 'Education Financial Support',
    amount: 'Variable scholarships',
    eligibility: {
      education: 'various levels',
      meritBased: 'yes',
      incomeLimit: 'varies by scheme',
      socialCategory: ['SC', 'ST', 'OBC', 'Minority', 'General'],
      keywords: ['scholarship', 'education support', 'छात्रवृत्ति', 'शिक्षा सहायता', 'शिष्यवृत्ती', 'अभ्यास सहाय्य']
    },
    description: 'Various scholarships for students at different levels',
    documents: ['Academic certificates', 'Income certificate', 'Caste certificate', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Education',
    icon: '🎓',
    applicationProcess: 'Online through NSP portal',
    benefitType: 'Financial assistance for education'
  },
  {
    id: 'beti-bachao-beti-padhao',
    name: 'बेटी बचाओ बेटी पढ़ाओ',
    nameEn: 'Beti Bachao Beti Padhao',
    category: 'Girl Child Education',
    amount: 'Various incentives and support',
    eligibility: {
      gender: 'female',
      ageLimit: { min: 0, max: 21 },
      demographics: ['rural', 'urban'],
      keywords: ['girl child', 'education', 'women empowerment', 'बालिका', 'महिला सशक्तिकरण', 'मुलगी', 'महिला सक्षमीकरण']
    },
    description: 'Save and educate girl child initiative',
    documents: ['Birth certificate', 'Aadhaar', 'School enrollment'],
    level: 'National',
    ministry: 'Ministry of Women and Child Development',
    icon: '👧',
    applicationProcess: 'Through various implementing agencies',
    benefitType: 'Comprehensive support for girl child'
  },
  {
    id: 'digital-india-e-learning',
    name: 'डिजिटल इंडिया ई-लर्निंग',
    nameEn: 'Digital India E-Learning',
    category: 'Digital Education',
    amount: 'Free digital resources',
    eligibility: {
      demographics: ['rural', 'urban'],
      ageLimit: { min: 6, max: null },
      keywords: ['digital education', 'e-learning', 'technology', 'डिजिटल शिक्षा', 'ऑनलाइन पढ़ाई', 'डिजिटल शिक्षण', 'ऑनलाइन अभ्यास']
    },
    description: 'Digital learning platforms and resources',
    documents: ['Aadhaar', 'Educational qualification proof'],
    level: 'National',
    ministry: 'Ministry of Education',
    icon: '💻',
    applicationProcess: 'Through digital platforms and apps',
    benefitType: 'Free access to digital education'
  },

  // ENERGY & FUEL
  {
    id: 'ujjwala',
    name: 'प्रधानमंत्री उज्ज्वला योजना',
    nameEn: 'Pradhan Mantri Ujjwala Yojana',
    category: 'Energy',
    amount: 'Free LPG connection + ₹1,600 support',
    eligibility: {
      gender: 'female',
      occupation: ['any'],
      incomeCategory: ['BPL', 'APL with conditions'],
      demographics: ['rural', 'urban', 'semi-urban'],
      ageLimit: { min: 18, max: null },
      keywords: ['cooking', 'gas', 'LPG', 'women', 'clean fuel', 'खाना', 'गैस', 'महिला', 'ईंधन', 'स्वयंपाक', 'गॅस', 'स्वच्छ इंधन']
    },
    description: 'Free LPG connections to women from BPL households',
    documents: ['Aadhaar', 'BPL certificate', 'Bank account', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Petroleum and Natural Gas',
    icon: '🔥',
    applicationProcess: 'Through LPG distributors',
    benefitType: 'Free LPG connection and support'
  },
  {
    id: 'solar-rooftop-scheme',
    name: 'सोलर रूफटॉप योजना',
    nameEn: 'Solar Rooftop Scheme',
    category: 'Renewable Energy',
    amount: 'Up to 40% subsidy',
    eligibility: {
      houseOwnership: 'required',
      roofSpace: 'adequate',
      demographics: ['urban', 'rural'],
      keywords: ['solar energy', 'renewable energy', 'rooftop', 'सौर ऊर्जा', 'नवीकरणीय ऊर्जा', 'सौर उर्जा', 'नूतनीकरणयोग्य उर्जा']
    },
    description: 'Solar power generation through rooftop installations',
    documents: ['Property ownership proof', 'Electricity bill', 'Aadhaar', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of New and Renewable Energy',
    icon: '☀️',
    applicationProcess: 'Through DISCOMs and online portal',
    benefitType: 'Subsidy for solar installation'
  },
  {
    id: 'pahal-dbtl',
    name: 'पहल (DBTL) योजना',
    nameEn: 'PAHAL (DBTL) Scheme',
    category: 'LPG Subsidy',
    amount: 'Direct LPG subsidy transfer',
    eligibility: {
      lpgConnection: 'active',
      bankAccount: 'linked with Aadhaar',
      keywords: ['LPG subsidy', 'direct transfer', 'एलपीजी सब्सिडी', 'प्रत्यक्ष हस्तांतरण', 'गॅस अनुदान', 'थेट हस्तांतरण']
    },
    description: 'Direct benefit transfer of LPG subsidy to bank accounts',
    documents: ['Aadhaar', 'Bank account', 'LPG connection proof'],
    level: 'National',
    ministry: 'Ministry of Petroleum and Natural Gas',
    icon: '💰',
    applicationProcess: 'Through LPG distributors and banks',
    benefitType: 'Direct subsidy transfer'
  },

  // FINANCIAL INCLUSION
  {
    id: 'jan-dhan',
    name: 'प्रधानमंत्री जन धन योजना',
    nameEn: 'Pradhan Mantri Jan Dhan Yojana',
    category: 'Financial Inclusion',
    amount: '₹10,000 overdraft facility + Insurance',
    eligibility: {
      bankAccount: 'none',
      ageLimit: { min: 10, max: null },
      demographics: ['rural', 'urban', 'semi-urban'],
      incomeLimit: null,
      keywords: ['bank account', 'savings', 'financial', 'money', 'banking', 'बैंक', 'खाता', 'पैसा', 'वित्तीय', 'बँक', 'बचत', 'आर्थिक']
    },
    description: 'Zero balance bank accounts with insurance and overdraft',
    documents: ['Aadhaar', 'Address proof', 'Identity proof'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '🏦',
    applicationProcess: 'Through participating banks',
    benefitType: 'Banking services and insurance'
  },
  {
    id: 'pradhan-mantri-mudra-yojana',
    name: 'प्रधानमंत्री मुद्रा योजना',
    nameEn: 'Pradhan Mantri MUDRA Yojana',
    category: 'Micro Finance',
    amount: 'Up to ₹10 Lakh loan',
    eligibility: {
      occupation: ['micro enterprise', 'small business', 'entrepreneur'],
      businessType: 'non-corporate, non-farm',
      demographics: ['rural', 'urban', 'semi-urban'],
      keywords: ['micro finance', 'small business', 'entrepreneur', 'loan', 'सूक्ष्म वित्त', 'छोटा धंधा', 'उद्यमी', 'ऋण', 'सूक्ष्म वित्त', 'लहान धंदा', 'उद्योजक']
    },
    description: 'Micro finance for small business and entrepreneurship',
    documents: ['Aadhaar', 'Business plan', 'Income proof', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '💼',
    applicationProcess: 'Through banks and MFIs',
    benefitType: 'Micro credit facility'
  },
  {
    id: 'atal-pension-yojana',
    name: 'अटल पेंशन योजना',
    nameEn: 'Atal Pension Yojana',
    category: 'Pension',
    amount: '₹1,000 to ₹5,000 monthly pension',
    eligibility: {
      ageLimit: { min: 18, max: 40 },
      bankAccount: 'required',
      occupation: ['unorganized sector'],
      keywords: ['pension', 'retirement', 'old age security', 'पेंशन', 'सेवानिवृत्ति', 'वृद्धावस्था सुरक्षा', 'निवृत्तीवेतन', 'वृद्धत्व सुरक्षा']
    },
    description: 'Guaranteed pension scheme for unorganized sector workers',
    documents: ['Aadhaar', 'Bank account', 'Age proof'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '👴',
    applicationProcess: 'Through banks',
    benefitType: 'Guaranteed pension'
  },
  {
    id: 'pradhan-mantri-jeevan-jyoti-bima-yojana',
    name: 'प्रधानमंत्री जीवन ज्योति बीमा योजना',
    nameEn: 'Pradhan Mantri Jeevan Jyoti Bima Yojana',
    category: 'Life Insurance',
    amount: '₹2 Lakh life cover',
    eligibility: {
      ageLimit: { min: 18, max: 50 },
      bankAccount: 'required with auto-debit',
      premium: '₹330 per year',
      keywords: ['life insurance', 'death benefit', 'जीवन बीमा', 'मृत्यु लाभ', 'जीवन विमा', 'मृत्यू लाभ']
    },
    description: 'Life insurance scheme with affordable premium',
    documents: ['Aadhaar', 'Bank account', 'Consent for auto-debit'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '🛡️',
    applicationProcess: 'Through banks',
    benefitType: 'Life insurance coverage'
  },
  {
    id: 'pradhan-mantri-suraksha-bima-yojana',
    name: 'प्रधानमंत्री सुरक्षा बीमा योजना',
    nameEn: 'Pradhan Mantri Suraksha Bima Yojana',
    category: 'Accident Insurance',
    amount: '₹2 Lakh accident cover',
    eligibility: {
      ageLimit: { min: 18, max: 70 },
      bankAccount: 'required with auto-debit',
      premium: '₹12 per year',
      keywords: ['accident insurance', 'disability cover', 'दुर्घटना बीमा', 'विकलांगता कवर', 'अपघात विमा', 'अपंगत्व संरक्षण']
    },
    description: 'Accident insurance scheme with minimal premium',
    documents: ['Aadhaar', 'Bank account', 'Consent for auto-debit'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '🚑',
    applicationProcess: 'Through banks',
    benefitType: 'Accident insurance coverage'
  },

  // EMPLOYMENT & SKILL DEVELOPMENT
  {
    id: 'mahatma-gandhi-nrega',
    name: 'महात्मा गांधी नरेगा',
    nameEn: 'Mahatma Gandhi NREGA',
    category: 'Employment Guarantee',
    amount: 'State-wise minimum wages',
    eligibility: {
      demographics: ['rural'],
      ageLimit: { min: 18, max: null },
      workDays: '100 days per household per year',
      keywords: ['employment guarantee', 'rural employment', 'wage employment', 'रोजगार गारंटी', 'ग्रामीण रोजगार', 'रोजगार हमी', 'ग्रामीण काम']
    },
    description: 'Employment guarantee scheme for rural households',
    documents: ['Job card', 'Aadhaar', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '👷',
    applicationProcess: 'Through Gram Panchayat',
    benefitType: 'Guaranteed wage employment'
  },
  {
    id: 'pradhan-mantri-kaushal-vikas-yojana',
    name: 'प्रधानमंत्री कौशल विकास योजना',
    nameEn: 'Pradhan Mantri Kaushal Vikas Yojana',
    category: 'Skill Development',
    amount: 'Free skill training + monetary rewards',
    eligibility: {
      ageLimit: { min: 15, max: 35 },
      education: 'school dropout or seeking employment',
      demographics: ['rural', 'urban'],
      keywords: ['skill development', 'vocational training', 'employment', 'कौशल विकास', 'व्यावसायिक प्रशिक्षण', 'रोजगार', 'कौशल्य विकास', 'व्यावसायिक प्रशिक्षण']
    },
    description: 'Skill development and vocational training program',
    documents: ['Aadhaar', 'Educational certificates', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Skill Development and Entrepreneurship',
    icon: '🔧',
    applicationProcess: 'Through training centers and online portal',
    benefitType: 'Free skill training and certification'
  },
  {
    id: 'deen-dayal-upadhyaya-grameen-kaushalya-yojana',
    name: 'दीन दयाल उपाध्याय ग्रामीण कौशल्य योजना',
    nameEn: 'Deen Dayal Upadhyaya Grameen Kaushalya Yojana',
    category: 'Rural Skill Development',
    amount: 'Free training + placement assistance',
    eligibility: {
      demographics: ['rural'],
      ageLimit: { min: 15, max: 35 },
      incomeCategory: ['poor rural families'],
      keywords: ['rural skill', 'placement', 'ग्रामीण कौशल', 'नियुक्ति सहायता', 'ग्रामीण कौशल्य', 'नोकरी मिळवणे']
    },
    description: 'Placement linked skill development for rural youth',
    documents: ['Aadhaar', 'Income certificate', 'Educational documents'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '🎯',
    applicationProcess: 'Through project implementing agencies',
    benefitType: 'Skill training with placement guarantee'
  },
  {
    id: 'stand-up-india',
    name: 'स्टैंड अप इंडिया योजना',
    nameEn: 'Stand Up India Scheme',
    category: 'Entrepreneurship',
    amount: '₹10 Lakh to ₹1 Crore loan',
    eligibility: {
      socialCategory: ['SC', 'ST', 'Women'],
      businessType: 'greenfield enterprise',
      ageLimit: { min: 18, max: null },
      keywords: ['entrepreneurship', 'women entrepreneur', 'SC/ST business', 'उद्यमिता', 'महिला उद्यमी', 'उद्योजकता', 'महिला उद्योजक']
    },
    description: 'Bank loans for SC/ST and women entrepreneurs',
    documents: ['Aadhaar', 'Caste certificate', 'Business plan', 'Educational certificates'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '🚀',
    applicationProcess: 'Through banks and online portal',
    benefitType: 'Entrepreneurship loan with handholding support'
  },
  {
    id: 'startup-india',
    name: 'स्टार्टअप इंडिया योजना',
    nameEn: 'Startup India Scheme',
    category: 'Startup Support',
    amount: 'Various incentives and support',
    eligibility: {
      businessAge: 'less than 10 years',
      businessType: 'innovative startup',
      turnover: 'less than ₹100 crore',
      keywords: ['startup', 'innovation', 'entrepreneur', 'technology', 'स्टार्टअप', 'नवाचार', 'उद्यमी', 'तकनीक', 'नाविन्यपूर्ण', 'तंत्रज्ञान']
    },
    description: 'Support ecosystem for startups and innovation',
    documents: ['Incorporation certificate', 'Business plan', 'Patent/IP documents'],
    level: 'National',
    ministry: 'Ministry of Commerce and Industry',
    icon: '💡',
    applicationProcess: 'Through Startup India portal',
    benefitType: 'Tax benefits, funding support, and mentorship'
  },

  // SOCIAL SECURITY & WELFARE
  {
    id: 'national-social-assistance-programme',
    name: 'राष्ट्रीय सामाजिक सहायता कार्यक्रम',
    nameEn: 'National Social Assistance Programme',
    category: 'Social Security',
    amount: 'Variable assistance',
    eligibility: {
      specialConditions: ['elderly', 'widow', 'disabled', 'BPL'],
      demographics: ['rural', 'urban'],
      keywords: ['social security', 'pension', 'disability', 'सामाजिक सुरक्षा', 'पेंशन', 'विकलांगता', 'सामाजिक सुरक्षा', 'निवृत्तीवेतन', 'अपंगत्व']
    },
    description: 'Social assistance for vulnerable sections',
    documents: ['Aadhaar', 'BPL certificate', 'Age/disability proof', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '🤝',
    applicationProcess: 'Through state governments and Panchayats',
    benefitType: 'Monthly financial assistance'
  },
  {
    id: 'sukanya-samriddhi-yojana',
    name: 'सुकन्या समृद्धि योजना',
    nameEn: 'Sukanya Samriddhi Yojana',
    category: 'Girl Child Savings',
    amount: 'High interest savings account',
    eligibility: {
      gender: 'female',
      ageLimit: { min: 0, max: 10 },
      accountLimit: 'maximum 2 per family',
      keywords: ['girl child', 'savings', 'education', 'marriage', 'बालिका', 'बचत', 'शिक्षा', 'विवाह', 'मुलगी', 'बचत', 'शिक्षण', 'लग्न']
    },
    description: 'Savings scheme for girl child education and marriage',
    documents: ['Birth certificate of girl child', 'Aadhaar of parents', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '👧',
    applicationProcess: 'Through banks and post offices',
    benefitType: 'High interest savings with tax benefits'
  },
  {
    id: 'national-rural-livelihoods-mission',
    name: 'राष्ट्रीय ग्रामीण आजीविका मिशन',
    nameEn: 'National Rural Livelihoods Mission',
    category: 'Rural Livelihoods',
    amount: 'Various support for livelihoods',
    eligibility: {
      demographics: ['rural'],
      incomeCategory: ['poor and vulnerable'],
      organizationType: 'self-help groups',
      keywords: ['livelihoods', 'self help groups', 'rural development', 'आजीविका', 'स्वयं सहायता समूह', 'ग्रामीण विकास', 'उपजीविका', 'स्वयंसहाय्यता गट']
    },
    description: 'Promote diversified and gainful self-employment',
    documents: ['Aadhaar', 'BPL certificate', 'SHG membership proof'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '🌱',
    applicationProcess: 'Through state rural livelihoods missions',
    benefitType: 'Credit, capacity building, and market linkages'
  },
  {
    id: 'pradhan-mantri-fasal-bima-yojana',
    name: 'प्रधानमंत्री फसल बीमा योजना',
    nameEn: 'Pradhan Mantri Fasal Bima Yojana',
    category: 'Crop Insurance',
    amount: 'Full crop insurance coverage',
    eligibility: {
      occupation: ['farmer'],
      landType: ['owner', 'tenant', 'sharecropper'],
      cropType: 'notified crops',
      keywords: ['crop insurance', 'natural calamity', 'weather', 'फसल बीमा', 'प्राकृतिक आपदा', 'मौसम', 'पीक विमा', 'नैसर्गिक आपत्ती', 'हवामान']
    },
    description: 'Comprehensive crop insurance against natural calamities',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Sowing certificate'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🌾',
    applicationProcess: 'Through banks, CSCs, and insurance companies',
    benefitType: 'Crop loss compensation'
  },

  // URBAN DEVELOPMENT
  {
    id: 'swachh-bharat-mission',
    name: 'स्वच्छ भारत मिशन',
    nameEn: 'Swachh Bharat Mission',
    category: 'Sanitation',
    amount: '₹12,000 for household toilet',
    eligibility: {
      toiletAccess: 'none',
      demographics: ['rural', 'urban'],
      keywords: ['sanitation', 'toilet', 'cleanliness', 'hygiene', 'स्वच्छता', 'शौचालय', 'साफ-सफाई', 'स्वच्छता', 'शौचालय', 'स्वच्छतेचे']
    },
    description: 'Clean India mission focusing on sanitation and hygiene',
    documents: ['Aadhaar', 'Bank account', 'House ownership proof'],
    level: 'National',
    ministry: 'Ministry of Jal Shakti',
    icon: '🚽',
    applicationProcess: 'Through Gram Panchayat and urban local bodies',
    benefitType: 'Financial assistance for toilet construction'
  },
  {
    id: 'jal-jeevan-mission',
    name: 'जल जीवन मिशन',
    nameEn: 'Jal Jeevan Mission',
    category: 'Water Supply',
    amount: 'Piped water connection',
    eligibility: {
      waterAccess: 'no piped water connection',
      demographics: ['rural'],
      keywords: ['water supply', 'piped water', 'drinking water', 'जल आपूर्ति', 'पेयजल', 'नल कनेक्शन', 'जल पुरवठा', 'पिण्याचे पाणी', 'नळ जोडणी']
    },
    description: 'Piped water supply to every rural household',
    documents: ['Aadhaar', 'Address proof', 'House ownership documents'],
    level: 'National',
    ministry: 'Ministry of Jal Shakti',
    icon: '💧',
    applicationProcess: 'Through Gram Panchayat',
    benefitType: 'Functional household tap connection'
  },
  {
    id: 'smart-cities-mission',
    name: 'स्मार्ट सिटीज मिशन',
    nameEn: 'Smart Cities Mission',
    category: 'Urban Development',
    amount: 'Infrastructure development',
    eligibility: {
      demographics: ['urban'],
      cityType: 'selected smart cities',
      keywords: ['smart city', 'urban development', 'infrastructure', 'technology', 'स्मार्ट सिटी', 'शहरी विकास', 'अवसंरचना', 'स्मार्ट शहर', 'शहरी विकास', 'पायाभूत सुविधा']
    },
    description: 'Sustainable and inclusive urban development',
    documents: ['Residency proof', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Housing and Urban Affairs',
    icon: '🏙️',
    applicationProcess: 'Through city administration',
    benefitType: 'Improved urban infrastructure and services'
  },
  {
    id: 'atal-mission-for-rejuvenation',
    name: 'अटल मिशन फॉर रिज्यूवेनेशन',
    nameEn: 'Atal Mission for Rejuvenation',
    category: 'Urban Transformation',
    amount: 'City transformation fund',
    eligibility: {
      demographics: ['urban'],
      cityPopulation: 'less than 1 million',
      keywords: ['urban transformation', 'infrastructure', 'city development', 'शहरी कायाकल्प', 'अवसंरचना', 'शहर विकास', 'शहरी बदल', 'पायाभूत सुविधा']
    },
    description: 'Urban transformation of cities',
    documents: ['Residency proof', 'Municipal records'],
    level: 'National',
    ministry: 'Ministry of Housing and Urban Affairs',
    icon: '🌆',
    applicationProcess: 'Through state governments and ULBs',
    benefitType: 'Improved urban infrastructure'
  },

  // TRANSPORTATION
  {
    id: 'pradhan-mantri-gram-sadak-yojana',
    name: 'प्रधानमंत्री ग्राम सड़क योजना',
    nameEn: 'Pradhan Mantri Gram Sadak Yojana',
    category: 'Rural Roads',
    amount: 'All-weather road connectivity',
    eligibility: {
      demographics: ['rural'],
      habitationType: 'unconnected habitations',
      keywords: ['rural roads', 'connectivity', 'infrastructure', 'ग्रामीण सड़क', 'कनेक्टिविटी', 'अवसंरचना', 'ग्रामीण रस्ते', 'जोडणी', 'पायाभूत सुविधा']
    },
    description: 'All-weather road connectivity to rural areas',
    documents: ['Village identification documents'],
    level: 'National',
    ministry: 'Ministry of Rural Development',
    icon: '🛣️',
    applicationProcess: 'Through state governments and NRRDA',
    benefitType: 'Road connectivity and maintenance'
  },
  {
    id: 'faster-adoption-electric-vehicles',
    name: 'फास्टर एडॉप्शन इलेक्ट्रिक व्हीकल्स',
    nameEn: 'Faster Adoption of Electric Vehicles',
    category: 'Electric Mobility',
    amount: 'Subsidy up to ₹1.5 Lakh',
    eligibility: {
      vehicleType: 'electric vehicles',
      purchaseType: 'new vehicle',
      keywords: ['electric vehicle', 'subsidy', 'pollution', 'environment', 'इलेक्ट्रिक वाहन', 'सब्सिडी', 'प्रदूषण', 'पर्यावरण', 'विद्युत वाहन', 'अनुदान']
    },
    description: 'Promotion of electric and hybrid vehicles',
    documents: ['Aadhaar', 'Driving license', 'Vehicle purchase invoice'],
    level: 'National',
    ministry: 'Ministry of Heavy Industries',
    icon: '🔋',
    applicationProcess: 'Through vehicle dealers and online portal',
    benefitType: 'Purchase incentive for electric vehicles'
  },

  // WOMEN & CHILD DEVELOPMENT
  {
    id: 'integrated-child-development-services',
    name: 'एकीकृत बाल विकास सेवा',
    nameEn: 'Integrated Child Development Services',
    category: 'Child Development',
    amount: 'Free services and nutrition',
    eligibility: {
      ageLimit: { min: 0, max: 6 },
      demographics: ['rural', 'urban'],
      maternalStatus: 'pregnant and lactating mothers',
      keywords: ['child development', 'nutrition', 'immunization', 'बाल विकास', 'पोषण', 'टीकाकरण', 'बाल विकास', 'पोषण', 'लसीकरण']
    },
    description: 'Comprehensive package for children and mothers',
    documents: ['Birth certificate', 'Aadhaar of mother', 'Health records'],
    level: 'National',
    ministry: 'Ministry of Women and Child Development',
    icon: '👶',
    applicationProcess: 'Through Anganwadi centers',
    benefitType: 'Nutrition, health, and education services'
  },
  {
    id: 'pradhan-mantri-matru-vandana-yojana',
    name: 'प्रधानमंत्री मातृ वंदना योजना',
    nameEn: 'Pradhan Mantri Matru Vandana Yojana',
    category: 'Maternal Benefits',
    amount: '₹5,000 in installments',
    eligibility: {
      gender: 'female',
      condition: 'pregnant and lactating',
      ageLimit: { min: 19, max: null },
      childOrder: 'first living child',
      keywords: ['maternity benefit', 'pregnancy', 'lactation', 'मातृत्व लाभ', 'गर्भावस्था', 'स्तनपान', 'मातृत्व फायदा', 'गर्भधारणा', 'दूध पाजणे']
    },
    description: 'Cash incentive for pregnant and lactating mothers',
    documents: ['Aadhaar', 'Bank account', 'MCP card', 'Institutional delivery proof'],
    level: 'National',
    ministry: 'Ministry of Women and Child Development',
    icon: '🤱',
    applicationProcess: 'Through Anganwadi centers and health facilities',
    benefitType: 'Direct cash transfer'
  },
  {
    id: 'one-stop-centre-scheme',
    name: 'वन स्टॉप सेंटर योजना',
    nameEn: 'One Stop Centre Scheme',
    category: 'Women Safety',
    amount: 'Free support services',
    eligibility: {
      gender: 'female',
      condition: 'affected by violence',
      demographics: ['rural', 'urban'],
      keywords: ['women safety', 'violence', 'support', 'counseling', 'महिला सुरक्षा', 'हिंसा', 'सहायता', 'परामर्श', 'महिला सुरक्षा', 'हिंसाचार', 'मदत', 'सल्ला']
    },
    description: 'Integrated support and assistance to women affected by violence',
    documents: ['Identity proof', 'FIR copy (if applicable)'],
    level: 'National',
    ministry: 'Ministry of Women and Child Development',
    icon: '🚨',
    applicationProcess: 'Direct walk-in or through helpline',
    benefitType: 'Integrated support services'
  },

  // TRIBAL DEVELOPMENT
  {
    id: 'van-dhan-vikas-yojana',
    name: 'वन धन विकास योजना',
    nameEn: 'Van Dhan Vikas Yojana',
    category: 'Tribal Development',
    amount: 'Up to ₹15 Lakh per cluster',
    eligibility: {
      socialCategory: ['ST'],
      occupation: ['tribal forest dwellers'],
      demographics: ['forest areas'],
      keywords: ['tribal development', 'forest produce', 'livelihood', 'आदिवासी विकास', 'वन उत्पाद', 'आजीविका', 'आदिवासी विकास', 'वन उत्पादने', 'उपजीविका']
    },
    description: 'Value addition to tribal forest produce',
    documents: ['ST certificate', 'Aadhaar', 'Forest rights certificate'],
    level: 'National',
    ministry: 'Ministry of Tribal Affairs',
    icon: '🌳',
    applicationProcess: 'Through TRIFED and state agencies',
    benefitType: 'Infrastructure and skill development support'
  },
  {
    id: 'eklavya-model-residential-schools',
    name: 'एकलव्य मॉडल आवासीय विद्यालय',
    nameEn: 'Eklavya Model Residential Schools',
    category: 'Tribal Education',
    amount: 'Free quality education and boarding',
    eligibility: {
      socialCategory: ['ST'],
      ageLimit: { min: 6, max: 18 },
      demographics: ['tribal areas'],
      keywords: ['tribal education', 'residential school', 'quality education', 'आदिवासी शिक्षा', 'आवासीय विद्यालय', 'गुणवत्तापूर्ण शिक्षा', 'आदिवासी शिक्षण', 'निवासी शाळा']
    },
    description: 'Quality education for tribal children in residential setting',
    documents: ['ST certificate', 'Birth certificate', 'Income certificate'],
    level: 'National',
    ministry: 'Ministry of Tribal Affairs',
    icon: '🏫',
    applicationProcess: 'Through school admission process',
    benefitType: 'Free quality education with boarding'
  },

  // DISABLED WELFARE
  {
    id: 'accessible-india-campaign',
    name: 'सुगम्य भारत अभियान',
    nameEn: 'Accessible India Campaign',
    category: 'Disability Support',
    amount: 'Accessibility infrastructure',
    eligibility: {
      disabilityStatus: 'persons with disabilities',
      demographics: ['urban', 'rural'],
      keywords: ['accessibility', 'disability', 'barrier free', 'सुगम्यता', 'विकलांगता', 'बाधा मुक्त', 'प्रवेशयोग्यता', 'अपंगत्व', 'अडथळामुक्त']
    },
    description: 'Universal accessibility for persons with disabilities',
    documents: ['Disability certificate', 'Aadhaar'],
    level: 'National',
    ministry: 'Ministry of Social Justice and Empowerment',
    icon: '♿',
    applicationProcess: 'Through implementing agencies',
    benefitType: 'Accessibility infrastructure and services'
  },
  {
    id: 'deendayal-disabled-rehabilitation-scheme',
    name: 'दीनदयाल विकलांग पुनर्वास योजना',
    nameEn: 'Deendayal Disabled Rehabilitation Scheme',
    category: 'Disability Rehabilitation',
    amount: 'Financial assistance for rehabilitation',
    eligibility: {
      disabilityStatus: 'persons with disabilities',
      disabilityPercentage: 'minimum 40%',
      demographics: ['rural', 'urban'],
      keywords: ['disability rehabilitation', 'assistive devices', 'विकलांग पुनर्वास', 'सहायक उपकरण', 'अपंगत्व पुनर्वसन', 'सहाय्यक साधने']
    },
    description: 'Rehabilitation services and assistive devices for disabled persons',
    documents: ['Disability certificate', 'Aadhaar', 'Income certificate', 'Medical reports'],
    level: 'National',
    ministry: 'Ministry of Social Justice and Empowerment',
    icon: '🦽',
    applicationProcess: 'Through NGOs and rehabilitation centers',
    benefitType: 'Rehabilitation services and assistive devices'
  },

  // MINORITY WELFARE
  {
    id: 'pradhan-mantri-jan-vikas-karyakram',
    name: 'प्रधानमंत्री जन विकास कार्यक्रम',
    nameEn: 'Pradhan Mantri Jan Vikas Karyakram',
    category: 'Minority Development',
    amount: 'Infrastructure development in minority areas',
    eligibility: {
      demographics: ['minority concentration areas'],
      minorityPopulation: 'substantial minority population',
      keywords: ['minority development', 'infrastructure', 'अल्पसंख्यक विकास', 'अवसंरचना', 'अल्पसंख्याक विकास', 'पायाभूत सुविधा']
    },
    description: 'Development of socio-economic infrastructure in minority areas',
    documents: ['Area identification certificate', 'Project proposal'],
    level: 'National',
    ministry: 'Ministry of Minority Affairs',
    icon: '🏘️',
    applicationProcess: 'Through state governments and implementing agencies',
    benefitType: 'Infrastructure development'
  },
  {
    id: 'maulana-azad-national-fellowship',
    name: 'मौलाना अज़ाद राष्ट्रीय फेलोशिप',
    nameEn: 'Maulana Azad National Fellowship',
    category: 'Minority Education',
    amount: '₹25,000 to ₹28,000 per month',
    eligibility: {
      socialCategory: ['minority communities'],
      education: 'pursuing higher education (M.Phil/Ph.D)',
      meritBased: 'qualifying entrance exams',
      keywords: ['minority fellowship', 'higher education', 'research', 'अल्पसंख्यक छात्रवृत्ति', 'उच्च शिक्षा', 'अनुसंधान', 'अल्पसंख्याक फेलोशिप', 'संशोधन']
    },
    description: 'Fellowship for minority students in higher education',
    documents: ['Minority certificate', 'Educational certificates', 'Entrance exam scorecard'],
    level: 'National',
    ministry: 'Ministry of Minority Affairs',
    icon: '🎓',
    applicationProcess: 'Through UGC and participating universities',
    benefitType: 'Monthly fellowship and contingency grants'
  },

  // SENIOR CITIZEN WELFARE
  {
    id: 'national-programme-senior-citizens',
    name: 'राष्ट्रीय वरिष्ठ नागरिक कार्यक्रम',
    nameEn: 'National Programme for Senior Citizens',
    category: 'Senior Citizens',
    amount: 'Various welfare benefits',
    eligibility: {
      ageLimit: { min: 60, max: null },
      demographics: ['rural', 'urban'],
      keywords: ['senior citizens', 'elderly care', 'old age', 'वरिष्ठ नागरिक', 'बुजुर्ग देखभाल', 'वृद्धावस्था', 'ज्येष्ठ नागरिक', 'वृद्ध काळजी']
    },
    description: 'Welfare programmes for senior citizens',
    documents: ['Age proof', 'Aadhaar', 'Income certificate'],
    level: 'National',
    ministry: 'Ministry of Social Justice and Empowerment',
    icon: '👴',
    applicationProcess: 'Through state governments and NGOs',
    benefitType: 'Healthcare, recreation, and welfare services'
  },
  {
    id: 'senior-citizen-savings-scheme',
    name: 'वरिष्ठ नागरिक बचत योजना',
    nameEn: 'Senior Citizen Savings Scheme',
    category: 'Senior Citizen Finance',
    amount: 'High interest rate savings',
    eligibility: {
      ageLimit: { min: 60, max: null },
      depositLimit: { min: 1000, max: 1500000 },
      keywords: ['senior citizen savings', 'high interest', 'retirement planning', 'वरिष्ठ नागरिक बचत', 'उच्च ब्याज', 'सेवानिवृत्ति योजना', 'ज्येष्ठ नागरिक बचत']
    },
    description: 'High interest savings scheme for senior citizens',
    documents: ['Age proof', 'Aadhaar', 'Bank account', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Finance',
    icon: '💰',
    applicationProcess: 'Through banks and post offices',
    benefitType: 'High interest rate on savings'
  },

  // ENVIRONMENT & CLIMATE
  {
    id: 'national-clean-air-programme',
    name: 'राष्ट्रीय स्वच्छ वायु कार्यक्रम',
    nameEn: 'National Clean Air Programme',
    category: 'Environment',
    amount: 'Air quality improvement measures',
    eligibility: {
      demographics: ['cities with poor air quality'],
      applicationType: 'city-wide implementation',
      keywords: ['air pollution', 'clean air', 'environment', 'वायु प्रदूषण', 'स्वच्छ हवा', 'पर्यावरण', 'हवा प्रदूषण', 'स्वच्छ हवा', 'वातावरण']
    },
    description: 'Comprehensive plan to reduce air pollution',
    documents: ['City implementation plan'],
    level: 'National',
    ministry: 'Ministry of Environment, Forest and Climate Change',
    icon: '🌬️',
    applicationProcess: 'Through state pollution control boards',
    benefitType: 'Improved air quality and health benefits'
  },
  {
    id: 'green-india-mission',
    name: 'हरित भारत मिशन',
    nameEn: 'Green India Mission',
    category: 'Forestry',
    amount: 'Forest conservation and afforestation',
    eligibility: {
      landType: 'degraded forest land',
      participationType: 'community participation',
      keywords: ['afforestation', 'forest conservation', 'climate change', 'वनीकरण', 'वन संरक्षण', 'जलवायु परिवर्तन', 'वृक्षारोपण', 'वन संवर्धन']
    },
    description: 'Increase forest cover and improve ecosystem services',
    documents: ['Land records', 'Community consent', 'Environmental clearance'],
    level: 'National',
    ministry: 'Ministry of Environment, Forest and Climate Change',
    icon: '🌲',
    applicationProcess: 'Through state forest departments',
    benefitType: 'Environmental restoration and livelihood support'
  },

  // COOPERATIVE SECTOR
  {
    id: 'formation-promotion-fpos',
    name: 'FPO गठन और संवर्धन योजना',
    nameEn: 'Formation and Promotion of FPOs',
    category: 'Farmer Cooperatives',
    amount: 'Up to ₹18.50 Lakh support per FPO',
    eligibility: {
      occupation: ['farmer'],
      organizationType: 'farmer producer organization',
      membershipSize: 'minimum members as per guidelines',
      keywords: ['farmer producer organization', 'cooperative', 'collective farming', 'किसान उत्पादक संगठन', 'सहकारी', 'सामूहिक खेती', 'शेतकरी उत्पादक संघटना']
    },
    description: 'Support for formation and strengthening of FPOs',
    documents: ['FPO registration', 'Member list', 'Business plan', 'Bank account'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '🤝',
    applicationProcess: 'Through NABARD and implementing agencies',
    benefitType: 'Financial and technical support for FPOs'
  },

  // DISASTER MANAGEMENT
  {
    id: 'national-disaster-response-fund',
    name: 'राष्ट्रीय आपदा प्रतिक्रिया कोष',
    nameEn: 'National Disaster Response Fund',
    category: 'Disaster Relief',
    amount: 'Relief assistance as per norms',
    eligibility: {
      condition: 'affected by natural disasters',
      disasterType: 'cyclone, flood, drought, earthquake, etc.',
      demographics: ['rural', 'urban'],
      keywords: ['disaster relief', 'natural calamity', 'emergency assistance', 'आपदा राहत', 'प्राकृतिक आपदा', 'आपातकालीन सहायता', 'आपत्ती मदत', 'नैसर्गिक आपत्ती']
    },
    description: 'Relief assistance for natural disaster victims',
    documents: ['Disaster damage certificate', 'Aadhaar', 'Bank account', 'Loss assessment report'],
    level: 'National',
    ministry: 'Ministry of Home Affairs',
    icon: '🆘',
    applicationProcess: 'Through district administration and revenue officials',
    benefitType: 'Financial relief and rehabilitation assistance'
  },

  // DIGITAL INITIATIVES
  {
    id: 'digital-india-programme',
    name: 'डिजिटल इंडिया कार्यक्रम',
    nameEn: 'Digital India Programme',
    category: 'Digital Infrastructure',
    amount: 'Digital services and infrastructure',
    eligibility: {
      demographics: ['rural', 'urban'],
      serviceType: 'digital governance and services',
      keywords: ['digital services', 'e-governance', 'technology', 'डिजिटल सेवा', 'ई-गवर्नेंस', 'तकनीक', 'डिजिटल सेवा', 'ई-शासन', 'तंत्रज्ञान']
    },
    description: 'Transform India into digitally empowered society',
    documents: ['Aadhaar', 'Mobile number', 'Email ID'],
    level: 'National',
    ministry: 'Ministry of Electronics and IT',
    icon: '📱',
    applicationProcess: 'Through digital platforms and service centers',
    benefitType: 'Digital services and infrastructure access'
  },
  {
    id: 'bharatnet-programme',
    name: 'भारतनेट कार्यक्रम',
    nameEn: 'BharatNet Programme',
    category: 'Digital Connectivity',
    amount: 'High-speed internet connectivity',
    eligibility: {
      demographics: ['rural'],
      locationType: 'gram panchayats',
      keywords: ['internet connectivity', 'broadband', 'digital divide', 'इंटरनेट कनेक्टिविटी', 'ब्रॉडबैंड', 'डिजिटल विभाजन', 'इंटरनेट जोडणी', 'डिजिटल फरक']
    },
    description: 'High-speed internet connectivity to rural areas',
    documents: ['Gram Panchayat identification'],
    level: 'National',
    ministry: 'Ministry of Electronics and IT',
    icon: '🌐',
    applicationProcess: 'Through BharatNet implementation agencies',
    benefitType: 'High-speed internet access'
  },

  // FOOD SECURITY
  {
    id: 'national-food-security-act',
    name: 'राष्ट्रीय खाद्य सुरक्षा अधिनियम',
    nameEn: 'National Food Security Act',
    category: 'Food Security',
    amount: 'Subsidized food grains',
    eligibility: {
      incomeCategory: ['AAY', 'BPL', 'PHH'],
      rationCard: 'valid ration card',
      demographics: ['rural', 'urban'],
      keywords: ['food security', 'ration', 'subsidized food', 'खाद्य सुरक्षा', 'राशन', 'सब्सिडी वाला खाना', 'अन्न सुरक्षा', 'रेशन', 'अनुदानीत अन्न']
    },
    description: 'Subsidized food grains through public distribution system',
    documents: ['Ration card', 'Aadhaar', 'Income certificate', 'Address proof'],
    level: 'National',
    ministry: 'Ministry of Consumer Affairs, Food and Public Distribution',
    icon: '🍚',
    applicationProcess: 'Through Fair Price Shops',
    benefitType: 'Subsidized food grains'
  },
  {
    id: 'antyodaya-anna-yojana',
    name: 'अंत्योदय अन्न योजना',
    nameEn: 'Antyodaya Anna Yojana',
    category: 'Food for Poorest',
    amount: '35 kg food grains per family per month',
    eligibility: {
      incomeCategory: ['poorest of poor'],
      familyType: ['destitute', 'disabled headed', 'widow headed'],
      keywords: ['poorest families', 'food grains', 'destitute', 'गरीबों में सबसे गरीब', 'खाद्यान्न', 'निराश्रित', 'गरिबांतील गरीब', 'अन्नधान्य']
    },
    description: 'Highly subsidized food grains for poorest families',
    documents: ['AAY ration card', 'Aadhaar', 'Income certificate', 'Family composition certificate'],
    level: 'National',
    ministry: 'Ministry of Consumer Affairs, Food and Public Distribution',
    icon: '🌾',
    applicationProcess: 'Through Fair Price Shops',
    benefitType: 'Highly subsidized food grains'
  }
];