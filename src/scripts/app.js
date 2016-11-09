import React from 'react'
import ReactDOM from 'react-dom'
import STORE from './store'

const app = function() {

	const MachineContainer = React.createClass({
		componentWillMount: function() {
			STORE.on('update', () => {
				this.setState(STORE._getData())
			})
		},

		componentWillUnmount: function() {
			STORE.off('update')
		},

		getInitialState: function() {
			return STORE._getData()
		},

		render: function() {
			console.log('machine container',this)
		 	return (
		 		<div className='machineContainer' >
		 			<Readout year={this.state.year} />
		 			<ControlPanel progress={this.state.progress} />
		 		</div>
		 	)
	 	}
	})

	
	const Readout = React.createClass({
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
			clearInterval(STORE._get('intervalId'))
			STORE._set({
				progress: 'backward'
			})
			var tickBackward = () => {
				STORE._set({
					year: STORE._get('year') - 1
				})
			}
			var intervalId = setInterval(tickBackward,500)
			STORE._set({
				progress: 'backward',
				intervalId: intervalId
			})

		},


		_travelForward: function() {
			clearInterval(STORE._get('intervalId'))
			var tickForward = () => {
				STORE._set({
					year: STORE._get('year') + 1
				})
			}
			var intervalId = setInterval(tickForward,500)


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

		 render: function() {
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
	 				<div onClick={this._travelBackward}  style={backwardStyle} className="control-button"><span className="material-icons">{'<<'}</span></div>
	 				<div onClick={this._stopHere} style={pauseStyle} className="control-button"><span className="material-icons">||</span></div>
	 				<div onClick={this._travelForward} style={forwardStyle} className="control-button"><span className="material-icons">{'>>'}</span></div>
		 		</div>
		 	)
	 	}
	})
	
	
	
		

	ReactDOM.render(<MachineContainer/>,document.querySelector('.container'))
}

app()