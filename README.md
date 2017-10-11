# EventManager.js
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Darcey%2eLloyd%40gmail%2ecom&lc=GB&item_name=Darcey%20Lloyd%20Developer%20Donation&currency_code=GBP&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

A JavaScript Event Manager (add,dispatch,remove,removeAll)

# Usage example 1: Adding and Dispatching (calling/firing) Events
```
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyEvent",myEventDispatchHandler2);
EventManager.dispatch("MyEvent");
```

Console result:
```
myEventDispatchHandler1(): Executed
myEventDispatchHandler2(): Executed
```



# Usage example 2: Adding and Removing events
```
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyEvent",myEventDispatchHandler2);
EventManager.remove("MyEvent",myEventDispatchHandler1);
EventManager.dispatch("MyEvent");
```

Console result:
```
myEventDispatchHandler2(): Executed
```



# Usage example 3: Cleaning a single event up
```
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent",myEventDispatchHandler1);
EventManager.add("MyOtherEvent",myEventDispatchHandler2);
EventManager.removeAll("MyEvent");
EventManager.dispatch("MyEvent");
```

Console result:
```
EventManager: WARNING: You are dispatching an event which doesn't exist!
```


# Usage example 4: Cleaning everything up
```
function myEventDispatchHandler1(){ console.log("myEventDispatchHandler1(): Executed"); }
function myEventDispatchHandler2(){ console.log("myEventDispatchHandler2(): Executed"); }
EventManager.add("MyEvent1",myEventDispatchHandler1);
EventManager.add("MyEvent2",myEventDispatchHandler2);
EventManager.removeAll();
EventManager.dispatch("MyEvent1");
EventManager.dispatch("MyEvent2");
```

Console result:
```
EventManager: WARNING: You are dispatching an event which doesn't exist!
EventManager: WARNING: You are dispatching an event which doesn't exist!
```


## <b>Found this useful? Please Donate...</b>
Any and all donations to help keep active development and the lights on are more than welcome.

[![paypal](https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=Darcey%2eLloyd%40gmail%2ecom&lc=GB&item_name=Darcey%20Lloyd%20Developer%20Donation&currency_code=GBP&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted)

<br>
<br>

[![Hire](https://www.allforthecode.co.uk/images/pph_widget.jpg)](http://pph.me/Darcey)

