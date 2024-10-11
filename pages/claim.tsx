import React from 'react';
import styles from '../styles/Claim.module.css';

const ClaimPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Claim Your NFT</h1>
      <div className={styles.iframeContainer}>
        <iframe
          src="https://embed.ipfscdn.io/ipfs/bafybeigdie2yyiazou7grjowoevmuip6akk33nqb55vrpezqdwfssrxyfy/erc1155.html?contract=0x6b5E74D41D44CbDF1bFB4bC641589f6bbF9c778f&chain=%7B%22name%22%3A%22Sepolia%22%2C%22chain%22%3A%22ETH%22%2C%22rpc%22%3A%5B%22https%3A%2F%2F11155111.rpc.thirdweb.com%2F%24%7BTHIRDWEB_API_KEY%7D%22%5D%2C%22nativeCurrency%22%3A%7B%22name%22%3A%22Sepolia+Ether%22%2C%22symbol%22%3A%22ETH%22%2C%22decimals%22%3A18%7D%2C%22shortName%22%3A%22sep%22%2C%22chainId%22%3A11155111%2C%22testnet%22%3Atrue%2C%22slug%22%3A%22sepolia%22%2C%22icon%22%3A%7B%22url%22%3A%22ipfs%3A%2F%2FQmcxZHpyJa8T4i63xqjPYrZ6tKrt55tZJpbXcjSDKuKaf9%2Fethereum%2F512.png%22%2C%22width%22%3A512%2C%22height%22%3A512%2C%22format%22%3A%22png%22%7D%7D&clientId=894316e634ed01ab3e26d9783d83a1c3&tokenId=0&theme=dark&primaryColor=purple"
          width="100%"
          height="750px"
          style={{ maxWidth: '100%' }}
          frameBorder="0"
        ></iframe>
      </div>
    </div>
  );
};

export default ClaimPage;
