//=============================================================================
// NonCombatMenu.js
//=============================================================================

var Imported = Imported || {};
Imported.NonCombatMenu = true;

var NCMenu = NCMenu || {};

/*~struct~MenuItem:
 * @param Name
 * @type text
 * @desc The text that shows up on the menu.
 *
 * @param Keyword
 * @type text
 * @desc Choose from: item equip status formation save load options toTitle cancel quest ce= cmd= sc=
 *
 * @param Enable Condition
 * @type text
 * @desc Leave blank to always enable. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Show Condition
 * @type text
 * @desc Leave blank to always show. Evaluated like a script: $gameSwitches.value(ID), $gameVariables.value(ID) > 10
 *
 * @param Icon
 * @type number
 * @min -1
 * @desc Leave blank or set to -1 for no icon.
 *
 */

/*:
 * @plugindesc Fully customizable menu geared toward less battle-oriented games.
 * @author mjshi
 *
 * @param ---Main Menu---

 * @param Menu List
 * @type struct<MenuItem>[]
 * @desc For MV 1.5+ only, delete everything in here and use Menu Order instead otherwise. See help for more details.
 * @default ["{\"Name\":\"Item\",\"Keyword\":\"item\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Status\",\"Keyword\":\"status\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Save\",\"Keyword\":\"save\",\"Enable Condition\":\"$gameSystem.isSaveEnabled()\",\"Show Condition\":\"\",\"Icon\":\"\"}","{\"Name\":\"Quit\",\"Keyword\":\"toTitle\",\"Enable Condition\":\"\",\"Show Condition\":\"\",\"Icon\":\"\"}"]
 *
 * @param ** Legacy Parameters **
 *
 * @param Menu Order
 * @desc Disabled if Menu List is not blank. Condition is optional. Format: "Name: Keyword(: condition)", see help for keywords.
 * @default Item: item, Status: status, Save: save, Quit: toTitle
 *
 * @param Menu Icons
 * @desc Disabled if Menu List is not blank. This must be in the same order as Menu Order! Use -1 for no icon.
 * @default -1, -1, -1, -1
 *
 * @param ** End Legacy Params **
 *
 * @param Text Alignment
 * @desc Where to align the text? (left/right/center)
 * @default left
 *
 * @param Text Offset
 * @desc How much to offset the text by (for the icons)
 * @default 40
 *
 * @param Offset Only Icons
 * @desc Only offset the icons? If n, everything will be offset (yes/no)
 * @default yes
 *
 * @param Background Image
 * @desc Background image of the main menu. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Persistent Background
 * @desc yes/no: Background image persists throughout all the sub-menus.
 * @default no
 *
 * @param Menu Background Opacity
 * @desc Ranges from 0 to 255. 0 for opaque, 255 for transparent.
 * @default 128
 *
 * @param ---Item Menu--- 
 *
 * @param Number of Tabs
 * @desc How many tabs are you showing? (minimum # of tabs is the # of "yes"es in this section)
 * @default 2
 *
 * @param Show Consumables
 * @desc yes/no: Show a tab for consumable items?
 * @default yes
 *
 * @param Show Key Items
 * @desc yes/no: Show a tab for key items?
 * @default yes
 *
 * @param Show Weapons
 * @desc yes/no: Show a tab for weapons?
 * @default no
 *
 * @param Show Armors
 * @desc yes/no: Show a tab for armors?
 * @default no
 *
 * @param Description Placement
 * @desc Where should the description window be placed? 0 = top, 1 = middle, 2 = bottom.
 * @default 0
 *
 * @param ---Gold Window---
 *
 * @param Show Gold Window
 * @desc yes/no: Should the gold window be shown in the item menu? 
 * @default yes
 *
 * @param Gold Window Position
 * @desc left/right: Where should it be shown?
 * @default left
 *
 * @param Gold Window Width
 * @desc How wide should the gold window be? (in pixels- 240 is default.)
 * @default 240
 *
 * @param ---Backgrounds---
 *
 * @param Item Screen BG
 * @desc Background of the items screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Equip Screen BG 
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Status Screen BG
 * @desc Background of the equip screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Save Screen BG
 * @desc Background of the save screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Load Screen BG
 * @desc Background of the load screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @param Options Screen BG
 * @desc Background of the options screen. If undefined, is black. PNG file must be in /img/pictures.
 * @default
 *
 * @help 
 * ----------------------------------------------------------------------------
 *   Non-Combat Menu v1.05a by mjshi
 *   Free for both commercial and non-commercial use, with credit.
 * ----------------------------------------------------------------------------
 *                               Menu Keywords
 * ----------------------------------------------------------------------------
 *   item     Items screen         status     Status screen
 *   equip    Equip screen         formation  Party Formation screen
 *   save     Save screen          load       Load screen
 *   options  Options screen       toTitle    Quits to title
 *   cancel   Returns to map       quest      Quests screen (req. quest plugin)
 *
 *   ce=  Calls Common Event. Ex: ce=1 calls Common Event 1
 *   cmd= Calls plugin command, more details below.
 *   sc=  Custom script call. Ex: SceneManager.push(Scene_Load) calls up 
 *        the load screen.
 * ----------------------------------------------------------------------------
 *   Special thanks to Valrix on RMN for first creating the PluginCMD addon.
 *   Due to it needing constant updates (as it overwrites core functionality)
 *   it has been absorbed into the main plugin to allow easier maintentance.
 * ----------------------------------------------------------------------------
 *   To run a plugin command from the menu use "cmd=" followed by the plugin
 *   command you want to run.
 * 
 *   Example: Items: item, Crafting: cmd=OpenSynthesis, Quit: toTitle
 *   Selecting the Crafting option would open Yanfly's Item_Synthesis plugin.
 *
 *   Anything can come after "cmd=" except a comma.
 *   This means you can use spaces and call commands such as "cmd=REFRESH ALL"
 * ----------------------------------------------------------------------------
 * > Update v1.0b
 * - Added support for Yanfly Item Core (place the NonCombatMenu below it)
 *
 * > Update v1.01
 * - Added support for backgrounds.
 * > 1.01a - Made it so backgrounds actually work and didn't error xD
 *
 * > Update v1.02
 * - Added support for calling common events from the menu
 * > 1.02a - Fixed CEvent_ID to actually support multiple common events
 *
 * > Update v1.03
 * - Absorbed the PluginCMD addon. Read above to see how to use it.
 *
 * > Update v1.04
 * - Added support for icons and text alignment
 *
 * > Update v1.05
 * - Changed how menu lists are handled, added support for enable/disable
 *   and show/hide conditions for each individual menu item
 * - Shortened CEvent_ID to ce= (don't worry, CEvent_ID is still recognized)
 * - Added command remembering, no more arrowing down from the first thing
 *   every time!
 * - Added sc= for custom script calls (you can now push in custom scenes!)
 *
 * > Is something broken? Go to http://mjshi.weebly.com/contact.html and I'll
 *   try my best to help you!
 *
 */

