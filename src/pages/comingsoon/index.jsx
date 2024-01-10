import styles  from "../../styles/coming.module.css"
import Link  from 'next/link';
export default function ComingSoon() {
  return (
    <div className={styles.Container}>
      <h1>Coming soon...</h1>
      <p>In the meantime, You can checkout our landing page</p>
      <Link href={"/"}>Here</Link>
    </div>
  )
}
