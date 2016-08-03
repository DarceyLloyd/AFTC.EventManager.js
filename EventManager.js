/**
 * Author: Darcey@AllForTheCode.co.uk
 * Date: 07/2016
 * Version: 1.0
 * Usage examples: See bottom of this file
 */

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
if (!log){
	function log(arg){
		if (console){
			console.log(arg);
		}
	}
}
if (!Function){
	function getFunctionName(callback){
		var name = callback.toString();
		var reg = /function ([^\(]*)/;
		return reg.exec(name)[1];
	}
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function EventManagerEventVO(){
	this.name = "";
	this.dispatchFunctions = [];
}
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -


// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
var EventManager = (function(){
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var events = [];
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	return {
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		add:function(eventName, dispatchFunction){
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
			for (var i = 0; i < events.length; i++) {
				if (events[i].name === eventName){
					foundOnIndex = i;
					eventExists = true;
					break;
				}
			}
			
			if (!eventExists){
				var vo = new EventManagerEventVO();
				vo.name = eventName;
				vo.dispatchFunctions.push(dispatchFunction);
				events.push(vo);
			} else {
				// Don't add duplicate functions
				var functionAlreadyAdded = false;
				for (i = 0; i < events[foundOnIndex].dispatchFunctions.length; i++) {
					if (events[foundOnIndex].dispatchFunctions[i] == dispatchFunction){
						functionAlreadyAdded = true;
						break;
					}
				}
				if (!functionAlreadyAdded){
					events[foundOnIndex].dispatchFunctions.push(dispatchFunction);
				} else {
					log("EventManager.add: Event [" + eventName + "] already dispatches a function named [" + getFunctionName(dispatchFunction) + "]");
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
		remove:function(eventName, dispatchFunction){
			if (dispatchFunction == "" || dispatchFunction == null || !dispatchFunction){
				log("EventManager.remove: Incorrect use of remove function for event ["+eventName+"], arg for dispatchFunction is missing (if you want to remove the entire event use removeAll.");
				return;
			}
			
			// log("######################################");
			// log("remove("+eventName+","+getFunctionName(dispatchFunction)+")");
			// log("### BEFORE: [" + events.length + "]");
			// log(events);
			// for (var i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }

			var vo;

			// Check event exists
			var eventExists = false;
			var foundOnIndex = -1;
			for (var i = 0; i < events.length; i++) {
				if (events[i].name === eventName){
					foundOnIndex = i;
					eventExists = true;
					break;
				}
			}
			
			if (eventExists){
				vo = events[foundOnIndex];
				for (i = 0; i < vo.dispatchFunctions.length; i++) {
					if (vo.dispatchFunctions[i] === dispatchFunction){
						vo.dispatchFunctions[i] = null;
						vo.dispatchFunctions.splice(i, 1);
						break;
					}
				}
			} else {
				log("EventManager.remove: Cannot remove dispatch function from event [" + eventName + "] which doesn't exist!");
			}
			
			// If no functions for dispatch on event name remaining remove the event
			if (vo.dispatchFunctions != undefined){
				if (vo.dispatchFunctions.length < 1){
					this.removeAll(eventName);
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
		dispatch:function(eventName){
			// log("dispatch("+eventName+")");
			var eventExists = false;
			for (var i = 0; i < events.length; i++) {
				if (events[i].name === eventName){
					eventExists = true;
					// Call all event dispatch functions
					var eventDispatchFunctions = events[i].dispatchFunctions;
					for (var fi = 0; fi < eventDispatchFunctions.length; fi++) {
						eventDispatchFunctions[fi]();
					}
					break;
				}
			}
			if (!eventExists){
				log("EventManager.dispatch: Event [" + eventName + "] doesn't exist!");
				return false;
			}
		},
		// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
		removeAll:function(eventName){
			// log("######################################");
			// log("removeAll("+eventName+")");
			// log("### BEFORE: [" + events.length + "]");
			// log(events);
			// for (var i = 0; i < events.length; i++) {
			// 	log(events[i]);
			// }
			
			if (!eventName || eventName == "" || eventName == null){
				events = null;
				events = [];
			} else {
				for (var i = 0; i < events.length; i++) {
					if (events[i].name === eventName){
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


// Usage example 1: Adding and Dispatching (calling/firing) Events
/*
 function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
 function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
 EventManager.add("MyEvent",myEventDispatchHandler1);
 EventManager.add("MyEvent",myEventDispatchHandler2);
 EventManager.dispatch("MyEvent");
 */

// Usage example 2: Adding and Removing events
/*
 function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
 function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
 EventManager.add("MyEvent",myEventDispatchHandler1);
 EventManager.add("MyEvent",myEventDispatchHandler2);
 EventManager.remove("MyEvent",myEventDispatchHandler1);
 EventManager.dispatch("MyEvent");
 */

// Usage example 3: Cleaning a single event up
/*
 function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
 function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
 EventManager.add("MyEvent",myEventDispatchHandler1);
 EventManager.add("MyOtherEvent",myEventDispatchHandler2);
 EventManager.removeAll("MyEvent");
 EventManager.dispatch("MyEvent");
 */

// Usage example 4: Cleaning everything up
/*
 function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
 function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
 EventManager.add("MyEvent1",myEventDispatchHandler1);
 EventManager.add("MyEvent2",myEventDispatchHandler2);
 EventManager.removeAll();
 EventManager.dispatch("MyEvent1");
 EventManager.dispatch("MyEvent2");
 */
