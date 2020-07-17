const path=require("path")
const express = require("express");
const hbs = require('hbs')
const geocode = require("./utils/geocode");
const forecast =require("./utils/forecast")

const app = express();
const port=process.env.PORT||3000

app.set('view engine', 'hbs')

const viewpath=path.join(__dirname,"../templates/views")
const partialsPath=path.join(__dirname,"../templates/partials")

app.set("views",viewpath)
hbs.registerPartials(partialsPath)

const publicDirectoryPath=path.join(__dirname,"../public")

app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render("index",{
        title:"Home",
        name:"Sujidra"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About",
        name:"Sujidra"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        title:"Help",
        name:"Sujidra",
        content:"This is help content"
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        errormsg:"There is no article related to help.",
        name:"suji"
        
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Please provide address"
        })
    }
    geocode(req.query.address,(error,{latitude,logitude,place}={})=>{
        if(error)
        {
            res.send({error:error});
        }
        console.log("Latitude:",latitude)
        console.log("Logitude:",logitude)
        console.log(place)
        forecast(latitude,logitude,(error,forecastdata)=>{
            if(error)
            {
                res.send({error:error});
            }
              console.log(forecastdata)
            res.send({forecast: forecastdata,
            location: place,
            address:req.query.address
            })
        })
        
    })

    
})


app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        errormsg:"There is no article related to this.",
        name:"suji"
    })
})




app.listen(port,()=>{
    console.log("Server is up at port 8080")
})