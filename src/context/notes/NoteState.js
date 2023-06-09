import React,{useState} from 'react'
import noteContext from "./noteContext"

const NoteState = (props)=>{
    // const s1 = {
    //     "name":"Sai",
    //     "class":"7c"
    // }
    // const [state, setstate] = useState(s1)
    // const update = ()=>{
    //     setTimeout(()=>{
    //         setstate({
    //             "name":"Sai",
    //             "class":"10c"
    //         })

    //     },1000);
    // }

    // -----------------
    const notesInitial =[
        {
          "_id": "6481d2cb2c26531e0cdd91c5",
          "user": "647f47e26cdfe9370ad764e4",
          "title": "My title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2023-06-08T13:08:27.264Z",
          "__v": 0
        },
        {
          "_id": "64824332783fa555ba03c9b7",
          "user": "647f47e26cdfe9370ad764e4",
          "title": "My title",
          "description": "please wake up early",
          "tag": "personal",
          "date": "2023-06-08T21:08:02.069Z",
          "__v": 0
        },
        {
          "_id": "64824333783fa555ba03c9b9",
          "user": "647f47e26cdfe9370ad764e4",
          "title": "My title updated5",
          "description": "please wake up early updated",
          "tag": "personal",
          "date": "2023-06-08T21:08:03.012Z",
          "__v": 0
        }
      ]
      const [notes, setnotes] = useState(notesInitial)
    return(
        // <noteContext.Provider value={{state,update}}>
        <noteContext.Provider value={{notes,setnotes}}>

        {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;