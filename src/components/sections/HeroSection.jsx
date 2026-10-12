import "./HeroSection.css"
import imgFondo from "../../assets/img/img_hero.jpeg"

export default function HeroSection({ title, title1, title2, subtitle, primaryCta, secondaryCta }) {
  return (
    <section className="hero">
      <div className="hero__bg">
        <img src={imgFondo} alt="Machachi Cup" className="hero__img" loading="eager" />
      </div>
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1 className="hero__title">{title}</h1>
        <div className="hero__title1">
          <span className="hero__title1-text">{title1}</span>
          </div>
          <div className="hero__title2">
          <span className="hero__title2-text">{title2}</span>
          </div>
        <p className="hero__sub">{subtitle}</p>
        <div className="hero__actions">
          <a className="btn btn--primary btn--lg" href={primaryCta.href}>
            {primaryCta.label}
            <span className="material-symbols-outlined">north_east</span>
          </a>
          <a className="btn btn--outline-white btn--lg" href={secondaryCta.href}>{secondaryCta.label}</a>
        </div>
      </div>
    </section>
  )
}
