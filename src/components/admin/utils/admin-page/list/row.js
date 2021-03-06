var React = require("react")

var moment = require("moment")

class AdminPageListRow extends React.Component {

  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
    this.handleSee = this.handleSee.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  render() {
    var row = [], attribute = undefined, name = undefined, style = undefined
		if (this.props.bulkable) {
			row.push(<div key={`${this.props.item.id}-bulk-chk`}><input checked={this.props.selected} type="checkbox" onChange={this._handleRowSelected} /></div>)
		}
    for (var attrIndex in this.props.attributes) {
      attribute = this.props.attributes[attrIndex]
      if (attribute instanceof Object) {
        if (attribute.hidden) continue
        name = attribute.name
      } else {
        name = attribute
      }
      if (this.props.attributes[attrIndex]) {
				style = {}
				if (attribute.style) style = Object.assign({}, attribute.style)
        row.push(<div key={"row-" + this.props.item.id + "-attr-" + attrIndex} className="admin-list-cell" style={style}>{this.buildDisplayValue(name, attribute)}</div>)
      }
    }
    row.push(this.buildActions(this.props.item))

    return <div className="admin-list-row">{row}</div>
  }

  buildDisplayValue(name, attribute) {
    var value = undefined;
		if (name) {
			if (name.indexOf(".") !== -1) {
				var splitted = name.split('.')
				value = this.props.item[splitted[0]]
				for (var i=1; i<splitted.length; i++) {
					if (value) {
						value = value[splitted[i]]
					} else {
						console.log("Subproperty error for '" + name + "' at '" + splitted[i])
						break
					}
				}
			} else {
				value = this.props.item[name]
			}
		} else {
			value = this.props.item
		}

   if (attribute instanceof Object) {
		 if (attribute.wrapper) {
			 value = attribute.wrapper(value, this.props.item)
		 }
     if (attribute.link) {
       var link = attribute.link.replace("[[VALUE]]", value)
       value = <a href={link} target="_blank">{value}</a>
     }
     if (attribute.type === "image") {
       value = <img src={value} style={{height: 50, width: 50, borderRadius: "100%"}} className="img-rounded" alt={value} />
     }
     if (attribute.type === "date") {
       value = moment(value).format('DD/MM/YYYY')
     }
     if (attribute.type === "datetime") {
       value = moment(value).format('DD/MM/YYYY HH:MM')
     }
     if (attribute.replaceWith && attribute.replaceWith[value] !== undefined) {
       value = attribute.replaceWith[value]
     }
     if (attribute.type === "color") {
       value = <div style={{width: 40, height: 20, background: value}} />
     }
   }

   return value
  }

  buildActions() {
    var actions = []
    if (!this.props.actions) {
      actions.push(<a key={"action-delete-" + this.props.item.id} href="#" onClick={this.handleDelete} className={"admin-action-button" + this.getIcon("trash", "trash")} alt="Supprimer" title="Supprimer"></a>)
      //actions.push(<a key={"action-see-" + this.props.item.id} href="#" onClick={this.handleSee} className={"admin-action-button " + this.getIcon("view", "eye")} alt="Afficher" title="Afficher"></a>)
      if (this.props.form) {
        actions.push(<a key={"action-edit-" + this.props.item.id} href="#" onClick={this.handleEdit} className={"admin-action-button" + this.getIcon("edit", "pencil")} alt="Modifier" title="Modifier"></a>)
      }
    } else {
      this.props.actions.filter(a => !a.type || a.type !== "general").map(action => {
				if (action instanceof Object) {
					if (this.acceptCustomAction(action)) {
						actions.push(<a href="#" key={"action-" + action.action + "-" + this.props.item.id} onClick={this.handleCustomAction.bind(this, action)} className={"admin-action-button " + this.getIcon(action.icon, "eye")} alt={action.label} title={action.label}>{action.icon ? "" : action.label}</a>)
					}
				} else {
					switch(action) {
						case "delete":
							actions.push(<a key={"action-delete-" + this.props.item.id} href="#" onClick={this.handleDelete} className={"admin-action-button" + this.getIcon("trash", "trash")} alt="Supprimer" title="Supprimer"></a>)
							break
						case "see":
							//actions.push(<a key={"action-see-" + this.props.item.id} href="#" onClick={this.handleSee} className={"admin-action-button" + this.getIcon("view", "eye")} alt="Afficher" title="Afficher"></a>)
							break
						case "edit":
							if (this.props.form) {
								actions.push(<a key={"action-edit-" + this.props.item.id} href="#" onClick={this.handleEdit} className={"admin-action-button" + this.getIcon("edit", "pencil")} alt="Modifier" title="Modifier"></a>)
							}
							break
						default:
							break
					}
				}
        return true
      })
    }

    return <div key={"actions-" + this.props.item.id} style={{textAlign: "right", whiteSpace: "nowrap"}}>{actions}</div>
  }

  getIcon(name, defVal) {
    //return " " + (this.props.config.iconSet || "fa fa-") + (this.props.config.icons && this.props.config.icons[name] ? this.props.config.icons[name] : defVal)
    return " " + (this.props.config.iconSet || "fa fa-") + name
  }

  acceptCustomAction(action) {
    var result = !action.displayIf
    if (!result) {
      if (action.displayIf.diff) {
        if (action.displayIf.values) {
          result = (action.displayIf.values.indexOf(this.props.item[action.displayIf.property].toString()) === -1)
        } else {
          result = ((!action.displayIf.value && this.props.item[action.displayIf.property]) || (action.displayIf.value && !this.props.item[action.displayIf.property]) || (this.props.item[action.displayIf.property] && this.props.item[action.displayIf.property].toString() !== action.displayIf.value.toString()))
        }
      } else {
        if (action.displayIf.values) {
          result = (action.displayIf.values.indexOf(this.props.item[action.displayIf.property]) !== -1)
        } else {
          result = (this.props.item[action.displayIf.property].toString() === action.displayIf.value.toString())
        }
      }
    }
    return result
  }

  handleDelete(e) {
    e.preventDefault()
    if (this.props.onDelete) this.props.onDelete(this.props.item.id)
  }

  handleSee(e) {
    e.preventDefault()
    if (this.props.onSee) this.props.onSee(this.props.item.id)
  }

  handleEdit(e) {
    e.preventDefault()
    if (this.props.onEdit) this.props.onEdit(this.props.item.id)
  }

  handleCustomAction(action, e) {
    e.preventDefault()
		if (action.onClick) {
			return action.onClick(this.props.item)
		}
    if (this.props.onCustomAction) this.props.onCustomAction(this.props.item.id, action)
  }

	_handleRowSelected = () => {
		this.props.onSelected(this.props.item)
	}

}

export default AdminPageListRow
