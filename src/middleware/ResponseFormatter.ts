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
}

export default ResponseFormatter;
