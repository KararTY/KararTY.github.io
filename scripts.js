var ctx = document.getElementById('canvas')

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
function sortProperties (obj) {
  // convert object into array
  var sortable = []
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      sortable.push([key, obj[key]]) // each item is an array in format [key, value]
    }
  }
  // sort items by value
  sortable.sort(function (a, b) {
    return b[1] - a[1] // compare numbers
  })
  return sortable // array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
}
request({ url: 'http://192.241.185.49/', method: 'GET' }, (err, res) => {
  console.log('Running')
  if (err) return console.log(err)
  else {
    // console.log(res)
    // var topTenArray = []
    res = sortProperties(res)
    console.log(res)
    var maximum = res.length
    var minimum = 0
    var randomnumber = Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
    document.getElementById('randNoun').innerText = res[randomnumber][0]
    var data = {
      labels: [res[0][0], res[1][0], res[2][0], res[3][0], res[4][0], res[5][0], res[6][0], res[7][0], res[8][0], res[9][0]],
      datasets: [
        {
          label: 'Mentioned',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1,
          data: [res[0][1], res[1][1], res[2][1], res[3][1], res[4][1], res[5][1], res[6][1], res[7][1], res[8][1], res[9][1]]
        }
      ]
    }
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        scales: {
          xAxes: [{
            stacked: true
          }],
          yAxes: [{
            stacked: true
          }]
        }
      }
    })
  }
})
