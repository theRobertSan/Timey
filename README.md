# Timey

![](https://img.shields.io/website-up-down-green-red/http/master--flourishing-stroopwafel-847e52.netlify.app.svg)
![timey-language](https://img.shields.io/github/languages/top/theRobertSan/timey)

![](/assets/images/timey_1.png)

### Timey is a full stack MERN web application

- Front End:

<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg"  title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original-wordmark.svg" title="React" alt="React" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/materialui/materialui-original.svg" title="Material UI" alt="Material UI" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/redux/redux-original.svg" title="Redux" alt="Redux " width="40" height="40"/>&nbsp;

</div>
<br/>
- Back End:
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg"  title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express" alt="Express" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original-wordmark.svg" title="MongoDB"  alt="MongoDB" width="40" height="40"/>&nbsp;
</div>

## Description

Assignments, reports, projects... They all have one thing in common. Scary deadlines. So scary, in fact, that sometimes we simply forget about them!<br/>
Well, never miss a deadline ever again!
With Timey, you can keep better track of deadlines regarding academic projects or reports of different courses.<br>

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Installation

Firsty, you need to run the back end server.<br>
Open a terminal inside the _server_ folder and run:

```
> npm i && npm start
```

> Note: Before running, create a .env file inside the server folder, then add MONGO_URL="your mongo connection url goes here" <br/>

After confirming the back end is up and running, you need to run the React front end.<br>
Open a terminal inside the _client_ folder and run:

```
> npm i && npm start
```

Now go to: http://localhost:5000

## Usage

This application revolves around projects & courses. You can

- Create a course with a name and a color associated to it;

Once created, the course will appear in the My Courses Section.

Now, projects. You can:

- Create a project with a name, an optional description, a course associated to it, a due date, a due hour and a specific difficulty.

Once created, the project will appear in the My Projects Section. If you click the + button next to it, you can:

- View the project details
- Edit the project
- Delete the project

You can also order your projects by date or difficulty.<br>

Once a project's deadline is reached, the project will be <b>removed from view</b> and a notification will appear informing you about the deadline being reached.
