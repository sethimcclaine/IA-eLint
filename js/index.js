var chartData = [
    {
        id: 'medicare',
        name: '',//'Medicare',
        y: 25
    }, {
        id: 'ppo',
        name: '',//'PPO',
        y: 25
    }, {
        id: 'managedcare',
        name: '',//'Managed care',
        y: 25
    }, {
        id: 'cash',
        name: '',//'Cash',
        y: 25
    }
];
var percentTotal = 100;
/**
 * Build out chart
 *
 */
refreshChart = function() {
    $('.mmmmmmpie').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            backgroundColor: 'transparent',
            plotShadow: false
        },
        colors: ['#00c575', '#009cc5', '#ffffff', '#9bc800'],
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        credits: {
            enabled: false
        },
        series: [{
            type: 'pie',
            name: '',//'Browser Shares'
            data: chartData
        }]
    });
    $('.mmmmmmpie tspan').each(function(index, item){
        $(item).text($(item).text().replace(': ', ''));
    });
};

/**
 * Iterate over chartData and populate values
 * Calculate percentTotal
 */
updateChartData = function() {
    percentTotal = 0;
    $(chartData).each(function(index, item) {
        item.y = parseInt($('.'+item.id+' input').val());
        percentTotal += item.y;
    });
    refreshChart();
    $('.totalpie input').val(percentTotal.toFixed());
};

/**
 * Calculate the revenue total
 * //Revenue = (Procedure Cost * Participation * (PPO + Cash) * Number of Patients)
 */
calcRevenueCost= function() {
    var cost = parseInt($('.cost  input').val()),
        participation = parseInt($('.participation  input').val()) * .01,
        ppo = parseInt($('.ppo input').val()) * .01,
        cash = parseInt($('.cash input').val()) * .01,
        patients,
        revenue,
        total = 0;
    
    $('.patientcolumn input').each(function(index, item) {
        patients = parseInt($(item).val());
        revenue = (cost * participation * (ppo + cash) * patients);
        total += revenue;
        $($('.revenuecolumn input')[index]).val(revenue.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });
    total = total.toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    $('.totalcolumn input').val(total);
};

$(function () {
    $('.piecolumn input').change(updateChartData);
    $('input').change(calcRevenueCost);
    updateChartData();   
    calcRevenueCost();
});
