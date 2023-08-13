function OnClickMenuSingleplayerDeleteConfirmCallback(callerWindowElement)
{
	if (!is_undefined(callerWindowElement))
	{
		var saveInput = callerWindowElement.parentElement.GetChildElementById("SaveInput");
		var saveName = FormatSaveName(saveInput.input);
		var saveFileName = ConcatSaveFileSuffix(saveName);
		
		try
		{
			if (file_exists(saveFileName))
			{
				file_delete(saveFileName);
				saveInput.input = saveInput.placeholder;
				
				// UPDATE SAVE FILE LIST
				var saveFiles = global.GameSaveHandlerRef.FetchSaveFileNames();
				var saveFileList = callerWindowElement.parentWindow.GetChildElementById("SaveFileList");
				if (!is_undefined(saveFileList))
				{
					saveFileList.UpdateDataCollection(saveFiles);
				}
			} else {
				global.NotificationHandlerRef.AddNotification(
					new Notification(
						undefined,
						"Save file not found",
						undefined,
						NOTIFICATION_TYPE.Log
					)
				);
			}
		} catch (error)
		{
			show_debug_message(error);
			show_message(error);
		}
	}
}