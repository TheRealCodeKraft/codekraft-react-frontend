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

var _reactBootstrap = require('react-bootstrap');

var _qrScanner = require('components/utils/qr-scanner');

var _qrScanner2 = _interopRequireDefault(_qrScanner);

var _cluesList = require('./clues-selector/clues-list');

var _cluesList2 = _interopRequireDefault(_cluesList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CluesSelector = function (_React$Component) {
  _inherits(CluesSelector, _React$Component);

  function CluesSelector(props) {
    _classCallCheck(this, CluesSelector);

    var _this = _possibleConstructorReturn(this, (CluesSelector.__proto__ || Object.getPrototypeOf(CluesSelector)).call(this, props));

    _this.state = {
      checking: false,
      error: false,
      value: "",
      show_last: false,
      last: null
    };

    _this.handleQrScan = _this.handleQrScan.bind(_this);
    _this.checkReturn = _this.checkReturn.bind(_this);

    _this.hideLast = _this.hideLast.bind(_this);
    return _this;
  }

  _createClass(CluesSelector, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_qrScanner2.default, {
          title: 'Flash ici tes cartes business-battle (cartes indices et carte d\xE9cideur)',
          description: 'Tu recoltes les cartes indices au cours du jeu de plateau. La carte d\xE9cideur est celle que tu obtiens \xE0 la fin du jeu de plateau.',
          error: this.state.error,
          errorMessage: this.state.errorMessage,
          onScan: this.handleQrScan,
          searching: this.state.checking
        }),
        this.showLast(),
        _react2.default.createElement('hr', null),
        _react2.default.createElement(
          'div',
          { style: { border: "1px solid #949ba2", padding: 20 } },
          _react2.default.createElement(
            'h5',
            null,
            '[TEMPORAIRE] Codes dispos'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'FINANCIERS'
            ),
            ' F1BAJL | A2RAZ | E3FAG | R4EAB | J5MAP | P6TAO | Z7YAU | A8AAT | E9PAP'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'TECHNIQUES'
            ),
            ' ZAE1E | M1S1P | P2F1S | J3Z1P | U4M1K | Y5T1N | S6E1Q | C7H1D | R8J1J'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'DECISIONS'
            ),
            ' C9Q1S | QAD2X | J1X2F | X2S2W | P3E2V | X4M2L | C5G2N | S6Y2U'
          ),
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'strong',
              null,
              'DECIDEURS'
            ),
            ' U9C3S MAS4R C1J4A F2N4D'
          )
        ),
        _react2.default.createElement(
          'h2',
          null,
          _react2.default.createElement('i', { className: 'pe pe-7s-search text-warning' }),
          ' Indices collect\xE9s'
        ),
        _react2.default.createElement(_cluesList2.default, { clues: this.currentUserState().clues })
      );
    }
  }, {
    key: 'showLast',
    value: function showLast() {
      if (this.state.show_last) {
        return _react2.default.createElement(
          'div',
          { className: 'alert alert-success' },
          _react2.default.createElement(
            'h4',
            null,
            'Nouvel indice r\xE9colt\xE9'
          ),
          this.state.last.map(function (item) {
            return _react2.default.createElement(
              'p',
              null,
              item.description
            );
          }),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.hideLast, bsStyle: 'info' },
              'Fermer'
            )
          )
        );
      }
    }
  }, {
    key: 'currentUserState',
    value: function currentUserState() {
      return this.getUserState(this.props.me);
    }
  }, {
    key: 'getUserState',
    value: function getUserState(user) {
      return this.props.session.current_round.userStates.filter(function (state) {
        return state.user === user.id;
      })[0];
    }
  }, {
    key: 'handleQrScan',
    value: function handleQrScan(data) {
      this.setState({ checking: true, value: data }, function () {
        _session2.default.checkCode(this.props.session.id, data, this.checkReturn);
      });
    }
  }, {
    key: 'checkReturn',
    value: function checkReturn(data) {
      if (data.result === "success") {
        _session2.default.pushInState(data.session);
        this.setState({ error: false, checking: false, show_last: true, last: data.item });
      } else {
        var message = "Veuillez utiliser une carte INDICE";
        if (data.message.indexOf("already use") > 0) {
          message = "Tricheur ? Cette carte a déjà été utilisée ...";
        }
        this.setState({ error: true, errorMessage: message, checking: false });
      }
    }
  }, {
    key: 'hideLast',
    value: function hideLast() {
      this.setState({ show_last: false, last: null });
    }
  }]);

  return CluesSelector;
}(_react2.default.Component);

function mapStateToProps(state) {
  return {
    me: state.userState.me || null
  };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps)(CluesSelector);