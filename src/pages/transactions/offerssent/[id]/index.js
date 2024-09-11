import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const OffersSentPage = () => {
  // const [apartment, setApartment] = useState();
  // useEffect(() => {
  //   console.log(id);
  //   const fetchApartment = async () => {
  //     try {
  //       const response = await fetch(
  //         `aws url for now, http://ec2-13-60-41-27.eu-north-1.compute.amazonaws.comapi/apartments/getapartment/${id}`
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("apartment data:", data);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "An error occurred while fetching apartment data:",
  //         error
  //       );
  //     }
  //   };
  //   fetchApartment();
  // }, [id]);

  return (
    <div>
      <h1>Offers Sent Page</h1>
      {/* Your JSX here */}
    </div>
  );
};

export default OffersSentPage;
