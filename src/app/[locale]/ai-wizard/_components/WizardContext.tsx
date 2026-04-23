'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { getRecommendedFeatures } from '../logic';

// ─── Types ───────────────────────────────────────────────────────────────────

export interface WizardAnswers {
  industry:    string;
  projectType: string;
  goal:        string;
  audience:    string[];
  designStyle: string;
  features:    string[];
  content:     string;
  timeline:    string;
  budget:      string;
  contact: {
    name:    string;
    email:   string;
    phone:   string;
    company: string;
  };
}

interface WizardContextType {
  step:       number;
  totalSteps: number;
  answers:    WizardAnswers;
  submitted:  boolean;
  setAnswer:  <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => void;
  goNext:     () => void;
  goBack:     () => void;
  goToStep:   (n: number) => void;
  handleSubmit: () => void;
  reset:      () => void;
}

// ─── Default state ────────────────────────────────────────────────────────────

const defaultAnswers: WizardAnswers = {
  industry:    '',
  projectType: '',
  goal:        '',
  audience:    [],
  designStyle: '',
  features:    [],
  content:     '',
  timeline:    '',
  budget:      '',
  contact: { name: '', email: '', phone: '', company: '' },
};

// ─── Context ──────────────────────────────────────────────────────────────────

const WizardContext = createContext<WizardContextType | null>(null);

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used inside WizardProvider');
  return ctx;
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function WizardProvider({ children }: { children: ReactNode }) {
  const TOTAL_STEPS = 10;
  const [step, setStep]           = useState(1);
  const [answers, setAnswers]     = useState<WizardAnswers>(defaultAnswers);
  const [submitted, setSubmitted] = useState(false);
  const [hasManualFeatures, setHasManualFeatures] = useState(false);

  const setAnswer = useCallback(
    <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => {
      setAnswers(prev => {
        const next = { ...prev, [key]: value };
        
        // Smart recommendation logic
        if ((key === 'industry' || key === 'projectType') && !hasManualFeatures) {
          const recs = getRecommendedFeatures(next.industry, next.projectType);
          next.features = recs;
        }

        if (key === 'features') {
          setHasManualFeatures(true);
        }

        return next;
      });
    },
    [hasManualFeatures]
  );


  const goNext  = useCallback(() => setStep(s => Math.min(s + 1, TOTAL_STEPS)), []);
  const goBack  = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);
  const goToStep= useCallback((n: number) => setStep(n), []);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
  }, []);

  const reset = useCallback(() => {
    setStep(1);
    setAnswers(defaultAnswers);
    setSubmitted(false);
  }, []);

  return (
    <WizardContext.Provider value={{
      step, totalSteps: TOTAL_STEPS, answers, submitted,
      setAnswer, goNext, goBack, goToStep, handleSubmit, reset,
    }}>
      {children}
    </WizardContext.Provider>
  );
}
