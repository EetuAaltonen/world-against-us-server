import ROOM_INDEX from "../instances/RoomIndex.js";

import PatrolRoute from "./PatrolRoute.js";

export default {
  roomTown: new PatrolRoute(
    ROOM_INDEX.ROOM_TOWN,
    "pthPatrolTown",
    4000,
    10000,
    255000, // == ~4min 15sec
    1,
    3
  ),
  roomForest: new PatrolRoute(
    ROOM_INDEX.ROOM_FOREST,
    "pthPatrolForest",
    4000,
    10000,
    83000, // == ~1min 23sec
    1,
    2
  ),
};
