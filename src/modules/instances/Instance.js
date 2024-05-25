import ROOM_INDEX from "./RoomIndex.js";
import AI_STATE_BANDIT from "../patrols/AIStateBandit.js";
import PATROL_ROUTES from "../patrols/PatrolRoutes.js";

import ConsoleHandler from "../console/ConsoleHandler.js";
import ContainerHandler from "../containers/ContainerHandler.js";
import Patrol from "../patrols/Patrol.js";
import PatrolState from "../patrols/PatrolState.js";
import InstanceSnapshot from "./InstanceSnapshot.js";

import GetRandomIntFromRange from "../math/GetRandomIntFromRange.js";
import FormatHashMapToJSONStructArray from "../formatting/FormatHashMapToJSONStructArray.js";

const UNDEFINED_UUID = "nuuuuuuu-uuuu-uuuu-uuuu-ullundefined";
const MAX_PATROL_ID = 100;

export default class Instance {
  constructor(instanceId, roomIndex, networkHandler) {
    this.instanceId = instanceId;
    this.roomIndex = roomIndex;
    this.networkHandler = networkHandler;
    this.parentInstanceId = undefined;
    this.ownerClient = undefined;
    this.localPlayers = {};
    this.localPatrols = {};
    this.patrolRoute = PATROL_ROUTES[roomIndex];
    this.containerHandler = new ContainerHandler(this.networkHandler);

    this.availablePatrolId = 0;
  }

  toJSONStruct() {
    const formatOwnerClient = this.ownerClient ?? UNDEFINED_UUID;
    const formatLocalPlayers = FormatHashMapToJSONStructArray(
      this.localPlayers
    );
    const arrivedPatrols = Object.values(this.localPatrols).filter(
      (patrolJSONObject) => patrolJSONObject.travelTime <= 0
    );
    const formatPatrols = FormatHashMapToJSONStructArray(arrivedPatrols);
    return {
      region_id: this.instanceId,
      room_index: this.roomIndex,
      owner_client: formatOwnerClient,
      local_players: formatLocalPlayers,
      arrived_patrols: formatPatrols,
    };
  }

  update(passedTickTime) {
    let isUpdated = true;
    if (this.patrolRoute !== undefined) {
      isUpdated = this.updateLocalPatrols(passedTickTime);
    }
    return isUpdated;
  }

  fetchInstanceSnapshot() {
    return new InstanceSnapshot(
      this.instanceId,
      this.getAllPlayers(),
      this.getAllLocalPatrols()
    );
  }

  addPlayer(clientId, player) {
    let isPlayerAdded = false;
    // Check for existing player
    if (this.getPlayer(clientId) === undefined) {
      // Add new player
      this.localPlayers[clientId] = player;
      // Set instance owner
      if (this.ownerClient === undefined) {
        this.setOwner(clientId);
      }
      isPlayerAdded = true;
    }
    return isPlayerAdded;
  }

  getPlayer(clientId) {
    return this.localPlayers[clientId];
  }

  getAllPlayerIds() {
    return Object.keys(this.localPlayers);
  }

  getAllPlayers() {
    return Object.values(this.localPlayers);
  }

  getAllRemotePlayers(excludeClientId) {
    const remotePlayers = this.getAllPlayerIds().filter((clientId) => {
      return clientId !== excludeClientId;
    });
    return remotePlayers.map((clientId) => {
      return this.getPlayer(clientId);
    });
  }

  getPlayerIdFirst() {
    let foundPlayerId = undefined;
    if (this.getPlayerCount() > 0) {
      foundPlayerId = this.getAllPlayerIds()[0];
    }
    return foundPlayerId;
  }

  getAllPlayerIds(ignoreClientIds = []) {
    return Object.keys(this.localPlayers).filter(
      (clientId) => !ignoreClientIds.includes(clientId)
    );
  }

  getPlayerCount() {
    return Object.keys(this.localPlayers).length;
  }

  addPatrol(patrol) {
    let isPatrolAdded = true;
    this.localPatrols[this.availablePatrolId] = patrol;

    switch (this.patrolRoute.roomIndex) {
      case ROOM_INDEX.ROOM_TOWN:
        {
          ConsoleHandler.Log(
            `Patrol with ID ${patrol.patrolId} started traveling towards Town, remaining ${patrol.travelTime}`
          );
        }
        break;
      case ROOM_INDEX.ROOM_FOREST:
        {
          ConsoleHandler.Log(
            `Patrol with ID ${patrol.patrolId} started traveling towards Forest, remaining ${patrol.travelTime}`
          );
        }
        break;
    }

    if (++this.availablePatrolId >= MAX_PATROL_ID) {
      this.availablePatrolId = 0;
    }
    return isPatrolAdded;
  }

  getPatrol(patrolId) {
    return this.localPatrols[patrolId];
  }

  getAllPatrolIds() {
    return Object.keys(this.localPatrols);
  }

  getAllPatrols() {
    return Object.values(this.localPatrols);
  }

  getAllLocalPatrols() {
    return this.getAllPatrols().filter((patrol) => patrol.travelTime <= 0);
  }

  getPatrolCount() {
    const patrolIds = this.getAllPatrolIds();
    const arrivedPatrols = patrolIds.filter((patrolId) => {
      let isArrived = false;
      const patrol = this.getPatrol(patrolId);
      if (patrol !== undefined) {
        isArrived = patrol.travelTime <= 0;
      }
      return isArrived;
    });
    return arrivedPatrols.length;
  }

