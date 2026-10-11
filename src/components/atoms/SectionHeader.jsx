export default function SectionHeader({
  title,
  subtitle,
  dark = false,
  left = false,
  eyebrow,
  rulePrimary = false,
  dataAos,
  dataAosDelay,
}) {
  const headerClass = dark ? "section__header section__header--dark" : "section__header"
  const titleClass = `${left ? "section__title section__title--left" : "section__title"}${dark ? " section__title--white" : ""}`
  const ruleClass = `section__rule${rulePrimary ? " section__rule--primary" : ""}`
  const subtitleClass = `section__sub${left ? " section__sub--left" : ""}`

  return (
    <div className={headerClass} data-aos={dataAos} data-aos-delay={dataAosDelay}>
      {eyebrow ? <span className="section__eyebrow">{eyebrow}</span> : null}
      <h2 className={titleClass}>{title}</h2>
      <div className={ruleClass}></div>
      {subtitle ? <p className={subtitleClass}>{subtitle}</p> : null}
    </div>
  )
}
