import Image from "next/image"

export const Chat = ({ top, right, position }) => {
    const imageStyle = {
        padding: 9,
        backgroundColor: '#001F6D',
        borderRadius: `50%`,
        position: position,
        top: top,
        right: right
    }

    return (
        <Image style={imageStyle} src="/icons/basil_chat-outline.svg" width={40} height={40} alt="message"/>
    )
}