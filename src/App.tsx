import { useState, useEffect } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import { ApiKeyContext } from './components/ApiKeyContext'
import CustomGreeting from './components/CustomGreeting'
import FactionInfoCard from './components/FactionInfoCard'
import Layout from './Layout'
import RankedWarSelector from './components/RankedWarSelector'
import type {firstViewProps } from './interfaces'


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
    <ApiKeyContext.Provider value={apiKey}>
      <Layout handleClearKey={handleClearKey}>
        <FirstView
          userData={userData}
          handleClearKey={handleClearKey}
          errorMsg={errorMsg}
          apiKey={apiKey}
        />
      </Layout>
    </ApiKeyContext.Provider>
  )
}

function FirstView({ userData, errorMsg, apiKey }: firstViewProps) {
  return (
    <>

      {userData ? (
        <>
          <header>
            <CustomGreeting id={userData.id} name={userData.name} level={userData.level} rank={userData.rank} title={userData.title} image={userData.image} faction_id={userData.faction_id} />

          </header>
          <FactionInfoCard uData={userData} apiKey={apiKey} />
          <section id="main-content">
         
            <RankedWarSelector apiKey={apiKey} faction_id={userData.faction_id} />
              
          </section>
        </>

      ) : (
        <section id="main-content">
          {errorMsg ? (
            <p className="card"><div className="card-content">{errorMsg}</div></p>
          ) : (
            <p className="card">Loading..</p>
          )}

        </section>
      )}
    </>
  )
}

export default App