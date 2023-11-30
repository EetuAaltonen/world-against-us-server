import PACKET_PRIORITY from "../network/PacketPriority.js";

export default class NetworkPacket {
  constructor(header, payload, priority) {
    this.header = header;
    this.payload = payload;
    this.priority = priority;
    // TODO: Resend dropped in-flight packets
    /*this.ackTimeoutCallbackFunc = ackTimeoutCallbackFunc;
    this.maxAcknowledgmentAttempts = 2;
    this.acknowledgmentAttempt = 1;*/
    this.acknowledgmentTimeout = 3000; // == 3s
    this.timeoutTimer = this.acknowledgmentTimeout;
  }

  update(passedTickTime) {
    if (!isTimedOut()) {
      this.timeoutTimer -= max(0, passedTickTime);
    }
  }

  // TODO: Add with acknowledgment attempts
  /*restartTimeOut() {
    this.timeoutTimer = this.acknowledgmentTimeout;
  }*/

  isTimedOut() {
    return this.timeoutTimer <= 0;
  }
}