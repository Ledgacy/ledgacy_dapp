pragma solidity ^0.4.17;


contract Ledgacy {
  string version = "0.1.0";

  struct Profile {
    string name;
    bytes publickey;
    uint lastTime;
    uint nMasterKeys;
  }

  mapping (address => mapping (uint => bytes[])) secrets;
  mapping (address => mapping (uint => bytes)) masterkeys; // only readable by person who made them: encrypted with their private key.
  bytes[] encrypted_keyparts;


  function Ledgacy() public {

  }

  mapping (address => Profile) profiles;
  event KeyShare(bytes32);

  function createProfile(string name, bytes publickey, bytes master_key) public {
    assert(bytes(name).length != 0);
    assert(publickey.length != 0);
    profiles[msg.sender] = Profile(name, publickey, block.timestamp, 0);
    masterkeys[msg.sender][0] = master_key;
    ++profiles[msg.sender].nMasterKeys;
  }

  function getProfileName(address person) public view returns(string) {
    return profiles[person].name;
  }

  function getProfilePublicKey(address person) public view returns(bytes) {
    return profiles[person].publickey;
  }

  function pushSecret(bytes secret) public {
    assert(profiles[msg.sender].publickey.length != 0);
    /* if (profiles[msg.sender].publickey == 0) { */
    /*     createProfile(5); */
    /* } */
    /* profiles[msg.sender].secrets.push(secret); */
    secrets[msg.sender][profiles[msg.sender].nMasterKeys - 1].push(secret);
  }

  function pushEncryptedKeypart(bytes keypart) public {
    encrypted_keyparts.push(keypart);
  }

  function alive() public {
    profiles[msg.sender].lastTime = block.timestamp;
  }

  function readSecret(uint index) public view returns(bytes) {
    /* assert(index < profiles[msg.sender].secrets.length); */
    /* return profiles[msg.sender].secrets[index]; */
    return secrets[msg.sender][profiles[msg.sender].nMasterKeys - 1][index];
  }

  function readSecretForAddress(uint index, address target) public view returns(bytes) {
    /* assert(index < profiles[msg.sender].secrets.length); */
    /* return profiles[msg.sender].secrets[index]; */
    return secrets[target][profiles[target].nMasterKeys - 1][index];
  }

  function secretsCount() public view returns(uint) {
    /* return profiles[msg.sender].secrets.length; */
    return secrets[msg.sender][profiles[msg.sender].nMasterKeys - 1].length;
  }

  function secretsCountForAddress(address target) public view returns(uint) {
    /* return profiles[msg.sender].secrets.length; */
    return secrets[target][profiles[target].nMasterKeys - 1].length;
  }

  function getLastTime() public view returns(uint) {
    return profiles[msg.sender].lastTime;
  }

  function getEncryptedMasterKey() public view returns(bytes) {
    return masterkeys[msg.sender][profiles[msg.sender].nMasterKeys - 1];
  }
}
