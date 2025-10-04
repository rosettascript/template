import { useState, useCallback } from 'react'

export interface FormState<T> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
  isSubmitting: boolean
  isValid: boolean
}

export interface FormActions<T> {
  setValue: (field: keyof T, value: T[keyof T]) => void
  setError: (field: keyof T, error: string) => void
  setTouched: (field: keyof T, touched: boolean) => void
  setValues: (values: Partial<T>) => void
  setErrors: (errors: Partial<Record<keyof T, string>>) => void
  reset: () => void
  handleSubmit: (onSubmit: (values: T) => void | Promise<void>) => (e: React.FormEvent) => void
  handleChange: (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (field: keyof T) => (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function useForm<T extends Record<string, unknown>>(
  initialValues: T,
  validationSchema?: (values: T) => Partial<Record<keyof T, string>>
): FormState<T> & FormActions<T> {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setValue = useCallback((field: keyof T, value: T[keyof T]) => {
    setValues(prev => ({ ...prev, [field]: value }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  const setError = useCallback((field: keyof T, error: string) => {
    setErrors(prev => ({ ...prev, [field]: error }))
  }, [])

  const setTouched = useCallback((field: keyof T, touched: boolean) => {
    setTouched(prev => ({ ...prev, [field]: touched }))
  }, [])

  const setValues = useCallback((newValues: Partial<T>) => {
    setValues(prev => ({ ...prev, ...newValues }))
  }, [])

  const setErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    setErrors(prev => ({ ...prev, ...newErrors }))
  }, [])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  const validate = useCallback(() => {
    if (!validationSchema) return true
    
    const validationErrors = validationSchema(values)
    setErrors(validationErrors)
    
    return Object.keys(validationErrors).length === 0
  }, [values, validationSchema])

  const handleSubmit = useCallback((onSubmit: (values: T) => void | Promise<void>) => {
    return async (e: React.FormEvent) => {
      e.preventDefault()
      
      setIsSubmitting(true)
      
      try {
        const isValid = validate()
        if (isValid) {
          await onSubmit(values)
        }
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [values, validate])

  const handleChange = useCallback((field: keyof T) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValue(field, e.target.value)
    }
  }, [setValue])

  const handleBlur = useCallback((field: keyof T) => {
    return (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTouched(field, true)
      
      // Validate field on blur if validation schema exists
      if (validationSchema) {
        const fieldErrors = validationSchema({ ...values, [field]: e.target.value })
        if (fieldErrors[field]) {
          setError(field, fieldErrors[field]!)
        }
      }
    }
  }, [values, validationSchema, setTouched, setError])

  const isValid = Object.keys(errors).length === 0

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setError,
    setTouched,
    setValues,
    setErrors,
    reset,
    handleSubmit,
    handleChange,
    handleBlur,
  }
}
