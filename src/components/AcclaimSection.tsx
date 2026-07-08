export default function AcclaimSection() {
  return (
    <section id="acclaim">
      <div className="content wide centered">
        <span className="eyebrow">Acclaim</span>
        <h2>What They Say.</h2>
        <div className="acclaim-grid">
          <blockquote className="lead-quote">
            <p>
              &ldquo;Under a loupe, the interior angles are flawless. The anglage alone
              tells you where the 400 hours went.&rdquo;
            </p>
            <cite className="masthead masthead--times">The Horology Times</cite>
          </blockquote>
          <div className="side-quotes">
            <blockquote>
              <p>
                &ldquo;Strata resists every trend &mdash; no faux patina, no borrowed
                heritage. Just architecture, honestly expressed.&rdquo;
              </p>
              <cite className="masthead masthead--journal">Watch Journal</cite>
            </blockquote>
            <blockquote>
              <p>&ldquo;The most compelling independent debut in years.&rdquo;</p>
              <cite className="masthead masthead--enthusiast">Chrono Enthusiast</cite>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
