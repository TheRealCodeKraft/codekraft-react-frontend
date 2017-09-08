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

var _form = require('components/utils/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tables = function (_React$Component) {
  _inherits(Tables, _React$Component);

  function Tables(props) {
    _classCallCheck(this, Tables);

    var _this = _possibleConstructorReturn(this, (Tables.__proto__ || Object.getPrototypeOf(Tables)).call(this, props));

    _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);
    return _this;
  }

  _createClass(Tables, [{
    key: 'componentWillMount',
    value: function componentWillMount() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_form2.default, { id: 'session-users-form',
        entityId: this.props.session.id,
        fields: [{
          name: "table_seat_count",
          type: "text",
          label: "Nombre de places par table",
          required: true,
          defaultValue: this.props.session.table_seat_count
        }],
        service: { client: _session2.default, func: "update" },
        onSubmitComplete: this.handleSubmitComplete,
        submitClass: "btn btn-accent"
      });
    }
  }, {
    key: 'handleSubmitComplete',
    value: function handleSubmitComplete(data) {}
  }]);

  return Tables;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    players: state.userState.users || []
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Tables);