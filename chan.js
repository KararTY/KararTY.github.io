'use strict'
var XMLHttpRequest = XMLHttpRequest || {}

function request (opts, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 400) {
      return callback(null, xhr.getResponseHeader('Content-Type') !== null && xhr.getResponseHeader('Content-Type').indexOf('application/json') !== -1 ? JSON.parse(xhr.responseText) : xhr.responseText, xhr)
    }
    var msg = xhr.responseText || "Can't access"
    callback(Error(msg), null, xhr)
  }
  xhr.open(opts.method || 'GET', opts.url)
  for (var key in opts.headers) {
    xhr.setRequestHeader(key, opts.headers[key])
  }
  xhr.send(opts.data)
  return xhr
}

var chanBody = document.getElementById('comments')

const timedRequest = () => {
  request({ url: 'http://192.241.185.49/test', method: 'GET' }, (err, res) => {
    // console.log('Running')
    if (err) return console.log(err)
    else {
      let data = res
      chanBody.innerHTML = ''
      for (let i = 1; i < 22; i++) {
        let element = data[data.length - i]
        chanBody.innerHTML += `<div class="box chanReply"><strong>Anonymous</strong> No.<b>${(data.length - i)}</b><blockquote class="chanMessage">${element}</blockquote></div>`
      }
    }
  })
}
timedRequest()
setInterval(timedRequest, 3000)
