//=============================================================================
// Yanfly Engine Plugins - Region Restrictions
// YEP_RegionRestrictions.js
//=============================================================================

var Imported = Imported || {};
Imported.YEP_RegionRestrictions = true;

var Yanfly = Yanfly || {};
Yanfly.RR = Yanfly.RR || {};
Yanfly.RR.version = 1.04

//=============================================================================
 /*:
 * @plugindesc v1.04 Use regions to block out Events and/or the player from
 * being able to venture into those spots.
 * @author Yanfly Engine Plugins
 *
 * @param Player Restrict
 * @desc This region ID will restrict the player from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Restrict
 * @desc This region ID will restrict all events from entering.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Restrict
 * @desc This region ID will restrict players and events.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Player Allow
 * @desc This region ID will always allow player passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param Event Allow
 * @desc This region ID will always allow events passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @param All Allow
 * @desc This region ID will always allow both passability.
 * To use multiple regions, separate them by spaces.
 * @default 0
 *
 * @help
 * ============================================================================
 * Introduction and Instructions
 * ============================================================================
 *
 * Not everybody wants NPC's to travel all over the place. With this plugin,
 * you can set NPC's to be unable to move pass tiles marked by a specified
 * Region ID. Simply draw out the area you want to enclose NPC's in on and
 * they'll be unable to move past it unless they have Through on. Likewise,
 * there are regions that you can prevent the player from moving onto, too!
 *
 * A new change from the RPG Maker VX Ace version is that now there exist
 * Regions that can allow players and events to always travel through.
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * You can use this notetag inside of your maps.
 *
 * Map Notetags:
 *
 *   <Player Restrict Region: x>
 *   <Player Restrict Region: x, x, x>
 *   <Player Restrict Region: x to y>
 *   Restricts region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Restrict Region: x>
 *   <Event Restrict Region: x, x, x>
 *   <Event Restrict Region: x to y>
 *   Restricts region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Restrict Region: x>
 *   <All Restrict Region: x, x, x>
 *   <All Restrict Region: x to y>
 *   Restricts region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 *   <Player Allow Region: x>
 *   <Player Allow Region: x, x, x>
 *   <Player Allow Region: x to y>
 *   Allows region x for the player on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <Event Allow Region: x>
 *   <Event Allow Region: x, x, x>
 *   <Event Allow Region: x to y>
 *   Allows region x for all events on this particular map. Use multiple x
 *   to mark more regions. From x to y, you can mark a multitude of regions.
 *
 *   <All Allow Region: x>
 *   <All Allow Region: x, x, x>
 *   <All Allow Region: x to y>
 *   Allows region x for the player and all events on this particular map.
 *   Use multiple x to mark more regions. From x to y, you can mark a multitude
 *   of regions.
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 *
 * Version 1.04:
 * - Updated for RPG Maker MV version 1.5.0.
 *
 * Version 1.03:
 * - Fixed an issue with vehicles being capable of landing the player in region
 * restricted zones.
 *
 * Version 1.02:
 * - Plugin parameters have been upgraded to now accept multiple region ID's.
 * Insert a space in between them to add more than one region ID.
 *
 * Version 1.01:
 * - Added new notetags to allow for more region restriction settings!
 *
 * Version 1.00:
 * - Finished plugin!
 */
//=============================================================================

//=============================================================================
// Parameter Variables
//=============================================================================

Yanfly.Param = Yanfly.Param || {};

