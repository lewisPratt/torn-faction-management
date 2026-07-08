import { useState, useEffect } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import CustomGreeting from './components/CustomGreeting'
import ClearKeyButton from './components/ClearKeyButton'
import FactionInfoCard from './components/FactionInfoCard'
import Layout from './Layout'

function App() {
  const [apiKey, setApiKey] = useState(localStorage.getItem('tornApiKey') || '')
  const [submitted, setSubmitted] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [inputValue, setInputValue] = useState<any>('');
  const [errorMsg, setErrorMsg] = useState<string>('')


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.torn.com/user/?selections=profile&key=${apiKey}`)
      const data = await response.json()

      if (data.error) {
        setErrorMsg(data.error.error)
      }
      else {
        setUserData(data)
        console.log(data)
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
interface TornUserData {
  name: string
  player_id: number
  level: number
  profile_image: string
  rank: string
}
interface firstViewProps {
  userData: TornUserData
  handleClearKey: () => void
  errorMsg: string
  apiKey: string
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