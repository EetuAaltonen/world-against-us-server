function MetadataItemWeaponGunFlamethrower(_fire_rate, _range, _weapon_offset, _barrel_pos, _right_hand_position, _left_hand_position, _chamber_type, _caliber, _recoil, _attachment_slots) : MetadataItemWeaponGun(_fire_rate, _range, _weapon_offset, _barrel_pos, _right_hand_position, _left_hand_position, _chamber_type, _caliber, _recoil, _attachment_slots) constructor
{
	fuel_tank = undefined;
	
	static ToJSONStruct = function()
	{
		// TODO: Fix ToJSONStruct
		return {
			fuel_tank: fuel_tank
		}
	}
	
	static GetFuelLevel = function()
	{
		var fuelLevel = 0;
		if (!is_undefined(fuel_tank))
		{
			fuelLevel = fuel_tank.metadata.fuel_level;
		}
		return fuelLevel;
	}
}