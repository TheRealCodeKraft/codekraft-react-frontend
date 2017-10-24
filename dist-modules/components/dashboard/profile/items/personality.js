"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _baseItem = require("../base-item");

var _baseItem2 = _interopRequireDefault(_baseItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Personality = function (_BaseItem) {
  _inherits(Personality, _BaseItem);

  function Personality(props) {
    _classCallCheck(this, Personality);

    var _this = _possibleConstructorReturn(this, (Personality.__proto__ || Object.getPrototypeOf(Personality)).call(this, props));

    _this.label = "Personnalité";
    return _this;
  }

  return Personality;
}(_baseItem2.default);

exports.default = Personality;