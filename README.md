# EventManager.js
A JavaScript Event Manager (add,dispatch,remove,removeAll)

# Usage example 1: Adding and Dispatching (calling/firing) Events
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyEvent",myEventDispatchHandler2);
EventManager.dispatch("MyEvent");

Console result:
myEventDispatchHandler1(): Executed
myEventDispatchHandler2(): Executed



# Usage example 2: Adding and Removing events
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyEvent",myEventDispatchHandler2);
EventManager.remove("MyEvent",myEventDispatchHandler1);
EventManager.dispatch("MyEvent");

Console result:
myEventDispatchHandler2(): Executed



# Usage example 3: Cleaning a single event up
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyOtherEvent",myEventDispatchHandler2);
EventManager.removeAll("MyEvent");
EventManager.dispatch("MyEvent");

Console result:
EventManager: WARNING: You are dispatching an event which doesn't exist!


# Usage example 4: Cleaning everything up
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent1",myEventDispatchHandler1);
EventManager.add("MyEvent2",myEventDispatchHandler2);
EventManager.removeAll();
EventManager.dispatch("MyEvent1");
EventManager.dispatch("MyEvent2");

Console result:
EventManager: WARNING: You are dispatching an event which doesn't exist!
EventManager: WARNING: You are dispatching an event which doesn't exist!
