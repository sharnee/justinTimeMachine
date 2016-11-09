import Backbone from 'backbone'
import _ from 'underscore'

const STORE = _.extend(Backbone.Events,{
	_data: {
		year: 2016,
		progress: null, // OPTIONS: forward || paused || backward || null
		intervalId: null,
		machineSpeed: 500
	},

	_emitChange: function() {
		this.trigger('update')
	},

	_getData: function() {
		return this._data
	},

	_get: function(key) {
		return this._data[key]
	},

	_set: function(input1,val) {

		// this function is specially designed so that it can have two kinds of signatures:
			// the developer can either (1) submit an object containing the key-value pairs they 
			// want to put into the new _data/state. 
			// (note that in this case, no second input was submitted, and val will be undefined.)
		if (typeof input1 === 'object') {
			var objectToMerge = input1
			//merge the object with my _data
			this._data = _.extend(this._data,objectToMerge)
		}

		// or (2) simply submit a string key and a value. this is probably what they'll do 
		// if they are only changing one key-value pair
		else {
			//this means the programmer submitted a key-val pair that i need to set		
			var key = input1	
			this._data[key] = val
		}
		this._emitChange()
	}
})


window.STORE = STORE

export default STORE