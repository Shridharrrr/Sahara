export const benefitSchemes = [
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
      keywords: ['farmer', 'agriculture', 'land', 'crop', 'farming', 'किसान', 'खेती', 'फसल', 'जमीन']
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
      keywords: ['health', 'medical', 'hospital', 'treatment', 'surgery', 'medicine', 'स्वास्थ्य', 'इलाज', 'अस्पताल', 'दवा']
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
      keywords: ['house', 'home', 'shelter', 'construction', 'housing', 'घर', 'मकान', 'आवास', 'निर्माण']
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
      keywords: ['cooking', 'gas', 'LPG', 'women', 'clean fuel', 'खाना', 'गैस', 'महिला', 'ईंधन']
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
      keywords: ['school', 'children', 'student', 'education', 'meal', 'nutrition', 'बच्चे', 'स्कूल', 'भोजन', 'शिक्षा']
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
      keywords: ['bank account', 'savings', 'financial', 'money', 'banking', 'बैंक', 'खाता', 'पैसा', 'वित्तीय']
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
      keywords: ['credit', 'loan', 'farming', 'agriculture', 'crop loan', 'किसान', 'ऋण', 'खेती', 'फसल']
    },
    description: 'Flexible credit facility for farmers agricultural needs',
    documents: ['Land records', 'Aadhaar', 'Bank account', 'Income proof'],
    level: 'National',
    ministry: 'Ministry of Agriculture',
    icon: '💳',
    applicationProcess: 'Through banks and cooperative societies',
    benefitType: 'Agricultural credit facility'
  }
];