function MetadataAmmo(_caliber) : Metadata() constructor
{
	caliber = _caliber;
	
	static ToJSONStruct = function()
	{
		return {
			caliber: caliber
		}
	}
}