  updateLocalPatrols(passedTickTime) {
    let isPatrolsUpdated = false;
    const localPatrolIds = this.getAllPatrolIds();
    if (localPatrolIds.length <= 0) {
      const randomPatrolCount = GetRandomIntFromRange(
        this.patrolRoute.minPatrolCount,
        this.patrolRoute.maxPatrolCount
      );
      const randomTravelTime = GetRandomIntFromRange(
        this.patrolRoute.minTravelTime,
        this.patrolRoute.maxTravelTime
      );
      for (let i = 0; i < randomPatrolCount; i++) {
        const newPatrol = new Patrol(
          this.availablePatrolId,
          this.instanceId,
          this.patrolRoute.routeTime,
          randomTravelTime
        );
        this.addPatrol(newPatrol);
      }
      isPatrolsUpdated = true;
    } else {
      localPatrolIds.forEach((patrolId) => {
        const patrol = this.getPatrol(patrolId);
        if (patrol !== undefined) {
          if (patrol.travelTime > 0) {
            patrol.travelTime = Math.max(0, patrol.travelTime - passedTickTime);
          } else {
            switch (patrol.aiState) {
              case AI_STATE_BANDIT.TRAVEL:
                {
                  patrol.aiState = AI_STATE_BANDIT.PATROL;
                  ConsoleHandler.Log(
                    `Patrol with ID ${patrolId} arrived to destination`
                  );
                  // Broadcast new state
                  const formatRouteProgress = patrol.getRouteProgress();
                  const patrolState = new PatrolState(
                    this.instanceId,
                    patrolId,
                    patrol.aiState,
                    formatRouteProgress,
                    patrol.position,
                    patrol.targetNetworkId
                  );
                  this.networkHandler.broadcastPatrolState(
                    this.instanceId,
                    patrolState
                  );
                }
                break;
              case AI_STATE_BANDIT.PATROL:
                {
                  // Simulate patrol movements when game area is empty
                  if (this.ownerClient === undefined) {
                    if (patrol.aiState === AI_STATE_BANDIT.PATROL) {
                      patrol.routeTime -= passedTickTime;
                      patrol.routeProgress = patrol.getRouteProgress();
                    }
                    if (patrol.routeTime <= 0) {
                      patrol.aiState = AI_STATE_BANDIT.PATROL_END;
                      ConsoleHandler.Log(
                        `Patrol with ID ${patrolId} left the area`
                      );
                      // Broadcast new state
                      const formatRouteProgress = patrol.getRouteProgress();
                      const patrolState = new PatrolState(
                        this.instanceId,
                        patrolId,
                        patrol.aiState,
                        formatRouteProgress,
                        patrol.position,
                        patrol.targetNetworkId
                      );
                      this.networkHandler.broadcastPatrolState(
                        this.instanceId,
                        patrolState
                      );
                      this.removePatrol(patrolId);
                    }
                  }
                }
                break;
            }
          }
        }
      });
      isPatrolsUpdated = true;
    }
    return isPatrolsUpdated;
  }

  syncPatrolState(patrolState) {
    var isStateHandled = false;
    const patrol = this.getPatrol(patrolState.patrolId);
    if (patrol !== undefined) {
      patrol.aiState = patrolState.aiState;
      if (patrol.aiState !== AI_STATE_BANDIT.PATROL_END) {
        patrol.routeProgress = patrolState.routeProgress;
        patrol.routeTime = patrol.totalRouteTime * patrol.routeProgress;
        patrol.position = patrolState.position;
        patrol.targetNetworkId = patrolState.targetNetworkId;
      } else {
        this.removePatrol(patrol.patrolId);
      }
      isStateHandled = true;
    }
    return isStateHandled;
  }

  removePatrol(patrolId) {
    let isPatrolRemoved = false;
    if (this.getPatrol(patrolId) !== undefined) {
      delete this.localPatrols[patrolId];
      isPatrolRemoved = true;
    }
    return isPatrolRemoved;
  }

  setOwner(clientId) {
    this.ownerClient = clientId;
    // If owner leaves, run clean up
    if (clientId === undefined) {
      this.onOwnerLeave();
    }
  }

  resetOwner() {
    let isOwnerReset = false;
    if (this.getPlayerCount() > 0) {
      const playerId = this.getPlayerIdFirst();
      if (playerId !== undefined) {
        this.setOwner(playerId);
        isOwnerReset = true;
      } else {
        this.setOwner(undefined);
        isOwnerReset = true;
      }
    } else {
      this.setOwner(undefined);
      isOwnerReset = true;
    }
    return isOwnerReset;
  }

  onOwnerLeave() {
    // Reset patrol states on chase and resume
    if (this.roomIndex !== ROOM_INDEX.ROOM_CAMP) {
      this.getAllPatrols().forEach((patrol) => {
        if (
          patrol.aiState === AI_STATE_BANDIT.CHASE ||
          patrol.aiState === AI_STATE_BANDIT.PATROL_RESUME
        ) {
          patrol.forceResumePatrolling();
        }
      });
    }
  }

  removePlayer(clientId) {
    let isPlayerRemoved = false;
    const player = this.getPlayer(clientId);
    if (player !== undefined) {
      // End active inventory stream
      const activeInventoryStream =
        this.containerHandler.getActiveInventoryStreamByClientId(clientId);
      if (activeInventoryStream !== undefined) {
        this.containerHandler.removeActiveInventoryStream(
          activeInventoryStream.inventoryId
        );
      }
      // Release container access
      const requestedContainer =
        this.containerHandler.getContainerByRequestingClientId(clientId);
      if (requestedContainer !== undefined) {
        requestedContainer.requestingClient = undefined;
      }

      delete this.localPlayers[clientId];
      isPlayerRemoved = true;
    }
    return isPlayerRemoved;
  }
}
