local Config={}
local _Config = {
[1001]={ID=1001,Name="Lee",Hobby={"movie","music"}},
}
local _length = 1

function Config.getData(Id,ingore)
	local result = nil
	if Id then
		result = _Config[Id]
		if not result and not ingore then print("could not find Data config : Person ID:"..Id) end
	else
		print("the id can not be nil : Person ")
	end
    return result
end

function Config.getItem(Id, Key)
	local _data = Config.getData(Id)
	if _data then return _data[Key] end
	return nil
end

function Config.getDataWithKey(Key, Value)
	local _dataList = {}
	for k,_data in pairs(_Config) do
		if type(_data) == "table" and _data[Key] == Value then
			table.insert(_dataList, _data)
		end
	end
	return _dataList
end

function Config.Data()
	local _dataList = {}
 --The following traversal is unordered, and different platforms have different orders. Special attention should be paid when using
	for k,_data in pairs(_Config) do
		if type(_data) == "table" then table.insert(_dataList, _data) end
	end
	return _dataList
end
function Config.getDataCfg()
	return _Config
end
function Config.getDataLength()
	 return _length
end
return Config;