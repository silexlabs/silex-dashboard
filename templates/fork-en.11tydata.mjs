

export default async function (configData) {
  const data = {
    ...configData,
    lang: 'en',
  }
  const result = {}
  try {
  const response = await fetch(`http://localhost:4001/graphql`, {

  headers: {
    'Content-Type': `application/json`,
  },
  method: 'POST',
  body: JSON.stringify({
    query: `query {
__typename
homeConnection {
  __typename
  edges {
    __typename
    node {
      __typename
      title
      title2
      subtitle
      message_dismiss
      lang

    }

  }

}
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
  })

  if (!response.ok) {
    throw new Error(`Error fetching graphql data: HTTP status code ${response.status}, HTTP status text: ${response.statusText}`)
  }

  const json = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL error: \
> ${json.errors.map(e => e.message).join('\
> ')}`)
  }

  result['tina'] = json.data
} catch (e) {
  console.error('11ty plugin for Silex: error fetching graphql data', e, 'tina', 'http://localhost:4001/graphql')
  throw e
}
  return result
}
  