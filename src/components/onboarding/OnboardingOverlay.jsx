import { useState, useEffect } from 'react';
import { useOnboarding } from '../../context/useOnboarding';
import OnboardingCard from './OnboardingCard';
import Confetti from './Confetti';

const STEP_TARGETS = [
  '[data-onboarding="header-logo"]',   // Step 1 — logo
  '[data-onboarding="wallet-button"]', // Step 2 — wallet
  '[data-onboarding="swap-card"]',     // Step 3 — swap form
  '[data-onboarding="nav-pools"]',     // Step 4 — pools nav
  null,                                 // Step 5 — full reveal
];

function useViewport() {
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight, mobile: window.innerWidth < 768 });
  useEffect(() => {
    const handler = () => setVp({ w: window.innerWidth, h: window.innerHeight, mobile: window.innerWidth < 768 });
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return vp;
}

export default function OnboardingOverlay() {
  const { isActive, currentStep } = useOnboarding();
  const vp = useViewport();
  const [spotlightRect, setSpotlightRect] = useState(null);

  useEffect(() => {
    // All setState calls happen inside RAF callbacks (never synchronously in the effect body)
    const selector = isActive ? STEP_TARGETS[currentStep] : null;

    const read = () => {
      const el = selector ? document.querySelector(selector) : null;
      if (el) {
        const r = el.getBoundingClientRect();
        setSpotlightRect({ x: r.left, y: r.top, width: r.width, height: r.height });
      } else {
        setSpotlightRect(null);
      }
    };

    // Double RAF so any navigation-triggered re-renders flush before we measure
    let rafOuter = requestAnimationFrame(() => {
      let rafInner = requestAnimationFrame(read);
      return () => cancelAnimationFrame(rafInner);
    });

    window.addEventListener('resize', read);
    window.addEventListener('scroll', read, true);
    return () => {
      cancelAnimationFrame(rafOuter);
      window.removeEventListener('resize', read);
      window.removeEventListener('scroll', read, true);
    };
  }, [isActive, currentStep]);

  if (!isActive) return null;

  const isFullReveal = currentStep === 4;
  const PAD = 10;

  const sRect = spotlightRect && !isFullReveal
    ? {
        x: spotlightRect.x - PAD,
        y: spotlightRect.y - PAD,
        w: spotlightRect.width + PAD * 2,
        h: spotlightRect.height + PAD * 2,
      }
    : null;

  return (
    <>
      <Confetti active={isFullReveal} />

      {/* Spotlight + dim layer */}
      {!isFullReveal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, pointerEvents: 'none' }}>
          {sRect ? (
            /* Box-shadow trick: transparent div casts a huge shadow that dims everything outside it */
            <div
              style={{
                position: 'fixed',
                left: sRect.x,
                top: sRect.y,
                width: sRect.w,
                height: sRect.h,
                borderRadius: 12,
                boxShadow: '0 0 0 9999px rgba(0,0,0,0.72), 0 0 0 2px #F97316, 0 0 24px rgba(249,115,22,0.35)',
                transition: 'left 320ms cubic-bezier(0.4,0,0.2,1), top 320ms cubic-bezier(0.4,0,0.2,1), width 320ms cubic-bezier(0.4,0,0.2,1), height 320ms cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: 'none',
              }}
            />
          ) : (
            /* Fallback solid backdrop (element not yet in DOM / navigating) */
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.72)' }} />
          )}
        </div>
      )}

      {/* Card — always on top, clickable */}
      <OnboardingCard
        spotlightRect={sRect}
        isMobile={vp.mobile}
        vw={vp.w}
        vh={vp.h}
      />
    </>
  );
}
