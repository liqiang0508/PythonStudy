local DJConfig={}
local _Config = {
[id_9]={ID=9,TimeTotal=33,Time=10,ItemOnline={ID=700000001,Num=500}},
}
local _length = 1

function DJConfig.getData(Id,ingore)
	local result = nil
	if Id then
		result = _Config["id_"..Id]
		if not result and not ingore then print("could not find Data config : ActivityOnline ID:"..Id) end
	else
		print("the id can not be nil : ActivityOnline ")
	end
    return result
end

function DJConfig.getItem(Id, Key)
	local _data = DJConfig.getData(Id)
	if _data then return _data[Key] end
	return nil
end

function DJConfig.getDataWithKey(Key, Value)
	local _dataList = {}
	for k,_data in pairs(_Config) do
		if type(_data) == "table" and _data[Key] == Value then
			table.insert(_dataList, _data)
		end
	end
	return _dataList
end

function DJConfig.Data()
	local _dataList = {}
 --The following traversal is unordered, and different platforms have different orders. Special attention should be paid when using
	for k,_data in pairs(_Config) do
		if type(_data) == "table" then table.insert(_dataList, _data) end
	end
	return _dataList
end
function DJConfig.getDataCfg()
	return _Config
end
function DJConfig.getDataLength()
	 return _length
end
return DJConfig;