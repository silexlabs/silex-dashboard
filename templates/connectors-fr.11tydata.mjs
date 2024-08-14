

export default async function (configData) {
  const data = {
    ...configData,
    lang: 'fr',
  }
  const result = {}
  try {
  result['tina'] = (await (await fetch(`http://localhost:4001/graphql`, {

  headers: {
    'content-type': `application/json`,
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
connectorsConnection {
  __typename
  edges {
    __typename
    node {
      __typename
      subtitle
      recommended
      advanced_users
      help
      lang

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
  