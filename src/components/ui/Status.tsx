type StatusProps = {
  status: 'inProgress' | 'published'
}

const Status = ({ status }: StatusProps) => {
  const defaultClasses = 'text-xs font-semibold py-1'
  const dotBase = 'w-3 h-3 rounded-full mr-1'
  const textBase =
    'rounded-full px-2 flex justify-evenly items-center text-sm shadow-md'

  // In Progress (amber glow)
  const inProgressDotClasses = `${dotBase} bg-gradient-to-tr from-[#D97706] to-[#F59E0B] border border-[#B45309]`
  const inProgressTextClasses = `${textBase} bg-gradient-to-r from-[#1A1610] to-[#262018] text-[#FBBF24]`

  // Published (emerald glow)
  const publishedDotClasses = `${dotBase} bg-gradient-to-tr from-[#10B981] to-[#34D399] border border-[#059669]`
  const publishedTextClasses = `${textBase} bg-gradient-to-r from-[#0A2F24] to-[#124031] text-[#34D399]`
  return (
    <h2
      className={`${
        status === 'inProgress' ? inProgressTextClasses : publishedTextClasses
      } ${defaultClasses}`}
    >
      <span
        className={`${
          status === 'inProgress' ? inProgressDotClasses : publishedDotClasses
        }`}
      ></span>
      {status === 'inProgress' ? 'In Progress' : 'Published'}
    </h2>
  )
}

export default Status
