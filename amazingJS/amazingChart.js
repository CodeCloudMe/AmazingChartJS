//


var amazingChart = function(){


	this.whichLabel = 1;

	this.allSeries=[];

	this.allSources = {};

	this.seriesUpdates=null;

	this.lastTimes ={};

	this.events={};
	this.events['new']=function(){console.log('no on new event... default here')}

	this.chart =null;

	this.colorValue = {};

	this.latestColor='#666';

	this.thick= 2;

	this.render=function(selector, label){

		try{
			var $=jQuery;
		}

		catch(err){

			console.log("cant render chart.. please add jQuery to your sources, dude");

		}


		try{

		var theThis = this;

		 this.chart = $(selector).highcharts({
		 	chart:{

		 		type: 'spline',
		 		events:
						        	{
						        		load:function(){
						        			console.log('loaded chart');
						        			theThis.seriesUpdates =this.series;
						        			

						        		}


						        	},
		 	},


	        title: {
	            text: 'Data',
	            x: -20 //center
	        },
	        subtitle: {
	            text: "",
	            x: -20
	        },
	        xAxis: {
	            type:'datetime'
	        },
	        yAxis: {
			            title: {
			                text: 'count'
			            }
			           
			 },
	        tooltip: {
	            valueSuffix: ''
	        },

	         plotOptions: {
			            spline: {
			                marker: {
			                    radius: 4,
			                    lineColor: theThis.colorValue,
			                    lineWidth: theThis.thick
			                }
			            }
			        },
	        
	        series:this.allSeries
    	});

		 console.log(this.allSeries)
		}



		catch(err){

			console.log('error ... did you import highcharts?')
		}


	}

	this.color= function(color, labelName){
		this.latestColor = color;

	}

	this.thickness= function(thickness,labelName){

		this.thick = thickness;
	}

	this.on = function(ev, cb){

		this.events[ev]= cb;

	}

	this.source= function(data, labelName){

		if(!labelName){
			labelName = this.allSources.length;
		}


		this.allSources[labelName]= data;

		this.whichLabel = labelName;

		this.colorValue[labelName] = this.latestColor;

		var series = data['data'];
		var xData = [];
		for(i in series){

			try{
				xData.push([new Date(series[i]['start']).getTime(),  parseInt(series[i]['count'])]);

				xData.push([new Date(series[i]['end']).getTime(),  parseInt(series[i]['count'])]);

			}
			catch(err){

				console.log('incorrect format from source JSON... is it glints?')
			}

		}

		var xData1= {'name':labelName, 'data':xData, 'color':this.colorValue[labelName]}
		for(i in this.allSeries){

			if(this.allSeries[i]['name'] == labelName){
				console.log('data incoming to amazingChart')
				this.events['new'](xData1)
				this.allSeries[i]=xData1;
				return false;
			}
		}
		this.allSeries.push(xData1);




	}

	this.interval = function(time1){

		var theThis = this;
		setInterval(function(){
			theThis.getNewData()
		}, time1)
	}

	this.getNewData = function(){


		for(i in this.allSeries){

			//each name get last date
			var lastTime = this.allSeries[i]['data'][(this.allSeries[i]['data'].length-1)][0];
			if(!this.lastTimes[i]){
				this.lastTimes[i] = lastTime;

			}
			else{

				if(lastTime > this.lastTimes[i]){

					//we have new data

					//cycle through the data for epochs and all that are greater, append them to the allSeries, thenupdate chart

					for(j in this.allSeries[i]['data'] ){

						if(this.allSeries[i]['data'][j][0] > this.lastTimes[i]){
							this.seriesUpdates[i].addPoint(this.allSeries[i]['data'][j]);
						}
					}

					this.lastTimes[i] = lastTime;
				}


			}
			console.log(lastTime)
		}
		console.log('looking for new data');
	}


	






}