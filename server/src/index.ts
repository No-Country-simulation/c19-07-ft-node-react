import Server from './app'
import './configs/cronJob'


const server = new Server()

server.start()
