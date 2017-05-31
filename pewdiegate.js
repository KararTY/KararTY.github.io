'use strict'

var tbody = document.getElementById('tbody')

window.addEventListener('load', (window) => {
  var res = {
    'data': [
      {
        'link': ['https://archive.is/eFWqs', 'Archive'],
        'title': 'Disney Severs Ties With YouTube Star PewDiePie After Anti-Semitic Posts',
        'date': '14 Feb, 2017',
        'publication': 'The Wall Street Journal',
        'authors': [['Rolfe Winkler', 'https://twitter.com/RolfeWinkler'], ['Jack Nicas', 'https://twitter.com/jacknicas'], ['Ben Fritz', 'https://twitter.com/benfritz']]
      },
      {
        'link': ['https://archive.is/N8qN2', 'Archive'],
        'title': "When did fascism become so cool? PewDiePie's antics are the thin end of the wedge",
        'date': '14 Feb, 2017',
        'publication': 'The Independent',
        'authors': [['Kirsty Major', 'https://twitter.com/Kirsty_Maj0r']]
      },
      {
        'link': ['https://archive.is/eFWqs', 'Archive'],
        'title': "PewDiePie's 'Anti-Semitic Video' is Still on His YouTube Channel",
        'date': '15 Feb, 2017',
        'publication': 'Time',
        'authors': [['Feliz Solomon', '']]
      },
      {
        'link': ['https://archive.fo/FvshH', 'Archive'],
        'title': 'PewDiePie Says WSJ Took Anti-Semitic Content Out of Context',
        'date': '15 Feb, 2017',
        'publication': 'The Wall Street Journal',
        'authors': [['Rolfe Winkler', 'https://twitter.com/RolfeWinkler'], ['Jack Nicas', 'https://twitter.com/jacknicas'], ['Ben Fritz', 'https://twitter.com/benfritz']]
      },
      {
        'link': ['https://archive.fo/3rRqZ', 'Archive'],
        'title': 'How the most popular YouTuber in the world lost the ability to play the victim',
        'date': '15 Feb, 2017',
        'publication': 'Polygon',
        'authors': [['Ben Kuchera', 'http://www.deepfreeze.it/journo.php?j=Ben_Kuchera']]
      },
      {
        'link': ['http://archive.is/6s78x', 'Archive'],
        'title': "Disney severs ties with YouTube's most-watched star PewDiePie after he posted anti-Semitic videos where men called for 'death to all Jews'",
        'date': '14 Feb, 2017',
        'publication': 'Daily Mail',
        'authors': [['DAILY MAIL REPORTER', '']]
      },
      {
        'link': ['https://archive.fo/3tCT5', 'Archive'],
        'title': "YouTube Stars' Defense of PewDiePie Is Bullshit",
        'date': '15 Feb, 2017',
        'publication': 'Gizmodo',
        'authors': [['Bryan Menegus', 'https://twitter.com/BryanDisagrees']]
      },
      {
        'link': ['http://archive.is/3KAvl', 'Archive'],
        'title': "PewDiePie's fall shows the limits of 'LOL JK'",
        'date': '16 Feb, 2017',
        'publication': 'WIRED',
        'authors': [['Emma Grey Ellis', 'https://twitter.com/EmmaGreyEllis']]
      },
      {
        'link': ['http://archive.is/Bf2up', 'Archive'],
        'title': 'PewDiePie says The Wall Street Journal is out to get him in apology for Nazi jokes',
        'date': '16 Feb, 2017',
        'publication': 'The Verge',
        'authors': [['Jacob Kastrenakes', '']]
      },
      {
        'link': ['http://archive.is/TTE31', 'Archive'],
        'title': "An attack by the media': Pewdiepie apologizes for Nazi jokes but says the press is out to get him",
        'date': '16 Feb, 2017',
        'publication': 'The Washington Post',
        'authors': [['Abby Ohlheiser', '']]
      },
      {
        'link': ['http://archive.is/kGVdc', 'Archive'],
        'title': 'Is YouTube sensation PewDiePie really a Nazi? His intentions matter less than his effect',
        'date': '16 Feb, 2017',
        'publication': 'SALON',
        'authors': [['Matthew Sheffield', '']]
      },
      {
        'link': ['https://archive.fo/3p5XT', 'Archive'],
        'title': "PewDiePie thinks 'Death to all Jews' is a joke. Are you laughing yet?",
        'date': '14 Feb, 2017',
        'publication': 'The Guardian',
        'authors': [['Arwa Mahdawi', '']]
      },
      {
        'link': ['http://archive.is/ohuUP', 'Archive'],
        'title': 'Disney cuts ties with YouTube star PewDiePie over antisemitic videos',
        'date': '14 Feb, 2017',
        'publication': 'The Guardian',
        'authors': [['Olivia Solon', '']]
      },
      {
        'link': ['http://archive.is/fs3K8', 'Archive'],
        'title': "PewDiePie's ''apology'' for Nazi jokes shows that he still doesn't get it",
        'date': '16 Feb, 2017',
        'publication': 'Tech.Mic',
        'authors': [['Tim Mulkerin', '']]
      },
      {
        'link': ['http://archive.is/frih2', 'Archive'],
        'title': 'Disney ends deal with YouTube star PewDiePie over Nazi imagery and jokes',
        'date': '14 Feb, 2017',
        'publication': 'Los Angeles Times',
        'authors': [['Nina Agrawal', '']]
      },
      {
        'link': ['https://archive.fo/GpFeA', 'Archive'],
        'title': 'PewDiePie responds to Disney dismissal by attacking media',
        'date': '16 Feb, 2017',
        'publication': 'Polygon',
        'authors': [['Allegra Frank', 'https://twitter.com/LegsFrank']]
      },
      {
        'link': ['http://archive.is/wXb2e', 'Archive'],
        'title': "Here's Why PewDiePie Will Still Earn Millions, Even After Anti-Semitic Videos",
        'date': '16 Feb, 2017',
        'publication': 'Forbes',
        'authors': [['Madeline Berg', '']]
      },
      {
        'link': ['https://archive.fo/8RyvX', 'Archive'],
        'title': "PewDiePie defends YouTube videos where he paid people to shout 'death to all Jews'",
        'date': '14 Feb, 2017',
        'publication': 'The Independent',
        'authors': [['Andrew Griffin', 'https://twitter.com/_andrew_griffin']]
      },
      {
        'link': ['http://archive.is/aCZb9', 'Archive'],
        'title': 'PewDiePie Apologizes for Anti-Semitic Jokes, but Attacks Media for Taking Them Out of Context',
        'date': '16 Feb, 2017',
        'publication': 'Variety',
        'authors': [['Todd Spangler', 'https://twitter.com/xpangler']]
      },
      {
        'link': ['http://archive.is/80nRr', 'Archive'],
        'title': "Believe it! Our columnist defends the 'anti-Semitism' of YouTube star PewDiePie",
        'date': '14 Feb, 2017',
        'publication': 'New York Daily News',
        'authors': [['Gersh Kuntzman', 'https://twitter.com/GershKuntzman']]
      },
      {
        'link': ['https://archive.is/GWdZv', 'Archive'],
        'title': 'PewDiePie Incident Means More Scrutiny for Influencers',
        'date': '15 Feb, 2017',
        'publication': 'The Wall Street Journal',
        'authors': [['Mike Shields', '']]
      },
      {
        'link': ['http://archive.is/nQUiW', 'Archive'],
        'title': 'YouTube’s Monster: PewDiePie and His Populist Revolt',
        'date': '16 Feb, 2017',
        'publication': 'New York Times',
        'authors': [['John Herrman', '']]
      },
      {
        'link': ['https://archive.is/4IY4k', 'Archive'],
        'title': 'Farhad’s and Mike’s Week in Tech: A Letter From Zuckerberg and the Fall of PewDiePie',
        'date': '18 Feb, 2017',
        'publication': 'New York Times',
        'authors': [['Farhad Manjoo', ''], ['Mike Isaac', '']]
      },
      {
        'link': ['https://archive.is/z6Muk', 'Archive'],
        'title': 'PewDiePie Dust-Up Shows Risks Brands Take to Tap Into Social Media',
        'date': '19 Feb, 2017',
        'publication': 'New York Times',
        'authors': [['Sapna Maheshwari', '']]
      },
      {
        'link': ['https://archive.is/ZoodT', 'Archive'],
        'title': 'How YouTube star PewDiePie thrives on controversy',
        'date': '17 Feb, 2017',
        'publication': 'Financial Times',
        'authors': [['Madhumita Murgia', '']]
      },
      {
        'link': ['https://archive.is/Zj2QQ', 'Archive'],
        'title': "Pewdiepie Isn't an Anti-Semite, He's Just a Tool",
        'date': '14 Feb, 2017',
        'publication': 'Kotaku UK',
        'authors': [['Richard Stanton', 'http://www.deepfreeze.it/journo.php?j=richard_stanton']]
      },
      {
        'link': ['https://archive.is/d3Spv', 'Archive'],
        'title': 'PewDiePie’s Trumpian Media Criticism',
        'date': '16 Feb, 2017',
        'publication': 'New York Magazine',
        'authors': [['Brian Feldman', '']]
      },
      {
        'link': ['https://archive.is/oIkAR', 'Archive'],
        'title': 'PewDiePie and the Potential Dangers of Social Influencer Marketing for Brands',
        'date': '14 Feb, 2017',
        'publication': 'Adweek',
        'authors': [['Sami Main', 'https://twitter.com/samimain']]
      },
      {
        'link': ['https://archive.is/oPiRV', 'Archive'],
        'title': "Why does PewDiePie get 'attacked' and South Park gets a pass for anti-Semitic jokes?",
        'date': '17 Feb, 2017',
        'publication': 'Polygon',
        'authors': [['Ben Kuchera', 'http://www.deepfreeze.it/journo.php?j=Ben_Kuchera']]
      },
      {
        'link': ['https://archive.fo/xENI1', 'Archive'],
        'title': "PewDiePie versus the media: Why he's so mad to be losing the fight",
        'date': '15 Feb, 2017',
        'publication': 'Polygon',
        'authors': [['Ben Kuchera', 'http://www.deepfreeze.it/journo.php?j=Ben_Kuchera']]
      },
      {
        'link': ['https://archive.fo/5M2gr', 'Archive'],
        'title': "PewDiePie and Trump aren't hurting the press, but they desperately want to",
        'date': '18 Feb, 2017',
        'publication': 'Polygon',
        'authors': [['Ben Kuchera', 'http://www.deepfreeze.it/journo.php?j=Ben_Kuchera']]
      },
      {
        'link': ['https://archive.fo/eQ3TO', 'Archive'],
        'title': 'Trump and PewDiePie are using the same playbook',
        'date': '16 Feb, 2017',
        'publication': 'The Verge',
        'authors': [['Ben Popper', '']]
      },
      {
        'link': ['https://archive.fo/XwLbX', 'Archive'],
        'title': "The controversy over YouTube star PewDiePie and his anti-Semitic ''jokes,'' explained",
        'date': '17 Feb, 2017',
        'publication': 'Vox',
        'authors': [['Aja Romero', '']]
      },
      {
        'link': ['https://archive.is/Fs3cx', 'Archive'],
        'title': 'Disney ditches Pewdiepie after anti-semitic stunt',
        'date': '16 Feb, 2017',
        'publication': 'Eurogamer',
        'authors': [['Tom Philips', '']]
      },
      {
        'link': ['https://archive.is/8VqB9', 'Archive'],
        'title': 'Opinion: PewDiePie And The Effect Of Speech Meeting Reality',
        'date': '15 Feb, 2017',
        'publication': 'USGamer',
        'authors': [['Mike Williams', '']]
      },
      {
        'link': ['https://archive.is/YT1Ho', 'Archive'],
        'title': 'What developers can learn from PewDiePie',
        'date': '17 Feb, 2017',
        'publication': 'GamesIndustry.biz',
        'authors': [['Brendan Sinclair', '']]
      },
      {
        'link': ['http://archive.is/GylAP', 'Archive'],
        'title': 'PewDiePie Officially Responds To Hate Speech Allegations',
        'date': '16 Feb, 2017',
        'publication': 'Game Revolution',
        'authors': [['Jonathan Leack', '']]
      },
      {
        'link': ['http://archive.is/fgT14', 'Archive'],
        'title': 'YouTube Community Rallies Behind PewDiePie In Incredible Numbers',
        'date': '17 Feb, 2017',
        'publication': 'Game Revolution',
        'authors': [['Jonathan Leack', '']]
      },
      {
        'link': ['http://archive.is/gKLUK', 'Archive'],
        'title': 'PewDiePie responds to reports of anti-Semitic content',
        'date': '16 Feb, 2017',
        'publication': 'GameZone',
        'authors': [['Tatiana Morris', '']]
      },
      {
        'link': ['https://archive.is/jfEAr', 'Archive'],
        'title': 'PewDiePie Apologizes For Anti-Semitic Content, Accuses Media Of Attacking Him',
        'date': '16 Feb, 2017',
        'publication': 'GameSpot',
        'authors': [['Tamoor Hussain', ''], ['Oscar Dayus', '']]
      },
      {
        'link': ['http://archive.is/cvQEy', 'Archive'],
        'title': "Pewdiepie responds to 'attack' over anti-Semitic video, invites media to 'try again'",
        'date': '16 Feb, 2017',
        'publication': 'PC Gamer',
        'authors': [['Andy Chalk', '']]
      },
      {
        'link': ['https://archive.fo/1ekCl', 'Archive'],
        'title': "How PewDiePie ''fudged the labels'' to avoid anti-Semitism claims because of his YouTube videos",
        'date': '15 Feb, 2017',
        'publication': 'Salon',
        'authors': [['Matthew Rozsa', '']]
      },
      {
        'link': ['https://archive.is/iiyZp', 'Archive'],
        'title': 'If PewDiePie survives this scandal, anything goes',
        'date': '14 Feb, 2017',
        'publication': 'Mashable',
        'authors': [['Saba Hamedy', '']]
      },
      {
        'link': ['https://archive.fo/7yEJx', 'Archive'],
        'title': 'The Pewdiepie fiasco is a massive overreaction',
        'date': '18 Feb, 2017',
        'publication': 'Business Insider',
        'authors': [['Dave Smith', '']]
      },
      {
        'link': ['https://archive.is/8PjRJ', 'Archive'],
        'title': "He's not an anti-Semite': YouTubers rally behind PewDiePie",
        'date': '18 Feb, 2017',
        'publication': 'Business Insider',
        'authors': [['Shona Ghosh', '']]
      },
      {
        'link': ['https://archive.is/H93hd', 'Archive'],
        'title': 'PewDiePie taught YouTube a valuable lesson',
        'date': '18 Feb, 2017',
        'publication': 'Business Insider',
        'authors': [['Steve Kovach', '']]
      },
      {
        'link': ['https://archive.is/XNsQG', 'Archive'],
        'title': 'What someone who worked closely with PewDiePie thinks about Disney and YouTube dropping him',
        'date': '20 Feb, 2017',
        'publication': 'Business Insider',
        'authors': [['Nathan McAlone', '']]
      },
      {
        'link': ['https://archive.is/4wCME', 'Archive'],
        'title': 'What children learn from PewDiePie, Stampy and DanTDM',
        'date': '18 Feb, 2017',
        'publication': 'The Irish Times',
        'authors': [["Jennifer O'Connell", '']]
      },
      {
        'link': ['http://archive.is/VYuyj', 'Archive'],
        'title': 'The Media Failed in its Coverage of the PewDiePie Controversy',
        'date': '17 Feb, 2017',
        'publication': 'The Escapist',
        'authors': [['Liz Finnegan', '']]
      },
      {
        'link': ['http://archive.is/MBURM', 'Archive'],
        'title': 'PewDiePie - The Corporate World is not Ready for Internet Culture',
        'date': '14 Feb, 2017',
        'publication': 'Game Objective',
        'authors': [['Brad Glasgow', '']]
      },
      {
        'link': ['http://archive.is/JMY5W', 'Archive'],
        'title': 'YouTube Community Rallies Around PewDiePie',
        'date': '16 Feb, 2017',
        'publication': 'Game Objective',
        'authors': [['Brad Glasgow', '']]
      },
      {
        'link': ['https://archive.fo/Qd766', 'Archive'],
        'title': "PewDiePie's Misguided War On The Media Sounds Familiar",
        'date': '17 Feb, 2017',
        'publication': 'Forbes',
        'authors': [['Paul Tassi', '']]
      },
      {
        'link': ['http://archive.is/VGByU', 'Archive'],
        'title': 'How PewDiePie Just Got Rekted by Chan Culture Page 1',
        'date': '17 Feb, 2017',
        'publication': 'Forbes',
        'authors': [['Fruzsina Eordogh', '']]
      },
      {
        'link': ['https://archive.is/IO4LV', 'Archive'],
        'title': 'How PewDiePie Just Got Rekted by Chan Culture Page 2',
        'date': '17 Feb, 2017',
        'publication': 'Forbes',
        'authors': [['Fruzsina Eordogh', '']]
      },
      {
        'link': ['https://archive.is/JXwqS', 'Archive'],
        'title': 'PewDiePie May Be Offensive, But Does He Really Deserve All The Hate?',
        'date': '17 Feb, 2017',
        'publication': 'Forbes',
        'authors': [['Dani Di Placido', '']]
      },
      {
        'link': ['https://archive.is/2fFY6', 'Archive'],
        'title': "PewDiePie brands media 'insane' over anti-Semitism claims but admits he made a mistake in 'death to all Jews' video",
        'date': '17 Feb, 2017',
        'publication': 'The Independent',
        'authors': [['Andrew Griffin', 'https://twitter.com/_andrew_griffin']]
      },
      {
        'link': ['https://archive.is/9tUA7', 'Archive'],
        'title': 'PewDiePie Is Only Part of the Problem',
        'date': '17 Feb, 2017',
        'publication': 'Glixel',
        'authors': [['Luke Winkie', '']]
      },
      {
        'link': ['https://archive.fo/jRf6f', 'Archive'],
        'title': "PewDiePie Isn't A Monster; He's Someone You Know",
        'date': '16 Feb, 2017',
        'publication': 'Bu(SS)feed',
        'authors': [['Jacob Clifton', '']]
      },
      {
        'link': ['https://archive.is/mpLZr', 'Archive'],
        'title': "PewDiePie Is Playing With Anti-Semitic Fire, but His 53 Million Fans Aren't Going Anywhere",
        'date': '14 Feb, 2017',
        'publication': 'Heatstreet',
        'authors': [['William Hicks', '']]
      },
      {
        'link': ['https://archive.is/OJy8I', 'Archive'],
        'title': "Playing the Pawn in PewDiePie's Blame Game",
        'date': '17 Feb, 2017',
        'publication': 'Variety',
        'authors': [['Andrew Wallenstein', '']]
      },
      {
        'link': ['https://archive.is/FKry7', 'Archive'],
        'title': 'YouTube stars defend PewDiePie after anti-Semitism fallout',
        'date': '17 Feb, 2017',
        'publication': 'Variety',
        'authors': [['Will Thorne', '']]
      },
      {
        'link': ['https://archive.is/1ZyQE', 'Archive'],
        'title': 'PewDiePie fans are pointing out that Disney’s made some pretty racist cartoons',
        'date': '16 Feb, 2017',
        'publication': 'Metro UK',
        'authors': [['Ashitha Nagesh', '']]
      },
      {
        'link': ['https://archive.is/Xq8YD', 'Archive'],
        'title': "PewDiePie calls out media ''attack'' in response to Disney fallout",
        'date': '17 Feb, 2017',
        'publication': 'Ars Technica',
        'authors': [['Valentine Palladino', '']]
      },
      {
        'link': ['https://archive.is/TSl54', 'Archive'],
        'title': "PewDiePie hits out at media for 'misrepresenting' him over anti-Semitism controversy",
        'date': '17 Feb, 2017',
        'publication': 'NME.com',
        'authors': [['Nick Levine', '']]
      },
      {
        'link': ['https://digiday.com/agencies/pewdiepie-inherent-difficulties-policing-youtube/', 'Direct'],
        'title': 'On PewDiePie and the inherent difficulties in policing YouTube',
        'date': '17 Feb, 2017',
        'publication': 'Digiday UK',
        'authors': [['Sahil Patel', '']]
      },
      {
        'link': ['https://archive.is/eR0DV', 'Archive'],
        'title': 'PewDiePie: Pranks but no pranks Felix, you’re just not funny',
        'date': '17 Feb, 2017',
        'publication': 'The Evening Standard',
        'authors': [['Tim Cooper', '']]
      },
      {
        'link': ['http://archive.is/OzlBO', 'Archive'],
        'title': 'PewDiePie: Alt-Right Nazi, Victim of Political Correctness, or Just an Idiot?',
        'date': '17 Feb, 2017',
        'publication': 'Reason.com',
        'authors': [['Robby Soave', '']]
      },
      {
        'link': ['https://archive.is/xYMFx', 'Archive'],
        'title': "PewDiePie lashes out at WSJ over 'personal attack’ in ongoing anti-Semitism row (VIDEO)",
        'date': '17 Feb, 2017',
        'publication': 'RT',
        'authors': [['RT REPORTER', '']]
      },
      {
        'link': ['https://archive.is/r2Ikq', 'Archive'],
        'title': "YouTube Star PewDiePie slams 'media' after reports of anti-Semitism",
        'date': '19 Feb, 2017',
        'publication': 'USA Today',
        'authors': [['Luke Kerr-Dineen', '']]
      },
      {
        'link': ['https://archive.is/l5wOg', 'Archive'],
        'title': 'Pewdiepie apologizes for offensive jokes, claims media bias against him',
        'date': '19 Feb, 2017',
        'publication': 'Destructoid',
        'authors': [['Jonathan Holmes', 'http://www.deepfreeze.it/journo.php?j=jonathan_holmes']]
      },
      {
        'link': ['https://archive.is/CtcN5', 'Archive'],
        'title': "PewDiePie anti-Semitic scandal journalist targeted by angry online mob over 'hypocritical' tweets about Jewish and black people",
        'date': '20 Feb, 2017',
        'publication': 'The Sun',
        'authors': [['Margi Murphy', '']]
      },
      {
        'link': ['http://web.archive.org/web/20170220173656/http://birthmoviesdeath.com/2017/02/20/pewdiepie-rookie-comedian-quit-whining-and-write-some-damn-jokes', 'Wayback Machine'],
        'title': 'Advice For Rookie Comedian PewDiePie: Quit Whining And Write Some Damn Jokes',
        'date': ' Feb, 2017',
        'publication': 'Birth.Movies.Death',
        'authors': [['Andrew Todd', 'http://www.deepfreeze.it/journo.php?j=andrew_todd']]
      }
    ]
  }
  // console.log('Running')
  let data = res.data
  // Append items to document table body
  for (let i = 0; i < data.length; i++) {
    let element = data[i]

    // Create 'tr' that'll later be appended to tbody.
    let tr = document.createElement('tr')

    // Create link row.
    let td = document.createElement('td')
    let a = document.createElement('a')
    a.setAttribute('href', element.link[0])
    a.innerText = element.link[1]
    td.appendChild(a)
    tr.appendChild(td)

    // Create title row.
    let td2 = document.createElement('td')
    if (element.title.length > 30) {
      let titleText = element.title
      let substringText = titleText.substr(0, 29)
      substringText += '...'
      td2.innerText = substringText
    } else td2.innerText = element.title
    tr.appendChild(td2)

    // Create date row.
    let td3 = document.createElement('td')
    td3.innerText = element.date
    tr.appendChild(td3)

    // Create publication row.
    let td4 = document.createElement('td')
    td4.innerText = element.publication
    tr.appendChild(td4)

    // Create author(s) row.
    let td5 = document.createElement('td')
    let authors = ''
    // Loop through authors.
    for (let o = 0; o < element.authors.length; o++) {
      let el = element.authors[o]
      if (element.authors.length !== 1) {
        if (o === element.authors.length - 1) {
          if (el[1] === '') {
            authors += el[0]
          } else authors += `<a target='_blank' href='${el[1]}'>${el[0]}</a>`
        } else authors += `<a target='_blank' href='${el[1]}'>${el[0]}</a>, `
      } else {
        if (el[1] === '') {
          authors += el[0]
        } else authors += `<a target='_blank' href='${el[1]}'>${el[0]}</a>`
      }
    }
    td5.innerHTML = authors
    tr.appendChild(td5)

    // Append 'tr' to tbody.
    tbody.appendChild(tr)
  }
})

/* JonTron is awesome.
PewDiePie is also awesome.
If you have feedback, send them to (alremahykarar@ymail.com) */

// Include list.js for search / filter function (?)
