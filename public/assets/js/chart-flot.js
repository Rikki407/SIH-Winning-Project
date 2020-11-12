/**
 * @Package: CryptoKit - Crypto Template & Dashboard
 * @Version: 1.0.0
 */

jQuery(function($) {

    'use strict';

    var CRYPTOKIT_SETTINGS = window.CRYPTOKIT_SETTINGS || {};

    /*--------------------------------
        Flot Chart
     --------------------------------*/
    CRYPTOKIT_SETTINGS.chartFlot = function() {

        /*------------------ Real Time ------------------------*/
        if ($("#flot-realtime").length) {
            // We use an inline data source in the example, usually data would
            // be fetched from a server

            var rtdata = [],
                totalPoints = 300;

            function RealTimegetRandomData() {

                if (rtdata.length > 0)
                    rtdata = rtdata.slice(1);

                // Do a random walk

                while (rtdata.length < totalPoints) {

                    var prev = rtdata.length > 0 ? rtdata[rtdata.length - 1] : 50,
                        y = prev + Math.random() * 10 - 5;

                    if (y < 0) {
                        y = 0;
                    } else if (y > 100) {
                        y = 100;
                    }

                    rtdata.push(y);
                }

                // Zip the generated y values with the x values

                var res = [];
                for (var i = 0; i < rtdata.length; ++i) {
                    res.push([i, rtdata[i]])
                }

                return res;
            }

            // Set up the control widget

            var updateInterval = 100;
            $("#updateInterval").val(updateInterval).change(function() {
                var v = $(this).val();
                if (v && !isNaN(+v)) {
                    updateInterval = +v;
                    if (updateInterval < 1) {
                        updateInterval = 1;
                    } else if (updateInterval > 2000) {
                        updateInterval = 2000;
                    }
                    $(this).val("" + updateInterval);
                }
            });

            var realplot = $.plot("#flot-realtime", [RealTimegetRandomData()], {
                series: {
                    shadowSize: 0 // Drawing is faster without shadows
                },
                yaxis: {
                    min: 0,
                    max: 100
                },
                xaxis: {
                    show: false
                },
                colors: ["#e8962e"],
                grid: {
                    tickColor: "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#eaeaea"
                },
            });

            function realtimeupdate() {

                realplot.setData([RealTimegetRandomData()]);

                // Since the axes don't change, we don't need to call realplot.setupGrid()

                realplot.draw();
                setTimeout(realtimeupdate, updateInterval);
            }

            realtimeupdate();

        }

        /*------------------------ Series Pie -----------------------*/

        /*------------------ Series Toggle ---------------------*/

        if ($("#flot-toggle").length) {
            var togdatasets = {
                "Burger": {
                    label: "Burger",
                    data: [
                        [2001, 483994],
                        [2002, 479060],
                        [2003, 457648],
                        [2004, 401949],
                        [2005, 424705],
                        [2006, 402375],
                        [2006, 377867],
                        [2007, 357382],
                        [2008, 337946],
                        [2009, 336185],
                        [2010, 328611],
                        [2011, 329421],
                        [2012, 342172],
                        [2013, 344932],
                        [2014, 387303],
                        [2015, 440813],
                        [2016, 480451],
                        [2017, 504638],
                        [2018, 528692]
                    ]
                },
                "French Fry": {
                    label: "French Fry",
                    data: [
                        [2001, 218000],
                        [2002, 203000],
                        [2003, 171000],
                        [2004, 42500],
                        [2005, 37600],
                        [2006, 36600],
                        [2007, 21700],
                        [2008, 19200],
                        [2009, 21300],
                        [2010, 13600],
                        [2011, 14000],
                        [2012, 19100],
                        [2013, 21300],
                        [2014, 23600],
                        [2015, 25100],
                        [2016, 26100],
                        [2017, 31100],
                        [2018, 34700]
                    ]
                },
                "Soft Drinks": {
                    label: "Soft Drinks",
                    data: [
                        [2001, 62027],
                        [2002, 60696],
                        [2003, 62348],
                        [2004, 58560],
                        [2005, 56393],
                        [2006, 54579],
                        [2007, 50818],
                        [2008, 50554],
                        [2009, 48276],
                        [2010, 47691],
                        [2011, 47529],
                        [2012, 47778],
                        [2013, 48760],
                        [2014, 50949],
                        [2015, 57452],
                        [2016, 60234],
                        [2017, 60076],
                        [2018, 59213]
                    ]
                },
                "Pizza": {
                    label: "Pizza",
                    data: [
                        [2001, 55475],
                        [2002, 58464],
                        [2003, 55134],
                        [2004, 52436],
                        [2005, 47139],
                        [2006, 43962],
                        [2007, 43238],
                        [2008, 42395],
                        [2009, 40854],
                        [2010, 40993],
                        [2011, 41822],
                        [2012, 41147],
                        [2013, 40474],
                        [2014, 40604],
                        [2015, 40044],
                        [2016, 38816],
                        [2017, 38060],
                        [2018, 36984]
                    ]
                },
                "Kebab Sandwich": {
                    label: "Kebab Sandwich",
                    data: [
                        [2001, 3719],
                        [2002, 3722],
                        [2003, 3789],
                        [2004, 3720],
                        [2005, 3730],
                        [2006, 3636],
                        [2007, 3598],
                        [2008, 3610],
                        [2009, 3655],
                        [2010, 3695],
                        [2011, 3673],
                        [2012, 3553],
                        [2013, 3774],
                        [2014, 3728],
                        [2015, 3618],
                        [2016, 3638],
                        [2017, 3467],
                        [2018, 3770]
                    ]
                },
                "Dounts": {
                    label: "Dounts",
                    data: [
                        [2001, 6474],
                        [2002, 6605],
                        [2003, 6209],
                        [2004, 6035],
                        [2005, 6020],
                        [2006, 6000],
                        [2007, 6018],
                        [2008, 3958],
                        [2009, 5780],
                        [2010, 5954],
                        [2011, 6178],
                        [2012, 6411],
                        [2013, 5993],
                        [2014, 5833],
                        [2015, 5791],
                        [2016, 5450],
                        [2017, 5521],
                        [2018, 5271]
                    ]
                },
                "Icecream": {
                    label: "Icecream",
                    data: [
                        [2001, 54498],
                        [2002, 54535],
                        [2003, 54398],
                        [2004, 54766],
                        [2005, 54441],
                        [2006, 54670],
                        [2007, 54217],
                        [2008, 54275],
                        [2009, 54203],
                        [2010, 54482],
                        [2011, 54506],
                        [2012, 54358],
                        [2013, 54385],
                        [2014, 55269],
                        [2015, 55066],
                        [2016, 55194],
                        [2017, 45887],
                        [2018, 54891]
                    ]
                }
            };

            // hard-code color indices to prevent them from shifting as
            // countries are turned on/off

            var i = 0;
            $.each(togdatasets, function(key, val) {
                val.color = i;
                ++i;
            });

            // insert checkboxes 
            var choiceContainer = $("#choices");
            $.each(togdatasets, function(key, val) {
                choiceContainer.append("<br/><input class='iCheck' type='checkbox' name='" + key +
                    "' checked='checked' id='id" + key + "'></input>" +
                    "<label class='form-label' for='id" + key + "'>" + val.label + "</label>");
            });

            // if icheck is not applied, then use this code below
            //choiceContainer.find("input").click(plotAccordingToChoices);

            if ($.isFunction($.fn.iCheck)) {
                $('#choices input').on('ifChanged', function(event) {
                    plotAccordingToChoices();
                });
            }

            function plotAccordingToChoices() {

                var data = [];

                choiceContainer.find("input:checked").each(function() {
                    var key = $(this).attr("name");
                    if (key && togdatasets[key]) {
                        data.push(togdatasets[key]);
                    }
                });

                if (data.length > 0) {
                    $.plot("#flot-toggle", data, {
                        yaxis: {
                            min: 0
                        },
                        xaxis: {
                            tickDecimals: 0
                        },
                        series: {
                            shadowSize: 0 // Drawing is faster without shadows
                        },
                        colors: ["#f46e0f", "#e8962e", "#E91E63", "#FFC107", "#797979"],
                        grid: {
                            tickColor: "#f5f5f5",
                            borderWidth: 1,
                            borderColor: "#eaeaea"
                        },

                    });
                }
            }

            plotAccordingToChoices();

        }

        /*------------------- Tracking -------------------------*/

        if ($("#flot-track").length) {

            var sin = [],
                cos = [];
            for (var i = 0; i < 14; i += 0.1) {
                sin.push([i, Math.sin(i)]);
                cos.push([i, Math.cos(i)]);
            }

            var trackplot = $.plot("#flot-track", [{
                data: sin,
                label: "sin(x) = -0.00"
            }, {
                data: cos,
                label: "cos(x) = -0.00"
            }], {
                series: {
                    lines: {
                        show: true
                    }
                },
                crosshair: {
                    mode: "x"
                },
                grid: {
                    hoverable: true,
                    autoHighlight: true,
                    tickColor: "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#eaeaea"
                },
                yaxis: {
                    min: -1.2,
                    max: 1.2
                },
                colors: ["#f46e0f", "#e8962e", "#E91E63", "#FFC107", "#797979"],
            });

            var legends = $("#flot-track .legendLabel");

            legends.each(function() {
                // fix the widths so they don't jump around
                $(this).css('width', $(this).width());
            });

            var updateLegendTimeout = null;
            var latestPosition = null;

            function updateLegend() {

                updateLegendTimeout = null;

                var pos = latestPosition;

                var axes = trackplot.getAxes();
                if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max ||
                    pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) {
                    return;
                }

                var i, j, trackdataset = trackplot.getData();
                for (i = 0; i < trackdataset.length; ++i) {

                    var series = trackdataset[i];

                    // Find the nearest points, x-wise

                    for (j = 0; j < series.data.length; ++j) {
                        if (series.data[j][0] > pos.x) {
                            break;
                        }
                    }

                    // Now Interpolate

                    var y,
                        p1 = series.data[j - 1],
                        p2 = series.data[j];

                    if (p1 == null) {
                        y = p2[1];
                    } else if (p2 == null) {
                        y = p1[1];
                    } else {
                        y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);
                    }

                    legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
                }
            }

            $("#flot-track").bind("plothover", function(event, pos, item) {
                latestPosition = pos;
                if (!updateLegendTimeout) {
                    updateLegendTimeout = setTimeout(updateLegend, 50);
                }
            });

        }

        /*------------------- Visitor -------------------------*/
        if ($("#flot-visitors").length) {

            var visitd = [
                [1196463600000, 0],
                [1196550000000, 0],
                [1196636400000, 0],
                [1196722800000, 77],
                [1196809200000, 3636],
                [1196895600000, 3575],
                [1196982000000, 2736],
                [1197068400000, 1086],
                [1197154800000, 676],
                [1197241200000, 1205],
                [1197327600000, 906],
                [1197414000000, 710],
                [1197500400000, 639],
                [1197586800000, 540],
                [1197673200000, 435],
                [1197759600000, 301],
                [1197846000000, 575],
                [1197932400000, 481],
                [1198018800000, 591],
                [1198105200000, 608],
                [1198191600000, 459],
                [1198278000000, 234],
                [1198364400000, 1352],
                [1198450800000, 686],
                [1198537200000, 279],
                [1198623600000, 449],
                [1198710000000, 468],
                [1198796400000, 392],
                [1198882800000, 282],
                [1198969200000, 208],
                [1199055600000, 229],
                [1199142000000, 177],
                [1199228400000, 374],
                [1199314800000, 436],
                [1199401200000, 404],
                [1199487600000, 253],
                [1199574000000, 218],
                [1199660400000, 476],
                [1199746800000, 462],
                [1199833200000, 448],
                [1199919600000, 442],
                [1200006000000, 403],
                [1200092400000, 204],
                [1200178800000, 194],
                [1200265200000, 327],
                [1200351600000, 374],
                [1200438000000, 507],
                [1200524400000, 546],
                [1200610800000, 482],
                [1200697200000, 283],
                [1200783600000, 221],
                [1200870000000, 483],
                [1200956400000, 523],
                [1201042800000, 528],
                [1201129200000, 483],
                [1201215600000, 452],
                [1201302000000, 270],
                [1201388400000, 222],
                [1201474800000, 439],
                [1201561200000, 559],
                [1201647600000, 521],
                [1201734000000, 477],
                [1201820400000, 442],
                [1201906800000, 252],
                [1201993200000, 236],
                [1202079600000, 525],
                [1202166000000, 477],
                [1202252400000, 386],
                [1202338800000, 409],
                [1202425200000, 408],
                [1202511600000, 237],
                [1202598000000, 193],
                [1202684400000, 357],
                [1202770800000, 414],
                [1202857200000, 393],
                [1202943600000, 353],
                [1203030000000, 364],
                [1203116400000, 215],
                [1203202800000, 214],
                [1203289200000, 356],
                [1203375600000, 399],
                [1203462000000, 334],
                [1203548400000, 348],
                [1203634800000, 243],
                [1203721200000, 126],
                [1203807600000, 157],
                [1203894000000, 288]
            ];

            // first correct the timestamps - they are recorded as the daily
            // midnights in UTC+0100, but Flot always displays dates in UTC
            // so we have to add one hour to hit the midnights in the plot

            for (var i = 0; i < visitd.length; ++i) {
                visitd[i][0] += 60 * 60 * 1000;
            }

            // helper for returning the weekends in a period

            function weekendAreas(axes) {

                var markings = [],
                    d = new Date(axes.xaxis.min);

                // go to the first Saturday

                d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
                d.setUTCSeconds(0);
                d.setUTCMinutes(0);
                d.setUTCHours(0);

                var i = d.getTime();

                // when we don't set yaxis, the rectangle automatically
                // extends to infinity upwards and downwards

                do {
                    markings.push({
                        xaxis: {
                            from: i,
                            to: i + 2 * 24 * 60 * 60 * 1000
                        }
                    });
                    i += 7 * 24 * 60 * 60 * 1000;
                } while (i < axes.xaxis.max);

                return markings;
            }

            var options = {
                xaxis: {
                    mode: "time",
                    tickLength: 5
                },
                selection: {
                    mode: "x"
                },
                colors: ["#f46e0f", "#e8962e", "#E91E63", "#FFC107", "#797979"],
                grid: {
                    markings: weekendAreas,
                    tickColor: "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#eaeaea"
                }

            };

            var visitplot = $.plot("#flot-visitors", [visitd], options);

            var overview = $.plot("#flot-visit-overview", [visitd], {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 1
                    },
                    shadowSize: 0
                },
                xaxis: {
                    ticks: [],
                    mode: "time"
                },
                yaxis: {
                    ticks: [],
                    min: 0,
                    autoscaleMargin: 0.1
                },
                selection: {
                    mode: "x"
                },
                colors: ["#f46e0f", "#e8962e", "#E91E63", "#FFC107", "#797979"],
                grid: {
                    tickColor: "#f5f5f5",
                    borderWidth: 1,
                    borderColor: "#eaeaea"
                }

            });

            // now connect the two

            $("#flot-visitors").bind("plotselected", function(event, ranges) {

                // do the zooming
                $.each(visitplot.getXAxes(), function(_, axis) {
                    var opts = axis.options;
                    opts.min = ranges.xaxis.from;
                    opts.max = ranges.xaxis.to;
                });
                visitplot.setupGrid();
                visitplot.draw();
                visitplot.clearSelection();

                // don't fire event on the overview to prevent eternal loop

                overview.setSelection(ranges, true);
            });

            $("#flot-visit-overview").bind("plotselected", function(event, ranges) {
                visitplot.setSelection(ranges);
            });

        }

        /* ------------------ Area Chart ------------------------*/
        if ($("#demoarea-chart #demoarea-container").length) {

            var data7_1 = [
                [1354586111100, 230],
                [1354587111100, 277],
                [1354588111100, 235],
                [1354589111100, 287],
                [1354590000000, 210],
                [1354591111100, 276],
                [1354592111100, 340],
                [1354593111100, 324],
                [1354594111100, 290],
                [1354595111100, 329],
                [1354596111100, 389],
                [1354597111100, 336]
            ];

            $.plot($("#demoarea-chart #demoarea-container"), [{
                data: data7_1,
                label: "Visits month",
                lines: {
                    fill: true
                }
            }], {
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: { colors: [{ opacity: 0.001 }, { opacity: 0.7}] }
                    },
                    points: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 9
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                legend: {
                    show: true,
                    position: 'nw'
                },
                colors: ['#3187bf', '#009688'],
                tooltip: false,
                tooltipOpts: {
                    defaultTheme: false
                },
                xaxis: {
                    axisLabel: "Month",
                    mode: "time",
                },
                yaxes: [{

                }]
            });

        }



        /* ------------------ Area Chart ------------------------*/
        if ($("#crypto-chart #demoarea-container").length) {

            var data7_1 = [
                [1354586111100, 230],
                [1354587111100, 277],
                [1354588111100, 235],
                [1354589111100, 287],
                [1354590000000, 210],
                [1354591111100, 276],
                [1354592111100, 340],
                [1354593111100, 324],
                [1354594111100, 290],
                [1354595111100, 329],
                [1354596111100, 389],
                [1354597111100, 336]
            ];

            $.plot($("#crypto-chart #demoarea-container"), [{
                data: data7_1,
                label: "Crypto Balance",
                lines: {
                    fill: true
                }
            }], {
                series: {
                    lines: {
                        show: true,
                        fill: true,
                        fillColor: { colors: [{ opacity: 0.001 }, { opacity: 0.7}] }
                    },
                    points: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: "#ffffff",
                        symbol: "circle",
                        radius: 5
                    },
                    shadowSize: 9
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#f9f9f9",
                    borderWidth: 1,
                    borderColor: "#eeeeee"
                },
                legend: {
                    show: true,
                    position: 'nw'
                },
                colors: ['#3187bf', '#009688'],
                tooltip: false,
                tooltipOpts: {
                    defaultTheme: false
                },
                xaxis: {
                    axisLabel: "Month",
                    mode: "time",
                },
                yaxes: [{

                }]
            });

        }

        /*-----------------------------------------------------*/
    };

    function labelFormatter(label, series) {
        return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
    }

    /******************************
     initialize respective scripts 
     *****************************/
    $(document).ready(function() {
        CRYPTOKIT_SETTINGS.chartFlot();
    });

    $(window).resize(function() {});

    $(window).load(function() {});

});