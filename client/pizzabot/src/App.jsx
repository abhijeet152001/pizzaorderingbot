import { useState } from "react"
import axios from 'axios';

function App() {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(false);
const inputData = (e) =>{
  setInput(e.target.value);

}
const handleSubmit = async(event)=>{
  event.preventDefault();
  if(!loading){
    if(input){
      setLoading(true)
      setInput('');
      setMessages((prevMessages)=>[...prevMessages, input])
      const res = await axios.post('http://localhost:3000/chatbot', {userRes:input});
      setLoading(false)
      setMessages((prevMessages)=>[...prevMessages, res.data.msg?.content])
  console.log(res.data);
  console.log(res.data.msg);}
  }
 
}
  return (
    <>
    <div className="bg-[#292F3F] w-full h-screen flex justify-center items-center flex-col">
    <h3 className="text-white my-2 font-bold">Pizzazz Pizzerias Bot</h3>
      <div className="h-3/4 w-screen flex flex-col m-2 [&>*:nth-child(odd)]:self-end [&>*:nth-child(even)]:self-start overflow-y-auto [&>*:nth-child(odd)]:bg-[#272A35] [&>*:nth-child(even)]:bg-[#373E4E]  ">

    {messages && messages.map((message, index)=>(
      <div key={index} className="p-2 text-white max-w-lg rounded-2xl m-2 h-fit">
    {message}
         </div>
    ))}

       


      </div>
      <div>
      <form onSubmit={handleSubmit}> {/* Add the form element */}
          <input
            onChange={inputData}
            className="bg-[#00000029] rounded-md p-2 md:w-96 text-white border-2 border-white"
            name="textInput"
            value={input}
            placeholder="How may I help you?"
            autoComplete="off"
          />
          {!loading && <button className="text-white bg-lime-700 p-2 rounded-md m-2 w-16 ">Send</button>}
        </form>
      </div>
    </div>
    </>
  )
}

export default App
