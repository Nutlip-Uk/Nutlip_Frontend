import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/Rent/Details.module.css";
import { useState } from "react";

export const DetailsImages = (props) => {
  const data = props.data;
  const { images, options } = data;

  return (
    <div className={styles.view}>
      <div className={styles.imagesContainer}>
        <Image className={styles.mainImage} src={images[1]} width={800} height={500} alt="image" />
        <div className={styles.SubImages}>
          <Image src={images[0]} width={370} height={240} alt="image" />
          <Image src={images[2]} width={370} height={240} alt="image" />
        </div>
      </div>

      
    </div>
  );
};

export const DetailsContent = (props) => {
  const router = useRouter();
  const check = router.pathname === "/rent/search/[id]";
  const { facilities, desc, location, info, text, features, listed, student_friendly,pcm,pcw,infoTrans} =
    props.data;
    const [viewOptions, setViewOptions] = useState("pictures");
    const data = props.data;
    const { images, options } = data;

  // console.log(router.pathname)

  return (
    <div className={styles.content}>
      <div className={styles.content_details}>
      <div id={styles.options}>
        <label
          className={
            viewOptions === "pictures" ? styles.selected : styles.unselected
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
          1/{options.pictures}
        </label>

        <label
          className={
            viewOptions === "videos" ? styles.selected : styles.unselected
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
          {options.videos}
        </label>

        <label
          className={viewOptions === "vr" ? styles.selected : styles.unselected}
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
          {options.virtual_tour}
        </label>

        <label
          className={
            viewOptions === "plan" ? styles.selected : styles.unselected
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
          {options.floor_plan}
        </label>

        <label
          className={
            viewOptions === "360" ? styles.selected : styles.unselected
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
          {options.vr}
        </label>

        <label
          className={
            viewOptions === "location" ? styles.selected : styles.unselected
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
            onChange={(e) => setViewOptions(e.target.value)}
          />
        </label>
      </div>

      <div className={styles.price}>
       <div className={styles.student_friendly}>
            <h1>£{pcm} pcm</h1>
            { student_friendly ? <button>Student friendly</button>: null}
       </div>
        <p>£{pcw} pcw</p>
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
          <img src="https://img.icons8.com/ios/50/toilet-bowl.png"  width={25} height={25} alt="toilet-bowl" />
            {facilities.toilets}
          </span>
        </div>

        <hr />

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <p className={styles.desc}>{desc}</p>
            <p className={styles.location}>{location}</p>
            <p className={styles.text}>{text}</p>
            <div className={styles.deposit}>
                Deposit
            <p>£{infoTrans.deposit}</p>
            </div>
            <div className={styles.deposit}>
            Council tax band
            <p>{infoTrans.counciltax}</p>
            </div>
            <div className={styles.deposit}>
            Letting arrangments
            <p>{infoTrans.letting}</p>
            </div>
            
          </div>

          <div className={styles.feature}>
            <p>Key features</p>
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


