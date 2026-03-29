import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-me">
        <h3 className="title">About Me</h3>
        <p className="para">
          Senior Backend Engineer (SDE II) with 5.5+ years building high-throughput Python systems using Django, FastAPI, PostgreSQL,
          and Kafka. Experienced in microservices, event-driven design, RAG pipelines, LangChain, and Docker/AWS deployments.
          Delivered production APIs processing 500K+ daily events with sub-second latency across GST automation and AI-powered
          document retrieval workflows.
        </p>
      </div>
    </div>
  );
};

export default About;
