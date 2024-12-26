import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";

class ArticleService {
  private static instance: ArticleService;
  private readonly sources: ContentSource[] = [];
  private readonly aggregatedContent: ArticleItem[] = [];

  constructor() {}

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

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
