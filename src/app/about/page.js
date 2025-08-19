'use client';
import styles from './page.module.scss';
import { useLocomotiveScroll } from '../../hooks/useLocomotiveScroll';

export default function About() {
  // Initialize Locomotive Scroll
  useLocomotiveScroll();

  return (
    <main className={styles.main} data-scroll-container>
      <div className={styles.container}>
        <h1>Test page</h1>
        <p>Welcome to our test about page!</p>
        <p>This is a sample test page created using Next.js App Router.</p>
      </div>
    </main>
  );
}
