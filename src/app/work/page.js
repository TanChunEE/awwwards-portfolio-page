'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useLocomotiveScroll } from '../../hooks/useLocomotiveScroll';

const workProjects = [
  {
    id: 1,
    title: "C2 Montreal",
    category: "Web Design",
    description: "A modern conference website with interactive elements and smooth animations.",
    image: "/images/c2montreal.png",
    color: "#000000",
    year: "2024",
    link: "#"
  },
  {
    id: 2,
    title: "Office Studio",
    category: "Branding",
    description: "Complete brand identity and website design for a creative studio.",
    image: "/images/officestudio.png",
    color: "#8C8C8C",
    year: "2024",
    link: "#"
  },
  {
    id: 3,
    title: "Locomotive",
    category: "Development",
    description: "Custom scroll library with smooth animations and performance optimization.",
    image: "/images/locomotive.png",
    color: "#EFE8D3",
    year: "2023",
    link: "#"
  },
  {
    id: 4,
    title: "Silencio",
    category: "UI/UX Design",
    description: "Minimalist design system with focus on user experience and accessibility.",
    image: "/images/silencio.png",
    color: "#706D63",
    year: "2023",
    link: "#"
  },
  {
    id: 5,
    title: "Decimal",
    category: "Web Development",
    description: "E-commerce platform with advanced filtering and search capabilities.",
    image: "/images/decimal.jpg",
    color: "#2A2A2A",
    year: "2023",
    link: "#"
  },
  {
    id: 6,
    title: "Maven",
    category: "Mobile App",
    description: "Cross-platform mobile application with real-time collaboration features.",
    image: "/images/maven.jpg",
    color: "#4A90E2",
    year: "2022",
    link: "#"
  },
  {
    id: 7,
    title: "Panda Studio",
    category: "Creative Design",
    description: "Innovative branding and visual identity for a creative agency.",
    image: "/images/panda.jpg",
    color: "#FF6B6B",
    year: "2022",
    link: "#"
  },
  {
    id: 8,
    title: "Powell Digital",
    category: "Web Development",
    description: "Full-stack web application with modern architecture and responsive design.",
    image: "/images/powell.jpg",
    color: "#4ECDC4",
    year: "2022",
    link: "#"
  },
  {
    id: 9,
    title: "Google Creative",
    category: "UI/UX Design",
    description: "User interface redesign focusing on accessibility and modern design principles.",
    image: "/images/google.jpg",
    color: "#45B7D1",
    year: "2021",
    link: "#"
  },
  {
    id: 10,
    title: "Funny Studio",
    category: "Branding",
    description: "Playful brand identity and marketing materials for entertainment company.",
    image: "/images/funny.jpg",
    color: "#96CEB4",
    year: "2021",
    link: "#"
  },
  {
    id: 11,
    title: "Wix Platform",
    category: "Development",
    description: "Custom website builder with drag-and-drop functionality and advanced features.",
    image: "/images/wix.jpg",
    color: "#FFEAA7",
    year: "2021",
    link: "#"
  },
  {
    id: 12,
    title: "C2 Creative",
    category: "Web Design",
    description: "Alternative design concept for conference platform with enhanced user experience.",
    image: "/images/c2.jpg",
    color: "#DDA0DD",
    year: "2021",
    link: "#"
  }
];

const categories = ["All", "Web Design", "Branding", "Development", "UI/UX Design", "Mobile App", "Creative Design"];

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(workProjects);
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Initialize Locomotive Scroll
  useLocomotiveScroll();

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(workProjects);
    } else {
      setFilteredProjects(workProjects.filter(project => project.category === selectedCategory));
    }
  }, [selectedCategory]);

  const categoryStats = {
    "All": workProjects.length,
    "Web Design": workProjects.filter(p => p.category === "Web Design").length,
    "Branding": workProjects.filter(p => p.category === "Branding").length,
    "Development": workProjects.filter(p => p.category === "Development").length,
    "UI/UX Design": workProjects.filter(p => p.category === "UI/UX Design").length,
    "Mobile App": workProjects.filter(p => p.category === "Mobile App").length,
    "Creative Design": workProjects.filter(p => p.category === "Creative Design").length,
  };

  return (
    <main className={styles.main} data-scroll-container>
      <div className={styles.container}>
        {/* Enhanced Header Section */}
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className={styles.headerContent}>
            <motion.div 
              className={styles.titleSection}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className={styles.mainTitle}>
                <span className={styles.titleLine}>Creative</span>
                <span className={styles.titleLine}>Portfolio</span>
              </h1>
              <div className={styles.titleDecoration}>
                <div className={styles.decorationLine}></div>
                <div className={styles.decorationDot}></div>
              </div>
            </motion.div>

            <motion.div 
              className={styles.descriptionSection}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className={styles.statsContainer}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{workProjects.length}</span>
                  <span className={styles.statLabel}>Projects</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{categories.length - 1}</span>
                  <span className={styles.statLabel}>Categories</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2+</span>
                  <span className={styles.statLabel}>Years</span>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className={styles.headerBackground}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className={styles.bgElement}></div>
            <div className={styles.bgElement}></div>
            <div className={styles.bgElement}></div>
          </motion.div>
        </motion.div>

        {/* Enhanced Filter Section */}
        <motion.div 
          className={styles.filters}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className={styles.filterButtons}>
            {categories.map((category, index) => (
              <motion.button
                key={category}
                className={`${styles.filterBtn} ${selectedCategory === category ? styles.active : ''}`}
                onClick={() => setSelectedCategory(category)}
                onMouseEnter={() => setHoveredCategory(category)}
                onMouseLeave={() => setHoveredCategory(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.categoryName}>{category}</span>
                <span className={styles.categoryCount}>({categoryStats[category]})</span>
                {hoveredCategory === category && (
                  <motion.div 
                    className={styles.hoverEffect}
                    layoutId="hoverEffect"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className={styles.projectsGrid}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.projectCard}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.projectImage}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  style={{ objectFit: 'cover' }}
                />
                <div className={styles.projectOverlay}>
                  <Link href={project.link} className={styles.viewProject}>
                    View Project
                  </Link>
                </div>
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectHeader}>
                  <h3>{project.title}</h3>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <p className={styles.category}>{project.category}</p>
                <p className={styles.description}>{project.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className={styles.emptyState}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h3>No projects found</h3>
            <p>Try selecting a different category or check back later for new work.</p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
