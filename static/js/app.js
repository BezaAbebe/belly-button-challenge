// // Build the metadata panel
function buildMetadata(sample) {

  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
      
    // get the metadata field
    let metadata = data.metadata;

    // for(let i = 0; i < 10; i++){
    //   console.log(metadata[i]);
    // }

    // Filter the metadata for the object with the desired sample number.
    //used find to select the desire sample in one line of code
    let result = metadata.find(meta => meta.id == sample);
      

    // Use d3 to select the panel with id of `#sample-metadata`
    let dataPanel = d3.select('#sample-metadata');


    // Use `.html("") to clear any existing metadata
    dataPanel.html('');

    if(result){
      Object.entries(result).forEach(([key, value]) => {
          dataPanel.append('h6').text(`${key.toUpperCase()}: ${value}`)
      });

    }

  });
}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samples = data.samples;


    // Filter the samples for the object with the desired sample number
    let sampleResult = samples.find(samp => samp.id == sample);

    if(sampleResult){

      // Get the otu_ids, otu_labels, and sample_values
      let otuIds = sampleResult.otu_ids;
      let sampleValues = sampleResult.sample_values;
      let otuLabels = sampleResult.otu_labels;
  
  
      // Build a Bubble Chart
      // Create a layout for the Bubblechart
      let bubbleLayout = {
          title: "Bacteria Cultures Per Sample",
          margin: {t:0}, 
          showlegend: false, 
          xaxis: {title: "OTU ID"},
          yaxis: {title: "Number of Bacteria"},
          hovermode: "closest",
          margin: {t:50}
      };
  
      // Then, create the trace for the bubble Chart
      let bubbleMetrics = [{
          x: otuIds,
          y: sampleValues,
          text: otuLabels,
          mode: "markers",
          marker: {
          size: sampleValues,
          color: otuIds,
          colorscale: "Earth"
          }
      }]; 
  
      // Render the Bubble Chart
      Plotly.newPlot("bubble", bubbleMetrics, bubbleLayout, {responsive: true});
  
  
      // For the Bar Chart, map the otu_ids to a list of strings for your yticks
      let yticks = otuIds.slice(0,10).map(id => 'OTU ' + id).reverse();
  
  
      // Build a Bar Chart
      // Don't forget to slice and reverse the input data appropriately
      let barMetrics = [{
          x: sampleValues.slice(0,10).reverse(),
          y: yticks,
          text: otuLabels.slice(0,10).reverse(),
          type: "bar",
          orientation: 'h'
      }];
      //Create the layout for the bar
      let barLayout = {
          title: "Top 10 Bacteria Cultures Found",
          margin: {t: 30, l: 150},
          xaxis: {
          tickmode: "linear",
          dtick: 20,
          title: "Number of Bacteria"
          },
          yaxis: {
          tickmode: "array",
          tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          ticktext: yticks
          }
      };
  
      // Render the Bar Chart
      Plotly.newPlot("bar", barMetrics, barLayout);

    } 

  });
}

//   // Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the names field
    let names = data.names;
  //   console.log(names);

      
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropDown = d3.select('#selDataset');

  
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    names.forEach((name) => {
      dropDown.append('option').text(name).property('value', name);
      
    });

    // Get the first sample from the list
    let firstSample = names[0];
    
    

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);

  });
}

//   // Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);

}

//   // Initialize the dashboard
init();