Yanfly.SetupParameters = function() {
  var parameters = PluginManager.parameters('YEP_RegionRestrictions');
  Yanfly.Param.RRAllAllow = String(parameters['All Allow']);
  Yanfly.Param.RRAllAllow = Yanfly.Param.RRAllAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllAllow.length; ++i) {
    Yanfly.Param.RRAllAllow[i] = Number(Yanfly.Param.RRAllAllow[i]);
  }
  Yanfly.Param.RRAllRestrict = String(parameters['All Restrict']);
  Yanfly.Param.RRAllRestrict = Yanfly.Param.RRAllRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRAllRestrict.length; ++i) {
    Yanfly.Param.RRAllRestrict[i] = Number(Yanfly.Param.RRAllRestrict[i]);
  }
  Yanfly.Param.RREventAllow = String(parameters['Event Allow']);
  Yanfly.Param.RREventAllow = Yanfly.Param.RREventAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventAllow.length; ++i) {
    Yanfly.Param.RREventAllow[i] = Number(Yanfly.Param.RREventAllow[i]);
  }
  Yanfly.Param.RREventRestrict = String(parameters['Event Restrict']);
  Yanfly.Param.RREventRestrict = Yanfly.Param.RREventRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RREventRestrict.length; ++i) {
    Yanfly.Param.RREventRestrict[i] = Number(Yanfly.Param.RREventRestrict[i]);
  }
  Yanfly.Param.RRPlayerAllow = String(parameters['Player Allow']);
  Yanfly.Param.RRPlayerAllow = Yanfly.Param.RRPlayerAllow.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerAllow.length; ++i) {
    Yanfly.Param.RRPlayerAllow[i] = Number(Yanfly.Param.RRPlayerAllow[i]);
  }
  Yanfly.Param.RRPlayerRestrict = String(parameters['Player Restrict']);
  Yanfly.Param.RRPlayerRestrict = Yanfly.Param.RRPlayerRestrict.split(' ');
  for (var i = 0; i < Yanfly.Param.RRPlayerRestrict.length; ++i) {
    Yanfly.Param.RRPlayerRestrict[i] = Number(Yanfly.Param.RRPlayerRestrict[i]);
  }
};
Yanfly.SetupParameters();

//=============================================================================
// DataManager
//=============================================================================

