export default async function (configData) {
  const data = {
    ...configData,
    lang: 'pt',
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
      rgpd {
        __typename
        feedbackCheck
        nlCheck
      }
      advanced_users
      help
      lang
    }
  }
}
}`,
      }),
    })

    if (!response.ok) {
      throw new Error(
        `Erro ao buscar dados GraphQL: código HTTP ${response.status}, texto HTTP: ${response.statusText}`
      )
    }

    const json = await response.json()

    if (json.errors) {
      throw new Error(`Erro GraphQL: \
> ${json.errors.map(e => e.message).join('\
> ')}`)
    }

    result['tina'] = json.data
  } catch (e) {
    console.error(
      'Plugin 11ty do Silex: erro ao buscar dados GraphQL',
      e,
      'tina',
      'http://localhost:4001/graphql'
    )
    throw e
  }

  return result
}
