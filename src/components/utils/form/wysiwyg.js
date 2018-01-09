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
} from 'draft-js-buttons';

class HeadlinesPicker extends Component {
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

class HeadlinesButton extends Component {
  onClick = () =>
    // A button can call `onOverrideContent` to replace the content
    // of the toolbar. This can be useful for displaying sub
    // menus or requesting additional information from the user.
    this.props.onOverrideContent(HeadlinesPicker);

  render() {
    return (
      <div className={editorStyles.headlineButtonWrapper}>
        <button onClick={this.onClick} className={editorStyles.headlineButton}>
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
    if (props.value && !this.state.raw) {
      this.setState({
        raw: props.value,
        editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(props.value)))
      })
    }
  }

  render() {
    return (
      <div>
        <div className="editor-actions">
          <a onClick={this._onBoldClick.bind(this)}><i className="fa fa-bold" /></a>
          <a onClick={this._onItalicClick.bind(this)}><i className="fa fa-italic" /></a>
          <a onClick={this._onH1Click.bind(this)}>H1</a>
          <a onClick={this._onH2Click.bind(this)}>H2</a>
          <a onClick={this._onH3Click.bind(this)}>H3</a>
          <a onClick={this._onH4Click.bind(this)}>H4</a>
          <a onClick={this._onH5Click.bind(this)}>H5</a>
          <a onClick={this._onH6Click.bind(this)}>H6</a>
          <a onClick={this._onUlClick.bind(this)}><i className="fa fa-list" /></a>
          <a onClick={this._onOlClick.bind(this)}><i className="fa fa-list-ol" /></a>
        </div>
        <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} plugins={plugins} />
      </div>
    );
  }

  onChange(editorState) {
    this.setState({editorState}, function() {
      if (this.props.onChange) this.props.onChange(editorState.getCurrentContent())
    })
  }

  _changeStyle(type) {
    this.onChange(RichUtils.toggleInlineStyle(
      this.state.editorState,
      type
    ))
  }

  _onBoldClick(e) {
    e.preventDefault()
    this._changeStyle('BOLD')
  }

  _onItalicClick(e) {
    e.preventDefault()
    this._changeStyle('ITALIC')
  }

  _onH1Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-one'
    ))
  }

  _onH2Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-two'
    ))
  }

  _onH3Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-three'
    ))
  }

  _onH4Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-four'
    ))
  }

  _onH5Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-five'
    ))
  }

  _onH6Click(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'header-six'
    ))
  }

  _onUlClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'unordered-list-item'
    ))
  }

  _onOlClick(e) {
    e.preventDefault()
    this.onChange(RichUtils.toggleBlockType(
      this.state.editorState,
      'ordered-list-item'
    ))
  }

}

export default Wysiwyg
