function hist(id_, labels_, data_) {
    var ctx = document.getElementById(id_);
    myChart1 = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels_,
            datasets: [{
                label: ' ',
                data: data_,
                backgroundColor: "rgba(255,255,255,0.2)",
                borderColor: "white",
                borderWidth: 3,
                barThickness: 30,
                minBarLength: 50
            }]
        },
        options:{
        	layout: {
        		padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                },
                labels: {
                	fontSize: 20
                }
        	},
        	tooltips: {
        		titleFontSize: 24,
        		bodyFontSize: 20
        	},
        	legend: {
        		display: false
        	},
        	title: {
        		display: false
        	},
        	scales: {
        		yAxes: [{
        			fontSize: 20,
        			fontColor: "white",
        			barThickness: 30
        		}],
        		xAxes: [{
        			fontSize: 20,
        			fontColor: "white",
        			barThickness: 30
        		}]
        	},
        	animation: {
				duration: 2000
			}
        }
    });
}
var randomScalingFactor = function() {
	return Math.random() * 100;
};
function polar_area(id_) {
	var ctx2 = document.getElementById(id_);
	myChart2 = new Chart(ctx2, {
		type: "polarArea",
		data: {
			datasets: [{
				label: ' ',
				data: [
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
					randomScalingFactor(),
				],
				backgroundColor: [
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8',
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8',
					'#ed0202',
					'#ff6600',
					'#ffd000',
					'#a6ff00',
					'#00ffaa',
					'#00f2ff',
					'#0051ff',
					'#5900ff',
					'#c300ff',
					'#ff00c8'
				],
				borderColor: 'rgba(0,0,0,1)'
			}],
			labels: [
				'v1',
				'v2',
				'v3',
				'v4',
				'v5',
				'v6',
				'v7',
				'v8',
				'v9',
				'v10',
				'v11',
				'v12',
				'v13',
				'v14',
				'v15',
				'v16',
				'v17',
				'v18',
				'v19',
				'v20',
				'v21',
				'v22',
				'v23',
				'v24',
				'v25',
				'v26',
				'v27',
				'v28',
				'v29',
				'v30',
			]
		},
		options: {
			responsive: true,
			layout: {
        		padding: {
                    left: 20,
                    right: 20,
                    top: 0,
                    bottom: 0
                },
                labels: {
                	fontSize: 20
                }
        	},
        	tooltips: {
        		titleFontSize: 24,
        		bodyFontSize: 20
        	},
        	legend: {
        		position: 'left'
        	},
        	title: {
        		display: false
        	},
        	scale: {
				ticks: {
					beginAtZero: true,
					backdropColor: 'rgba(0,0,0,0)',
					showLabelBackdrop: true
				},
				reverse: false
			},
			animation: {
				animateRotate: false,
				animateScale: true,
				duration: 2000
			}
		}
	});
}


function moveToinfo(num) {
	let target_offset = $(`div.content__section:nth-child(${num})`).offset().top;
	$('html,body').animate({scrollTop: target_offset}, 1000);
}