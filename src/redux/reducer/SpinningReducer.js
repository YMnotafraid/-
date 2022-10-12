const SpinningReducer=(prevState={
    spinning:false
},action)=>{
    let newstate = {...prevState};
    switch(action.type){
        case "change_spinning":
                newstate.spinning=action.payload;
                return newstate;
        default:
            return prevState;
    }
}
export default SpinningReducer