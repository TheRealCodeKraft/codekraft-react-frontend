'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _session = require('clients/session');

var _session2 = _interopRequireDefault(_session);

var _reactActioncableProvider = require('react-actioncable-provider');

var _waitingRoom = require('./playground/waiting-room');

var _waitingRoom2 = _interopRequireDefault(_waitingRoom);

var _scenarioSelector = require('./playground/scenario-selector');

var _scenarioSelector2 = _interopRequireDefault(_scenarioSelector);

var _roomSelector = require('./playground/room-selector');

var _roomSelector2 = _interopRequireDefault(_roomSelector);

var _cluesSelector = require('./playground/clues-selector');

var _cluesSelector2 = _interopRequireDefault(_cluesSelector);

var _videoGame = require('./playground/video-game');

var _videoGame2 = _interopRequireDefault(_videoGame);

var _finalRoom = require('./playground/final-room');

var _finalRoom2 = _interopRequireDefault(_finalRoom);

var _globalScores = require('./playground/global-scores');

var _globalScores2 = _interopRequireDefault(_globalScores);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Playground = function (_React$Component) {
  _inherits(Playground, _React$Component);

  function Playground(props) {
    _classCallCheck(this, Playground);

    var _this = _possibleConstructorReturn(this, (Playground.__proto__ || Object.getPrototypeOf(Playground)).call(this, props));

    _this.state = {
      current_session_id: undefined
    };

    _this.handleCableReceived = _this.handleCableReceived.bind(_this);
    _this.doPing = _this.doPing.bind(_this);
    return _this;
  }

  _createClass(Playground, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.match.params.identifier !== undefined) {
        this.setState({ current_session_id: parseInt(this.props.match.params.identifier) }, function () {
          _session2.default.fetchOne(this.props.match.params.identifier);
        });
      }

      this.startPolling();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._timer) {
        clearInterval(this._timer);
        this._timer = null;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.session || this.props.session.id !== this.state.current_session_id) return _react2.default.createElement(
        'span',
        null,
        'Chargement de la session en cours'
      );else {
        return _react2.default.createElement(
          'section',
          { className: 'content jeu' },
          _react2.default.createElement(_reactActioncableProvider.ActionCable, { ref: 'sessionChannel', channel: { channel: "SessionChannel", session: this.props.session.id }, onReceived: this.handleCableReceived }),
          _react2.default.createElement(
            _reactBootstrap.Grid,
            { fluid: true },
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12, className: 'titre-accueil-jeu' },
                _react2.default.createElement(
                  _reactBootstrap.Panel,
                  { className: 'panel-filled panel-c-warning' },
                  _react2.default.createElement(
                    _reactBootstrap.Row,
                    null,
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { md: 9 },
                      _react2.default.createElement('img', { src: this.props.session.game.picture, className: 'img-rounded image-lg', alt: this.props.session.game.title }),
                      _react2.default.createElement(
                        'h1',
                        null,
                        this.props.session.game.title
                      ),
                      _react2.default.createElement(
                        'div',
                        { className: 'small' },
                        this.props.session.title
                      )
                    ),
                    _react2.default.createElement(
                      _reactBootstrap.Col,
                      { md: 3 },
                      _react2.default.createElement(
                        _reactBootstrap.Button,
                        { href: '/dashboard/sessions', className: 'btn-retour-liste-jeu' },
                        'Retour \xE0 la liste des sessions'
                      )
                    )
                  )
                )
              )
            ),
            _react2.default.createElement(
              _reactBootstrap.Row,
              null,
              _react2.default.createElement(
                _reactBootstrap.Col,
                { xs: 12 },
                this.buildSection()
              )
            )
          )
        );
      }
    }
  }, {
    key: 'buildSection',
    value: function buildSection() {
      var section = null;

      switch (this.props.session.playable) {
        case "to_launch":
          section = _react2.default.createElement(
            'div',
            { className: 'alert alert-danger' },
            _react2.default.createElement(
              'h4',
              null,
              'Jeu en pause'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Attendez que l\'animateur lance la session de jeu pour pouvoir commencer.'
            )
          );
          break;
        case "play":
          switch (this.props.session.current_step) {
            case "waiting_players":
              section = _react2.default.createElement(_waitingRoom2.default, { session: this.props.session });
              break;
            case "room":
              section = _react2.default.createElement(_roomSelector2.default, { session: this.props.session });
              break;
            case "scenario":
              section = _react2.default.createElement(_scenarioSelector2.default, { session: this.props.session });
              break;
            case "clues":
              if (this.currentUserState().decision_maker === null) {
                section = _react2.default.createElement(_cluesSelector2.default, { session: this.props.session });
              } else if (this.currentUserState().score && this.currentUserState().score.ca) {
                section = _react2.default.createElement(_finalRoom2.default, { session: this.props.session });
              } else {
                section = _react2.default.createElement(_videoGame2.default, { session: this.props.session, me: this.props.me });
              }
              break;
            default:
              break;
          }
          break;
        case "pause":
          section = _react2.default.createElement(
            'div',
            { className: 'alert alert-danger' },
            _react2.default.createElement(
              'h4',
              null,
              'Jeu en pause'
            ),
            _react2.default.createElement(
              'p',
              null,
              'Attendez que l\'animateur lance la session de jeu pour pouvoir commencer.'
            )
          );
          break;
        case "stop":
          section = _react2.default.createElement(_globalScores2.default, { session: this.props.session });
          break;
        default:
          break;
      }

      return section;
    }
  }, {
    key: 'startPolling',
    value: function startPolling() {
      var self = this;
      setTimeout(function () {
        self.doPing(); // do it once and then start it up ...
        self._timer = setInterval(self.doPing, 15000);
      }, 1000);
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
    key: 'handleCableReceived',
    value: function handleCableReceived(data) {
      if (this.props.session.id === data.session.id) {
        _session2.default.pushInState(data.session);
      }
    }
  }, {
    key: 'doPing',
    value: function doPing() {
      if (this.refs.sessionChannel) {
        this.refs.sessionChannel.perform('ping', { user: this.props.me.id, session: this.props.session.id });
      }
    }
  }]);

  return Playground;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    session: state.sessionState.session || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Playground);