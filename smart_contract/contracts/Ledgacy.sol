pragma solidity ^0.4.17;


contract Ledgacy {
    struct Profile {
        bytes32 publickey;
        bytes[] secrets;
    }

    mapping (address => Profile) profiles;
    event KeyShare(bytes32);

    function setProfile(bytes32 publicKey) public {
        profiles[msg.sender] = Profile(publicKey, new bytes32[](0));
    }

    function pushSecret(bytes secret) {
        profiles[msg.sender].secrets.push(secret);
    }

    function Ledgacy() public {

    }
}