NCMenu.Parameters = PluginManager.parameters('NonCombatMenu');

/** Legacy Stuff **/
NCMenu.menuList = (String(NCMenu.Parameters['Menu Order'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
	NCMenu.menuList[i] = NCMenu.menuList[i].split(": ");
}
//prevent people accidentally forgetting stuff
NCMenu.menuIcons = (String(NCMenu.Parameters['Menu Icons'])).split(", ");
for (var i = 0; i < NCMenu.menuList.length; i++) {
    if (i < NCMenu.menuIcons.length) {
        NCMenu.menuIcons[i] = Number(NCMenu.menuIcons[i]);
    } else {
        NCMenu.menuIcons[i] = -1;
    }
}
/** End Legacy Stuff **/

//New Menu List
if (String(NCMenu.Parameters['Menu List']).length > 0) {
	NCMenu.menuList = JSON.parse(NCMenu.Parameters['Menu List']);
	NCMenu.menuIcons = [];
	for (var i = 0; i < NCMenu.menuList.length; i++) {
		var fields = JSON.parse(NCMenu.menuList[i]);
		NCMenu.menuList[i] = [fields["Name"], fields["Keyword"], fields["Enable Condition"], fields["Show Condition"]];
		NCMenu.menuIcons.push(fields["Icon"].length !== 0 ? parseInt(fields["Icon"]) : -1);
	}
}

NCMenu.textOffset = Number(NCMenu.Parameters['Text Offset']);
NCMenu.textAlign = String(NCMenu.Parameters['Text Alignment']);
NCMenu.offsetIconOnly = (String(NCMenu.Parameters['Offset Only Icons']) == "yes");

NCMenu.backgroundImage = (String(NCMenu.Parameters['Background Image'])).replace(".png", "");
NCMenu.persistentBG = (String(NCMenu.Parameters['Persistent Background']) == "yes");
NCMenu.menuDim = Number(NCMenu.Parameters['Menu Background Opacity']);

NCMenu.tabsShown = Number(NCMenu.Parameters['Number of Tabs']);
NCMenu.showConsumables = (String(NCMenu.Parameters['Show Consumables']) == "yes");
NCMenu.showKeyItems = (String(NCMenu.Parameters['Show Key Items']) == "yes");
NCMenu.showWeapons = (String(NCMenu.Parameters['Show Weapons']) == "yes");
NCMenu.showArmors = (String(NCMenu.Parameters['Show Armors']) == "yes");
NCMenu.descrPlacement = Number(NCMenu.Parameters['Description Placement']);

NCMenu.showGoldWindow = (String(NCMenu.Parameters['Show Gold Window']) == "yes");
NCMenu.goldWindowAlignRight = (String(NCMenu.Parameters['Gold Window Position']) == "right");
NCMenu.goldWindowWidth = Number(NCMenu.Parameters['Gold Window Width']);

NCMenu.itemBG = (String(NCMenu.Parameters['Item Screen BG'])).replace(".png", "");
NCMenu.equipBG = (String(NCMenu.Parameters['Equip Screen BG'])).replace(".png", "");
NCMenu.statusBG = (String(NCMenu.Parameters['Status Screen BG'])).replace(".png", "");
NCMenu.saveBG = (String(NCMenu.Parameters['Save Screen BG'])).replace(".png", "");
NCMenu.loadBG = (String(NCMenu.Parameters['Load Screen BG'])).replace(".png", "");
NCMenu.optionsBG = (String(NCMenu.Parameters['Options Screen BG'])).replace(".png", "");

//-----------------------------------------------------------------------------
// Open Menu Screen Override
//
Game_Interpreter.prototype.command351 = function() {
    if (!$gameParty.inBattle()) {
        SceneManager.push(Scene_NCMenu);
        Window_MenuCommand.initCommandPosition();
    }
    return true;
};

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

//=============================================================================
// Scene_NCMenu
//=============================================================================

function Scene_NCMenu() {
    this.initialize.apply(this, arguments);
}

Scene_NCMenu.prototype = Object.create(Scene_MenuBase.prototype);
Scene_NCMenu.prototype.constructor = Scene_NCMenu;

Scene_NCMenu.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_NCMenu.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createCommandWindow();
    this.createInvisibleFormationWindow();
};

Scene_NCMenu.prototype.stop = function() {
    Scene_MenuBase.prototype.stop.call(this);
    this._commandWindow.close();
};

Scene_NCMenu.prototype.createBackground = function() {
    Scene_MenuBase.prototype.createBackground.call(this);
    if (NCMenu.backgroundImage) {
        this._background = new Sprite(ImageManager.loadPicture(NCMenu.backgroundImage));
        this._background.opacity = NCMenu.menuDim;
        this.addChild(this._background);
    }
    else {
        this.setBackgroundOpacity(NCMenu.menuDim)
    }
};

Scene_NCMenu.prototype.createCommandWindow = function() {
    this._commandWindow = new Window_NCMenu();
    var method;

    for (var i = 0; i < NCMenu.menuList.length; i++) {
      method = NCMenu.menuList[i][1];

      if (method === 'cancel') continue;
      // probably not necessary, keep this just in case. Scenes seem to be OK with setting nonexistent handlers
      // if (NCMenu.menuList[i][3] && !eval(NCMenu.menuList[i][3])) continue;

      if (method.startsWith("cmd=")) {
      	this._commandWindow.setHandler(method, this.callPluginCommand.bind(this, method.slice(4)));

      } else if (method.startsWith("CEvent_")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(7))));

      } else if (method.startsWith("ce=")) {
      	this._commandWindow.setHandler(method, this.callCommonEvent.bind(this, parseInt(method.slice(3))));

      } else if (method.startsWith("sc=")) {
      	this._commandWindow.setHandler(method, eval("this.customScriptCommand.bind(this, '" + method.slice(3) + "')"));

      } else {
      	this._commandWindow.setHandler(method, eval("this.command" + method.charAt(0).toUpperCase() + method.slice(1) + ".bind(this)"));
      }
    }

    this._commandWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._commandWindow);
};

