class RequestParamsFormatter {
  static formatRequestSearchParams(
    sourceName: string,
    params: Record<string, string | string[]>
  ): Record<string, string | string[]> {
    let searchParams: Record<string, string | string[]> = {};

    searchParams = {
      ...params,
    };

    if (sourceName === "News Data IO") {
      delete searchParams.page;
      delete searchParams.pageSize;
      delete searchParams.section;

      searchParams.from_date = params.date as string;
      searchParams.to_date = params.date as string;

      delete searchParams.date;

      return searchParams;
    }

    if (sourceName === "NewsAPI") {
      delete searchParams.category;
      delete searchParams.country;
      searchParams.from = params.date as string;
      searchParams.to = params.date as string;

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
