import React from "react"
import { connect } from 'react-redux';

import AdminPageList from './admin-page/list'
import AdminSidebar from './admin-page/sidebar'

import CreateEditForm from './form/create-edit'
import DeleteForm from './form/delete'

import {ActionCable} from 'react-actioncable-provider'

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import * as CustomComponents from "../custom"

export default function(config) {


  class AdminPage extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        currentId: undefined,
        mode: "list",
        currentAction: undefined,
      }

      this.handleCloseSidebar = this.handleCloseSidebar.bind(this)

      this.handleNew = this.handleNew.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleDeleted = this.handleDeleted.bind(this)
      this.handleSee = this.handleSee.bind(this)
      this.handleEdit = this.handleEdit.bind(this)
      this.handleCustomAction = this.handleCustomAction.bind(this)
      this.handleCustomActionFinished = this.handleCustomActionFinished.bind(this)

      this.handleSubmitComplete = this.handleSubmitComplete.bind(this)

      this.handleCableReceived = this.handleCableReceived.bind(this)
    }

    componentWillMount() {
      if (config.client) {
        if (config.client["fetchAll"]) {
          config.client["fetchAll"]()
        }
      }
    }

    render() {
      const pluralName = getPluralName()

      return (
        <Grid fluid>

          <Row>
            <Col xs={10}>
              <h1><i className={"pe pe-7s-" + (config.icon ? config.icon : "pin") + " text-warning"}></i> {config.title}</h1>
            </Col>
            {(config.list.actions.indexOf("new") !== -1)
             ? <Col xs={12} className="admin-new-button-row">
                <a href="#" onClick={this.handleNew} className="admin-new-button"><i className="pe pe-7s-plus" /> Nouveau</a>
              </Col>
             : null
            }
          </Row>
          {this.buildWatchers()}
          <div>
            <AdminPageList attributes={config.list.attributes} 
                           actions={config.list.actions}
                           items={this.props[pluralName]}
                           onDelete={this.handleDelete}
                           onSee={this.handleSee}
                           onEdit={this.handleEdit}
                           onCustomAction={this.handleCustomAction}
            />

            <AdminSidebar ref="sidebar" 
                          onClose={this.handleCloseSidebar}
                          tinify={this.state.mode === "delete" || (this.state.currentAction && this.state.currentAction.tinify)}
                          title={this.getSidebarTitle()}>
              {this.getSidebarContent()}
            </AdminSidebar>
          </div>
        </Grid>
      )
    }

    buildWatchers() {
      var watchers = []
      if (config.watcher) {
        if (this.props[getPluralName()]) {
          this.props[getPluralName()].map(entity => {
            if (config.watcher.if) {
              if (entity[config.watcher.if.property] === config.watcher.if.value) {
                watchers.push(<ActionCable channel={{channel: config.watcher.channel, session: entity.id}} onReceived={this.handleCableReceived} />)
              }
            } else {
             watchers.push(<ActionCable channel={{channel: config.watcher, session: entity.id}} onReceived={this.handleCableReceived} />)
            }
          })
        }
      }
      return watchers
    }

    getSidebarTitle() {
      var title = "";
      switch(this.state.mode) {
        case "list":
          break
        case "create":
          title = "Créer " + config.delete.labels.entity
        case "edit":
          title = "Modifier " + config.delete.labels.entity
          break
        case "delete":
          title = "Supprimer " + config.delete.labels.entity
          break
        default:
          if (this.state.currentAction !== undefined) {
            title = this.state.currentAction.label
          }
          break
      }
      return title;

    }

    getSidebarContent() {
      var content = null
      
      var entity = null
      if (this.state.currentId !== undefined) {
        entity = this.props[getPluralName()].filter(item => { return item.id === this.state.currentId })[0]
      }

      switch(this.state.mode) {
        case "list":
          break
        case "create":
        case "edit":
          content = <CreateEditForm {...config} entity={entity} mode={this.state.mode} onSubmitComplete={this.handleSubmitComplete} />
          break
        case "delete":
          content = <DeleteForm {...config} entity={entity} onDeleted={this.handleDeleted} />
          break
        default:
          if (this.state.currentAction !== undefined) {
            if (CustomComponents[config.client.name] && CustomComponents[config.client.name][this.state.currentAction.component]) {
              var Component = CustomComponents[config.client.name][this.state.currentAction.component]
              content = <Component {...config} entity={entity} action={this.state.currentAction.action} onFinished={this.handleCustomActionFinished} />
            }
          }
          break
      }
      return content
    }

    openSidebar() {
      this.refs.sidebar.open()
    }

    closeSidebar() {
      this.refs.sidebar.close()
    }

    handleCableReceived(data) {
      config.client.pushInState(data[config.client.name])
    }

    handleNew(e) {
      e.preventDefault()
      this.setState({currentId: undefined, mode: "create"}, this.openSidebar)
    }

    handleDelete(id) {
      this.setState({currentId: id, mode: "delete"}, this.openSidebar)
    }

    handleDeleted() {
      this.closeSidebar()
    }

    handleSee(id) {
      this.setState({currentId: id, mode: "see"})
    }

    handleEdit(id) {
      this.setState({currentId: id, mode: "edit"}, this.openSidebar)
    }

    handleCustomAction(id, action) {
      this.setState({currentId: id, mode: action.action, currentAction: action}, this.openSidebar)
    }

    handleCustomActionFinished() {
      this.closeSidebar()
    }

    handleSubmitComplete(data) {
      if (!data.error) {
        this.refs.sidebar.close()
      }
    }

    handleCloseSidebar() {
      var self = this
      setTimeout(function() { self.setState({currentId: undefined, mode: "list", currentAction: undefined}) }, 500)
    }

  }

  function getPluralName() {
    return (config.client.plural ? config.client.plural : (config.client.name + "s"))
  }

  function mapStateToProps(state) {
    var pluralName = getPluralName()

    var props = {}
    props[pluralName] = state[config.client.name + "State"][pluralName] || []
    return props
  }

  return connect(mapStateToProps)(AdminPage)
}
