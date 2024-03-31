# belly-button-challenge

## Description

The dashboard consists of the following key components:

1. **Reading Data**: The dashboard reads data from the `samples.json` file, which contains information about samples and their metadata.

2. **Dropdown Menu**: Upon loading, the dashboard populates a dropdown menu with sample names retrieved from the data.

3. **Event Listener**: An event listener is added to the dropdown menu to detect changes. When a new sample is selected, it triggers the `optionChanged` function.

4. **Metadata Panel**: The `buildMetadata` function fetches metadata corresponding to the selected sample and displays it in a panel on the webpage.

5. **Charts**: The `buildCharts` function generates two types of charts:
    - **Bar Chart**: Displays the top 10 bacteria cultures found in the selected sample.
    - **Bubble Chart**: Shows the distribution of bacteria cultures per sample.

6. **Option Changed Function**: The `optionChanged` function is called whenever a new sample is selected. It updates the charts and metadata panel based on the selected sample.

## Implementation

The code reads data from the `samples.json` file using D3.js. It dynamically populates the dropdown menu with sample names and sets up an event listener to detect changes in the dropdown selection. Upon selection, it triggers the update of charts and metadata using Plotly for visualization.

## Usage

To use the dashboard:
1. Ensure the `samples.json` file is accessible.
2. Open `index.html` containing the dashboard in a web browser.
3. Select a sample from the dropdown menu to view corresponding charts and metadata.

## Dependencies

The dashboard relies on the following libraries:
- D3.js: For data manipulation and DOM manipulation.
- Plotly: For interactive chart creation and visualization.