
local SpringFestivalLayer = class("SpringFestivalLayer", require("app.core.BaseLayer"))
SpringFestivalLayer.CsbFile = "SpringFestivalLayer.csb"
SpringFestivalLayer.AimType = 1;
SpringFestivalLayer.HasBlackBg = true;

function SpringFestivalLayer:ctor(data)
    self.super.ctor(self);
    self.root_panel = self:bGetCsbNode():getChildByName("root_Panel");
    self:initUI();
   
end

function SpringFestivalLayer:initUI()
    -- close
    local btn_close = self.root_panel:getChildByName("bg"):getChildByName("btn_close")
    ua.darkButton(btn_close, function()
        self:bClose()
    end )

    self.skinAni = nil
end




function SpringFestivalLayer.create()
    return SpringFestivalLayer.new()
end



return SpringFestivalLayer
-- endregion
