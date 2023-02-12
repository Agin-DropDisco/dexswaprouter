
const DexSwapFactory = artifacts.require("IDexSwapFactory");
const DexSwapRouter = artifacts.require("DexSwapRouter");
const WETH = artifacts.require("WETH");
const argValue = (arg, defaultValue) => (process.argv.includes(arg) ? process.argv[process.argv.indexOf(arg) + 1] : defaultValue);
const network = () => argValue("--network", "local");



// const FACTORY_MANTLE = "0x9bD7f0cB79B21E98cF92396cAB95E4D060C8BE08";
// const WETH_MANTLE = "0x41810F1664ce580072D9c23286Ea5df68db766F1";

const FACTORY_MANTLE = "0xc75aE86d9F9d8C150b4bFf9A8Fb77481B0611a56";
const WETH_MANTLE = "0x2c57C73542a23dA327699D288757CFb41f71855f";


module.exports = async (deployer) => {
    const BN = web3.utils.toBN;
    const senderAccount = (await web3.eth.getAccounts())[0];

    
    if (network() === "mantleTestnet") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_MANTLE);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WETH"); 
        let WETHInstance = await WETH.at(WETH_MANTLE);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);


    } else if (network() === "mumbai") {

        console.log();
        console.log(":: REUSE FACTORY");
        let DexSwapFactoryInstance = await DexSwapFactory.at(FACTORY_MANTLE);
        console.log(`DEXSWAP FACTORY:`, DexSwapFactoryInstance.address);

        console.log();
        console.log(":: REUSE WETH"); 
        let WETHInstance = await WETH.at(WETH_MANTLE);
        await WETHInstance.deposit({ from: senderAccount, value: 100 });

        console.log();
        console.log(":: DEPLOY ROUTER");
        await deployer.deploy(DexSwapRouter, DexSwapFactoryInstance.address, WETHInstance.address);
        const DexSwapRouterInstance = await DexSwapRouter.deployed();
        console.log(`DEXSWAP ROUTER:`, DexSwapRouterInstance.address);

    }

};
