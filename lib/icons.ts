// Official brand marks from Simple Icons (https://simpleicons.org), imported one by one so
// only the icons we use end up in the bundle.
import {
  siAndroid,
  siAngular,
  siBootstrap,
  siC,
  siCplusplus,
  siDocker,
  siElasticstack,
  siExpress,
  siFastapi,
  siGit,
  siJavascript,
  siKeycloak,
  siMongodb,
  siMysql,
  siNginx,
  siNodedotjs,
  siNumpy,
  siOpenjdk,
  siOpencv,
  siOllama,
  siOpentelemetry,
  siPhp,
  siPostgresql,
  siPostman,
  siPython,
  siPytorch,
  siQt,
  siQuarkus,
  siReact,
  siScikitlearn,
  siSocketdotio,
  siSpringboot,
  siSpringsecurity,
  siSqlite,
  siSwagger,
  siTensorflow,
  siTypescript,
} from "simple-icons";

type Icon = { path: string; hex: string; title: string };

const map: Record<string, Icon> = {
  Android: siAndroid,
  Angular: siAngular,
  Bootstrap: siBootstrap,
  C: siC,
  "C++": siCplusplus,
  Docker: siDocker,
  "ELK Stack": siElasticstack,
  Express: siExpress,
  FastAPI: siFastapi,
  Git: siGit,
  Java: siOpenjdk,
  JavaScript: siJavascript,
  Keycloak: siKeycloak,
  MongoDB: siMongodb,
  MySQL: siMysql,
  Nginx: siNginx,
  "Node.js": siNodedotjs,
  NumPy: siNumpy,
  Ollama: siOllama,
  OpenCV: siOpencv,
  OpenTelemetry: siOpentelemetry,
  PHP: siPhp,
  PostgreSQL: siPostgresql,
  Postman: siPostman,
  Python: siPython,
  PyTorch: siPytorch,
  PyQt5: siQt,
  Quarkus: siQuarkus,
  React: siReact,
  "scikit-learn": siScikitlearn,
  "Socket.io": siSocketdotio,
  "Spring Boot": siSpringboot,
  "Spring Security": siSpringsecurity,
  SQLite: siSqlite,
  Swagger: siSwagger,
  TensorFlow: siTensorflow,
  TypeScript: siTypescript,
};

export function getIcon(name: string): Icon | undefined {
  return map[name];
}

// Brand colours that would disappear on the dark background fall back to the text colour.
export function readableHex(hex: string): string | undefined {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const lum = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  return lum < 0.28 ? undefined : `#${hex}`;
}
