function CreateWindowItemActionMenu(_zIndex, _targetItem)
{
	var windowSize = new Size(global.GUIW, global.GUIH);
	var windowStyle = new GameWindowStyle(c_black, 0);
	var actionMenuWindow = new GameWindow(
		GAME_WINDOW.ItemActionMenu,
		new Vector2(0, 0),
		windowSize, windowStyle, _zIndex
	);
	var actionMenuElements = ds_list_create();
	
	// ACTION MENU BUTTONS
	var actionMenuButtons = ds_list_create();
	var actionButtonStyle = new ButtonStyle(
		new Size(200, 25),
		#d4c600, #6e6702, font_small, 1, fa_left, fa_top
	);
	ds_list_add(actionMenuButtons,
		{ title: "Use/Consume", onClick: OnClickActionMenuUse },
		{ title: "Empty/Unload", onClick: OnClickActionMenuEmpty },
		{ title: "Delete", onClick: OnClickActionMenuDelete }
	);
	
	// ACTION MENU
	var mousePosition = MouseGUIPosition();
	var buttonCount = ds_list_size(actionMenuButtons);
	var itemActionMenu = new WindowActionMenu(
		"ItemActionMenu",
		new Vector2(mousePosition.X, mousePosition.Y),
		new Size(
			actionButtonStyle.size.w,
			(buttonCount * actionButtonStyle.size.h + ((buttonCount - 1) * actionButtonStyle.margin))
		),
		c_black, actionMenuButtons, actionButtonStyle,
		_targetItem
	);
	ds_list_add(actionMenuElements, itemActionMenu);
	
	actionMenuWindow.AddChildElements(actionMenuElements);
	return actionMenuWindow;
}