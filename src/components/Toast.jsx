import React, { useEffect } from 'react';
import { Message, useToaster } from 'rsuite';

const Toast = ({ type = 'info', placement = 'topCenter', duration = 4000, content }) => {
    const toaster = useToaster();

    useEffect(() => {
        const message = (
            <Message showIcon type={type} closable>
                <strong>{type}!</strong> {content}
            </Message>
        );

        // Push the toast automatically on component mount
        const toastKey = toaster.push(message, { placement, duration });

        // Cleanup function to remove the toast after the duration
        return () => {
            toaster.remove(toastKey);
        };
    }, [type, placement, duration, content, toaster]);

    return null; // No need to return any UI, since the toast works automatically
};

export default Toast;