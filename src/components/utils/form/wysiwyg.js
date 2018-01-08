import React from "react"

import {Draft, Editor, EditorState, ContentState, RichUtils, convertFromRaw} from 'draft-js';

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
        <Editor editorState={this.state.editorState} onChange={this.onChange.bind(this)} />
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
