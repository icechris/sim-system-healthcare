# NursSim Ghana — Healthcare Simulation System

A React + Vite web application for the study titled **Effects of Digital Simulation-Based Learning Versus Traditional Methods of Training of Selected Nursing Procedures on Critical Thinking, Confidence, and Competence of Student Nurses in Selected Universities in Accra, Ghana**.

## Study alignment

The system is configured for the three selected procedures in the corrected proposal:

1. Wound dressing
2. Intramuscular medication administration
3. Nasogastric tube insertion

It supports:

- student registration and group assignment: DSBL or Traditional
- pre-intervention questionnaire
- DSBL simulation modules for the digital group only
- post-intervention questionnaire
- researcher/admin dashboard
- verbal competence checklist assessment
- CSV export for SPSS/Jamovi analysis

## Important note

This version stores data in browser `localStorage` for demonstration and pilot use. For real data collection across different students/devices, connect the app to Supabase or another database and apply appropriate ethics, privacy, and access controls.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
