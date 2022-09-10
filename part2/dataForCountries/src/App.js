import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [toggle, setToggle] = useState([]);
  const handleFilterChange = (e) => setFilter(e.target.value);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  let elements = [];

  const data = countries.map((country, i) => {
    let lower = country.name.common.toLowerCase();
    if (filter === "") {
      return null;
    } else if (lower.includes(filter.toLowerCase())) {
      return elements.push(
        <div className="country" key={i}>
          {country.name.common}{" "}
          <button
            onClick={() =>
              setToggle(
                <div>
                  <h1>{countries[i].name.common}</h1>
                  <br />
                  <div>capital {countries[i].capital}</div>
                  <div>area {countries[i].area}</div>
                  <br />
                  <div>
                    <strong>languages:</strong>
                    {Object.values(countries[i].languages).map((lang, i) => {
                      return (
                        <ul key={i}>
                          <li>{lang}</li>
                        </ul>
                      );
                    })}
                  </div>
                  <div>
                    <img alt="img" src={Object.values(countries[i].flags)[0]} />
                  </div>
                </div>
              )
            }
          >
            show
          </button>
        </div>
      );
    }
  });
  return (
    <div>
      find countries
      <input onChange={handleFilterChange} />
      {elements.length > 10 ? (
        <div> too many matches, specify another filter</div>
      ) : elements.length === 1 ? (
        <div>
          {countries.map((country, i) => {
            let lower = country.name.common.toLowerCase();
            if (lower.includes(filter.toLowerCase())) {
              return (
                <div key={i}>
                  <h1>{country.name.common}</h1>
                  <br />
                  <div>capital {country.capital}</div>
                  <div>area {country.area}</div>
                  <br />
                  <div>
                    <strong>languages:</strong>
                    {Object.values(country.languages).map((lang, i) => {
                      return (
                        <ul key={i}>
                          <li>{lang}</li>
                        </ul>
                      );
                    })}
                  </div>
                  <div>
                    <img alt="img" src={Object.values(country.flags)[0]} />
                  </div>
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>{elements}</div>
      )}
      {toggle}
    </div>
  );
};

export default App;
