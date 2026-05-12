import { createContext, useState, useCallback, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const OnboardingContext = createContext(null);

export function OnboardingProvider({ children, navigateTo }) {
  const [isActive, setIsActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkipConfirm, setShowSkipConfirm] = useState(false);

  // Auto-launch on first visit
  useEffect(() => {
    if (!localStorage.getItem('oroswap_onboarded')) {
      const t = setTimeout(() => setIsActive(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  // Navigate to swap page when step 3 (index 2) activates
  useEffect(() => {
    if (isActive && currentStep === 2 && navigateTo) {
      navigateTo('swap');
    }
  }, [isActive, currentStep, navigateTo]);

  const start = useCallback(() => {
    setCurrentStep(0);
    setIsActive(true);
    setShowSkipConfirm(false);
  }, []);

  const next = useCallback(() => setCurrentStep(s => Math.min(s + 1, 4)), []);
  const back = useCallback(() => setCurrentStep(s => Math.max(s - 1, 0)), []);
  const skip = useCallback(() => setShowSkipConfirm(true), []);
  const cancelSkip = useCallback(() => setShowSkipConfirm(false), []);

  const confirmSkip = useCallback(() => {
    localStorage.setItem('oroswap_onboarded', 'true');
    setIsActive(false);
    setShowSkipConfirm(false);
    setCurrentStep(0);
  }, []);

  const complete = useCallback((goToSwap = false) => {
    localStorage.setItem('oroswap_onboarded', 'true');
    setIsActive(false);
    setCurrentStep(0);
    if (goToSwap && navigateTo) navigateTo('swap');
  }, [navigateTo]);

  const restartOnboarding = useCallback(() => {
    localStorage.removeItem('oroswap_onboarded');
    setCurrentStep(0);
    setShowSkipConfirm(false);
    setIsActive(true);
  }, []);

  return (
    <OnboardingContext.Provider value={{
      isActive, currentStep, showSkipConfirm,
      start, next, back, skip, cancelSkip, confirmSkip, complete, restartOnboarding,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}
