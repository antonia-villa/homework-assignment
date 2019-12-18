# Freight Forwarding Dashboard

A view one approach to organize and present data to freight forwarders.



## Requirements
* Create a way to display shipment information to frieght forwarders
* Easy to use and easy to adopt to UI
 * Maintain functionality if connectivity is lost


## Technologies Used
* React
 * Key modules:
  * Material-UI
  * React-bootstrap-table
* Javascript


## Steps to Setting Up
If you'd like to set this project up on your own local server: 
* Fork and clone this repository
* Run `npm install` to install node_modules
* You can now open [http://localhost:3000](http://localhost:3000) to view it in the browser or whichever localhost you have set
* NOTE: There is an authentication step. The only requirement is a non null password for all client log ins.
* To view all clients in an aggregate view, log in as the Administator.


## Key Considerations
* Authentication of Users
 * Solution: Temporary authentication implemented through the use of local storage. 
 * Reason for implementation: Frieght forwarding information can contain crucial information for individual clients. As a frieght forwarder, it is imperative to provide clients with information only relevant to their business. Additionally, authentication can be used to restrict write privledges to the data. 
 * Additional thoughts: This is a temporary hack to emphasize the importance of data privacy within the industry and to be able to implement read/write access to client data.
 
 * Filtering Data
 * Reason for implentation: Aggregate views of data are useful but only as useful as the consumer makes them. The ability to filter by key data attributes enables the user to quickly narrow down the data set to find what they are looking for.
 
 * Searching Data
 * Reason for implentation: Free text search is a quick way to find a specific record if you know the address or the potential location you are looking to target.
 
 ## Next Steps:
 * Filtering: Filtering should be available for all data attributes giving the user full control over the data set in view.
 * CSV Download: As early adopters try to adjust to the software, there will always be demand for raw data. A CSV Download will enable users to access the data if they find the software limiting or the barrier to entry to great. Additionally, the CSV download can act a source to relay information to outside sources.
 
 

