pragma solidity ^0.4.17;


contract Ledgacy {
    struct Profile {
      byte32 publickey;
      bytes[] secrets;
    }


    function Ledgacy() public {

    }

    mapping (address => Profile) profiles;
    event KeyShare(bytes32);

    function setProfile(int publicKey) public {
        profiles[msg.sender] = Profile(publicKey, new bytes[](0));
    }

    function pushSecret(bytes secret) public {
        assert(profiles[msg.sender].publickey == 0) {
            setProfile(5);
        }
        profiles[msg.sender].secrets.push(secret);
    }

    function readSecret(uint index) public view returns(bytes) {
      assert(index < profiles[msg.sender].secrets.length);
      return profiles[msg.sender].secrets[index];
    }

    function secretsCount() public view returns(uint) {
      return profiles[msg.sender].secrets.length;
    }

}
