import { useState, useEffect } from 'react'

export default ({ environment }) => {

  const [fetching, setFetching] = useState(false)
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!response) request();
  }, [response])

  const request = async () => {
    
    setFetching(true)
    
    const endpoint_url = environment === `testnet` 
        ? `https://lcd-axelar-testnet.imperator.co/axelar/nexus/v1beta1/chains?status=1` 
        : `https://lcd-axelar.imperator.co/axelar/nexus/v1beta1/chains?status=1`;

    fetch(endpoint_url)
        .then(data => data.json())
        .then(chains => setResponse(chains))
        .catch(error => setError(true))
        .finally(() => setFetching(false))

  }

  if (fetching) 
    return <div className="mx-1 mt-5 space-y-4">
        Fetching active chains...
    </div>

  if (error) 
    return <div className="mx-1 mt-5 space-y-4">
        Error loading chains. Please refresh this page.
    </div>
    
  return (
    <div className="mx-1 mt-5 space-y-1">
        {response && response.chains && response.chains.map(chain => <div>* {chain}</div>)}
    </div>
  )
}