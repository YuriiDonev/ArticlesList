import React, { useState } from 'react'

interface IProps {
  articleId?: number
  value: string
  onInputSaveClick: (articleId: number | undefined, value: string) => void
  onInputCancelClick: () => void
}

export const ArticlesListItemInput = ({ articleId, value, onInputSaveClick, onInputCancelClick }: IProps) => {
  const [inputValue, setInputValue] = useState<string>(value || '')

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const onSaveClick = () => {
    onInputSaveClick(articleId, inputValue)
  }

  const onCancelClick = () => {
    setInputValue(value)
    onInputCancelClick()
  }

  return (
    <div>
      <input type="text" value={inputValue} onChange={onInputChange} />
      <button disabled={!value} onClick={onSaveClick}>Save</button>
      <button onClick={onCancelClick}>Cancel</button>
    </div>
  )
}
