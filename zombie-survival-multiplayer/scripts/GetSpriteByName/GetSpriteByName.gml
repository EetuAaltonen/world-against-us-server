function GetSpriteByName(_spriteName)
{
	var spriteIndex = asset_get_index(_spriteName);
	if (!sprite_exists(spriteIndex)) { spriteIndex = sprMissingSprite; }
	return spriteIndex;
}