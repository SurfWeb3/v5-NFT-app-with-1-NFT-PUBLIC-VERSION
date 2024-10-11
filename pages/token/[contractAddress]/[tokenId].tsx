import {
  MediaRenderer,
  ThirdwebNftMedia,
  useContract,
  useContractEvents,
} from "@thirdweb-dev/react";
import React from "react";
import Container from "../../../components/Container/Container";
import { GetStaticProps, GetStaticPaths } from "next";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import {
  ETHERSCAN_URL,
  NETWORK,
  NFT_COLLECTION_ADDRESS,
} from "../../../const/contractAddresses";
import styles from "../../../styles/Token.module.css";
import Link from "next/link";
import randomColor from "../../../util/randomColor";
import Skeleton from "../../../components/Skeleton/Skeleton";

type Props = {
  nft: NFT;
  contractMetadata: any;
};

const [randomColor1, randomColor2] = [randomColor(), randomColor()];

export default function TokenPage({ nft, contractMetadata }: Props) {
  // Connect to NFT Collection smart contract
  const { contract: nftCollection } = useContract(NFT_COLLECTION_ADDRESS);

  // Load historical transfer events
  const { data: transferEvents, isLoading: loadingTransferEvents } =
    useContractEvents(nftCollection, "TransferSingle", {
      queryFilter: {
        filters: {
          tokenId: nft.metadata.id,
        },
        order: "desc",
      },
    });

  return (
    <Container maxWidth="lg">
      <div className={styles.container}>
        <div className={styles.metadataContainer}>
          <ThirdwebNftMedia
            metadata={nft.metadata}
            className={styles.image}
          />

          <div className={styles.descriptionContainer}>
            <h3 className={styles.descriptionTitle}>Description</h3>
            <p className={styles.description}>{nft.metadata.description}</p>

            <h3 className={styles.descriptionTitle}>Traits</h3>

            <div className={styles.traitsContainer}>
              {Object.entries(nft?.metadata?.attributes || {}).map(
                ([key, value]) => (
                  <div className={styles.traitContainer} key={key}>
                    <p className={styles.traitName}>{key}</p>
                    <p className={styles.traitValue}>
                      {value?.toString() || ""}
                    </p>
                  </div>
                )
              )}
            </div>

            <h3 className={styles.descriptionTitle}>History</h3>

            <div className={styles.traitsContainer}>
              {transferEvents?.map((event, index) => (
                <div
                  key={event.transaction.transactionHash}
                  className={styles.eventsContainer}
                >
                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>Event</p>
                    <p className={styles.traitValue}>
                      {
                        index === transferEvents.length - 1
                          ? "Mint"
                          : "Transfer"
                      }
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>From</p>
                    <p className={styles.traitValue}>
                      {event.data.from?.slice(0, 4)}...
                      {event.data.from?.slice(-2)}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>To</p>
                    <p className={styles.traitValue}>
                      {event.data.to?.slice(0, 4)}...
                      {event.data.to?.slice(-2)}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <p className={styles.traitName}>Quantity</p>
                    <p className={styles.traitValue}>
                      {event.data.value.toString()}
                    </p>
                  </div>

                  <div className={styles.eventContainer}>
                    <Link
                      className={styles.txHashArrow}
                      href={`${ETHERSCAN_URL}/tx/${event.transaction.transactionHash}`}
                      target="_blank"
                    >
                      ↗
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.listingContainer}>
          {contractMetadata && (
            <div className={styles.contractMetadataContainer}>
              <MediaRenderer
                src={contractMetadata.image}
                className={styles.collectionImage}
              />
              <p className={styles.collectionName}>{contractMetadata.name}</p>
            </div>
          )}
          <h1 className={styles.title}>{nft.metadata.name}</h1>
          <p className={styles.collectionName}>Token ID #{nft.metadata.id}</p>

          <div className={styles.nftOwnerContainer}>
            <div
              className={styles.nftOwnerImage}
              style={{
                background: `linear-gradient(90deg, ${randomColor1}, ${randomColor2})`,
              }}
            />
            <div className={styles.nftOwnerInfo}>
              <p className={styles.label}>Total Supply</p>
              <p className={styles.nftOwnerAddress}>
                {nft.supply}
              </p>
            </div>
          </div>

          <Link href="/claim" className={styles.claimButton}>
            Claim this NFT
          </Link>
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK(NETWORK, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nft = await contract.erc1155.get(tokenId);

  let contractMetadata;

  try {
    contractMetadata = await contract.metadata.get();
  } catch (e) {}

  return {
    props: {
      nft,
      contractMetadata: contractMetadata || null,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK(NETWORK, {
    secretKey: process.env.TW_SECRET_KEY,
  });

  const contract = await sdk.getContract(NFT_COLLECTION_ADDRESS);

  const nfts = await contract.erc1155.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: NFT_COLLECTION_ADDRESS,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
