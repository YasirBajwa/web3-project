// https://eth-rinkeby.alchemyapi.io/v2/gTyCAIZPV_HU3ClBFNcCnb-w_iyTExei

require('@nomiclabs/hardhat-waffle');
module.exports ={
  solidity: "0.8.15",

  networks:{
    rinkeby :{
      url : 'https://eth-rinkeby.alchemyapi.io/v2/gTyCAIZPV_HU3ClBFNcCnb-w_iyTExei',
      accounts : ['b19f68d8787a2cb89ec409c0411741fc5e1e48445e66d3dd94ad5261a8895d13']
    }
  }

}