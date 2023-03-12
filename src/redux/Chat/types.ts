import { Status } from "../../enum/EnumStatus";

export interface ChatState {
    messages: MessageParams[],
    userChats: ChatParams[],
    chat: ChatParams,
    statusGetMessagesChat: Status,
    statusDeleteMessage: Status,
    statusUserChats: Status,
    statusGetChat: Status,
    statusChatMes: Status,
    statusAddChat: Status,
}

export interface MessageParams {
    id: number,
    chatId: number
    userName: string,
    message: string,
    dateWrite: string,
    pathPhoto: string
}

export interface ChatParams {
    id: number,
    nameChat: string,
    chatCreator: string,
    dateCreat: string
}

export interface AddChatParams {
    nameChat: string,
}