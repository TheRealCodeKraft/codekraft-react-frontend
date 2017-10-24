"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _user = require("clients/user");

var _user2 = _interopRequireDefault(_user);

var _baseItem = require("../base-item");

var _baseItem2 = _interopRequireDefault(_baseItem);

var _form = require("components/utils/form");

var _form2 = _interopRequireDefault(_form);

var _reactMoment = require("react-moment");

var _reactMoment2 = _interopRequireDefault(_reactMoment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Traineeship = function (_BaseItem) {
  _inherits(Traineeship, _BaseItem);

  function Traineeship(props) {
    _classCallCheck(this, Traineeship);

    var _this = _possibleConstructorReturn(this, (Traineeship.__proto__ || Object.getPrototypeOf(Traineeship)).call(this, props));

    _this.label = "Stage recherché";
    return _this;
  }

  _createClass(Traineeship, [{
    key: "buildFullContent",
    value: function buildFullContent() {
      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_form2.default, { id: "user-traineeship-form",
          entityId: this.props.entity.id,
          fields: [{
            name: "traineeship",
            label: "Vous recherchez un stage : ",
            type: "switch",
            values: [{ value: true, label: "Oui" }, { value: false, label: "Non" }],
            required: true,
            defaultValue: this.props.entity.traineeship
          }, {
            name: "traineeship_start_ts",
            label: "Date de début",
            type: "date",
            required: false,
            defaultValue: this.props.entity.traineeship_start_ts,
            displayIf: {
              name: "traineeship",
              value: true
            }
          }, {
            name: "traineeship_end_ts",
            label: "Date de fin",
            type: "date",
            required: false,
            defaultValue: this.props.entity.traineeship_end_ts,
            displayIf: {
              name: "traineeship",
              value: true
            }
          }],
          service: { client: _user2.default, func: "update" },
          onSubmitComplete: this.handleSubmitComplete,
          submitClass: "btn btn-accent"
        })
      );
    }
  }, {
    key: "buildValue",
    value: function buildValue() {
      var value = this.props.entity.traineeship;
      var values = [];
      if (this.props.entity.traineeship) {
        values.push(_react2.default.createElement(
          "mark",
          { className: "mark-green" },
          "Oui"
        ));
      } else {
        values.push(_react2.default.createElement(
          "mark",
          { className: "mark-red" },
          "Non"
        ));
      }

      if (this.props.entity.traineeship_start_ts) {
        if (this.props.entity.traineeship_end_ts) {
          values.push(_react2.default.createElement(
            "span",
            null,
            "\xA0Du ",
            _react2.default.createElement(
              _reactMoment2.default,
              { format: "DD/MM/YYYY" },
              this.props.entity.traineeship_start_ts
            ),
            " au ",
            _react2.default.createElement(
              _reactMoment2.default,
              { format: "DD/MM/YYYY" },
              this.props.entity.traineeship_end_ts
            )
          ));
        } else {
          values.push(_react2.default.createElement(
            "span",
            null,
            "\xA0A partir du ",
            _react2.default.createElement(
              _reactMoment2.default,
              { format: "DD/MM/YYYY" },
              this.props.entity.traineeship_start_ts
            )
          ));
        }
      }

      return values;
    }
  }]);

  return Traineeship;
}(_baseItem2.default);

exports.default = Traineeship;