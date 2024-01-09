export default {
  ACKNOWLEDGMENT: 0,
  CONNECT_TO_HOST: 1,
  REMOTE_CONNECTED_TO_HOST: 2,
  PING: 3,
  PONG: 4,
  DISCONNECT_FROM_HOST: 5,
  REMOTE_DISCONNECT_FROM_HOST: 6,

  REQUEST_JOIN_GAME: 7,
  SYNC_WORLD_STATE: 8,
  SYNC_WORLD_STATE_WEATHER: 9,
  SYNC_INSTANCE: 10,
  INSTANCE_SNAPSHOT_DATA: 11,

  REQUEST_INSTANCE_LIST: 12,
  REQUEST_FAST_TRAVEL: 13,
  REQUEST_PLAYER_LIST: 14,

  DATA_PLAYER_SYNC: 15,
  PLAYER_DATA_POSITION: 16,
  DATA_PLAYER_VELOCITY: 17,
  PLAYER_DATA_MOVEMENT_INPUT: 18,
  DATA_PLAYER_WEAPON_FUNCTION: 19,
  DATA_PLAYER_WEAPON_EQUIP: 20,

  REMOTE_ENTERED_THE_INSTANCE: 21,
  REMOTE_DATA_POSITION: 22,
  REMOTE_DATA_MOVEMENT_INPUT: 23,
  REMOTE_LEFT_THE_INSTANCE: 24,
  REMOTE_RETURNED_TO_CAMP: 25,

  REQUEST_CONTAINER_CONTENT: 26,
  START_CONTAINER_INVENTORY_STREAM: 27,
  CONTAINER_INVENTORY_STREAM: 28,
  END_CONTAINER_INVENTORY_STREAM: 29,
  CONTAINER_INVENTORY_ADD_ITEM: 30,
  CONTAINER_INVENTORY_ADD_STACK: 31,
  CONTAINER_INVENTORY_IDENTIFY_ITEM: 32,
  CONTAINER_INVENTORY_ROTATE_ITEM: 33,
  CONTAINER_INVENTORY_REMOVE_ITEM: 34,
  RELEASE_CONTAINER_CONTENT: 35,

  PATROL_STATE: 36,
  PATROLS_SNAPSHOT_DATA: 37,

  REQUEST_SCOUT_LIST: 38,
  START_OPERATIONS_SCOUT_STREAM: 39,
  OPERATIONS_SCOUT_STREAM: 40,
  END_OPERATIONS_SCOUT_STREAM: 41,

  SYNC_SCOUTING_DRONE_DATA: 42,
  SCOUTING_DRONE_DATA_POSITION: 43,
  DESTROY_SCOUTING_DRONE_DATA: 44,

  INVALID_REQUEST: 45,
  SERVER_ERROR: 46,
  CLIENT_ERROR: 47,
};
