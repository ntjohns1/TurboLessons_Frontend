# SPEC-001: Functional Requirements Specification for Turbolessons
:sectnums:
:toc:


## Background

Turbolessons is designed for music teachers to manage their teaching activities effectively. It includes functionalities for billing students, scheduling lessons, and uploading documents and video content. The backend is built using Spring Boot, providing RESTful services consumed by a React-based frontend. The architecture comprises several microservices, each with a specific responsibility:

    * config-server: A Spring Cloud Config Server for centralized configuration management.
    * service-registry: A Eureka server for service discovery.
    * api-gateway: A Spring Cloud Gateway service for routing and load balancing.
    * admin-service: Manages authentication and user management using Okta as the identity provider.
    * event-service: Manages lesson schedules.
    * message-service: A WebSocket chat server for messaging.
    * email-service: A background email server for sending scheduled reminders and notifications.
    * video-service: Interfaces with Google Cloud Storage to serve video data.
    * payment-service: Integrates with Stripe for managing subscription-based billing.
    * turbolessons-frontend: A React application serving as the frontend.

## Requirements

The requirements for Turbolessons are categorized as follows:

### Must Have

1. **User Authentication and Management**
   * Integration with Okta for user authentication.
   * Role-based access control for teachers and students.

2. **Lesson Scheduling**
   * Ability for teachers to create, update, and delete lesson schedules.
   * Students should be able to view their lesson schedules.
   * Notifications and reminders for upcoming lessons.

3. **Billing and Payments**
   * Integration with Stripe for managing subscription-based billing.
   * Automated invoicing and payment reminders.

4. **Content Management**
   * Upload and manage documents and video content.
   * Integration with Google Cloud Storage for storing video data.

5. **Messaging**
   * Real-time chat functionality between teachers and students using WebSocket.

6. **Email Notifications**
   * Automated email notifications for lesson reminders and billing notifications.

### Should Have

1. **Reporting and Analytics**
   * Dashboard for teachers to view student progress and lesson history.
   * Billing and payment reports.

2. **Customizable Notifications**
   * Teachers can customize the frequency and content of notifications.

### Could Have

1. **Mobile Application**
   * A mobile version of the application for both Android and iOS.

2. **Gamification**
   * Features like badges and achievements to motivate students.

3. **Text Message Notifications**
   * SMS notifications for lesson reminders and billing notifications.

### Won't Have

1. **In-person Lesson Tracking**
   * Tracking attendance and progress of in-person lessons is out of scope for this version.

2. **Advanced AI Features**
   * Features like AI-driven personalized learning paths are not considered for this version.

## Method

The solution for Turbolessons is implemented using a microservices architecture. Each microservice is responsible for a specific part of the functionality, ensuring modularity and scalability. The backend services are built using Spring Boot, and the frontend is developed with React. Below is the detailed architecture design:

### Architecture Design

![turbolessons_diagram](turbolessons_diagram.png)

### Component Descriptions

1. **Config Server**
   * Manages external configurations for all microservices using Spring Cloud Config.

2. **Service Registry**
   * Registers all microservices and enables service discovery using Eureka Server.

3. **API Gateway**
   * Routes requests to the appropriate microservices and provides load balancing using Spring Cloud Gateway.

4. **Admin Service**
   * Manages user authentication and roles.
   * Integrates with Okta for identity management.

5. **Event Service**
   * Handles the creation, updating, and deletion of lesson schedules.
   * Sends notifications and reminders for upcoming lessons.

6. **Message Service**
   * Provides real-time chat functionality using WebSocket.

7. **Email Service**
   * Sends automated email notifications for lesson reminders and billing notifications.

8. **Video Service**
   * Manages the upload and retrieval of video content.
   * Integrates with Google Cloud Storage.

9. **Payment Service**
   * Handles billing and subscription management.
   * Integrates with Stripe for payment processing.

10. **Turbolessons Frontend**
    * A React application that interacts with the backend services via RESTful APIs.

### Database Design

Each microservice will have its own database to ensure loose coupling. The following databases are used:

1. **Admin Service Database**
   * Stores user information and roles.

2. **Event Service Database**
   * Stores lesson schedules and related information.

