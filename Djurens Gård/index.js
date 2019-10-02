'use strict';

const { html, render } = window.lighterhtml

function arrayMax(arr) {
  var len = arr.length, max = -Infinity
  while (len--) {
    if (arr[len] > max) {
      max = arr[len]
    }
  }
  return max
}

function arrayMin(arr) {
  var len = arr.length, min = Infinity
  while (len--) {
    if (arr[len] < min) {
      min = arr[len]
    }
  }
  return min
}


let game

class Building {
  constructor (defaultStats) {
    if (defaultStats) {
      const keys = Object.keys(defaultStats)
      keys.map(key => this[key] = defaultStats[key])
    } else {
      this.defaultValue = 1
      this.addition = 1
      this.multiplier = 1
    }
  }
}

class Statistic {
  constructor (defaultValue, max) {
    this.value = defaultValue
    this.max = max
  }
}

class Game {
  constructor ({ save, mapEl, actionsEl, statsEl, newPlaythrough }) {
    if (!save) {
      save = {
        stats: {
          ideologi: new Statistic(0, 100),
          pengar: new Statistic(10),
          tillit: new Statistic(50, 100),
          befolkning: new Statistic(5, 5)
        },
        buildings: {
          lada: new Building({
            defaultValue: 1,
            addition: 1,
            multiplier: 1,
            improvementCosts: {
              'pengar': 10
            },
            upgradeCosts: {
              'pengar': 100
            }
          })
        },
        energy: new Statistic(1, 1),
        day: 1,
        deaths: 0
      }
    }

    this.save = save
    this.mapEl = mapEl
    this.actionsEl = actionsEl
    this.statsEl = statsEl
    this.newPlaythrough = newPlaythrough
  }

  failStates () {
    let text
    if (this.save.stats.ideologi.value < -99) text = 'Du har blivit jagad bort från gården.'
    else if (this.save.stats.ideologi.value > 99) text = 'Grattis, kamrat Napoleon.'
    else if (this.save.stats.tillit.value < 1) text = 'Du har blivit lönnmördad.'
    else if (this.save.stats.tillit.value > 99) text = 'Du behövs inte längre.'
    else if (this.save.stats.befolkning.value < 1) text = 'Du är ensam.'

    if (text) {
      this.mapEl.innerHTML = ''
      document.getElementById('song')
      document.getElementById('songfile').src = 'song2.mp3'
      song()
      document.getElementById('state').classList.remove('columns')
      document.getElementById('state').classList.remove('is-mobile')
      document.getElementById('state').classList.add('has-text-centered')

      const htmlContent = html`
        <h1 class="title is-1">Game over.</h1>
        <h2 class="subtitle is-2">${text}</h2>
        <h4 class="subtitle is-4">Du överlevde ${this.save.day} dagar.</h4>
        ${this.save.deaths > 0 ? html`<h4 class="subtitle is-4">${this.save.deaths} dog.</h4>` : undefined}
      `

      render(document.getElementById('state'), () => htmlContent)
      setInterval(() => {
        document.getElementById('state').style.marginTop = document.getElementById('state').style.marginTop === '-10px' ? '20px' : '-10px'
      }, 1000)
    }

    return !!text
  }

  update () {
    this.statsBuilder()
    if (this.newPlaythrough) {
      this.newPlaythrough = false
      const htmlContent = html`
        <h3>Välkommen till djurens gård.</h3>
        <br>
        <h4>
          <a onclick="${() => {
            this.update.bind(this)()
            song()
          }}">[Påbörja]</a>
        </h4>
      `
    render(this.actionsEl, () => htmlContent)
    } else if (!this.failStates()) {
      this.farmBuilder()
      this.mainActions()
    }
  }

