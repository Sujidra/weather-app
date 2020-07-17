const weatherForm =document.querySelector('form');
const inputField=document.querySelector("input");
const paragraph1=document.getElementById("message1")
const paragraph2=document.getElementById("message2")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const inputText =inputField.value;
    console.log(inputText)
    paragraph1.textContent="Loading....";
    paragraph2.textContent="";
    fetch("/weather?address="+inputText).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                paragraph1.textContent=data.error;
            }else
            {
                paragraph1.textContent=data.forecast;
                paragraph2.textContent=data.location;
            }
        })
    })
    

})