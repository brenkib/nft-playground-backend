// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BrenkibNFT_2 is ERC721Enumerable, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    ERC20 public acceptedToken;
    uint256 public mintPrice;

    constructor(address _initialOwner, address _acceptedToken, uint256 _mintPrice) ERC721("BrenkibNFT", "BRN") Ownable(_initialOwner) {
        acceptedToken = ERC20(_acceptedToken);
        mintPrice = _mintPrice * 10 ** acceptedToken.decimals();
    }

    function safeMint(address to, string memory uri) public {
        require(acceptedToken.transferFrom(msg.sender, address(this), mintPrice), "Payment failed");
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
    }

    function setAcceptedToken(address newToken) external onlyOwner {
        acceptedToken = ERC20(newToken);
    }

    function getMintPrice() external view returns(uint256) {
        return mintPrice;
    }

    function getAcceptedToken() external view returns(address) {
        return address(acceptedToken);
    }

    function withdrawPayments() external onlyOwner {
        uint256 balance = acceptedToken.balanceOf(address(this));
        require(acceptedToken.transfer(owner(), balance), "Withdrawal failed");
    }

    // The following functions are overrides required by Solidity.
    function _update(address to, uint256 tokenId,address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account,uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Enumerable, ERC721URIStorage)returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
