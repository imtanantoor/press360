import axios from "axios";
import ArticleItem from "../models/ArticleItem";
import ContentSource from "../models/ContentSource";
import buildParams from "../utils/paramsBuilder";

class ApiContentService extends ContentSource {
  private readonly filters: Record<string, string> = {};
  private currentRequest: AbortController | null = null;

  constructor(
    readonly name: string,
    readonly url: string,
    readonly responseFormatter: (data: any) => ArticleItem[],
    filters: Record<string, string>
  ) {
    super(name, url, responseFormatter);
    this.filters = filters;
  }

  private abortCurrentRequest() {
    if (this.currentRequest) {
      this.currentRequest.abort();
      this.currentRequest = null;
    }
  }

  async getAllContent(): Promise<ArticleItem[]> {
    try {
      this.abortCurrentRequest();
      this.currentRequest = new AbortController();

      const response = await axios.get(
        `${this.url}${buildParams(this.filters)}`,
        { signal: this.currentRequest.signal }
      );
      
      this.currentRequest = null;
      return this.responseFormatter(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled');
      } else {
        console.error(error);
      }
      return [];
    }
  }

  async searchContent(
    searchParams: Record<string, string>
  ): Promise<ArticleItem[]> {
    try {
      this.abortCurrentRequest();
      this.currentRequest = new AbortController();

      const response = await axios.get(
        `${this.url}${buildParams({ ...this.filters, ...searchParams })}`,
        { signal: this.currentRequest.signal }
      );
      
      this.currentRequest = null;
      return this.responseFormatter(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request cancelled');
      } else {
        console.error(error);
      }
      return [];
    }
  }
}

export default ApiContentService;
