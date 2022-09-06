import React from 'react'
import { ArticlesListItem } from './ArticlesListItem'
import { Article } from '../types/articles.types'

interface IProps {
  articles: Array<Article>
  isPrevDisabled: boolean
  isNextDisabled: boolean
  onClickPrev: () => void
  onClickNext: () => void
  onArticleUpdate: (articleId: number | undefined, value: string) => void
  onArticleDelete: (articleId: number | undefined) => void
}

export const ArticlesList = ({
  articles,
  isPrevDisabled,
  isNextDisabled,
  onClickPrev,
  onClickNext,
  onArticleUpdate,
  onArticleDelete,
}: IProps) => (
  <>
    <ul className="articles">
      {
        articles.map((article: Article) => (
          <ArticlesListItem
            key={article.id}
            article={article}
            onArticleUpdate={onArticleUpdate}
            onArticleDelete={onArticleDelete}
          />
        ))
      }
    </ul>
    <button disabled={isPrevDisabled} onClick={onClickPrev}>Prev</button>
    <button disabled={isNextDisabled} onClick={onClickNext}>Next</button>
  </>
)
