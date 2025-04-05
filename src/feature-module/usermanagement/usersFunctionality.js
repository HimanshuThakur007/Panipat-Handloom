export const toggleFilterVisibility = ({setIsFilterVisible}) => {
    setIsFilterVisible((prevVisibility) => !prevVisibility);
  };

//   export const InputFieldHandler = ({event, setValues})=>{
//     const {name, value} = event.target
//     setValues((prevState)=>({
//         ...prevState,
//         [name]:value
//     }))
//   }