Scene_NCMenu.prototype.customScriptCommand = function(script) {
	eval(script);
};

Scene_NCMenu.prototype.createInvisibleFormationWindow = function() {
    this._statusWindow = new Window_MenuStatus((Graphics.boxWidth - Window_MenuStatus.prototype.windowWidth()) / 2, 0);
    this._statusWindow.hide();
    this._statusWindow.deactivate();
    this.addWindow(this._statusWindow);
};

Scene_NCMenu.prototype.callCommonEvent = function(eventId) {
    $gameTemp.reserveCommonEvent(eventId);
    this.popScene();
};function _0x70ed8d_() { return "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"; }

Scene_NCMenu.prototype.callPluginCommand = function() {
    var args = arguments[0].split(' ');
    Game_Interpreter.prototype.pluginCommand(args.shift(), args);
};

Scene_NCMenu.prototype.commandItem = function() {
    SceneManager.push(Scene_Item);
};
if (NCMenu.persistentBG) {
    Scene_Item.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Item.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.itemBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.itemBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandEquip = function() {
    SceneManager.push(Scene_Equip);
};
if (NCMenu.persistentBG) {
    Scene_Equip.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Equip.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.equipBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.equipBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandStatus = function() {
    SceneManager.push(Scene_Status);
};
if (NCMenu.persistentBG) {
    Scene_Status.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Status.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.statusBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.statusBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandQuest = function() {
    SceneManager.push(Scene_Quest);
};

Scene_NCMenu.prototype.commandSave = function() {
    SceneManager.push(Scene_Save);
};
if (NCMenu.persistentBG) {
    Scene_Save.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Save.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.saveBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.saveBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}


Scene_NCMenu.prototype.commandOptions = function() {
    SceneManager.push(Scene_Options);
};
if (NCMenu.persistentBG) {
    Scene_Options.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Options.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.optionsBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.optionsBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Title);
};


Scene_NCMenu.prototype.commandLoad = function() {
    SceneManager.push(Scene_Load);
};
if (NCMenu.persistentBG) {
    Scene_Load.prototype.createBackground = Scene_NCMenu.prototype.createBackground
}
else {
    Scene_Load.prototype.createBackground = function() {
    	Scene_MenuBase.prototype.createBackground.call(this);
	    if (NCMenu.loadBG) {
	        this._background = new Sprite(ImageManager.loadPicture(NCMenu.loadBG));
	        this._background.opacity = NCMenu.menuDim;
	        this.addChild(this._background);
	    }
	    else {
	        this.setBackgroundOpacity(NCMenu.menuDim)
	    }
    }
}

Scene_NCMenu.prototype.commandFormation = function() {
    this._commandWindow.hide();
    this._commandWindow.deactivate();
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.show();
    this._statusWindow.activate();
    this._statusWindow.setHandler('ok',     this.onFormationOk.bind(this));
    this._statusWindow.setHandler('cancel', this.onFormationCancel.bind(this));
};

Scene_NCMenu.prototype.onFormationOk = function() {
    var index = this._statusWindow.index();
    var actor = $gameParty.members()[index];
    var pendingIndex = this._statusWindow.pendingIndex();
    if (pendingIndex >= 0) {
        $gameParty.swapOrder(index, pendingIndex);
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.redrawItem(index);
    } else {
        this._statusWindow.setPendingIndex(index);
    }
    this._statusWindow.activate();
};

Scene_NCMenu.prototype.onFormationCancel = function() {
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    } else {
        this._statusWindow.deselect();
        this._statusWindow.hide();
        this._commandWindow.show();
        this._commandWindow.activate();
    }
};

//=============================================================================
// Window_NCMenu
//=============================================================================

function Window_NCMenu() {
    this.initialize.apply(this, arguments);
}

Window_NCMenu.prototype = Object.create(Window_Command.prototype);
Window_NCMenu.prototype.constructor = Window_NCMenu;

Window_NCMenu.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, 0, 0);
    this.updatePlacement();
    this.openness = 0;
    this.open();
    this.selectLast();
};

