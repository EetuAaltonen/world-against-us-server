import AI_STATE from "./AIState.js";
import GetRandomInt from "../math/GetRandomInt.js";
import Vector2 from "../math/Vector2.js";

const MIN_TRAVEL_TIME = 4000;
const MAX_TRAVEL_TIME = 20000;

export default class Patrol {
  constructor(patrolId, routeTime) {
    this.patrolId = patrolId;
    this.totalRouteTime = routeTime;
    this.routeTime = routeTime;
    this.aiState = AI_STATE.QUEUE;
    this.travelTime = GetRandomInt(MIN_TRAVEL_TIME, MAX_TRAVEL_TIME);

    this.localPosition = new Vector2(0, 0);
  }

  toJSONStruct() {
    var formatTravelTime = Math.max(0, this.travelTime);
    var formatScaledRouteProgress = Math.round(
      (1 - this.routeTime / this.totalRouteTime) * 1000
    );
    var formatLocalPosition = this.localPosition.toJSONStruct();
    return {
      patrol_id: this.patrolId,
      ai_state: this.aiState,
      travel_time: formatTravelTime,
      scaled_route_progress: formatScaledRouteProgress,
      local_position: formatLocalPosition,
    };
  }
}
