'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { useLocale } from 'next-intl';
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
  step:         number;
  totalSteps:   number;
  answers:      WizardAnswers;
  submitted:    boolean;
  submitStatus: 'idle' | 'sending' | 'sent' | 'error';
  setAnswer:    <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => void;
  goNext:       () => void;
  goBack:       () => void;
  goToStep:     (n: number) => void;
  handleSubmit: () => void;
  reset:        () => void;
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
  const locale = useLocale();

  const [step, setStep]               = useState(1);
  const [answers, setAnswers]         = useState<WizardAnswers>(defaultAnswers);
  const [submitted, setSubmitted]     = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [hasManualFeatures, setHasManualFeatures] = useState(false);

  const setAnswer = useCallback(
    <K extends keyof WizardAnswers>(key: K, value: WizardAnswers[K]) => {
      setAnswers(prev => {
        const next = { ...prev, [key]: value };

        // Smart feature recommendation
        if ((key === 'industry' || key === 'projectType') && !hasManualFeatures) {
          next.features = getRecommendedFeatures(next.industry, next.projectType);
        }
        if (key === 'features') setHasManualFeatures(true);

        return next;
      });
    },
    [hasManualFeatures]
  );

  const goNext   = useCallback(() => setStep(s => Math.min(s + 1, TOTAL_STEPS)), []);
  const goBack   = useCallback(() => setStep(s => Math.max(s - 1, 1)), []);
  const goToStep = useCallback((n: number) => setStep(n), []);

  // ── Submit: show blueprint immediately, then fire-and-forget to API ──────────
  const handleSubmit = useCallback(() => {
    setSubmitted(true);   // Render blueprint at once — don't wait for API
    setSubmitStatus('sending');

    const payload = {
      source:  'wizard',
      locale,
      // Contact
      name:    answers.contact.name,
      email:   answers.contact.email,
      phone:   answers.contact.phone,
      company: answers.contact.company,
      // Full wizard selections (for rich email)
      wizardAnswers: {
        industry:    answers.industry,
        projectType: answers.projectType,
        goal:        answers.goal,
        audience:    answers.audience,
        designStyle: answers.designStyle,
        features:    answers.features,
        content:     answers.content,
        timeline:    answers.timeline,
        budget:      answers.budget,
      },
    };

    fetch('/api/contact', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then(res => setSubmitStatus(res.ok ? 'sent' : 'error'))
      .catch(() => setSubmitStatus('error'));

  }, [answers, locale]);

  const reset = useCallback(() => {
    setStep(1);
    setAnswers(defaultAnswers);
    setSubmitted(false);
    setSubmitStatus('idle');
    setHasManualFeatures(false);
  }, []);

  return (
    <WizardContext.Provider value={{
      step, totalSteps: TOTAL_STEPS, answers, submitted, submitStatus,
      setAnswer, goNext, goBack, goToStep, handleSubmit, reset,
    }}>
      {children}
    </WizardContext.Provider>
  );
}
