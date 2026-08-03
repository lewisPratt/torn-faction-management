import { useState, useEffect } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import { ApiKeyContext } from './components/ApiKeyContext'
import Layout from './Layout'
import RankedWarReportView from './components/RankedWarReportView'

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('tornApiKey') || '')
  const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [inputValue, setInputValue] = useState<any>('');
  const [errorMsg, setErrorMsg] = useState<string>('')


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.torn.com/v2/user?selections=profile`, {
        headers: {
          'Authorization': `ApiKey ${apiKey}`,
          'accept': 'application/json'
        }
      })
      const data = await response.json()

      if (data.error) {
        setErrorMsg(data.error.error)
      }
      else {
        setUserData(data.profile)
      }
    }

    if (!apiKey) return
    fetchData()

  }, [apiKey])

  const handleSubmit = () => {
    if (inputValue) {
      setApiKey(inputValue)
      localStorage.setItem('tornApiKey', inputValue)
      setSubmitted(true)
    }

  }

  const handleClearKey = () => {
    setApiKey('')
    localStorage.removeItem('tornApiKey')
    setUserData(null)
    setSubmitted(false)
    setErrorMsg('')
  }

  if (!submitted && !apiKey) {
    return <ApiKeyForm
      inputValue={inputValue}
      setInputValue={setInputValue}
      handleSubmit={handleSubmit}
    />
  }

  return (
    <ApiKeyContext.Provider value={apiKey}>
      <Layout handleClearKey={handleClearKey} userData={userData}>

        <RankedWarReportView userData={userData} handleClearKey={handleClearKey} errorMsg={errorMsg}
        />
      </Layout>
    </ApiKeyContext.Provider>
  )
}



export default App