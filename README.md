# Aloha (Attractions finder)

A full-stack web application for travelers who want to find attractions in a specific area quickly.

## Why I Built This

As a person who loves traveling, I was always headache about finding the interesting attraction in my destination. So I build a website to help me plan for the upcoming travel.

## Technologies Used

- React.js
- Webpack
- Bootstrap 5
- PostgreSQL
- Node.js
- Express.js
- HTML5
- CSS3
- Heroku
- AWS

## Live Demo

Try the application live at [https://louisaloha.info](https://louisaloha.info)

## Features

- User can enter the name of a location and then get the attractions around it
- User can see the details and photo of each attraction
- User can sign up for an account
- User can log in to the account
- User can save a particular attraction to their favorite
- User can see the list of their favorite attractions
- User can delete a favorite attraction from their list
- User can write a comment about their favorite attraction
- User can update the comment of their favorite attraction


## Preview

![SGT React](assets/sgt-react.gif)

## Development

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- MongoDB 4 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone https://github.com/Learning-Fuze/sgt-react
    cd sgt-react
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Import the example database to MongoDB.

    ```shell
    mongoimport --db sgt-react database/dump.json
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
