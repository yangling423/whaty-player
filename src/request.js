export default {
  send: function (url, options) {
    options || (options = { })

    let method = options.method ? options.method.toUpperCase() : 'GET'
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 1) {
        // xhr.setRequestHeader('Access-Control-Allow-Origin', '*')
      }
      if (xhr.readyState === 4) {
        if (options.onComplete && typeof options.onComplete === 'function') {
          options.onComplete(xhr.response)
        }
        if (xhr.status === 200) {
          if (options.success && typeof options.success === 'function') {
            options.success(xhr.response)
          }
        } else {
          if (options.error && typeof options.error === 'function') {
            options.error(new Error(xhr.statusText))
          }
        }
      }
    }

    let regex = /^(?:(http|https|ftp):\/\/)/i
    if (process.env.NODE_ENV === 'production' && !regex.test(url)) {
      url = 'http://shc02.frp.o-learn.cn' + url
    }
    xhr.open(method, url, true)

    if (method === 'POST' || method === 'PUT') {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }

    xhr.send(options.body || '')
    return xhr
  }
}