  farmBuilder () {
    let result = ``
  
    let objectOfBuildings = Object.keys(buildings).filter(building => Object.keys(this.save.buildings).includes(building))
    let arrayOfBuildings = []
  
    for (let i = 0; i < objectOfBuildings.length; i++) {
      let buildCoordinates = buildings[objectOfBuildings[i]].match(/\{[0-9,]+\}/g).map(coordinate => coordinate.split(',').map(str => Number(str.replace(/[^0-9]/g, ''))))

      let buildSymbols = buildings[objectOfBuildings[i]].split(/\{[0-9,]+\}/g).filter(Boolean)
      const buildSymbolsLength = Number(buildSymbols.length)

      const xValuesMax = arrayMax(buildCoordinates.map(coordinate => coordinate[1]))
      // const xValuesMin = arrayMin(buildCoordinates.map(coordinate => coordinate[1]))

      const yValuesMax = arrayMax(buildCoordinates.map(coordinate => coordinate[0])) + 1
      // const yValuesMin = arrayMin(buildCoordinates.map(coordinate => coordinate[0]))

      for (let ii = 0; ii < buildSymbolsLength; ii++) {
        if (yValuesMax > buildSymbols.length) {
          buildSymbols[buildCoordinates[ii][0]] = buildSymbols[ii]
          buildSymbols[ii] = ''
          buildCoordinates[buildCoordinates[ii][0]] = buildCoordinates[ii]
          buildCoordinates[ii] = Array(2)
        }
      }

      buildCoordinates = Array.from(buildCoordinates, i => i || '')
      buildSymbols = Array.from(buildSymbols, i => i || '')

      for (let y = 0; y < yValuesMax; y++) {
        if (!arrayOfBuildings[y]) arrayOfBuildings[y] = []

        for (let ii = 0; ii < buildSymbols[y].length; ii++) {
          const symbol = buildSymbols[y][ii]

          const x = buildCoordinates[y][1]
          if (!arrayOfBuildings[y][x + ii] || arrayOfBuildings[y][x + ii].length > 0) {
            arrayOfBuildings[y][x + ii] = `${symbol === '[' ? `<a data-i="lorem" data-building="${objectOfBuildings[i]}">` : ''}${symbol}${symbol === ']' ? `</a>` : ''}`
          }
        }
      }
    }

    arrayOfBuildings = Array.from(arrayOfBuildings, xAxis => Array.from(xAxis, symbol => symbol || ' '))

    for (let y = 0; y < arrayOfBuildings.length; y++) {
      result += arrayOfBuildings[y].join('')
      if (y < arrayOfBuildings.length - 1) result += '<br>'
    }

    const htmlContent = html`<pre>${{ html: result }}</pre>`

    htmlContent.querySelectorAll('[data-i]').forEach(el => {
      if (el.dataset.building) {
        el.removeAttribute('data-i')
        el.onclick = () => this.building.bind(this)(el)
      }
    })

    render(this.mapEl, () => htmlContent)
  }

  building (el) {
    const htmlContent = this.menuBuilder(el.dataset.building)
    render(this.actionsEl, () => htmlContent)
  }

  menuBuilder (name) {
    let result

    const texts = {
      name: `${name}${['lada', 'stia'].map(ending => name.endsWith(ending)).filter(Boolean).length > 0 ? 'n' : ' byggnaden'}`.toUpperCase()
    }
    switch (name) {
      case 'lada':
      case 'grisstia':
        result = html`
          <h3>${texts.name}</h3>
          ${this.save.buildings[name].improvementCosts ? html`
              <h4 class="is-marginless">
                <a onclick="${(el) => this.action.bind(this)(el)}" data-type="förbättra" data-name="${name}">[Förbättra]</a> <span>(Effektiviserar arbete)</span>
              </h4>
              <h4>Kostar: ${Object.entries(this.save.buildings[name].improvementCosts).map(cost => `x${cost[1]} ${cost[0].toUpperCase()}`).join(', ')}<h4>
            </p>
          ` : undefined}
          ${this.save.buildings[name].upgradeCosts ? html`
            <h4 class="is-marginless">
              <a onclick="${(el) => this.action.bind(this)(el)}" data-type="uppgradera" data-name="${name}">[Uppgradera]</a> <span>(${name === 'grisstia' ? 'Utför mer för varje dag' : 'Låser upp nya arbeten'})</span>
            </h4>
            <h4>Kostar: ${Object.entries(this.save.buildings[name].upgradeCosts).map(cost => `x${cost[1]} ${cost[0].toUpperCase()}`).join(', ')}</h4>
          ` : undefined}
          <h4>
            <a onclick="${(el) => this.action.bind(this)(el)}" data-type="stäng">[Stäng]</a>
          </h4>
        `
        break
      default:
        result = html`
          <h3>${texts.name}</h3>
        `
        break
    }

    return result
  }