3. **Message Service Database**
   * Stores chat history and messages.

4. **Email Service Database**
   * Stores email templates and schedules.

5. **Video Service Database**
   * Stores metadata for videos.

6. **Payment Service Database**
   * Stores billing information and payment records.

The databases are managed using appropriate ORM tools such as Hibernate for relational databases or MongoDB for NoSQL databases.

### Data Flow

1. **User Authentication**
   * Users authenticate via the admin service, which verifies credentials with Okta.

2. **Lesson Scheduling**
   * Teachers create or update schedules through the event service.
   * Students view their schedules by querying the event service.

3. **Billing and Payments**
   * Payment service handles subscription management and interacts with Stripe for transactions.

4. **Content Management**
   * Teachers upload documents and videos via the video service, which stores them in Google Cloud Storage.

5. **Messaging**
   * Real-time communication is facilitated through the message service using WebSocket.

6. **Email Notifications**
   * Email service sends reminders and notifications based on the data from the event and payment services.

## Implementation

The implementation of Turbolessons will follow a structured approach to ensure that all components are built and integrated properly. The steps are outlined as follows:

### Step 1: Setup Development Environment

1. **Install Java Development Kit (JDK)**
   * Ensure JDK 11 or higher is installed.

2. **Install Node.js and npm**
   * Install the latest version of Node.js and npm.

3. **Setup IDEs**
   * Use IntelliJ IDEA or Eclipse for backend development.
   * Use Visual Studio Code for frontend development.

4. **Install Docker**
   * Install Docker for containerizing the microservices.

### Step 2: Setup Version Control

1. **Create Git Repositories**
   * Create separate Git repositories for each microservice and the frontend application.
   * Use GitHub, GitLab, or Bitbucket for repository management.

2. **Configure Branching Strategy**
   * Implement a branching strategy (e.g., GitFlow) to manage development, feature, and release branches.

### Step 3: Develop Microservices

1. **Config Server**
   * Create a Spring Boot application.
   * Implement Spring Cloud Config for centralized configuration management.
   * Dockerize the application.

2. **Service Registry**
   * Create a Spring Boot application.
   * Implement Eureka Server for service discovery.
   * Dockerize the application.

3. **API Gateway**
   * Create a Spring Boot application.
   * Implement Spring Cloud Gateway for routing and load balancing.
   * Dockerize the application.

4. **Admin Service**
   * Create a Spring Boot application.
   * Integrate with Okta for user authentication and management.
   * Implement user and role management features.
   * Dockerize the application.

5. **Event Service**
   * Create a Spring Boot application.
   * Implement CRUD operations for lesson scheduling.
   * Dockerize the application.

6. **Message Service**
   * Create a Spring Boot application.
   * Implement WebSocket for real-time chat functionality.
   * Dockerize the application.

7. **Email Service**
   * Create a Spring Boot application.
   * Implement email sending functionality using a library like Spring Email.
   * Dockerize the application.

8. **Video Service**
   * Create a Spring Boot application.
   * Implement integration with Google Cloud Storage.
   * Dockerize the application.

9. **Payment Service**
   * Create a Spring Boot application.
   * Implement integration with Stripe for billing and payments.
   * Dockerize the application.

### Step 4: Develop Frontend

1. **Turbolessons Frontend**
   * Set up a React application using Create React App.
   * Implement UI components for authentication, scheduling, billing, messaging, and content management.
   * Integrate with backend services using RESTful APIs.

### Step 5: Setup CI/CD Pipeline

1. **Configure Continuous Integration (CI)**
   * Set up CI pipelines using tools like Jenkins, GitHub Actions, or GitLab CI.
   * Implement automated testing and code quality checks.

2. **Configure Continuous Deployment (CD)**
   * Set up CD pipelines to deploy Docker containersto a cloud provider like AWS, GCP, or Azure.
    
### Step 6: Testing

1.	Unit Testing
*	Write unit tests for each microservice using JUnit or a similar framework.
*	Write unit tests for frontend components using Jest and React Testing Library.
2.	Integration Testing
*	Implement integration tests to ensure proper communication between microservices.
3.	End-to-End Testing
*	Implement end-to-end tests using a framework like Cypress to test the complete workflow.

