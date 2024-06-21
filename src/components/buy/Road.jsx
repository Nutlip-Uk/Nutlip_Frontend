import styles from "../../styles/buy/Roadtobuy.module.css"
export default function Road() {
  const Datas=[
    {
      id:1,
  name:"Financial Preparation"
    },
    {
      id:2,
  name:"Property Exploration"
    },
    {
      id:3,
  name:"Offer and Negotiation"
    },
    {
      id:4,
  name:"Legal and Survey Checks"
    },
    {
      id:5
      ,
  name:"Completion and Move in"
    },
  ]
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.TextContainer}>
          <p>Roadmap to buying a property</p>
          <p>Embarking on the journey of homeownership requires a clear and well-structured roadmap. With the right guidance, you can navigate the process of buying a property with confidence and success</p>
        </div>
        <div className={styles.grid}>
          {
            Datas.map((data)=>(
              <div className={styles.box} key={data.id}>
                  <div className={styles.boxContainer}>
                    <div className={styles.dash}></div>
                  <p>{data.name}</p>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}