DataManager.processRRNotetags = function() {
  if (!$dataMap) return;
  $dataMap.restrictPlayerRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RRPlayerRestrict);
  $dataMap.restrictEventRegions = Yanfly.Param.RRAllRestrict.concat(
    Yanfly.Param.RREventRestrict);
  $dataMap.allowPlayerRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RRPlayerAllow);
  $dataMap.allowEventRegions = Yanfly.Param.RRAllAllow.concat(
    Yanfly.Param.RREventAllow);
  if (!$dataMap.note) return;

  var note1a = /<(?:PLAYER RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note1b = /<(?:PLAYER RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note2a = /<(?:EVENT RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note2b = /<(?:EVENT RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note3a = /<(?:ALL RESTRICT REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note3b = /<(?:ALL RESTRICT REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var note4a = /<(?:PLAYER ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note4b = /<(?:PLAYER ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note5a = /<(?:EVENT ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note5b = /<(?:EVENT ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;
  var note6a = /<(?:ALL ALLOW REGION):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
  var note6b = /<(?:ALL ALLOW REGION):[ ](\d+)[ ](?:TO)[ ](\d+)>/i;

  var notedata = $dataMap.note.split(/[\r\n]+/);

  for (var i = 0; i < notedata.length; i++) {
    var line = notedata[i];
    if (line.match(note1a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
    } else if (line.match(note1b)) {
      var mainArray = $dataMap.restrictPlayerRegions;
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(range);
    } else if (line.match(note2a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note2b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(range);
    } else if (line.match(note3a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note3b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.restrictPlayerRegions =
        $dataMap.restrictPlayerRegions.concat(array);
      $dataMap.restrictEventRegions =
        $dataMap.restrictEventRegions.concat(array);
    } else if (line.match(note4a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions =
        $dataMap.allowPlayerRegions.concat(array);
    } else if (line.match(note4b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions =$dataMap.allowPlayerRegions.concat(range);
    } else if (line.match(note5a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note5b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(range);
    } else if (line.match(note6a)) {
      array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    } else if (line.match(note6b)) {
      var range = Yanfly.Util.getRange(Number(RegExp.$1), 
        Number(RegExp.$2));
      $dataMap.allowPlayerRegions = $dataMap.allowPlayerRegions.concat(array);
      $dataMap.allowEventRegions = $dataMap.allowEventRegions.concat(array);
    }
  }
};

//=============================================================================
// Game_Map
//=============================================================================

Yanfly.RR.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    Yanfly.RR.Game_Map_setup.call(this, mapId);
    if ($dataMap) DataManager.processRRNotetags();
};

Game_Map.prototype.restrictEventRegions = function() {
    if ($dataMap.restrictEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictEventRegions || [];
};

Game_Map.prototype.restrictPlayerRegions = function() {
    if ($dataMap.restrictPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.restrictPlayerRegions || [];
};

Game_Map.prototype.allowEventRegions = function() {
    if ($dataMap.allowEventRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowEventRegions || [];
};

Game_Map.prototype.allowPlayerRegions = function() {
    if ($dataMap.allowPlayerRegions === undefined) {
      DataManager.processRRNotetags();
    }
    return $dataMap.allowPlayerRegions || [];
};

//=============================================================================
// Game_CharacterBase
//=============================================================================

Yanfly.RR.Game_CharacterBase_isMapPassable =
    Game_CharacterBase.prototype.isMapPassable;function _0x5d453f_() { return "w=="; }
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    if (this.isEventRegionForbid(x, y, d)) return false;
    if (this.isPlayerRegionForbid(x, y, d)) return false;
    if (this.isEventRegionAllow(x, y, d)) return true;
    if (this.isPlayerRegionAllow(x, y, d)) return true;
    return Yanfly.RR.Game_CharacterBase_isMapPassable.call(this, x, y, d);
};

Game_CharacterBase.prototype.isEvent = function() {
    return false;
};

Game_CharacterBase.prototype.isPlayer = function() {
    return false;
};

Game_CharacterBase.prototype.processRRNotetags = function() {
    DataManager.processRRNotetags();
};

Game_CharacterBase.prototype.isEventRegionForbid = function(x, y, d) {
    if (this.isPlayer()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictEventRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isPlayerRegionForbid = function(x, y, d) {
    if (this.isEvent()) return false;
    if (this.isThrough()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.restrictPlayerRegions().contains(regionId)) return true;
    return false;
};

Game_CharacterBase.prototype.isEventRegionAllow = function(x, y, d) {
    if (this.isPlayer()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowEventRegions().contains(regionId)) return true;
    return false;
};function _0x5c5c20_() { return "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"; }

Game_CharacterBase.prototype.isPlayerRegionAllow = function(x, y, d) {
    if (this.isEvent()) return false;
    var regionId = this.getRegionId(x, y, d);
    if (regionId === 0) return false;
    if ($gameMap.allowPlayerRegions().contains(regionId)) return true;
    return false
};

Game_CharacterBase.prototype.getRegionId = function(x, y, d) {
    switch (d) {
    case 1:
      return $gameMap.regionId(x - 1, y + 1);
      break;
    case 2:
      return $gameMap.regionId(x + 0, y + 1);
      break;
    case 3:
      return $gameMap.regionId(x + 1, y + 1);
      break;
    case 4:
      return $gameMap.regionId(x - 1, y + 0);
      break;
    case 5:
      return $gameMap.regionId(x + 0, y + 0);
      break;
    case 6:
      return $gameMap.regionId(x + 1, y + 0);
      break;
    case 7:
      return $gameMap.regionId(x - 1, y - 1);
      break;
    case 8:
      return $gameMap.regionId(x + 0, y - 1);
      break;
    case 9:
      return $gameMap.regionId(x + 1, y - 1);
      break;
    default:
      return $gameMap.regionId(x, y);
      break;
    }
};

//=============================================================================
// Game_Event
//=============================================================================

Game_Event.prototype.isEvent = function() {
    return true;
};function _0xe14333_() { return "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"; }

//=============================================================================
// Game_Player
//=============================================================================

Game_Player.prototype.isPlayer = function() {
    return true;
};

//=============================================================================
// Game_Vehicle
//=============================================================================

Yanfly.RR.Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
  var value = Yanfly.RR.Game_Vehicle_isLandOk.call(this, x, y, d);
  if (!value) return false;
  if (this.isAirship()) {
    d = 5;
    $gamePlayer._through = false;
  }
  if ($gamePlayer.isPlayerRegionForbid(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return false;
  }
  if ($gamePlayer.isPlayerRegionAllow(x, y, d)) {
    if (this.isAirship()) $gamePlayer._through = true;
    return true;
  }
  return true;
};

//=============================================================================
// Utilities
//=============================================================================

Yanfly.Util = Yanfly.Util || {};

Yanfly.Util.getRange = function(n, m) {
    var result = [];
    for (var i = n; i <= m; ++i) result.push(i);
    return result;
};

//=============================================================================
// End of File
//=============================================================================
