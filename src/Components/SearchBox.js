import React, { useState,useEffect, useCallback } from 'react'
import ReactDOM, { findDOMNode } from 'react-dom';
import './SearchBox.css'; 

var array = [];
// var a = [];
const SearchBox = ({input , setInput }) => {
  const [array , setArray] = useState([]);
  const [val, setVal] = useState();
  // function storeInput(input1){
  //   if(input1.length >= 2){
  //     console.log("Ok");
  //     array = [...array, input1];
  //     console.log(array); 
  //   }  
  //   window.localStorage.setItem("search",JSON.stringify(array));
  // }

 
  const [style , setStyle] = useState("searchHide");
  useEffect(() => {
    if(input) 
    {
      setStyle("searchShow");
    }
    if(input.length == 0)
    {
      setStyle("searchHide");
    }

  }, [input]);
  

  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('search'));
    if(data)
    window.localStorage.setItem("search",JSON.stringify(data));
    else
    window.localStorage.setItem("search",JSON.stringify(""));
   
    // console.log(typeof(data));
    if ( data) setArray(data);
  
  }, []); 

  useEffect(()=>{
    let data = JSON.parse(window.localStorage.getItem("search"));
    console.log(typeof(data));
    window.localStorage.setItem("search",JSON.stringify([...data , input ]));
    // let b = [...data , input];
    // b.toString();
    // if(b.includes(input))
    // {
    //   setArray()
    // }
    if(data.indexOf(input) == -1)
    setArray([...data , input]);
    
    
  },[input])
  
  const clickFunc =(item) =>{
    setInput(item);
    setVal(item);
    
  }
  // a=[...b]
//   console.log(a, "check");
//  console.log(typeof(a));
 const debounce = (func) => {
   let timer;
   return function (...args){
     const context = this;
     if(timer) clearTimeout(timer)
     timer = setTimeout( () => {
       timer = null
       func.apply(context , args);
     }, 1000);
   }
 }
 const handleChange = (e) => {
   setInput(e.target.value)
  
 }

  function enter (){
   console.log("Hey");
   setStyle("searchHide")
 }
  const optimisedVersion = useCallback(debounce(handleChange),[])
  return (
    <div>
    {/* < DebounceInput 
    minLength={3}
    debounceTimeout={-1}
    type="text" 
    placeholder='Type to search photos' 
    className='input'
    value={input}
    onChange={(e)=> {setInput(e.target.value)}}
    /> */}
    <input className="input"  value={val} placeholder='Type to search photos'  onChange={optimisedVersion} onKeyPress={(e) => e.key === 'Enter' && enter()}></input>
    <div className={style}  >
       
        {array.map((item) => {
         
          return (
          
           <div className="list"  onClick={()=>{clickFunc(item)}}>{item}</div>
           

        )}
       )}
    </div>
    </div>
  )
}

export default SearchBox