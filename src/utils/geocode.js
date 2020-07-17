const request = require("postman-request");

const geocode = (address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic3VqaWRyYSIsImEiOiJja2Nob2wxeGkwcmRiMnJxcXYzYzlmYXVzIn0.bNVnFkr5QxMzBI3r7M_0ow"
    request({url:url,json:true},(error,response)=>{
    //console.log(response.body);
        if(error){
            return callback("Network error has occured",undefined)
        }else if(response.body.features.length === 0){
            return callback("some error has occured",undefined)
        }else{
            
            return callback(undefined,{
                latitude:response.body.features[0].center[0],
                logitude:response.body.features[0].center[1],
                place:response.body.features[0].place_name    
                
            })
        }
    })

}
module.exports = geocode

