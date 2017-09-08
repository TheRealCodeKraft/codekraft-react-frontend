'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _config = require('config');

var _config2 = _interopRequireDefault(_config);

var _reactUseragent = require('react-useragent');

var _reactUseragent2 = _interopRequireDefault(_reactUseragent);

var _reactBootstrap = require('react-bootstrap');

var _session = require('clients/session');

var _session2 = _interopRequireDefault(_session);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var VideoGame = function (_React$Component) {
  _inherits(VideoGame, _React$Component);

  function VideoGame(props) {
    _classCallCheck(this, VideoGame);

    var _this = _possibleConstructorReturn(this, (VideoGame.__proto__ || Object.getPrototypeOf(VideoGame)).call(this, props));

    _this.state = {
      running: false,
      finished: false,
      scores: {}
    };

    _this.runGame = _this.runGame.bind(_this);
    return _this;
  }

  _createClass(VideoGame, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var self = this;
      window.API_1484_11 = {
        Initialize: function Initialize() {
          self.setState({ scores: {} });
          return "true";
        },
        SetValue: function SetValue(key, value) {
          var scores = self.state.scores;
          fillHash(scores, key.split('.'), value);
          self.setState({ scores: scores });
          return "true";
        },
        GetValue: function GetValue(parameter) {
          return "value";
        },
        Commit: function Commit(value) {
          self.endGame();
          return "true";
        },
        Terminate: function Terminate(value) {
          return "true";
        },
        GetLastError: function GetLastError() {
          return 0;
        },
        GetErrorString: function GetErrorString(code) {
          return "Error string";
        },
        GetDiagnostic: function GetDiagnostic(code) {
          return "Diagnostic";
        }
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.API_1484_11 = undefined;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactBootstrap.Grid,
        { fluid: true },
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'h2',
              null,
              _react2.default.createElement('i', { className: 'pe pe-7s-users text-warning' }),
              ' Participe \xE0 ton entretien'
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          this.props.ua.mobile ? _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'div',
              { className: 'alert alert-danger' },
              _react2.default.createElement(
                'h4',
                null,
                'Resource indisponible sur mobile'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Ce mode de simulation n\'est \xE0 ce jour pas compatible sur mobile.'
              ),
              _react2.default.createElement(
                'p',
                null,
                'Merci d\'acc\xE9der \xE0 ce module sur PC/MAC fixe ou portable.'
              )
            ),
            _react2.default.createElement(
              'span',
              null,
              'Contenu indisponible sur mobile'
            )
          ) : _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              _reactBootstrap.Grid,
              { fluid: true },
              _react2.default.createElement(
                _reactBootstrap.Row,
                null,
                this.state.finished ? _react2.default.createElement(
                  _reactBootstrap.Col,
                  { xs: 12 },
                  _react2.default.createElement(
                    'span',
                    null,
                    'Calcul du score en cours'
                  )
                ) : _react2.default.createElement(
                  _reactBootstrap.Col,
                  { xs: 12 },
                  _react2.default.createElement(
                    'p',
                    null,
                    'Tu vas maintenant participer \xE0 ton entretien avec le d\xE9cideur. Il se d\xE9roulera en trois phases :'
                  ),
                  _react2.default.createElement(
                    'ul',
                    null,
                    _react2.default.createElement(
                      'li',
                      null,
                      'Prise de contact'
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      'D\xE9couverte du besoin'
                    ),
                    _react2.default.createElement(
                      'li',
                      null,
                      'Formulation de l\'offre'
                    )
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Le temps est limit\xE9 et c\'est toi qui m\xE8ne l\'entretien, donne la cadence et choisi d\'avancer \xE0 l\'\xE9tape suivante quand tu es satisfait des infos que tu as.'
                  ),
                  _react2.default.createElement(
                    'p',
                    null,
                    'Bonne chance !'
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.Button,
                    { className: "btn-warning", onClick: this.runGame },
                    'Commencer l\'entretien'
                  ),
                  _react2.default.createElement('iframe', { id: 'video-game-content',
                    frameborder: '0',
                    style: { visibility: this.state.running ? "visible" : "hidden" },
                    src: this.getUrl(),
                    width: '100%',
                    height: '100%'
                  })
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getUrl',
    value: function getUrl() {
      var url = "";
      url = this.currentUserState().scenario.game_url;
      return url;
    }
  }, {
    key: 'currentUserState',
    value: function currentUserState() {
      return this.getUserState(this.props.me);
    }
  }, {
    key: 'getUserState',
    value: function getUserState(user) {
      return this.props.session.current_round.userStates.filter(function (state) {
        return state.user === user.id;
      })[0];
    }
  }, {
    key: 'runGame',
    value: function runGame() {
      this.setState({ running: true });
    }
  }, {
    key: 'endGame',
    value: function endGame() {
      var self = this;
      this.setState({ finished: true }, function () {
        _session2.default.setUserScores(this.props.session.id, this.props.me.id, this.state.scores, function () {
          self.setState({ running: false });
        });
      });
    }
  }]);

  return VideoGame;
}(_react2.default.Component);

function fillHash(hash, address, value) {
  if (address.length === 1) {
    hash[address[0]] = value;
    return true;
  } else {
    if (!hash[address[0]]) {
      hash[address[0]] = {};
    }

    hash = hash[address[0]];
    address.shift();
    return fillHash(hash, address, value);
  }
}

exports.default = (0, _reactUseragent2.default)(VideoGame);