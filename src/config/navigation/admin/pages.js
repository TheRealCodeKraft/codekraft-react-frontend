const config = {
  route: "pages",
  title: "Contenus",
  description: "Accédez à la liste des pages de contenu",
  client: "PageClient",
  icon: "pages",
  list: {
    attributes: [
      {
        name: "id",
        hidden: true
      },
      {
        name: "title",
        label: "Titre"
      }
    ]
  },
  form: {
    attributes: [
      {
        name: "title",
        label: "Titre",
        placeholder: "Titre de la page",
        type: "text",
        required: true
      },
      {
        name: "body",
        label: "Contenu",
        placeholder: "Corps du contenu",
        type: "textarea"
      }
    ]
  },
  delete: {
    labels: {
      entity: "la page",
      identifier: "title"
    }
  }
} 

export default config
