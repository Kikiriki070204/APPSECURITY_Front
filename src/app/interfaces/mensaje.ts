export interface Mensaje {
    id: number
    sender_id: number
    recipient_id: number
    content: Text
    timestamp: Date 
}

export interface SentMessage {
    sender_id: number
    recipient_id: number
    content: Text
}

