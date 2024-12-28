import RequestParamsFormatter from "../middleware/RequestParamsFormatter";
import ResponseFormatter from "../middleware/ResponseFormatter";
import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";
import ApiContentService from "./APIContentService";

class ArticleService {
  private static instance: ArticleService;
  private sources: ContentSource[] = [];
  private searchSources: ContentSource[] = [];
  private readonly aggregatedContent: ArticleItem[] = [];

  constructor() {
    this.initSources();
  }

  private initSources() {
    if (this.sources.length === 0) {
      this.addSource(
        new ApiContentService(
          "News Data IO",
          "https://newsdata.io/api/1/latest",
          ResponseFormatter.formatNewsDataIOAPIResponse,
          {
            apikey: "pub_6356109c2b693d9ea3ec88b6b1300162c0c7c",
            country: "us",
          }
        )
      );
      this.addSource(
        new ApiContentService(
          "NewsAPI",
          "https://newsapi.org/v2/top-headlines",
          ResponseFormatter.formatNewsAPIResponse,
          {
            apiKey: "c290bf206d824a7a92fdc5c2c3037342",
            country: "us",
          }
        )
      );
      this.addSource(
        new ApiContentService(
          "The Guardian",
          "https://content.guardianapis.com/search",
          ResponseFormatter.formatGuardianAPIResponse,
          {
            "api-key": "6ad89547-81bc-4318-8dc7-0eecb1f5c274",
          }
        )
      );
    }

    if (this.searchSources.length === 0) {
      this.addSearchSource(
        new ApiContentService(
          "News Data IO",
          "https://newsdata.io/api/1/latest",
          ResponseFormatter.formatNewsDataIOAPIResponse,
          {
            apikey: "pub_6356109c2b693d9ea3ec88b6b1300162c0c7c",
            country: "us",
          }
        )
      );
      this.addSearchSource(
        new ApiContentService(
          "NewsAPI",
          "https://newsapi.org/v2/everything",
          ResponseFormatter.formatNewsAPIResponse,
          {
            apiKey: "c290bf206d824a7a92fdc5c2c3037342",
          }
        )
      );
      this.addSearchSource(
        new ApiContentService(
          "The Guardian",
          "https://content.guardianapis.com/search",
          ResponseFormatter.formatGuardianAPIResponse,
          {
            "api-key": "6ad89547-81bc-4318-8dc7-0eecb1f5c274",
          }
        )
      );
    }
  }

  public static getInstance(): ArticleService {
    if (!ArticleService.instance) {
      ArticleService.instance = new ArticleService();
    }
    return ArticleService.instance;
  }

  addSource(source: ContentSource) {
    this.sources.push(source);
  }

  addSearchSource(source: ContentSource) {
    this.searchSources.push(source);
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

    for (const source of this.searchSources) {
      const articles = await source.searchContent(
        RequestParamsFormatter.formatRequestSearchParams(
          source.name,
          searchParams
        )
      );
      aggregatedSearchContent.push(...articles);
    }

    return aggregatedSearchContent;
  }
}

export default ArticleService;
