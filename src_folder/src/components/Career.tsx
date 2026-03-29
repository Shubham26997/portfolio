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
              <h3>2020</h3>
            </div>
            <p>
              Graduated with a CGPA of 9.67/10. Built foundational knowledge in problem solving
              and complex systems engineering.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Assistant System Engineer</h4>
                <h5>Tata Consultancy Services</h5>
              </div>
              <h3>2021</h3>
            </div>
            <p>
              Designed and implemented ETL pipelines using Azure Data Factory. Developed
              Databricks notebooks for complex data transformations and streamlined Python testing via Jenkins CI/CD automation.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Senior Backend Engineer (SDE II)</h4>
                <h5>Masters India IT Solutions</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Building production-grade REST APIs processing 500K+ daily events. Architected
              event-driven pipelines using Kafka and production RAG pipelines using LangChain and Qdrant vector DB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
