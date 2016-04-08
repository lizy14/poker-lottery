var defaultConfig = {

	numberOfCards : 824,

	shuffleFadeOutDuration : 500,
	shuffleFadeOInDuration : 500,

	busySpeed : 30,

	timeBeforeGoFree : 30 * 1000,

	freeSpeed : 888,
	freeInterval : 4000,
	freeDelayBeforeClose : 1888,
	proportionOfFanWhenFree : 0.3,

	fans : [{
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				x : 25,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'left',
			origin : {
				x : 75,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'left',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 100,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 80,
			direction : 'left',
			origin : {
				x : 200,
				y : 50
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'left',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'right',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300,
			scatter : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 20,
			direction : 'left',
			origin : {
				x : 50,
				y : 200
			},
			center : false,
			translation : 300,
			scatter : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 130,
			direction : 'left',
			origin : {
				x : 25,
				y : 100
			},
			center : false
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 360,
			direction : 'left',
			origin : {
				x : 50,
				y : 90
			},
			center : false
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 330,
			direction : 'left',
			origin : {
				x : 50,
				y : 100
			},
			center : true
		}, {
			speed : 500,
			easing : 'ease-out',
			range : 90,
			direction : 'right',
			origin : {
				minX : 20,
				maxX : 80,
				y : 100
			},
			center : true,
			translation : 60,
			scatter : true
		},
	],
};
