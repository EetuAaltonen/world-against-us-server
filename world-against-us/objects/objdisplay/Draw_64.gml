// DEBUG FPS
if (global.DEBUGMODE)
{
	draw_set_color(c_yellow);
	draw_text(32, 32, "FPS real: " + string(fpsReal));
	draw_text(32, 64, "FPS: " + string(_fps));

	// RESET DRAW PROPERTIES
	ResetDrawProperties();
}