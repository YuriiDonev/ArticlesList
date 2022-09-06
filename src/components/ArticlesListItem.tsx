import React, { useState } from 'react'
import { ArticlesListItemInput } from './ArticlesListItemInput'
import { Article } from '../types/articles.types'

interface IProps {
  article: Article
  onArticleUpdate: (articleId: number | undefined, value: string) => void
  onArticleDelete: (articleId: number | undefined) => void
}

export const ArticlesListItem = ({ article, onArticleUpdate, onArticleDelete }: IProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  const onEditClick = () => {
    setIsEditing(true)
  }

  const onInputSaveClick = (articleId: number | undefined, value: string) => {
    onArticleUpdate(articleId, value)
    setIsEditing(false)
  }

  const onInputCancelClick = () => {
    setIsEditing(false)
  }

  return (
    <li className="articles__item">
      <img className="articles__item-img" src={article.imageUrl} alt='' />
      {
        isEditing ? (
          <ArticlesListItemInput
            articleId={article.id}
            value={article.title}
            onInputSaveClick={onInputSaveClick}
            onInputCancelClick={onInputCancelClick}
          />
        ) : (
          <>
            <span className="articles__item-title">
              <a href={article.url} target="_blank" rel="noreferrer">{article.title}</a>
            </span>
            <button onClick={onEditClick}>Edit</button>
            <button onClick={() => onArticleDelete(article.id)}>Delete</button>
          </>
        )
      }
    </li>
  )
}
