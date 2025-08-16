'use client';
import styles from './page.module.scss';

export default function About() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1>Test page</h1>
        <p>Welcome to our test about page!</p>
        <p>This is a sample test page created using Next.js App Router.</p>
      </div>
    </main>
  );
}
