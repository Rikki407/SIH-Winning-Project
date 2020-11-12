/**
 * @Package: Complete Admin Responsive Theme
 * @Since: Complete Admin 1.0
 * This file is part of Complete Admin Responsive Theme.
 */


jQuery(function($) {

    'use strict';

    var CRYPTONIA_SETTINGS = window.CRYPTONIA_SETTINGS || {};




    /*--------------------------------
         Window Based Layout
     --------------------------------*/
    CRYPTONIA_SETTINGS.dashboardEcharts = function() {


        /*------------- Chart 1 ----------------*/

      // Initialize after dom ready
       var myChart = echarts.init(document.getElementById('browser_type')); 
        
        var option = {

                // Setup grid
                grid: {
                    zlevel: 0,
                    x: 20,
                    x2: 20,
                    y: 20,
                    y2: 20,
                    borderWidth: 0,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { 
                        type: 'shadow', // line|shadow
                        lineStyle:{color: 'rgba(0,0,0,.5)', width: 1},
                        shadowStyle:{color: 'rgba(0,0,0,.1)'}
                      }
                },

                // Add legend
                legend: {
                    data: []
                },
                toolbox: {
                  orient: 'vertical',
                    show : true,
                    showTitle: true,
                    color : ['#bdbdbd','#bdbdbd','#bdbdbd','#bdbdbd'],
                    
                },

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['Dec','Jan','Feb','Mar','Apr'],
                    axisLine: {
                        show: true,
                        onZero: true,
                        lineStyle: {
                            color: '#4d9cf8',
                            type: 'solid',
                            width: '2',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowBlur: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                        },
                    },                    
                    axisTick: {
                        show: true,
                    },
                    splitLine: {
                          show: false,
                          lineStyle: {
                              color: '#fff',
                              type: 'solid',
                              width: 0,
                              shadowColor: 'rgba(0,0,0,0)',
                        },
                    },
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    splitLine: {
                          show: false,
                          lineStyle: {
                              color: 'fff',
                              type: 'solid',
                              width: 0,
                              shadowColor: 'rgba(0,0,0,0)',
                        },
                    },
                    axisLabel: {
                        show: false,
                    },                    
                    axisTick: {
                        show: false,
                    },                    
                    axisLine: {
                        show: false,
                        onZero: true,
                        lineStyle: {
                            color: '#ff0000',
                            type: 'solid',
                            width: '0',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowBlur: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                        },
                    },


                }],

                // Add series
                series: [
                    {
                        name: 'Total Orders',
                        type: 'line',
                        smooth: true,
                        symbol:'none',
                        symbolSize:2,
                        showAllSymbol: true,
                        itemStyle: {
                          normal: {
                            color:'#4d9cf8', 
                            borderWidth:4, borderColor:'#4d9cf8', 
                            areaStyle: {color:'#4d9cf8', type: 'default'}
                          }
                        },

                        data: [500,670,510,312,619]
                    }]
            };

        // Load data into the ECharts instance 
        myChart.setOption(option); 






        /*-------------- Chart 2 ---------------*/

// Initialize after dom ready
        var myChart = echarts.init(document.getElementById('user_type')); 
        
        var option = {

                // Setup grid
                grid: {
                    zlevel: 0,
                    x: 30,
                    x2: 55,
                    y: 20,
                    y2: 20,
                    borderWidth: 0,
                    backgroundColor: 'rgba(0,0,0,0)',
                    borderColor: 'rgba(0,0,0,0)',
                },

                // Add tooltip
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { 
                        type: 'shadow', // line|shadow
                        lineStyle:{color: 'rgba(0,0,0,.5)', width: 1},
                        shadowStyle:{color: 'rgba(0,0,0,.1)'}
                      }
                },

                // Add legend
                legend: {
                    data: []
                },
                toolbox: {
                  orient: 'vertical',
                    show : true,
                    showTitle: true,
                    color : ['#2698e2','#2698e2','#2698e2','#2698e2'],
                    
                },

                // Enable drag recalculate
                calculable: true,

                // Horizontal axis
                xAxis: [{
                    type: 'category',
                    boundaryGap: false,
                    data: ['2018-06-01','2018-05','2018-04-01','2018-03-01','2018-02-01'],
                    axisLine: {
                        show: true,
                        onZero: true,
                        lineStyle: {
                            color: 'rgba(63,81,181,1.0)',
                            type: 'solid',
                            width: '2',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowBlur: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                        },
                    },                    
                    axisTick: {
                        show: false,
                    },
                    splitLine: {
                          show: false,
                          lineStyle: {
                              color: '#fff',
                              type: 'solid',
                              width: 0,
                              shadowColor: 'rgba(0,0,0,0)',
                        },
                    },
                }],

                // Vertical axis
                yAxis: [{
                    type: 'value',
                    splitLine: {
                          show: false,
                          lineStyle: {
                              color: 'fff',
                              type: 'solid',
                              width: 0,
                              shadowColor: 'rgba(0,0,0,0)',
                        },
                    },
                    axisLabel: {
                        show: false,
                    },                    
                    axisTick: {
                        show: false,
                    },                    
                    axisLine: {
                        show: false,
                        onZero: true,
                        lineStyle: {
                            color: '#E91E63',
                            type: 'solid',
                            width: '0',
                            shadowColor: 'rgba(0,0,0,0)',
                            shadowBlur: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                        },
                    },


                }],

                // Add series
                series: [
                    {
                        name: 'Operation Failure',
                        type: 'bar',
                        smooth: true,
                        symbol:'none',
                        symbolSize:2,
                        showAllSymbol: true,
                        barWidth:15,
                        barGap:'10%',
                        itemStyle: {
                          normal: {
                            color:'#faa9a4', 
                            borderWidth:0, borderColor:'#faa9a4', 
                            areaStyle: {color:'rgba(63,81,181,1)', type: 'default'}
                          }
                        },

                        data: [38,32,44,35,30]
                    },
                    {
                        name: 'Operation Success',
                        type: 'bar',
                        smooth: true,
                        symbol:'none',
                        symbolSize:2,
                        showAllSymbol: true,
                        barWidth:15,
                        barGap:'10%',
                        itemStyle: {
                          normal: {
                            color:'#87d1f7', 
                            borderWidth:2, borderColor:'#87d1f7', 
                            areaStyle: {color:'#87d1f7', type: 'default'}
                          }
                        },

                        data: [356,267,195,323,343]
                    },
                ]
            };

        // Load data into the ECharts instance 
        myChart.setOption(option); 


//clearInterval(timeTicket);

    }



    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        CRYPTONIA_SETTINGS.dashboardEcharts();
    });

    $(window).resize(function() {
        CRYPTONIA_SETTINGS.dashboardEcharts();
    });

    $(window).load(function() {});

});