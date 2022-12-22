import { useState, useEffect } from 'react'

export default ({ environment }) => {

  const [fetching, setFetching] = useState(false)
  const [response, setResponse] = useState(null)

  useEffect(() => {
    if (!response) request();
  }, [response])

  const request = async () => {
    
    setFetching(true)
    
    const endpoint_url = environment === `testnet` 
        ? `https://lcd-axelar-testnet.imperator.co/axelar/nexus/v1beta1/chains?status=1` 
        : `https://lcd-axelar.imperator.co/axelar/nexus/v1beta1/chains?status=1`;
    
    try {
      const response = await fetch(endpoint_url ).catch(error => { return null })
      setResponse(response && await response.json())
    } catch (error) {
      setResponse(null);
    }

    setFetching(false)

  }

  if (fetching) 
    return <div className="mx-1 mt-5 space-y-4">
        Fetching active chains...
    </div>

  return (
    <div className="mx-1 mt-5 space-y-1">
        {response && response.chains && response.chains.map(chain => <div>* {chain}</div>)}
    </div>
  )
}