import "./styles/TechStack.css";

interface TechItem {
  name: string;
  url: string;
  invert?: boolean; // dark icons that need colour inversion on dark bg
}

const techData: TechItem[] = [
  { name: "Python",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
  { name: "Django",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg",         invert: true },
  { name: "FastAPI",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg" },
  { name: "Celery",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/celery/celery-plain.svg" },
  { name: "Kafka",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachekafka/apachekafka-original.svg", invert: true },
  { name: "Docker",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "MongoDB",    url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg" },
  { name: "Redis",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" },
  { name: "Oracle",     url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
  { name: "AWS",        url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
  { name: "Azure",      url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg" },
  { name: "LangChain",  url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/networkx/networkx-original.svg" },
  { name: "RAG & LLMs", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
];

// Duplicate for seamless infinite loop
const items = [...techData, ...techData];

const TechStack = () => (
  <section className="techstack techstack-section">
    <h2 className="techstack-heading">
      My <span>Tech Stack</span>
    </h2>

    <div className="techstack-track-wrap">
      <div className="techstack-track">
        {items.map((tech, i) => (
          <div className="tech-card" key={i}>
            <img
              src={tech.url}
              alt={tech.name}
              loading="lazy"
              className={tech.invert ? "tech-img-invert" : undefined}
            />
            <span className="tech-card-name">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TechStack;