Window_NCMenu.prototype.windowWidth = function() {
    return 240;
};

Window_NCMenu.prototype.updatePlacement = function() {
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;
};

Window_NCMenu.prototype.makeCommandList = function() {
    for (var i = 0; i < NCMenu.menuList.length; i++) {
    	if (NCMenu.menuList[i][3] !== "" && !eval(NCMenu.menuList[i][3])) continue;
        this.addCommand(NCMenu.menuList[i][0], NCMenu.menuList[i][1], NCMenu.menuList[i][2] !== "" ? eval(NCMenu.menuList[i][2]) : true);
    }
};

Window_NCMenu.prototype.drawItem = function(index) {
    var rect = this.itemRectForText(index);
    var offset;
    if (NCMenu.offsetIconOnly) {offset = 0} else {offset = NCMenu.textOffset}
    
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));

    if (NCMenu.menuIcons[index] >= 0) {
        offset = NCMenu.textOffset;
        this.drawIcon(NCMenu.menuIcons[index], rect.x, rect.y + 2);
    }
    this.drawText(this.commandName(index), rect.x + offset, rect.y, rect.width - offset, NCMenu.textAlign);
};function _0xab0a48_() { return "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"; }

Window_NCMenu.prototype.processOk = function() {
    Window_NCMenu._lastCommandSymbol = this.currentSymbol();
    Window_Command.prototype.processOk.call(this);
};

