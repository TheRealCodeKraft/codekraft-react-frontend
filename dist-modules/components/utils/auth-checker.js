"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (ComposedComponent) {
  var offline = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var clients = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


  var Auth = clients.AuthClient;
  var UserClient = clients.UserClient;

  var AuthChecker = function (_React$Component) {
    _inherits(AuthChecker, _React$Component);

    function AuthChecker(props) {
      _classCallCheck(this, AuthChecker);

      var _this = _possibleConstructorReturn(this, (AuthChecker.__proto__ || Object.getPrototypeOf(AuthChecker)).call(this, props));

      _this.state = {
        loggingIn: false,
        refreshing: false,
        resetting: false,
        checking: false,
        connectionOk: false
      };

      _this.handleRefresh = _this.handleRefresh.bind(_this);
      return _this;
    }

    _createClass(AuthChecker, [{
      key: "componentWillMount",
      value: function componentWillMount() {
        if (this.props.location.search.indexOf("stamp") !== -1) {
          var self = this;
          this.setState({ loggingIn: true }, function () {
            var splitted = this.props.location.search.replace("?", "").split("&");
            var emailSplit = splitted[0].split("=");
            var stampSplit = splitted[1].split("=");
            if (!this.props.me || this.props.me.email !== emailSplit[1]) {
              Auth.login({ email: emailSplit[1], password: stampSplit[1] }, function (data) {
                UserClient.me();
                /*
                            if (data.error) {
                              self.props.history.push("/")
                            } else {
                              self.setState({checking: true}, function () {
                                UserClient.me()
                                self.props.history.push(self.props.location.pathname)
                              })
                            }
                */
              });
            } else {
              this.props.history.push(this.props.location.pathname);
            }
          });
        } else if (!this.state.loggingIn) {
          if (Auth.checkForToken() === true) {
            // I HAVE A TOKEN
            if (offline) {
              // I NEED OFFLINE GRANTS
              this.props.history.push("/dashboard");
            } else {
              // I NEED ONLINE GRANTS
              if (this.props.me === null) {
                // NOT ME DATA
                this.setState({ checking: true }, function () {
                  UserClient.me();
                });
              } else {
                // RESETTING ME DATA
                this.setState({ resetting: true }, function () {
                  UserClient.resetMe();
                });
              }
            }
          } else {
            // I HAVE NO TOKEN
            if (offline) {
              // I NEED OFFLINE GRANTS
              this.setState({ connectionOk: true });
            } else {
              // I NEED ONLINE GRANTS
              this.props.history.push('/login');
            }
          }
        }
      }
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(props) {
        if (this.state.resetting && props.me == null) {
          // SESSION HAS BEEN RESET
          this.setState({ resetting: false, checking: true }, function () {
            UserClient.me();
          });
        } else if (this.state.checking) {
          // I AM CHECKING FOR ME DATA
          if (props.notFound === false) {
            // I AM LOGGED IN
            this.setState({ checking: false, connectionOk: true });
          } else {
            // CONNECTION FAILED
            this.props.history.push("/login");
          }
        } else if (this.state.loggingIn && props.token) {
          /*
                  if (!props.token) {
                    console.log("BLUP")
                    Auth.getToken()
                  }
                  this.props.history.push(this.props.location.pathname)
          */
          this.setState({ loggingIn: false });
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!this.state.connectionOk || this.state.loggingIn === true) {
          return _react2.default.createElement(
            "section",
            { className: "content" },
            _react2.default.createElement("div", { className: "loader-dots" })
          );
        }

        return _react2.default.createElement(ComposedComponent, _extends({ clients: clients }, this.props));
      }
    }, {
      key: "handleRefresh",
      value: function handleRefresh(data) {
        if (data.error) {
          Auth.logout();
        }
        this.setState({ refreshing: false });
      }
    }]);

    return AuthChecker;
  }(_react2.default.Component);

  return (0, _reactRedux.connect)(mapStateToProps)(AuthChecker);
};

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mapStateToProps(state) {
  return {
    me: state.userState.me,
    notFound: state.userState.notFound || false,
    token: state.authState.token || null
  };
}