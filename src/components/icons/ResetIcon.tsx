// Using the red color from theme variables
const ResetIcon = ({ color = 'var(--red)', size = 24 }) => {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        style={{
          display: 'block',
          overflow: 'visible',
          fill: 'var(--red)', // Explicitly set fill color
        }}
      >
        {/* Simple counterclockwise circular arrow */}
        <g>
          {/* Main circular arrow */}
          <path
            d="M 4 12
               A 8 8 0 1 1 12 20
               M 12 20
               L 8 20
               L 12 16"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}

export default ResetIcon
