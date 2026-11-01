type Props = { title: string; subtitle: string; chapter: string };
export default function SectionTitle({ title, subtitle, chapter }: Props) {
  return <header className="section-title"><p className="chapter">{chapter}</p><h1>{title}</h1><p className="section-subtitle">{subtitle}</p></header>;
}
