local DJConfig={}
local _Config = {
[1]={ID=1,NextID=2,TimeTotal=1,Test={{Name="Lee1",Age=29},{Name="Lee1",Age=29}},Data={1,2,3},Time=1,ItemOnline={ID=700000000,Num=30000}},
[2]={ID=2,NextID=3,TimeTotal=3,Time=2,ItemOnline={ID=701050000,Num=200}},
[3]={ID=3,NextID=4,TimeTotal=5,Time=2,ItemOnline={ID=700000001,Num=200}},
[4]={ID=4,NextID=5,TimeTotal=7,Time=2,ItemOnline={ID=702000000,Num=30}},
[5]={ID=5,NextID=6,TimeTotal=10,Time=3,ItemOnline={ID=700000000,Num=200000}},
[6]={ID=6,NextID=7,TimeTotal=13,Time=3,ItemOnline={ID=701050101,Num=3}},
[7]={ID=7,NextID=8,TimeTotal=18,Time=5,ItemOnline={ID=700000000,Num=500000}},
[8]={ID=8,NextID=9,TimeTotal=23,Time=5,ItemOnline={ID=701050103,Num=1}},
[9]={ID=9,TimeTotal=33,Time=10,ItemOnline={ID=700000001,Num=500}},
}
local _length = 9

function DJConfig.getData(Id,ingore)
	local result = nil
	if Id then
		result = _Config[Id]
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