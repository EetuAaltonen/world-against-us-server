function CreateAndOpenWindowConfirm(_title, _description, _callerWindowElement, _confirmCallbackFunction)
{
	var windowSize = new Size(global.GUIW, global.GUIH);
	var windowStyle = new GameWindowStyle(c_black, 0.9);
	var confrimWindow = new GameWindow(
		GAME_WINDOW.Confirm,
		new Vector2(0, 0),
		windowSize, windowStyle, _callerWindowElement.parentWindow.zIndex - 1
	);
	
	var dialogElements = ds_list_create();
	
	var panelSize = new Size(600, 200);
	var panelPosition = new Vector2(
		windowSize.w * 0.5 - (panelSize.w * 0.5),
		windowSize.h * 0.5 - (panelSize.h * 0.5)
	);
	var dialogPanel = new WindowPanel(
		"SaveFilePanel",
		panelPosition, panelSize, #d6d6d6
	);
	ds_list_add(dialogElements,
		dialogPanel
	);
	
	var dialogPanelElements = ds_list_create();
	// PANEL TITLE
	var dialogPanelTitle = new WindowText(
		"DialogPanelTitle",
		new Vector2(panelSize.w * 0.5, 50),
		undefined, undefined,
		_title, font_large, fa_center, fa_middle, c_black, 1
	);
	
	// PANEL DESCRIPTION
	var dialogPanelDescription = new WindowText(
		"SaveFilePanelDescription",
		new Vector2(panelSize.w * 0.5, 100),
		undefined, undefined,
		_description, font_small_bold,
		fa_center, fa_middle, c_black, 1
	)
	
	// CONFIRM BUTTON
	var buttonSize = new Size(140, 40);
	var buttonPosition = new Vector2(
		panelSize.w * 0.5 - buttonSize.w - 5,
		panelSize.h - (buttonSize.h * 0.5) - 50
	);
	var buttonStyle = new ButtonStyle(
		buttonSize, 0,
		#48a630, #2c8017,
		fa_left, fa_middle,
		c_black, c_black,
		font_default,
		fa_center, fa_middle
	);
	
	var 
	
	var confirmButton = new WindowButton(
		"ConfirmButton",
		buttonPosition, buttonSize,
		buttonStyle.button_background_color, "Confirm", buttonStyle, OnClickConfirmWindowAccept,
		{ confirmCallbackFunction: _confirmCallbackFunction, callerWindowElement: _callerWindowElement }
	);
	
	// CANCEL BUTTON
	buttonPosition = new Vector2(
		panelSize.w * 0.5 + 5,
		panelSize.h - (buttonSize.h * 0.5) - 50
	);
	buttonStyle = new ButtonStyle(
		buttonSize, 0,
		#a63030, #801717,
		fa_left, fa_middle,
		c_black, c_black,
		font_default,
		fa_center, fa_middle
	);
	
	var cancelButton = new WindowButton(
		"CancelButton",
		buttonPosition,	buttonSize,
		buttonStyle.button_background_color, "Cancel", buttonStyle, OnClickConfirmWindowCancel
	);
	
	ds_list_add(dialogPanelElements,
		dialogPanelTitle,
		dialogPanelDescription,
		confirmButton,
		cancelButton
	);
	
	confrimWindow.AddChildElements(dialogElements);
	dialogPanel.AddChildElements(dialogPanelElements);
	
	
	// SET GUI STATE AND OPEN CONFIRM WINDOW
	var guiState = new GUIState(
		GUI_STATE.Confirm, undefined, undefined,
		[GAME_WINDOW.Confirm], GUI_CHAIN_RULE.Append
	);
	if (global.GUIStateHandlerRef.RequestGUIState(guiState))
	{
		global.GameWindowHandlerRef.OpenWindowGroup([
			confrimWindow
		]);
	}
}