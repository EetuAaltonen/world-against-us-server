depth = -9000;

var systemTimeStart = string(current_hour) + ":" + string(current_minute) + "." + string(current_second);
show_debug_message(EMPTY_STRING);
show_debug_message(string("------------ Game Launching {0} ------------", systemTimeStart));

controllers = [
	// LAUNCH ROOM
	new GameController(objDisplay, [], [], LAYER_CONTROLLERS_FRONT),
	new GameController(objGameWindow, [], []),
	
	// GLOBAL VARIABLES
	new GameController(objGlobals, [], [roomLaunch]),
	
	// CAMERA
	new GameController(objCamera, [], [roomLaunch]),
	
	// GUI
	new GameController(objGUI, [], [roomLaunch]),
	
	// MOUSE
	new GameController(objMouse, [], [roomLaunch], LAYER_CONTROLLERS_ALL_FRONT),
	
	// NOTIFICATION
	new GameController(objNotification, [], [roomLaunch], LAYER_CONTROLLERS_FRONT),
	
	// NETWORK
	new GameController(objNetwork, [], [roomLaunch]),
	
	// MAIN MENU
	new GameController(objMainMenu, [roomMainMenu], [roomLaunch]),
	
	// DATABASE
	new GameController(objDatabase, [], [roomLaunch, roomMainMenu]),
	
	// HUD
	new GameController(objHud, [], [roomLaunch, roomMainMenu, roomLoadResources], LAYER_CONTROLLERS_BEHIND),
	
	// WORLD STATE
	new GameController(objWorldState, [], [roomLaunch, roomMainMenu]),
	
	// QUEST
	new GameController(objQuest, [], [roomLaunch, roomMainMenu]),
	
	// JOURNAL
	new GameController(objJournal, [], [roomLaunch, roomMainMenu]),
	
	// DIALOGUE
	new GameController(objDialogue, [], [roomLaunch, roomMainMenu]),
	
	// MAP
	new GameController(objMap, [], [roomLaunch, roomMainMenu], LAYER_CONTROLLERS_BEHIND),
	
	// INVENTORY
	new GameController(objInventory, [], [roomLaunch, roomMainMenu]),
	
	// HIGHLIGHT
	new GameController(objInstanceHighlighter, [], [roomLaunch, roomMainMenu, roomLoadResources], LAYER_HIGHLIGHT_INTERACTABLE),
	
	// GRID PATH
	new GameController(objGridPath, [], [roomLaunch, roomMainMenu, roomLoadResources]),
	
	// TEMP INVENTORY
	new GameController(objTempInventory, [], [roomLaunch, roomMainMenu, roomLoadResources]),
	

	// LOAD THE GAME SAVE OBJECT LAST
	// TO SET THE WORLD STATE AFTER EVERYTHING IS LOADED
	new GameController(objGameSave, [], [roomLaunch])
];

// CONTROLLER LAYERS
controllerLayers = ds_map_create();
ds_map_add(controllerLayers, LAYER_CONTROLLERS, depth);
ds_map_add(controllerLayers, LAYER_CONTROLLERS_BEHIND, depth + 1);
ds_map_add(controllerLayers, LAYER_CONTROLLERS_FRONT, depth - 1);
ds_map_add(controllerLayers, LAYER_CONTROLLERS_ALL_FRONT, depth - 2);

ds_map_add(controllerLayers, LAYER_HIGHLIGHT_TARGET, depth); // DEPTH CHANGED AT RUNTIME
ds_map_add(controllerLayers, LAYER_HIGHLIGHT_INTERACTABLE, depth); // DEPTH CHANGED AT RUNTIME

// ROOM FADE-IN EFFECT
roomFadeAlphaStart = 1;
roomFadeAlpha = 0;
roomFadeAlphaStep = 0.015;