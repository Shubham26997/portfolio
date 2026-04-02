import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          {/* Senior Backend Engineer (SDE II) with 5.5+ years delivering high-throughput Python systems using Django, FastAPI, PostgreSQL,
          and Kafka. Designed microservices and event-driven architectures with a strong focus on reliability and observability.
          Delivered production APIs processing 500K+ daily events with sub-second latency across GST automation and AI-powered
          document retrieval workflows. Experienced in RAG pipelines (LangChain/Qdrant), Docker, and AWS deployments. */}
          Senior Backend Engineer (SDE II) with 5.5+ years of experience building scalable, high-performance systems in Python using Django, FastAPI, PostgreSQL, and Kafka.
Architected and deployed microservices and event-driven platforms that process <strong>500K+ daily events with sub-second response times</strong>, significantly improving system throughput and reliability for GST automation and AI-driven document workflows.
Led the design of robust backend systems with a strong emphasis on fault tolerance, observability, and performance optimization, reducing system downtime and improving operational visibility.
Built and productionized <strong>RAG-based AI pipelines (LangChain + Qdrant)</strong> to enable intelligent document retrieval, enhancing accuracy and reducing manual processing effort.
Hands-on experience with Dockerized deployments and AWS infrastructure, ensuring scalable, cost-efficient, and resilient systems in production environments.
        </p>
      </div>
    </div>
  );
};

export default About;
