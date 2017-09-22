'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = function (config, globalConfig) {
  var AdminPage = function (_React$Component) {
    _inherits(AdminPage, _React$Component);

    function AdminPage(props) {
      _classCallCheck(this, AdminPage);

      var _this = _possibleConstructorReturn(this, (AdminPage.__proto__ || Object.getPrototypeOf(AdminPage)).call(this, props));

      _this.state = {
        currentId: undefined,
        mode: "list",
        currentAction: undefined
      };

      _this.handleCloseSidebar = _this.handleCloseSidebar.bind(_this);

      _this.handleNew = _this.handleNew.bind(_this);
      _this.handleDelete = _this.handleDelete.bind(_this);
      _this.handleDeleted = _this.handleDeleted.bind(_this);
      _this.handleSee = _this.handleSee.bind(_this);
      _this.handleEdit = _this.handleEdit.bind(_this);
      _this.handleCustomAction = _this.handleCustomAction.bind(_this);
      _this.handleCustomActionFinished = _this.handleCustomActionFinished.bind(_this);

      _this.handleSubmitComplete = _this.handleSubmitComplete.bind(_this);

      _this.handleCableReceived = _this.handleCableReceived.bind(_this);
      return _this;
    }

    _createClass(AdminPage, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        if (config.client) {
          if (config.client["fetchAll"]) {
            config.client["fetchAll"]();
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var pluralName = getPluralName();

        return React.createElement(
          _reactBootstrap.Grid,
          { fluid: true },
          React.createElement(
            _reactBootstrap.Row,
            null,
            React.createElement(
              _reactBootstrap.Col,
              { xs: 10 },
              React.createElement(
                'h1',
                null,
                React.createElement('i', { className: globalConfig.iconSet ? globalConfig.iconSet : "fa fa-" + (config.icon ? config.icon : globalConfig.icons && globalConfig.icons.pin ? globalConfig.icons.pin : "terminal") + " text-warning" }),
                ' ',
                config.title
              )
            ),
            config.list.actions && config.list.actions.indexOf("new") !== -1 ? React.createElement(
              _reactBootstrap.Col,
              { xs: 12, className: 'admin-new-button-row' },
              React.createElement(
                'a',
                { href: '#', onClick: this.handleNew, className: 'admin-new-button' },
                React.createElement('i', { className: 'pe pe-7s-plus' }),
                ' Nouveau'
              )
            ) : null
          ),
          this.buildWatchers(),
          React.createElement(
            'div',
            null,
            React.createElement(_list2.default, { attributes: config.list.attributes,
              actions: config.list.actions,
              items: this.props[pluralName],
              onDelete: this.handleDelete,
              onSee: this.handleSee,
              onEdit: this.handleEdit,
              onCustomAction: this.handleCustomAction,
              config: globalConfig
            }),
            React.createElement(
              _sidebar2.default,
              { ref: 'sidebar',
                onClose: this.handleCloseSidebar,
                tinify: this.state.mode === "delete" || this.state.currentAction && this.state.currentAction.tinify,
                title: this.getSidebarTitle() },
              this.getSidebarContent()
            )
          )
        );
      }
    }, {
      key: 'buildWatchers',
      value: function buildWatchers() {
        var _this2 = this;

        var watchers = [];
        if (config.watcher) {
          if (this.props[getPluralName()]) {
            this.props[getPluralName()].map(function (entity) {
              if (config.watcher.if) {
                if (entity[config.watcher.if.property] === config.watcher.if.value) {
                  watchers.push(React.createElement(_reactActioncableProvider.ActionCable, { channel: { channel: config.watcher.channel, session: entity.id }, onReceived: _this2.handleCableReceived }));
                }
              } else {
                watchers.push(React.createElement(_reactActioncableProvider.ActionCable, { channel: { channel: config.watcher, session: entity.id }, onReceived: _this2.handleCableReceived }));
              }
            });
          }
        }
        return watchers;
      }
    }, {
      key: 'getSidebarTitle',
      value: function getSidebarTitle() {
        var title = "";
        switch (this.state.mode) {
          case "list":
            break;
          case "create":
            title = "Créer" + (config.delete ? " " + config.delete.labels.entity : "");
          case "edit":
            title = "Modifier" + (config.delete ? " " + config.delete.labels.entity : "");
            break;
          case "delete":
            title = "Supprimer" + (config.delete ? " " + config.delete.labels.entity : "");
            break;
          default:
            if (this.state.currentAction !== undefined) {
              title = this.state.currentAction.label;
            }
            break;
        }
        return title;
      }
    }, {
      key: 'getSidebarContent',
      value: function getSidebarContent() {
        var _this3 = this;

        var content = null;

        var entity = null;
        if (this.state.currentId !== undefined) {
          entity = this.props[getPluralName()].filter(function (item) {
            return item.id === _this3.state.currentId;
          })[0];
        }

        switch (this.state.mode) {
          case "list":
            break;
          case "create":
          case "edit":
            content = React.createElement(_createEdit2.default, _extends({}, config, { entity: entity, mode: this.state.mode, onSubmitComplete: this.handleSubmitComplete }));
            break;
          case "delete":
            content = React.createElement(_delete2.default, _extends({}, config, { entity: entity, onDeleted: this.handleDeleted }));
            break;
          default:
            if (this.state.currentAction !== undefined) {
              if (this.state.currentAction.component) {
                var Component = this.state.currentAction.component;
                content = React.createElement(Component, _extends({}, config, { entity: entity, action: this.state.currentAction.action, onFinished: this.handleCustomActionFinished }));
              }
            }
            break;
        }
        return content;
      }
    }, {
      key: 'openSidebar',
      value: function openSidebar() {
        this.refs.sidebar.open();
      }
    }, {
      key: 'closeSidebar',
      value: function closeSidebar() {
        this.refs.sidebar.close();
      }
    }, {
      key: 'handleCableReceived',
      value: function handleCableReceived(data) {
        config.client.pushInState(data[config.client.name]);
      }
    }, {
      key: 'handleNew',
      value: function handleNew(e) {
        e.preventDefault();
        this.setState({ currentId: undefined, mode: "create" }, this.openSidebar);
      }
    }, {
      key: 'handleDelete',
      value: function handleDelete(id) {
        this.setState({ currentId: id, mode: "delete" }, this.openSidebar);
      }
    }, {
      key: 'handleDeleted',
      value: function handleDeleted() {
        this.closeSidebar();
      }
    }, {
      key: 'handleSee',
      value: function handleSee(id) {
        this.setState({ currentId: id, mode: "see" });
      }
    }, {
      key: 'handleEdit',
      value: function handleEdit(id) {
        this.setState({ currentId: id, mode: "edit" }, this.openSidebar);
      }
    }, {
      key: 'handleCustomAction',
      value: function handleCustomAction(id, action) {
        this.setState({ currentId: id, mode: action.action, currentAction: action }, this.openSidebar);
      }
    }, {
      key: 'handleCustomActionFinished',
      value: function handleCustomActionFinished() {
        this.closeSidebar();
      }
    }, {
      key: 'handleSubmitComplete',
      value: function handleSubmitComplete(data) {
        if (!data.error) {
          this.refs.sidebar.close();
        }
      }
    }, {
      key: 'handleCloseSidebar',
      value: function handleCloseSidebar() {
        var self = this;
        setTimeout(function () {
          self.setState({ currentId: undefined, mode: "list", currentAction: undefined });
        }, 500);
      }
    }]);

    return AdminPage;
  }(React.Component);

  function getPluralName() {
    return config.client.plural ? config.client.plural : config.client.name + "s";
  }

  function mapStateToProps(state) {
    var pluralName = getPluralName();

    var props = {};
    props[pluralName] = state[config.client.name + "State"][pluralName] || [];
    return props;
  }

  return (0, _reactRedux.connect)(mapStateToProps)(AdminPage);
};

var _reactRedux = require('react-redux');

var _list = require('./admin-page/list');

var _list2 = _interopRequireDefault(_list);

var _sidebar = require('./admin-page/sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

var _createEdit = require('./form/create-edit');

var _createEdit2 = _interopRequireDefault(_createEdit);

var _delete = require('./form/delete');

var _delete2 = _interopRequireDefault(_delete);

var _reactActioncableProvider = require('react-actioncable-provider');

var _reactBootstrap = require('react-bootstrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require("react");

/*
import * as CustomComponents from "../custom"
*/