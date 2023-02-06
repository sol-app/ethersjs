const initialize = () => {
    
const INFURA_ID = '4337e15d669b4c019c12e57bc4e26ca9'; // dont reveal this line, use [.env]
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);
    const ERC20_ABI = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function totalSupply() view returns (uint256)",
        "function balanceOf(address) view returns (uint)",
    
        "event Transfer(address indexed from, address indexed to, uint amount)"
    ];
    
    const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; // DAI Contract (et mainnet)
    const contract = new ethers.Contract(address, ERC20_ABI, provider);
    
    const main = async () => {
        listener.innerHTML = "dai last 2 block transfers - please wait";
        const block = await provider.getBlockNumber();
    
        const transferEvents = await contract.queryFilter('Transfer', block - 1, block);
        console.log(transferEvents);
        console.log(transferEvents.length);
        j = transferEvents.length;
        if(j != 0){
            listener.innerHTML = `<b>dai transfers count: ${j}<br /> transfer data:</b><hr>`;
            for(i=0; i < j; i++){
                console.log(`${transferEvents[i].blockHash}\n`);
                document.getElementById("listener").innerHTML += `<b>block hash</b>: ${transferEvents[i].blockHash}`;
                document.getElementById("listener").innerHTML += "<br />";
                document.getElementById("listener").innerHTML += `<b>from</b>: ${transferEvents[i].args[0]}`;
                document.getElementById("listener").innerHTML += "<br />";
                document.getElementById("listener").innerHTML += `<b>to</b>: ${transferEvents[i].args[1]}`;
                document.getElementById("listener").innerHTML += "<br />";
                document.getElementById("listener").innerHTML += `<b>amount</b>: ${ethers.utils.formatEther(transferEvents[i].args[2])} <b>of DAI</b>`;
                document.getElementById("listener").innerHTML += "<hr>";
            }
        } else {
            console.log(`not transaction in this 2 last block\n`);
            listener.innerHTML = `not transaction in this 2 last block<br />`;
        }
      }

    const lisBtn = document.getElementById('lisBtn');
    const listener = document.getElementById('listener');
    lisBtn.addEventListener('click', () => {
        main();
    });

}
window.addEventListener('DOMContentLoaded', initialize);
