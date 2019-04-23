function formatRes(ctx, costTime) {
  let { method, url, body, response } = ctx
  return { method, url, body, costTime, response }
}

function formatError(ctx, err, costTime) {
  let { method, url, body, userAgent } = ctx
  return { userAgent, method, url, body, costTime, err }
}

module.exports = { formatRes, formatError }