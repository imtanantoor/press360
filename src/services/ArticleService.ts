import RequestParamsFormatter from "../middleware/RequestParamsFormatter";
import ResponseFormatter from "../middleware/ResponseFormatter";
import ArticleItem from "../models/ArticleItem";
import CheckListItem from "../models/CheckListItem.model";
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
            apikey: process.env.REACT_APP_NEWS_DATA_IO_API_KEY ?? "",
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
            apiKey: process.env.REACT_APP_NEWS_API_KEY ?? "",
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
            "api-key": process.env.REACT_APP_GUARDIAN_API_KEY ?? "",
            "show-references": "author",
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
            apikey: process.env.REACT_APP_NEWS_DATA_IO_API_KEY ?? "",
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
            apiKey: process.env.REACT_APP_NEWS_API_KEY ?? "",
          }
        )
      );
      this.addSearchSource(
        new ApiContentService(
          "The Guardian",
          "https://content.guardianapis.com/search",
          ResponseFormatter.formatGuardianAPIResponse,
          {
            "api-key": process.env.REACT_APP_GUARDIAN_API_KEY ?? "",
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
    searchParams: Record<string, string | string[]>
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
