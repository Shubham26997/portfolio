import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in EEE</h4>
                <h5>SRM Institute of Science & Tech</h5>
              </div>
              <h5>2020</h5>
            </div>
            <p>
              Graduated with a <strong>CGPA of 9.67/10.</strong> Built strong foundations in problem solving and complex systems engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant System Engineer</h4>
                <h5>Tata Consultancy Services</h5>
              </div>
              <h5>Jan 2021 - Jul 2022</h5>
            </div>
            <p>
              Owned ETL delivery using Azure Data Factory, and developed Databricks notebooks for complex transformations.
              Streamlined Python testing and releases via Jenkins CI/CD to improve reliability and iteration speed.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Backend Engineer (SDE II)</h4>
                <h5>Masters India IT Solutions</h5>
              </div>
              <h5>Jul 2022 - PRESENT</h5>
            </div>
            <p>
              Owned production-grade REST APIs processing 500k+ daily events. Architected event-driven pipelines using Kafka,
              and built RAG pipelines using LangChain with Qdrant for fast, context-aware retrieval.
              Collaborated across teams to improve SLO predictability and reduce operational friction in production systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
