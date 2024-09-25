import styles from "../../styles/coming.module.css"
import Link from 'next/link';
export default function AccessDenied() {
  return (
    <div className={styles.Container}>
      <h1 className="text-red-500 font-semibold">Access Denied</h1>
      <p>Create an Account as an Agent to access the Dashboard</p>
      <Link href={"/"}>Go back </Link>
    </div>
  )
}
