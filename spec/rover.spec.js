const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

// position is a number representing the rover’s position.
// Sets this.position to position
// Sets this.mode to 'NORMAL'
// Sets the default value for generatorWatts to 110

describe("Rover class", function () {
  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function () {
    const rover = new Rover(98382);
    expect(rover.position).toBe(98382);
    expect(rover.mode).toBe("NORMAL");
    expect(rover.generatorWatts).toBe(110);
  });

  // TEST 8
  it("response returned by receiveMessage contains the name of the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];
    let messageName = "Test message with two commands";
    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.message).toEqual(messageName);
    // console.log(response)
  });

  // TEST 9

  it("response returned by receiveMessage includes two results if two commands are sent in the message", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";
    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results.length).toBe(2);

   

  });

  // TEST 10

  it("responds correctly to the status check command", function(){
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";
    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    let statusCheck = response.results

    // expect(response.results).toHaveProperty("roverStatus")

    // expect(statusCheck).toBeDefined();

    console.log(statusCheck)





  })

  // TEST 11

  // TEST 12

  // TEST 13
});
