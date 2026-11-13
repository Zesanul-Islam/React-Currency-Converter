import { useState, useEffect, useRef } from "react";
import styles from "./css/app.module.css"
import FlagBox from "./FlagBox";

export default function App() {
  console.log ( "App is Re-Rendering !!!" );

  // useRef !!!
  let getBtnREF = useRef(null);
  // useState !!!
  let [amount, setAmount] = useState ( "" );
  let [isPlaceHolderUp, setIsPlaceHolderUp] = useState ( false );
  let [fromCountryCode, setFromCountryCode] = useState ( "USD" );
  let [toCountryCode, setToCountryCode] = useState ( "BDT" );
  let [exchangeDetails, setExchangeDetails] = useState({
    from: "USD",
    to: "BDT",
    fromAmount: "_",
    toAmount: "_"
  })
  // useEffect !!!
  useEffect(()=>{
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  }, [])

  // Functions !!!
  function onFocus(){
    if ( isPlaceHolderUp === false ) setIsPlaceHolderUp ( true );
  }
  function onBlur(){
    if ( amount === "" ) setIsPlaceHolderUp ( false );
  }
  function onKeyDown(event){
    if ( event.key === "ArrowDown" ) {
      if ( amount === "" || amount === "0" ) {
        event.preventDefault();
        setAmount ( "0" );
      }
    }
    else if ( event.key === "-" || event.key === "+" ) event.preventDefault();
    else if ( event.key === "Enter" ) {
      event.preventDefault();
      getBtnREF.current.click();
    }
    else if ( event.key === "e" || event.key === "E" ) event.preventDefault();
  }
  function onChange(event){
    setAmount ( event.target.value );
  }
  async function getExchange(){
    if ( amount === "" ) return;
    let x = fromCountryCode.toLowerCase(), y = toCountryCode.toLowerCase();
    let a = 0, b = 0;
    if ( x === y ) {
        a = Number(amount); b = Number(amount);
    } 
    else {
        let URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${x}.json`;
        let response = await fetch ( URL );
        let actualData = await response.json();
        a = Number(amount); b = (a*actualData[x][y]).toFixed(3);
    }
    setExchangeDetails({
      from:fromCountryCode,
      to: toCountryCode,
      fromAmount: a,
      toAmount:b
    })
  }

  return (
    <div className={styles.box}>
      <header className={styles.boxHeader}>Currency Converter</header>
      <div className={styles.formSecondPortion}>
        <input type="number" name="amountBox" id="amountBox" min={0} className={styles.inputField} onFocus={onFocus} onBlur={onBlur} onKeyDown={onKeyDown} value={amount} onChange={onChange} required />
        <p className={`${styles.inputFieldPlaceHolder} ${isPlaceHolderUp ? styles.placeHolderUp : styles.placeHolderDown}`}>Enter Amount</p>
      </div>
      <div className={styles.fromToSection}>
        <FlagBox fromOrTo={"From"} countryCode={fromCountryCode} setCountryCode={setFromCountryCode} />
        <svg style={{fill:"none"}} width="50px" height="50px" viewBox="0 0 24 24"><polyline points="7 17 4 14 20 14" style={{fill: "none", stroke: "rgb(9, 188, 9)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2}}></polyline><polyline data-name="primary" points="17 7 20 10 4 10" style={{fill: "none", stroke: "red", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2}}></polyline></svg>
        <FlagBox fromOrTo={"To"} countryCode={toCountryCode} setCountryCode={setToCountryCode} />
      </div>
      <p className={styles.displayExchange}><span>{exchangeDetails.fromAmount}</span> {exchangeDetails.from} = <span>{exchangeDetails.toAmount}</span> {exchangeDetails.to}</p>
      <button type="button" ref={getBtnREF} className={styles.getBtn} onClick={getExchange}>Get Exchange Rate</button>
    </div>
  )
}
