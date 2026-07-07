import { useState, useEffect } from 'react'
import ApiKeyForm from './components/ApiKeyForm'
import CustomGreeting from './components/CustomGreeting'
import ClearKeyButton from './components/ClearKeyButton'
import FactionInfoCard from './components/FactionInfoCard'

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
    <div>
      
      {userData ? (
        <div>
          <CustomGreeting uData={userData} />

          <ClearKeyButton handleClearKey={handleClearKey } />
          <FactionInfoCard uData={userData}/>
        </div>

      ) : (
        <div>
          {errorMsg ? (
            <p>{errorMsg}</p>
          ) : (
            <p>Loading..</p>
          )}
          
          <p></p>
          <ClearKeyButton handleClearKey={handleClearKey } />

        </div>
      )}
    </div>
  )
}



export default App