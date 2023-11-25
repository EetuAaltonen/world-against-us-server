enum MESSAGE_TYPE
{
	CONNECT_TO_HOST,
	OTHER_CONNECTED_TO_HOST,
	LATENCY,
	DISCONNECT_FROM_HOST,
	OTHER_DISCONNECT_FROM_HOST,
	
	REQUEST_JOIN_GAME,
	SYNC_WORLD_STATE,
	SYNC_WORLD_STATE_WEATHER,
	
	REQUEST_PLAYER_LIST,
	DATA_PLAYER_SYNC,
	DATA_PLAYER_POSITION,
	DATA_PLAYER_VELOCITY,
	DATA_PLAYER_MOVEMENT_INPUT,
	DATA_PLAYER_WEAPON_FUNCTION,
	DATA_PLAYER_WEAPON_EQUIP,
	
	REQUEST_INSTANCE_LIST,
	REQUEST_FAST_TRAVEL,
	
	REQUEST_CONTAINER_CONTENT,
	START_CONTAINER_INVENTORY_STREAM,
	CONTAINER_INVENTORY_STREAM,
	END_CONTAINER_INVENTORY_STREAM,
	CONTAINER_INVENTORY_ADD_ITEM,
	CONTAINER_INVENTORY_STACK_ITEM,
	CONTAINER_INVENTORY_IDENTIFY_ITEM,
	CONTAINER_INVENTORY_ROTATE_ITEM,
	CONTAINER_INVENTORY_REMOVE_ITEM,
	
	PATROL_STATE,
	
	SERVER_ERROR,
	CLIENT_ERROR,
	
	// ENUM LENGHT
	ENUM_LENGTH
}