  action (el) {
    const type = el.srcElement.dataset.type
    let name
    let building
    if (el.srcElement.dataset.name) {
      name = el.srcElement.dataset.name
      building = this.save.buildings[name]
    }
    switch (type) {
      case 'förbättra': {
        const improvements = Object.keys(building.improvementCosts)
        if (improvements.map(key => this.save.stats[key].value - building.improvementCosts[key]).filter(num => num >= 0).length === improvements.length) {
          for (let i = 0; i < improvements.length; i++) {
            this.save.stats[improvements[i]].value -= building.improvementCosts[improvements[i]]

            building.addition++
            building.multiplier += 0.01

            building.improvementCosts[improvements[i]]++
            building.improvementCosts[improvements[i]] = parseInt(building.multiplier * building.improvementCosts[improvements[i]])
          }
          this.update()
          const htmlContent = this.menuBuilder(name)
          render(this.actionsEl, () => htmlContent)
        }
        break
      }
      case 'uppgradera': {
        const upgrades = Object.keys(building.upgradeCosts)
        if (upgrades.map(key => this.save.stats[key].value - building.upgradeCosts[key]).filter(num => num >= 0).length === upgrades.length) {
          for (let i = 0; i < upgrades.length; i++) {
            this.save.stats[upgrades[i]].value -= building.upgradeCosts[upgrades[i]]

            building.addition++
            building.multiplier += 0.01

            building.upgradeCosts[upgrades[i]]++
            building.upgradeCosts[upgrades[i]] = parseInt(building.multiplier * building.upgradeCosts[upgrades[i]])
            if (name === 'grisstia') building.upgradeCosts[upgrades[i]] = parseInt(building.multiplier * building.upgradeCosts[upgrades[i]])
          }

          if (name === 'lada' && building.addition > 1) {
            building.upgradeCosts = undefined
            this.save.buildings.grisstia = new Building({
              defaultValue: 1,
              addition: 1,
              multiplier: 1,
              improvementCosts: {
                'pengar': 20
              },
              upgradeCosts: {
                'pengar': 200
              }
            })
          } else if (name === 'grisstia') {
            this.save.energy.max++
          }

          this.update()
          const htmlContent = this.menuBuilder(name)
          render(this.actionsEl, () => htmlContent)
        }
        break
      }
      case 'work':
        if (this.save.energy.value > 0) {
          // Money makers.
          this.save.stats.pengar.value += this.save.buildings.lada.addition
          // Ideology breakers.
          this.save.stats.ideologi.value--
          // Trust breakers.
          this.save.stats.tillit.value--
        }
        break
      case 'entertain':
        if (this.save.energy.value > 0) {
          // Money breakers.
          const price = parseInt(this.save.buildings.lada.addition * 0.25)
          this.save.stats.pengar.value -= price || 1
          // Trust maker.
          this.save.stats.tillit.value++
        }
        break
      case 'propagate':
        if (this.save.energy.value > 0) {
          // Money breakers.
          this.save.stats.pengar.value -= parseInt(this.save.buildings.lada.addition * 0.5)
          // Ideology maker.
          this.save.stats.ideologi.value += this.save.buildings.grisstia.addition
        }
        break
      default:
        this.mainActions()
        break
    }
    if (['work', 'entertain', 'propagate'].includes(type)) {
      this.save.energy.value--

      // Population decimator.
      if (this.save.stats.befolkning.value > this.save.stats.pengar.value) {
        const death = Math.random()
        if (death < 0.5) {
          this.save.stats.befolkning.value--
          this.save.deaths += 1
        }
      }

      if (this.save.energy.value === 0) {
        this.save.energy.value = this.save.energy.max

        this.save.day++

        if (!this.save.nextDay) this.save.nextDay = 7
        else if (this.save.day >= this.save.nextDay) {
          this.save.nextDay += 7
          this.save.stats.befolkning.value++
        }

        if (this.save.stats.ideologi.value > 0 && !document.getElementById('name').innerText.startsWith('H')) render(document.getElementById('name'), () => html`Herrgården`)
        if (this.save.stats.ideologi.value < 0 && !document.getElementById('name').innerText.startsWith('D')) render(document.getElementById('name'), () => html`Djurens gård`)
        render(document.getElementById('day'), () => html`Dag ${this.save.day}`)
        const htmlContent = html`<h3>${el.srcElement.innerText.toUpperCase()}...</h3><br><h4>Det är nu dag ${this.save.day}.</h4>`
        if (['entertain', 'propagate'].includes(type)) render(this.actionsEl, () => htmlContent)
        setTimeout(() => this.update(), type === 'entertain' ? 1000 : type === 'propagate' ? 500 : 0)
      } else this.update()
    }
  }

