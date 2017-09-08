"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = require("react-bootstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FinalRoomScores = function (_React$Component) {
  _inherits(FinalRoomScores, _React$Component);

  function FinalRoomScores(props) {
    _classCallCheck(this, FinalRoomScores);

    var _this = _possibleConstructorReturn(this, (FinalRoomScores.__proto__ || Object.getPrototypeOf(FinalRoomScores)).call(this, props));

    _this.state = {
      scoreCollapsed: true
    };

    _this.toggleScoreCollapse = _this.toggleScoreCollapse.bind(_this);
    return _this;
  }

  _createClass(FinalRoomScores, [{
    key: "render",
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
              "div",
              { className: "panel panel-jeu" + (this.state.scoreCollapsed ? " collapsed" : "") },
              _react2.default.createElement(
                "div",
                { className: "panel-heading panel-heading-global-scores" },
                _react2.default.createElement(
                  "div",
                  { className: "panel-tools" },
                  _react2.default.createElement(
                    "a",
                    { className: "panel-toggle", onClick: this.toggleScoreCollapse },
                    _react2.default.createElement("i", { className: "fa fa-chevron-up text-warning" })
                  )
                ),
                this.props.round ? _react2.default.createElement(
                  "h4",
                  null,
                  "Round\xA0",
                  this.props.roundIndex,
                  " / ",
                  this.props.totalRounds
                ) : _react2.default.createElement(
                  "h2",
                  null,
                  "Votre score individuel pour cette simulation"
                )
              ),
              _react2.default.createElement(
                "div",
                { className: "panel-body panel-body-global-scores" },
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
                        "h4",
                        { className: "title-chiffre-affaire" },
                        "Chiffre d\u2019affaire : ",
                        _react2.default.createElement(
                          "span",
                          { className: "score" },
                          this.currentUserState().score.ca,
                          "k\u20AC"
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
                        "h4",
                        { className: "title-chiffre-affaire" },
                        "Score : ",
                        _react2.default.createElement(
                          "span",
                          { className: "score" },
                          " ",
                          Math.round(this.currentUserState().score.scaled * 100),
                          "%"
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
                      this.currentUserState().score.objectives.map(function (objective) {
                        return _react2.default.createElement(
                          _reactBootstrap.Row,
                          { className: "detail-score" },
                          _react2.default.createElement(
                            _reactBootstrap.Col,
                            { xs: 9, sm: 6, md: 6 },
                            _react2.default.createElement("i", { className: "pe pe-7s-angle-right text-warning" }),
                            objective.title
                          ),
                          _react2.default.createElement(
                            _reactBootstrap.Col,
                            { xs: 3, sm: 6, md: 6 },
                            objective.scaled * 100 > 100 ? "100" : Math.round(objective.scaled * 100),
                            " %"
                          )
                        );
                      })
                    )
                  )
                )
              )
            )
          )
        )
      );
    }
  }, {
    key: "currentUserState",
    value: function currentUserState() {
      return this.getUserState(this.props.me);
    }
  }, {
    key: "getUserState",
    value: function getUserState(user) {
      var round = this.props.round;
      if (!round) {
        round = this.props.session.current_round;
      }
      return round.userStates.filter(function (state) {
        return state.user === user.id;
      })[0];
    }
  }, {
    key: "toggleScoreCollapse",
    value: function toggleScoreCollapse() {
      this.setState({ scoreCollapsed: !this.state.scoreCollapsed });
    }
  }]);

  return FinalRoomScores;
}(_react2.default.Component);

exports.default = FinalRoomScores;