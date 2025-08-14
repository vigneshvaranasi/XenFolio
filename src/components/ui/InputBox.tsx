import React, { forwardRef } from 'react'

interface InputBoxProps {
  placeholder?: string
  label?: string
  inputRef?: React.RefObject<HTMLInputElement>
  value?: string | number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  type?: string
  className?: string
  error?: string
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      placeholder,
      label,
      value,
      onChange,
      onBlur,
      onKeyDown,
      className,
      type = 'text',
      error
    },
    ref
  ) => {
    return (
      <div className='flex flex-col'>
        {label && (
          <label className='text-lg mb-1' htmlFor={label}>
            {label}
          </label>
        )}
        <input
          id={label}
          ref={ref}
          value={value}
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={` w-80 border p-1.5 rounded-lg bg-[#181e24] shadow-md focus:outline-none ${
            error ? 'border-red-500' : 'border-[#363F43]'
          } ${className ?? ''}`}
        />
        {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
      </div>
    )
  }
)

InputBox.displayName = 'InputBox'

export default InputBox
