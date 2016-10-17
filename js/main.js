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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function() {
	  var browserCookies = __webpack_require__(2);

	  var DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

	  var formContainer = document.querySelector('.overlay-container');
	  var formOpenButton = document.querySelector('.reviews-controls-new');
	  var formCloseButton = document.querySelector('.review-form-close');
	  var userName = document.querySelector('.review-form-field-name');
	  var reviewMarks = document.querySelectorAll('input[name="review-mark"]');
	  var reviewText = document.querySelector('.review-form-field-text');
	  var reviewForm = document.querySelector('.review-form');
	  var reviewFields = document.querySelector('.review-fields');
	  var fieldName = reviewFields.querySelector('.review-fields-name');
	  var fieldText = reviewFields.querySelector('.review-fields-text');
	  var submitButton = document.querySelector('.review-submit');

	  userName.setAttribute('required', 'required');

	  var currentDate = new Date();
	  var currentYear = currentDate.getFullYear();
	  var myBday = new Date(currentYear, 3, 13);
	  if (currentDate < myBday) {
	    myBday.setFullYear(currentYear - 1);
	  }
	  var cookiesLifeTime = (currentDate - myBday) / DAY_IN_MILLIS;

	  userName.value = browserCookies.get('userName') || '';
	  var currentReviewMarks = browserCookies.get('reviewMarks');
	  for (var n = 0; n < reviewMarks.length; n++) {
	    if (reviewMarks[n].value === currentReviewMarks) {
	      reviewMarks[n].setAttribute('checked', 'checked');
	    }
	  }

	  reviewForm.onsubmit = function(evt) {
	    evt.preventDefault();
	    browserCookies.set('userName', userName.value, {
	      expires: cookiesLifeTime
	    });
	    for (var a = 0; a < reviewMarks.length; a++) {
	      if (reviewMarks[a].checked) {
	        browserCookies.set('reviewMarks', reviewMarks[a].value, {
	          expires: cookiesLifeTime
	        });
	      }
	    }
	    this.submit();
	  };
	  var validateReviewMarks = function() {
	    for (var i = 0; i < reviewMarks.length; i++) {
	      if (reviewMarks[i].checked) {
	        if (reviewMarks[i].value > 3) {
	          reviewText.removeAttribute('required');
	          fieldText.style.display = 'none';
	        } else {
	          reviewText.setAttribute('required', 'required');
	          fieldText.style.display = 'inline-block';
	        }
	      }
	    }
	  };
	  var validateInputFields = function() {
	    if (userName.validity.valid && reviewText.validity.valid) {
	      submitButton.removeAttribute('disabled');
	      reviewFields.style.display = 'none';
	    } else {
	      submitButton.setAttribute('disabled', 'disabled');
	      reviewFields.style.display = 'inline-block';
	    }
	    if (userName.validity.valid) {
	      fieldName.style.display = 'none';
	    } else {
	      fieldName.style.display = 'inline-block';
	    }
	    if (reviewText.validity.valid) {
	      fieldText.style.display = 'none';
	    } else {
	      fieldText.style.display = 'inline-block';
	    }
	  };

	  userName.oninput = validateInputFields;
	  reviewText.oninput = validateInputFields;

	  for (var i = 0; i < reviewMarks.length; i++) {
	    reviewMarks[i].onchange = function() {
	      validateReviewMarks();
	      validateInputFields();
	    };
	  }
	  validateReviewMarks();
	  validateInputFields();

	  formOpenButton.onclick = function(evt) {
	    evt.preventDefault();
	    formContainer.classList.remove('invisible');
	  };

	  formCloseButton.onclick = function(evt) {
	    evt.preventDefault();
	    formContainer.classList.add('invisible');
	  };

	})();


