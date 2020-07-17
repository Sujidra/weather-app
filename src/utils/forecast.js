const request = require("postman-request");

const forecast =(logitude,latitude,callback)=>{
    request({url:"http://api.weatherstack.com/current?access_key=8aa2d425e9836eae7efdf8cf6a25946a&query="+latitude+","+logitude+"&units=f",json:true},(error,response)=>{
    //console.log(response.body.current);
        if(error){
            return callback("Network error has occured",undefined)
        }else if(response.body.error){
            return callback("some error has occured",undefined)
        }else{
            return callback(undefined,"It is currently "+response.body.current.temperature+" farenhert in "+response.body.location.name+". This is a " +response.body.current.weather_descriptions[0]+".")
        }
    })
}

module.exports=forecast
