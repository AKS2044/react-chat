import { Status } from "../../enum/EnumStatus";

export interface ChatState {
    message: MessageParams,
    userChats: ChatParams[],
    statusUserChats: Status,
    statusChatMes: Status,
    statusAddChat: Status,
}

export interface MessageParams {
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