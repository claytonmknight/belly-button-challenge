// Read data from samples.json
d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(function(data) {
   
    // Building the dropdown menu
    var select = d3.select("#selDataset");
    data.names.forEach((name) => {
        select.append("option")
            .text(name)
            .property("value", name);
    });

    // Responding to changes in the dropdown menu
    select.on("change", function () {
        var newSample = d3.select(this).property("value");
        optionChanged(newSample);
    });

    // Use the first sample
    var firstSample = data.names[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    // Setting up the initial sample for the gauge chart
    buildGaugeChart(firstSample); 
});

// Create the metadata panel
function buildMetadata(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];
        var PANEL = d3.select("#sample-metadata");

        // Remove all previous data
        PANEL.html("");

        // Add each key-value pair to the panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

// Create the charts
function buildCharts(sample) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        // Bar Chart Maker
        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        var barData = [{
            y: yticks,
            x: sample_values.slice(0, 10).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
        }];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: { t: 30, l: 150 }
        };

        Plotly.newPlot("bar", barData, barLayout);

        // Bubble Chart Maker
        var bubbleData = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: 'Earth'
            }
        }];

        var bubbleLayout = {
            title: 'Bacteria Cultures Per Sample',
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: { title: 'OTU ID' },
            hovermode: 'closest'
        };

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);
    });
}

// New sample
function optionChanged(newSample) {
    console.log("New sample selected:", newSample);
    buildCharts(newSample);
    buildMetadata(newSample);
    buildGaugeChart(newSample); 
}