pragma solidity >=0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract GLDToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("StarDucks Capuccino", "SCT", 0) public {
        _mint(msg.sender, initialSupply);
    }
}