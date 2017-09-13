"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _reactBootstrap = require("react-bootstrap");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var Home = function (_React$Component) {
    _inherits(Home, _React$Component);

    function Home() {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).apply(this, arguments));
    }

    _createClass(Home, [{
        key: "render",
        value: function render() {

            return React.createElement(
                "section",
                { className: "content" },
                React.createElement(
                    _reactBootstrap.Grid,
                    { fluid: true },
                    React.createElement(
                        _reactBootstrap.Row,
                        null,
                        React.createElement(
                            _reactBootstrap.Col,
                            { xs: 12 },
                            React.createElement(
                                "h1",
                                null,
                                React.createElement("i", { className: "pe pe-7s-home text-warning" }),
                                " Accueil"
                            ),
                            React.createElement(
                                "h2",
                                null,
                                React.createElement(
                                    "small",
                                    null,
                                    "Bienvenue sur ton compte ",
                                    React.createElement(
                                        "span",
                                        { className: "c-white" },
                                        this.props.me.firstname
                                    ),
                                    " !"
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Home;
}(React.Component);

function mapStateToProps(state) {
    return {
        me: state.userState.me || null,
        clients: state.bootstrap.clients
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Home);