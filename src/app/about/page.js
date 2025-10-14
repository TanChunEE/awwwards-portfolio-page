'use client';
import styles from './page.module.scss'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { useLocomotiveScroll } from '../../hooks/useLocomotiveScroll'
import Magnetic from '../../common/Magnetic'
import { useRef } from 'react'

const skills = [
  { name: 'React', icon: '⚛️' },
  { name: 'Next.js', icon: '▲' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'SCSS', icon: '🎨' },
  { name: 'Framer Motion', icon: '🎭' },
  { name: 'GSAP', icon: '✨' },
  { name: 'Three.js', icon: '🎲' },
  { name: 'REST', icon: '🔌' },
  { name: 'GraphQL', icon: '◈' },
  { name: 'Jest', icon: '🃏' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'Figma', icon: '🎯' },
  { name: 'Vercel', icon: '▼' },
  { name: 'AWS', icon: '☁️' }
]

const experiences = [
  {
    role: 'Senior Full Stack Developer',
    company: 'Tech Innovations Inc.',
    period: '2023 — Present',
    location: 'San Francisco, CA',
    description: 'Leading development of cutting-edge web applications with focus on performance and user experience.',
    highlights: [
      'Architected and built 5+ high-traffic web applications serving 100K+ users',
      'Reduced page load time by 60% through advanced optimization techniques',
      'Mentored team of 4 junior developers in modern React patterns and best practices',
      'Implemented comprehensive design system used across 10+ products'
    ],
    tech: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL']
  },
  {
    role: 'Frontend Developer',
    company: 'Creative Digital Agency',
    period: '2022 — 2023',
    location: 'Remote',
    description: 'Specialized in creating interactive, motion-rich websites for premium clients.',
    highlights: [
      'Delivered 15+ award-winning websites with complex animations',
      'Collaborated with designers to bring creative visions to life',
      'Improved Core Web Vitals scores by average of 40% across all projects',
      'Established animation guidelines and component library'
    ],
    tech: ['React', 'GSAP', 'Framer Motion', 'Three.js']
  },
  {
    role: 'Junior Developer',
    company: 'StartUp Labs',
    period: '2021 — 2022',
    location: 'New York, NY',
    description: 'Built features and maintained codebases for multiple SaaS products.',
    highlights: [
      'Contributed to 3 production applications with 50K+ combined users',
      'Implemented responsive UI components following design specs',
      'Participated in code reviews and agile sprint planning',
      'Learned best practices in testing, deployment, and version control'
    ],
    tech: ['JavaScript', 'React', 'Node.js', 'MongoDB']
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
}

export default function About() {
  useLocomotiveScroll()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const scaleProgress = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])

  return (
    <main ref={containerRef} className={styles.main} data-scroll-container>
      <div className={styles.container}>
        {/* Header */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
          style={{ scale: scaleProgress }}
        >
          <div className={styles.headerContent}>
            <motion.div 
              className={styles.titleSection}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <h1 className={styles.mainTitle}>
                <motion.span 
                  className={styles.titleLine}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  About
                </motion.span>
                <motion.span 
                  className={styles.titleLine}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.45 }}
                >
                  Me
                </motion.span>
              </h1>
              <motion.div 
                className={styles.titleDecoration}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
              >
                <motion.div 
                  className={styles.decorationLine}
                  initial={{ height: 0 }}
                  animate={{ height: 60 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                />
                <motion.div 
                  className={styles.decorationDot}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 1, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.3, boxShadow: '0 0 30px rgba(240, 147, 251, 0.8)' }}
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className={styles.descriptionSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.6, 0.05, 0.01, 0.9] }}
            >
              <motion.p 
                className={styles.lead}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Designer‑minded developer crafting immersive, performant experiences with purposeful motion.
              </motion.p>
              <motion.div 
                className={styles.statsContainer}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {[
                  { number: '20+', label: 'Projects' },
                  { number: '12', label: 'Techs' },
                  { number: '2+', label: 'Years' }
                ].map((stat, idx) => (
                  <motion.div 
                    key={stat.label}
                    className={styles.stat}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.span 
                      className={styles.statNumber}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 + idx * 0.1, type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.span>
                    <span className={styles.statLabel}>{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div 
            className={styles.headerBackground}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            style={{ y: backgroundY }}
          >
            <motion.div 
              className={styles.bgElement}
              animate={{ 
                y: [0, -30, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className={styles.bgElement}
              animate={{ 
                x: [0, 40, 0],
                y: [0, -20, 0],
                rotate: [0, -180, -360]
              }}
              transition={{ 
                duration: 10, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className={styles.bgElement}
              animate={{ 
                y: [0, 25, 0], 
                x: [0, -20, 0],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ 
                duration: 12, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            />
          </motion.div>
        </motion.div>

        {/* About summary */}
        <motion.section 
          className={styles.aboutSection}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.div 
            className={styles.aboutGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { title: 'Who I am', text: 'I blend engineering and design to ship fast, accessible experiences that feel delightful and intentional.' },
              { title: 'What I do', text: 'Frontend‑focused full‑stack: Next.js apps, motion systems, design systems, and performance optimization.' },
              { title: 'How I work', text: 'Collaborative, prototype‑driven, and detail‑oriented. I iterate quickly and ship with confidence.' }
            ].map((card, idx) => (
              <motion.div 
                key={card.title}
                className={styles.aboutCard}
                variants={itemVariants}
                whileHover={{ 
                  y: -12,
                  rotateX: 5,
                  rotateY: idx === 0 ? -5 : idx === 1 ? 0 : 5,
                  transition: { duration: 0.3, type: "spring", stiffness: 300 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.h3
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.2 }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.3 }}
                >
                  {card.text}
                </motion.p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Skills */}
        <motion.section 
          className={styles.skillsSection}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.sectionTitle}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Skills & Technologies
              </motion.span>
            </h3>
          </motion.div>
          <motion.div 
            className={styles.skillsGrid}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {skills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                className={styles.skillPill}
                variants={itemVariants}
                whileHover={{ 
                  y: -8,
                  scale: 1.08,
                  boxShadow: '0 20px 40px rgba(102,126,234,0.3)',
                  transition: { duration: 0.2, type: "spring", stiffness: 400 }
                }}
                whileTap={{ scale: 0.95 }}
                custom={idx}
              >
                <motion.span 
                  className={styles.skillIcon}
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.5 }}
                >
                  {skill.icon}
                </motion.span>
                <motion.span
                  className={styles.skillName}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.02 }}
                >
                  {skill.name}
                </motion.span>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Experience Timeline */}
        <motion.section 
          className={styles.experienceSection}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.div 
            className={styles.sectionHeader}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className={styles.sectionTitle}>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                Work Experience
              </motion.span>
            </h3>
          </motion.div>

          <div className={styles.timeline}>
            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.role + exp.period}
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <motion.div 
                  className={styles.timelineDot}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.2 + 0.3, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.5, boxShadow: '0 0 30px rgba(102, 126, 234, 0.6)' }}
                />
                
                <motion.div 
                  className={styles.timelineContent}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <motion.div 
                    className={styles.timelineCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.2 }}
                  >
                    <div className={styles.timelineHeader}>
                      <div>
                        <h4 className={styles.timelineRole}>{exp.role}</h4>
                        <p className={styles.timelineCompany}>{exp.company}</p>
                      </div>
                      <div className={styles.timelineMeta}>
                        <span className={styles.timelinePeriod}>{exp.period}</span>
                        <span className={styles.timelineLocation}>{exp.location}</span>
                      </div>
                    </div>
                    
                    <p className={styles.timelineDescription}>{exp.description}</p>
                    
                    <ul className={styles.timelineHighlights}>
                      {exp.highlights.map((highlight, hIdx) => (
                        <motion.li 
                          key={hIdx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.2 + 0.4 + hIdx * 0.1 }}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                    
                    <div className={styles.timelineTech}>
                      {exp.tech.map((tech) => (
                        <motion.span 
                          key={tech}
                          className={styles.techBadge}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA */}
        <motion.section 
          className={styles.ctaSection}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] }}
        >
          <motion.div 
            className={styles.ctaCard}
            whileHover={{ 
              y: -10,
              scale: 1.02,
              transition: { duration: 0.3, type: "spring", stiffness: 200 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Have a project in mind?
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Let's build something fast, accessible, and memorable.
            </motion.p>
            <motion.div 
              className={styles.ctaRow}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Magnetic>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/work" className={`${styles.btn} ${styles.btnPrimary}`}>
                    View Work
                  </Link>
                </motion.div>
              </Magnetic>
              <Magnetic>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="mailto:raymondtan2014@gmail.com" className={`${styles.btn} ${styles.btnGhost}`}>
                    Get in touch
                  </Link>
                </motion.div>
              </Magnetic>
            </motion.div>
          </motion.div>
        </motion.section>
      </div>
    </main>
  )
}
