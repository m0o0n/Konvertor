import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './App.css';
import CurrencyRow, { CustomInput } from './components/CurrencyRow';
import { addRatesThunk, setBaseAC, setToAC } from './redux/exchangeRateReducer';



function App(props) {
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)


let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * props.exRate
  } else {
    toAmount = amount
    fromAmount = amount / props.exRate
  }

function handleChangeToAmount(e){
  setAmount(e.target.value)
    setAmountInFromCurrency(false)
}

function handleChangeFromAmount(e){
  setAmount(e.target.value)
  setAmountInFromCurrency(true)
}

  useEffect(()=>{
    props.addRatesThunk(props.baseCurency, props.toCurency)
  }, [props.baseCurency, props.toCurency]);
  
  function toFix(num, afterDot) {
    return num.toFixed(afterDot);
  }
  let x = 39.10000
  console.log(x.toFixed(2))
  return (

    <div class="container pt-5 pb-5">
			<div class="row justify-content-center">
				<div class="col-8">
					
					<div class="card p-3">
						<form>
							<h1 class="h2 mb-4 row justify-content-center">Конвертер валют</h1>

							<div class="courses">
								<div class="course-item card card-body">
									<div class="course-item-title row justify-content-center">USD / UAH</div>
									<div class="course-item-value row justify-content-center" data-value="USD">{toFix(Number(props.fromBase.USD), 2)}</div>
								</div>
								<div class="course-item card card-body">
									<div class="course-item-title row justify-content-center">EUR / UAH</div>
									<div class="course-item-value row justify-content-center " data-value="EUR">{toFix(Number(props.fromBase.EUR), 2)}</div>
								</div>
								<div class="course-item card card-body">
									<div class="course-item-title row justify-content-center">BTC / USD</div>
									<div class="course-item-value row justify-content-center" data-value="BTC">{toFix(Number(props.fromBase.BTC), 0)}</div>
								</div>
							</div>

							<div class="row mb-1">
                  <CurrencyRow 
                  setBase={(e) => props.setBaseAC(e.target.value)}
                  curencyValues={props.curencies}
                  base={props.baseCurency}
                 
                  name={"Отдаю"}
                  />

                  <CurrencyRow 
                  setBase={(e) => props.setToAC(e.target.value)}
                  curencyValues={props.curencies}
                  base={props.toCurency}
                  
                  name={"Получаю"}
                  />
							</div>

							<div class="row">
								<CustomInput 
                  onChange={handleChangeFromAmount}
                  amount={fromAmount} 
                />
								
                <CustomInput
                onChange={handleChangeToAmount}
                amount={toAmount} 
                />
								
							</div>
						</form>
					</div>
				
				</div>
			
			</div>
		
		</div>
  );
}
const mapStateToProps =(state)=>{
  return {
    state: state,
    rates: state.excahngeReducer.rates,
    fromBase: state.excahngeReducer.fromBase,
    curencies: 
    Object.keys(state.excahngeReducer.fromBase)
    .filter(e=>{
      if(e !== "BTC"){
          return e
      }
    }),
    baseCurency: state.excahngeReducer.base,
    toCurency:state.excahngeReducer.to,
    exRate: state.excahngeReducer.exRate
  }
}

export default connect(mapStateToProps, {addRatesThunk, setBaseAC, setToAC})(App);
