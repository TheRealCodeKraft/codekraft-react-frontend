'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _user = require('clients/user');

var _user2 = _interopRequireDefault(_user);

var _speciality = require('clients/speciality');

var _speciality2 = _interopRequireDefault(_speciality);

var _baseItem = require('../base-item');

var _baseItem2 = _interopRequireDefault(_baseItem);

var _form = require('components/utils/form');

var _form2 = _interopRequireDefault(_form);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Specialities = function (_BaseItem) {
  _inherits(Specialities, _BaseItem);

  function Specialities(props) {
    _classCallCheck(this, Specialities);

    var _this = _possibleConstructorReturn(this, (Specialities.__proto__ || Object.getPrototypeOf(Specialities)).call(this, props));

    _this.label = "Spécialités";
    return _this;
  }

  _createClass(Specialities, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _speciality2.default.fetchAll();
    }
  }, {
    key: 'buildFullContent',
    value: function buildFullContent() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_form2.default, { id: 'user-specialities-form',
          entityId: this.props.entity.id,
          fields: [{
            name: "specialities",
            label: "Indiquez vos spécialités",
            type: "list-selector",
            placeholder: "Sélectionnez une spécialité pour l'ajouter",
            values: this.props.specialities,
            listKey: "id",
            listValue: "name",
            required: true,
            defaultValue: this.props.entity.specialities.map(function (speciality) {
              return speciality.id;
            })
          }],
          service: { client: _user2.default, func: "update" },
          onSubmitComplete: this.handleSubmitComplete,
          submitClass: "btn btn-accent"
        })
      );
    }
  }]);

  return Specialities;
}(_baseItem2.default);

function mapStateToProps(state) {
  return {
    specialities: state.specialityState.specialities || []
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(Specialities);