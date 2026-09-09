import { featureActs } from '../content.js'
import { useReveal } from '../hooks/useReveal.js'

function FeatureGrid({
  motionEnabled,
  heading = '我做過的專案',
  headingId = 'feature-heading',
  items = featureActs,
}) {
  const { ref, revealed } = useReveal(motionEnabled)

  return (
    <section
      ref={ref}
      aria-labelledby={headingId}
      className={`feature-grid ${revealed ? 'is-revealed' : ''}`}
    >
      <h2 id={headingId} className="feature-heading">
        {heading}
      </h2>
      <div className="feature-list">
        {items.map((item) => (
          <article key={item.index} className="feature-card">
            <span className="feature-index" aria-hidden="true">
              {item.index}
            </span>
            <h3 className="feature-title">{item.title}</h3>
            <p className="feature-tag">{item.tag}</p>
            <p className="feature-desc">{item.desc}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default FeatureGrid