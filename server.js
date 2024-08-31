const express=require('express');
const bodyparser=require('body-parser')
const app=express();
app.use(express.json())
app.use(bodyparser.json())


app.get('/',(req,res)=>{
    res.send("hello gemini i am here")
})

app.get('/api/content', async (req,res)=>{
    const data =req.body.question
    const result = await generate(data)
    res.send({
        "result":result
    })
    
})




const { GoogleGenerativeAI } =require("@google/generative-ai");


require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = "how to impress my crush";

const generate= async()=>{
    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
        return result.response.text();
        
    } catch (error) {
       console.log(error)
    }
}
// generate();

app.listen(3001,()=>{
    console.log("server is up and running on port number 3001")
})