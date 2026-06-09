// ============================================================
// QUESTIONNAIRE DATA
// Sources:
//   - Critical Thinking: Facione et al. (1994) CCTDI - adapted
//   - Confidence: Franklin et al. (2014) - NLN adapted
//   - Competence: Fahy et al. (2011)
// ============================================================

export const criticalThinkingItems = [
  { id: 'ct1', text: 'I try to anticipate potential problems before they occur in a clinical situation.' },
  { id: 'ct2', text: 'I look for connections between ideas when assessing a patient.' },
  { id: 'ct3', text: 'I question clinical information that does not seem to make sense.' },
  { id: 'ct4', text: 'I consider multiple perspectives before making a clinical decision.' },
  { id: 'ct5', text: 'I enjoy working through complex patient problems.' },
  { id: 'ct6', text: 'I am curious about what causes a patient\'s symptoms.' },
  { id: 'ct7', text: 'I evaluate the reliability of the clinical information I receive.' },
  { id: 'ct8', text: 'I think through the consequences of my clinical actions before acting.' },
  { id: 'ct9', text: 'I regularly reflect on how I could improve my clinical reasoning.' },
  { id: 'ct10', text: 'I can identify assumptions in clinical information given to me.' },
  { id: 'ct11', text: 'I look for evidence before drawing conclusions about a patient\'s condition.' },
  { id: 'ct12', text: 'I can prioritise patient care needs based on clinical urgency.' },
  { id: 'ct13', text: 'I revise my clinical judgement when new evidence is presented.' },
  { id: 'ct14', text: 'I am systematic when collecting patient assessment data.' },
  { id: 'ct15', text: 'I can distinguish between relevant and irrelevant clinical information.' },
  { id: 'ct16', text: 'I recognise when I need more information before making a clinical decision.' },
  { id: 'ct17', text: 'I consider the patient\'s perspective when planning care.' },
  { id: 'ct18', text: 'I can identify when a patient\'s condition is deteriorating.' },
  { id: 'ct19', text: 'I apply theoretical knowledge to practical clinical situations.' },
  { id: 'ct20', text: 'I am open to changing my approach when it is not working.' },
  { id: 'ct21', text: 'I recognise ethical dimensions in clinical situations.' },
  { id: 'ct22', text: 'I seek out additional learning when I encounter an unfamiliar condition.' },
  { id: 'ct23', text: 'I can interpret abnormal vital signs and respond appropriately.' },
  { id: 'ct24', text: 'I make clinical decisions based on evidence rather than habit.' },
  { id: 'ct25', text: 'I analyse my own clinical performance to identify areas for improvement.' },
  { id: 'ct26', text: 'I consider potential risks when carrying out clinical procedures.' },
  { id: 'ct27', text: 'I can communicate my clinical reasoning clearly to team members.' },
  { id: 'ct28', text: 'I persist in solving clinical problems even when they are difficult.' },
]

export const confidenceItems = [
  { id: 'conf1', text: 'I am confident in my ability to perform standard nursing procedures safely.' },
  { id: 'conf2', text: 'I feel prepared to respond appropriately in a clinical emergency.' },
  { id: 'conf3', text: 'I can communicate effectively with patients about their care.' },
  { id: 'conf4', text: 'I am confident in my ability to make clinical judgements under pressure.' },
  { id: 'conf5', text: 'I feel assured in my ability to assess a patient\'s condition accurately.' },
  { id: 'conf6', text: 'I am confident in reporting concerns about a patient to senior staff.' },
  { id: 'conf7', text: 'I feel prepared to work independently in a clinical setting.' },
  { id: 'conf8', text: 'I am confident in my ability to manage medication administration safely.' },
  { id: 'conf9', text: 'I feel ready to apply the clinical skills I have learned to real patients.' },
]

export const competenceItems = [
  { id: 'comp1', text: 'I can prepare the patient, equipment, and environment safely before carrying out a nursing procedure.' },
  { id: 'comp2', text: 'I consistently follow proper infection control and hand hygiene protocols.' },
  { id: 'comp3', text: 'I can accurately document procedure-related findings and nursing actions.' },
  { id: 'comp4', text: 'I can perform wound dressing procedures using the correct aseptic technique.' },
  { id: 'comp5', text: 'I can administer intramuscular medication safely using the correct dose, route, site, and technique.' },
  { id: 'comp6', text: 'I can identify appropriate intramuscular injection sites and manage sharps safely after injection.' },
  { id: 'comp7', text: 'I can safely insert and manage a nasogastric tube.' },
  { id: 'comp8', text: 'I can verify nasogastric tube placement and recognise possible complications.' },
  { id: 'comp9', text: 'I can respond appropriately when a patient develops difficulty during or after a procedure.' },
]

export const likertScale = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' },
]

export const allSections = [
  {
    id: 'critical_thinking',
    title: 'Section A: Critical Thinking',
    description: 'The following statements relate to your clinical reasoning and thinking skills. Please indicate the extent to which you agree with each statement.',
    items: criticalThinkingItems,
    color: '#1B4F72',
  },
  {
    id: 'confidence',
    title: 'Section B: Confidence',
    description: 'The following statements relate to your confidence in performing clinical tasks. Please indicate the extent to which you agree with each statement.',
    items: confidenceItems,
    color: '#17A589',
  },
  {
    id: 'competence',
    title: 'Section C: Competence',
    description: 'The following statements relate to your clinical competence. Please indicate the extent to which you agree with each statement.',
    items: competenceItems,
    color: '#28B463',
  },
]