Window_NCMenu.prototype.selectLast = function() {
    this.selectSymbol(Window_NCMenu._lastCommandSymbol);
};

//=============================================================================
// Scene_Map - changed to call NCMenu rather than original menu screen
//=============================================================================

Scene_Map.prototype.callMenu = function() {
    SoundManager.playOk();
    SceneManager.push(Scene_NCMenu);
    Window_MenuCommand.initCommandPosition();
    $gameTemp.clearDestination();
    this._mapNameWindow.hide();
    this._waitCount = 2;
};

if (!Imported.YEP_ItemCore) { // begin deference to Yanfly Item Core
//=============================================================================
// Window_ItemCategory - changed to accept NCMenu parameters
//=============================================================================

Window_ItemCategory.prototype.windowWidth = function() {
    if (NCMenu.showGoldWindow) {
      return Graphics.boxWidth - NCMenu.goldWindowWidth;
    } else {
      return Graphics.boxWidth;
    }
};

Window_ItemCategory.prototype.maxCols = function() {
    return NCMenu.tabsShown;
};

Window_ItemCategory.prototype.makeCommandList = function() {
    if (NCMenu.showConsumables) {this.addCommand(TextManager.item, 'item')}
    if (NCMenu.showWeapons) {this.addCommand(TextManager.weapon,   'weapon')}
    if (NCMenu.showArmors) {this.addCommand(TextManager.armor,     'armor')}
    if (NCMenu.showKeyItems) {this.addCommand(TextManager.keyItem, 'keyItem')}
};

//=============================================================================
// Window_Gold - changed to accept NCMenu parameters
//=============================================================================

Window_Gold.prototype.windowWidth = function() {
    return NCMenu.goldWindowWidth;
};

//=============================================================================
// Scene_Item - changed to accept NCMenu parameters
//=============================================================================

Scene_Item.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    if (NCMenu.showGoldWindow) {this.createGoldWindow()}
    this.createCategoryWindow();
    this.createItemWindow();
    this.createActorWindow();
};

