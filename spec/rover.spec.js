const Rover = require("../rover.js");
const Message = require("../message.js");
const Command = require("../command.js");

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.



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

  it("responds correctly to the status check command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";
    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[1]).toEqual({
      completed: true,
      roverStatus: {
        mode: "LOW_POWER",
        generatorWatts: 110,
        position: 98382,
      },
    });
  });

  // TEST 11

  it("responds correctly to the mode change command", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("STATUS_CHECK"),
    ];

    let commands2 = [
      new Command("MODE_CHANGE", "NORMAL"),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";

    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBe(true);
    expect(rover.mode).toBe("LOW_POWER");

    let message2 = new Message(messageName, commands2);
    let rover2 = new Rover(98382);
    let response2 = rover.receiveMessage(message2);

    expect(response2.results[0].completed).toBe(true);
    expect(rover2.mode).toBe("NORMAL");
  });

  // TEST 12

  it("responds with a false completed value when attempting to move in LOW_POWER mode", function () {
    let commands = [
      new Command("MODE_CHANGE", "LOW_POWER"),
      new Command("MOVE", 100),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";

    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(response.results[0].completed).toBeTruthy();
    expect(response.results[1].completed).toBeFalsy();
    expect(rover.position).toBe(98382);
  });

  // TEST 13

  it("responds with the position for the move command", function(){
    let commands = [
      
      new Command("MOVE", 100),
      new Command("STATUS_CHECK"),
    ];

    let messageName = "Test message with two commands";

    let message = new Message(messageName, commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);

    expect(rover.position).toEqual(commands[0].value)


  

  })
});
