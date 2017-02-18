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

var tbody = document.getElementById('tbody')

request({ url: 'http://192.241.185.49/pewdiegate', method: 'GET' }, (err, res) => {
  console.log('Running')
  if (err) return console.log(err)
  else {
    var data = res.data
    // Append items to document table body
    for (var i = 0; i < data.length; i++) {
      var element = data[i]

      var tr = document.createElement('tr')
      var td = document.createElement('td')
      var a = document.createElement('a')
      a.setAttribute('href', element.link[0])
      a.innerText = element.link[1]
      td.appendChild(a)
      tr.appendChild(td)

      var td2 = document.createElement('td')
      if (element.title.length > 30) {
        var titleText = element.title
        var substringText = titleText.substr(0, 29)
        substringText += '...'
        td2.innerText = substringText
      } else td2.innerText = element.title
      tr.appendChild(td2)

      var td3 = document.createElement('td')
      td3.innerText = element.date
      tr.appendChild(td3)

      var td4 = document.createElement('td')
      td4.innerText = element.publication
      tr.appendChild(td4)

      var td5 = document.createElement('td')
      var authors = ''
      for (var o = 0; o < element.authors.length; o++) {
        var el = element.authors[o]
        authors += `<a target="_blank" href="${el[1]}">${el[0]}</a> `
      }
      td5.innerHTML = authors
      tr.appendChild(td5)

      // Append to tbody.
      tbody.appendChild(tr)
    }
  }
})

/* JonTron is awesome.
PewDiePie is also awesome.
If you have feedback, send them to (alremahykarar@ymail.com) */

// Include list.js for search / filter function (?)
