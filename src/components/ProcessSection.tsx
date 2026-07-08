const STEPS = [
  {
    label: '01. Milling',
    hours: '± 40 hours',
    image: '/milling.png',
    alt: 'CNC milling of the titanium case',
    text: 'The grade 5 titanium case is CNC milled to exact tolerances, then hand-finished.',
  },
  {
    label: '02. Polishing',
    hours: '± 120 hours',
    image: '/polishing.png',
    alt: 'Black-polishing a component on a tin plate',
    text: 'Every component is black-polished by hand using diamond paste and tin plates.',
  },
  {
    label: '03. Assembly',
    hours: '± 240 hours',
    image: '/assembly.png',
    alt: 'A master watchmaker assembling the movement with tweezers',
    text: 'Assembled and regulated by a single master watchmaker, start to finish.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process">
      <div className="content wide centered">
        <span className="eyebrow">The Process</span>
        <h2>Forged by Hand.</h2>
        <p className="standfirst">Where the four hundred hours go.</p>
        <div className="process-grid">
          {STEPS.map((step) => (
            <figure key={step.label}>
              <div className="frame">
                <img src={step.image} alt={step.alt} loading="lazy" />
              </div>
              <div className="step-meta">
                <h3 className="step-label">{step.label}</h3>
                <span className="step-hours">{step.hours}</span>
              </div>
              <p>{step.text}</p>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
