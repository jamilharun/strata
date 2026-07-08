export default function CtaSection() {
  return (
    <section className="dark cta" id="reserve">
      <div className="backdrop" aria-hidden="true">
        <img src="/hero.png" alt="" />
      </div>
      <div className="cta-card">
        <span className="eyebrow">Acquire</span>
        <h2>Fifty Pieces. No&nbsp;More.</h2>
        <p>
          Each Strata is assembled to order by a single watchmaker and delivered from
          Q4&nbsp;2026. Allocation is by reservation only.
        </p>
        <div className="price">$18,500 <small>USD</small></div>
        <a className="btn" href="mailto:concierge@strata.watch?subject=Caliber%201%20Reservation">
          Reserve Your Allocation
        </a>
        <p className="cta-note">Private viewings available in Geneva and New York.</p>
      </div>
    </section>
  );
}
