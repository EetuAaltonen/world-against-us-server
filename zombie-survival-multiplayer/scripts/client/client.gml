function Client(_hostAddress = undefined, _hostPort = undefined) constructor
{
	hostAddress = _hostAddress;
	hostPort = _hostPort;
	socket = undefined;
	clientId = undefined;
	
	tickDelay = TimerRatePerSecond(30);
	tickTimer = tickDelay;
	
	latencyReqDelay = TimerFromSeconds(3);
	latencyReqTimer = latencyReqDelay;
	
	reconnectDelay = TimerFromSeconds(5);
	reconnectTimer = 0;
	
	
	// TODO: Research how to implement a network socket
	static CreateSocket = function(_clientId)
	{
		socket = network_create_socket(network_socket_udp);
		network_connect_raw(socket, hostAddress, hostPort);
	}
	
	static DeleteSocket = function(_clientId)
	{
		SetClientId(undefined);
		network_destroy(socket);
	}
	
	static SetClientId = function(_clientId)
	{
		clientId = _clientId;
	}
	
	static CreateBuffer = function(_messageType)
	{
		var networkBuffer = buffer_create(32, buffer_grow, 1);
		
		buffer_seek(networkBuffer, buffer_seek_start, 0);
		buffer_write(networkBuffer, buffer_u8, _messageType);
		buffer_write(networkBuffer, buffer_text, clientId ?? UNDEFINED_UUID);
		
		return networkBuffer;
	}
	
	static ConnectToHost = function()
	{
		if (!is_undefined(socket))
		{
			var networkBuffer = CreateBuffer(MESSAGE_TYPE.CONNECT_TO_HOST);
			var scaledPosition = ScaleFloatValuesToIntVector2(global.ObjPlayer.x, global.ObjPlayer.y);
			var scaledSpeed = ScaleFloatValuesToIntVector2(global.ObjPlayer.hSpeed, global.ObjPlayer.vSpeed);
		
			var playerData = {
				player_data: new PlayerData(
					clientId,
					new Vector2(scaledPosition.X, scaledPosition.Y),
					new Vector2(scaledSpeed.X, scaledSpeed.Y),
					new InputMap(
						global.ObjPlayer.key_up,
						global.ObjPlayer.key_down,
						global.ObjPlayer.key_left,
						global.ObjPlayer.key_right
					),
					global.ObjWeapon.primaryWeapon ?? {}
				)
			};
			var jsonData = json_stringify(playerData);
		
			buffer_write(networkBuffer, buffer_text, jsonData);
			SendPacketOverUDP(networkBuffer);
		}
	}
	
	static DisconnectFromHost = function()
	{
		var networkBuffer = CreateBuffer(MESSAGE_TYPE.DISCONNECT_FROM_HOST);
		SendPacketOverUDP(networkBuffer);
	}
	
	static CreatePacket = function(_messageType)
	{
		return new Packet(clientId, _messageType);
	}
	
	static SendPacketOverUDP = function(_networkBuffer)
	{
		network_send_udp_raw(socket, hostAddress, hostPort, _networkBuffer, buffer_tell(_networkBuffer));
		buffer_delete(_networkBuffer);
	}
	
	static ResetTickTimer = function()
	{
		tickTimer = tickDelay;
	}
	
	static ResetReconnectTimer = function()
	{
		reconnectTimer = reconnectDelay;
	}
	
	static ResetLatencyReqTimer = function()
	{
		latencyReqTimer = latencyReqDelay;
	}
}