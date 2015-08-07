# AmazingChart.js

 Easy way to render real-time charts with custom callbacks

## Installation

For this to work, you will need jQuery, HighCharts and AmazingChart.js (all inclused in the amazingJS folder in this directory)

## Usage

Create an amazing chart object: `c = new amazingChart();`

Stylize the fist line and give it a name: `c.color('green', 'users');`

Add a JSON source to get the data from, along with the label name for the first line of data: `c.source(exData, 'users');`

Draw the chart to an element on the page: `c.render('#example');`

Set an interval to check for updates or new source method calls: `c.interval(1000);`

Add an event listener to get new data and set your own callback to do something: 
```
			c.on('new', function(data){
				
				console.log(data);

			})

```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## History

Initial commit for Glints

## Credits

@itsdeshazer
@codecloudme

## License

MIT
Open-source