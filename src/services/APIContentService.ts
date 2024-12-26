import axios from "axios";
import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";
import buildParams from "../utils/paramsBuilder";

class ApiContentService extends ContentSource {
  private readonly filters: Record<string, string> = {};

  constructor(
    readonly name: string,
    readonly url: string,
    readonly responseFormatter: (data: any) => ArticleItem[],
    filters: Record<string, string>
  ) {
    super(name, url, responseFormatter);
    this.filters = filters;
  }

  async getAllContent(): Promise<ArticleItem[]> {
    try {
      const response = await axios.get(
        `${this.url}${buildParams(this.filters)}`
      );
      return this.responseFormatter(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async searchContent(
    searchParams: Record<string, string>
  ): Promise<ArticleItem[]> {
    try {
      const response = await axios.get(
        `${this.url}${buildParams({ ...this.filters, ...searchParams })}`
      );
      return this.responseFormatter(response.data);
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}

export default ApiContentService;
