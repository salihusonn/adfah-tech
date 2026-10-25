export default function SectionHeading({ eyebrow, title, subtitle, id, align = 'center', light = false }) {
  return (
    <div className={`section-heading section-heading--${align} ${light ? 'section-heading--light' : ''}`} data-reveal>
      {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
      <h2 id={id}>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
