const config = {
  route: "users",
  title: "Utilisateurs",
  description: "Accédez à la liste des utilisateurs",
  client: "UserClient",
  icon: "users",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        label: "Nom",
        name: "lastname"
      },
      {
        label: "Prénom",
        name: "firstname"
      },
      {
        label: "Email",
        name: "email"
      }
    ],
/*
    actions: [
      "see"
    ]
*/
  },
  form: {
    attributes: [
      {
        name: "firstname",
        label: "Prénom",
        placeholder: "Prénom",
        type: "text",
        required: true
      },
      {
        name: "lastname",
        label: "Npm",
        placeholder: "Nom",
        type: "text",
        required: true
      },
      {
        name: "email",
        label: "Email",
        placeholder: "Email",
        type: "email",
        required: true
      },
    ]
  },
  delete: {
    labels: {
      entity: "l'utilisateur",
      identifier: "lastname"
    }
  }
}

export default config
