// ============================================================
// CLINICAL PROCEDURES DATA
// Each procedure contains:
//   - YouTube reference videos (add real IDs in the videos array)
//   - Key clinical points for pre-simulation reading
//   - Branching simulation steps with scored options
//   - Verbal assessment checklist (for researcher use)
//
// HOW TO ADD YOUTUBE VIDEO IDs:
//   1. Go to YouTube and search the suggested query
//   2. Open a suitable educational video (NHS, WHO, NursingRN, etc.)
//   3. Copy the ID from the URL: youtube.com/watch?v=COPY_THIS_PART
//   4. Paste it into the videoId field below
// ============================================================

const allProcedures = [
{
    id: 'wound-dressing',
    title: 'Wound Dressing',
    icon: '🩹',
    duration: '20–25 mins',
    difficulty: 'Intermediate',
    description: 'Assess and dress a post-operative wound showing signs of infection using aseptic non-touch technique (ANTT).',
    learningObjectives: [
      'Assess a post-operative wound and identify signs of surgical site infection (SSI)',
      'Select appropriate antimicrobial dressing materials for an infected wound',
      'Perform wound dressing using correct aseptic non-touch technique (ANTT)',
      'Document findings accurately and escalate concerns using SBAR',
    ],
    videos: [
      {
        id: 'wd-v1',
        title: 'Wound Dressing Change — Aseptic Non-Touch Technique',
        videoId: null, // ADD YOUTUBE ID HERE — Search: "wound dressing change ANTT nursing technique"
        suggestedSearch: 'wound dressing change ANTT nursing technique',
        duration: '~8 mins',
        description: 'Demonstrates correct wound assessment, equipment preparation, and dressing change using ANTT.',
      },
      {
        id: 'wd-v2',
        title: 'Recognising Wound Infection — Clinical Signs',
        videoId: null, // ADD YOUTUBE ID HERE — Search: "recognising signs of wound infection nursing"
        suggestedSearch: 'signs of wound infection nursing clinical assessment',
        duration: '~5 mins',
        description: 'Covers the clinical signs of surgical site infection and how to document and report findings.',
      },
    ],
    keyPoints: [
      'Always perform ANTT — never let sterile items touch non-sterile surfaces',
      'Signs of infection: erythema, oedema, warmth, purulent exudate, pain (REAWP)',
      'Clean from wound centre outward using single strokes — never outside to inside',
      'Normal saline is the gold standard cleaning solution — NOT hydrogen peroxide or alcohol',
      'Check allergies before applying any antiseptic or adhesive product',
      'Document using the TIME framework: Tissue, Infection, Moisture, Edge',
      'Escalate SSI findings immediately using SBAR — do not wait for ward rounds',
    ],
    patient: {
      name: 'Kofi Mensah',
      age: 45,
      gender: 'Male',
      ward: 'Surgical Ward B, Bed 6',
      diagnosis: 'Post-operative Day 3 — Emergency Appendectomy',
      vitals: { BP: '128/82 mmHg', HR: '92 bpm', Temp: '37.9°C', RR: '18/min', SpO2: '97%' },
      allergies: 'Penicillin ⚠️',
      medications: ['Metronidazole 500mg IV TDS', 'Paracetamol 1g QDS PRN', 'Omeprazole 20mg OD'],
      nurseNote: 'Patient reports pain 6/10 at wound site. Dressing visibly soiled with yellowish discharge. Last dressing change 48 hours ago.',
    },
    steps: [
      {
        id: 1, stepTitle: 'Initial Approach',
        situation: 'You arrive at Mr. Mensah\'s bedside. He looks uncomfortable and points to his abdominal wound: "Sister, this is paining me more than yesterday." His dressing has a yellowish stain visible through it.',
        question: 'What is your FIRST priority action?',
        options: [
          { id: 'a', text: 'Immediately remove the soiled dressing to inspect the wound', isCorrect: false, points: 0, feedback: '❌ Removing the dressing without preparing your environment and equipment violates ANTT and risks introducing infection. Never begin a procedure without proper preparation.' },
          { id: 'b', text: 'Introduce yourself, perform hand hygiene, and explain the procedure to the patient', isCorrect: true, points: 2, feedback: '✅ Correct. Patient identification, informed consent, and hand hygiene are the non-negotiable first steps for any clinical procedure. Well done.' },
          { id: 'c', text: 'Call the doctor immediately because the wound looks infected', isCorrect: false, points: 1, feedback: '⚠️ Escalation may be needed — but only after you have done your own assessment. Go to the patient first, assess fully, then escalate with a complete SBAR report.' },
          { id: 'd', text: 'Check the medication chart and observation record first', isCorrect: false, points: 1, feedback: '⚠️ Reviewing records is important but should not precede acknowledging the patient. Greet the patient, get consent, perform hand hygiene — then review records if needed.' },
        ],
      },
      {
        id: 2, stepTitle: 'Equipment Preparation',
        situation: 'You have introduced yourself, explained the procedure, and obtained consent. You have performed hand hygiene. You are now at the dressing trolley gathering supplies.',
        question: 'Select the correct equipment list for this dressing change:',
        options: [
          { id: 'a', text: 'Dressing trolley, plain gauze, normal saline, tape, clinical waste bag', isCorrect: false, points: 0, feedback: '❌ Plain gauze is inappropriate for an infected wound — it sheds fibres and does not manage exudate. An antimicrobial or absorbent dressing is required.' },
          { id: 'b', text: 'Dressing trolley, sterile field, sterile gloves, antimicrobial dressing, normal saline, forceps, PPE (apron + gloves), clinical waste bag', isCorrect: true, points: 2, feedback: '✅ Correct. This is the complete set for ANTT wound care. The antimicrobial dressing is appropriate given suspected infection. PPE protects you from body fluids.' },
          { id: 'c', text: 'Clean gloves, cotton wool balls, hydrogen peroxide solution, dry bandage', isCorrect: false, points: 0, feedback: '❌ Three critical errors: (1) Hydrogen peroxide is cytotoxic — destroys healing tissue. (2) Cotton wool sheds fibres into wounds. (3) Clean gloves are not sterile — insufficient for wound care.' },
          { id: 'd', text: 'Sterile gloves, alcohol swabs, dry dressing, adhesive tape, sharps bin', isCorrect: false, points: 1, feedback: '⚠️ Incomplete and partly incorrect. Alcohol swabs damage wound tissue and are painful. A dry dressing is insufficient for an infected exuding wound.' },
        ],
      },
      {
        id: 3, stepTitle: 'Wound Assessment',
        situation: 'Using ANTT you carefully remove the soiled dressing. The wound is an 8cm midline abdominal incision. You observe: erythema 2cm around the wound edges, thick yellowish-green exudate, mild swelling, and two sutures that appear loose.',
        question: 'How do you interpret these findings and what is your plan?',
        options: [
          { id: 'a', text: 'This is normal post-operative healing — apply a new dry dressing and reassess in 24 hours', isCorrect: false, points: 0, feedback: '❌ These findings — purulent exudate, erythema, swelling, and loose sutures — are classic signs of Surgical Site Infection (SSI). This is NOT normal healing and requires immediate action.' },
          { id: 'b', text: 'Signs consistent with SSI. Clean the wound, apply antimicrobial dressing, report to doctor using SBAR, and document all findings', isCorrect: true, points: 2, feedback: '✅ Excellent clinical reasoning. You correctly identified SSI. Your plan is complete: clean → appropriate dressing → escalate → document. This is safe, evidence-based practice.' },
          { id: 'c', text: 'Clean the wound vigorously with hydrogen peroxide to kill the infection, then apply a tight bandage', isCorrect: false, points: 0, feedback: '❌ Dangerous on two counts: (1) Hydrogen peroxide destroys healing tissue. (2) A tight bandage restricts circulation and worsens swelling. Neither is part of evidence-based wound care.' },
          { id: 'd', text: 'Document the findings in the nursing notes and wait for the doctor\'s ward round', isCorrect: false, points: 1, feedback: '⚠️ Documentation is correct but passive waiting is not. SSI requires immediate wound care AND immediate escalation. Do not wait for ward rounds to act on a deteriorating wound.' },
        ],
      },
      {
        id: 4, stepTitle: 'Wound Cleaning Technique',
        situation: 'You have set up your sterile field. You must now clean the wound before applying the new dressing.',
        question: 'What is the correct wound cleaning technique?',
        options: [
          { id: 'a', text: 'Use a circular scrubbing motion starting from the outer edges moving inward towards the wound centre', isCorrect: false, points: 0, feedback: '❌ This is a common but dangerous error. Moving from outside inward drags skin contaminants directly into the wound bed, worsening infection risk.' },
          { id: 'b', text: 'Clean from the wound centre outward using single downward strokes; use each swab once only; use normal saline', isCorrect: true, points: 2, feedback: '✅ Correct technique. Centre-to-periphery with single-use swabs prevents cross-contamination. Normal saline is isotonic, gentle, and effective — it does not damage healing tissue.' },
          { id: 'c', text: 'Scrub vigorously with povidone-iodine (betadine) solution in all directions to ensure bacteria are killed', isCorrect: false, points: 0, feedback: '❌ Two errors: (1) Vigorous scrubbing destroys fragile granulation tissue. (2) Check allergies — Mr. Mensah has a PENICILLIN allergy. Always verify antiseptic compatibility before use.' },
          { id: 'd', text: 'Irrigate with clean tap water and pat dry with clean paper towels', isCorrect: false, points: 1, feedback: '⚠️ Tap water is acceptable for some community wound types but sterile saline is the gold standard for post-operative surgical wounds. Paper towels are not sterile.' },
        ],
      },
      {
        id: 5, stepTitle: 'Post-Procedure Completion',
        situation: 'You have cleaned the wound and applied the antimicrobial dressing. Mr. Mensah says he feels more comfortable. You need to complete the procedure correctly.',
        question: 'Which post-procedure actions are ALL essential before leaving the bedside?',
        options: [
          { id: 'a', text: 'Remove PPE → hand hygiene → make patient comfortable → dispose of clinical waste → document findings including wound description → SBAR report to charge nurse', isCorrect: true, points: 2, feedback: '✅ Perfect post-procedure management. You addressed: infection control (PPE removal, hand hygiene), patient dignity, safe waste disposal, legal documentation, and timely escalation with structured communication. Excellent.' },
          { id: 'b', text: 'Leave quickly to see other patients and document later when you have time', isCorrect: false, points: 0, feedback: '❌ Two serious errors: (1) Clinical waste must be disposed of immediately — not left at the bedside. (2) Documentation must be completed promptly while findings are accurate. Delayed documentation is a patient safety and legal risk.' },
          { id: 'c', text: 'Tell the patient the wound looks fine to reassure him, then document and move on', isCorrect: false, points: 0, feedback: '❌ Never give false reassurance to a patient with active signs of infection. This is dishonest, erodes trust, and could delay the patient seeking appropriate care. Always communicate honestly.' },
          { id: 'd', text: 'Remove gloves, document the dressing change, then ask a colleague to inform the doctor', isCorrect: false, points: 1, feedback: '⚠️ Incomplete. You must personally escalate critical clinical findings — not delegate it. Passing the responsibility risks the message being delayed, diluted, or lost.' },
        ],
      },
    ],
    maxScore: 10,
    passingScore: 7,
    verbalChecklist: [
      { id: 'vc1', text: 'Correctly describes the hand hygiene steps and when to perform them (before and after)' },
      { id: 'vc2', text: 'Identifies all required PPE and states the reason for each item' },
      { id: 'vc3', text: 'Accurately explains ANTT principles (sterile field, key parts protection)' },
      { id: 'vc4', text: 'Correctly identifies all signs of wound infection (erythema, exudate, oedema, pain, odour)' },
      { id: 'vc5', text: 'States correct wound cleaning technique (centre to periphery, single-use swabs, normal saline)' },
      { id: 'vc6', text: 'Selects appropriate dressing type for an infected exuding wound (antimicrobial/absorbent)' },
      { id: 'vc7', text: 'States patient allergy check as mandatory step before applying any product' },
      { id: 'vc8', text: 'Correctly describes post-procedure steps including clinical waste disposal and hand hygiene' },
      { id: 'vc9', text: 'Accurately describes documentation requirements (wound assessment, dressing used, patient response)' },
      { id: 'vc10', text: 'Correctly explains SBAR and states when to escalate (immediately, not at ward round)' },
    ],
  },
{
    id: 'im-injection',
    title: 'Intramuscular Injection',
    icon: '💉',
    duration: '15–20 mins',
    difficulty: 'Foundational',
    description: 'Safely administer an intramuscular antibiotic injection following the 5 Rights of medication administration.',
    learningObjectives: [
      'Correctly apply the 5 Rights of Medication Administration',
      'Select the correct IM injection site and appropriate needle gauge/length',
      'Demonstrate safe IM injection technique at the correct angle',
      'Manage and dispose of sharps safely following universal precautions',
    ],
    videos: [
      {
        id: 'im-v1',
        title: 'Intramuscular Injection — Step by Step Technique',
        videoId: null, // ADD YOUTUBE ID — Search: "intramuscular injection nursing technique ventrogluteal"
        suggestedSearch: 'intramuscular injection nursing technique step by step ventrogluteal',
        duration: '~7 mins',
        description: 'Covers the 5 Rights, site selection, correct needle angle, aspiration, and injection technique.',
      },
      {
        id: 'im-v2',
        title: 'IM Injection Sites — Selecting the Right Site',
        videoId: null, // ADD YOUTUBE ID — Search: "IM injection sites nursing deltoid ventrogluteal vastus lateralis"
        suggestedSearch: 'IM injection sites nursing deltoid ventrogluteal selection',
        duration: '~5 mins',
        description: 'Explains the anatomy and selection criteria for all IM injection sites.',
      },
    ],
    keyPoints: [
      'The 5 Rights: Right Patient, Right Drug, Right Dose, Right Route, Right Time — ALWAYS check all five',
      'Preferred adult IM site: ventrogluteal (gluteus medius) — fewest nerves and blood vessels nearby',
      'Dorsogluteal site is NO LONGER recommended — risk of sciatic nerve damage',
      'Needle angle: 90° for IM (45° is subcutaneous only)',
      'Inject slowly at 1ml per 10 seconds to reduce pain and tissue damage',
      'NEVER re-cap a needle with two hands — one-handed or no re-cap only',
      'Dispose of sharps AT THE POINT OF CARE — never carry uncapped needles across a ward',
    ],
    patient: {
      name: 'Abena Owusu',
      age: 32,
      gender: 'Female',
      ward: 'Medical Ward A, Bed 11',
      diagnosis: 'Community-acquired pneumonia',
      vitals: { BP: '110/70 mmHg', HR: '98 bpm', Temp: '38.4°C', RR: '22/min', SpO2: '95%' },
      allergies: 'None known',
      medications: ['Ceftriaxone 1g IM OD', 'Salbutamol nebuliser PRN', 'Paracetamol 1g QDS'],
      nurseNote: 'Patient cooperative. IV access unavailable. Requires morning dose of Ceftriaxone 1g IM. Prescription reviewed and signed by Dr. Asante.',
    },
    steps: [
      {
        id: 1, stepTitle: 'Medication Verification',
        situation: 'You have been assigned to administer Ceftriaxone 1g IM to Ms. Owusu. You approach the medication trolley to prepare.',
        question: 'What is the correct first step in medication administration?',
        options: [
          { id: 'a', text: 'Draw up the medication quickly and take it to the patient to avoid delaying her dose', isCorrect: false, points: 0, feedback: '❌ Speed must never override safety in medication administration. Rushing is one of the most common causes of medication errors. Always complete the full verification before drawing up.' },
          { id: 'b', text: 'Check the 5 Rights against the signed prescription chart: Right Patient, Right Drug, Right Dose, Right Route, Right Time', isCorrect: true, points: 2, feedback: '✅ Correct. The 5 Rights are the bedrock of safe medication administration and are non-negotiable. This single check prevents the majority of preventable medication errors.' },
          { id: 'c', text: 'Ask the patient what medications she normally receives to verify', isCorrect: false, points: 0, feedback: '❌ Patient self-report cannot replace verification against the official signed prescription chart. Patients may not know their medication names, doses, or routes accurately.' },
          { id: 'd', text: 'Check against the previous nurse\'s handover notes', isCorrect: false, points: 1, feedback: '⚠️ Handover notes are supplementary only. You must always verify against the current, signed prescription chart. Notes can contain transcription errors or be out of date.' },
        ],
      },
      {
        id: 2, stepTitle: 'Site Selection',
        situation: 'You have verified the 5 Rights. Ms. Owusu is of average build with no muscle wasting. You need to select the injection site.',
        question: 'Which is the PREFERRED IM injection site for an adult patient and why?',
        options: [
          { id: 'a', text: 'Dorsogluteal (upper outer buttock) — it is the traditional site and easiest to access', isCorrect: false, points: 0, feedback: '❌ The dorsogluteal site is no longer recommended by current guidelines. It carries significant risk of sciatic nerve damage and superior gluteal artery injury. Evidence-based practice has moved away from this site.' },
          { id: 'b', text: 'Ventrogluteal (hip area over gluteus medius) — largest safe muscle mass, no major nerves or vessels nearby', isCorrect: true, points: 2, feedback: '✅ Correct. The ventrogluteal site is the current gold standard for adult IM injection. It has the greatest muscle mass for drug absorption and the lowest risk of neurovascular injury. Supported by WHO and current NMC guidance.' },
          { id: 'c', text: 'Medial (inner) thigh — most accessible and least painful for the patient', isCorrect: false, points: 0, feedback: '❌ The medial thigh is never used for IM injection. The femoral nerve and femoral vessels run along the medial thigh — accidental injection here could cause nerve damage or intravascular injection.' },
          { id: 'd', text: 'Deltoid — quick access and the patient can stay seated', isCorrect: false, points: 1, feedback: '⚠️ The deltoid is acceptable for small volumes (≤1ml) such as vaccines. Ceftriaxone 1g requires reconstitution to approximately 2–3.5ml — this volume exceeds deltoid capacity and would cause significant pain.' },
        ],
      },
      {
        id: 3, stepTitle: 'Injection Technique',
        situation: 'You have selected the ventrogluteal site. Ms. Owusu is correctly positioned. You have cleaned the skin with an alcohol swab and allowed it to dry for 30 seconds. You are ready to inject.',
        question: 'What is the correct IM injection technique?',
        options: [
          { id: 'a', text: 'Insert at 45°, aspirate for 5 seconds, inject rapidly to reduce discomfort, withdraw slowly', isCorrect: false, points: 0, feedback: '❌ A 45° angle only reaches subcutaneous tissue — this would make the injection subcutaneous, not intramuscular. IM requires 90°. Also, rapid injection increases pain and local tissue damage.' },
          { id: 'b', text: 'Stretch skin taut (or Z-track), insert needle at 90°, aspirate briefly, if no blood inject at 1ml/10 seconds, withdraw smoothly at same angle', isCorrect: true, points: 2, feedback: '✅ Correct IM technique. 90° ensures needle reaches muscle. Z-track prevents tracking of drug into subcutaneous tissue. Slow injection reduces pain and ensures proper drug distribution.' },
          { id: 'c', text: 'Insert at 90°, skip aspiration (no longer required), inject as fast as needed to minimise procedure time', isCorrect: false, points: 1, feedback: '⚠️ Partially correct. While WHO updated vaccine aspiration guidance, clinical IM injections for medications still follow aspiration protocols in most Ghanaian and international guidelines. Rapid injection causes more pain, not less.' },
          { id: 'd', text: 'Bunch up the skin, insert at 45°, inject slowly, apply firm pressure immediately after withdrawal', isCorrect: false, points: 0, feedback: '❌ Bunching is the subcutaneous technique. IM uses skin taut or Z-track. 45° is too shallow for muscle. Firm massage after IM injection is not recommended as it can cause bruising and alter drug absorption.' },
        ],
      },
      {
        id: 4, stepTitle: 'Sharps Management',
        situation: 'You have successfully administered the injection. Ms. Owusu says it was not as bad as she expected. You are now holding the used syringe with the needle exposed.',
        question: 'What is the correct method for disposing of this sharp?',
        options: [
          { id: 'a', text: 'Re-cap the needle carefully using both hands, then walk to the sluice room to dispose', isCorrect: false, points: 0, feedback: '❌ CRITICAL SAFETY ERROR. Two-handed recapping is the single most common cause of healthcare worker needlestick injuries. This is prohibited in all clinical settings. Never use two hands to re-cap a needle.' },
          { id: 'b', text: 'Do not re-cap. Discard the entire syringe and needle directly into the sharps bin which is positioned at the point of care', isCorrect: true, points: 2, feedback: '✅ Correct. Immediate disposal without re-capping is the safest approach. The sharps bin must always be at the point of care so you can discard without carrying an uncapped needle across the room or ward.' },
          { id: 'c', text: 'Remove the needle from the syringe using forceps, dispose of needle in sharps bin, syringe in clinical waste', isCorrect: false, points: 0, feedback: '❌ Manipulating a used needle — even with forceps — significantly increases injury risk. The needle and syringe are disposed of together as one unit into the sharps bin.' },
          { id: 'd', text: 'Use the one-handed scoop technique to re-cap, then carry carefully to the treatment room sharps bin', isCorrect: false, points: 1, feedback: '⚠️ One-handed scooping is safer than two-handed but is still not standard practice for routine injections. More critically, the sharps bin should be AT the point of care — there is no need to carry a capped needle across the ward.' },
        ],
      },
    ],
    maxScore: 8,
    passingScore: 6,
    verbalChecklist: [
      { id: 'vc1', text: 'Correctly names and explains all 5 Rights of medication administration' },
      { id: 'vc2', text: 'States that verification must be against the signed prescription chart (not nursing notes)' },
      { id: 'vc3', text: 'Identifies ventrogluteal as the preferred adult IM site and gives correct anatomical reason' },
      { id: 'vc4', text: 'States that dorsogluteal is no longer recommended and explains the risk' },
      { id: 'vc5', text: 'Correctly states the IM needle angle (90°) and differentiates from SC (45°)' },
      { id: 'vc6', text: 'Explains Z-track technique and states its purpose (prevent drug leaking into subcutaneous layer)' },
      { id: 'vc7', text: 'States correct injection speed (approximately 1ml per 10 seconds)' },
      { id: 'vc8', text: 'Correctly states sharps disposal rule (no two-handed recapping, dispose at point of care)' },
      { id: 'vc9', text: 'Identifies post-injection monitoring requirements (observe for adverse reaction)' },
      { id: 'vc10', text: 'States documentation requirements including time, dose, site, and patient response' },
    ],
  },
{
    id: 'ngt-insertion',
    title: 'NGT Insertion',
    icon: '🔧',
    duration: '25–30 mins',
    difficulty: 'Advanced',
    description: 'Insert a nasogastric tube in a stroke patient with dysphagia and confirm correct gastric placement before use.',
    learningObjectives: [
      'Correctly measure NGT insertion length using the NEX method',
      'Position the patient safely and appropriately for NGT insertion',
      'Insert NGT using correct technique with minimal trauma',
      'Confirm tube placement using the only accepted method — pH testing of aspirate',
    ],
    videos: [
      {
        id: 'ngt-v1',
        title: 'Nasogastric Tube Insertion — Complete Procedure',
        videoId: null, // ADD YOUTUBE ID — Search: "nasogastric tube insertion nursing NGT technique"
        suggestedSearch: 'nasogastric tube insertion nursing NGT technique step by step',
        duration: '~10 mins',
        description: 'Full demonstration of NGT measurement, insertion technique, and pH confirmation.',
      },
      {
        id: 'ngt-v2',
        title: 'NGT Placement Confirmation — pH Testing (NPSA Guidelines)',
        videoId: null, // ADD YOUTUBE ID — Search: "NGT placement confirmation pH testing NPSA guidelines"
        suggestedSearch: 'NGT nasogastric tube placement confirmation pH testing guidelines',
        duration: '~6 mins',
        description: 'Explains why pH testing is mandatory and why the whoosh test is banned — includes real clinical examples.',
      },
    ],
    keyPoints: [
      'Measure using NEX method: Nose → Ear → Xiphisternum — mark this length on the tube',
      'Position: upright at 45–90° (preferred) or left lateral if patient unable to sit',
      'NEVER use the "whoosh test" (blowing air and listening) — it has caused patient deaths and is banned',
      'ONLY acceptable first-line confirmation: pH ≤5.5 using CE-marked pH indicator strips',
      'If pH is 5.5–6.0 — do NOT use tube; seek senior advice and request X-ray confirmation',
      'Tube in the LUNG: pH will typically be >6.0 — do NOT proceed',
      'If patient coughs, gags excessively or becomes distressed — STOP and withdraw the tube',
      'Check capacity for consent — stroke patients may lack capacity; involve family/next of kin',
    ],
    patient: {
      name: 'Emmanuel Darko',
      age: 67,
      gender: 'Male',
      ward: 'Stroke Unit, Bed 3',
      diagnosis: 'Acute ischaemic stroke Day 2 — severe dysphagia, unsafe for oral feeding (SALT assessed)',
      vitals: { BP: '156/94 mmHg', HR: '78 bpm', Temp: '36.8°C', RR: '16/min', SpO2: '96%' },
      allergies: 'None known',
      medications: ['Aspirin 75mg OD via NGT (crushed)', 'Atorvastatin 80mg OD', 'NGT feeds per dietitian plan'],
      nurseNote: 'Patient conscious, GCS 13, confused. Right facial droop, dysarthria. Family at bedside. Consultant has ordered NGT insertion for nutrition and medication. Family have given consent.',
    },
    steps: [
      {
        id: 1, stepTitle: 'Pre-Procedure Assessment',
        situation: 'You have been asked to insert an NGT for Mr. Darko. He is confused with GCS 13 and has right-sided facial droop. His family are present and anxious.',
        question: 'What pre-procedure checks are essential before attempting insertion?',
        options: [
          { id: 'a', text: 'Confirm family consent (patient lacks capacity), check nasal patency, review clotting history, explain procedure, prepare all equipment before starting', isCorrect: true, points: 2, feedback: '✅ Complete pre-procedure assessment. With GCS 13, Mr. Darko lacks capacity — family consent is appropriately documented. Checking nasal patency and clotting prevents avoidable complications. Good clinical preparation.' },
          { id: 'b', text: 'The referral has already been made — proceed immediately to insertion to avoid delaying nutrition', isCorrect: false, points: 0, feedback: '❌ A medical referral or instruction is NOT consent. Skipping pre-procedure checks risks inserting into a blocked or deviated nasal passage, causing haemorrhage or tube misplacement.' },
          { id: 'c', text: 'Ask Mr. Darko to confirm consent verbally', isCorrect: false, points: 0, feedback: '❌ Mr. Darko has a documented GCS of 13 with confusion — he currently lacks the capacity to give informed consent. Consent has been obtained from his family, which is the appropriate and lawful approach here.' },
          { id: 'd', text: 'Check vital signs are stable and proceed if within normal range', isCorrect: false, points: 1, feedback: '⚠️ Vital sign review is one component of pre-procedure assessment but is insufficient alone. Capacity assessment, consent, nasal check, and equipment preparation are all equally required.' },
        ],
      },
      {
        id: 2, stepTitle: 'Measurement and Positioning',
        situation: 'All pre-procedure checks are complete. Family consent is documented. You are ready to measure the tube and position Mr. Darko.',
        question: 'What is the correct measurement method and patient position for NGT insertion?',
        options: [
          { id: 'a', text: 'Measure nose to ear to mid-sternum. Position the patient flat on their back.', isCorrect: false, points: 1, feedback: '⚠️ The measurement landmark is slightly incorrect — the correct method is Nose-Ear-Xiphisternum (NEX), not mid-sternum. Flat positioning is wrong and significantly increases aspiration risk.' },
          { id: 'b', text: 'Measure nose to ear to xiphisternum (NEX). Position upright at 45–90°, or left lateral if unable to sit.', isCorrect: true, points: 2, feedback: '✅ Correct. NEX measurement provides an accurate, individualised insertion length. Upright or left lateral positioning uses gravity to guide the tube toward the stomach and reduces the risk of pulmonary misplacement.' },
          { id: 'c', text: 'Estimate 50cm insertion depth for all adults. Position on the right side to aid gastric entry.', isCorrect: false, points: 0, feedback: '❌ A fixed 50cm estimate is dangerous — patients vary significantly in height and anatomy. Right lateral is not the preferred position. Always measure individually using NEX and use upright or left lateral.' },
          { id: 'd', text: 'Measure nose to umbilicus. Position in high Fowler\'s — this is the only acceptable position.', isCorrect: false, points: 0, feedback: '❌ Nose-to-umbilicus significantly overestimates insertion length and risks tube coiling. High Fowler\'s is ideal but not the "only" acceptable position — left lateral is a valid alternative when the patient cannot sit upright.' },
        ],
      },
      {
        id: 3, stepTitle: 'Confirming Tube Placement',
        situation: 'You have passed the tube to the measured NEX depth. Mr. Darko tolerated the procedure. You must now confirm the tube is in the stomach before it can be used.',
        question: 'What is the ONLY acceptable first-line method to confirm NGT placement?',
        options: [
          { id: 'a', text: 'Aspirate gastric contents and test with CE-marked pH indicator strip — pH ≤5.5 confirms gastric placement', isCorrect: true, points: 2, feedback: '✅ Correct. pH testing of aspirate is the mandatory first-line method per NPSA, WHO, and current Ghanaian nursing guidelines. A pH of ≤5.5 confirms gastric placement and the tube can be used safely.' },
          { id: 'b', text: 'Blow air into the tube and listen over the stomach with a stethoscope (whoosh test)', isCorrect: false, points: 0, feedback: '❌ THE WHOOSH TEST IS BANNED AND HAS CAUSED PATIENT DEATHS. Air can produce a "whooshing" sound even when the tube is in the lung. This method has been prohibited in clinical practice globally. Never use it.' },
          { id: 'c', text: 'Ask the patient to hum — if they can vocalise, the tube is not in the airway', isCorrect: false, points: 0, feedback: '❌ Mr. Darko has dysarthria from his stroke — this test is completely inappropriate and unreliable. Phonation testing is not an accepted confirmation method even in patients without dysarthria.' },
          { id: 'd', text: 'Place the free end of the tube in a bowl of water — if no bubbling occurs, the tube is in the stomach', isCorrect: false, points: 0, feedback: '❌ Absence of bubbling does not confirm gastric placement. The tube could be in the oesophagus or a coiled position in the airway. Only pH testing or chest X-ray provide reliable confirmation.' },
        ],
      },
    ],
    maxScore: 6,
    passingScore: 5,
    verbalChecklist: [
      { id: 'vc1', text: 'Correctly describes the NEX measurement technique (Nose-Ear-Xiphisternum)' },
      { id: 'vc2', text: 'States correct patient positioning (upright 45-90° or left lateral)' },
      { id: 'vc3', text: 'Explains capacity assessment process and how family consent is obtained' },
      { id: 'vc4', text: 'Describes nasal patency check and how to select the better nostril' },
      { id: 'vc5', text: 'Correctly states the ONLY acceptable first-line placement confirmation method (pH ≤5.5)' },
      { id: 'vc6', text: 'Explicitly states that the whoosh test is banned and explains why' },
      { id: 'vc7', text: 'States what pH range requires further investigation before use (5.5-6.0 = seek advice)' },
      { id: 'vc8', text: 'Describes when to stop insertion (patient coughs, gags, becomes cyanosed)' },
      { id: 'vc9', text: 'Correctly describes how to secure the tube and document the insertion depth' },
      { id: 'vc10', text: 'States documentation requirements including tube length at nostril and pH reading obtained' },
    ],
  }
]

// The approved proposal focuses on these three selected procedures.
export const procedures = allProcedures
