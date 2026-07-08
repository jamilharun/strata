const SPECS = [
  { term: 'Case', detail: 'Grade 5 titanium, 39 mm × 9.6 mm' },
  { term: 'Crystal', detail: 'Sapphire, front and back' },
  { term: 'Movement', detail: 'Caliber 1, micro-rotor automatic' },
  { term: 'Power Reserve', detail: '72 hours' },
  { term: 'Balance', detail: 'Free-sprung, 4 Hz, adjusted to six positions' },
  { term: 'Finishing', detail: 'Hand anglage, perlage & black polish' },
  { term: 'Water Resistance', detail: '5 ATM' },
  { term: 'Strap', detail: 'Hand-stitched calf, titanium pin buckle' },
];

export default function SpecsSection() {
  return (
    <section className="dark ink-depth" id="specifications">
      <div className="content wide centered">
        <span className="eyebrow">Specifications</span>
        <h2>By the Numbers.</h2>
        <dl className="spec-grid">
          {SPECS.map((spec) => (
            <div key={spec.term}>
              <dt>{spec.term}</dt>
              <dd>{spec.detail}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
