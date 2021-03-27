import React from 'react';
import ReactDOM from 'react-dom';
import './calculator.css';

function Key(props){
	return (
		<button className="key" onClick={props.onClick}>
			{props.value}
		</button>
	);
}

function BlankKey(props){
	return (
		<button className="key" onClick={props.onClick}>.</button>
	);
}

class NumbersKeyboard extends React.Component {
	renderKey(i){
		return(
			<Key
				value={i}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}
	renderBlank(){
		return(
			<BlankKey 
				onClick={()=> this.props.onDotKey()}
			/>
		);
	}
	render(){
		return(
		<div>
			<div>
				<div className="numberkeys-row">
				{this.renderKey(7)}
				{this.renderKey(8)}
				{this.renderKey(9)}
				</div>
			</div>
			<div>
				<div className="numberkeys-row">
				{this.renderKey(4)}
				{this.renderKey(5)}
				{this.renderKey(6)}
				</div>
			</div>
			<div>
				<div className="numberkeys-row">
				{this.renderKey(3)}
				{this.renderKey(2)}
				{this.renderKey(1)}
				</div>
			</div>
			<div>
				<div className="numberkeys-row">
				{this.renderBlank()}
				{this.renderKey(0)}
				{this.renderBlank()}
				</div>
			</div>
		</div>
		);
	}
}

class OperationKeyboard extends React.Component {
	renderKey(i, e){
		return(
			<Key
				value={i}
				onClick={() => e()}
			/>
		);
	}
	render(){
		return(
			<div>
				<div className="operationkeys-column">
					<div className="numberkeys-row">
						{this.renderKey("/", ()=>this.props.onClickJako())}
					</div>
					<div className="numberkeys-row">
						{this.renderKey("*", ()=>this.props.onClickKerto())}
					</div>
					
					<div className="numberkeys-row">
						{this.renderKey("-", ()=>this.props.onClickMinus())}
					</div>
					
					<div className="numberkeys-row">
						{this.renderKey("+", ()=>this.props.onClickPlus())}
					</div>
					<div className="numberkeys-row">
						{this.renderKey("=", ()=>this.props.onClickYhtakuin())}
					</div>
				</div>
			</div>
		);
	}
}

class CommandKeyboard extends React.Component {
	renderKey(i, e){
		return(
			<Key
				value={i}
				onClick={() => e()}
			/>
		);
	}
	
	render(){
		return(
			<div>
				<div className="numberkeys-row">
					{this.renderKey("C", ()=>this.props.onClickClear())}
					{this.renderKey("CE", ()=>this.props.onClickClearEntry())}
					{this.renderKey("<", ()=>this.props.onClickDelete())}
				</div>
			</div>
		);
	}
}

class Panel extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			inputValue: "",
			storedValue: 0,
			operation: ""
		};
	}
	
	Sum = (a, b) => { return parseFloat(a) + parseFloat(b); }
	Sub = (a, b) => { return parseFloat(a) - parseFloat(b); }
	Div = (a, b) => { return parseFloat(a) / parseFloat(b); }
	Mul = (a, b) => { return parseFloat(a) * parseFloat(b); }
	
	Operation = (a, b, o) =>{
		var result;
		switch(o){
			case "+":
				result = this.Sum(a, b);
				break;
			case "-":
				result = this.Sub(a, b);
				break;
			case "/":
				result = this.Div(a, b);
				break;
			case "*":
				result = this.Mul(a, b);
				break;
		}
		return result;
	}
	
	OperationKey(o){
		let storedValue = this.state.storedValue;
		if(this.state.inputValue == "")
			return;
		
		if(storedValue == 0){
			storedValue = this.state.inputValue;
		}else{
			storedValue = this.Operation(this.state.storedValue, this.state.inputValue, this.state.operation);
		}
		
		this.setState({
			operation: o,
			inputValue: "",
			storedValue: storedValue
		});
	}
	
	OperationEqual(){
		const operation = this.state.operation;
		const stored = this.state.storedValue;
		const input = this.state.inputValue;
		
		if(stored === 0 || stored === "")
			return;
		
		var result = this.Operation(stored, input, operation);
		
		this.setState({
			inputValue: result,
			operation: "",
			storedValue: ""
		});
	}
	
	NumberKey(i){
		const value = this.state.inputValue;
		var input = `${this.state.inputValue}${i}`;
		if(value == 0 && value.length == 1)
			input = i;
		
		this.setState({
			inputValue: input
		});
	}
	
	MinusKey(i){
		const value = this.state.inputValue;
		var input = `${this.state.inputValue}${i}`;
		if(value == 0 && value.length == 1)
			input = i;
		
		this.setState({
			inputValue: input
		});
	}
	
	DotKey(){
		const value = this.state.inputValue
		const hasDot = value.includes(".");
		var input;
		if(hasDot)
			return;
		if(value == "")
			input = "0.";
		else
			input = value.concat('','.');
		
		this.setState({
			inputValue: input
		});
	}
	
	Clear(){	
		this.setState({
			inputValue: "",
			storedValue: 0,
			operation: ""
		});
	}
	
	ClearEntry(){
		
		this.setState({
			inputValue: ""
		});
	}
	
	DeleteNumber(){
		const inputValue = this.state.inputValue;
		let input;
		if(input == null)
			input = "";
		else{
			input = new String(inputValue.slice(0, -1));
		}
		
		this.setState({
			inputValue: input
		});
	}
	
	render(){
		
		const bottom = <h4>Tuomas Porvali</h4>;
		let display;
		
		if(this.state.storedValue === 0)
			display = this.state.inputValue;
		else
			display = new String(this.state.storedValue + " " + this.state.operation + " " + this.state.inputValue);
		
		return(
			<div className="panel">
				<div className="display">
					<p>{display}</p>
				</div>
				<div className="keyboard">
					<div className="numbers">
						<NumbersKeyboard
							onClick={(i) => this.NumberKey(i)}
							onDotKey={() => this.DotKey()}
						/>
						<CommandKeyboard
							onClickClear={()=>this.Clear()}
							onClickClearEntry={()=>this.ClearEntry()}
							onClickDelete={()=>this.DeleteNumber()}
						/>
					</div>
					<div className="operations">
						<OperationKeyboard
							onClickPlus={()=>this.OperationKey("+")}
							onClickMinus={()=>this.OperationKey("-")}
							onClickKerto={()=>this.OperationKey("*")}
							onClickJako={()=>this.OperationKey("/")}
							onClickYhtakuin={()=>this.OperationEqual()}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Panel;