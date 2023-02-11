const getPaginatedWrapper = (data, limit, skip, count, requestURL) => {
    const requestURLWithoutQuery = requestURL.split('?')[0];
  
    return {
      data,
      limit,
      skip,
      count,
      next: `${requestURLWithoutQuery}?skip=${skip + limit}&limit=${limit}`,
      previous: `${requestURLWithoutQuery}?skip=${Math.max(skip - limit, 0)}&limit=${limit}`,
    };
  };
  
  module.exports = getPaginatedWrapper;