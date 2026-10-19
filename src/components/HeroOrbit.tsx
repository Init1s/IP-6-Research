import HeroMolecule from "@/components/HeroMolecule";

// The six research areas of the collection, given equal weight on one ring around IP6, each tied
// back to the molecule at the center. No position or size implies a ranking. This ring stays still
// so its labels stay upright; the unlabeled rings turn.
const areas = ["Molecular mechanisms", "Cancer biology", "Clinical investigations", "Immunology", "Metabolism & mineral biology", "Neuroscience"];
const ring = 300;
// Decorative rings: unlabeled, with small identical dots spaced evenly, so they read as pattern, not data.
const pattern = [
  { r: 120, dots: 3, turn: "orbit-slow" },
  { r: 210, dots: 4, turn: "orbit-slow-reverse" },
  { r: 346, dots: 5, turn: "orbit-slow-reverse" },
];
const point = (r: number, deg: number) => [400 + r * Math.cos(deg * Math.PI / 180), 400 + r * Math.sin(deg * Math.PI / 180)];
// An arc centered on an angle, long enough for its label. Labels on the lower half run the other
// way, with their baseline pushed out, so every label reads upright from left to right.
const arc = (r: number, deg: number, span = 70) => {
  const lower = Math.sin(deg * Math.PI / 180) > 0.01;
  const radius = lower ? r + 17 : r;
  const [x1, y1] = point(radius, lower ? deg + span / 2 : deg - span / 2), [x2, y2] = point(radius, lower ? deg - span / 2 : deg + span / 2);
  return `M ${x1} ${y1} A ${radius} ${radius} 0 0 ${lower ? 0 : 1} ${x2} ${y2}`;
};

export default function HeroOrbit() {
  return <div className="hero-orbit">
    <svg viewBox="50 50 700 700" aria-hidden="true" focusable="false">
      {pattern.map(({ r, dots, turn }) => <g className={`orbit-ring ${turn}`} key={r}>
        <circle className="orbit-faint" cx="400" cy="400" r={r}/>
        {Array.from({ length: dots }, (_, i) => { const [x, y] = point(r, i * 360 / dots + r / 7); return <circle className="orbit-dot" cx={x} cy={y} r="3.5" key={i}/>; })}
      </g>)}
      <g>
        <circle className="orbit-line" cx="400" cy="400" r={ring}/>
        {areas.map((label, i) => {
          const deg = -90 + i * 60, [x, y] = point(ring, deg);
          return <g key={label}>
            <line className="orbit-spoke" x1="400" y1="400" x2={x} y2={y}/>
            <circle className="orbit-node gold" cx={x} cy={y} r="9"/>
            <path id={`orbit-area-${i}`} d={arc(ring + 26, deg, label.length * 19 / ((ring + 26) * Math.PI / 180))} fill="none"/>
            <text className="orbit-label"><textPath href={`#orbit-area-${i}`} startOffset="50%" textAnchor="middle">{label}</textPath></text>
          </g>;
        })}
      </g>
    </svg>
    <div className="hero-orbit-core"><HeroMolecule/></div>
  </div>;
}