  statsBuilder () {
    const stats = this.save.stats
    const statNames = Object.keys(stats)
    render(this.statsEl, () => html`
      ${statNames.map(statName => html`
        <div class="column">
          <strong>${statName.toUpperCase()}</strong>
          ${['pengar', 'befolkning'].includes(statName) ? html`<h5 class="subtitle is-5">[${stats[statName].value}]</h5>` : html`<progress class="${`progress${statName === 'ideologi' ? (stats[statName].value > 0 ? ' is-danger' : ' is-success' ) : ''}`}" value="${statName === 'ideologi' && stats[statName].value < 0 ? - stats[statName].value.toString() : stats[statName].value.toString() }" max="${stats[statName].max}"></progress>`}
        </div>
      `)}
    `)
  }

  mainActions () {
    const htmlContent = html`
      <h3>Tryck på texterna åt höger för ytterligare tillgängliga åtgärder.</h3>
      <br>
      <h4>Du har ${this.save.energy.value} / ${this.save.energy.max} energi.</h4>
      <h4 class="has-text-centered">
        <a onclick="${(el) => this.action.bind(this)(el)}" data-type="work">[Jobba]</a>
      </h4>
      <h4 class="has-text-centered">
        <a onclick="${(el) => this.action.bind(this)(el)}" data-type="entertain">[Roa]</a>
      </h4>
      ${this.save.buildings.grisstia ? html`
        <h4 class="has-text-centered">
          <a onclick="${(el) => this.action.bind(this)(el)}" data-type="propagate">[Propagera]</a>
        </h4>
      ` : undefined}
    `
    render(this.actionsEl, () => htmlContent)
  }
}

(function start () {
  // Check for save.
  // New game.
  game = new Game({
    mapEl: document.getElementById('map'),
    actionsEl: document.getElementById('actions'),
    statsEl: document.getElementById('stats'),
    newPlaythrough: true
  })

  game.update()
})()

function song () {
  const song = document.getElementById('song')
  if (!song.hasAttribute('volume')) {
    song.volume = 0.3
    song.setAttribute('volume', 0.3)
  }
  song.autoplay = true
  song.loop = true
  song.controls = true
  song.load()
  song.play()
}