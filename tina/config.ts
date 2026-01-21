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
    publicFolder: "templates/assets",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "templates/assets",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "home",
        label: "Home",
        path: "collections/home",
        fields: [
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
            label: 'Add From Template Button',
            name: 'add_from_template',
            type: 'string'
          },
          {
            label: 'Add From Template Link',
            name: 'add_from_template_link',
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
        name: "connectors",
        label: "Connectors",
        path: "collections/connectors",
        fields: [
          {
            label: 'Language',
            name: 'lang',
            type: 'string',
          },
          {
            label: 'Title',
            name: 'title',
            type: 'string',
          },
          {
            label: 'Title 2',
            name: 'title2',
            type: 'string',
          },
          {
            label: 'Subtitle',
            name: 'subtitle',
            type: 'string',
          },
          {
            label: 'Recommended',
            name: 'recommended',
            type: 'string',
          },
          {
            label: 'Advanced users',
            name: 'advanced_users',
            type: 'string',
          },
          {
            label: 'RGPD',
            name: 'rgpd',
            type: 'object',
            list: false,
            fields: [
              { label: 'Label feedback', name: 'feedbackCheck', type: 'string' },
              { label: 'Label newsletter', name: 'nlCheck', type: 'string' },
            ],
          },
          {
            label: 'Help',
            name: 'help',
            type: 'string',
          },
          {
            label: 'Connectors',
            name: 'connectors',
            type: 'object',
            list: true,
            fields: [
              { label: 'Name', name: 'name', type: 'string' },
              { label: 'Text', name: 'text', type: 'string' },
              { label: 'Auth URL', name: 'auth_url', type: 'string' },
              { label: 'Description', name: 'description', type: 'string' },
              { label: 'Features', name: 'features', type: 'object', list: true, fields: [{ label: 'name', name: 'name', type: 'string' }, { label: 'description', name: 'description', type: 'string' }] },
              { label: 'Icon', name: 'icon', type: 'string' },
              { label: 'Color', name: 'color', type: 'string' },
              { label: 'Background Color', name: 'background_color', type: 'string' },
            ],
          },
        ],
      }, {
        name: "fork",
        label: "Fork",
        path: "collections/fork",
        fields: [
          {
            label: 'Language',
            name: 'lang',
            type: 'string',
          },
          {
            label: 'Title',
            name: 'title',
            type: 'string',
          },
          {
            label: 'Hero Title',
            name: 'hero_title',
            type: 'string',
          },
          {
            label: 'Hero Subtitle',
            name: 'hero_subtitle',
            type: 'string',
          },
          {
            label: 'Loading Title',
            name: 'loading_title',
            type: 'string',
          },
          {
            label: 'Loading Message',
            name: 'loading_message',
            type: 'string',
          },
          {
            label: 'Success Title',
            name: 'success_title',
            type: 'string',
          },
          {
            label: 'Success Message',
            name: 'success_message',
            type: 'string',
          },
          {
            label: 'Error Title',
            name: 'error_title',
            type: 'string',
          },
          {
            label: 'Error Message',
            name: 'error_message',
            type: 'string',
          },
          {
            label: 'Back Button',
            name: 'back_button',
            type: 'string',
          },
          {
            label: 'Footer Text',
            name: 'footer_text',
            type: 'string',
          },
          {
            label: 'Footer Link',
            name: 'footer_link',
            type: 'string',
          },
          {
            label: 'Footer Link Text',
            name: 'footer_link_text',
            type: 'string',
          },
        ],
      }, {
        label: 'Languages',
        name: 'languages',
        path: 'collections/languages',
        format: 'json',
        fields: [
          { label: 'Code', name: 'code', type: 'string' },
          { label: 'Label', name: 'label', type: 'string' },
          { label: 'permalink', name: 'permalink', type: 'string' }
        ]
      }, {
        label: 'Settings',
        name: 'settings',
        path: 'collections/settings',
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
              { label: 'Target', name: 'target', type: 'string' },
            ]
          },
          {
            label: 'Footer links',
            name: 'footer_links',
            type: 'object',
            list: true,
            fields: [
              { label: 'Title', name: 'title', type: 'string' },
              { label: 'Columns', name: 'columns', type: 'object', list: true, fields: [
                { label: 'Label', name: 'label', type: 'string' },
                { label: 'URL', name: 'url', type: 'string' },
                { label: 'Target', name: 'target', type: 'string' }
              ]}
            ]
          },
        ]
      }
    ],
  },
});
