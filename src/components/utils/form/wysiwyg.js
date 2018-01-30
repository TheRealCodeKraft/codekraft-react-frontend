import React from "react"

import Editor from "draft-js-plugins-editor"
import {Draft, EditorState, ContentState, RichUtils, convertFromRaw} from 'draft-js';

import createToolbarPlugin, { Separator } from 'draft-js-static-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  HeadlineOneButton,
  HeadlineTwoButton,
  HeadlineThreeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from 'draft-js-buttons'

const editorStyles = {
  editor: {
    boxSizing: "border-box",
    border: "1px solid #ddd",
    cursor: "text",
    padding: "16px",
    borderRadius: "2px",
    marginBottom: "2em",
    boxShadow: "inset 0px 1px 8px -3px #ABABAB",
    background: "#fefefe",
    minHeight: "140px",
  },

  headlineButtonWrapper: {
    display: "inline-block",
  },

  headlineButton: {
    background: "#fbfbfb",
    color: "#888",
    fontSize: "18px",
    border: "0",
    paddingTop: "5px",
    verticalAlign: "bottom",
    height: "34px",
    width: "36px",
  },

  /*
  .headlineButton:hover,
  .headlineButton:focus {
    background: #f3f3f3;
  }
  */
}

class HeadlinesPicker extends React.Component {
  componentDidMount() {
    setTimeout(() => { window.addEventListener('click', this.onWindowClick); });
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onWindowClick);
  }

  onWindowClick = () =>
    // Call `onOverrideContent` again with `undefined`
    // so the toolbar can show its regular content again.
    this.props.onOverrideContent(undefined);

  render() {
    const buttons = [HeadlineOneButton, HeadlineTwoButton, HeadlineThreeButton];
    return (
      <div>
        {buttons.map((Button, i) => // eslint-disable-next-line
          <Button key={i} {...this.props} />
        )}
      </div>
    );
  }
}

class HeadlinesButton extends React.Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div style={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} style={editorStyles.headlineButton}>
          H
        </button>
      </div>
    );
  }
}

const toolbarPlugin = createToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    HeadlinesButton,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton
  ]
});
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

class Wysiwyg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      raw: "",
      editorState: EditorState.createEmpty()
    }
  }

  componentWillReceiveProps(props) {
    if (props.value && (!this.state.raw || props.value == "RESET")) {
      this.setState({
        raw: props.value,
        editorState: (props.value == "RESET") ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
      })
    }
  }

  render() {
    return (
      <div>
        <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} plugins={plugins} />
        {(!this.props.toolbar || this.props.toolbar === false) ? null : <Toolbar />}
      </div>
    );
  }

  onChange(editorState) {
    this.setState({editorState}, function() {
      if (this.props.onChange) this.props.onChange(editorState.getCurrentContent())
    })
  }

}

export default Wysiwyg
