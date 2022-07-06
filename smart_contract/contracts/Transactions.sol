//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount ;

    event Transfer(address from , address reciever,uint amount, string message , uint256 timestamp , string keyword);

    struct TransferStruct {
        address sender;
        address reciever;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    TransferStruct[] transactions;

    function addToBlockChain(address payable reciever , uint amount,string memory message , string memory keyword) public{
        transactionCount += 1 ;

    }

     function getAllTransactions() public view returns(TransferStruct[] memory){
         //return transactions

    }

     function getTransctionsCount() public view returns(uint256){
       // return transcation count

    }
}