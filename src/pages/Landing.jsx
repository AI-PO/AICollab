import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Landing.css';

const MARQUEE_ITEMS = [
  { label: 'OroSwap', accent: true },
  { label: 'Swap XRB' },
  { label: 'Earn Yield' },
  { label: 'Tokenized Gold' },
  { label: 'Lightning Fast' },
  { label: 'Bitcoin Native' },
  { label: 'No Bridges' },
  { label: 'MEV Protected', accent: true },
  { label: 'Dual Yield Pools' },
  { label: 'Real Assets' },
];

export default function Landing() {
  const navigate = useNavigate();
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  // Cursor dot + body cursor + hover effects
  useEffect(() => {
    const cursor = cursorRef.current;
    const container = containerRef.current;
    if (!cursor || !container) return;

    const onMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMove);
    document.body.style.cursor = 'crosshair';

    const handlers = [];
    container.querySelectorAll('button, a, .pool-row, .step, .feature').forEach(el => {
      const enter = () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
        cursor.style.border = '1.5px solid #F97316';
      };
      const leave = () => {
        cursor.style.width = '8px';
        cursor.style.height = '8px';
        cursor.style.background = '#F97316';
        cursor.style.border = 'none';
      };
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
      handlers.push({ el, enter, leave });
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.body.style.cursor = '';
      handlers.forEach(({ el, enter, leave }) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  // Scroll fade-in via IntersectionObserver
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const els = container.querySelectorAll('.oro-fade-in');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goToApp = () => navigate('/');

  const watchHowItWorks = () => {
    localStorage.removeItem('oroswap_onboarded');
    navigate('/');
  };

  return (
    <div className="oro-landing" ref={containerRef}>
      <div className="oro-cursor" ref={cursorRef} />
      <div className="oro-grain" />

      {/* NAV */}
      <nav className="oro-nav">
        <div className="oro-logo"><span>Oro</span>Swap</div>
        <div className="nav-label">Bitcoin-native DEX · Beta</div>
        <button className="nav-cta" onClick={goToApp}>Enter App →</button>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="bg-grid" />
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />

        <div className="hero-meta">
          <div className="meta-tag">Bitcoin-native · Lightning-enabled · RWA-ready</div>
          <div className="ticker-row">
            <div className="ticker"><span className="tlabel">XRB</span><span className="tval">$1.22</span> <span className="tup">+4.2%</span></div>
            <div className="ticker"><span className="tlabel">BTC</span><span className="tval">$61,002</span> <span className="tup">+1.8%</span></div>
            <div className="ticker"><span className="tlabel">GOLD</span><span className="tval">$63.00</span> <span className="tup">+0.4%</span></div>
          </div>
        </div>

        <div className="hero-headline oro-fade-in" style={{ transitionDelay: '0.3s' }}>
          <div>Swap.</div>
          <div className="line2">
            <span className="accent-word">Earn.</span>
            <span className="outline-word">Own.</span>
          </div>
          <div>Bitcoin.</div>
        </div>

        <div className="hero-bottom oro-fade-in">
          <p className="hero-desc">
            The first DEX built <strong>on Bitcoin</strong> — not wrapped around it.
            Swap real assets, earn real yield, settle in seconds.
            No bridges. No surprises.
          </p>
          <div className="cta-group">
            <button className="cta-primary" onClick={goToApp}>
              Start Trading →
            </button>
            <button className="cta-secondary" onClick={watchHowItWorks}>
              Watch how it works
            </button>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* MARQUEE — items duplicated for seamless loop */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <div key={i} className={`marquee-item${item.accent ? ' accent' : ''}`}>
              {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* WHAT */}
      <section className="what-section oro-fade-in">
        <div>
          <div className="section-label">What is OroSwap</div>
          <h2 className="what-heading">
            A DEX that treats you like a <em>person</em>,<br />not a wallet address.
          </h2>
          <p className="what-body">
            Most exchanges are built for traders. OroSwap is built for everyone.
            You see prices in dollars, fees in cents, and settlement speed in seconds —
            not gas in gwei or hashes in hex. The Bitcoin infrastructure runs underneath.
            You never have to think about it.
          </p>
        </div>
        <div className="stat-grid">
          <div className="stat-cell">
            <div className="stat-num">$2.1<span>M</span></div>
            <div className="stat-label">Total value locked</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">$340<span>K</span></div>
            <div className="stat-label">24h trading volume</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">12.8<span>%</span></div>
            <div className="stat-label">Top pool APR</div>
          </div>
          <div className="stat-cell">
            <div className="stat-num">&lt;1<span>s</span></div>
            <div className="stat-label">Fast settlement time</div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section className="how-section oro-fade-in">
        <div className="section-label">How it works</div>
        <h2 className="how-heading">Three things.<br />That's the whole product.</h2>
        <div className="steps">
          <div className="step">
            <div className="step-num">01 / 03</div>
            <span className="step-icon">⚡</span>
            <div className="step-title">Choose what to swap</div>
            <p className="step-desc">Pick what you have. Pick what you want. Enter an amount — we show you the exact rate and fee before you confirm. No hidden costs.</p>
            <span className="step-tag">No surprises</span>
          </div>
          <div className="step">
            <div className="step-num">02 / 03</div>
            <span className="step-icon">🔗</span>
            <div className="step-title">Pick your speed</div>
            <p className="step-desc">Need it now? Choose Fast — settles in under a second via Lightning. Fine with Standard? Your trade anchors directly to Bitcoin. You decide.</p>
            <span className="step-tag">You're in control</span>
          </div>
          <div className="step">
            <div className="step-num">03 / 03</div>
            <span className="step-icon">✓</span>
            <div className="step-title">Done. That's it.</div>
            <p className="step-desc">Confirm once, assets arrive in your wallet. No second screen of jargon. No waiting to wonder if it worked. You'll see exactly what happened.</p>
            <span className="step-tag">Simple. Final.</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="features-section oro-fade-in">
        <div className="section-label">Why OroSwap</div>
        <div className="features-grid">
          <div className="feature featured">
            <div className="feature-eyebrow">Exclusive to Orobit</div>
            <h3 className="feature-title">Swap tokenized <em>gold</em>.<br />On Bitcoin.</h3>
            <p className="feature-desc">GoldGram is the world's first Bitcoin-native tokenized gold. OroSwap is the only place to trade it, earn yield on it, and use it as collateral — without ever leaving Bitcoin.</p>
            <div className="feature-badge">First of its kind</div>
          </div>
          <div className="feature">
            <div className="feature-eyebrow">MEV protection</div>
            <h3 className="feature-title">Your trade can't be <em>front-run</em>.</h3>
            <p className="feature-desc">On most DEXes, bots can see your trade coming and jump ahead of it — costing you money. OroSwap's Bitcoin-native design makes this structurally impossible. Not a feature. An architecture.</p>
          </div>
          <div className="feature">
            <div className="feature-eyebrow">Dual-yield pools</div>
            <h3 className="feature-title">Earn from two sources <em>simultaneously</em>.</h3>
            <p className="feature-desc">Provide liquidity to a GoldGram pool and earn trading fees plus the underlying yield from the gold itself. A DeFi primitive that doesn't exist anywhere else.</p>
          </div>
          <div className="feature featured">
            <div className="feature-eyebrow">Enterprise ready</div>
            <h3 className="feature-title">Built for institutions <em>too</em>.</h3>
            <p className="feature-desc">SQRL enterprise clients get a native on-chain trading venue. RWA issuers get a secondary market. Fund managers get a compliant exit rail for tokenized assets — all on Bitcoin.</p>
            <div className="feature-badge">SQRL integrated</div>
          </div>
        </div>
      </section>

      {/* EARN */}
      <section className="earn-section oro-fade-in">
        <div className="section-label">Liquidity pools</div>
        <div className="earn-grid">
          <div>
            <h2 className="earn-heading">
              Hold assets.<br />Make them <em>work</em>.
            </h2>
            <p className="earn-body">
              Add your tokens to a pool. Earn a cut of every trade that passes through.
              GoldGram pools earn from trading fees AND the gold's own yield —
              a combination no other DEX can offer.
              Withdraw any time. Your share is always yours.
            </p>
          </div>
          <div>
            <div className="pool-list">
              <div className="pool-row">
                <div>
                  <div className="pool-pair">GoldGram / USDT <span className="dual-badge">Dual yield</span></div>
                  <div className="pool-meta">$340K TVL · $28K 24h vol</div>
                </div>
                <div className="pool-apr">
                  <div className="num">12.8%</div>
                  <div className="lbl">APR</div>
                </div>
              </div>
              <div className="pool-row">
                <div>
                  <div className="pool-pair">GoldGram / XRB <span className="dual-badge">Dual yield</span></div>
                  <div className="pool-meta">$180K TVL · $18K 24h vol</div>
                </div>
                <div className="pool-apr">
                  <div className="num">11.2%</div>
                  <div className="lbl">APR</div>
                </div>
              </div>
              <div className="pool-row">
                <div>
                  <div className="pool-pair">XRB / BTC</div>
                  <div className="pool-meta">$1.2M TVL · $180K 24h vol</div>
                </div>
                <div className="pool-apr">
                  <div className="num">8.4%</div>
                  <div className="lbl">APR</div>
                </div>
              </div>
              <div className="pool-row">
                <div>
                  <div className="pool-pair">XRB / USDT</div>
                  <div className="pool-meta">$620K TVL · $95K 24h vol</div>
                </div>
                <div className="pool-apr">
                  <div className="num">6.1%</div>
                  <div className="lbl">APR</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-section oro-fade-in">
        <div className="bg-grid" />
        <div className="orb orb1" style={{ opacity: 0.5 }} />
        <div className="final-eyebrow">Ready when you are</div>
        <h2 className="final-heading">
          Your first swap<br />takes <span className="outline">60 seconds</span>.
        </h2>
        <button className="final-cta" onClick={goToApp}>
          Open OroSwap →
        </button>
        <p className="final-note">No sign-up · No bridge · No jargon</p>
      </section>

      {/* FOOTER */}
      <footer className="oro-footer">
        <div className="footer-logo"><span>Oro</span>Swap</div>
        <div className="footer-links">
          <button className="footer-link">Docs</button>
          <button className="footer-link">Twitter</button>
          <button className="footer-link">Discord</button>
          <button className="footer-link">Orobit.ai</button>
        </div>
        <div className="footer-copy">© 2026 Orobit · Built on Bitcoin</div>
      </footer>
    </div>
  );
}
