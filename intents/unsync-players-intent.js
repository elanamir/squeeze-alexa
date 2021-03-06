const Intent = require('../intent');
const Utils = require('../utils');

class UnSyncPlayersIntent extends Intent {
  /**
   * Unsync a player
   *
   * @param player The player to unsync
   * @param session The current session
   * @param callback The callback to use to return the result
   */

  static process(squeezeserver, players, intent, session, callback) {

    console.log("In unsyncPlayer with player %s", player.name);

    try {
      const player = Intent.getPlayer(squeezeserver, players, intent, session);
      if (!player) {
        console.log("Player not found");
        callback(session.attributes, Utils.buildSpeechletResponse(intent.name, "Player not found", null, false));
      } else {
        // Unsynchronize the player

        player.unSync(function(reply) {
          if (reply.ok)
            callback(session.attributes, Utils.buildSpeechletResponse("Unsync Player", "Player " + player.name + " unsynced", null, false));
          else {
            console.log("Failed to sync %j", reply);
            callback(session.attributes, Utils.buildSpeechletResponse("Unsync Player", "Failed to unsync player " + player.name, null, true));
          }
        });
      }
    } catch (ex) {
      console.log("Caught exception in unsyncPlayer %j", ex);
      callback(session.attributes, Utils.buildSpeechletResponse("Unsync Player", "Caught Exception", null, true));
    }
  }
}

module.exports = UnSyncPlayersIntent;