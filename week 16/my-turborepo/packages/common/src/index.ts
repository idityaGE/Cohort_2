const msg: string = "Hello to my Sever from common dir"

export { msg }

// We dont need to compile the common package to use it in the server package. We can use the source code directly. 
// This is because we will compile the server package. The server package will be the one that will be running in the server.