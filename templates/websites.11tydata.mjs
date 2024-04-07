
import EleventyFetch from '@11ty/eleventy-fetch'
export default async function (configData) {
  const data = {
    ...configData,
    lang: '',
  }
  const result = {}
  
  try {
    result['tina'] = (await EleventyFetch(`http://localhost:4001/graphql?page_id_for_cache=mk3OKgfr4A9V7Dww`, {
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
    totalCount

  }

}`,
        })
      }
    })).data
  } catch (e) {
    console.error('11ty plugin for Silex: error fetching graphql data', e, 'tina', 'http://localhost:4001/graphql?page_id_for_cache=mk3OKgfr4A9V7Dww', 'Page name: Websites', 'Page id: mk3OKgfr4A9V7Dww')
    throw e
  }

  return result
}
  