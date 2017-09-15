"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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
        null,
        React.createElement(
          "h1",
          null,
          "Accueil"
        ),
        React.createElement(
          "p",
          null,
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vitae nulla tortor. Fusce laoreet dolor at blandit placerat. Quisque a venenatis turpis. Sed a turpis magna. Aliquam imperdiet sollicitudin nulla, a sagittis est bibendum varius. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vestibulum sed lectus a arcu dignissim cursus."
        ),
        React.createElement(
          "p",
          null,
          "Integer eu fermentum odio, vitae scelerisque felis. Cras sagittis felis et purus venenatis blandit sit amet at massa. Phasellus eleifend quam eu molestie iaculis. Suspendisse in diam id metus euismod pharetra. Nulla ut maximus ex. Nunc ullamcorper elit eu erat pulvinar, nec mollis orci pharetra. Pellentesque eu mauris ipsum. Aenean feugiat et sem at tristique. Vestibulum urna nibh, bibendum ac erat a, dignissim pulvinar orci. Curabitur purus erat, blandit et finibus eget, posuere eget lectus."
        )
      );
    }
  }]);

  return Home;
}(React.Component);

exports.default = Home;