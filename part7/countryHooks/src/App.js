import { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const [countryName, setCountryName] = useState('')
  const [found, setFound] = useState(false)

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => {
        if (response.status === 200) {
          setCountry(...response.data)
          setFound(true)
        } else {
          setCountry(null)
          setFound(false)
        }
      })
  }, [countryName])

  const set = (name) => {
    setCountryName(name)
  }

  return { country, found, set }
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  if (!country.found) {
    return <div>not found...</div>
  }

  return (
    <div>
      <h3>{country.country.name.common}</h3>
      <div>population {country.country.population}</div>
      <div>capital {country.country.capital}</div>
      <img
        src={country.country.flags.png}
        height="100"
        alt={`flag of ${country.name}`}
      />
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
    country.set(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
