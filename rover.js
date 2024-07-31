const Command = require("./command");
const Message = require("./message");

class Rover {
  // Write code here!
  constructor(position, mode = "NORMAL", generatorWatts = 110) {
    this.position = position;
    this.mode = mode;
    this.generatorWatts = generatorWatts;
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: [],
    };
    for (let command of message.commands) {
      let result = { completed: false };

      // "responds with a false completed value when attempting to move in LOW_POWER mode"

      if (command.commandType === "MOVE"){
        if (this.mode === "NORMAL" ){        
        this.position = command.value;
        result.completed = true;

        }else {
          result.completed = false
        }

      } else if (command.commandType === "STATUS_CHECK") {
        result.completed = true;
        result.roverStatus = {
          mode: this.mode,
          generatorWatts: this.generatorWatts,
          position: this.position,
        };
      } else if (command.commandType === "MODE_CHANGE") {
        this.mode = command.value;
        result.completed = true;
      }

      response.results.push(result);
    }

    return response;
  }
}

module.exports = Rover;
