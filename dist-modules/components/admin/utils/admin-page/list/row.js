"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

var moment = require("moment");

var AdminPageListRow = function (_React$Component) {
  _inherits(AdminPageListRow, _React$Component);

  function AdminPageListRow(props) {
    _classCallCheck(this, AdminPageListRow);

    var _this = _possibleConstructorReturn(this, (AdminPageListRow.__proto__ || Object.getPrototypeOf(AdminPageListRow)).call(this, props));

    _this.handleDelete = _this.handleDelete.bind(_this);
    _this.handleSee = _this.handleSee.bind(_this);
    _this.handleEdit = _this.handleEdit.bind(_this);

    _this.tableRowStyles = {
      display: "table-row"
    };

    _this.tableCellStyles = {
      display: "table-cell",
      padding: 5,
      verticalAlign: "middle"
    };
    return _this;
  }

  _createClass(AdminPageListRow, [{
    key: "render",
    value: function render() {
      var row = [],
          attribute = undefined,
          name = undefined;
      for (var attrIndex in this.props.attributes) {
        attribute = this.props.attributes[attrIndex];
        if (attribute instanceof Object) {
          if (attribute.hidden) continue;
          name = attribute.name;
        } else {
          name = attribute;
        }
        if (this.props.attributes[attrIndex]) {
          row.push(React.createElement(
            "div",
            { key: "row-" + this.props.item.id + "-attr-" + attrIndex, style: this.tableCellStyles },
            this.buildDisplayValue(name, attribute)
          ));
        }
      }
      row.push(this.buildActions(this.props.item));

      return React.createElement(
        "div",
        { className: this.props.index % 2 ? "odd" : "even", style: this.tableRowStyles },
        row
      );
    }
  }, {
    key: "buildDisplayValue",
    value: function buildDisplayValue(name, attribute) {
      var value = undefined;
      if (name.indexOf(".") !== -1) {
        var splitted = name.split('.');
        value = this.props.item[splitted[0]];
        for (var i = 1; i < splitted.length; i++) {
          if (value) {
            value = value[splitted[i]];
          } else {
            console.log("Subproperty error for '" + name + "' at '" + splitted[i]);
            break;
          }
        }
      } else {
        value = this.props.item[name];
      }

      if (attribute instanceof Object) {
        if (attribute.link) {
          var link = attribute.link.replace("[[VALUE]]", value);
          value = React.createElement(
            "a",
            { href: link, target: "_blank" },
            value
          );
        }
        if (attribute.type === "image") {
          value = React.createElement("img", { src: value, style: { height: 50 }, className: "img-rounded", alt: value });
        }
        if (attribute.type === "date") {
          value = moment(value).format('DD/MM/YYYY');
        }
        if (attribute.replaceWith && attribute.replaceWith[value] !== undefined) {
          value = attribute.replaceWith[value];
        }
      }

      return value;
    }
  }, {
    key: "buildActions",
    value: function buildActions() {
      var _this2 = this;

      var actions = [];
      if (!this.props.actions) {
        actions.push(React.createElement("a", { key: "action-delete-" + this.props.item.id, href: "#", onClick: this.handleDelete, className: "admin-action-button" + this.getIcon("trash", "trash"), alt: "Supprimer", title: "Supprimer" }));
        //actions.push(<a key={"action-see-" + this.props.item.id} href="#" onClick={this.handleSee} className={"admin-action-button " + this.getIcon("view", "eye")} alt="Afficher" title="Afficher"></a>)
        if (this.props.form) {
          actions.push(React.createElement("a", { key: "action-edit-" + this.props.item.id, href: "#", onClick: this.handleEdit, className: "admin-action-button" + this.getIcon("edit", "pencil"), alt: "Modifier", title: "Modifier" }));
        }
      } else {
        this.props.actions.map(function (action) {
          if (action instanceof Object) {
            if (_this2.acceptCustomAction(action)) {
              actions.push(React.createElement(
                "a",
                { key: "action-" + action.action + "-" + _this2.props.item.id, onClick: _this2.handleCustomAction.bind(_this2, action), className: "admin-action-button " + _this2.getIcon(action.icon, "eye"), alt: action.label, title: action.label },
                action.icon ? "" : action.label
              ));
            }
          } else {
            switch (action) {
              case "delete":
                actions.push(React.createElement("a", { key: "action-delete-" + _this2.props.item.id, href: "#", onClick: _this2.handleDelete, className: "admin-action-button" + _this2.getIcon("trash", "trash"), alt: "Supprimer", title: "Supprimer" }));
                break;
              case "see":
                //actions.push(<a key={"action-see-" + this.props.item.id} href="#" onClick={this.handleSee} className={"admin-action-button" + this.getIcon("view", "eye")} alt="Afficher" title="Afficher"></a>)
                break;
              case "edit":
                if (_this2.props.form) {
                  actions.push(React.createElement("a", { key: "action-edit-" + _this2.props.item.id, href: "#", onClick: _this2.handleEdit, className: "admin-action-button" + _this2.getIcon("edit", "pencil"), alt: "Modifier", title: "Modifier" }));
                }
                break;
              default:
                break;
            }
          }
          return true;
        });
      }

      return React.createElement(
        "div",
        { key: "actions-" + this.props.item.id, style: { textAlign: "right", whiteSpace: "nowrap" } },
        actions
      );
    }
  }, {
    key: "getIcon",
    value: function getIcon(name, defVal) {
      //return " " + (this.props.config.iconSet || "fa fa-") + (this.props.config.icons && this.props.config.icons[name] ? this.props.config.icons[name] : defVal)
      return " " + (this.props.config.iconSet || "fa fa-") + name;
    }
  }, {
    key: "acceptCustomAction",
    value: function acceptCustomAction(action) {
      var result = !action.displayIf;
      if (!result) {
        if (action.displayIf.diff) {
          if (action.displayIf.values) {
            result = action.displayIf.values.indexOf(this.props.item[action.displayIf.property].toString()) === -1;
          } else {
            result = this.props.item[action.displayIf.property].toString() !== action.displayIf.value.toString();
          }
        } else {
          if (action.displayIf.values) {
            result = action.displayIf.values.indexOf(this.props.item[action.displayIf.property]) !== -1;
          } else {
            result = this.props.item[action.displayIf.property].toString() === action.displayIf.value.toString();
          }
        }
      }
      return result;
    }
  }, {
    key: "handleDelete",
    value: function handleDelete(e) {
      e.preventDefault();
      if (this.props.onDelete) this.props.onDelete(this.props.item.id);
    }
  }, {
    key: "handleSee",
    value: function handleSee(e) {
      e.preventDefault();
      if (this.props.onSee) this.props.onSee(this.props.item.id);
    }
  }, {
    key: "handleEdit",
    value: function handleEdit(e) {
      e.preventDefault();
      console.log(this.props.item.id);
      if (this.props.onEdit) this.props.onEdit(this.props.item.id);
    }
  }, {
    key: "handleCustomAction",
    value: function handleCustomAction(action, e) {
      e.preventDefault();
      if (this.props.onCustomAction) this.props.onCustomAction(this.props.item.id, action);
    }
  }]);

  return AdminPageListRow;
}(React.Component);

exports.default = AdminPageListRow;