import type { ReactNode } from 'react';

type SplitSectionProps = {
  id: string;
  image: string;
  imageAlt: string;
  eyebrow: string;
  title: ReactNode;
  dark?: boolean;
  /** Text pane first in DOM order (image on the right on desktop) */
  paneFirst?: boolean;
  /** Inset exhibit-plate presentation instead of full-bleed */
  plate?: boolean;
  /** Small spec caption: overlaid on full-bleed images, set beneath plates */
  caption?: string;
  children: ReactNode;
};

export default function SplitSection({
  id, image, imageAlt, eyebrow, title, dark, paneFirst, plate, caption, children,
}: SplitSectionProps) {
  const figure = plate ? (
    <figure className="plate">
      <div className="plate-frame">
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>
      {caption && <figcaption className="fig-caption">{caption}</figcaption>}
    </figure>
  ) : (
    <figure>
      <img src={image} alt={imageAlt} loading="lazy" />
      {caption && <figcaption className="fig-caption">{caption}</figcaption>}
    </figure>
  );
  const pane = (
    <div className="pane">
      <div className="content">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        <hr className="gold-rule" />
        {children}
      </div>
    </div>
  );

  const classes = ['split', dark && 'dark ink-depth', paneFirst && 'reverse-mobile']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} id={id}>
      {paneFirst ? pane : figure}
      {paneFirst ? figure : pane}
    </section>
  );
}
