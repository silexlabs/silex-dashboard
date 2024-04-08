
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
  