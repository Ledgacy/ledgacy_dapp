pragma solidity ^0.4.17;


contract Ledgacy {
  string version = "0.1.0";

    struct Profile {
        string name;
        bytes publickey;
        bytes[] secrets;
        uint lastTime;
    }


    function Ledgacy() public {

    }

    mapping (address => Profile) profiles;
    event KeyShare(bytes32);

    function createProfile(string name, bytes publickey) public {
      assert(bytes(name).length != 0);
      assert(publickey.length != 0);
      profiles[msg.sender] = Profile(name, publickey, new bytes[](0), block.number);
    }

    function getProfileName(address person) public view returns(string) {
      profiles[person].name;
    }

    function getProfilePublicKey(address person) public view returns(bytes) {
      profiles[person].publickey;
    }

    function pushSecret(bytes secret) public {
      assert(profiles[msg.sender].publickey.length != 0);
        /* if (profiles[msg.sender].publickey == 0) { */
        /*     createProfile(5); */
        /* } */
        profiles[msg.sender].secrets.push(secret);
    }

    function alive() public {
        profiles[msg.sender].lastTime = block.timestamp;
    }

    function readSecret(uint index) public view returns(bytes) {
      assert(index < profiles[msg.sender].secrets.length);
      return profiles[msg.sender].secrets[index];
    }

    function secretsCount() public view returns(uint) {
      return profiles[msg.sender].secrets.length;
    }

    function getLastTime() public view returns(uint) {
        return profiles[msg.sender].lastTime;
    }
}
