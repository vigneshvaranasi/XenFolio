import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface TooltipProps {
  text?: string
  children?: React.ReactNode
  backgroundColor?: string
  borderColor?: string
  textColor?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  arrow?: boolean
  showToolTip?: 'On Hover' | 'On Click'
}

const Tooltip: React.FC<TooltipProps> = ({
  text = 'Tooltip',
  children,
  backgroundColor = '#333',
  borderColor = '#333',
  textColor = '#fff',
  position = 'top',
  arrow = true,
  showToolTip = 'On Hover'
}) => {
  const [displayToolTip, setDisplayToolTip] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (showToolTip !== 'On Click' || !displayToolTip) return
    const handleClick = (e: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setDisplayToolTip(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [displayToolTip, showToolTip])

  const getPositionStyle = () => {
    switch (position) {
      case 'top':
        return {
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '8px'
        }
      case 'bottom':
        return {
          top: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          marginTop: '8px'
        }
      case 'left':
        return {
          right: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginRight: '8px'
        }
      case 'right':
        return {
          left: '100%',
          top: '50%',
          transform: 'translateY(-50%)',
          marginLeft: '8px'
        }
      default:
        return {}
    }
  }

  const getArrowStyle = () => {
    const base = {
      width: 0,
      height: 0,
      borderStyle: 'solid',
      position: 'absolute',
    }
    switch (position) {
      case 'top':
        return {
          ...base,
          borderWidth: '6px 6px 0 6px',
          borderColor: `${borderColor} transparent transparent transparent`,
          left: '50%',
          top: '100%',
          transform: 'translateX(-50%)'
        }
      case 'bottom':
        return {
          ...base,
          borderWidth: '0 6px 6px 6px',
          borderColor: `transparent transparent ${borderColor} transparent`,
          left: '50%',
          bottom: '100%',
          transform: 'translateX(-50%)'
        }
      case 'left':
        return {
          ...base,
          borderWidth: '6px 0 6px 6px',
          borderColor: `transparent transparent transparent ${borderColor}`,
          right: '-6px',
          top: '50%',
          transform: 'translateY(-50%)'
        }
      case 'right':
        return {
          ...base,
          borderWidth: '6px 6px 6px 0',
          borderColor: `transparent ${borderColor} transparent transparent`,
          left: '-6px',
          top: '50%',
          transform: 'translateY(-50%)'
        }
      default:
        return {}
    }
  }

  return (
    <div
      className='relative'
      ref={tooltipRef}
      style={{ display: 'inline-block' }}
    >
      {displayToolTip && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.2 }}
          className={`${position} border-2 border-[${borderColor}]`}
          style={{
            backgroundColor,
            color: textColor,
            borderRadius: '8px',
            position: 'absolute',
            padding: '5px 10px',
            zIndex: 1,
            whiteSpace: 'nowrap',
            ...getPositionStyle()
          }}
        >
          {arrow && <div  style={getArrowStyle()} />}
          {text}
        </motion.div>
      )}
      <div
        onMouseEnter={() =>
          showToolTip === 'On Hover' && setDisplayToolTip(true)
        }
        onMouseLeave={() =>
          showToolTip === 'On Hover' && setDisplayToolTip(false)
        }
        onClick={() =>
          showToolTip === 'On Click' && setDisplayToolTip(prev => !prev)
        }
        className='cursor-pointer'
        style={{ display: 'inline-block' }}
      >
        {children}
      </div>
    </div>
  )
}

export default Tooltip
