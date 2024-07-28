import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/buy/Details.module.css";
import { useState, useContext } from "react";
import { ImageContext } from "../../context/ImageContext.context";
import { Carousel } from 'antd';


export const DetailsImages = ({ data }) => {
  const { viewOptions, setViewOptions } = useContext(ImageContext);

  return (
    <div className={styles.view}>
      <div className={styles.imagesContainer}>
        {viewOptions === "" && (
          <>
            <img
              className={styles.mainImage}
              src={data?.images[0]}
              width={800}
              height={500}
              alt="image"
            />
            <div className={styles.SubImages}>
              <img src={data?.images[1]} width={370} height={240} alt="image" />
              <img src={data?.images[2]} width={370} height={240} alt="image" />
            </div>
          </>
        )}
        {viewOptions === "pictures" && (
          <>
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
        {viewOptions === "videos" && (
          < >
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
        {viewOptions === "vr" && (
          <>
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
        {viewOptions === "plan" && (
          <>
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
        {viewOptions === "360" && (
          <>
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
        {viewOptions === "location" && (
          <>
            <Carousel className={styles.caro} arrows dotPosition="left" infinite={true} autoplay>

              {
                data.images.map((image, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        className={styles.mainImage}
                        src={image}
                        width={800}
                        height={500}
                      />
                    </>
                  );
                })
              }
            </Carousel>
          </>
        )}
      </div>
    </div>
  );
};

export const DetailsContent = (props) => {
  const router = useRouter();
  const check = router.pathname === "/rent/search/[id]";

  const data = props.data;

  const { viewOptions, setViewOptions } = useContext(ImageContext);


  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <div className={styles.optionContainer}>
          <div id={styles.options}>
            <label
              className={
                viewOptions === "pictures"
                  ? styles.selected
                  : styles.unselected
              }
            >
              <img
                src="/images/frame-42758-system-uicons-picture-1.svg"
                width={25}
                height={25}
                alt="image-Thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="pictures"
                onChange={(e) => setViewOptions(e.target.value)}
              />
              1/{data?.images?.length}
            </label>

            <label
              className={
                viewOptions === "videos"
                  ? styles.selected
                  : styles.unselected
              }
            >
              <img
                src="/images/frame-42758-ph-video-light-1.svg"
                width={25}
                height={25}
                alt="video-thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="videos"
                onChange={(e) => setViewOptions(e.target.value)}
              />
              {data?.videos?.length}
            </label>

            <label
              className={
                viewOptions === "vr" ? styles.selected : styles.unselected
              }
            >
              <img
                src="/images/frame-42758-bi-badge-vr-1.svg"
                width={25}
                height={25}
                alt="vr-thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="vr"
                onChange={(e) => setViewOptions(e.target.value)}
              />
              {data?.virtual_tour?.length}
            </label>

            <label
              className={
                viewOptions === "plan" ? styles.selected : styles.unselected
              }
            >
              <img
                src="/images/frame-42758-teenyicons-floorplan-solid-1.svg"
                width={25}
                height={25}
                alt="floor-plan-thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="plan"
                onChange={(e) => setViewOptions(e.target.value)}
              />
              {data?.floor_plan?.length}
            </label>

            <label
              className={
                viewOptions === "360" ? styles.selected : styles.unselected
              }
            >
              <img
                src="/images/frame-42758-bi-badge-vr.svg"
                width={25}
                height={25}
                alt="thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="360"
                onChange={(e) => setViewOptions(e.target.value)}
              />
              {data?.vr?.length}
            </label>

            <label
              className={
                viewOptions === "location"
                  ? styles.selected
                  : styles.unselected
              }
            >
              <img
                src="/images/vuesax-linear-location.svg"
                width={25}
                height={25}
                alt="thumbnail"
              />
              <input
                type="radio"
                name="viewOptions"
                value="location"
                onChange={(e) => setViewOptions(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className={styles.price}>
          <h1>£{data?.Amount}</h1>
          <button onClick={props.handleShow}>Make an offer</button>
        </div>
        <div className={styles.facilities}>
          <span>
            <img
              src="/images/mdi-bedroom-outline.svg"
              width={25}
              height={25}
              alt="bedroom-thumbnail"
            />
            {data?.bedrooms}
          </span>
          <span>
            <img
              src="/images/mdi-shower.svg"
              width={25}
              height={25}
              alt="bathroom-thumbnail"
            />
            {data?.bathrooms}
          </span>
          <span>
            <img
              src="/images/material-symbols-chair-outline.svg"
              width={25}
              height={25}
              alt="livingroom-thumbnail"
            />
            {data?.LivingRoom}
          </span>
          <span>
            <img
              src="https://img.icons8.com/ios/50/toilet-bowl.png"
              width={25}
              height={25}
              alt="toilet-bowl"
            />
            {data?.Toilets}
          </span>
        </div>

        <hr />

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p>{data?.Title}</p>
            <p>{data?.location}</p>
            <p>{data?.description}</p>
          </div>

          <div className={styles.feature}>
            <p className={styles.keyFeatures}>Key features</p>
            <ul>
              {/* {features.map((item, index) => (
                <li key={index}>{item}</li>
              ))} */}

              {data?.Add_features}
            </ul>
          </div>
        </div>

        <div className={styles.extraInfo}>
          <a className={styles.readMore}>Read more</a>

          <p className={styles.listed}>{data?.date_created}</p>

          <img
            className={styles.company}
            src="/images/rectangle-402.svg"
            width={170}
            height={42}
            alt="logo"
          />
        </div>
      </div>
    </div>
  );
};
