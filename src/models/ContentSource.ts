import ArticleItem from "./ArticleItem";

abstract class ContentSource {
  constructor(
    name: string,
    url: string,
    responseFormatter: (data: any) => ArticleItem[]
  ) {}

  abstract getAllContent(): Promise<ArticleItem[]>;
  abstract searchContent(query: string): Promise<ArticleItem[]>;
}

export default ContentSource;
