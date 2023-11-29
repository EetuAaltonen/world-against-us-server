function InteractionFuncFastTravelSpotRequest(_sourceRegionId, _destionationRegionId, _roomIndex)
{
	// TODO: Fetch destination room from global world data location map by room index
	if (global.MultiplayerMode)
	{
		var guiState = new GUIState(
			GUI_STATE.WorldMap, undefined, GUI_ACTION.WorldMapFastTravelQueue,
			[GAME_WINDOW.WorldMapFastTravelQueue], GUI_CHAIN_RULE.OverwriteAll,
			undefined, undefined
		);
		if (global.GUIStateHandlerRef.RequestGUIState(guiState))
		{
			global.GameWindowHandlerRef.OpenWindowGroup([
				CreateWindowWorldMapFastTravelQueue(GAME_WINDOW.WorldMapFastTravelQueue, -1)
			]);
			
			// REQUEST FAST TRAVEL
			var networkPacketHeader = new NetworkPacketHeader(MESSAGE_TYPE.REQUEST_FAST_TRAVEL);
			var fastTravelInfo = new WorldMapFastTravelInfo(_sourceRegionId, _destionationRegionId, _roomIndex);
			var networkPacket = new NetworkPacket(
				networkPacketHeader,
				fastTravelInfo,
				PACKET_PRIORITY.DEFAULT,
				AckTimeoutFuncResend
			);
			if (!global.NetworkHandlerRef.AddPacketToQueue(networkPacket))
			{
				show_debug_message("Failed to request fast travel");
			}
		}
	}
}