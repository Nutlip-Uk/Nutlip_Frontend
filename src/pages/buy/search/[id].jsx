import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/buy/Details.module.css";
import RelatedProperties from "../../../components/buy/BuyRelatedProperties";
import { buy } from "../../../utils/buyproperties";
import {
  DetailsContent,
  DetailsImages,
} from "../../../components/buy/BuyPropertyDetails";
import Link from "next/link";
import OfferModal from "../../../components/Modals/Offer.modal";
import { useState } from "react";

export async function getStaticPaths() {
  const paths = buy.map((property) => ({
    params: { id: property.id.toString() },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const property = buy.find((property) => property.id === Number(params.id));
  return { props: { property } };
}

const Details = ({ property }) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(!showModal);
  };
  const openModal = () => {
    setShowModal(!showModal);
  };

  const [viewOptions, setViewOptions] = useState("");

  return (
    <section className={styles.Section}>
      <div className={styles.container}>
        {showModal && <OfferModal handleShow={closeModal} data={property} />}
        <div className={styles.navBack}>
          <button onClick={() => router.back()}>
            <Image
              src="/images/material-symbols-arrow-back-ios-new.svg"
              width={20}
              height={20}
              alt="return-arrow"
            />
            Back to search result
          </button>
        </div>

        <DetailsImages
          viewOptions={viewOptions}
          setViewOptions={setViewOptions}
          data={property}
        />
        <div className={styles.detailContainer}>
          <DetailsContent
            viewOptions={viewOptions}
            setViewOptions={setViewOptions}
            data={property}
            handleShow={openModal}
          />

          <section className={styles.buy}>
            <div className={styles.agent}>
              <div className={styles.mortgage}>
                x<h4>Need a Mortgage Broker?</h4>
                <p>
                  Search for a mortgage broker from the copiled list on the
                  platform
                </p>
                <Link href="/mortgages?type=broker">Find Mortgage Broker</Link>
              </div>
              <div className={styles.conveyancer}>
                <h4>Find a Conveyancer</h4>
                <p>
                  Search for a Conveyancer with ease. Click the button below
                </p>
                <Link href="/mortgages?type=broker">Find a Conveyancer</Link>
              </div>
            </div>

            <div className={styles.content_contact}>
              <div className={styles.contentContactBtnCon}>
                <button className={styles.transparentBorder}>
                  <Image
                    src="/images/vector.svg"
                    width={20}
                    height={20}
                    alt="phone"
                  />
                  Call agent
                </button>
                <button className={styles.transparentBorder}>
                  <Image
                    src="/images/clarity-email-line.svg"
                    width={20}
                    height={20}
                    alt="email-thumbnail"
                  />
                  Email agent
                </button>
                <button className={styles.transparentBorder}>
                  <Image
                    src="/images/clarity-email-line.svg"
                    width={20}
                    height={20}
                    alt="email-thumbnail"
                  />
                  Make an Offer
                </button>

                <div className={styles.extraBtn}>
                  <button className={styles.solidBorder}>
                    <Image
                      src="/images/vuesax-linear-heart.svg"
                      width={20}
                      height={20}
                      alt="share"
                    />
                    Save
                  </button>
                  <button className={styles.transparentBorder}>
                    <Image
                      src="/images/solar-share-linear.svg"
                      width={20}
                      height={20}
                      alt="share"
                    />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        <RelatedProperties />
      </div>
    </section>
  );
};

export default Details;
