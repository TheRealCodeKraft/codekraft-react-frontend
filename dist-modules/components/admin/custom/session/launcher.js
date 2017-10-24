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

var SessionLauncher = function (_React$Component) {
  _inherits(SessionLauncher, _React$Component);

  function SessionLauncher(props) {
    _classCallCheck(this, SessionLauncher);

    var _this = _possibleConstructorReturn(this, (SessionLauncher.__proto__ || Object.getPrototypeOf(SessionLauncher)).call(this));

    _this.handleLaunch = _this.handleLaunch.bind(_this);
    _this.handleLaunched = _this.handleLaunched.bind(_this);
    _this.handleCancel = _this.handleCancel.bind(_this);
    return _this;
  }

  _createClass(SessionLauncher, [{
    key: "render",
    value: function render() {
      var localState = this.getState();
      return _react2.default.createElement(
        _reactBootstrap.Grid,
        { fluid: true },
        _react2.default.createElement(
          _reactBootstrap.Row,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 4 },
            _react2.default.createElement("img", { src: this.props.entity.game.picture, className: "img-rounded", alt: this.props.entity.game.title })
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { xs: 8 },
            _react2.default.createElement(
              "span",
              null,
              localState.message
            ),
            localState.toProceed ? _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(
                "button",
                { onClick: this.handleCancel, className: "btn btn-danger" },
                "Non"
              ),
              _react2.default.createElement(
                "button",
                { onClick: this.handleLaunch, className: "btn btn-accent" },
                "Oui"
              )
            ) : null
          )
        )
      );
    }
  }, {
    key: "getState",
    value: function getState() {
      var state = {
        message: null,
        toProceed: true
      };
      switch (this.props.action) {
        case "launch":
          state.message = _react2.default.createElement(
            "span",
            null,
            "\xCAtes-vous s\xFBr de vouloir ",
            _react2.default.createElement(
              "strong",
              null,
              "lancer"
            ),
            " la session ",
            _react2.default.createElement(
              "strong",
              null,
              this.props.entity.title
            ),
            " ?"
          );
          break;
        case "pause":
          if (this.props.entity.current_round.userStates.filter(function (us) {
            return us.decision_maker !== null;
          }).length > 0) {
            state.message = _react2.default.createElement(
              "span",
              null,
              "Vous ne pouvez pas mettre le jeu en pause : il y a des joueurs qui passent leur entretien actuellement"
            );
            state.toProceed = false;
          } else {
            state.message = _react2.default.createElement(
              "span",
              null,
              "\xCAtes-vous s\xFBr de vouloir ",
              _react2.default.createElement(
                "strong",
                null,
                "mettre en pause"
              ),
              " la session ",
              _react2.default.createElement(
                "strong",
                null,
                this.props.entity.title
              ),
              " ?"
            );
          }
          break;
        case "next-round":
          state.message = _react2.default.createElement(
            "span",
            null,
            "\xCAtes-vous s\xFBr de vouloir ",
            _react2.default.createElement(
              "strong",
              null,
              "lancer le prochain round"
            ),
            " de la session ",
            _react2.default.createElement(
              "strong",
              null,
              this.props.entity.title
            )
          );
          break;
      }
      return state;
    }
  }, {
    key: "handleLaunch",
    value: function handleLaunch() {
      this.setState({ launching: true }, function () {
        switch (this.props.action) {
          case "launch":
            this.props.client.launch(this.props.entity.id, this.handleLaunched);
            break;
          case "pause":
            this.props.client.pause(this.props.entity.id, this.handleLaunched);
            break;
          case "next-round":
            this.props.client.nextRound(this.props.entity.id, this.handleLaunched);
            break;
        }
      });
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onFinished) this.props.onFinished();
    }
  }, {
    key: "handleLaunched",
    value: function handleLaunched(data) {
      this.setState({ launching: false }, function () {
        if (this.props.onFinished) this.props.onFinished(data);
      });
    }
  }]);

  return SessionLauncher;
}(_react2.default.Component);

exports.default = SessionLauncher;