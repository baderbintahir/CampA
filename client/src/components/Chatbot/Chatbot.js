import React from 'react'
import ReactChatbot from 'react-chatbot-kit'

import ActionProvider from "./ActionProvider";
import MessageParser from "./MessageParser";
import config from "./config";

import './Chatbot.css'

const Chatbot = () => {
    return (
        <div className="chatbot">
            <ReactChatbot
                config={config}
                actionProvider={ActionProvider}
                messageParser={MessageParser}
            />
        </div>
    )
}

export default Chatbot