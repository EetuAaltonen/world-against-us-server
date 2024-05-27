export default class PatrolRoute {
  constructor(
    roomIndex,
    pathIndex,
    minTravelTime,
    maxTravelTime,
    routeTime,
    minPatrolCount,
    maxPatrolCount
  ) {
    this.roomIndex = roomIndex;
    this.pathIndex = pathIndex;
    this.minTravelTime = minTravelTime; //ms
    this.maxTravelTime = maxTravelTime; //ms
    this.routeTime = routeTime; //ms
    this.minPatrolCount = minPatrolCount;
    this.maxPatrolCount = maxPatrolCount;
  }
}
