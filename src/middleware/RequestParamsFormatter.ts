class RequestParamsFormatter {
  static formatRequestSearchParams(
    sourceName: string,
    params: Record<string, string | string[]>
  ): Record<string, string | string[]> {
    let searchParams: Record<string, string | string[]> = {};

    Object.entries(params).forEach(([key, value]) => {
      if (typeof value === "string") {
        searchParams[key] = value;
      }
      if (Array.isArray(value) && value.length > 0) {
        searchParams[key] = value;
      }
    });

    if (sourceName === "News Data IO") {
      delete searchParams.page;
      delete searchParams.pageSize;
      delete searchParams.section;

      searchParams.from_date = params.date as string;
      searchParams.to_date = params.date as string;
      searchParams.domain = params.sources as string[];
      searchParams.category = params.categories as string[];

      delete searchParams.categories;
      delete searchParams.authors;
      delete searchParams.sources;
      delete searchParams.date;
      delete searchParams.creator;

      return searchParams;
    }

    if (sourceName === "NewsAPI") {
      searchParams.from = params.date as string;
      searchParams.to = params.date as string;
      searchParams.domains = params.sources as string[];
      searchParams.q = !!params.q ? params.q : params.category as string[];

      delete searchParams.sources;
      delete searchParams.category;
      delete searchParams.authors;
      delete searchParams.date;

      return searchParams;
    }

    searchParams["from-date"] = params.date as string;
    searchParams["to-date"] = params.date as string;

    delete searchParams.date;

    return searchParams;
  }
}

export default RequestParamsFormatter;
