import { useState, useEffect, createContext } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import CustomGreeting from './components/CustomGreeting'
import ClearKeyButton from './components/ClearKeyButton'
import FactionInfoCard from './components/FactionInfoCard'
import Layout from './Layout'
import RankedWarSelector from './components/RankedWarSelector'
import type { TornUserData, firstViewProps } from './interfaces'


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
        console.log(data.profile)
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
    <Layout handleClearKey={handleClearKey}>
      <FirstView
        userData={userData}
        handleClearKey={handleClearKey}
        errorMsg={errorMsg}
        apiKey={apiKey}
      />
    </Layout>
  )
}

function FirstView({ userData, handleClearKey, errorMsg, apiKey }: firstViewProps) {
  return (
    <div>

      {userData ? (
        <>
          <div>
            <CustomGreeting uData={userData} />
          </div>
          <section id="main-content">
            <FactionInfoCard uData={userData} apiKey={apiKey} />
            <RankedWarSelector apiKey={apiKey} faction_id={userData.faction_id} />
          </section>
        </>

      ) : (
        <div>
          {errorMsg ? (
            <p>{errorMsg}</p>
          ) : (
            <p>Loading..</p>
          )}

          <p></p>
          <ClearKeyButton handleClearKey={handleClearKey} />

        </div>
      )}
    </div>
  )
}

export default App