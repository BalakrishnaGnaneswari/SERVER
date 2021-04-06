const express = require('express');
const app = express();
const hbs = require('hbs')
const fs = require('fs')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname+'/views/partials')

hbs.registerHelper('getdate',()=>{
  return new Date().toString()
})
hbs.registerHelper('biggy',(data)=>{
  return data.toUpperCase();
})

app.use((req,res,next)=>{
  res.render('maintainance.hbs',{
    maintaince_data:'Under maintaince',
    data:'please visit after some minutes'
  })
  console.log(`request method : ${req.method} requeest url : ${req.url} date : ${new Date().toString()} \n`);
  fs.appendFile('log.txt',`request method : ${req.method} requeest url : ${req.url} date : ${new Date().toString()} \n`,
  (err)=>{
    if(err){
      console.error(err);
    }
    else {
      console.log('written');
    }
  })
  next()
})

app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
  res.send('test')
});

app.get('/balu',(req,res)=>{
  res.send({
    name:'balu',
    age:24
  })
})
app.get('/home',(req,res)=>{
  res.render('home.hbs',{
    home_data:'Welcome HOME',
    data:'hello buddy'
  })
})
app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    about_data:'Welcome about',
    data:'this is it'
  })
})


app.listen(8080,()=>{
  console.log('server running on 8080');
})