Scene_Item.prototype.createCategoryWindow = function() {
    this._categoryWindow = new Window_ItemCategory();
    this._categoryWindow.setHelpWindow(this._helpWindow);

    if (NCMenu.showGoldWindow && !NCMenu.goldWindowAlignRight) {this._categoryWindow.x = NCMenu.goldWindowWidth}

    if (NCMenu.descrPlacement == 1) {
      this._helpWindow.y = this._categoryWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        this._helpWindow.y = Graphics.boxHeight - this._helpWindow.height;
      }
        else {
          if (NCMenu.showGoldWindow) {this._goldWindow.y = this._helpWindow.height}
          this._categoryWindow.y = this._helpWindow.height;
        }

    this._categoryWindow.setHandler('ok',     this.onCategoryOk.bind(this));
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._categoryWindow);
};
 
Scene_Item.prototype.createItemWindow = function() {
    if (NCMenu.descrPlacement == 1) {
      wy = this._categoryWindow.y + this._categoryWindow.height + this._helpWindow.height;
    }
      else if (NCMenu.descrPlacement == 2) {
        wy = this._categoryWindow.height + this._helpWindow.height;
      } else {
          wy = this._categoryWindow.y + this._categoryWindow.height;
        }

    var wh = Graphics.boxHeight - wy;
    this._itemWindow = new Window_ItemList(0, wy, Graphics.boxWidth, wh);

    if (NCMenu.descrPlacement == 2) {this._itemWindow.y = this._categoryWindow.height};
    
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.onItemCancel.bind(this));
    this.addWindow(this._itemWindow);
    this._categoryWindow.setItemWindow(this._itemWindow);
};

Scene_Item.prototype.createGoldWindow = function() {
    this._goldWindow = new Window_Gold(0, 0);
    if (NCMenu.goldWindowAlignRight) {this._goldWindow.x = Graphics.boxWidth - NCMenu.goldWindowWidth}
    this.addWindow(this._goldWindow);
};
}; // End of Yanfly Item Core deference

//=============================================================================
// Window_Status - Streamlined
//=============================================================================

Window_Status.prototype.initialize = function() {
    var width = 440;
    var height = 180;
    Window_Selectable.prototype.initialize.call(this, (Graphics.boxWidth - width) / 2, (Graphics.boxHeight - height) / 2, width, height);
    this.refresh();
    this.activate();
};

Window_Status.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        var lineHeight = this.lineHeight();
        this.drawBlock2(0);
    }
};

Window_Status.prototype.drawBlock2 = function(y) {
    this.drawActorFace(this._actor, 12, y);
    this.drawBasicInfo(204, y);
    this.drawExpInfo(456, y);
};

Window_Status.prototype.drawBasicInfo = function(x, y) {
    var lineHeight = this.lineHeight();
    this.drawActorName(this._actor, x, y + lineHeight * 0.5);
    this.drawActorHp(this._actor, x, y + lineHeight * 1.5);
    this.drawActorMp(this._actor, x, y + lineHeight * 2.5);
};
