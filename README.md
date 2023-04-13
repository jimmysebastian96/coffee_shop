# Coffee Shop Application
This is a web application for a coffee shop to maintain customer details, purchase history, and provide loyalty rewards. The REST APIs were developed using Django, and the user interface was created using React. Prometheus was used for metrics monitoring, and KEDA was used for autoscaling based on incoming request load.

## Architecture
The application is built on a microservice architecture, with the following services:

Listingsvc: REST API for managing the coffee shop's item listings
Profilesvc: REST API for managing customer profiles and loyalty points
Transactionsvc: REST API for managing customer transactions
Loyaltysvc: REST API for managing loyalty rewards
Checkoutsvc: REST API for processing customer purchases
The user interface communicates with the backend services through REST APIs.

## Installation and Setup
To run the Coffee Shop application, you will need to have the following dependencies installed:

Docker
Kubernetes
KEDA
Prometheus
To set up the application, follow these steps:

Clone the repository to your local machine
In the root directory, run kubectl apply  to deploy the Kubernetes resources
Access the application by navigating to http://localhost in your web browser
Usage
To use the Coffee Shop application, follow these steps:

Register as a new customer on the home page
Go to your dashboard using your customer ID
Purchase items from the product list to earn loyalty rewards
View your loyalty points and transaction history on your dashboard
Metrics and Monitoring
Prometheus is used for monitoring the application's metrics, which can be accessed by navigating to http://localhost:9090 in your web browser.

## Autoscaling
KEDA is used for autoscaling the application's backend services based on incoming request load. The autoscaling configuration can be found in the kubernetes/keda/ directory.

## Testing
The Coffee Shop application has been tested for performance, scalability, and reliability. For more information on the testing results, see the TESTING.md file.
