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
        // display(connect, "connected", "Not able to connect");
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

