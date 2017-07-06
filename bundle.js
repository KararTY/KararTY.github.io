var YSNG =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);

	__webpack_require__(3);
	__webpack_require__(4);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	const GRAMMAR = __webpack_require__(2);
	const PROD_RE = new RegExp("<([^>]+)>", "g");
	const PROD_MODS_RE = new RegExp("^([#_]{1,2})(.*)");
	const LETTER_SUBSTS = {
	    "o": "0",
	    "e": "3",
	    "i": "1",
	    "a": "4",
	    "t": "7"
	}


	var randomChoice = function(choices) {
	    return choices[Math.floor(Math.random() * choices.length)];
	}


	/* This would be easier with modern ES2016 but I'll set that up later;
	 * this will work on most modern browsers */
	var substituteLetters = function(name, prob) {
	    var letters = [];
	    var nameLower = name.toLowerCase();
	    Object.keys(LETTER_SUBSTS).forEach(function(letter) {
	        var idx = nameLower.indexOf(letter);
	        if (idx > 0 && idx < (nameLower.length - 1)) {
	            letters.push(letter);
	        }
	    });

	    if (letters.length == 0) {
	        return name;
	    }

	    /* If there are any replaceable letters, replace them with, say, 20%
	     * chance */
	    if (Math.random() < prob) {
	        /* Choose a random letter of the ones we can replace */
	        var letter = randomChoice(letters);
	        var indices = [], idx = 0;
	        while ((idx = nameLower.indexOf(letter, idx + 1)) > 0 &&
	                idx < nameLower.length - 1) {
	            indices.push(idx);
	        }

	        /* Now choose a random index at which to replace the chosen letter */
	        idx = randomChoice(indices);
	        /* Call substituteLetters recursively for a chance to replace more
	         * letters*/
	        return substituteLetters(name.substr(0, idx) + LETTER_SUBSTS[letter] +
	                                 name.substr(idx + 1));
	    }

	    return name;
	}


	var _generateFromGrammarInternal = function(grammar, symbol, usedLiterals, mods) {
	    var productions = grammar[symbol];

	    if (Array.isArray(productions)) {
	        var prod = randomChoice(productions);
	        if (grammar[prod] === undefined && prod.match(PROD_RE) === null) {
	            // That is, if it's a literal and not a production rule don't reuse
	            // it; don't allow an infinite loop though if no alternatives can
	            // be found
	            var count = 1;
	            while (usedLiterals.has(prod) && count < prod.length) {
	                prod = randomChoice(productions);
	                count++;
	            }
	            usedLiterals.add(prod);

	            /* Replace letters with numbers with low chance unless the # */
	            /* mod is active */
	            var prob = ((mods.indexOf("#") < 0) ? 0.0 : 0.5);
	            prod = substituteLetters(prod, prob);
	            if (mods.indexOf("_") >= 0) {
	                /* This mod means make the name all lowercase */
	                prod = prod.toLowerCase();
	            }
	        }
	    } else {
	        var prod = productions;
	    }

	    var m = null;
	    if ((m = prod.match(PROD_MODS_RE)) !== null) {
	        prod = m[2];
	        mods += m[1];
	    }

	    return prod.replace(PROD_RE, function(m, symbol) {
	        return _generateFromGrammarInternal(grammar, symbol,
	                                            usedLiterals, mods).trim();
	    });
	}


	var generateFromGrammar = function(grammar, symbol) {
	    return _generateFromGrammarInternal(grammar, symbol, new Set(), "");
	}


	var generateName = function() {
	    return generateFromGrammar(GRAMMAR, "name");
	}


	module.exports.generateName = generateName;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	const GRAMMAR = {
	    "name": [
	        "<silly>",
	        "<silly>™",
	        "#<fanboy>",
	        "<generic>",
	        "<historical>"
	    ],
	    "silly": [
	        "#<silly-name> the <occupation>",
	        "<silly-name> the <occupation> <number>",
	        "#<honorific> <noun>",
	        "#<honorific> <noun> <number>",
	        "#<honorific> <occupation>",
	        "#<honorific> <occupation> <number>",
	        "<the> <silly-name>",
	        "<the> <silly-name> <number>",
	        "#_<force-of-nature><body-part>",
	        "#_<article-of-clothing>0n<body-part>",
	        "<color> <bird> <speech-verb>"
	    ],
	    "silly-name": [
	        "#<vowel-base><consonant-suffix>"
	    ],
	    "fanboy": [
	        "<famous-atheist> <fan>",
	        "<famous-atheist> <fan> <number>",
	        "<famous-atheist>phile",
	        "<famous-atheist>phile <number>",
	        "<fan-of> of <famous-atheist>",
	        "<fan-of> of <famous-atheist> <number>",
	        "<the> Daily <famous-atheist>",
	        "Church of <famous-atheist>",
	        "On Knees for <famous-atheist>"
	    ],
	    "generic": [
	        "<the> <adjective-prefix> <occupation>",
	        "<the> <occupation> <occupation>",
	        "<the> <occupation> of <noun>"
	    ],
	    "historical": [
	        "<historical-figure> of <historical-place>",
	        "<historical-figure> the <adjective-suffix>",
	        "<historical-figure> the <occupation>",
	        "_<number><historical-people><number>"
	    ],
	    "famous-atheist": [
	        "Dawkins",
	        "Harris",
	        "Hitchens",
	        "Maher"
	    ],
	    "fan": [
	        "<fan-of>",
	        "Fan",
	        "Lover"
	    ],
	    "fan-of": [
	        "Apostle",
	        "Cult",
	        "Disciple"
	    ],
	    "historical-figure": [
	        "Aga",
	        "Agrippa",
	        "Alcmaeon",
	        "Anaximenes",
	        "Andronicus",
	        "Antiochus",
	        "Brutus",
	        "Dudu",
	        "Dumuzid",
	        "Euclid",
	        "Hammurabi",
	        "Heraclitus",
	        "Jesus",
	        "Melissus",
	        "Naram-Sin",
	        "Naram-Suen",
	        "Pelagius",
	        "Rimush",
	        "Samsu-iluna",
	        "Sargon",
	        "Shu-Suen",
	        "Theseus",
	        "Timon",
	        "Zeno"
	    ],
	    "historical-place": [
	        "Akkad",
	        "Akshak",
	        "Alexandria",
	        "Ascalon",
	        "Assyria",
	        "Asturias",
	        "Babylon",
	        "Byzantium",
	        "Croton",
	        "Elea",
	        "Ephesus",
	        "Eshunna",
	        "Kish",
	        "Miletus",
	        "Phlius",
	        "Rhodes",
	        "Samos",
	        "Thebes",
	        "Troy"
	    ],
	    "historical-people": [
	        "Aramean",
	        "Assyrian",
	        "Babylonian",
	        "Byzantine",
	        "Hittite",
	        "Phoenician",
	        "Roman"
	    ],
	    "honorific": [
	        "Doc",
	        "Doctor",
	        "Dr",
	        "King",
	        "Master",
	        "Mister",
	        "Mr",
	        "Pope",
	        "Prof",
	        "Professor"
	    ],
	    "adjective": [  // Honorifics that can come as suffixes or prefixes
	        "Amazing",
	        "Ancient",
	        "Angry",
	        "Awesome",
	        "Elder",
	        "Godless",
	        "Great",
	        "Hairy",
	        "Harmful",
	        "Horny",
	        "Infinite",
	        "Invincible",
	        "Logical",
	        "Magical",
	        "Powerful",
	        "Rational",
	        "Reasonable",
	        "Talented"
	    ],
	    "prefix-only-adjective": [
	        "<armored>",
	        "Cynical",
	        "Doubting",
	        "Fighting",
	        "Freethinking",
	        "Garbage",
	        "Harmful",
	        "Iron",
	        "Reasoning",
	        "Thinking"
	    ],
	    "adjective-prefix": [
	        "<adjective>",
	        "<prefix-only-adjective>"
	    ],
	    "adjective-suffix": [
	        "<adjective>"
	    ],
	    "noun": [
	        "<consonant-base>ism",
	        "Apostasy",
	        "Atheism",
	        "Cynicism",
	        "Doubt",
	        "Opinions",
	        "Freethought",
	        "Logic",
	        "Reason",
	        "Science"
	    ],
	    "occupation": [
	        "<consonant-base><vowel-suffix>",
	        "<skeptic>",
	        "Atheist",
	        "Conqueror",
	        "Cynic",
	        "Freethinker",
	        "Heretic",
	        "Logician",
	        "Magician",
	        "Philosopher",
	        "Scientist",
	        "Shepherd",
	        "Thinker"
	    ],
	    "consonant-base": [
	        "<skeptic>",
	        "Apostic",
	        "Cynic",
	        "Heretic",
	        "Logic",
	        "Rational",
	        "Reason",
	        "Satiric",
	    ],
	    "vowel-suffix": [
	        "ian",
	        "ist"
	    ],
	    "vowel-base": [
	        "Cyni",
	        "Hereti",
	        "Logi",
	        "Reasoni",
	        "Satiri",
	        "Scepti",
	        "Skepti"
	    ],
	    "consonant-suffix": [
	        "cked",
	        "cian",
	        "con",
	        "nator",
	        "thulu",
	        "tician"
	    ],
	    "force-of-nature": [
	        "Lava",
	        "Lightning",
	        "Magma",
	        "Thunder",
	        "Tornado",
	        "Volcano"
	    ],
	    "body-part": [
	        "Arm",
	        "Face",
	        "Finger",
	        "Foot",
	        "Hand",
	        "Head",
	        "Leg",
	        "Toe"
	    ],
	    "article-of-clothing": [
	        "Hat",
	        "Pants",
	        "Shirt",
	        "Shoe"
	    ],
	    "color": ["Black", "Blue", "Grey", "Orange", "Red", "White"],
	    "bird": [
	        "Crow",
	        "Dove",
	        "Eagle",
	        "Hawk",
	        "Parrot",
	        "Pigeon",
	        "Raven",
	        "Sparrow"
	    ],
	    "speech-verb": [
	        "Expounds",
	        "Gossips",
	        "Harangues",
	        "Orates",
	        "Pontificates",
	        "Rambles",
	        "Rants",
	        "Sermonizes",
	        "Speaks"
	    ],
	    "armored": [  // Alternate spellings
	        "Armored",
	        "Armoured"
	    ],
	    "skeptic": [  // Just variations on the spellings of "skeptic"
	        "Skeptic",
	        "Sceptic",
	        "Skeptik"  // Silly but fun
	    ],
	    "the": [  // Random coin flip for "the"
	        "",
	        "The"
	    ],
	    "number": [
	        "<digit>",
	        "<digit><number>",
	        "<special-number>"
	    ],
	    "special-number": [
	        "007",
	        "42",
	        "666",
	        "69",
	        "88"
	    ],
	    "digit": ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
	};


	module.exports = GRAMMAR;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "index.html";

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var map = {
		"./background.jpg": 5,
		"./style.css": 6
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 4;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/background.jpg";

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/style.css";

/***/ })
/******/ ]);