### Step 7: Deployment

1.	Deploy to Development Environment
*	Deploy all microservices and the frontend application to a development environment for initial testing.
2.	Deploy to Production Environment
*	Deploy the application to a production environment after successful testing in development and staging environments.

### Step 8: Monitoring and Maintenance

1.	Set Up Monitoring
*	Implement monitoring using tools like Prometheus and Grafana.
*	Set up logging using ELK stack (Elasticsearch, Logstash, Kibana) or a similar solution.
2.	Regular Maintenance
*	Schedule regular maintenance windows for updates and performance tuning.

## Milestones

The implementation of Turbolessons will be tracked through the following key milestones:

### Milestone 1: Development Environment Setup

*	Complete setup of development environments (JDK, Node.js, Docker).
*	Set up Git repositories and branching strategy.

### Milestone 2: Core Microservices Development

*	Implement and dockerize the config-server, service-registry, and api-gateway.

### Milestone 3: User Management and Authentication

*	Develop the admin-service with Okta integration.
*	Complete user authentication and role management features.

### Milestone 4: Lesson Scheduling Functionality

*	Develop the event-service.
*	Implement CRUD operations for lesson scheduling.

### Milestone 5: Real-time Messaging

*	Develop the message-service.
*	Implement WebSocket-based real-time chat functionality.

### Milestone 6: Content Management

*	Develop the video-service.
*	Implement integration with Google Cloud Storage for video content.

### Milestone 7: Billing and Payments

*	Develop the payment-service.
*	Integrate with Stripe for subscription management and payments.

### Milestone 8: Email Notifications

*	Develop the email-service.
*	Implement automated email notifications for lessons and billing.

### Milestone 9: Frontend Development

*	Develop the React-based frontend application.
*	Integrate frontend with backend services.

### Milestone 10: CI/CD Pipeline Setup

*	Configure CI pipelines for automated testing.
*	Configure CD pipelines for deployment to cloud environments.

### Milestone 11: Testing

*	Complete unit, integration, and end-to-end testing for all components.

### Milestone 12: Deployment

*	Deploy the application to development, staging, and production environments.

### Milestone 13: Monitoring and Maintenance

*	Set up monitoring and logging.
*	Schedule regular maintenance and updates.

## Gathering Results

To ensure that the implementation of Turbolessons meets the specified requirements and performs effectively, the following evaluation methods will be employed:

### Evaluation of Requirements

1.	User Feedback
*	Collect feedback from music teachers and students using the platform.
*	Use surveys and interviews to gather qualitative data on user satisfaction.
2.	Feature Verification
*	Verify that all Must Have, Should Have, and Could Have features (as applicable) are implemented and functional.
*	Conduct user acceptance testing (UAT) with key stakeholders.
	3.	Performance Metrics
*	Measure system performance metrics such as response times, uptime, and error rates.
*	Ensure that the system meets performance benchmarks defined during the requirements phase.

### Post-Production Monitoring

1.	Usage Analytics
*	Track usage statistics to understand how different features are being utilized.
*	Use tools like Google Analytics or Mixpanel to gather data on user interactions.
2.	System Health Monitoring
*	Monitor the health of microservices using tools like Prometheus and Grafana.
*	Ensure that alerts are set up for critical issues to enable quick resolution.
	3.	Scalability Testing
*	Perform load testing to ensure the system can handle increased traffic.
*	Use tools like Apache JMeter or Locust to simulate high user load scenarios.
	4.	Security Audits
*	Conduct regular security audits to identify and fix vulnerabilities.
*	Ensure compliance with security best practices and regulations.

### Continuous Improvement

1.	Iterative Development
*	Adopt an iterative development approach to continuously improve the system based on user feedback and performance data.
*	Schedule regular updates and feature enhancements.
2.	Regular Maintenance
*	Perform regular maintenance to ensure the system remains up-to-date with the latest technologies and security patches.
*	Address any technical debt accumulated during the development process.

By employing these evaluation methods, we will ensure that Turbolessons meets its objectives and provides a high-quality user experience for music teachers and students.
