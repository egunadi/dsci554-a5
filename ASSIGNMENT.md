# DSCI 554 Assignment: Evaluate and Create Dashboards

## Description

### Objective

In this combined assignment, you will create a simple dashboard on a separate web page to present information for two countries using data of your choice. The repository includes a `package.json` initialized with `npm init`.

## Country Data Dashboard

### Dataset: United Nations data of your choice

1. **Data Collection**
   - Select data of your choice for two countries to use as sample data for the dashboard
   - Download or fetch the necessary datasets

2. **Dashboard Design**
   - Define who is the user and create user stories for the use cases you will implement
   - Create a wireframe of the design with an SVG tool
   - Discuss your design choices (e.g., KPIs, layout, color scheme, visualizations...)
   - Use the visualization wheel to evaluate your design
   - Include at least one table, a minimalistic bar chart and a minimalistic bubble chart or scatterplot
   - Apply appropriate visual encoding techniques to enhance information communication.

3. **Dashboard Implementation**
   - Using vanilla JavaScript and Bootstrap implement the screens of your dashboard as individual pages, using `index.html` as the home page.
   - Use separate files graphics you create
   - Implement using D3 data join at least one table, one minimalistic bar chart and one minimalistic bubble chart. minimalistic axes should be created using an SVG line with few tick marks, tick mark labels and one axis label using D3. The proportional symbol map you can create using D3 bubbles layer on top of a world map image set as an svg image.
   - Use Bootstrap to customize the page according to your design.

## Submission

- Document your dashboard design and important implementation details in a Google Slide presentation.
- Provide a link to the Google Slide in `README.md`
- Include all the source design files (wireframe, color palette, etc.) in the submission.
- Ensure that the dashboard is functional and displays correctly in Google Chrome and that there are no errors in DevTools.

## Rubrics

|               | **Design**              | **Implementation** |
| ------------- | ----------------------- | ----------------------- |
| **Sophisticated** | Well-designed dashboard with clear user stories. (4-5 pts) | Well-implemented dashboard, using well vanilla JavaScript and Bootstrap for all screens, separate files for each graphic, implemented using D3 data join at least one table, one minimalistic bar chart and one minimalistic bubble chart with axes. (4-5 pts) |
| **Competent** | Adequate design with some room for improvement or refinement. (2-3 pts) | Adequately implemented dashboard with some room for improvement or refinement. (2-3 pts) |
| **Needs work** | Basic design with significant deficiencies. (0-1 pts) | Basic dashboard implementation with significant deficiencies. (0-1 pts) |

## Homework Guidelines

- Homework repository must be updated before the deadline
- Commits after the deadline will not be considered unless requested
- Late policy: 10% of total available points per each late day; duration less than 24 hours counts as one whole day
- Homework is expected to work in Chrome
