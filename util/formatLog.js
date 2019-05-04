function formatRes(ctx, costTime) {
  let { method, url, response } = ctx
  return { method, url, costTime, response }
}

function formatError(ctx, err, costTime) {
  let { method, url, body, userAgent } = ctx
  return { userAgent, method, url, body, costTime, err }
}

module.exports = { formatRes, formatError }