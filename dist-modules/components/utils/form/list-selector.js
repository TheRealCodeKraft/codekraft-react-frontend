'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactSelect2Wrapper = require('react-select2-wrapper');

var _reactSelect2Wrapper2 = _interopRequireDefault(_reactSelect2Wrapper);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var ListSelector = function (_React$Component) {
  _inherits(ListSelector, _React$Component);

  function ListSelector(props) {
    _classCallCheck(this, ListSelector);

    var _this = _possibleConstructorReturn(this, (ListSelector.__proto__ || Object.getPrototypeOf(ListSelector)).call(this, props));

    _this.state = {
      values: []
    };
    return _this;
  }

  _createClass(ListSelector, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.setValues(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      this.setValues(props);
    }
  }, {
    key: 'setValues',
    value: function setValues(props) {
      var _this2 = this;

      var val = "",
          splitted = [];
      var options = [],
          values = [];
      if (this.props.tags) {
        options = props.options;
      } else if (props.options && props.options.map) {
        options = props.options.map(function (value) {
          splitted = _this2.props.field.listValue.split(' ');
          val = "";
          for (var i in splitted) {
            val += value[splitted[i]] + " ";
          }
          var item = {};
          item[_this2.props.field.listKey] = value[_this2.props.field.listKey];
          item[_this2.props.field.listValue] = val;
          return item;
          //return {name: val, id: value[this.props.field.listKey]}
        });
      }
      this.setState({ values: props.defaultValue, options: options });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = {};
      if (!this.props.tags) {
        props.data = this.state.options;
      }
      return React.createElement(_reactSelect2.default.Creatable, _extends({
        ref: 'select',
        multi: true,
        valueKey: this.props.field.listKey,
        labelKey: this.props.field.listValue
      }, props, {
        value: this.state.values,
        placeholder: this.props.field.placeholder,
        options: this.state.options,
        onChange: this.handleChange.bind(this)
      }));
    }
  }, {
    key: 'handleChange',
    value: function handleChange(values) {
      var _this3 = this;

      this.setState({ values: values.map(function (val) {
          return val[_this3.props.field.listKey] == val[_this3.props.field.listValue] ? val : val[_this3.props.field.listKey];
        }) }, function () {
        if (_this3.props.onChange) {
          _this3.props.onChange({
            target: {
              name: _this3.props.field.name,
              value: _this3.state.values
            }
          });
        }
      });
    }
  }]);

  return ListSelector;
}(React.Component);

exports.default = ListSelector;