var ctx = document.getElementById('canvas')

function request (opts, callback) {
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4) return
    if (xhr.status >= 200 && xhr.status < 400) {
      return callback(null, xhr.getResponseHeader('Content-Type') != null && xhr.getResponseHeader('Content-Type').indexOf('application/json') != -1 ? JSON.parse(xhr.responseText) : xhr.responseText, xhr)
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

request({url: 'http://192.241.185.49/', method: 'GET'}, (err, res) => {
  console.log('Running')
  if (err) return console.log(err)
  else {
    var data = JSON.parse(res)
    // var topTenArray = []

    data.sort(function (a, b) { return b - a })
    console.log(data)
    var data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: '"Noun"',
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          data: [1, 2, 3, 4, 5, 6, 7, 9, 10]
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
