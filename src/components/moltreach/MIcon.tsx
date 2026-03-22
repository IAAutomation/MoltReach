// M icon SVG component for MoltReach branding
export default function MIcon({ size = 14, style = {} }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 14 14" 
      style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: 6, ...style }}
    >
      <path 
        d="M2 12 L2 2 L7 8 L12 2 L12 12" 
        fill="none" 
        stroke="#F59E0B" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
}
