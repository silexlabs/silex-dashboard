import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,
  build: {
    outputFolder: "admin",
    publicFolder: "_published/assets",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "_published/assets",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "home",
        label: "Home",
        path: "pages/home",
        fields: [
          {
            label: 'Layout',
            name: 'layout',
            type: 'string'
          },
          {
            label: 'Language',
            name: 'lang',
            type: 'string'
          },
          {
            label: 'Title',
            name: 'title',
            type: 'string'
          },
          {
            label: 'Title 2',
            name: 'title2',
            type: 'string'
          },
          {
            label: 'Subtitle',
            name: 'subtitle',
            type: 'string'
          },
          {
            label: 'Title 2 (Empty)',
            name: 'title2_empty',
            type: 'string'
          },
          {
            label: 'Subtitle (Empty)',
            name: 'subtitle_empty',
            type: 'string'
          },
          {
            label: 'Text (Empty 1)',
            name: 'text_empty1',
            type: 'string'
          },
          {
            label: 'Text (Empty 2)',
            name: 'text_empty2',
            type: 'string'
          },
          {
            label: 'Add Button',
            name: 'add_button',
            type: 'string'
          },
          {
            label: 'Add Title',
            name: 'add_title',
            type: 'string'
          },
          {
            label: 'Add Name Label',
            name: 'add_name_label',
            type: 'string'
          },
          {
            label: 'Add Name Placeholder',
            name: 'add_name_placeholder',
            type: 'string'
          },
          {
            label: 'Add OK',
            name: 'add_ok',
            type: 'string'
          },
          {
            label: 'Add Cancel',
            name: 'add_cancel',
            type: 'string'
          },
          {
            label: 'List Item Updated',
            name: 'list_item_updated',
            type: 'string'
          },
          {
            label: 'List Item Created',
            name: 'list_item_created',
            type: 'string'
          },
          {
            label: 'List Edit',
            name: 'list_edit',
            type: 'string'
          },
          {
            label: 'List Edit Icon',
            name: 'list_edit_icon',
            type: 'string'
          },
          {
            label: 'List Rename',
            name: 'list_rename',
            type: 'string'
          },
          {
            label: 'List Rename Icon',
            name: 'list_rename_icon',
            type: 'string'
          },
          {
            label: 'List Duplicate',
            name: 'list_duplicate',
            type: 'string'
          },
          {
            label: 'List Duplicate Icon',
            name: 'list_duplicate_icon',
            type: 'string'
          },
          {
            label: 'List Delete',
            name: 'list_delete',
            type: 'string'
          },
          {
            label: 'Message Dismiss',
            name: 'message_dismiss',
            type: 'string'
          }
        ],
      }, {
        label: 'Settings',
        name: 'settings',
        path: '_data/settings',
        format: 'json',
        fields: [
          {
            label: 'Language',
            name: 'lang',
            type: 'string',
          },
          {
            label: 'Navigation Links',
            name: 'nav',
            type: 'object',
            list: true,
            fields: [
              { label: 'Label', name: 'label', type: 'string' },
              { label: 'URL', name: 'url', type: 'string' },
              { label: 'Target', name: 'target', type: 'string' }
            ]
          },
          {
            label: 'Footer Section 1 Links',
            name: 'footer1',
            type: 'object',
            list: true,
            fields: [
              { label: 'Label', name: 'label', type: 'string' },
              { label: 'URL', name: 'url', type: 'string' },
              { label: 'Target', name: 'target', type: 'string' }
            ]
          },
          {
            label: 'Footer Section 2 Links',
            name: 'footer2',
            type: 'object',
            list: true,
            fields: [
              { label: 'Label', name: 'label', type: 'string' },
              { label: 'URL', name: 'url', type: 'string' },
              { label: 'Target', name: 'target', type: 'string' }
            ]
          }
        ]
      }
    ],
  },
});
