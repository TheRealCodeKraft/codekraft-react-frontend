'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMoment = require('react-moment');

var _reactMoment2 = _interopRequireDefault(_reactMoment);

var _reactBootstrap = require('react-bootstrap');

var _podium = require('../common/podium');

var _podium2 = _interopRequireDefault(_podium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoundScores = function (_React$Component) {
  _inherits(RoundScores, _React$Component);

  function RoundScores(props) {
    _classCallCheck(this, RoundScores);

    var _this = _possibleConstructorReturn(this, (RoundScores.__proto__ || Object.getPrototypeOf(RoundScores)).call(this, props));

    _this.state = {
      collapsed: true
    };

    _this.toggleCollapse = _this.toggleCollapse.bind(_this);
    return _this;
  }

  _createClass(RoundScores, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

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
              'div',
              { className: "panel panel-jeu" + (this.state.collapsed ? " collapsed" : "") },
              _react2.default.createElement(
                'div',
                { className: 'panel-heading panel-heading-global-scores' },
                _react2.default.createElement(
                  'div',
                  { className: 'panel-tools' },
                  _react2.default.createElement(
                    'a',
                    { className: 'panel-toggle', onClick: this.toggleCollapse },
                    _react2.default.createElement('i', { className: 'fa fa-chevron-up text-warning' })
                  )
                ),
                _react2.default.createElement(
                  _reactBootstrap.Row,
                  { style: { display: "flex", alignItems: "center" } },
                  _react2.default.createElement(
                    _reactBootstrap.Col,
                    { xs: 12 },
                    _react2.default.createElement(
                      'h4',
                      null,
                      'Round ',
                      this.props.roundIndex,
                      ' / ',
                      this.props.totalRounds
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'table',
                  { className: 'table' },
                  _react2.default.createElement(
                    'thead',
                    null,
                    _react2.default.createElement(
                      'tr',
                      null,
                      _react2.default.createElement(
                        'th',
                        null,
                        'Position'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Pseudo'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Score'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Temps'
                      ),
                      _react2.default.createElement(
                        'th',
                        null,
                        'Chiffre d\'affaire'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    'tbody',
                    null,
                    this.getPlayersStates().map(function (state) {
                      return _react2.default.createElement(
                        'tr',
                        { style: _this2.props.me.id === state.player.id ? { borderLeft: "3px solid #1bbf89" } : {} },
                        _react2.default.createElement(
                          'td',
                          null,
                          state.score ? state.score.position : "-"
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          state.player.firstname
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          state.score ? state.score.raw + " pts" : "-"
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          state.score ? _react2.default.createElement(
                            _reactMoment2.default,
                            { format: 'mm:ss' },
                            state.score.session_time
                          ) : "-"
                        ),
                        _react2.default.createElement(
                          'td',
                          null,
                          !state.score || state.score.ca === 0 ? "-" : state.score.ca + "k€"
                        )
                      );
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getPlayersStates',
    value: function getPlayersStates() {
      return this.props.round.userStates.sort(function (a, b) {
        if (a.score === null) return 1;else if (b.score === null) return -1;else return a.score.position < b.score.position ? -1 : 1;
      });
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
    key: 'toggleCollapse',
    value: function toggleCollapse() {
      this.setState({ collapsed: !this.state.collapsed });
    }
  }]);

  return RoundScores;
}(_react2.default.Component);

exports.default = RoundScores;