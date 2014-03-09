		var ticker = (function() {
		    //PRIVATE 
		    var headlines = [],
		    	distancePerFrame = 1,
		    	headlineSpacing = 5,
		        tickerContainer = "",
		        type = Object.prototype.toString,
		        direction = 1, //0 for left to right, 1, for rigth to left.

		        //core functionality:
		        nextHeadline = function(){
		        	//we want the first headline in the array.
					var headline = headlines[0];

					//now move that to the end:
					//there should probably be some better logic for handing around headlines intenally.
					headlines.push(headlines.shift());

					//create the ticker headline carrier
					//should allow user to set carrier class name
					var carrier = document.createElement('div');
						carrier.classList.add("carrier");

					//create the passenger icon and text.
					if(headline.icon != undefined && headline.icon != ""){
						var icon = document.createElement("img");
						icon.src = headline.icon;
						carrier.appendChild(icon);
					}
					if(headline.text != undefined && headline.text != ""){
						var sp = document.createElement("span");
						sp.innerHTML = headline.text;
						
						//if we specify a specific class, use it
						if(headline.class != undefined && headline.class != ""){
							sp.classList.add(headline.class);
						}

						//if we specify a specific style, use it
						if(headline.style != undefined && headline.style != ""){
							//we need a style name
							var styleName = nameGen(10);
							document.styleSheets[0].addRule("." + styleName, headline.style);
							sp.classList.add(styleName);
						}
						
						carrier.appendChild(sp);
					}

					//add it once in the middle of nowhere so we can measure it.
					carrier.style.left =  "0px";
					carrier.style.top = "-500px";
					tickerContainer.appendChild(carrier);

					//now move it to the right spot
					carrier.style.left =  "-" + carrier.offsetWidth + "px";
					carrier.style.top = "";
		        },

		        draw = function(){
		        	//house keeping
		        	//var increment = (direction == 0)? distancePerFrame : -distancePerFrame;

		        	//if there aren't any headlines, add the first.
		        	if(tickerContainer.children.length == 0){
		        		nextHeadline();
		        	}

		        	//for all existing boxes, move them left the move distance.
					for (var i = tickerContainer.children.length - 1; i >= 0; i--) {
						var headline = tickerContainer.children[i];

						headline.style.left = (parseInt(headline.style.left,10) + distancePerFrame) + 'px';
						
						//if the box is now off screen, remove it.
						if((tickerContainer.offsetLeft + tickerContainer.offsetWidth) < parseInt(headline.style.left,10)){
							tickerContainer.removeChild(headline);
						}

						//if there is room for the next box, add it.
						if(parseInt(headline.style.left,10) == headlineSpacing){
							nextHeadline();
						}
						
					};

		        },

			    //util functions
				getWidth = function() {
				    if (self.innerWidth) {
				       return self.innerWidth;
				    }
				    else if (document.documentElement && document.documentElement.clientHeight){
				        return document.documentElement.clientWidth;
				    }
				    else if (document.body) {
				        return document.body.clientWidth;
				    }
				    return 0;
				},

				//jakes stupid name generator.
				nameGen = function(length){
					var name = "",
						characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxy";
					for (var i = length -1; i >= 0; i--) {
						name += characters[Math.floor((Math.random()*characters.length)+1)];
					};
					return name;
				},

				debug = function(){
					//a simple debug div that shows some stats:
					var debug = document.getElementById('ticker-debug') || document.createElement('div');
					debug.id = "ticker-debug"
					debug.style.position = "absolute";
					debug.style.left = "10px";
					debug.style.top = "10px"; 
					debug.innerHTML= "epoch: "+ Date.now() + 
									" kids: " + tickerContainer.children.length + 
									" ticker width: " + tickerContainer.offsetWidth;
					document.body.appendChild(debug);	
				};

		    //PUBLIC
		    return {
		    	//setup the ticker going.
		        init: function(config) {
		        	if(config.container != undefined && config.container != ""){
		        		tickerContainer = document.getElementById(config.container);
		        	}
		        	else{
		        		return "no container div specified";
		        	}

		        	direction = (config.direction != undefined)? config.direction : direction;
		        	console.log(direction);
		        	
		        	
		        },
		        //add a single headline object, or an array of objects to the headlines array
		        addHeadline: function(headline) {
		        	//make sure each child has a "text" field before adding it.

		        	if(type.call(headline) == "[object Array]"){
		        		for (var i = headline.length - 1; i >= 0; i--) {	
		        			if(headline[i].text != undefined){
		        				headlines.push(headline[i]);
		        			}

		        		};
		        		return headlines.length;
		        	}
		        	else if(type.call(headline) == "[object Object]" && headline.text != undefined){
		        		return headlines.push(headline);
		        	}
		        	else return 0;
		        },
		        //remove an item from the array based on a simple match
		        removeHeadline: function(field, term){
		        	//look for the field first, then the pattern. if no pattern, remove anything with fld
		        	for (var i = headlines.length - 1; i >= 0; i--) {
		        		if(field in headlines[i]){
		        			if(-1 != headlines[i][field].indexOf(term)){
		        				headlines.splice(i, 1);
		        			}
		        		}
		        	};
		        },	
		        getHeadlines: function(){
		        	return headlines;
		        },
		        frame: function(){

		        	//for (var i = frames ; i > 0; i--) {
		        		draw();
		        		//debug();
		        	//};
		        	
		        }

		    }
		})();