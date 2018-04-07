pragma solidity ^0.4.17;


contract Ledgacy {
  string version = "0.1.0";

    struct Profile {
      string name;
      bytes publickey;
      uint lastTime;
      uint nMasterKeys;
      bytes[] encryptedMasterKeys;
      mapping(uint => bytes[]) secrets;
    }


    function Ledgacy() public {

    }

    mapping (address => Profile) profiles;
    event KeyShare(bytes32);

    function createProfile(string name, bytes publickey, bytes encrypted_masterkey) public {
      assert(bytes(name).length != 0);
      assert(publickey.length != 0);

      profiles[msg.sender] = Profile(name, publickey, block.timestamp, 1, new bytes[](1));
      profiles[msg.sender].encryptedMasterKeys[0] = encrypted_masterkey;
    }

    function createNewMasterKey(bytes encrypted_masterkey) public {
      profiles[msg.sender].encryptedMasterKeys[profiles[msg.sender].nMasterKeys] = encrypted_masterkey;
      profiles[msg.sender].nMasterKeys += 1;
    }

    function getProfileName(address person) public view returns(string) {
      return profiles[person].name;
    }

    function getProfilePublicKey(address person) public view returns(bytes) {
      return profiles[person].publickey;
    }

    function getEncryptedMasterKey(address person) public view returns(bytes) {
      return profiles[person].encryptedMasterKeys[profiles[person].nMasterKeys - 1];
    }

    function pushSecret(bytes secret) public {
      assert(profiles[msg.sender].publickey.length != 0);
        /* if (profiles[msg.sender].publickey == 0) { */
        /*     createProfile(5); */
        /* } */
        /* profiles[msg.sender].secrets.push(secret); */
      /* bytes[] memory cursecrets = currentSecrets(); */
      profiles[msg.sender].secrets[profiles[msg.sender].nMasterKeys - 1].push(secret);
    }

    function alive() public {
        profiles[msg.sender].lastTime = block.timestamp;
    }

    function readSecret(uint index) public view returns(bytes) {
      assert(index < profiles[msg.sender].secrets[profiles[msg.sender].nMasterKeys].length);
      /* return profiles[msg.sender].secrets[index]; */
      return currentSecrets()[index];
    }

    function secretsCount() public view returns(uint) {
      /* return profiles[msg.sender].secrets.length; */
      return currentSecrets().length;
    }

    function getLastTime() public view returns(uint) {
        return profiles[msg.sender].lastTime;
    }

    function currentSecrets() public view returns(bytes[]) {
      return profiles[msg.sender].secrets[profiles[msg.sender].nMasterKeys - 1];
    }
}
