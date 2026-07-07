interface ApiKeyFormProps {
  inputValue: string
  setInputValue: (value: string) => void
  handleSubmit: () => void
}

function ApiKeyForm({ inputValue, setInputValue, handleSubmit }: ApiKeyFormProps) {
  return (
    <div>
      <h1>Torn Dashboard</h1>
      <input
        name="api-key"
        required
        type="text"
        placeholder="Enter your Torn API key"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSubmit}>Save Key</button>
    </div>
  )
}

export default ApiKeyForm