import { useOnboarding } from '../../context/useOnboarding';
import Step1Welcome from './steps/Step1Welcome';
import Step2Wallet from './steps/Step2Wallet';
import Step3Swap from './steps/Step3Swap';
import Step4Pools from './steps/Step4Pools';
import Step5Ready from './steps/Step5Ready';

const STEPS = [
  { title: 'Welcome to OroSwap',              Content: Step1Welcome, nextLabel: "Let's go →" },
  { title: 'Your wallet is your account',     Content: Step2Wallet,  nextLabel: 'Got it →' },
  { title: 'Swapping is like currency exchange', Content: Step3Swap, nextLabel: 'Next →' },
  { title: 'Put your assets to work',         Content: Step4Pools,   nextLabel: 'Almost there →' },
  { title: "You're all set",                  Content: Step5Ready,   nextLabel: null },
];

function SkipConfirmModal() {
  const { confirmSkip, cancelSkip } = useOnboarding();
  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1020, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
    >
      <div
        style={{
          background: 'rgb(var(--bg-elevated))',
          border: '1px solid rgb(var(--border))',
          borderRadius: 16,
          padding: 24,
          maxWidth: 340,
          width: '100%',
          boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
        }}
      >
        <p className="font-syne font-bold text-text-primary mb-1.5">Skip the tour?</p>
        <p className="text-sm text-text-secondary font-dm mb-5 leading-relaxed">
          You can restart it anytime from the header menu.
        </p>
        <div className="flex gap-2">
          <button
            onClick={confirmSkip}
            className="flex-1 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-dm hover:text-text-primary hover:border-accent/40 transition-colors cursor-pointer"
          >
            Skip
          </button>
          <button
            onClick={cancelSkip}
            className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-colors cursor-pointer"
          >
            Continue tour
          </button>
        </div>
      </div>
    </div>
  );
}

const CARD_W = 364;

export default function OnboardingCard({ spotlightRect, isMobile, vw, vh }) {
  const { currentStep, showSkipConfirm, next, back, skip, complete } = useOnboarding();
  const { title, Content, nextLabel } = STEPS[currentStep];

  // ── Card positioning ──────────────────────────────────────────────────────
  let cardStyle;
  const PAD = 16;
  const EST_H = 340;

  if (isMobile) {
    cardStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      borderRadius: '20px 20px 0 0',
      width: '100%',
    };
  } else if (spotlightRect) {
    const { x, y, w, h } = spotlightRect;

    // Vertical: prefer below, then above, then center
    let top;
    if (y + h + PAD + EST_H < vh) {
      top = y + h + PAD;
    } else if (y - PAD - EST_H > 0) {
      top = y - EST_H - PAD;
    } else {
      top = Math.max(PAD, vh / 2 - EST_H / 2);
    }

    // Horizontal: center on spotlight, clamp to viewport
    let left = x + w / 2 - CARD_W / 2;
    left = Math.max(PAD, Math.min(left, vw - CARD_W - PAD));
    top = Math.min(top, vh - EST_H - PAD);

    cardStyle = { position: 'fixed', top, left, width: CARD_W };
  } else {
    // Step 5: center
    cardStyle = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: CARD_W,
    };
  }

  return (
    <>
      {showSkipConfirm && <SkipConfirmModal />}

      <div
        style={{
          ...cardStyle,
          background: 'rgb(var(--bg-elevated))',
          border: '1px solid rgb(var(--border))',
          borderRadius: isMobile ? '20px 20px 0 0' : 16,
          boxShadow: '0 24px 56px rgba(0,0,0,0.45)',
          zIndex: 1003,
          pointerEvents: 'auto',
          overflow: 'hidden',
        }}
      >
        {/* Drag handle on mobile */}
        {isMobile && (
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-8 h-1 rounded-full bg-border" />
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-4 pb-0">
          <h3 className="font-syne font-bold text-base text-text-primary leading-snug pr-3 flex-1">
            {title}
          </h3>
          <button
            onClick={skip}
            aria-label="Skip onboarding"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-bg-surface transition-colors flex-shrink-0 cursor-pointer mt-0.5"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M10.5 2.5L2.5 10.5M2.5 2.5l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Step content */}
        <div className="px-5 pt-3 pb-1">
          <Content />
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-1.5 py-3">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? 16 : 6,
                height: 6,
                background: i === currentStep
                  ? '#F97316'
                  : i < currentStep
                    ? 'rgba(249,115,22,0.4)'
                    : 'rgb(var(--border))',
              }}
            />
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex items-center gap-2 px-5 pb-5">
          {currentStep > 0 && (
            <button
              onClick={back}
              className="px-4 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-dm hover:text-text-primary hover:border-accent/40 transition-colors cursor-pointer flex-shrink-0"
            >
              Back
            </button>
          )}

          {currentStep < 4 ? (
            <button
              onClick={next}
              className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-all cursor-pointer active:scale-95"
            >
              {nextLabel}
            </button>
          ) : (
            <div className="flex gap-2 flex-1">
              <button
                onClick={() => complete(true)}
                className="flex-1 py-2.5 rounded-xl bg-accent hover:bg-accent/90 text-white text-sm font-dm font-medium transition-all cursor-pointer active:scale-95"
              >
                Make my first swap
              </button>
              <button
                onClick={() => complete(false)}
                className="px-4 py-2.5 rounded-xl border border-border text-text-secondary text-sm font-dm hover:text-text-primary hover:border-accent/40 transition-colors cursor-pointer"
              >
                Explore
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