/***/ },
/* 2 */
/***/ function(module, exports) {

	exports.defaults = {};

	exports.set = function(name, value, options) {
	  // Retrieve options and defaults
	  var opts = options || {};
	  var defaults = exports.defaults;

	  // Apply default value for unspecified options
	  var expires  = opts.expires || defaults.expires;
	  var domain   = opts.domain  || defaults.domain;
	  var path     = opts.path     != undefined ? opts.path     : (defaults.path != undefined ? defaults.path : '/');
	  var secure   = opts.secure   != undefined ? opts.secure   : defaults.secure;
	  var httponly = opts.httponly != undefined ? opts.httponly : defaults.httponly;

	  // Determine cookie expiration date
	  // If succesful the result will be a valid Date, otherwise it will be an invalid Date or false(ish)
	  var expDate = expires ? new Date(
	      // in case expires is an integer, it should specify the number of days till the cookie expires
	      typeof expires == 'number' ? new Date().getTime() + (expires * 864e5) :
	      // else expires should be either a Date object or in a format recognized by Date.parse()
	      expires
	  ) : '';

	  // Set cookie
	  document.cookie = name.replace(/[^+#$&^`|]/g, encodeURIComponent)                // Encode cookie name
	  .replace('(', '%28')
	  .replace(')', '%29') +
	  '=' + value.replace(/[^+#$&/:<-\[\]-}]/g, encodeURIComponent) +                  // Encode cookie value (RFC6265)
	  (expDate && expDate.getTime() >= 0 ? ';expires=' + expDate.toUTCString() : '') + // Add expiration date
	  (domain   ? ';domain=' + domain : '') +                                          // Add domain
	  (path     ? ';path='   + path   : '') +                                          // Add path
	  (secure   ? ';secure'           : '') +                                          // Add secure option
	  (httponly ? ';httponly'         : '');                                           // Add httponly option
	};

	exports.get = function(name) {
	  var cookies = document.cookie.split(';');

	  // Iterate all cookies
	  for(var i = 0; i < cookies.length; i++) {
	    var cookie = cookies[i];
	    var cookieLength = cookie.length;

	    // Determine separator index ("name=value")
	    var separatorIndex = cookie.indexOf('=');

	    // IE<11 emits the equal sign when the cookie value is empty
	    separatorIndex = separatorIndex < 0 ? cookieLength : separatorIndex;

	    // Decode the cookie name and remove any leading/trailing spaces, then compare to the requested cookie name
	    if (decodeURIComponent(cookie.substring(0, separatorIndex).replace(/^\s+|\s+$/g, '')) == name) {
	      return decodeURIComponent(cookie.substring(separatorIndex + 1, cookieLength));
	    }
	  }

	  return null;
	};

	exports.erase = function(name, options) {
	  exports.set(name, '', {
	    expires:  -1,
	    domain:   options && options.domain,
	    path:     options && options.path,
	    secure:   0,
	    httponly: 0}
	  );
	};


/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	(function() {
	  /**
	   * @const
	   * @type {number}
	   */
	  var HEIGHT = 300;

	  /**
	   * @const
	   * @type {number}
	   */
	  var WIDTH = 700;

	  /**
	   * ID уровней.
	   * @enum {number}
	   */
	  var Level = {
	    'INTRO': 0,
	    'MOVE_LEFT': 1,
	    'MOVE_RIGHT': 2,
	    'LEVITATE': 3,
	    'HIT_THE_MARK': 4
	  };

	  /**
	   * Порядок прохождения уровней.
	   * @type {Array.<Level>}
	   */
	  var LevelSequence = [
	    Level.INTRO
	  ];

	  /**
	   * Начальный уровень.
	   * @type {Level}
	   */
	  var INITIAL_LEVEL = LevelSequence[0];

	  /**
	   * Допустимые виды объектов на карте.
	   * @enum {number}
	   */
	  var ObjectType = {
	    'ME': 0,
	    'FIREBALL': 1
	  };

	  /**
	   * Допустимые состояния объектов.
	   * @enum {number}
	   */
	  var ObjectState = {
	    'OK': 0,
	    'DISPOSED': 1
	  };

	  /**
	   * Коды направлений.
	   * @enum {number}
	   */
	  var Direction = {
	    NULL: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    UP: 4,
	    DOWN: 8
	  };

	  /**
	   * Правила перерисовки объектов в зависимости от состояния игры.
	   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	   */
	  var ObjectsBehaviour = {};

	  /**
	   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	   * На движение мага влияет его пересечение с препятствиями.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	    // в воздухе на определенной высоте.
	    // NB! Сложность заключается в том, что поведение описано в координатах
	    // канваса, а не координатах, относительно нижней границы игры.
	    if (state.keysPressed.UP && object.y > 0) {
	      object.direction = object.direction & ~Direction.DOWN;
	      object.direction = object.direction | Direction.UP;
	      object.y -= object.speed * timeframe * 2;

	      if (object.y < 0) {
	        object.y = 0;
	      }
	    }

	    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	    // опускается на землю.
	    if (!state.keysPressed.UP) {
	      if (object.y < HEIGHT - object.height) {
	        object.direction = object.direction & ~Direction.UP;
	        object.direction = object.direction | Direction.DOWN;
	        object.y += object.speed * timeframe / 3;
	      } else {
	        object.Direction = object.direction & ~Direction.DOWN;
	      }
	    }

	    // Если зажата стрелка влево, маг перемещается влево.
	    if (state.keysPressed.LEFT) {
	      object.direction = object.direction & ~Direction.RIGHT;
	      object.direction = object.direction | Direction.LEFT;
	      object.x -= object.speed * timeframe;
	    }

	    // Если зажата стрелка вправо, маг перемещается вправо.
	    if (state.keysPressed.RIGHT) {
	      object.direction = object.direction & ~Direction.LEFT;
	      object.direction = object.direction | Direction.RIGHT;
	      object.x += object.speed * timeframe;
	    }

	    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	    if (object.y < 0) {
	      object.y = 0;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.y > HEIGHT - object.height) {
	      object.y = HEIGHT - object.height;
	      object.Direction = object.direction & ~Direction.DOWN;
	      object.Direction = object.direction & ~Direction.UP;
	    }

	    if (object.x < 0) {
	      object.x = 0;
	    }

	    if (object.x > WIDTH - object.width) {
	      object.x = WIDTH - object.width;
	    }
	  };

	  /**
	   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	   * и после этого неуправляемо движется по прямой в заданном направлении. Если
	   * он пролетает весь экран насквозь, он исчезает.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.FIREBALL] = function(object, state, timeframe) {
	    if (object.direction & Direction.LEFT) {
	      object.x -= object.speed * timeframe;
	    }

	    if (object.direction & Direction.RIGHT) {
	      object.x += object.speed * timeframe;
	    }

	    if (object.x < 0 || object.x > WIDTH) {
	      object.state = ObjectState.DISPOSED;
	    }
	  };

	  /**
	   * ID возможных ответов функций, проверяющих успех прохождения уровня.
	   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	   * нужно прервать.
	   * @enum {number}
	   */
	  var Verdict = {
	    'CONTINUE': 0,
	    'WIN': 1,
	    'FAIL': 2,
	    'PAUSE': 3,
	    'INTRO': 4
	  };

	  /**
	   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	   * принимающие на вход состояние уровня и возвращающие true, если раунд
	   * можно завершать или false если нет.
	   * @type {Object.<Level, function(Object):boolean>}
	   */
	  var LevelsRules = {};

	  /**
	   * Уровень считается пройденным, если был выпущен файлболл и он улетел
	   * за экран.
	   * @param {Object} state
	   * @return {Verdict}
	   */
	  LevelsRules[Level.INTRO] = function(state) {
	    var fireballs = state.garbage.filter(function(object) {
	      return object.type === ObjectType.FIREBALL;
	    });

	    return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	  };

	  /**
	   * Начальные условия для уровней.
	   * @enum {Object.<Level, function>}
	   */
	  var LevelsInitialize = {};

	  /**
	   * Первый уровень.
	   * @param {Object} state
	   * @return {Object}
	   */
	  LevelsInitialize[Level.INTRO] = function(state) {
	    state.objects.push(
	      // Установка персонажа в начальное положение. Он стоит в крайнем левом
	      // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	      // уровне равна 2px за кадр.
	      {
	        direction: Direction.RIGHT,
	        height: 84,
	        speed: 2,
	        sprite: 'img/wizard.gif',
	        spriteReversed: 'img/wizard-reversed.gif',
	        state: ObjectState.OK,
	        type: ObjectType.ME,
	        width: 61,
	        x: WIDTH / 3,
	        y: HEIGHT - 100
	      }
	    );

	    return state;
	  };

	  /**
	   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	   * и показывает приветственный экран.
	   * @param {Element} container
	   * @constructor
	   */
	  var Game = function(container) {
	    this.container = container;
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = container.clientWidth;
	    this.canvas.height = container.clientHeight;
	    this.container.appendChild(this.canvas);

	    this.ctx = this.canvas.getContext('2d');

	    this._onKeyDown = this._onKeyDown.bind(this);
	    this._onKeyUp = this._onKeyUp.bind(this);
	    this._pauseListener = this._pauseListener.bind(this);
	  };
	  /*
	   * Отрисовка прямоугольного канваса
	   * */
	  var drawTetragon = function(ctx) {
	    /*
	     * Черный четырехугольник
	     * */
	    ctx.beginPath();
	    ctx.moveTo(160, 70);
	    ctx.lineTo(560, 70);
	    ctx.lineTo(500, 190);
	    ctx.lineTo(100, 190);
	    ctx.closePath();
	    ctx.strokeStyle = 'rgba(0, 0, 0, 0.7)';
	    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	    ctx.stroke();
	    ctx.fill();
	    /*
	     * Белый четырехугольник
	     * */
	    ctx.beginPath();
	    ctx.moveTo(150, 60);
	    ctx.lineTo(550, 60);
	    ctx.lineTo(490, 180);
	    ctx.lineTo(90, 180);
	    ctx.closePath();
	    ctx.strokeStyle = '#FFFFFF';
	    ctx.fillStyle = '#FFFFFF';
	    ctx.stroke();
	    ctx.fill();
	    ctx.font = '16px PT Mono';
	    ctx.textBaseline = 'handing';
	    ctx.fillStyle = 'black';
	  };

	  var wrapCanvasText = function(ctx, canvasText, width) {
	    /*Координата от левого края канваса*/
	    var left = 150;
	    /* Координата от верхнего края кнваса*/
	    var top = 90;
	    /*Высота одной строки*/
	    var lineHeight = 30;
	    var line = '';
	    var words = canvasText.split(' ');
	    var countWords = words.length;
	    for (var i = 0; i < countWords; i++ ) {
	      var singleLine = line + words[i] + ' ';
	      var singleLineWidth = ctx.measureText(singleLine).width;
	      if ( singleLineWidth > width) {
	        ctx.fillText(line, left, top);
	        line = words[i] + ' ';
	        top += lineHeight;
	      } else {
	        line = singleLine;
	      }
	    }
	    ctx.fillText(line, left, top);
	  };
	  Game.prototype = {
	    /**
	     * Текущий уровень игры.
	     * @type {Level}
	     */
	    level: INITIAL_LEVEL,

	    /**
	     * Состояние игры. Описывает местоположение всех объектов на игровой карте
	     * и время проведенное на уровне и в игре.
	     * @return {Object}
	     */
	    getInitialState: function() {
	      return {
	        // Статус игры. Если CONTINUE, то игра продолжается.
	        currentStatus: Verdict.CONTINUE,

	        // Объекты, удаленные на последнем кадре.
	        garbage: [],

	        // Время с момента отрисовки предыдущего кадра.
	        lastUpdated: null,

	        // Состояние нажатых клавиш.
	        keysPressed: {
	          ESC: false,
	          LEFT: false,
	          RIGHT: false,
	          SPACE: false,
	          UP: false
	        },

	        // Время начала прохождения уровня.
	        levelStartTime: null,

	        // Все объекты на карте.
	        objects: [],

	        // Время начала прохождения игры.
	        startTime: null
	      };
	    },

	    /**
	     * Начальные проверки и запуск текущего уровня.
	     * @param {Level=} level
	     * @param {boolean=} restart
	     */
	    initializeLevelAndStart: function(level, restart) {
	      level = typeof level === 'undefined' ? this.level : level;
	      restart = typeof restart === 'undefined' ? true : restart;

	      if (restart || !this.state) {
	        // При перезапуске уровня, происходит полная перезапись состояния
	        // игры из изначального состояния.
	        this.state = this.getInitialState();
	        this.state = LevelsInitialize[this.level](this.state);
	      } else {
	        // При продолжении уровня состояние сохраняется, кроме записи о том,
	        // что состояние уровня изменилось с паузы на продолжение игры.
	        this.state.currentStatus = Verdict.CONTINUE;
	      }

	      // Запись времени начала игры и времени начала уровня.
	      this.state.levelStartTime = Date.now();
	      if (!this.state.startTime) {
	        this.state.startTime = this.state.levelStartTime;
	      }

	      this._preloadImagesForLevel(function() {
	        // Предварительная отрисовка игрового экрана.
	        this.render();

	        // Установка обработчиков событий.
	        this._initializeGameListeners();

	        // Запуск игрового цикла.
	        this.update();
	      }.bind(this));
	    },

	    /**
	     * Временная остановка игры.
	     * @param {Verdict=} verdict
	     */
	    pauseLevel: function(verdict) {
	      if (verdict) {
	        this.state.currentStatus = verdict;
	      }

	      this.state.keysPressed.ESC = false;
	      this.state.lastUpdated = null;

	      this._removeGameListeners();
	      window.addEventListener('keydown', this._pauseListener);

	      this._drawPauseScreen();
	    },

	    /**
	     * Обработчик событий клавиатуры во время паузы.
	     * @param {KeyboardsEvent} evt
	     * @private
	     * @private
	     */
	    _pauseListener: function(evt) {
	      if (evt.keyCode === 32) {
	        evt.preventDefault();
	        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	            this.state.currentStatus === Verdict.FAIL;
	        this.initializeLevelAndStart(this.level, needToRestartTheGame);

	        window.removeEventListener('keydown', this._pauseListener);
	      }
	    },

	    /**
	     * Отрисовка экрана паузы.
	     */
	    _drawPauseScreen: function() {
	      drawTetragon(this.ctx);
	      var width = 340;
	      switch (this.state.currentStatus) {
	        case Verdict.WIN:
	          wrapCanvasText(this.ctx, 'Ура! Вы победили:) Примите наши поздравления!', width);
	          break;
	        case Verdict.FAIL:
	          wrapCanvasText(this.ctx, 'Что-то пошло не так, и вы проиграли:( Попробуйте еще раз!', width);
	          break;
	        case Verdict.PAUSE:
	          wrapCanvasText(this.ctx, 'Пауза! Чтобы продолжить игру, нажмите пробел', width);
	          break;
	        case Verdict.INTRO:
	          wrapCanvasText(this.ctx, 'Добро пожаловать в игру! Чтобы приступить к игре, нажмите пробел!', width);
	          break;
	      }
	    },


	    /**
	     * Предзагрузка необходимых изображений для уровня.
	     * @param {function} callback
	     * @private
	     */
	    _preloadImagesForLevel: function(callback) {
	      if (typeof this._imagesArePreloaded === 'undefined') {
	        this._imagesArePreloaded = [];
	      }

	      if (this._imagesArePreloaded[this.level]) {
	        callback();
	        return;
	      }

	      var levelImages = [];
	      this.state.objects.forEach(function(object) {
	        levelImages.push(object.sprite);

	        if (object.spriteReversed) {
	          levelImages.push(object.spriteReversed);
	        }
	      });

	      var i = levelImages.length;
	      var imagesToGo = levelImages.length;

	      while (i-- > 0) {
	        var image = new Image();
	        image.src = levelImages[i];
	        image.onload = function() {
	          if (--imagesToGo === 0) {
	            this._imagesArePreloaded[this.level] = true;
	            callback();
	          }
	        }.bind(this);
	      }
	    },

	    /**
	     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	     * должны исчезнуть.
	     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	     */
	    updateObjects: function(delta) {
	      // Персонаж.
	      var me = this.state.objects.filter(function(object) {
	        return object.type === ObjectType.ME;
	      })[0];

	      // Добавляет на карту файрбол по нажатию на Shift.
	      if (this.state.keysPressed.SHIFT) {
	        this.state.objects.push({
	          direction: me.direction,
	          height: 24,
	          speed: 5,
	          sprite: 'img/fireball.gif',
	          type: ObjectType.FIREBALL,
	          width: 24,
	          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	          y: me.y + me.height / 2
	        });

	        this.state.keysPressed.SHIFT = false;
	      }

	      this.state.garbage = [];

	      // Убирает в garbage не используемые на карте объекты.
	      var remainingObjects = this.state.objects.filter(function(object) {
	        ObjectsBehaviour[object.type](object, this.state, delta);

	        if (object.state === ObjectState.DISPOSED) {
	          this.state.garbage.push(object);
	          return false;
	        }

	        return true;
	      }, this);

	      this.state.objects = remainingObjects;
	    },

	    /**
	     * Проверка статуса текущего уровня.
	     */
	    checkStatus: function() {
	      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	      // заранее известно, что да.
	      if (this.state.currentStatus !== Verdict.CONTINUE) {
	        return;
	      }

	      if (!this.commonRules) {
	        /**
	         * Проверки, не зависящие от уровня, но влияющие на его состояние.
	         * @type {Array.<functions(Object):Verdict>}
	         */
	        this.commonRules = [
	          /**
	           * Если персонаж мертв, игра прекращается.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkDeath(state) {
	            var me = state.objects.filter(function(object) {
	              return object.type === ObjectType.ME;
	            })[0];

	            return me.state === ObjectState.DISPOSED ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          },

	          /**
	           * Если нажата клавиша Esc игра ставится на паузу.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkKeys(state) {
	            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	          },

	          /**
	           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	          function checkTime(state) {
	            return Date.now() - state.startTime > 3 * 60 * 1000 ?
	                Verdict.FAIL :
	                Verdict.CONTINUE;
	          }
	        ];
	      }

	      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	      // по всем универсальным проверкам и проверкам конкретного уровня.
	      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	      // любое другое состояние кроме CONTINUE или пока не пройдут все
	      // проверки. После этого состояние сохраняется.
	      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	      var currentCheck = Verdict.CONTINUE;
	      var currentRule;

	      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	        currentRule = allChecks.shift();
	        currentCheck = currentRule(this.state);
	      }

	      this.state.currentStatus = currentCheck;
	    },

	    /**
	     * Принудительная установка состояния игры. Используется для изменения
	     * состояния игры от внешних условий, например, когда необходимо остановить
	     * игру, если она находится вне области видимости и установить вводный
	     * экран.
	     * @param {Verdict} status
	     */
	    setGameStatus: function(status) {
	      if (this.state.currentStatus !== status) {
	        this.state.currentStatus = status;
	      }
	    },

	    /**
	     * Отрисовка всех объектов на экране.
	     */
	    render: function() {
	      // Удаление всех отрисованных на странице элементов.
	      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);

	      // Выставление всех элементов, оставшихся в this.state.objects согласно
	      // их координатам и направлению.
	      this.state.objects.forEach(function(object) {
	        if (object.sprite) {
	          var image = new Image(object.width, object.height);
	          image.src = (object.spriteReversed && object.direction & Direction.LEFT) ?
	              object.spriteReversed :
	              object.sprite;
	          this.ctx.drawImage(image, object.x, object.y, object.width, object.height);
	        }
	      }, this);
	    },

	    /**
	     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	     * и обновляет их согласно правилам их поведения, а затем запускает
	     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	     * проверка не вернет состояние FAIL, WIN или PAUSE.
	     */
	    update: function() {
	      if (!this.state.lastUpdated) {
	        this.state.lastUpdated = Date.now();
	      }

	      var delta = (Date.now() - this.state.lastUpdated) / 10;
	      this.updateObjects(delta);
	      this.checkStatus();

	      switch (this.state.currentStatus) {
	        case Verdict.CONTINUE:
	          this.state.lastUpdated = Date.now();
	          this.render();
	          requestAnimationFrame(function() {
	            this.update();
	          }.bind(this));
	          break;

	        case Verdict.WIN:
	        case Verdict.FAIL:
	        case Verdict.PAUSE:
	        case Verdict.INTRO:
	        default:
	          this.pauseLevel();
	          break;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyDown: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = true;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = true;
	          break;
	        case 38:
	          this.state.keysPressed.UP = true;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = true;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = true;
	      }
	    },

	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyUp: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = false;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = false;
	          break;
	        case 38:
	          this.state.keysPressed.UP = false;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = false;
	          break;
	      }

	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = false;
	      }
	    },

	    /** @private */
	    _initializeGameListeners: function() {
	      window.addEventListener('keydown', this._onKeyDown);
	      window.addEventListener('keyup', this._onKeyUp);
	    },

	    /** @private */
	    _removeGameListeners: function() {
	      window.removeEventListener('keydown', this._onKeyDown);
	      window.removeEventListener('keyup', this._onKeyUp);
	    }
	  };

	  window.Game = Game;
	  window.Game.Verdict = Verdict;

	  var clouds = document.querySelector('.header-clouds');
	  var gameContainer = document.querySelector('.demo');

	  var defaultBackgroundPosition = 50;
	  var GAP = 100;
	  var THROTTLE_DELAY = 100;
	  var lastCall = Date.now();

	  var setParallax = function() {
	    var relativeScrollPosition = (window.pageYOffset / window.innerHeight) * 100;
	    clouds.style.backgroundPositionX = defaultBackgroundPosition + relativeScrollPosition + '%';
	  };

	  var areCloudsVisible = function() {
	    var cloudsPosition = clouds.getBoundingClientRect();
	    return cloudsPosition.bottom >= GAP;
	  };

	  var isGameVisible = function() {
	    var gameContainerPosition = gameContainer.getBoundingClientRect();
	    if (gameContainerPosition.bottom <= GAP) {
	      game.setGameStatus(window.Game.Verdict.PAUSE);
	    }
	  };

	  var moveClouds = function() {
	    if (!areCloudsVisible()) {
	      window.removeEventListener('scroll', setParallax);
	    } else {
	      window.addEventListener('scroll', setParallax);
	    }
	  };

	  var throttle = function(callback, delay) {
	    if (Date.now() - lastCall >= delay) {
	      callback();
	      lastCall = Date.now();
	    }
	  };

	  window.addEventListener('scroll', function() {
	    throttle(function() {
	      areCloudsVisible();
	      isGameVisible();
	    }, THROTTLE_DELAY);
	    moveClouds();
	  });

	  var game = new Game(document.querySelector('.demo'));
	  game.initializeLevelAndStart();
	  game.setGameStatus(window.Game.Verdict.INTRO);
	})();


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var sort = __webpack_require__(5);
	var utilities = __webpack_require__(6);
	var Review = __webpack_require__(7);

	(function() {

	  var REVIEWS_LIST_URL = '//o0.github.io/assets/json/reviews.json';
	  var PAGE_SIZE = 3;
	  var moreReviews = document.querySelector('.reviews-controls-more');
	  var filterContainer = document.querySelector('.reviews-filter');
	  var reviewsContainer = document.querySelector('.reviews-list');
	  var reviews = [];
	  var filteredReviews = [];
	  var renderedReviews = [];
	  var pageNumber = 0;

	  filterContainer.classList.add('invisible');

	  var setActiveFilter = function(filter) {
	    var activeFilter = document.querySelector('#' + filter);
	    activeFilter.checked = true;
	  };

	  var enableFilters = function(filter) {
	    filteredReviews = sort.sortReviews(reviews, filter);
	    setActiveFilter(filter);
	    filterContainer.addEventListener('click', function(evt) {
	      var target = evt.target;
	      if (target.nodeName === 'INPUT') {
	        filteredReviews = sort.sortReviews(reviews, target.id);
	        pageNumber = 0;
	        renderReviews(filteredReviews, pageNumber, true);
	        updateReviewsButtonState();
	        localStorage.setItem('filter', target.id);
	      }
	    });
	  };

	  var renderReviews = function(reviewsList, page, replace) {
	    var from = page * PAGE_SIZE;
	    var to = from + PAGE_SIZE;
	    if(replace) {
	      renderedReviews.forEach(function(review) {
	        review.remove();
	      });
	      renderedReviews = [];
	    }
	    var slicedFilteredReviews = filteredReviews.slice(from, to);
	    slicedFilteredReviews.forEach(function(review) {
	      renderedReviews.push(new Review(review, reviewsContainer));
	    });
	  };

	  var updateReviewsButtonState = function() {
	    if(pageNumber + 1 < Math.ceil(filteredReviews.length / PAGE_SIZE)) {
	      moreReviews.classList.remove('invisible');
	    } else {
	      moreReviews.classList.add('invisible');
	    }
	  };

	  moreReviews.classList.remove('invisible');

	  moreReviews.addEventListener('click', function() {
	    pageNumber++;
	    renderReviews(filteredReviews, pageNumber);
	    updateReviewsButtonState();
	  });

	  utilities.load(REVIEWS_LIST_URL, function(reviewsList) {
	    reviews = reviewsList;
	    var currentFilter = localStorage.getItem('filter');
	    enableFilters(currentFilter || 'reviews-all');
	    renderReviews(filteredReviews, 0, true);
	  });

	  filterContainer.classList.remove('invisible');

	})();


/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	(function() {
	  var DAY_IN_MILLIS = 1000 * 60 * 60 * 24;

	  module.exports = {
	    sortReviews: function(reviewsList, filter) {
	      var reviewToFilter = reviewsList.slice(0);

	      switch (filter) {
	        case 'reviews-recent':
	          reviewToFilter = reviewToFilter.filter(function(element) {
	            var currentTime = Date.now();
	            var elementTime = Date.parse(element.date);
	            var breakTime = currentTime - 4 * DAY_IN_MILLIS;
	            return elementTime > breakTime && elementTime < currentTime;
	          }).sort(function(a, b) {
	            a = Date.parse(a.date);
	            b = Date.parse(b.date);
	            return b - a;
	          });
	          break;
	        case 'reviews-good':
	          reviewToFilter = reviewToFilter.filter(function(element) {
	            return element.rating > 2;
	          }).sort(function(a, b) {
	            return b.rating - a.rating;
	          });
	          break;
	        case 'reviews-bad':
	          reviewToFilter = reviewToFilter.filter(function(element) {
	            return element.rating <= 2;
	          }).sort(function(a, b) {
	            return a.rating - b.rating;
	          });
	          break;
	        case 'reviews-popular':
	          reviewToFilter = reviewToFilter.sort(function(a, b) {
	            return b.review_usefulness - a.review_usefulness;
	          });
	          break;
	        default:
	          break;
	      }
	      return reviewToFilter;
	    }
	  };
	})();



/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	(function() {
	  var reviewList = document.querySelector('.reviews');
	  module.exports = {
	    load: function(url, callback) {
	      var xhr = new XMLHttpRequest();
	      xhr.onload = function(evt) {
	        reviewList.classList.remove('reviews-list-loading');
	        var loadedData = JSON.parse(evt.target.response);
	        callback(loadedData);
	      };
	      xhr.onerror = function() {
	        reviewList.classList.add('reviews-load-failure');
	      };
	      xhr.open('GET', url);
	      reviewList.classList.add('reviews-list-loading');
	      xhr.send();
	    }
	  };
	})();


/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	(function() {
	  var SINGLE_STAR_WIDTH = 30;
	  var elementTemplate = document.querySelector('template');
	  var elementToClone;

	  if ('content' in elementTemplate) {
	    elementToClone = elementTemplate.content.querySelector('.review');
	  } else {
	    elementToClone = elementTemplate.querySelector('.review');
	  }


	  var renderReviewElement = function(data) {
	    var element = elementToClone.cloneNode(true);
	    element.querySelector('.review-text').textContent = data.description;

	    var ratingValue = data.rating;
	    var ratingWidth = SINGLE_STAR_WIDTH * ratingValue;
	    var ratingStar = element.querySelector('.review-rating');
	    ratingStar.style.width = ratingWidth + 'px';

	    var userPhoto = new Image(124, 124);
	    userPhoto.onload = function(evt) {
	      element.querySelector('.review-author').src = evt.target.src;
	    };
	    userPhoto.onerror = function() {
	      element.classList.add('review-load-failure');
	    };

	    userPhoto.src = data.author.picture;

	    return element;
	  };

	  var Review = function(data, container) {
	    this.data = data;
	    this.element = renderReviewElement(this.data);
	    this.container = container;

	    this.createElement(this.container, this.element);
	    this.onReviewQuizClick = this.onReviewQuizClick.bind(this);
	    this.addClickListener(this.element);
	  };

	  Review.prototype.onReviewQuizClick = function(event) {
	    if (event.target.classList.contains('review-quiz-answer')) {
	      event.target.classList.add('review-quiz-answer-active');
	    }
	  };

	  Review.prototype.createElement = function(container, element) {
	    container.appendChild(element);
	  };

	  Review.prototype.addClickListener = function(element) {
	    element.querySelector('.review-quiz').addEventListener('click', this.onReviewQuizClick);
	  };

	  Review.prototype.remove = function() {
	    this.element.querySelector('.review-quiz').removeEventListener('click', this.onReviewQuizClick);
	    this.container.removeChild(this.element);
	  };

	  module.exports = Review;

	})();



/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	(function() {



	  var Gallery = function(gallery) {
	    this.gallery = gallery;
	    this.closeButton = this.gallery.querySelector('.overlay-gallery-close');
	    this.previewContainer = this.gallery.querySelector('.overlay-gallery-preview');
	    this.arrowLeft = this.gallery.querySelector('.overlay-gallery-control-left');
	    this.arrowRight = this.gallery.querySelector('.overlay-gallery-control-right');
	    this.currentNumber = this.gallery.querySelector('.preview-number-current');
	    this.totalNumber = this.gallery.querySelector('.preview-number-total');
	    this.activePicture = 0;
	    this.galleryPictures = [];

	    this.moveLeft = this.moveLeft.bind(this);
	    this.moveRight = this.moveRight.bind(this);
	    this._onDocumentKeyDown = this._onDocumentKeyDown.bind(this);
	    this._onCloseClick = this._onCloseClick.bind(this);
	    this.savePictures = this.savePictures.bind(this);
	    this.onHashChange = this.onHashChange.bind(this);
	    this.showGallery = this.showGallery.bind(this);
	  };

	  Gallery.prototype.showPictures = function(number) {
	    var preview = new Image();
	    this.previewContainer.appendChild(preview);
	    this.gallery.querySelector('img').src = this.galleryPictures[number];
	    this.currentNumber.textContent = number + 1;
	    this.activePicture = number;
	  };

	  Gallery.prototype.moveLeft = function() {
	    if (this.activePicture !== 0) {
	      this.activePicture--;
	    } else {
	      this.activePicture = this.galleryPictures.length - 1;
	    }
	    location.hash = 'photo' + this.galleryPictures[this.activePicture];
	  };

	  Gallery.prototype.moveRight = function() {
	    if (this.activePicture !== this.galleryPictures.length - 1) {
	      this.activePicture++;
	    } else {
	      this.activePicture = 0;
	    }
	    location.hash = 'photo' + this.galleryPictures[this.activePicture];
	  };

	  Gallery.prototype._onDocumentKeyDown = function() {
	    var ESC = 27;
	    if (event.keyCode === ESC) {
	      this._onCloseClick();
	    }
	  };

	  Gallery.prototype._onCloseClick = function() {
	    this.gallery.classList.add('invisible');
	    this.arrowRight.removeEventListener('click', this.moveRight);
	    this.arrowLeft.removeEventListener('click', this.moveLeft);
	    this.closeButton.removeEventListener('click', this._onCloseClick);
	    window.removeEventListener('keydown', this._onDocumentKeyDown);
	    location.hash = '';
	  };

	  Gallery.prototype.savePictures = function(pictures) {
	    this.galleryPictures = pictures;
	    this.totalNumber.textContent = this.galleryPictures.length;
	    return this.galleryPictures;
	  };

	  Gallery.prototype.onHashChange = function() {
	    if (location.hash) {
	      var hash = window.location.hash;
	      var regExp = hash.match(/#photo\/(\S+)/);
	      if (!regExp) {
	        return;
	      }
	      var regExpSrc = '/' + regExp[1];
	      var photoIndex = -1;
	      this.galleryPictures.forEach(function(pic, index) {
	        if (~pic.indexOf(regExpSrc)) {
	          photoIndex = index;
	        }
	      });
	      if (photoIndex !== -1) {
	        this.showGallery(photoIndex);
	      } else {
	        this._onCloseClick();
	      }
	    }
	  };

	  //Функция Показывает галерею

	  Gallery.prototype.showGallery = function(number) {
	    this.gallery.classList.remove('invisible');
	    this.arrowRight.addEventListener('click', this.moveRight);
	    this.arrowLeft.addEventListener('click', this.moveLeft);
	    this.closeButton.addEventListener('click', this._onCloseClick);
	    window.addEventListener('keydown', this._onDocumentKeyDown);
	    this.showPictures(number);
	  };

	  module.exports = Gallery;

	})();


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Gallery = __webpack_require__(8);

	(function() {
	  var pictures = document.querySelectorAll('.photogallery-image img');
	  var galleryContainer = document.querySelector('.photogallery');
	  var picturesArr = Array.prototype.slice.call(pictures);
	  var galleryOverlayContainer = document.querySelector('.overlay-gallery');
	  var galleryElement = new Gallery(galleryOverlayContainer);
	  var picturesArrSrc = picturesArr.map(function(pic) {
	    return pic.src.replace(location.origin, '');
	  });

	  galleryContainer.addEventListener('click', function(event) {
	    var activeNumber = picturesArr.indexOf(event.target);
	    var currentNumber;
	    event.preventDefault();
	    if (activeNumber >= 0) {
	      currentNumber = activeNumber + 1;
	      var hash = '/img/screenshots/' + currentNumber + '.png';
	      location.hash = 'photo' + hash;
	      galleryElement.showGallery(activeNumber);
	    }
	    return false;
	  });

	  galleryElement.savePictures(picturesArrSrc);
	  galleryElement.onHashChange();
	  window.addEventListener('hashchange', galleryElement.onHashChange);
	})();


/***/ }
/******/ ]);