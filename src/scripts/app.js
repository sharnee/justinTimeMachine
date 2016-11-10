import React from 'react'
import ReactDOM from 'react-dom'
import STORE from './store'

const app = function() {
	//First step will be to create the container that will hold the web application
	//within this web applicaion we will get the initial state of the data to be rendered to the page
	// we will create an listening event that will allow us to mount the data once an upate is made to it
	// we will establish when to unmount so that we do not waste space?
	// we will also render the web app 

	const MachineContainer = React.createClass({
		//the componentWillMount is a given function that will allow us to mount the desired function to the DOM?
		
		componentWillMount: function() {
			//componentWillMount is a special lifecycle method in react. It runs before render. (keep in mind, this will only run once)
			//here we have decided that we were going to send out a signal to listen for updates of the data.
			STORE.on('update', () => {
				// setState will sync the machineContainer component's state with our STORE's _data property (then re-render)
				this.setState(STORE._getData())
			})
		},
		//turns off event listener
		componentWillUnmount: function() {
			STORE.off('update')
		},
		//Our initial state is established as the initial _data property from STORE
		getInitialState: function() {
			return STORE._getData()
		},
		//renders the page, populating it with the data in our state, which came from STORE
		render: function() {
			console.log('machine container',this)
			//readout is passed the year property from this.state
			//controlPanel is passed the progress property from this.state
		 	return (
		 		<div className='machineContainer' >
		 			<Readout year={this.state.year} />	
		 			<ControlPanel progress={this.state.progress} />
		 		</div>
		 	)
	 	}
	})

	
	const Readout = React.createClass({
		//Readout will finally display the year property in a <p> tag
		 render: function() {
		 	return (
		 		<p className='readout'>
		 			{this.props.year}
		 		</p>		
		 		) 
	 	}
	})
	
	
	const ControlPanel = React.createClass({


		_travelBackward: function() {
			clearInterval(STORE._get('intervalId')) //stops whatever set interval function is running 
			var tickBackward = () => { //function to decrement the year by 1 
				STORE._set({
					year: STORE._get('year') - 1
				})
			}
			var intervalId = setInterval(tickBackward,500) // runs tickBackward every 500ms AND assings the inervalId the return value of setInterval
			
			STORE._set({ 
				progress: 'backward', // bolds the back button 
				intervalId: intervalId //
			})

		},


		_travelForward: function() {
			clearInterval(STORE._get('intervalId'))
			var tickForward = () => { // increments year by 1 
				STORE._set({
					year: STORE._get('year') + 1
				})
			}
			var intervalId = setInterval(tickForward,500) //runs tickForward every 500ms and assigns the return to intervalId


			//
			STORE._set({
				progress: 'forward',
				intervalId: intervalId
			})

		},

		_stopHere: function() {
			clearInterval(STORE._get('intervalId'))
			STORE._set('progress','paused')
		},

		 render: function() { // assigns the fontweight key either a bolder or lighter value depending on the ternery state
		 	var backwardStyle = {
		 		'fontWeight': this.props.progress === 'backward' ? 'bolder' : 'lighter' 
		 	}
		 	var forwardStyle = {
		 		'fontWeight': this.props.progress === 'forward' ? 'bolder' : 'lighter' 
		 	}
		 	var pauseStyle = {
		 		'fontWeight': this.props.progress === 'paused' ? 'bolder' : 'lighter' 
		 	}

		 	return (
		 		<div className="control-panel" >
	 				<div onClick={this._travelBackward} style={backwardStyle} className="control-button"><span className="material-icons">{'<<'}</span></div>
	 				<div onClick={this._stopHere} 		style={pauseStyle} 	  className="control-button"><span className="material-icons">||</span></div>
	 				<div onClick={this._travelForward}  style={forwardStyle}  className="control-button"><span className="material-icons">{'>>'}</span></div>
		 		</div>
		 	)
	 	}
	})
	
	
	
		

	ReactDOM.render(<MachineContainer/>,document.querySelector('.container'))
}

app()