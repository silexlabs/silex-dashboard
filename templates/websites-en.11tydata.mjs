

export default async function (configData) {
  const data = {
    ...configData,
    lang: 'en',
  }
  const result = {}
  try {
  result['tina'] = (await (await fetch(`http://localhost:4001/graphql`, {

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
      footer_links {
        __typename
        title
        columns {
          __typename
          label
          url
          target

        }

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
      title
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
  })).json()).data
} catch (e) {
  console.error('11ty plugin for Silex: error fetching graphql data', e, 'tina', 'http://localhost:4001/graphql')
  throw e
}
  return result
}
  