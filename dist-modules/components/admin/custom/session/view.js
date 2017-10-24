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

var _podium = require('components/dashboard/playground/common/podium');

var _podium2 = _interopRequireDefault(_podium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionView = function (_React$Component) {
  _inherits(SessionView, _React$Component);

  function SessionView() {
    _classCallCheck(this, SessionView);

    return _possibleConstructorReturn(this, (SessionView.__proto__ || Object.getPrototypeOf(SessionView)).apply(this, arguments));
  }

  _createClass(SessionView, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        _reactBootstrap.Grid,
        null,
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'h2',
              null,
              this.props.entity.title
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'h4',
              null,
              'Session ',
              _react2.default.createElement(
                'strong',
                null,
                this.getStatus()
              )
            )
          )
        ),
        _react2.default.createElement('hr', { style: { borderColor: "#636363", marginBottom: 40 } }),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(_podium2.default, { session: this.props.entity })
          )
        ),
        _react2.default.createElement('hr', { style: { borderColor: "#636363", marginBottom: 40 } }),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
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
                    { rowSpan: '2' },
                    'Position'
                  ),
                  _react2.default.createElement(
                    'th',
                    { rowSpan: '2' },
                    'Pseudo'
                  ),
                  _react2.default.createElement(
                    'th',
                    { rowSpan: '2' },
                    'Salle'
                  ),
                  this.props.entity.rounds.map(function (round, index) {
                    return _react2.default.createElement(
                      'th',
                      { colSpan: '3' },
                      'Round ',
                      index + 1
                    );
                    return _react2.default.createElement(
                      'th',
                      { colSpan: round.id === _this2.props.entity.current_round.id ? 4 : 3 },
                      'Round ',
                      index + 1
                    );
                  }),
                  _react2.default.createElement(
                    'th',
                    { colSpan: '3' },
                    'GLOBAL'
                  )
                ),
                _react2.default.createElement(
                  'tr',
                  null,
                  this.props.entity.rounds.map(function (round, index) {
                    var cols = [];

                    if (round.id === _this2.props.entity.current_round.id) {
                      cols.push(_react2.default.createElement(
                        'th',
                        null,
                        'Scenario'
                      ));
                    }

                    cols.push(_react2.default.createElement(
                      'th',
                      null,
                      'Score'
                    ));
                    cols.push(_react2.default.createElement(
                      'th',
                      null,
                      'Temps'
                    ));
                    cols.push(_react2.default.createElement(
                      'th',
                      null,
                      'Chiffre d\'affaire'
                    ));
                    return cols;
                  }),
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
                this.getUserStates().map(function (state) {
                  return _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                      'td',
                      null,
                      state.score ? state.score.total_position : "-"
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      state.player.firstname
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      state.room ? state.room.name : "-"
                    ),
                    _this2.props.entity.rounds.map(function (round, index) {
                      var roundState = round.userStates.filter(function (st) {
                        return st.user === state.user;
                      })[0];

                      var cols = [];
                      if (round.id === _this2.props.entity.current_round.id) {
                        cols.push(_react2.default.createElement(
                          'td',
                          null,
                          roundState.scenario ? state.scenario.name : "-"
                        ));
                      }
                      cols.push(_react2.default.createElement(
                        'td',
                        null,
                        roundState.score ? roundState.score.raw + " pts" : "-"
                      ));
                      cols.push(_react2.default.createElement(
                        'td',
                        null,
                        roundState.score ? _react2.default.createElement(
                          _reactMoment2.default,
                          { format: 'mm:ss' },
                          roundState.score.session_time
                        ) : "-"
                      ));
                      cols.push(_react2.default.createElement(
                        'td',
                        null,
                        !roundState.score || roundState.score.ca === 0 ? "-" : roundState.score.ca + "k€"
                      ));
                      return cols;
                    }),
                    _react2.default.createElement(
                      'td',
                      null,
                      state.score && state.score.total_raw ? state.score.total_raw + " pts" : "-"
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      state.score && state.score.total_session_time ? _react2.default.createElement(
                        _reactMoment2.default,
                        { format: 'mm:ss' },
                        state.score.total_session_time
                      ) : "-"
                    ),
                    _react2.default.createElement(
                      'td',
                      null,
                      state.score && state.score.total_ca ? state.score.total_ca + "k€" : "-"
                    )
                  );
                })
              )
            )
          )
        )
      );
    }
  }, {
    key: 'getStatus',
    value: function getStatus() {
      var status = "";
      switch (this.props.entity.playable) {
        case "to_launch":
          status = "pas encore lancée";
          break;
        case "play":
          status = "en cours";
          break;
        case "pause":
          status = "en pause";
          break;
        case "stop":
          status = "terminée";
          break;
      }
      return status;
    }
  }, {
    key: 'getUserStates',
    value: function getUserStates() {
      var round = this.props.entity.current_round;
      if (this.props.entity.rounds.length > 1) {
        round = this.props.entity.rounds[this.props.entity.rounds.length - 2];
      }
      return round.userStates.sort(function (a, b) {
        if (a.score === null) return 1;else if (b.score === null) return -1;else return a.score.total_position < b.score.total_position ? -1 : 1;
      });
    }
  }]);

  return SessionView;
}(_react2.default.Component);

exports.default = SessionView;