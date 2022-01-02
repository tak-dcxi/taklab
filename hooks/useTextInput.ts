import React, { useState, useCallback } from 'react'

type useTextInputType = [string, (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void]

export const useTextInput = (initial: string = ''): useTextInputType => {
  const [value, setValue] = useState<string>(initial)
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(event.target.value),
    [setValue]
  )
  return [value, handleChange]
}
