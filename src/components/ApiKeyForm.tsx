import type { ApiKeyFormProps } from "../interfaces"
import { useState } from "react"
import DarkMode from "./DarkMode"

function ApiKeyForm({ inputValue, setInputValue, handleSubmit }: ApiKeyFormProps) {
 
  return (
    <>
      <header id="login-header">
        <h1>Faction Ledger</h1>
        <h2>A tool that breaks down player activity during ranked wars.</h2>
      </header>
      <main id="login-main-content">
        <div className="card"><p>This tool links to the Torn API to give you a detailed understanding of your faction members performance during ranked wars. </p>
          <p className="api-p">Your API key is stored in your local browser cache, meaning your Torn privacy is protected.<br /> (Just remember not to delete your browser cache if you want to stay logged in!)</p>
          <p className="create-api-p">Create an API key via your torn account <a href="https://torn.com/preferences.php#tab=api" target="_blank">here.</a> 
          <br />Minimum API access level: Limited Access & Faction API access</p>
          <p className="login-form"><input
            name="api-key"
            required
            type="text"
            placeholder="Enter your Torn API key"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
            <br /><button onClick={handleSubmit}>Login</button></p>
        </div>
      </main>
      <footer><a href="https://github.com/lewisPratt/torn-faction-management/issues" target="_blank"><button>Bugs & Feature Requests</button></a><a href="https://buymeacoffee.com/lewis19880g" target="_blank"><button>Buy me a Coffee!</button></a> <DarkMode />
</footer>
    </>
  )
}

export default ApiKeyForm