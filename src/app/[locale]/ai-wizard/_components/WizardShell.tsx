'use client';

import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWizard } from './WizardContext';
import WizardProgress from './WizardProgress';
import StepIndustry    from './StepIndustry';
import StepProjectType from './StepProjectType';
import StepGoal        from './StepGoal';
import StepAudience    from './StepAudience';
import StepDesignStyle from './StepDesignStyle';
import StepFeatures    from './StepFeatures';
import StepContent     from './StepContent';
import StepTimeline    from './StepTimeline';
import StepBudget      from './StepBudget';
import StepContact     from './StepContact';
import BlueprintResult from './BlueprintResult';
import styles from '../page.module.css';

const STEPS = [
  StepIndustry,
  StepProjectType,
  StepGoal,
  StepAudience,
  StepDesignStyle,
  StepFeatures,
  StepContent,
  StepTimeline,
  StepBudget,
  StepContact,
];

const STEP_TITLE_KEYS = [
  'aiWizard.steps.industry.title',
  'aiWizard.steps.projectType.title',
  'aiWizard.steps.goal.title',
  'aiWizard.steps.audience.title',
  'aiWizard.steps.designStyle.title',
  'aiWizard.steps.features.title',
  'aiWizard.steps.content.title',
  'aiWizard.steps.timeline.title',
  'aiWizard.steps.budget.title',
  'aiWizard.steps.contact.title',
] as const;

// Multiselect steps that need explicit "Next" button
const MULTISELECT_STEPS = new Set([4, 6, 10]); // audience, features, contact (1-indexed)

interface Props {
  locale: string;
}

export default function WizardShell({ locale }: Props) {
  const t = useTranslations();
  const {
    step, totalSteps, submitted,
    answers, goBack, goNext, handleSubmit,
  } = useWizard();

  const isLast      = step === totalSteps;
  const isMultiSel  = MULTISELECT_STEPS.has(step);
  const showNext    = isMultiSel || isLast;

  // Validate before proceeding
  function canAdvance() {
    const a = answers;
    switch (step) {
      case 1: return !!a.industry;
      case 2: return !!a.projectType;
      case 3: return !!a.goal;
      case 4: return a.audience.length > 0;
      case 5: return !!a.designStyle;
      case 6: return a.features.length > 0;
      case 7: return !!a.content;
      case 8: return !!a.timeline;
      case 9: return !!a.budget;
      case 10: return !!a.contact.name && !!a.contact.email;
      default: return true;
    }
  }

  function handleNext() {
    if (!canAdvance()) return;
    if (isLast) handleSubmit();
    else goNext();
  }

  // Step title key extraction
  const rawKey  = STEP_TITLE_KEYS[step - 1];
  const [ns, ...rest] = rawKey.split('.');
  const key = rest.join('.');

  if (submitted) {
    return (
      <div className={styles.wizardBody}>
        <div className={styles.blueprintHeader}>
          <h2 className="md-headline-medium">{t('aiWizard.blueprint.title')}</h2>
          <p className="md-body-large text-muted">{t('aiWizard.blueprint.subtitle')}</p>
        </div>
        <BlueprintResult />
      </div>
    );
  }

  const StepComponent = STEPS[step - 1];

  return (
    <div className={styles.wizardBody}>
      {/* Progress */}
      <WizardProgress locale={locale} />

      {/* Step counter */}
      <div className={styles.stepMeta}>
        <span className="md-label-medium text-muted">
          {t('aiWizard.stepOf', { current: step, total: totalSteps })}
        </span>
      </div>

      {/* Step title */}
      <motion.h2
        key={`title-${step}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`md-headline-small ${styles.stepTitle}`}
      >
        {t(`${ns}.${key}` as Parameters<typeof t>[0])}
      </motion.h2>

      {/* Step body */}
      <div className={styles.stepWrapper}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className={styles.wizardNav}>
        <button
          className="btn btn-elevated"
          onClick={goBack}
          disabled={step === 1}
          aria-label={t('aiWizard.back')}
        >
          <ArrowLeft size={16} />
          {t('aiWizard.back')}
        </button>

        {showNext && (
          <button
            className={`btn ${isLast ? 'btn-sky' : 'btn-primary'}`}
            onClick={handleNext}
            disabled={!canAdvance()}
            aria-label={isLast ? t('aiWizard.submit') : t('aiWizard.next')}
          >
            {isLast ? t('aiWizard.submit') : t('aiWizard.next')}
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
