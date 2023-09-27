import { v4 as uuidv4 } from "uuid";
import Client from "./Client.js";

export default class ClientHandler {
  constructor() {
    this.clients = [];
  }

  connectClient(rinfo) {
    let newUuid = uuidv4();
    const client = new Client(newUuid, rinfo.address, rinfo.port);

    this.clients.push(client);
    console.log(this.clients);
    return newUuid;
  }

  disconnectClient(clientId, rinfo) {
    let isDeleted = false;
    const index = this.clients.findIndex((client) => client.uuid === clientId);
    if (index > -1) {
      this.clients.splice(index, 1);
      console.log(this.clients);
      isDeleted = true;
    }
    return isDeleted;
  }
}
