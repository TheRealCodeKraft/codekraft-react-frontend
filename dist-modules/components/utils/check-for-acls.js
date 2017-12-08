'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (grantLevels, ComposedComponent) {
    var CheckForAcls = function (_Component) {
        _inherits(CheckForAcls, _Component);

        function CheckForAcls() {
            _classCallCheck(this, CheckForAcls);

            return _possibleConstructorReturn(this, (CheckForAcls.__proto__ || Object.getPrototypeOf(CheckForAcls)).apply(this, arguments));
        }

        _createClass(CheckForAcls, [{
            key: 'render',
            value: function render() {
                var self = this;
                if (!this.props.authenticated || !this.props.userGrant) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
                }

                var found = grantLevels.filter(function (gl) {
                    return gl === self.props.userGrant;
                });
                if (found.length === 0) {
                    return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
                }

                return _react2.default.createElement(ComposedComponent, this.props);
            }
        }]);

        return CheckForAcls;
    }(_react.Component);

    function mapStateToProps(state) {
        return {
            authenticated: state.userState.authenticated,
            userGrant: state.userState.me ? state.userState.me.role == "admin" ? "admin" : state.userState.me.type : null
        };
    }

    return (0, _reactRedux.connect)(mapStateToProps)(CheckForAcls);
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _reactRouterDom = require('react-router-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Allow access to specifics url depending on the user grant level and the authorized ones.
 * @param array grantLevels 
 * @param {*} ComposedComponent 
 * 
 * @eg
   <Route exact path={match.url+"/stats-admin"} component={CheckForAcls(["staff_admin"], Statistic)}/>
   @eg
   Directly in a component you can do something like :
   export default translate("Statistic")(CheckForAcls(["staff"], Statistic));
 */