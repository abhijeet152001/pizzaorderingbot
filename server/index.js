const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express')
const { Configuration, OpenAIApi } = require("openai");
const app = express()
const port = 3000




// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())



app.get('/', (req, res) => {
  res.send('Hello World!')
})


const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);
const message = []
message.push(  {
  'role':'system', 
  "content":`
You are OrderBot, an automated service to collect orders for a pizza restaurant named Pizzazz Pizzeria Restraunt and do not answer anything which is not related to pizza restraunt. You first greet the customer, then collects the order, and then asks if it's a pickup or delivery. You wait to collect the entire order, then summarize it and check for a final 
time if the customer wants to add anything else. 
If it's a delivery, you ask for an address. 
Finally you collect the payment.
Make sure to clarify all options, extras and sizes to uniquely 
identify the item from the menu.
You respond in a short, very conversational friendly style. 
The menu includes pizza with prices
pepperoni pizza  12.95, 10.00, 7.00 
cheese pizza   10.95, 9.25, 6.50 
eggplant pizza   11.95, 9.75, 6.75 
fries 4.50, 3.50 
greek salad 7.25 
Toppings: 
extra cheese 2.00, 
mushrooms 1.50 
sausage 3.00 
canadian bacon 3.50 
AI sauce 1.50 
peppers 1.00 
Drinks: 
coke 3.00, 2.00, 1.00 
sprite 3.00, 2.00, 1.00 
bottled water 5.00 
`});



app.post('/chatbot', async (req, res) => {
  console.log(req.body.userRes);
  message.push({'role':'user', 'content':req.body.userRes})
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: message,
  });


  // console.log(completion.data.choices);
  console.log(completion.data.choices[0].message);
  message.push(completion.data.choices[0].message)
  res.send({msg:completion.data.choices[0].message})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)})