import Image from 'next/image'
import styles from "../../styles/BuyerProcess/offerAccepted.module.css"
import Button from '../styled components/Button'
import { useEffect, useState } from 'react';
import Skeleton from '@mui/joy/Skeleton';


export const Offer = ({ userType, transaction, apartment, id, sellerInfo, isLoading, agent }) => {
    const [viewProperty, setViewProperty] = useState(false);


    const handleViewProperty = () => {
        setViewProperty(!viewProperty)
    }


    return (
        <div className={styles.offer}>
            <section className={styles.text}>
                <h2>Offer Accepted</h2>
                {userType === "property_seeker" ? <p><strong>Congratulations!</strong> Your offer has been accepted by the seller. You can now proceed to inviting a Conveyancer that will represent you in this transaction to its completion </p> : null}
                {userType === "Real_estate_agent" ? <p><strong>Congratulations!</strong> You have successfully accepted an offer from a buyer for this real estate property. </p> : null}
            </section>

            <section className={styles.transaction}>
                <div className={styles.transactionId} >
                    <p>Transaction ID</p>

                    <strong style={{ textTransform: "uppercase" }}>{id && id.slice(0, 8)}</strong>


                </div>

                {viewProperty ? null : (
                    <>
                        <hr />
                        <div className={styles.transactionPrice}>
                            <p>Actual Price</p>

                            <strong>£ {apartment?.Amount}</strong>


                        </div>
                        <hr />


                        <div className={styles.facilities} >

                            {apartment?.bedrooms && (
                                <span>
                                    <Image src="/images/mdi-bedroom-outline.svg" width={20} height={20} alt="bedroom-thumbnail" />
                                    {apartment?.bedrooms}
                                </span>

                            )}

                            {apartment?.bathrooms && (
                                <span>
                                    <Image src="/images/mdi-shower.svg" width={20} height={20} alt="bathroom-thumbnail" />
                                    {apartment?.bathrooms}
                                </span>
                            )}
                            {apartment?.LivingRoom && (
                                <span>
                                    <Image src="/images/material-symbols-chair-outline.svg" width={20} height={20} alt="livingroom-thumbnail" />
                                    {apartment?.LivingRoom}
                                </span>
                            )}
                            {apartment?.Toilets && (
                                <span>
                                    <img
                                        src="https://img.icons8.com/ios/50/toilet-bowl.png"
                                        width={20}
                                        height={20}
                                        alt="toilet-bowl"
                                    />
                                    {apartment?.Toilets}
                                </span>
                            )}
                        </div>


                        <hr />
                        <div className={styles.transactionDesc} className="flex flex-col gap-y-2">

                            <p><strong>{apartment?.Title && apartment?.Title.slice(0, 10)}...</strong></p>



                            <p>{apartment?.address && apartment?.address.slice(0, 10)}...</p>

                        </div>
                        <hr />
                    </>
                )}


                <button style={viewProperty ? { backgroundColor: "green" } : null} onClick={() => handleViewProperty()} className={styles.viewProperty}>{viewProperty ? "Close property" : "View Property"}</button>
            </section>

            <hr className={styles.Line} />

            {
                viewProperty && (
                    <div className={styles.PropertyContainer}>
                        <div className={styles.ImageContainer}>


                            <img className={styles.image} src={apartment.images[0]} alt="" />




                            <div className={styles.propertyFeatures}>
                                {apartment?.images && apartment.images.length > 0 && (
                                    <li>
                                        <img src="/picture.svg" alt="" />
                                        <p>1/{apartment?.images.length}</p>
                                    </li>
                                )}
                                {apartment?.videos && apartment.videos.length > 0 && (
                                    <li>
                                        <img src="/video.svg" alt="" />
                                        <p>{apartment?.videos}</p>
                                    </li>
                                )}
                                {apartment?.vr && apartment.vr.length > 0 && (
                                    <li>
                                        <img src="/vr.svg" alt="" />
                                        <p>{apartment?.vr}</p>
                                    </li>
                                )}
                                {apartment?.FloorPlan && apartment.FloorPlan.length > 0 && (
                                    <li>
                                        <img src="/floorplan.svg" alt="" />
                                        <p>{apartment?.FloorPlan.length}</p>
                                    </li>
                                )}
                                {apartment?.virtual_tour && apartment.virtual_tour.length > 0 && (
                                    <li>
                                        <img src="/360tour.svg" alt="" />
                                        <p>{apartment?.virtual_tour}</p>
                                    </li>
                                )}
                            </div>


                        </div>

                        <div className={styles.propertyInfo}>
                            <div className={styles.propertyDescription}>

                                <p>{apartment?.description}</p>


                            </div>

                            <div className={styles.keyFeatures}>
                                <p><strong>Key Features</strong></p>

                                <ul>

                                    <li>{apartment?.Add_features}</li>

                                </ul>

                                <p className={styles.readMore}>Read More</p>
                            </div>
                        </div>

                    </div>
                )
            }


            <section className={styles.details}>
                <div>
                    <h4>Buyer details</h4>
                    <div className={styles.detailsDesc}>

                        <p style={{ textTransform: "capitalize" }}>{`Name : ${transaction?.offer?.FullName}`}</p>



                        <p>{`Location: ${transaction?.offer?.Address}`}</p>


                    </div>
                </div>
                <div>
                    <h4>Agent details</h4>
                    <div className={styles.detailsDesc}>

                        <p style={{ textTransform: "capitalize" }}>Name: {agent.username}</p>



                        <p>Agent ID: {agent?._id?.slice(0, 6)}</p>



                    </div>
                </div>

                <div>
                    <h4>Accepted Offer</h4>

                    <p className={styles.DetailsPrice}><strong>£ {transaction?.offer?.PriceOffer}</strong></p>


                </div>

                <div>
                    <h4>Nutlip commission</h4>

                    <p className={styles.DetailsPrice}><strong>£ {transaction?.offer?.NutlipCommission}</strong></p>


                </div>

                <div>
                    <h4>Seller receives</h4>

                    <p className={styles.DetailsPrice}><strong>£ {transaction?.offer?.receivedPayment}</strong></p>


                </div>

            </section>
        </div>
    )
}