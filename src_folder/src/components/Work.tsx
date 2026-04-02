import { useEffect, useRef } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTiltAnimation } from "./utils/useTiltAnimation";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "GST Invoice Automation",
    category: "High-Volume REST API",
    tools: "Django, FastAPI, OpenAPI",
    built:
      "High-throughput REST API for B2B GST invoice automation",
    approach:
      "Distributed task queue with Celery + Redis; automated GST validation logic; OpenAPI-driven contracts; PDF generation workflows",
    impact:
      "Processed 50k+ invoices/hour; reduced manual compliance processing time by 75% (sub-second request handling)",
    image: import.meta.env.BASE_URL + "images/invoice_automation.png",
  },
  {
    title: "Event-Driven Data Pipeline",
    category: "Data Processing",
    tools: "Kafka, Faust, PostgreSQL",
    built: "Real-time event processing engine",
    approach:
      "Kafka + Faust streams for transformation/enrichment; idempotent consumers; sharded PostgreSQL cluster",
    impact: "Handled 1M+ daily events with 99.9% data consistency",
    image: import.meta.env.BASE_URL + "images/data_pipeline.png",
  },
  {
    title: "AI Business Intelligence Chatbot",
    category: "LLM Engineering",
    tools: "LangChain, Qdrant, GPT-4",
    built: "Enterprise RAG pipeline for context-aware BI",
    approach: "Qdrant semantic search + LangChain orchestration",
    impact: "Improved knowledge retrieval efficiency by 40%",
    image: import.meta.env.BASE_URL + "images/ai_chatbot.png",
  },
  {
    title: "Azure Custom Form OCR",
    category: "Document AI",
    tools: "Azure Form Recognizer, Python",
    built: "Custom OCR extraction pipeline for enterprise docs",
    approach: "Azure Document Intelligence + Python post-processing/filtering",
    impact: "Achieved 98% field accuracy; saved 200+ man-hours monthly",
    image: import.meta.env.BASE_URL + "images/form_ocr.png",
  },
];

const Work = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tilt animation on hover
  useTiltAnimation(containerRef, ".work-tile", {
    maxRotation: 10,
    perspective: 1200,
  });

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const cards = gsap.utils.toArray(".work-tile") as HTMLElement[];
    
    cards.forEach((card) => {
      const image = card.querySelector(".tile-image-wrapper");

      gsap.fromTo(
        card,
        {
          opacity: 0,
          rotationX: 15,
          z: -100,
          transformPerspective: 2000,
          transformOrigin: "center center",
        },
        {
          opacity: 1,
          rotationX: 0,
          z: 0,
          duration: 1.5,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: card,
            scroller: ".main-body",
            start: "top 90%",
            end: "top 50%",
            scrub: 1.5,
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        image,
        {
          y: 40,
          scale: 0.9,
        },
        {
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            scroller: ".main-body",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="work-section" id="work" ref={containerRef}>
      <div className="work-container section-container">
        <h2 className="section-title">
          Featured <span>Work</span>
        </h2>

        <div className="work-tiles-container">
          {projects.map((project, index) => (
            <div className="work-tile" key={index}>
              <div className="tile-content">
                <div className="tile-info">
                  <span className="tile-number">0{index + 1}</span>
                  <h4 className="tile-title">{project.title}</h4>
                  <p className="tile-category">{project.category}</p>
                  <div className="tile-summary">
                    <div className="tile-paragraph">
                      <span className="tile-paragraph-label">Built</span>
                      <span className="tile-paragraph-text">{project.built}</span>
                    </div>
                    <div className="tile-paragraph">
                      <span className="tile-paragraph-label">Architected</span>
                      <span className="tile-paragraph-text">{project.approach}</span>
                    </div>
                    <div className="tile-paragraph">
                      <span className="tile-paragraph-label">Impact</span>
                      <span className="tile-paragraph-text">{project.impact}</span>
                    </div>
                  </div>
                  
                  <div className="tile-tools">
                    <span className="tools-label">Stack:</span>
                    <span className="tools-text">{project.tools}</span>
                  </div>
                </div>
                
                <div className="tile-image-wrapper">
                  <div className="tile-image-in">
                    <WorkImage image={project.image} alt={project.title} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
