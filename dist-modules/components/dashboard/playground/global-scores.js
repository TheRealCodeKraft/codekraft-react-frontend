'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactBootstrap = require('react-bootstrap');

var _round = require('./global-scores/round');

var _round2 = _interopRequireDefault(_round);

var _podium = require('./common/podium');

var _podium2 = _interopRequireDefault(_podium);

var _scores = require('./common/scores');

var _scores2 = _interopRequireDefault(_scores);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GlobalScores = function (_React$Component) {
  _inherits(GlobalScores, _React$Component);

  function GlobalScores() {
    _classCallCheck(this, GlobalScores);

    return _possibleConstructorReturn(this, (GlobalScores.__proto__ || Object.getPrototypeOf(GlobalScores)).apply(this, arguments));
  }

  _createClass(GlobalScores, [{
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
              'h2',
              null,
              _react2.default.createElement('i', { className: 'pe pe-7s-paper-plane text-warning' }),
              ' Podium'
            ),
            _react2.default.createElement(_podium2.default, { session: this.props.session, totalsForSession: true })
          )
        ),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 12 },
            _react2.default.createElement(
              'div',
              { className: "panel panel-filled panel-default" },
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'h2',
                  null,
                  _react2.default.createElement('i', { className: 'pe pe-7s-graph3 text-warning' }),
                  ' Classement par round'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Row,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Col,
                    { xs: 12 },
                    this.props.session.rounds.map(function (round, index) {
                      return _react2.default.createElement(_round2.default, { me: _this2.props.me,
                        round: round,
                        roundIndex: index + 1,
                        totalRounds: _this2.props.session.rounds.length
                      });
                    })
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
            _react2.default.createElement(
              'div',
              { className: "panel panel-filled panel-default" },
              _react2.default.createElement(
                'div',
                { className: 'panel-body' },
                _react2.default.createElement(
                  'h2',
                  null,
                  _react2.default.createElement('i', { className: 'pe pe-7s-graph text-warning' }),
                  ' D\xE9tails de mes scores'
                ),
                _react2.default.createElement(
                  _reactBootstrap.Row,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.Col,
                    { xs: 12 },
                    this.props.session.rounds.map(function (round, index) {
                      return _react2.default.createElement(_scores2.default, { me: _this2.props.me,
                        round: round,
                        roundIndex: index + 1,
                        totalRounds: _this2.props.session.rounds.length
                      });
                    })
                  )
                )
              )
            )
          )
        )
      );
    }
  }]);

  return GlobalScores;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(GlobalScores);