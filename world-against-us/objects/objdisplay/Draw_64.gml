// DEBUG FPS
if (global.DEBUGMODE)
{
	draw_set_color(c_yellow);
	draw_text(32, 32, "FPS real: " + string(fpsReal));
	draw_text(32, 64, "FPS: " + string(_fps));

	// RESET DRAW PROPERTIES
	ResetDrawProperties();
}

// NETWORKING INFO
draw_set_font(font_small_bold);
draw_set_color(c_red);
draw_set_halign(fa_right);
		
draw_text(global.GUIW - 20, 10, string("{0} :Status", global.MultiplayerMode ? "Online" : "Offline"));

if (global.MultiplayerMode)
{
	if (!is_undefined(global.NetworkHandlerRef.socket))
	{
		if (global.NetworkHandlerRef.client_id != UNDEFINED_UUID)
		{
			draw_text(global.GUIW - 20, 30, string("{0} :client_id", global.NetworkHandlerRef.client_id));
			draw_text(global.GUIW - 20, 50, string("{0} :Region ID", global.NetworkRegionHandlerRef.region_id ?? "Unknown"));
			draw_text(global.GUIW - 20, 70, string("{0} :Prev region ID", global.NetworkRegionHandlerRef.prev_region_id ?? "Unknown"));
			draw_text(global.GUIW - 20, 90, string("{0} :Room index", global.NetworkRegionHandlerRef.room_index ?? "Unknown"));
			var ownerClientID = (global.NetworkRegionHandlerRef.owner_client == UNDEFINED_UUID) ? "Unknown" : global.NetworkRegionHandlerRef.owner_client;
			draw_text(global.GUIW - 20, 110, string("{0} :Region Owner", (global.NetworkHandlerRef.client_id == ownerClientID) ? "Self" : ownerClientID));
			draw_text(global.GUIW - 20, 130, string("{0}ms :Ping", !is_undefined(global.NetworkConnectionSamplerRef.ping) ? global.NetworkConnectionSamplerRef.ping : "-"));
			draw_text(global.GUIW - 20, 150, string("{0}kb/s :Out", !is_undefined(global.NetworkConnectionSamplerRef.last_data_sent_rate) ? (global.NetworkConnectionSamplerRef.last_data_sent_rate * 0.001)  : "-"));
		}
	}
}

var iconSize = new Size(30, 30);
var iconScale = ScaleSpriteToFitSize(sprWarningIcon, iconSize);
var iconPosition = new Vector2(global.GUIW * 0.5 - iconSize.w, 10);
draw_sprite_ext(
	sprWarningIcon, 0,
	iconPosition.X, iconPosition.Y,
	iconScale, iconScale,
	0, c_white, 1
);
draw_set_valign(fa_middle);
var consoleLogCount = global.ConsoleHandlerRef.GetConsoleLogCount();
draw_text(iconPosition.X + iconSize.w + 10, iconPosition.Y + (iconSize.h * 0.5), consoleLogCount);
		
// RESET DRAW PROPERTIES
ResetDrawProperties();