import React, { forwardRef, useState } from 'react'

interface InputBoxProps {
  placeholder?: string
  label?: string
  inputRef?: React.RefObject<HTMLInputElement>
  defaultValue?: string | number
  onChange?: (value: string) => void
  min?: number
  max?: number
  step?: number
  type?: string
}

const InputBox = forwardRef<HTMLInputElement, InputBoxProps>(
  (
    {
      placeholder,
      label,
      defaultValue,
      onChange,
      min,
      max,
      step,
      type = 'text'
    },
    ref
) => {
    // console.log('ref: ', ref);
    const [value, setValue] = useState<string>(defaultValue?.toString() ?? '')
    const [error, setError] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      setValue(val)

      if (type === 'number') {
        const num = Number(val)
        if (
          (min !== undefined && num < min) ||
          (max !== undefined && num > max)
        ) {
          setError(`Enter a number between ${min} and ${max}`)
          return
        } else {
          setError('')
        }
      }

      if (type === 'text') {
        if (
          (min !== undefined && val.length < min) ||
          (max !== undefined && val.length > max)
        ) {
          setError(`Enter between ${min} and ${max} characters`)
          return
        } else {
          setError('')
        }
      }

      if (onChange) {
        onChange(val)
      }
    }

    return (
      <div className='flex flex-col'>
        {label && (
          <label className='text-lg mt-2 mb-1' htmlFor={label}>
            {label}
          </label>
        )}
        <input
          id={label}
          ref={ref}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={`w-80 border p-1 rounded-lg bg-[#0a0a0a] shadow-md focus:outline-none ${
            error ? 'border-red-500' : 'border-[#212121] mb-2'
          }`}
          min={type === 'number' ? min : undefined}
          max={type === 'number' ? max : undefined}
          step={type === 'number' ? step : undefined}
          maxLength={type === 'text' ? max : undefined}
          minLength={type === 'text' ? min : undefined}
        />
        {error && <span className='text-red-500 text-sm mt-1'>{error}</span>}
      </div>
    )
  }
)

InputBox.displayName = 'InputBox'

export default InputBox
