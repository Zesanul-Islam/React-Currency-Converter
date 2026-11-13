import { memo } from "react";
import styles from "./css/flagBox.module.css"
import countries from "./assets/countryList.js"
import euroFlag from "./assets/euro.webp";

function FlagBox({fromOrTo, countryCode, setCountryCode}){
  console.log ( "Render FlagBox", fromOrTo, countryCode );

  return (
    <div className={styles.eachSection}>
      <header>{fromOrTo}</header>
      <main>
        <img src={(countryCode === "EUR") ? euroFlag : `https://flagsapi.com/${countryCode[0]}${countryCode[1]}/flat/64.png`} width="64px" />
        <p>{countryCode}</p>
      </main>
      <footer>
        <select className={styles.countryDropDown} value={countryCode} onChange={(event)=>setCountryCode(event.target.value)}>
          {
            countries.map((country)=>(
              <option key={country.code} value={country.code}>{country.name}</option>
            ))
          }
        </select>
        <svg className={styles.countrySVG} viewBox="0 0 16 16" width="16" height="16"><path d="M11.5976 6.5C11.7461 6.5 11.8204 6.67956 11.7154 6.78457L8.23574 10.2643C8.10555 10.3945 7.89445 10.3945 7.76425 10.2643L4.28457 6.78457C4.17956 6.67956 4.25393 6.5 4.40244 6.5H11.5976Z" fill="currentColor"></path></svg>
      </footer>
    </div>
  )
}

// memo use krber karone ber ber Render hobe nahh child Component ... kebol matro props change holei ei Child Component ta Re-Render hobe !!!
export default memo(FlagBox);