import styles from "../../styles/buy/roadmap.module.css"
export default function Roadmap() {
  const Datas=[
    {
      id:1,
  name:"Automated Transactions ",
  text:"Nutlip streamlines the buying process automatedly by eliminating manual paperwork and administrative tasks, saving you valuable time and effort."
    },
    {
      id:2,
  name:"Transparency",
  text:"Be rest assured of a transparent transaction from start to finish when you use Nutlip. You are made aware of the transaction stage every step of the way."
    },
    {
      id:3,
  name:"Streamlined Process",
  text:"Nutlip simplifies the property buying journey, making it easier and more efficient for you to navigate. It also reduces friction and eliminates unnecessary complexities, so you can save time and effort."
    },
    {
      id:4,
  name:"Time Savings",
  text:"Nutlip expedites the property buying process, allowing you to make decisions and progress quickly. By automating tasks, providing instant notifications, and streamlining communication, you can efficiently buy your new home without wasting precious time."
    }
  ]
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.TextContainer}>
          <p>{"More Unique Benefits for you with Nutlip"}</p>
          <p>{"Experience the difference with Nutlip's personalized plans, tailored uniquely for you, and unlock a world of unparalleled benefits."}</p>
        </div>
        <div className={styles.grid}>
          {
            Datas.map((data)=>(
              <div className={styles.box} key={data.id}>
                  <p>{data.name}</p>
                  <p>{data.text}</p>
              </div>
            ))
          }
        </div>
      </div>
    </section>
  )
}
