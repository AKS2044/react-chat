import { Status } from "../../enum/EnumStatus";
export interface ChatState {
    messages: MessageParams[],
    userChats: ChatParams[],
    usersChat: UsersChatPayloadParams[],
    chat: ChatParams,
    searchChat: ChatParams[],
    statusEnterChat: Status,
    statusLeaveChat: Status,
    statusSearchChat: Status,
    statusUsersChat: Status,
    statusGetMessagesChat: Status,
    statusDeleteMessage: Status,
    statusUserChats: Status,
    statusGetChat: Status,
    statusChatMes: Status,
    statusAddChat: Status,
}
export interface MessageParams {
    id: number,
    chatId: number,
    chatName: string,
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
export interface UsersChatPayloadParams {
    id: string,
    email: string,
    userName: string,
    pathPhoto: string,
    dateReg: string
}
export interface EnterLeaveChatPayloadParams {
    userId: string,
    chatId: number,
}

export interface UsersCheck {
    connectedId: string | null,
    userName?: string,
    chatName?: string,
}