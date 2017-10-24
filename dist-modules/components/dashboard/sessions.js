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

var _session3 = require('./sessions/session');

var _session4 = _interopRequireDefault(_session3);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Sessions = function (_React$Component) {
  _inherits(Sessions, _React$Component);

  function Sessions() {
    _classCallCheck(this, Sessions);

    return _possibleConstructorReturn(this, (Sessions.__proto__ || Object.getPrototypeOf(Sessions)).apply(this, arguments));
  }

  _createClass(Sessions, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _session2.default.fetchAll({ current: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var sessions = this.buildSessions();
      return _react2.default.createElement(
        'section',
        { className: 'content' },
        _react2.default.createElement(
          _reactBootstrap.Grid,
          { fluid: true },
          _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              _react2.default.createElement(
                'h1',
                null,
                _react2.default.createElement('i', { className: "pe pe-7s-joy text-warning" }),
                ' Jeux'
              )
            )
          ),
          sessions.filter(function (session) {
            return session !== null;
          }).length > 0 ? sessions : _react2.default.createElement(
            _reactBootstrap.Row,
            null,
            _react2.default.createElement(
              _reactBootstrap.Col,
              { xs: 12 },
              'Vous n\'avez \xE9t\xE9 invit\xE9 \xE0 aucune session pour le moment'
            )
          )
        )
      );
    }
  }, {
    key: 'buildSessions',
    value: function buildSessions() {
      var _this2 = this;

      return this.props.sessions.map(function (session) {
        var ui = _react2.default.createElement(_session4.default, { key: "session-" + session.id, session: session });
        if (_this2.props.me.role === "admin" && session.players.filter(function (player) {
          return player.id === _this2.props.me.id;
        }).length === 0) {
          ui = null;
        }
        return ui;
      });
    }
  }]);

  return Sessions;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null,
    sessions: state.sessionState.sessions || []
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Sessions);