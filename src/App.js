import './App.css';
import { EasybaseProvider, useEasybase } from 'easybase-react';
import React,{useEffect} from 'react'
import ebconfig from './ebconfig';

// function Data() {
//   const List = [
//     { title: "Grocery List", description: "Milk, Soup, Bread", createdat: "01-18-2021" },
//     { title: "Math Homework", description: "Remember to finish question 8-10 before monday", createdat: "12-01-2020" },
//     { title: "Call James", description: "Ask him about the company party.", createdat: "12-30-2020" }
//   ]
//   return (
//    

//     )
// }

// with

function Notes() {
  const { Frame, sync, configureFrame } = useEasybase();

  useEffect(() => {
    configureFrame({ tableName: "NOTES APP", limit: 10 });
    sync();
  }, []);

  return (
     <div className="">
       <h2>Severless Database in react</h2> 
         {Frame().map(info => 
           <div className="notes-inner">
             <h3>{info.title}</h3>
             <p>{info.description}</p>
             <small>{String(info.createdat).slice(0, 10)}</small>
           </div>
         )}
       </div>
  )
}


function AddNoteButton() {
  const { Frame, sync } = useEasybase();

  const handleClick = () => {
    const newTitle = prompt("Please enter a title for your note");
    const newDescription = prompt("Please enter your description");
    
    Frame().push({
      title: newTitle,
      description: newDescription,
      createdat: new Date().toISOString()
    })
    sync();
  }

  return <button className="btn" onClick={handleClick}>📓 Add Note 📓</button>
}

function App() {
  return (
    <div className="notes">
      <EasybaseProvider ebconfig={ebconfig}>
        <Notes/>
        <AddNoteButton />
       </EasybaseProvider>  
  
    </div>
  );
}

export default App;

/*
-Severless Database in react using https://easybase.io/

-npm install easybase-react
-EasybaseProvider has a prop called ebconfig which is a single file that 
authenticates and secures all connections from within our React project.
-https://app.easybase.io/#/tables

*/