import styles from "../../styles/dashboard/subscription.module.css";

const data = [
  {
    id: 1,
    plan: "Free (Sale)",
    price: 0,
    included: [
      { name: "Free Unlimited Property for sale listings" },
      { name: "0.2 Percent Commission to Nutlip on each Sale" },
      { name: "Access to All Analytic Features" },
      { name: "Technical support" },
    ],
  },

  {
    id: 2,
    plan: "Sliver (Sale)",
    price: 29.99,
    included: [
      { name: "10 listings for Rent maximum per Branch" },
      { name: "0 Featured listing" },
      { name: "Access to All Analytic Features" },
      { name: "Technical support" },
    ],
  },
  {
    id: 3,
    plan: "Gold (Sale)",
    price: 49.99,
    included: [
      { name: "20 Properties for Rent Maximum per Branch" },
      { name: "1 Featured listing" },
      { name: "Access to All Analytic Features" },
      { name: "Technical support" },
    ],
  },
  {
    id: 4,
    plan: "Platinum (Sale)",
    price: 69.99,
    included: [
      { name: "20+ Properties for Rent  per Branch" },
      { name: "2 Featured listing" },
      { name: "Access to All Analytic Features" },
      { name: "Technical support" },
    ],
  },
];

const Subscription = () => {
  return (
    <>
      <div className={styles.Section}>
        <div className={styles.NavContainer}>
          <h1 className={styles.Header}>Subscription</h1>

          <div className={styles.search}>
            <input type="text" placeHolder="search property" />
            <img src="/navbar/search.svg" />
          </div>
        </div>

        <div className={styles.CardContainer}>
          {data.map((info) => (
            <Card key={info.id} info={info} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Subscription;

const Card = ({ info }) => {
  return (
    <>
      <div className={styles.Carder}>
        <div className={styles.Card}>
          <div className={styles.CardHeader}>
            <div className={styles.cardPlan}>
              <img src="/dashboard/plan.png" />
              <h1>{info.plan}</h1>
            </div>

            <div className={styles.cardPrice}>
              <p>{`£ ${info.price}`}</p>
              <p>{"/monthly"}</p>
            </div>
          </div>

          <div className={styles.CardIncludedContainer}>
            <p className={styles.CardIncludeHeader}>{"What's included"}</p>

            {info.included.map((include, index) => (
              <div key={index} className={styles.CardIncludedList}>
                <img src="/dashboard/listcircle.png" alt="" />
                <p>{include.name}</p>
              </div>
            ))}
          </div>

          <div className={styles.CardFooter}>
            <button>Make Payment</button>
          </div>
        </div>
      </div>
    </>
  );
};
