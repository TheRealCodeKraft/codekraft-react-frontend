var React = require("react")
import { withRouter } from 'react-router'
import { connect } from 'react-redux';

import AdminPageList from './admin-page/list'
import AdminSidebar from './admin-page/sidebar'

import CreateEditForm from './form/create-edit'
import DeleteForm from './form/delete'

import {ActionCable} from 'react-actioncable-provider'

import { Grid } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import Loader from "react-loaders"

export default function(config, globalConfig) {


  class AdminPage extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
				loading: true,
        currentId: undefined,
        mode: "list",
        currentAction: undefined,
				current_page: 1,
				per_page: 10,
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
					var self=this
          config.client["fetchAll"](config.pagination ? {page: this.state.current_page, per_page: config.pagination.per_page ? config.pagination.per_page : 10} : {}, () => { self.setState({loading: false})})
        }
      }
    }

    render() {
      const pluralName = getPluralName()

      return (
        <Grid fluid className="admin-page container">

          {globalConfig.subHeader
            ? <globalConfig.subHeader {...globalConfig}  config={config} globalConfig={globalConfig} location={this.props.location} onNew={this.handleNew} />
           :   <div className="admin-page-header">
                 <h1><i className={(globalConfig.iconSet ? globalConfig.iconSet : "fa fa-") + (config.icon ? config.icon : "terminal") + " text-warning"}></i> {config.title}</h1>
               {(!config.list.actions || config.list.actions.indexOf("new") !== -1)
                ? <Col xs={12} className="admin-new-button-row">
                   <a href="#" onClick={this.handleNew} className="admin-new-button"><i className={this.getIcon("new", "plus")} /> Nouveau</a>
                 </Col>
                : null
               }
               </div>}
          {this.buildWatchers()}
          <div>
            <AdminPageList attributes={config.list.attributes} 
                           actions={config.list.actions}
                           form={config.form}
                           items={(config.pagination && this.props[pluralName]["pagination"]) ? this.props[pluralName].list : this.props[pluralName]}
                           onDelete={this.handleDelete}
                           onSee={this.handleSee}
                           onEdit={this.handleEdit}
                           onCustomAction={this.handleCustomAction}
                           config={globalConfig}
													 current_page={this.state.current_page}
            />

						{ config.pagination
							? <div className="pagination-buttons">
									{ this.state.loading
										? <Loader type="ball-rotate" />
										: null
									}
									{ !this.state.loading && this.props[pluralName].pagination.previous !== ""
										? <a className="paginate-previous-btn" href="javascript:void" onClick={this.handlePreviousPage.bind(this)}>{"<<"}</a>
										: null
									}
									{ !this.state.loading && [...Array(parseInt(this.props[pluralName].pagination.totalPages))].map((_, i) => (
											<a href="javascript:void(0)" onClick={this.handleChangePage.bind(this, i + 1)} className={"page-btn" + (((i + 1) == this.state.current_page) ? " active" : "")}>{i + 1}</a>
										))
									}
									{ !this.state.loading && this.props[pluralName].pagination.next !== ""
										? <a className="paginate-next-btn" href="javascript:void" onClick={this.handleNextPage.bind(this)}>{">>"}</a>
										: null
									}
								</div>
							: null
						}
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

    getIcon(name, defVal) {
      return " " + (globalConfig.iconSet || "fa fa-") + (globalConfig.icons && globalConfig.icons[name] ? globalConfig.icons[name] : defVal)
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
          title = "Créer" + (config.delete ? " " + config.delete.labels.entity : "")
        case "edit":
          title = "Modifier" + (config.delete ? " " + config.delete.labels.entity : "")
          break
        case "delete":
          title = "Supprimer" + (config.delete ? " " + config.delete.labels.entity : "")
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
        entity = (config.pagination ? this.props[getPluralName()].list : this.props[getPluralName()]).filter(item => { return item.id === this.state.currentId })[0]
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
            if (this.state.currentAction.component) {
              var Component = this.state.currentAction.component
              content = <Component {...config} entity={entity} action={this.state.currentAction.action} onFinished={this.handleCustomActionFinished} />
            }
          }
          break
      }
      return content
    }

		handleChangePage(i, e) {
			if (e) e.preventDefault()
				if (this.state.current_page !== i) {
				this.setState({current_page: i, loading: true}, () => {
						config.client["fetchAll"]({page: this.state.current_page, per_page: config.pagination.per_page ? config.pagination.per_page : 10}, () => {
							this.setState({loading: false})
						})
				})
			}
		}

		handlePreviousPage(e) {
			if (this.state.current_page > 1) {
				this.handleChangePage(this.state.current_page - 1, e)
			}
		}

		handleNextPage(e) {
			e.preventDefault()
			this.handleChangePage(this.state.current_page + 1, e)
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
      if (e) e.preventDefault()
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

  return withRouter(connect(mapStateToProps)(AdminPage))
}
