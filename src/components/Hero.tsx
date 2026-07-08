export default function Hero() {
  return (
    <section className="hero on-image" id="hero" aria-label="Strata Caliber 1">
      <img
        src="/hero.png"
        alt="Strata Caliber 1 — skeleton dial in grade 5 titanium and rose gold, on grey leather"
        fetchPriority="high"
      />
      <div className="scrim" />
      <div className="hero-content">
        <span className="eyebrow">Caliber 1 &middot; Limited to 50 Pieces</span>
        <h1>Four Hundred Hours. One&nbsp;Watch.</h1>
        <hr className="gold-rule" />
        <p>A hand-finished skeleton movement, suspended in sapphire and grade 5 titanium. This is Strata.</p>
      </div>
      <div className="scroll-hint" aria-hidden="true"><span /></div>
    </section>
  );
}
