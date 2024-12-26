import ArticleItem from "./ArticleItem";

abstract class ContentSource {
  constructor(
    readonly name: string,
    readonly url: string,
    readonly responseFormatter: (data: any) => ArticleItem[]
  ) {}

  abstract getAllContent(): Promise<ArticleItem[]>;
  abstract searchContent(searchParams: Record<string, string>): Promise<ArticleItem[]>;
}

export default ContentSource;
