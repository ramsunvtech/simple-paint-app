# Simple Paint App

This is Simple Paint Application developed in Web Component using Core JavaScript.

## Components.
 - This is BaseComponent which creates Custom elements aka Web Components developed similar to React Style. I'm a Big Fan of Light Weight React / Preact.  

Below is the Component Structure and their usage.  

### Components/  
    - BaseComponent - Component which helps to create all components in this App. 
    - Area - This Component is main component which hold the Paint Area.  
    - Controls - This Component render Radio button choice of those 3 types.  
    - ToolBar - This Component render the Tool Icons of Eraser, Scissor and Glue Icons.  

### How Component communicate / transfer each other data?  
    - Using Custom Events.

### Is Dimension and Toolbar config is through by API?
    - The Canvas Dimension and Toolbar Icon are configured through JSON Server API.
    - https://my-json-server.typicode.com/ramsunvtech/simple-paint-app/
    - Endpoint - https://my-json-server.typicode.com/ramsunvtech/simple-paint-app/config