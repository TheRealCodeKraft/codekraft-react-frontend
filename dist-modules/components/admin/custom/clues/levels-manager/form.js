'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _clue = require('clients/clue');

var _clue2 = _interopRequireDefault(_clue);

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LevelForm = function (_React$Component) {
  _inherits(LevelForm, _React$Component);

  function LevelForm(props) {
    _classCallCheck(this, LevelForm);

    var _this = _possibleConstructorReturn(this, (LevelForm.__proto__ || Object.getPrototypeOf(LevelForm)).call(this, props));

    _this.state = {
      level: 1,
      description: ""
    };

    _this.handleLevelChange = _this.handleLevelChange.bind(_this);
    _this.handleDescriptionChange = _this.handleDescriptionChange.bind(_this);

    _this.handleSave = _this.handleSave.bind(_this);
    return _this;
  }

  _createClass(LevelForm, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'clue-level-form' },
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'label',
          null,
          'Entrez ci-dessous un indice'
        ),
        _react2.default.createElement('textarea', { className: 'form-control', type: 'text', value: this.state.description, onChange: this.handleDescriptionChange }),
        _react2.default.createElement(
          _reactBootstrap.Button,
          { onClick: this.handleSave },
          'Enregistrer l\'indice'
        )
      );
    }
  }, {
    key: 'handleLevelChange',
    value: function handleLevelChange(e) {
      this.setState({ level: e.target.value });
    }
  }, {
    key: 'handleDescriptionChange',
    value: function handleDescriptionChange(e) {
      this.setState({ description: e.target.value });
    }
  }, {
    key: 'handleSave',
    value: function handleSave() {
      var self = this;
      _clue2.default.createLevel(this.props.clue.id, this.state.description, this.state.level, function (response) {
        if (!response.error) {
          self.setState({ description: "" });
        }
      });
    }
  }]);

  return LevelForm;
}(_react2.default.Component);

exports.default = LevelForm;