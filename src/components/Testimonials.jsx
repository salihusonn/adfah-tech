import { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, ShieldCheck, UserRound } from 'lucide-react';
import { TESTIMONIAL_PLACEHOLDERS } from '../data';

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const total = TESTIMONIAL_PLACEHOLDERS.length;
  const testimonial = TESTIMONIAL_PLACEHOLDERS[active];

  const previous = () => setActive((current) => (current - 1 + total) % total);
  const next = () => setActive((current) => (current + 1) % total);

  return (
    <div className="testimonial-shell" data-reveal>
      <aside className="testimonial-policy">
        <div className="testimonial-policy__icon"><ShieldCheck size={28} aria-hidden="true" /></div>
        <h3>Real feedback only</h3>
        <p>
          We do not invent reviews. These clearly marked placeholders will be replaced only with
          genuine client feedback supplied to AdFah Tech.
        </p>
        <span>No fabricated ratings or names</span>
      </aside>

      <div
        className="testimonial-carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonial placeholders"
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') previous();
          if (event.key === 'ArrowRight') next();
        }}
      >
        <div className="testimonial-card" aria-live="polite" key={active}>
          <div className="testimonial-card__top">
            <Quote size={42} strokeWidth={1.5} aria-hidden="true" />
            <span className="placeholder-badge">Placeholder — not a customer review</span>
          </div>
          <blockquote>
            <p>“{testimonial.text}”</p>
          </blockquote>
          <div className="testimonial-card__person">
            <div className="testimonial-card__avatar" aria-label="Profile photo placeholder">
              <UserRound size={25} aria-hidden="true" />
            </div>
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.role}</span>
            </div>
          </div>
        </div>

        <div className="testimonial-controls">
          <div className="testimonial-controls__arrows">
            <button type="button" onClick={previous} aria-label="Previous testimonial placeholder">
              <ChevronLeft size={21} aria-hidden="true" />
            </button>
            <button type="button" onClick={next} aria-label="Next testimonial placeholder">
              <ChevronRight size={21} aria-hidden="true" />
            </button>
          </div>
          <div className="testimonial-controls__dots" aria-label="Choose testimonial placeholder">
            {TESTIMONIAL_PLACEHOLDERS.map((item, index) => (
              <button
                type="button"
                key={item.label + index}
                className={active === index ? 'is-active' : ''}
                onClick={() => setActive(index)}
                aria-label={`Show testimonial placeholder ${index + 1}`}
                aria-current={active === index ? 'true' : undefined}
              />
            ))}
          </div>
          <span className="testimonial-controls__count" aria-hidden="true">
            {String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
