import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../../styles/buy/Details.module.css";
import RelatedProperties from "../../../components/buy/BuyRelatedProperties";

import {
  DetailsContent,
  DetailsImages,
} from "../../../components/buy/BuyPropertyDetails";
import Link from "next/link";
import OfferModal from "../../../components/Modals/Offer.modal";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log('Fetching property with ID:', id);

  try {
    const res = await fetch(`/api/apartment/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch');
    }
    const property = await res.json();
    console.log('API Response:', property);
    return {
      props: {
        property,
      },
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      props: {
        property: null,
      },
    };
  }
}

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [property, setProperty] = useState(null);
  console.log("Router Query ID:", id);




  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://nutlip-server.uc.r.appspot.com/api/apartments/getapartment/${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setProperty(data.data);
        console.log(data.data)
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(!showModal);
  };
  const openModal = () => {
    setShowModal(!showModal);
  };

  const [viewOptions, setViewOptions] = useState("");

  // if (!property) {
  //   return <div className={styles.error}>Property not found</div>;
  // }

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
                <h4>Need a Mortgage Broker?</h4>
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
