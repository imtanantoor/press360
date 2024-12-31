import SearchParams from "../models/SearchParams.model";

class RequestParamsFormatter {
  static formatRequestSearchParams(
    sourceName: string,
    params: SearchParams
  ): Record<string, string | string[]> {
    let searchParams: Record<string, string | string[]> = {};
    if (sourceName === "News Data IO") {
      let searchParams: Record<string, string | string[]> = {
        q: params.q ?? "",
        category: params.category ?? "",
        domain: params.source ?? "",
      };

      Object.keys(searchParams).forEach((key) => {
        if (
          searchParams[key] === "" ||
          (Array.isArray(searchParams[key]) && searchParams[key].length === 0)
        ) {
          delete searchParams[key];
        }
      });

      return searchParams;
    }

    if (sourceName === "NewsAPI") {
      console.log({ params });
      let searchParams: Record<string, string | string[]> = {
        q: !!params.q
          ? params.q
          : params.source?.length === 0 && !!params.category
          ? params.category
          : "",
        domains: params.source ?? "",
        from: params.date ?? "",
        to: params.date ?? "",
      };

      Object.keys(searchParams).forEach((key) => {
        if (
          searchParams[key] === "" ||
          (Array.isArray(searchParams[key]) && searchParams[key].length === 0)
        ) {
          delete searchParams[key];
        }
      });

      return searchParams;
    }

    searchParams.q = params.q ?? "";
    searchParams.from_date = params.date ?? "";
    searchParams.to_date = params.date ?? "";
    searchParams.section = params.category ?? "";
    searchParams.reference_type = params.source ?? "";
    searchParams["show-references"] = "author";

    Object.keys(searchParams).forEach((key) => {
      if (
        searchParams[key] === "" ||
        (Array.isArray(searchParams[key]) && searchParams[key].length === 0)
      ) {
        delete searchParams[key];
      }
    });

    return searchParams;
  }
}

export default RequestParamsFormatter;
