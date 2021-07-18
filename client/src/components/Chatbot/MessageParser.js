import { info } from './info.js'

class MessageParser {
    constructor(actionProvider) {
        this.actionProvider = actionProvider;
        this.info = info()
    }
    
    parse(message) {
        const lowerCaseMessage = message.toLowerCase();
        
        const trigger = [
            ["hi", "hey", "hello"],
            ["how are you", "how are things", "how you doing"],
            ["what is going on", "what is up", "what's going on", "what's up"],
            ["happy", "amazing", "fantastic", "cool", "fine"],
            ["bad", "bored", "tired", "sad"],
            ["thanks", "thank you"],
            ["how many societies"],
            ["list all societies", "names of all societies"],
            ["list admins of all societies", "names of admins of all societies"],
            ["list presidents of all societies", "names of presidents of all societies"],
            ["list vice presidents of all societies", "names of vice presidents of all societies"],
            ["bye", "good bye", "goodbye"]
        ];
    
        const reply = [
            ["Hello", "Hi", "It's nice seeing you!"],
            ["I'm doing good... how are you?", "I feel kind of lonely, how are you?", "I feel happy, how are you?"],
            ["Nothing much", "Exciting things!", "I'm happy to see you!"],
            ["Glad to hear it", "Yayyy!! That's the spirit!"],
            ["There is always a rainbow after the rain!"],
            ["You're welcome", "No problem", "It's my pleasure!"],
            [`There are ${this.info.societies.length} societies.`],
            [`Names of all societies are ${this.info.societies.map(society => ` ${society.username}`)}`],
            [`Names of admins of all societies are ${this.info.societies.map(society => ` ${society.username}: ${society.admin}`)}`],
            [`Names of presidents of all societies are ${this.info.societies.map(society => ` ${society.username}: ${society.president}`)}`],
            [`Names of vice presidents of all societies are ${this.info.societies.map(society => ` ${society.username}: ${society.vicePresident}`)}`],
            ["Goodbye, it was a nice talk"]
        ];
    
        // const alternative = ["Same", "Go on...", "Try again please?", "I'm listening..."];

        let item;
        let items;

        for (let x = 0; x < trigger.length; x++) {
            for (let y = 0; y < reply.length; y++) {
                if (lowerCaseMessage.includes(trigger[x][y])) {
                    items = reply[x];
                    item = items[Math.floor(Math.random() * items.length)];
                    this.actionProvider.sendMessage(item);
                    return
                }
            }
        }

        // if (lowerCaseMessage.includes("javascript")) {
        //     this.actionProvider.handleJavascriptList();
        // }
    }
}

export default MessageParser;