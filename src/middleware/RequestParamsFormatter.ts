class RequestParamsFormatter {
  static formatRequestSearchParams(
    sourceName: string,
    params: Record<string, string>
  ): Record<string, string> {

    let searchParams = {
      ...params,
    };

    if (sourceName === "News Data IO") {
      delete searchParams.page;
      delete searchParams.pageSize;
      delete searchParams.section;

      searchParams.from_date = params.date;
      searchParams.to_date = params.date;

      delete searchParams.date;

      return searchParams;
    }

    if (sourceName === "NewsAPI") {
      delete searchParams.category;
      delete searchParams.country;
      searchParams.from = params.date;
      searchParams.to = params.date;

      delete searchParams.date;

      return searchParams;
    }

    searchParams['from-date'] = params.date;
    searchParams['to-date'] = params.date;

    delete searchParams.date;

    return searchParams;
  }
}

export default RequestParamsFormatter;
