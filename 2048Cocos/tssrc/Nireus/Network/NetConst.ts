const enum TypedArraySize {
    SIZE_OF_BOOLEAN = 1,
    SIZE_OF_INT8 = 1,
    SIZE_OF_INT16 = 2,
    SIZE_OF_INT32 = 4,
    SIZE_OF_FLOAT32 = 4
}

// 包类型
enum PackType {
    PACK_TYPE__SYNCPROC = 1,		// 客户端同步包，需要服务端回包;
    PACK_TYPE__ASYNCPROC = 4,		// 客户端异步包，不需要回包;
    PACK_TYPE__PROCREPLY = 2,		// 服务端回复包;
    PACK_TYPE__DISPATCH = 3,		// 服务端主动发送包;
}

// 协议类型
enum ProcType {
    PROC_TYPE__USER,				// 用户包;
    PROC_TYPE__SERVER_VERIFY,		// 其他服务端发送的验证包;
    PROC_TYPE__SERVER_NORMAL,		// 其他服务端发送的普通包;
    PROC_TYPE__FCGI_REQUEST,		// FCGI request包;
    PROC_TYPE__FCGI_RESPONSE,		// FCGI response包;
}

enum SocketConst {
    SOCKET_RESULT_FAIL = 0, // fail
    SOCKET_RESULT_SUCC = 1  // success
}

enum ContentType {
    COMMON = 0,             // common content
    JSON = 1                // json file
}

export { PackType, ProcType, SocketConst, ContentType, TypedArraySize };
