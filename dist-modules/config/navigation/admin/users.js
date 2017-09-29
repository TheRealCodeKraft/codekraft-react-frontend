"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {
  route: "users",
  title: "Utilisateurs",
  description: "Accédez à la liste des utilisateurs",
  client: "UserClient",
  icon: "users",
  list: {
    attributes: [{
      name: "id",
      hidden: true
    }, {
      label: "Nom",
      name: "lastname"
    }, {
      label: "Prénom",
      name: "firstname"
    }, {
      label: "Email",
      name: "email"
    }]
    /*
        actions: [
          "see"
        ]
    */
  },
  form: {
    attributes: [{
      name: "firstname",
      label: "Prénom",
      placeholder: "Prénom",
      type: "text",
      required: true
    }, {
      name: "lastname",
      label: "Npm",
      placeholder: "Nom",
      type: "text",
      required: true
    }, {
      name: "email",
      label: "Email",
      placeholder: "Email",
      type: "email",
      required: true
    }, {
      name: "role",
      label: "Role",
      type: "select",
      placeholder: false,
      values: [{ id: "standard", title: "Standard" }, { id: "admin", title: "Administrateur" }],
      key: "id",
      value: "title",
      required: true,
      defaultValue: "admin"
    }]
  },
  delete: {
    labels: {
      entity: "l'utilisateur",
      identifier: "lastname"
    }
  }
};

exports.default = config;