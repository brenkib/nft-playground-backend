// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract BrenkibNFT_2 is ERC721Enumerable, ERC721URIStorage, Ownable {
    using SafeERC20 for IERC20;

    /**
    * @dev Indicates a failure with the `spender` to be approved. Used in approvals.
     * @param spender Address that initiated payment that failed.
     */
    error ERC20TokenPaymentFailed(address spender);

    /**
    * @dev Indicates a failure with the `withdrawPayments` method. Used by owner of this Contract.
     * @param owner Address that initiated withdrawal that failed.
     */
    error ERC20TokenWithdrawalFailed(address owner);

    /**
     * @dev Unique Token Id counter for NFTs
     */
    uint256 private _nextTokenId;

    /**
     * @dev Unique Token Id counter for NFTs
     */
    IERC20 private _acceptedToken;
    uint256 private _mintPrice;

    constructor(address initialOwner, address acceptedToken, uint256 mintPrice) ERC721("BrenkibNFT", "BRN") Ownable(initialOwner) {
        _acceptedToken = IERC20(acceptedToken);
        _mintPrice = mintPrice * 10 ** 18;
    }

    function safeMint(address to, string memory uri) public {
        if(_acceptedToken.transferFrom(msg.sender, address(this), _mintPrice) == false) {
            revert ERC20TokenPaymentFailed(msg.sender);
        }
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function setMintPrice(uint256 newPrice) external onlyOwner {
        _mintPrice = newPrice;
    }

    function setAcceptedToken(address newToken) external onlyOwner {
        _acceptedToken = IERC20(newToken);
    }

    function getMintPrice() external view returns(uint256) {
        return _mintPrice;
    }

    function getAcceptedToken() external view returns(address) {
        return address(_acceptedToken);
    }

    function withdrawPayments() external onlyOwner {
        uint256 balance = _acceptedToken.balanceOf(address(this));
        //require(acceptedToken.transfer(owner(), balance), "Withdrawal failed");
        if(_acceptedToken.transfer(owner(), balance) == false) {
            revert ERC20TokenWithdrawalFailed(owner());
        }
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
