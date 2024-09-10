import Tooltip from '@mui/joy/Tooltip';
import { useState, useEffect } from 'react';
import { FaRegCopy } from "react-icons/fa";


const CopyButton = ({ textToCopy }) => {

    const [copiedText, setCopiedText] = useState("");
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(textToCopy).then(() => {
            console.log('Text copied to clipboard!');
            setCopiedText("Copied!");
            setTooltipOpen(true);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    };

    useEffect(() => {
        let timer;
        if (tooltipOpen) {
            timer = setTimeout(() => {
                setTooltipOpen(false);
            }, 1000);
        }
        return () => clearTimeout(timer);
    }, [tooltipOpen]);

    return (
        <Tooltip open={tooltipOpen} title={copiedText} variant="solid">
            <button onClick={handleCopy}>
                <FaRegCopy className='text-neutral-500' />
            </button>
        </Tooltip>
    );
};

export default CopyButton;