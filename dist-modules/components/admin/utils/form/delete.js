"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var DeleteForm = function (_React$Component) {
  _inherits(DeleteForm, _React$Component);

  function DeleteForm(props) {
    _classCallCheck(this, DeleteForm);

    var _this = _possibleConstructorReturn(this, (DeleteForm.__proto__ || Object.getPrototypeOf(DeleteForm)).call(this, props));

    _this.state = {
      deleting: false
    };

    _this.handleCancel = _this.handleCancel.bind(_this);
    _this.handleConfirm = _this.handleConfirm.bind(_this);

    _this.handleDeleted = _this.handleDeleted.bind(_this);
    return _this;
  }

  _createClass(DeleteForm, [{
    key: "render",
    value: function render() {
      var content = null;
      if (this.props.entity) {
        if (this.state.deleting) {
          content = React.createElement(
            "div",
            { style: { padding: 20 } },
            "Suppression de ",
            React.createElement(
              "strong",
              null,
              this.props.entity[this.props.delete.labels.identifier]
            ),
            " en cours ..."
          );
        } else {
          content = React.createElement(
            "div",
            { style: { padding: 20, display: "flex", flexDirection: "column" } },
            React.createElement(
              "span",
              null,
              "\xCAtes-vous s\xFBr de vouloir supprimer ",
              this.props.delete.labels.entity,
              " ",
              React.createElement(
                "strong",
                null,
                this.props.entity[this.props.delete.labels.identifier]
              ),
              " ?"
            ),
            React.createElement(
              "div",
              null,
              React.createElement(
                "button",
                { onClick: this.handleCancel, className: "btn btn-danger" },
                "Non"
              ),
              React.createElement(
                "button",
                { onClick: this.handleConfirm, className: "btn btn-accent" },
                "Oui"
              )
            )
          );
        }
      }
      return content;
    }
  }, {
    key: "handleCancel",
    value: function handleCancel() {
      if (this.props.onDeleted) this.props.onDeleted();
    }
  }, {
    key: "handleConfirm",
    value: function handleConfirm() {
      this.setState({ deleting: true }, this.deleteEntity());
    }
  }, {
    key: "deleteEntity",
    value: function deleteEntity() {
      this.props.client.destroy(this.props.entity.id, this.handleDeleted);
    }
  }, {
    key: "handleDeleted",
    value: function handleDeleted(data) {
      this.setState({ deleting: false }, function () {
        if (this.props.onDeleted) this.props.onDeleted();
      });
    }
  }]);

  return DeleteForm;
}(React.Component);

exports.default = DeleteForm;