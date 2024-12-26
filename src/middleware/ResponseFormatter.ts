import ArticleItem from "../models/ArticleItem";

class ResponseFormatter {
  static formatNewsAPIResponse(response: any): ArticleItem[] {
    return response.articles.map((article: any, index: number) => {
      let articleData: ArticleItem = {
        id: article?.id ?? index,
        title: article.title,
        description: article.description,
        image: article.urlToImage,
        date: article.publishedAt,
        source: article.source.name,
      };

      return articleData;
    });
  }

  static formatGuardianAPIResponse(response: any): ArticleItem[] {
    return response.response.results.map((article: any, index: number) => {
      let articleData: ArticleItem = {
        id: article?.id ?? index,
        title: article.webTitle,
        description: article.description ?? '',
        image: article.urlToImage ?? '',
        date: article.webPublicationDate,
        source: 'The Guardian',
      };
      return articleData;
    });
  }
}

export default ResponseFormatter;
