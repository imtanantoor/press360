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

      return searchParams;
    }

    if (sourceName === "NewsAPI") {
      delete searchParams.category;
      delete searchParams.country;
      return searchParams;
    }

    return searchParams;
  }
}

export default RequestParamsFormatter;
