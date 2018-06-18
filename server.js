const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 1234;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine','hbs');

//
app.use((req,res,next)=>{
  var now = new Date().toString();
  var log = `Time:${now};  Request Method: ${req.method};   Request URL:${req.url}`;

  console.log(log);
  fs.appendFile('server.log',log +'\n',(err)=>{
    if (err) {
      console.log('Unnable to append to server log ATM');
    }
  });
  next();
});
//uncomment the following app.use method only if the site is down and is running a Maintenance process is underway
////``````````````Starting Maintenance Mode
// app.use((req,res,next)=>{
//   console.log(`Maintenance Mode is active`)
//   res.render('maintenance.hbs');
// });

////``````````````End of Maintenance Mode

app.use(express.static(__dirname + '/Public'));

//Return values globaly to any template file
hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
})
app.get('/about', (req,res) =>{
  res.render('about.hbs',{
    papgeTitle:'About Page',
  });
});

app.get('/projects', (req,res) =>{
  res.render('projects.hbs',{
    papgeTitle:'Projects Page',
    welcomeMessage: 'Projects'
  });
});

app.get('/', (req,res) =>{
  res.render('home.hbs',{
    papgeTitle:'Home Page',
    welcomeMessage: 'Welcome to the New Web Page'
  });
});
app.get('/bad' , (req,res)=>{
  res.send({
    errorMessage : 'bad module : 189'
  });
});

app.listen(port);
