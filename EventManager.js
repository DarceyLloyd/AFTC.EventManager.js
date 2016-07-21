/**
 * Author: Darcey@AllForTheCode.co.uk
 * Date: 20/07/2016
 * REQUIRES: aftc.js
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if (!log) {
	function log($str) {
		console.log($str);
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function EventManagerEventVO() {
	this.name = "";
	this.dispatchFunctions = [];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var EventManager = (function () {
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var events = [];
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var privateMethod = function () {
		log("privateMethod();")
	};
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	return {
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		add: function (eventName, dispatchFunction) {
			// log("######################################");
			// log("add("+eventName+","+getFunctionName(dispatchFunction)+")");
			// log("### BEFORE: [" + events.length + "]");
			// log(events);
			// for (var i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			
			// Check event exists
			var eventExists = false;
			var foundOnIndex = -1;
			for (i = 0; i < events.length; i++) {
				if (events[i].name === eventName) {
					foundOnIndex = i;
					eventExists = true;
					break;
				}
			}
			
			if (!eventExists) {
				var vo = new EventManagerEventVO();
				vo.name = eventName;
				vo.dispatchFunctions.push(dispatchFunction);
				events.push(vo);
			} else {
				// Don't add duplicate functions
				var functionAlreadyAdded = false;
				for (i = 0; i < events[foundOnIndex].dispatchFunctions.length; i++) {
					if (events[foundOnIndex].dispatchFunctions[i] == dispatchFunction) {
						functionAlreadyAdded = true;
						break;
					}
				}
				if (!functionAlreadyAdded) {
					events[foundOnIndex].dispatchFunctions.push(dispatchFunction);
				} else {
					log("EventManager: Event [" + eventName + "] already dispatches a function specified");
				}
			}
			
			// log("### AFTER: [" + events.length + "]");
			// log(events);
			// for (i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			// log("######################################");
		},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		remove: function (eventName, dispatchFunction) {
			if (dispatchFunction == "" || dispatchFunction == null || !dispatchFunction) {
				log("EventManager: WARNING: remove() requires 2 params, event name and dispatch function.");
				return;
			}
			
			// log("######################################");
			// log("remove("+eventName+","+getFunctionName(dispatchFunction)+")");
			// log("### BEFORE: [" + events.length + "]");
			// log(events);
			// for (var i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			
			// Check event exists
			var eventExists = false;
			var foundOnIndex = -1;
			for (var i = 0; i < events.length; i++) {
				if (events[i].name === eventName) {
					foundOnIndex = i;
					eventExists = true;
					break;
				}
			}
			
			if (eventExists) {
				var vo = events[foundOnIndex];
				for (i = 0; i < vo.dispatchFunctions.length; i++) {
					if (vo.dispatchFunctions[i] === dispatchFunction) {
						log("FOUND dispatch function");
						vo.dispatchFunctions[i] = null;
						vo.dispatchFunctions.splice(i, 1);
						break;
					}
				}
				
			} else {
				log("EventManager: WARNING: Cannot remove dispatch function from event [" + eventName + "] which doesn't exist!");
			}
			
			// log("### AFTER: [" + events.length + "]");
			// log(events);
			// for (i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			// log("######################################");
		},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		dispatch: function (eventName) {
			// log("dispatch("+eventName+")");
			var eventExists = false;
			for (var i = 0; i < events.length; i++) {
				if (events[i].name === eventName) {
					eventExists = true;
					// Call all event dispatch functions
					var eventDispatchFunctions = events[i].dispatchFunctions;
					for (var fi = 0; fi < eventDispatchFunctions.length; fi++) {
						eventDispatchFunctions[fi]();
					}
					break;
				}
			}
			if (!eventExists) {
				log("EventManager: WARNING: You are dispatching an event which doesn't exist!");
				return false;
			}
		},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		removeAll: function (eventName) {
			// log("######################################");
			// log("removeAll("+eventName+")");
			// log("### BEFORE: [" + events.length + "]");
			// log(events);
			for (var i = 0; i < events.length; i++) {
				log(events[i]);
			}
			
			if (!eventName || eventName == "" || eventName == null) {
				events = null;
				events = [];
			} else {
				for (var i = 0; i < events.length; i++) {
					if (events[i].name === eventName) {
						events[i].name = null;
						events[i].dispatchFunctions = null;
						events[i] = null;
						events.splice(i, 1);
					}
				}
			}
			
			// log("### AFTER: [" + events.length + "]");
			// log(events);
			// for (i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			// log("######################################");
		}
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	};
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
})();
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// Usage
/*
EventManager.add("tile1", tileSelected1);
EventManager.add("tile1", tileSelected2);
EventManager.add("tile1", tileSelected3);
EventManager.add("tile2", tileSelected2);
//EventManager.removeAll("tile1");
//EventManager.removeAll();
//EventManager.remove("tile1", tileSelected1);
EventManager.dispatch("tile1");
EventManager.dispatch("tile2");

function tileSelected1() {
	log("## tileSelected1()");
}
function tileSelected2() {
	log("## tileSelected2()");
}
function tileSelected3() {
	log("## tileSelected3()");
}
function tileSelected4() {
	log("## tileSelected4()");
}
*/