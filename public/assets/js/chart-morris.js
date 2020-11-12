/**
* @Package: CryptoKit - Crypto Template & Dashboard
* @Version: 1.0.0
*/

jQuery(function($) {
    'use strict';
    var CRYPTOKIT_SETTINGS=window.CRYPTOKIT_SETTINGS || {}
    ;
    /*--------------------------------
        Morris Chart
     --------------------------------*/
    CRYPTOKIT_SETTINGS.chartMorris=function() {
        if($("#morris_area_graph").length) {
            /*Area Graph*/
            // Use Morris.Area instead of Morris.Line
            Morris.Area( {
                element: 'morris_area_graph', data: [ {
                    x: '2017 Q4', y: 3, z: 7
                }
                , {
                    x: '2018 Q1', y: 3, z: 4
                }
                , {
                    x: '2018 Q2', y: null, z: 1
                }
                , {
                    x: '2018 Q3', y: 2, z: 5
                }
                , {
                    x: '2018 Q4', y: 8, z: 2
                }
                , {
                    x: '2018 Q1', y: 4, z: 4
                }
                ], resize: true, redraw: true, xkey: 'x', ykeys: ['y', 'z'], labels: ['Y', 'Z'], lineColors: ['#e8962e', '#f46e0f'], pointFillColors: ['#f46e0f']
            }
            ).on('click', function(i, row) {
                console.log(i, row);
            }
            );
        }
        
        if($("#morris_bar_graph").length) {
            /*Bar Graph*/
            // Use Morris.Bar
            Morris.Bar( {
                element: 'morris_bar_graph', data: [ {
                    x: '2018 Q1', y: 3, z: 2, a: 3
                }
                , {
                    x: '2018 Q2', y: 2, z: null, a: 1
                }
                , {
                    x: '2018 Q3', y: 0, z: 2, a: 4
                }
                , {
                    x: '2018 Q4', y: 2, z: 4, a: 3
                }
                ], resize: true, redraw: true, xkey: 'x', ykeys: ['y', 'z', 'a'], labels: ['Y', 'Z', 'A'], barColors: ['#e8962e', '#3F51B5', '#f46e0f']
            }
            ).on('click', function(i, row) {
                console.log(i, row);
            }
            );
        }

        if($("#morris-area-chart").length) {
          
            Morris.Bar( {
                element: 'morris-area-chart',
                data: [ {
                        "period": "2018-09-27",
                        Total: 100,
                        Pending: 70,
                        Ready: 30
                    }, {
                        "period": "2018-09-24",
                        Total: 75,
                        Pending: 65,
                        Ready: 40
                    }, {
                        "period": "2018-09-21",
                        Total: 140,
                        Pending: 80,
                        Ready: 35
                    }, {
                        "period": "2018-09-19",
                        Total: 180,
                        Pending: 110,
                        Ready: 70
                    }, {
                        "period": "2018-09-16",
                        Total: 150,
                        Pending: 40,
                        Ready: 120
                    }, {
                        "period": "2018-09-13",
                        Total: 125,
                        Pending: 80,
                        Ready: 40
                    }, {
                        "period": "2018-09-10",
                        Total: 110,
                        Pending: 75,
                        Ready: 40
                    }

                ],
                xkey: 'period',
                ykeys: [ 'Total', 'Pending', 'Ready' ],
                labels: [ 'Total Earnings', 'Pending Earnings', 'Ready to Payout' ],
                pointSize: 3,
                fillOpacity: 0,
                barColors: [ '#26DAD2', '#4680ff', '#fc6180' ],
                behaveLikeLine: true,
                gridLineColor: '#e0e0e0',
                lineWidth: 3,
                hideHover: 'auto',
                lineColors: [ '#26DAD2', '#4680ff', '#fc6180' ],
                resize: true

            } 
            );
        }

        if($("#morris_line_graph").length) {
            /*Line Graph*/
            /* data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type */
            var day_data=[ {
                "period": "2018-10-01", "licensed": 5000, "sorned": 2660
            }
            , {
                "period": "2018-09-30", "licensed": 3784, "sorned": 1655
            }
            , {
                "period": "2018-09-29", "licensed": 2536, "sorned": 1732
            }
            , {
                "period": "2018-09-20", "licensed": 4782, "sorned": 2661
            }
            , {
                "period": "2018-09-19", "licensed": 2212, "sorned": 1230
            }
            , {
                "period": "2018-09-18", "licensed": 4898, "sorned": 2738
            }
            , {
                "period": "2018-09-17", "licensed": 3171, "sorned": 1238
            }
            , {
                "period": "2018-09-16", "licensed": 3171, "sorned": 2676
            }
            , {
                "period": "2018-09-15", "licensed": 3974, "sorned": 989
            }
            , {
                "period": "2018-09-10", "licensed": 4676, "sorned": 3100
            }
            ];
            Morris.Line( {
                element: 'morris_line_graph', data: day_data, resize: true, xkey: 'period', ykeys: ['licensed', 'sorned'], labels: ['Registered', 'Purchase'], lineColors: ['#e8962e', '#3F51B5'], pointFillColors: ['#f46e0f']
            }
            );
        }
        if($("#morris_donut_graph").length) {
            /*Donut Graph*/
            Morris.Donut( {
                element: 'morris_donut_graph', data: [ {
                    value: 45, label: 'active deals'
                }
                , {
                    value: 55, label: 'unconfiremed'
                }
                ], resize: true, redraw: true, backgroundColor: '#ffffff', labelColor: '#999999', colors: [ "40-#e8962e-#e45131:70-#e45131-#e45131:90-#e45131", '#f7f7f7']
            }
            );
        }
        if($("#morris_negative_graph").length) {
            /*Negative Line Graph*/
            var neg_data=[ {
                "period": "2018-08-12", "a": 100
            }
            , {
                "period": "2018-03-03", "a": 75
            }
            , {
                "period": "2017-08-08", "a": 50
            }
            , {
                "period": "2017-05-10", "a": 25
            }
            , {
                "period": "2017-03-14", "a": 0
            }
            , {
                "period": "2017-01-10", "a": -25
            }
            , {
                "period": "2009-12-10", "a": -50
            }
            , {
                "period": "2009-10-07", "a": -75
            }
            , {
                "period": "2009-09-25", "a": -100
            }
            ];
            Morris.Line( {
                element: 'morris_negative_graph', data: neg_data, resize: true, redraw: true, xkey: 'period', ykeys: ['a'], labels: ['Series A'], lineColors: ['#e8962e', '#3F51B5'], units: '%'
            }
            );
        }
        if($("#morris_nogrid_graph").length) {
            /*No Grid Line Graph*/
            /* data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type */
            var day_data=[ {
                "period": "2018-10-01", "licensed": 3407, "sorned": 660
            }
            , {
                "period": "2018-09-30", "licensed": 3351, "sorned": 629
            }
            , {
                "period": "2018-09-29", "licensed": 3269, "sorned": 618
            }
            , {
                "period": "2018-09-20", "licensed": 3246, "sorned": 661
            }
            , {
                "period": "2018-09-19", "licensed": 3257, "sorned": 667
            }
            , {
                "period": "2018-09-18", "licensed": 3248, "sorned": 627
            }
            , {
                "period": "2018-09-17", "licensed": 3171, "sorned": 660
            }
            , {
                "period": "2018-09-16", "licensed": 3171, "sorned": 676
            }
            , {
                "period": "2018-09-15", "licensed": 3201, "sorned": 656
            }
            , {
                "period": "2018-09-10", "licensed": 3215, "sorned": 622
            }
            ];
            Morris.Line( {
                element: 'morris_nogrid_graph', grid: false, resize: true, redraw: true, data: day_data, xkey: 'period', ykeys: ['licensed', 'sorned'], labels: ['Licensed', 'SORN'], lineColors: ['#e8962e', '#3F51B5']
            }
            );
        }
        if($("#morris_noncontinuous_graph").length) {
            /*Non Continuous Line Graph*/
            /* data stolen from http://howmanyleft.co.uk/vehicle/jaguar_'e'_type */
            var day_data=[ {
                "period": "2018-10-01", "licensed": 3407
            }
            , {
                "period": "2018-09-30", "sorned": 0
            }
            , {
                "period": "2018-09-29", "sorned": 618
            }
            , {
                "period": "2018-09-20", "licensed": 3246, "sorned": 661
            }
            , {
                "period": "2018-09-19", "licensed": 3257, "sorned": null
            }
            , {
                "period": "2018-09-18", "licensed": 3248, "other": 1000
            }
            , {
                "period": "2018-09-17", "sorned": 0
            }
            , {
                "period": "2018-09-16", "sorned": 0
            }
            , {
                "period": "2018-09-15", "licensed": 3201, "sorned": 656
            }
            , {
                "period": "2018-09-10", "licensed": 3215
            }
            ];
            Morris.Line( {
                element: 'morris_noncontinuous_graph', data: day_data, resize: true, redraw: true, xkey: 'period', ykeys: ['licensed', 'sorned', 'other'], labels: ['Licensed', 'SORN', 'Other'], lineColors: ['#e8962e', '#3F51B5'], /* custom label formatting with `xLabelFormat` */
                xLabelFormat: function(d) {
                    return (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
                }
                , /* setting `xLabels` is recommended when using xLabelFormat */
                xLabels: 'day'
            }
            );
        }
        if($("#morris_stackedbar_graph").length) {
            /* Stacked Bar Graph*/
            // Use Morris.Bar
            Morris.Bar( {
                element: 'morris_stackedbar_graph', data: [ {
                    x: '2018 Q1', y: 3, z: 2, a: 3
                }
                , {
                    x: '2018 Q2', y: 2, z: null, a: 1
                }
                , {
                    x: '2018 Q3', y: 0, z: 2, a: 4
                }
                , {
                    x: '2018 Q4', y: 2, z: 4, a: 3
                }
                ], resize: true, redraw: true, xkey: 'x', ykeys: ['y', 'z', 'a'], labels: ['Y', 'Z', 'A'], barColors: ['#e8962e', '#3F51B5', '#f46e0f'], stacked: true
            }
            );
        }
    };


    /*--------------------------------
        Sparkline Chart
     --------------------------------*/
    CRYPTOKIT_SETTINGS.dbSparklineChart = function() {

        if ($.isFunction($.fn.sparkline)) {

            $('.db_dynamicbar').sparkline([6.2, 8.4, 8.8, 8, 9.2, 8.8, 8, 7.5, 5.2, 9.9, 9, 9, 8.4, 9, 8.8, 8, 9.5, 9.2, 9.9, 9, 9,8, 7.1, 9, 9, 9.5, 8, 9.5, 9.8], {
                type: 'bar',
                barColor: '#e77512',
                height: '80',
                barWidth: '10',
                barSpacing: 1,
            });

            $('.sparklinedash').sparkline([ 10, 5, 6, 10, 9, 12, 4, 9, 7.5, 5.2, 9.9, 9, 9, 8.4], {
                type: 'bar',
                height: '60',
                barWidth: '4',
                resize: true,
                barSpacing: '5',
                barColor: '#fb9678'
            });
            $('.sparklinedash2').sparkline([ 7, 5, 6, 10, 9, 12, 7, 9, 6.2, 8.4, 8.8, 8, 9.2, 8.8], {
                type: 'bar',
                height: '60',
                barWidth: '4',
                resize: true,
                barSpacing: '5',
                barColor: '#ab8ce4'
            });
            $(".crypto1").sparkline([2,4,4,6,8,5,6,4,8,6,6,2 ], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#13dafe',
                fillColor: 'rgba(19, 218, 254, 0.3)',
                maxSpotColor: '#99d683',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });
            $('.crypto2').sparkline([0,13,10,14,15,10,18,20,19], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#6164c1',
                fillColor: 'rgba(97, 100, 193, 0.3)',
                highlightLineColor: 'rgba(0,0,0,.1)',
                highlightSpotColor: 'rgba(0,0,0,.2)'
            });
            $(".crypto3").sparkline([0,2,8,6,8,5,6,4,8,6,6,2 ], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#fa8282',
                fillColor: 'rgba(255,211,152,.8)',
                minSpotColor:'#13dafe',
                maxSpotColor: '#13dafe',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#13dafe'
            });
            $(".crypto4").sparkline([3,7,5,6,8,7,6,7,8,6,6,9 ], {
                type: 'line',
                width: '100%',
                height: '60',
                lineColor: '#13dafe',
                fillColor: 'rgba(153,214,131,.7)',
                minSpotColor:'#13dafe',
                maxSpotColor: '#13dafe',
                highlightLineColor: 'rgba(0, 0, 0, 0.2)',
                highlightSpotColor: '#13dafe'
            });
             $('.sparkline15').sparkline([5, 6, 2, 8, 9, 4, 7, 10, 11, 12, 10, 9, 4, 7], {
                type: 'bar',
                height: '235',
                barWidth: '10',
                barSpacing: '10',
                barColor: '#13dafe'
            });

            $('.db_linesparkline').sparkline([2000, 3454, 5454, 2323, 3432, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 4656, 2897, 3545, 4232, 5434, 4656, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 3567, 4878, 3676, 3787], {
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#e77512',
                fillColor: 'rgba(255,255,255,0.2)',
                highlightSpotColor: '#3F51B5',
                highlightLineColor: '#3F51B5',
                spotRadius: 3,
            });

            $('.db_linesparkline2').sparkline([3545, 4232, 5434, 4656, 4656, 2897, 3545, 4232, 5434, 2000, 3454, 5454, 2323, 3432, 2323, 3432, 4656, 2897, 4656, 2323, 3432, 4656, 2897, 3545, 4232, 5434, 4656, 3567, 4878, 3676, 3787], {
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#ffb426',
                fillColor: 'rgba(255,255,255,0.2)',
                highlightSpotColor: '#ffb426',
                highlightLineColor: '#ffb426',
                spotRadius: 3,
            });


            // Bar + line composite charts
            $('.db_compositebar').sparkline([4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7,7, 4, 3, 1, 4, 6, 5, 9], {
                type: 'bar',
                barColor: '#3F51B5',
                height: '80',
                barWidth: '10',
                barSpacing: 1,
            });

            $('.db_compositebar').sparkline([4, 1, 5, 7, 9, 9, 8, 8, 4, 7, 9, 4, 6, 7, 7, 4, 3, 2, 4, 6, 7, 9, 8, 8, 4, 2, 5, 6, 7], {
                composite: true,
                fillColor: 'rgba(103,58,183,0)',
                type: 'line',
                width: '100%',
                height: '80',
                lineWidth: 2,
                lineColor: '#ffb426',
                highlightSpotColor: '#E91E63',
                highlightLineColor: '#ffb426',
                spotRadius: 3,
            });

        }

    };

    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        CRYPTOKIT_SETTINGS.chartMorris();
        CRYPTOKIT_SETTINGS.dbSparklineChart();
    }
    );
    $(window).resize(function() {
        CRYPTOKIT_SETTINGS.dbSparklineChart();
    }
    );
    $(window).load(function() {}
    );
}

);