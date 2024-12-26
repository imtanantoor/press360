import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";

class ArticleService {
  private readonly sources: ContentSource[] = [];
  private readonly aggregatedContent: ArticleItem[] = [];

  constructor() {}

  addSource(source: ContentSource) {
    this.sources.push(source);
  }

  async getArticles(): Promise<ArticleItem[]> {
    for (const source of this.sources) {
      const articles = await source.getAllContent();
      this.aggregatedContent.push(...articles);
    }

    return this.aggregatedContent;
  }
}

export default ArticleService;
