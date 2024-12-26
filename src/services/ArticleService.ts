import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";

class ArticleService {
 private static instance: ArticleService;
 private sources: ContentSource[] = [];
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

 removeSource(source: ContentSource) {
  this.sources = this.sources.filter((s) => s.name !== source.name);
 }

 async getArticles(): Promise<ArticleItem[]> {
  for (const source of this.sources) {
   const articles = await source.getAllContent();
   this.aggregatedContent.push(...articles);
  }

  return this.aggregatedContent;
 }

 async searchArticles(
  searchParams: Record<string, string>
 ): Promise<ArticleItem[]> {
  const aggregatedSearchContent: ArticleItem[] = [];
  for (const source of this.sources) {
   const articles = await source.searchContent(searchParams);
   aggregatedSearchContent.push(...articles);
  }
  return aggregatedSearchContent;
 }
}

export default ArticleService;
