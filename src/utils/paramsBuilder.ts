const buildParams = (filters: any): string => {
  const params = new URLSearchParams();

  Object.keys(filters).forEach((key) => {
    if (!!filters[key]) params.append(key, filters[key]);
  });

  return !!params.toString() ? `?${params.toString()}` : "";
};

export default buildParams;
