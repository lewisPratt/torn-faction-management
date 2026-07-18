import type { ApiKeyFormProps } from "../interfaces"

function ApiKeyForm({ inputValue, setInputValue, handleSubmit }: ApiKeyFormProps) {
  return (
    <>
      <header id="login-header">
        <h1>Faction War Reviews</h1>
        <h2>A tool that breaks down player activity during ranked wars.</h2>
      </header>
      <main id="login-main-content">
        <div className="card"><p>This tool links to the Torn API to give you a detailed understanding of your faction members performance during ranked wars. </p>
          <p className="api-p">Your API key is stored in your local browser cache, meaning your Torn privacy is protected.<br /> (Just remember not to delete your browser cache if you want to stay logged in!)</p>
           <p className="login-form"><input
            name="api-key"
            required
            type="text"
            placeholder="Enter your Torn API key"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
         <button onClick={handleSubmit}>Save Key</button></p>
        </div>
      </main>
    </>
  )
}

export default ApiKeyForm