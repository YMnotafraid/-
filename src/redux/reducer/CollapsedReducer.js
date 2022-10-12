const CollapsedReducer=(prevState={
    collapsed:false
},action)=>{
    let newstate = {...prevState};
    switch(action.type){
        case "change_collapsed":
                newstate.collapsed=!newstate.collapsed;
                return newstate;
        default:
            return prevState;
    }
}
export default CollapsedReducer