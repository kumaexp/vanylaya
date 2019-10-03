"use strict";

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var data = {
  headerText: "hello hello ✨",
  pText: "I'm one (1) cute bot!",
  p2Text: "Made with React + Dialogflow",
  userMessages: [],
  botMessages: [],
  botGreeting: "oh hi! who are you?",
  botLoading: false
};

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "updateUserMessages", function (newMessage) {
      if (!newMessage) {
        return;
      }

      var updatedMessages = _this.state.userMessages;
      var updatedBotMessages = _this.state.botMessages;

      _this.setState({
        userMessages: updatedMessages.concat(newMessage),
        botLoading: true
      }); // Replace with your Dialogflow client token


      var request = new Request("https://api.dialogflow.com/v1/query?v=20150910&contexts=shop&lang=en&query=" + newMessage + "&sessionId=12345", {
        headers: new Headers({
          Authorization: "Bearer bc13467053ad45feaaa6f23c8bfafa9d"
        })
      });
      fetch(request).then(function (response) {
        return response.json();
      }).then(function (json) {
        var botResponse = json.result.fulfillment.speech;

        _this.setState({
          botMessages: updatedBotMessages.concat(botResponse),
          botLoading: false
        });
      }).catch(function (error) {
        console.log("ERROR:", error);

        _this.setState({
          botMessages: updatedBotMessages.concat('?'),
          botLoading: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "scrollBubble", function (element) {
      if (element != null) {
        element.scrollIntoView(true);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "showMessages", function () {
      var userMessages = _this.state.userMessages;
      var botMessages = _this.state.botMessages;
      var allMessages = [];
      var i = 0;

      for (; i < userMessages.length; i++) {
        if (i === userMessages.length - 1) {
          //if bot replied to last message
          if (botMessages[i]) {
            allMessages.push(React.createElement(UserBubble, {
              message: userMessages[i]
            }));
            allMessages.push(React.createElement(BotBubble, {
              message: botMessages[i],
              thisRef: _this.scrollBubble
            }));
          } else {
            allMessages.push(React.createElement(UserBubble, {
              message: userMessages[i],
              thisRef: _this.scrollBubble
            }));
          }

          break;
        }

        allMessages.push(React.createElement(UserBubble, {
          message: userMessages[i]
        }));
        allMessages.push(React.createElement(BotBubble, {
          message: botMessages[i]
        }));
      }

      allMessages.unshift(React.createElement(BotBubble, {
        message: _this.state.botGreeting,
        thisRef: i === 0 ? _this.scrollBubble : ""
      }));
      return React.createElement("div", {
        className: "msg-container"
      }, allMessages);
    });

    _defineProperty(_assertThisInitialized(_this), "onInput", function (event) {
      if (event.key === "Enter") {
        var userInput = event.target.value;

        _this.updateUserMessages(userInput);

        event.target.value = "";
      }

      if (event.target.value != "") {
        event.target.parentElement.style.background = 'rgba(69,58,148,0.6)';
      } else {
        event.target.parentElement.style.background = 'rgba(255, 255, 255, 0.6)';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClick", function () {
      var inp = document.getElementById("chat");
      var userInput = inp.value;

      _this.updateUserMessages(userInput);

      inp.value = "";
    });

    _this.state = data;
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "app-container"
      }, React.createElement(Header, {
        headerText: this.state.headerText,
        pText: this.state.pText,
        p2Text: this.state.p2Text
      }), React.createElement("div", {
        className: "chat-container"
      }, React.createElement(ChatHeader, null), this.showMessages(), React.createElement(UserInput, {
        onInput: this.onInput,
        onClick: this.onClick
      })));
    }
  }]);

  return App;
}(React.Component);

var UserBubble =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(UserBubble, _React$Component2);

  function UserBubble() {
    _classCallCheck(this, UserBubble);

    return _possibleConstructorReturn(this, _getPrototypeOf(UserBubble).apply(this, arguments));
  }

  _createClass(UserBubble, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "user-message-container",
        ref: this.props.thisRef
      }, React.createElement("div", {
        className: "chat-bubble user"
      }, this.props.message));
    }
  }]);

  return UserBubble;
}(React.Component);

var BotBubble =
/*#__PURE__*/
function (_React$Component3) {
  _inherits(BotBubble, _React$Component3);

  function BotBubble() {
    _classCallCheck(this, BotBubble);

    return _possibleConstructorReturn(this, _getPrototypeOf(BotBubble).apply(this, arguments));
  }

  _createClass(BotBubble, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "bot-message-container",
        ref: this.props.thisRef
      }, React.createElement("div", {
        className: "bot-avatar"
      }), React.createElement("div", {
        className: "chat-bubble bot"
      }, this.props.message));
    }
  }]);

  return BotBubble;
}(React.Component);

var Header = function Header(props) {
  return React.createElement("div", {
    className: "header"
  }, React.createElement("div", {
    className: "header-img"
  }), React.createElement("h1", null, " ", props.headerText, " "), React.createElement("h2", null, " ", props.pText, " "), React.createElement("p", null, " ", props.p2Text, " "));
};

var ChatHeader = function ChatHeader(props) {
  return React.createElement("div", {
    className: "chat-header"
  }, React.createElement("div", {
    className: "dot"
  }), React.createElement("div", {
    className: "dot"
  }), React.createElement("div", {
    className: "dot"
  }));
};

var UserInput = function UserInput(props) {
  return React.createElement("div", {
    className: "input-container"
  }, React.createElement("input", {
    id: "chat",
    type: "text",
    onKeyPress: props.onInput,
    placeholder: "type something"
  }), React.createElement("button", {
    className: "input-submit",
    onClick: props.onClick
  }));
};

ReactDOM.render(React.createElement(App, null), document.getElementById("app"));