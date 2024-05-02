import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/buy/Details.module.css";
import { useState } from "react";

export const DetailsImages = (props) => {
  const data = props.data;
  const { images, options } = data;

  return (
    <div className={styles.view}>
      <div className={styles.imagesContainer}>
        {props.viewOptions === "" && (
          <>
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
            <div className={styles.SubImages}>
              <Image src={images[0]} width={370} height={240} alt="image" />
              <Image src={images[2]} width={370} height={240} alt="image" />
            </div>
          </>
        )}
        {props.viewOptions === "pictures" && (
          <>
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </>
        )}
        {props.viewOptions === "videos" && (
          <div className={styles.videoContainer}>
            {/* Render video component */}
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </div>
        )}
        {props.viewOptions === "vr" && (
          <div className={styles.vrContainer}>
            {/* Render VR component */}
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </div>
        )}
        {props.viewOptions === "plan" && (
          <div className={styles.planContainer}>
            {/* Render floor plan component */}
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </div>
        )}
        {props.viewOptions === "360" && (
          <div className={styles.panoramaContainer}>
            {/* Render 360 panorama component */}
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </div>
        )}
        {props.viewOptions === "location" && (
          <div className={styles.locationContainer}>
            {/* Render location component */}
            <Image
              className={styles.mainImage}
              src={images[1]}
              width={800}
              height={500}
              alt="image"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export const DetailsContent = (props) => {
  const router = useRouter();
  const check = router.pathname === "/rent/search/[id]";
  const { facilities, desc, location, info, text, features, listed, price } =
    props.data;
  const data = props.data;
  const { options } = data;
  // console.log(router.pathname)

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
        <div className={styles.optionContainer}>
        <div id={styles.options}>
          <label
            className={
              props.viewOptions === "pictures"
                ? styles.selected
                : styles.unselected
            }
          >
            <Image
              src="/images/frame-42758-system-uicons-picture-1.svg"
              width={25}
              height={25}
              alt="image-Thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="pictures"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
            1/{options.pictures}
          </label>

          <label
            className={
              props.viewOptions === "videos"
                ? styles.selected
                : styles.unselected
            }
          >
            <Image
              src="/images/frame-42758-ph-video-light-1.svg"
              width={25}
              height={25}
              alt="video-thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="videos"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
            {options.videos}
          </label>

          <label
            className={
              props.viewOptions === "vr" ? styles.selected : styles.unselected
            }
          >
            <Image
              src="/images/frame-42758-bi-badge-vr-1.svg"
              width={25}
              height={25}
              alt="vr-thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="vr"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
            {options.virtual_tour}
          </label>

          <label
            className={
              props.viewOptions === "plan" ? styles.selected : styles.unselected
            }
          >
            <Image
              src="/images/frame-42758-teenyicons-floorplan-solid-1.svg"
              width={25}
              height={25}
              alt="floor-plan-thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="plan"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
            {options.floor_plan}
          </label>

          <label
            className={
              props.viewOptions === "360" ? styles.selected : styles.unselected
            }
          >
            <Image
              src="/images/frame-42758-bi-badge-vr.svg"
              width={25}
              height={25}
              alt="thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="360"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
            {options.vr}
          </label>

          <label
            className={
              props.viewOptions === "location"
                ? styles.selected
                : styles.unselected
            }
          >
            <Image
              src="/images/vuesax-linear-location.svg"
              width={25}
              height={25}
              alt="thumbnail"
            />
            <input
              type="radio"
              name="viewOptions"
              value="location"
              onChange={(e) => props.setViewOptions(e.target.value)}
            />
          </label>
        </div>
        </div>

        <div className={styles.price}>
          <h1>£{price}</h1>
          <button onClick={props.handleShow}>Make an offer</button>
        </div>
        <div className={styles.facilities}>
          <span>
            <Image
              src="/images/mdi-bedroom-outline.svg"
              width={25}
              height={25}
              alt="bedroom-thumbnail"
            />
            {facilities.bedrooms}
          </span>
          <span>
            <Image
              src="/images/mdi-shower.svg"
              width={25}
              height={25}
              alt="bathroom-thumbnail"
            />
            {facilities.bathrooms}
          </span>
          <span>
            <Image
              src="/images/material-symbols-chair-outline.svg"
              width={25}
              height={25}
              alt="livingroom-thumbnail"
            />
            {facilities.livingroom}
          </span>
          <span>
            <img
              src="https://img.icons8.com/ios/50/toilet-bowl.png"
              width={25}
              height={25}
              alt="toilet-bowl"
            />
            {facilities.toilets}
          </span>
        </div>

        <hr />

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p>{desc}</p>
            <p>{location}</p>
            <p>{text}</p>
          </div>

          <div className={styles.feature}>
            <p className={styles.keyFeatures}>Key features</p>
            <ul>
              {features.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.extraInfo}>
          <a className={styles.readMore}>Read more</a>

          <p className={styles.listed}>{listed}</p>

          <Image
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
