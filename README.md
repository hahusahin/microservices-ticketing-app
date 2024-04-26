# Ticketing App Using Microservices

## About This Project
 * This is a ticketing app where Users can list a ticket for an event (concert, sports) for sale and any user can purchase it.
 * When a user attempts to purchase a ticket, the ticket is 'locked' for 15 minutes.  The user has 15 minutes to enter their payment info.
 * While locked, no other user can purchase the ticket. After 15 minutes, the ticket should 'unlock'
 * Ticket prices can be edited if they are not locked
 * Created a seperate service for Auth, Tickets, Orders, Payments and Expiration.
 ![image](https://github.com/hahusahin/microservices-ticketing-app/assets/50502928/8afdfc83-bb7b-4919-a62d-bfacdbade232)

## Techstack
 * Next.js
 * Node.js
 * Docker
 * Kubernetes
