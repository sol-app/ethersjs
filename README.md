# ethersjs
ethersjs lib - examples : connect to the blockchain, read &amp; write.

- Connect web to blockchain (WEB3): [here](https://github.com/sol-app/ethersjs/tree/main/connect) 
- Read from blockchain directly and/or from wallet: [here](https://github.com/sol-app/ethersjs/tree/main/read) 
- Listening smart contract from events: [here](https://github.com/sol-app/ethersjs/tree/main/listen-event) 

### important:
ethersjs v6 have different method for detecting web3
- v6 [source](https://docs.ethers.org/v6/getting-started/)
- v5 - [5.7.2](https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.2/ethers.min.js)

### example:
example wallet connect, without external libs. (run in webserver)
```html
<!DOCTYPE html>
<html>
<head>
  <title>Web3 Wallet Connect Example</title>
  <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css">
</head>
<body>
  <button id="connect-button" class="btn btn-primary m-5">Connect to Wallet</button>
  <script>
    const connectButton = document.getElementById('connect-button');
    const provider = window.ethereum;

    const connectToWallet = async () => {
      if (typeof provider !== 'undefined') {
        try {
          await provider.request({ method: 'eth_requestAccounts' });
          console.log('Connected to wallet:', provider.selectedAddress);
          // Do something with the connected wallet
        } catch (error) {
          console.error('Failed to connect to wallet:', error);
        }
      } else {
        console.error('No Web3 provider found');
      }
    };

    connectButton.addEventListener('click', connectToWallet);
  </script>
</body>
</html>
```
