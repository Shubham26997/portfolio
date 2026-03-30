import "./styles/WhatIDo.css";

const WhatIDo = () => {
  return (
    <div className="whatIDO">
      <div className="whatIDO-header">
        <h2 className="whatIDO-title">
          W<span className="hat-h2">HAT</span>{" "}
          I <span className="do-h2">DO</span>
        </h2>
        <p className="whatIDO-subtitle">The technical domains I architect in</p>
      </div>

      <div className="whatIDO-grid">
        {/* Card 1 — Backend Systems */}
        <div className="what-card">
          <span className="what-card-number">01 / 02</span>
          <div className="what-card-icon">⚙️</div>
          <h3 className="what-card-title">Backend Systems</h3>
          <p className="what-card-subtitle">Scalable Server Architecture</p>
          <p className="what-card-desc">
            Designing robust REST APIs and microservices that handle 500K+ daily
            events. From data-heavy platforms to event-driven Kafka pipelines, I
            build backends that scale reliably under pressure.
          </p>
          <div className="what-card-divider"></div>
          <span className="what-card-tags-label">Skillset & Tools</span>
          <div className="what-card-tags">
            {["Python", "Django", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Kafka", "REST APIs"].map((tag) => (
              <span key={tag} className="what-tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Card 2 — AI & DevOps */}
        <div className="what-card">
          <span className="what-card-number">02 / 02</span>
          <div className="what-card-icon">🤖</div>
          <h3 className="what-card-title">AI & DevOps</h3>
          <p className="what-card-subtitle">Intelligent Pipelines & Cloud</p>
          <p className="what-card-desc">
            Building production RAG pipelines with LangChain and Qdrant vector
            DB. Deploying containerized AI features on AWS & Azure with full
            CI/CD automation for highly available, resilient systems.
          </p>
          <div className="what-card-divider"></div>
          <span className="what-card-tags-label">Skillset & Tools</span>
          <div className="what-card-tags">
            {["LangChain", "Qdrant DB", "Docker", "AWS EC2", "Azure", "Jenkins", "CI/CD", "Prompt Eng"].map((tag) => (
              <span key={tag} className="what-tag">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatIDo;
