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
        content: article.content ?? '',
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
        content: article.content ?? '',
      };
      return articleData;
    });
  }

  static formatNewsDataIOAPIResponse(response: any): ArticleItem[] {
    return response.results.map((article: any, index: number) => {
      let articleData: ArticleItem = {
        id: article?.article_id ?? index,
        title: article.title,
        description: article.description ?? '',
        image: article.image_url ?? '',
        date: article.pubDate,
        source: article.source_name,
        content: article.content ?? '',
      };
      return articleData;
    });
  }
}

export default ResponseFormatter;
