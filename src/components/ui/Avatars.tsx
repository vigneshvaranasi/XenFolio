import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Tooltip from './Tooltip'

interface AvatarsProps {
  creators: {
    githubUsername: string;
    avatarUrl: string;
  }[],
  variant: 'elastic' | 'bounce' | 'raise'
}

const Avatars: React.FC<AvatarsProps> = ({ creators, variant }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className='avatars'>
      <motion.div
        className='flex'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {creators.map((creator, idx) => {
          const isElastic = variant === 'elastic'
          const shouldStack = !isElastic || !isHovered
          return (
            <motion.div
              key={idx}
              className={`w-8 h-w-8 rounded-full -ml-4 first:ml-0 relative cursor-pointer`}
              whileHover={
                variant === 'bounce'
                  ? { scale: 1.2 }
                  : variant === 'raise'
                  ? { y: -8 }
                  : {}
              }
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20
              }}
              style={{
                marginLeft: idx === 0 || variant === 'elastic' ? 0 : -16,
              }}
              animate={{
                marginLeft: idx === 0 ? 0 : shouldStack ? -16 : 0
              }}
            >
              <Tooltip 
                text={creator.githubUsername}
                showToolTip='On Hover'
                position='top'
                backgroundColor='#0c0d10'
                borderColor='#535353'
                >
              <motion.img
                src={creator.avatarUrl}
                alt={`avatar-${idx}`}
                className='w-full h-full object-cover rounded-full border border-black'
              />
              </Tooltip>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default Avatars