local SongGanLayer = class("SongGanLayer", require("app.core.BaseLayer"))
SongGanLayer.CsbFile = "SongGanLayer.csb"
SongGanLayer.AimType = 1;
SongGanLayer.HasBlackBg = true;

function SongGanLayer:ctor(data)
    self.super.ctor(self);
    self.root_panel = self:bGetCsbNode():getChildByName("root_Panel");
    self:initUI();

end

function SongGanLayer:initUI()

    local btn_close = self.root_panel:getChildByName("bg"):getChildByName("btn_close")
    ua.darkButton(btn_close, function()
        self:bClose()
    end )


end

function SongGanLayer.create()
    return SongGanLayer.new()
end

return SongGanLayer