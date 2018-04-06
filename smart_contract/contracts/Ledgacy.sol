pragma solidity ^0.4.17;


contract Ledgacy {
    struct Profile {
        int publickey;
        bytes[] secrets;
        uint lastBlock;
    }


    function Ledgacy() public {

    }

    mapping (address => Profile) profiles;
    event KeyShare(bytes32);

    function setProfile(int publicKey) public {
        profiles[msg.sender] = Profile(publicKey, new bytes[](0), block.number);
    }

    function pushSecret(bytes secret) public {
        if (profiles[msg.sender].publickey == 0) {
            setProfile(5);
        }
        profiles[msg.sender].secrets.push(secret);
    }

    function alive() public {
        assert(profiles[msg.sender].lastBlock != 0);
        profiles[msg.sender].lastBlock = block.number;
    }

    function readSecret(uint index) public view returns(bytes) {
      assert(index < profiles[msg.sender].secrets.length);
      return profiles[msg.sender].secrets[index];
    }

    function secretsCount() public view returns(uint) {
      return profiles[msg.sender].secrets.length;
    }

}
