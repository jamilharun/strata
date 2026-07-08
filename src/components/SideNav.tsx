type SideNavProps = {
  labels: string[];
  active: number;
  onSelect: (index: number) => void;
};

export default function SideNav({ labels, active, onSelect }: SideNavProps) {
  return (
    <nav id="side-nav" aria-label="Page sections">
      {labels.map((label, i) => (
        <button
          key={label}
          className={i === active ? 'nav-dot active' : 'nav-dot'}
          aria-label={label}
          aria-current={i === active || undefined}
          onClick={() => onSelect(i)}
        />
      ))}
    </nav>
  );
}
