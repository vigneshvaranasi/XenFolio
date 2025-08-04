import React, { useEffect, useRef } from 'react'
import closeImg from '../../assets/close.svg'

interface ModalProps {
  title?: string
  isOpen: boolean
  onClose: () => void
  children?: React.ReactNode
  className?: string
  titleClassName?: string
}

function Modal ({
  title,
  isOpen,
  onClose,
  children,
  className = '',
  titleClassName = ''
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 '>
      <div
        ref={modalRef}
        className={`bg-[#171e24] p-4 rounded-lg ${className} border-[#363f43] border-2`}
      >
        {title && (
          <div className='flex items-center justify-between border-b border-[#1e1e1e] pb-2'>
            <p 
                className={`${titleClassName} text-xl font-normal text-white`}
            >
                {title}
            </p>
            <img src={closeImg} className='w-6 cursor-pointer' onClick={onClose} alt="" />
          </div>
        )}
        <div>{children}</div>
      </div>
    </div>
  )
}

export default Modal
