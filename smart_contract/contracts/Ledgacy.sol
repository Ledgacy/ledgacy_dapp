pragma solidity ^0.4.17;


contract Ledgacy {
    struct Profile {
        byte32 publicKey;
        byte[] secrets;
    }

    mapping (address => Profile) public profiles;
    byte[] public shares;

    function Ledgacy() {

    }
}
