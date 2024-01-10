const Button = ({bgcolor, textcolor, width, content, action}) => { 
     
    const ButtonStyle = { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: height, 
        width: `${width}%`, 
        backgroundColor: bgcolor, 
        color: textcolor,
        border: 'none',
        padding: 12,
        borderRadius: 8, 
        margin: 0 ,
        // alignSelf: 'start'
    } 
        
    return ( 
    <button onClick={action} style={ButtonStyle}>{content}</button>
    ) 
} 
  
export default Button; 