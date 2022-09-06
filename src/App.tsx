import React, { useEffect, useState } from 'react'
import { ArticlesList } from './components/ArticlesList'
import { ArticleServices } from './services/articles.services'
import { Article } from './types/articles.types'
import { STEP_NUMBER, CURSOR_TYPE } from './constants/articles.constants'
import { LocalStorageUtil } from './utils/LocalStorageUtil'
import './App.css'

const App = () => {
  const [ cursorStart, setCursorStart ] = useState<number>(0)
  const [ cursorEnd, setCursorEnd ] = useState<number>(STEP_NUMBER)
  const [ articles, setArticles ] = useState<Array<Article>>([])

  const getArticles = async () => {
    const articles = await ArticleServices.getArticles()

    setArticles(articles)
  }

  useEffect(() => {
    getArticles()
  }, [])

  useEffect(() => {
    const cursorStartSaved = LocalStorageUtil.get(CURSOR_TYPE.START)
    const cursorEndSaved = LocalStorageUtil.get(CURSOR_TYPE.END)
    if (articles && (articles.length - STEP_NUMBER) < cursorEndSaved) {
      setCursorStart(cursorStartSaved)
      setCursorEnd(cursorEndSaved)
    } else {
      LocalStorageUtil.remove(CURSOR_TYPE.START)
      LocalStorageUtil.remove(CURSOR_TYPE.END)
    }
  }, [articles])

  const navigateByAtricles = (isNext: boolean) => {
    const cursorStartUpdated = isNext ? cursorStart + STEP_NUMBER : cursorStart - STEP_NUMBER
    const cursorEndUpdated = isNext ? cursorEnd + STEP_NUMBER : cursorEnd - STEP_NUMBER
    setCursorStart(cursorStartUpdated)
    setCursorEnd(cursorEndUpdated)

    LocalStorageUtil.set(CURSOR_TYPE.START, cursorStartUpdated)
    LocalStorageUtil.set(CURSOR_TYPE.END, cursorEndUpdated)
  }

  const onClickPrev = () => {
    navigateByAtricles(false)
  }

  const onClickNext = () => {
    navigateByAtricles(true)
  }

  const onArticleDelete = (articleId: number | undefined) => {
    const updatedArticles = articles.filter((article: Article) => article.id !== articleId)

    setArticles(updatedArticles)
  }

  const onArticleUpdate = (articleId: number | undefined, value: string) => {
    const articleIndex = articles.findIndex((article: Article) => (article.id === articleId))
    if (articleIndex === -1) {
      return
    }
    const updatedArticle = { ...articles[articleIndex], title: value}
    const updatedArticles = [
      ...articles.slice(0, articleIndex),
      updatedArticle,
      ...articles.slice(articleIndex + 1),
    ]
  
    setArticles(updatedArticles)
  }

  const articlesToDisplay = articles.slice(cursorStart, cursorEnd)

  return (
    <ArticlesList
      articles={articlesToDisplay}
      isPrevDisabled={cursorStart <= 0}
      isNextDisabled={cursorEnd >= articles.length}
      onClickPrev={onClickPrev}
      onClickNext={onClickNext}
      onArticleUpdate={onArticleUpdate}
      onArticleDelete={onArticleDelete}
    />
  )
}

export default App