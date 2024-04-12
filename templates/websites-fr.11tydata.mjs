
import EleventyFetch from '@11ty/eleventy-fetch'
export default async function (configData) {
  const data = {
    ...configData,
    lang: 'fr',
  }
  const result = {}
  
  try {
    result['tina'] = (await EleventyFetch(`http://localhost:4001/graphql`, {
      ...{"duration":"1s","type":"json"},
      fetchOptions: {
        headers: {
          'Content-Type': `application/json`,
        },
        method: 'POST',
        body: JSON.stringify({
          query: `query {
  __typename
  settingsConnection {
    __typename
    edges {
      __typename
      node {
        __typename
        nav {
          __typename
          label
          url
          target

        }
        lang

      }

    }

  }
  homeConnection {
    __typename
    edges {
      __typename
      node {
        __typename
        title2
        subtitle
        title2_empty
        subtitle_empty
        add_title
        add_name_label
        add_name_placeholder
        add_ok
        add_cancel
        list_edit_icon
        list_edit
        list_rename_icon
        list_rename
        list_duplicate
        list_duplicate_icon
        list_delete
        text_empty1
        text_empty2
        add_button
        message_dismiss
        lang

      }

    }

  }
  languagesConnection {
    __typename
    edges {
      __typename
      node {
        __typename
        label
        permalink

      }

    }

  }

}`,
        })
      }
    })).data
  } catch (e) {
    console.error('11ty plugin for Silex: error fetching graphql data', e, 'tina', 'http://localhost:4001/graphql', 'Page name: Websites', 'Page id: mk3OKgfr4A9V7Dww')
    throw e
  }

  return result
}
  