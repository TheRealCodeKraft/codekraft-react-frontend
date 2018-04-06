'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Show children only if acls match current user grant grant_level
 * eg :
    <ShowForAcls grants={["staff"]}>
        <OtherComponents />
        ...
    </ShowForAcls>
 * @note You can pass a needAuthenticated param to the component to check if user is logged too
 *       If your url is already protected against not connected user you can leave it ;)
 */
var ShowForAcls = function (_Component) {
    _inherits(ShowForAcls, _Component);

    function ShowForAcls() {
        _classCallCheck(this, ShowForAcls);

        return _possibleConstructorReturn(this, (ShowForAcls.__proto__ || Object.getPrototypeOf(ShowForAcls)).apply(this, arguments));
    }

    _createClass(ShowForAcls, [{
        key: 'render',
        value: function render() {
            var self = this;
            if (!this.props.authenticated && this.props.needAuthenticated === true || !this.props.userGrant) {
                return false;
            }

            var found = this.props.grants ? this.props.grants.filter(function (gl) {
                return gl === self.props.userGrant;
            }) : ["ok"];
            if (found.length === 0) {
                return false;
            }
            return _react2.default.Children.only(this.props.children);
        }
    }]);

    return ShowForAcls;
}(_react.Component);

function mapStateToProps(state) {
    return {
        userGrant: state.userState.me ? state.userState.me.role : null
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(ShowForAcls);