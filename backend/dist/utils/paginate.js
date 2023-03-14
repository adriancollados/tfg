"use strict";

var getPaginatedWrapper = function getPaginatedWrapper(data, limit, skip, count, requestURL) {
  var requestURLWithoutQuery = requestURL.split('?')[0];
  return {
    data: data,
    limit: limit,
    skip: skip,
    count: count,
    next: "".concat(requestURLWithoutQuery, "?skip=").concat(skip + limit, "&limit=").concat(limit),
    previous: "".concat(requestURLWithoutQuery, "?skip=").concat(Math.max(skip - limit, 0), "&limit=").concat(limit)
  };
};
module.exports = getPaginatedWrapper;