

export default async function (configData) {
  const data = {
    ...configData,
    lang: 'fr',
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
connectorsConnection {
  __typename
  edges {
    __typename
    node {
      __typename
      subtitle
      help
      recommended
      advanced_users
      connectors {
        __typename
        background_color
        color
        auth_url
        description
        icon
        text

      }
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
  