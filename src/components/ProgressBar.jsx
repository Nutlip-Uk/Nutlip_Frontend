const Progress_bar = ({bgcolor,progress,height}) => { 
     
    const Parentdiv = { 
        height: height, 
        width: '100%', 
        backgroundColor: '#FFF', 
        borderRadius: 0, 
        margin: 0 ,
        // alignSelf: 'start'
    } 
    
    const Childdiv = { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%', 
        width: `${progress}%`, 
        backgroundColor: bgcolor, 
        borderRadius: 0,
    } 
    
    const progresstext = {
        padding: 10, 
        color: 'white', 
        fontWeight: 500,
        fontSize: 12
    } 
        
    return ( 
    <div style={Parentdiv}> 
      <div style={Childdiv}> 
        <span style={progresstext}>{`${progress}%`}</span> 
      </div> 
    </div> 
    ) 
} 
  
export default Progress_bar; 