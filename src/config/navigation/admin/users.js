const config = {
  route: "users",
  title: "Utilisateurs",
  description: "Accédez à la liste des utilisateurs",
  client: "UserClient",
  //icon: "users",
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
  }
}

export default config
