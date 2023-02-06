const initialize = () => {

    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!'); // dev
    } 

    window.onload = async function() {
        this.ethereum.on('accountsChanged', accountChange);
        // ethereum.removeListener('accountsChanged', accountChange);
        afterOnLoad();
    }    

    const add = document.getElementById('add');
    async function afterOnLoad() {
        const provider = new ethers.providers.Web3Provider(window.ethereum); // (window.ethereum, DEFAULT_CHAIN)
        const accounts = await provider.listAccounts();
        accounts[0] != undefined ? 
        handleAccountsChanged(accounts[0]) : // window.ethereum.selectedAddress
        add.innerHTML = "0x0...0";
        accounts[0] != undefined ? 
        handleAccountsChanged(accounts[0]) : 
        conn.innerHTML = "Connect"; 
    }

    const conn = document.getElementById('connect');
    conn.addEventListener('click', () => {
        connection();
    });

    async function connection() {
        window.ethereum.request({ 
            method: 'eth_accounts' 
        }).then(getAccount).catch((err) => {
                console.log(err);
            });
        const provider = new ethers.providers.Web3Provider(window.ethereum); // (window.ethereum, DEFAULT_CHAIN)

        const accounts = await provider.listAccounts();
        console.log(accounts[0]); // dev
        // ---
        // const signer = await provider.getSigner(); 
    }

    async function getAccount() {
        const accounts = await ethereum.request({ 
            method: 'eth_requestAccounts' }).catch((err) => {
                console.log(err.code);
            });
        // ---
        const account = accounts[0];
        handleAccountsChanged(account);
    }

    const accountChange = (a) => {
        accounts = a;
        handleAccountsChanged(a);
    }

    function handleAccountsChanged(accounts) {
        conn.innerHTML = "Connected";
        // add.innerHTML = accounts.slice(2,5);
        // add.innerHTML = accounts.substr(2,5);
        add.innerHTML = accounts;
    }

    // == connection end == \\
    // == code start below == \\
    

}
window.addEventListener('DOMContentLoaded', initialize);

    const codeSection = document.getElementById('codeSection');
    const cods = document.getElementById('cods');
    cods.addEventListener('click', () => {
        showBalance();
    });

// const showBalance = async () => {
    async function showBalance() {
        const INFURA_ID = 'your infura key here' // dont reveal this line, use [.env]
        const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`)
        
        codeSection.innerHTML = "click (check block) button - please wait";

        console.log("1===========\n");
        const block = await provider.getBlockNumber();
        console.log(`\nBlock Number: ${block}\n`);

        console.log("2===========\n");
        const blockInfo = await provider.getBlock(block);
        console.log(blockInfo);

        console.log("3===========\n");
        const { transactions } = await provider.getBlockWithTransactions(block);

        console.log("4===========\n");
        console.log(`\nLogging first transaction in block:\n`);
        console.log(transactions[0]);

        codeSection.innerHTML = `<p>
        <span class="text-secondary">Block Number:</span> ${block}
        <hr>
        <span class="text-secondary">the.chainId:</span><b class="text-warning"> ${transactions[0].chainId} </b><br />
        <span class="text-secondary">blockInfo.hash:</span> ${blockInfo.hash} <br />
        <span class="text-secondary">blockInfo.time:</span> ${blockInfo.timestamp} <br />
        <span class="text-secondary">blockInfo.parent-hash:</span> ${blockInfo.parentHash} <br />
        <span class="text-secondary">blockInfo.miner:</span> ${blockInfo.miner} <br />
        <hr>
        <span class="text-secondary">Logging first transaction[0] in block (hash):</span><br />
        ${transactions[0].hash}<br />
        <br />
        <span class="text-secondary">transaction.gasPrice:</span><span class="badge text-wrap"> ${transactions[0].gasPrice._hex} </span><br />
        <span class="text-secondary">transaction.from:</span> ${transactions[0].from} <br />
        <span class="text-secondary">transaction.to:</span> ${transactions[0].to} <br />
        <hr>
        <span class="text-secondary">Logging second transaction[1] in block (hash):</span><br />
        ${transactions[1].hash}<br />
        <br />
        <span class="text-secondary">transaction.gasPrice:</span><span class="badge text-wrap"> ${transactions[1].gasPrice._hex} </span><br />
        <span class="text-secondary">transaction.from:</span> ${transactions[1].from} <br />
        <span class="text-secondary">transaction.to:</span> ${transactions[1].to} <br />
        </p>`;
    }

    const balVal = document.getElementById('balance');
    const bal = document.getElementById('balances');
    bal.addEventListener('click', () => {
        getBalance();
    });
    async function getBalance() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const address = window.ethereum.selectedAddress;
        const balance = await provider.getBalance(address);
        console.log(`The ${address} balance: ${ethers.utils.formatEther(balance)}`);
        balVal.innerHTML = `${ethers.utils.formatEther(balance)} ETH`;
    }

    const chainVal = document.getElementById('chainId');
    const chain = document.getElementById('chain');
    chain.addEventListener('click', async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const network = await provider.getNetwork();
        const chainId = network.chainId;
        console.log(chainId);
        chainVal.innerHTML = chainId;
    });
