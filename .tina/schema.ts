import { defineSchema } from 'tina-graphql-gateway-cli'

export default defineSchema({
  collections: [
    {
      label: 'Pages',
      name: 'page',
      /*
       * Indicates where to save this kind of content (eg. the "_posts" folder)
       */
      path: 'pages',
      templates: [
        {
          label: 'Dashboard',
          name: 'dashboard',
          "fields": [
            {
              "type": "text",
              "label": "Title",
              "name": "title"
            },
            {
              "type": "text",
              "label": "Subtitle",
              "name": "subtitle"
            },
            {
              "type": "text",
              "label": "Subtitle (Empty)",
              "name": "subtitleEmpty"
            },
            {
              "type": "text",
              "label": "Text (Empty 1)",
              "name": "textEmpty1"
            },
            {
              "type": "text",
              "label": "Text (Empty 2)",
              "name": "textEmpty2"
            },
            {
              "type": "text",
              "label": "Add Button",
              "name": "addButton"
            },
            {
              "type": "text",
              "label": "Add Title",
              "name": "addTitle"
            },
            {
              "type": "text",
              "label": "Add Name Label",
              "name": "addNameLabel"
            },
            {
              "type": "text",
              "label": "Add Name Placeholder",
              "name": "addNamePlaceholder"
            },
            {
              "type": "text",
              "label": "Add OK",
              "name": "addOK"
            },
            {
              "type": "text",
              "label": "Add Cancel",
              "name": "addCancel"
            },
            {
              "type": "text",
              "label": "List Item Updated",
              "name": "listItemUpdated"
            },
            {
              "type": "text",
              "label": "List Item Created",
              "name": "listItemCreated"
            },
            {
              "type": "text",
              "label": "List Edit",
              "name": "listEdit"
            },
            {
              "type": "text",
              "label": "List Rename",
              "name": "listRename"
            },
            {
              "type": "text",
              "label": "List Duplicate",
              "name": "listDuplicate"
            },
            {
              "type": "text",
              "label": "List Delete",
              "name": "listDelete"
            },
            {
              "type": "text",
              "label": "Message Dismiss",
              "name": "messageDismiss"
            }
          ]

        },
      ],
    },
  ],
})