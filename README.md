# Interview Scheduler
Using some of the latest tools and techniques, I built Scheduler, a React application that essentially allows students to book, cancel, and change interviews with their interviewer (mentor, teachers, etc). This was all done using an API with a WebSocket server to build realtime experience. Scheduler was built with an extensive unit, integration, and end-to-end testing using Jest, Storybook, and Cypress.

<<<<<<< HEAD
![](https://github.com/suhuromarfarah/scheduler/blob/master/scheduler.gif)
=======
![](https://github.com/asmxali/scheduler/blob/master/scheduler.gif)
>>>>>>> 78d4eb0127b683eeb3de30291f805b8d640e48ff

# Behavioural Requirements

- Interviews can be booked between Monday and Friday.
- A user can switch between weekdays.
- A user can book an interview in an empty appointment slot.
- Interviews are booked by typing in a student name and clicking on an - interviewer from a list of available interviewers.
- A user can cancel an existing interview.
- A user can edit the details of an existing interview.
- The list of days informs the user how many slots are available for each day.
- The expected day updates the number of spots available when an interview is booked or canceled.
- A user is presented with a confirmation when they attempt to cancel an interview.
- A user is shown an error if an interview cannot be saved or deleted.
- A user is shown a status indicator while asynchronous operations are in progress.
- When the user presses the close button of the error they are returned to the Form or Show view (skipping Status and Confirm).
- The application makes API requests to load and persist data. We do not lose data after a browser refresh.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
