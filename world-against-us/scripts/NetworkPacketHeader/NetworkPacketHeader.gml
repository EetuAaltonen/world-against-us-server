function NetworkPacketHeader(_message_type, _client_id) constructor
{
	message_type = _message_type;
	client_id = _client_id;
	acknowledgment_id = -1;
	
	static SetAcknowledgmentId = function(_acknowledgment_id)
	{
		acknowledgment_id = _acknowledgment_id;
	}
}