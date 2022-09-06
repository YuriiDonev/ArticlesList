import { Article } from '../types/articles.types'

export const ArticleServices = {
  addArticlesIds: (articles: Array<Article>) => articles.map((article, index) => ({
    ...article, id: index
  })),

  getArticles: async () => {
    const response = await fetch('https://storage.googleapis.com/aller-structure-task/article_list.json')
    const articles = await response.json()
    
    return ArticleServices.addArticlesIds(articles)
  },
}